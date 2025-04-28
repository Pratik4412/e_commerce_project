import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import AxiosToastError from "../utils/AxiosTostError";
import Axios from "../utils/Axios";
import SummaryApi from "../common/SummaryApi";
import CardLoading from "./CardLoading";
import CardProduct from "./CardProduct";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
const CategoryWiseProductDisplay = ({ id, name }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const containerRef = useRef();
  const fetchCategoryWiseProduct = async () => {
    try {
      setLoading(true);
      const response = await Axios({
        ...SummaryApi.getProductByCategory,
        data: {
          id: id,
        },
      });

      const { data: responseData } = response;
      if (responseData.success) {
        setData(responseData.data);
      }
      console.log("wise data", response);
    } catch (error) {
      AxiosToastError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategoryWiseProduct();
  }, []);

  const handleScrollRight = () => {
    containerRef.current.scrollLeft += 200;
  };
  const handleScrollleft = () => {
    containerRef.current.scrollLeft -= 200;
  };
  const loadingCardNumber = new Array(6).fill(null);
  return (
    <div>
      <div className="container mx-auto p-4 flex items-center justify-between gap-4">
        <h3 className="font-semibold text-lg md:text-xl">{name}</h3>
        <Link
          to={""}
          className="text-green-600 hover:text-green-400 font-medium text-xs md:text-base"
        >
          See All
        </Link>
      </div>
      <div className="relative flex items-center">
        <div
          className="flex gap-4 md:gap-6 lg:gap-8 container mx-auto px-4 overflow-x-scroll scrollbar-none scroll-smooth"
          ref={containerRef}
        >
          {loading &&
            loadingCardNumber.map((_, index) => {
              return <CardLoading key={index + "productData123"} />;
            })}

          {data.map((p, index) => {
            return <CardProduct key={p._id + index + "productData"} data={p} />;
          })}
        </div>

        <div className="w-full absolute left-0 right-0 container mx-auto lg:flex items-center justify-between gap-4 hidden ">
          <button
            onClick={handleScrollleft}
            className="bg-white shadow-lg p-2 text-lg hover:bg-gray-100 rounded-full"
          >
            <IoIosArrowBack />
          </button>
          <button
            onClick={handleScrollRight}
            className="bg-white shadow-lg p-2 text-lg hover:bg-gray-100 rounded-full"
          >
            <IoIosArrowForward />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CategoryWiseProductDisplay;
