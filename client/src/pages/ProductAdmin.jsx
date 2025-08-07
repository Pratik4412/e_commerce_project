import React, { useState, useEffect } from "react";
import AxiosToastError from "../utils/AxiosTostError";
import Axios from "../utils/Axios";
import SummaryApi from "../common/SummaryApi";
import Loding from "../components/Loding";
import ProductCardAdmin from "../components/ProductCardAdmin";
import { IoSearchSharp } from "react-icons/io5";
const ProductAdmin = () => {
  const [product, setProduct] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPageCount, setTotalPageCount] = useState(1);
  const [search, setSearch] = useState("");
  const fetProductData = async () => {
    try {
      setLoading(true);
      const response = await Axios({
        ...SummaryApi.getProduct,
        data: {
          page: page,
          limit: 12,
          search: search,
        },
      });

      const { data: responseData } = response;

      if (responseData.success) {
        setTotalPageCount(responseData.totalPageCount);
        setProduct(responseData.data);
      }
    } catch (error) {
      AxiosToastError(error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetProductData();
  }, [page]);

  const handleNext = () => {
    if (page !== totalPageCount) {
      setPage((preve) => preve + 1);
    }
  };
  const handlePrev = () => {
    if (page > 1) {
      setPage((preve) => preve - 1);
    }
  };
  const handleOnChange = (e) => {
    const { value } = e.target;
    setSearch(value);
    setPage(1);
  };
  useEffect(() => {
    let flag = true;

    const interval = setTimeout(() => {
      if (flag) {
        fetProductData();
        flag = false;
      }
    }, 300);
    return () => {
      clearTimeout(interval);
    };
  }, [search]);
  console.log("search", search);
  return (
    <section>
      <div className="p-2 flex items-center justify-between font-semibold bg-white shadow-md gap-4">
        <h2 className="text-semibold">Product</h2>
        <div className="min-w-24 w-full max-w-56  bg-blue-50 px-3 py-1 flex items-center gap-2 border rounded  focus-within:border-primary-200">
          <IoSearchSharp size={24} />
          <input
            type="text"
            placeholder="search product here"
            className="h-full w-full outline-none bg-transparent"
            value={search}
            onChange={handleOnChange}
          />
        </div>
      </div>
      {loading && <Loding />}

      <div className="p-4 bg-blue-50">
        <div className="min-h-[55vh]">
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 ">
            {product.map((p, index) => {
              return (
                <ProductCardAdmin data={p} key={p._id + "productId" + index} />
              );
            })}
          </div>
        </div>
        <div className="flex justify-between items-center my-4">
          <button
            className="border border-primary-200 px-4 py-1 rounded hover:bg-primary-200"
            onClick={handlePrev}
          >
            Previous
          </button>
          <button className="w-full bg-state-100 ">
            {page}/{totalPageCount}
          </button>
          <button
            className="border border-primary-200 px-4 py-1 rounded hover:bg-primary-200"
            onClick={handleNext}
          >
            Next
          </button>
        </div>
      </div>
    </section>
  );
};

export default ProductAdmin;
