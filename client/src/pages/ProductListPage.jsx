import React, { useEffect, useState } from "react";
import Axios from "../utils/Axios";
import SummaryApi from "../common/SummaryApi";
import { useParams } from "react-router-dom";
import AxiosToastError from "../utils/AxiosTostError";
import Loding from "../components/Loding";
import CardProduct from "../components/CardProduct";
const ProductListPage = () => {
  const [data, setData] = useState([]);
  console.log("categorydata", data);
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(false);
  const [totalPage, setTotalPage] = useState(1);
  const params = useParams();
  const subCategory = params?.subCategory?.split("-");
  const subCategoryName = subCategory
    ?.slice(0, subCategory?.length - 1)
    .join(" ");

  const fetchProductData = async () => {
    const categoryId = [params.category.split("-").slice(-1)[0]];
    const subCategoryId = [params.subCategory.split("-").slice(-1)[0]];
    try {
      setLoading(true);
      const response = await Axios({
        ...SummaryApi.getProductByCategoryAndSubCategorys,
        data: {
          categoryId: categoryId,
          subCategoryId: subCategoryId,
          page: page,
          limit: 10,
        },
      });

      const { data: responseData } = response;
      if (responseData.success) {
        if (responseData.page == 1) {
          setData(responseData.data);
        } else {
          setData([...data, ...responseData.data]);
        }
        console.log(responseData);
        setTotalPage(responseData.totalCount);
      }
    } catch (error) {
      AxiosToastError(error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchProductData();
  }, [params]);

  return (
    <section className="sticky top-24 lg:top-20">
      <div className="container sticky top-24 mx-auto grid grid-cols-[100px_1fr] md:grid-cols-[200px_1fr] lg:grid-cols-[280px_1fr]">
        {/* sub category */}
        <div className="min-h-[80vh]">Sub Category</div>

        {/* product list */}
        <div>
          <div className="bg-white shadow-md p-4">
            <h3 className="font-semibold">{subCategoryName}</h3>
          </div>
          <div>
            <div>
              {data.map((p, index) => {
                return (
                  <CardProduct
                    data={p}
                    key={p._id + "productSubCategory" + index}
                  />
                );
              })}
            </div>
            {loading && <Loding />}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductListPage;
