import React from "react";
import banner from "../assets/banner.jpg";
import banner_mobile from "../assets/banner-mobile.jpg";
import { useSelector } from "react-redux";
import { validURLConvert } from "../utils/ValideURLConvert";
import { useNavigate } from "react-router-dom";
import CategoryWiseProductDisplay from "../components/CategoryWiseProductDisplay";
const Home = () => {
  const loadingCategory = useSelector((state) => state.product.loadingCategory);
  const categoryData = useSelector((state) => state.product.allCategory);
  const subCategoryData = useSelector((state) => state.product.allsubCategory);
  const navigate = useNavigate();
  const handleRedirectProductListPage = (id, cate) => {
    console.log(id, cate);
    const subCategory = subCategoryData.find((sub) => {
      const filterData = sub.category.some((c) => {
        return c._id == id;
      });

      return filterData ? true : null;
    });

    const url = `/${validURLConvert(cate)}-${id}/${validURLConvert(
      subCategory.name
    )}-${subCategory._id}`;

    navigate(url);

    console.log(url);
  };
  return (
    <section className="bg-white">
      <div className=" container mx-auto">
        <div
          className={`w-full h-full bg-blue-100 min-h-32 rounded ${
            !banner && "animate-pulse"
          } `}
        >
          {" "}
          <img
            src={banner}
            alt="banner"
            className="w-full h-full lg:block hidden"
          />
          <img
            src={banner_mobile}
            alt="banner"
            className="w-full h-full block lg:hidden"
          />
        </div>
      </div>
      <div className="container mx-auto px-4 my-2 grid grid-cols-4 md:grid-cols-8 lg:grid-cols-10 gap-2">
        {loadingCategory
          ? new Array(12).fill(null).map((c, index) => {
              return (
                <div
                  className="bg-white rounded p-4 min-h-36 grid gap-2 shadow animate-pulse"
                  key={index + "loadingCategory"}
                >
                  <div className="bg-blue-100 min-h-24"></div>
                  <div className="bg-blue-100 h-8 rounded"></div>
                </div>
              );
            })
          : categoryData.map((cate, index) => {
              return (
                <div
                  key={cate._id + index + "categoryData"}
                  className="w-full h-full"
                  onClick={() =>
                    handleRedirectProductListPage(cate._id, cate.name)
                  }
                >
                  <div>
                    <img
                      src={cate.image}
                      alt={cate.image}
                      className="w-full h-full object-scale-down"
                    />
                  </div>
                </div>
              );
            })}
      </div>

      {/**desplay category product */}
      {categoryData.map((c, index) => {
        return (
          <CategoryWiseProductDisplay
            key={c?._id + "categorywiseProduct"}
            id={c?._id}
            name={c?.name}
          />
        );
      })}
    </section>
  );
};

export default Home;
