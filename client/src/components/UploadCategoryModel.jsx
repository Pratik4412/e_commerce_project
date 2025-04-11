import React, { useState } from "react";
import { IoClose } from "react-icons/io5";
import uploadImage from "../utils/UploadImage";
import Axios from "../utils/Axios";
import SummaryApi from "../common/SummaryApi";
import toast from "react-hot-toast";
import AxiosToastError from "../utils/AxiosTostError";
const UploadCategoryModel = ({ close, fetchData }) => {
  const [data, setData] = useState({
    name: "",
    image: "",
  });

  const [loading, setLoading] = useState(false);
  const handleOnChenge = (e) => {
    const { name, value } = e.target;
    setData((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const Response = await Axios({
        ...SummaryApi.addCategory,
        data: data,
      });
      const { data: ResponseData } = Response;

      if (ResponseData.success) {
        toast.success(ResponseData.message);
        close();
        fetchData();
      }
    } catch (error) {
      AxiosToastError(error);
    } finally {
      setLoading(false);
    }
  };

  const handleUploadCategoryImages = async (e) => {
    const file = e.target.files[0];
    if (!file) {
      return;
    }

    const Response = await uploadImage(file);
    const { data: ImageResponse } = Response;

    setData((prev) => {
      return {
        ...prev,
        image: ImageResponse.data.url,
      };
    });
  };
  return (
    <section className="fixed top-0 bottom-0 left-0 right-0 p-4 flex items-center justify-center bg-neutral-800 bg-opacity-70">
      <div className="bg-white max-w-4xl w-full p-4 rounded ">
        <div className="flex items-center justify-between">
          <h1 className="font-semibold">Category</h1>
          <button className="w-fit block ml-auto" onClick={close}>
            <IoClose size={24} />
          </button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-1">
            <label htmlFor="categoryName">Name</label>
            <input
              type="text"
              name="name"
              id="categoryName"
              placeholder="Enter category name"
              value={data.name}
              onChange={handleOnChenge}
              className="bg-blue-50 p-2 outline-none rounded border-blue-100 focus-within:border-primary-200"
            />
          </div>
          <div className="my-3 grid gap-2">
            <p>Image</p>
            <div className="flex gap-4 flex-col lg:flex-row items-center ">
              <div className="border bg-blue-50 h-36 w-full lg:w-36 flex items-center justify-center rounded">
                {data.image ? (
                  <img
                    src={data.image}
                    alt="vategory"
                    className="w-full h-full object-scale-down"
                  />
                ) : (
                  <p className="text-sm text-neutral-500">No Image</p>
                )}
              </div>
              <label htmlFor="categoryImage" className="image">
                <div
                  className={`${
                    !data.name
                      ? "bg-gray-300 "
                      : "bg-primary-100 hover:bg-primary-200"
                  } py-2 px-4 rounded cursor-pointer font-medium `}
                >
                  Upload Image
                </div>
                <input
                  disabled={!data.name}
                  onChange={handleUploadCategoryImages}
                  type="file"
                  name="image"
                  id="categoryImage"
                  className="hidden"
                />
              </label>
            </div>
          </div>
          <button
        
            className={`${
              data.name && data.image
                ? "bg-primary-100 hover:bg-primary-200"
                : "bg-gray-300"
            } py-2 px-4 rounded w-full font-semibold `}
          >
            Add Category
          </button>
        </form>
      </div>
    </section>
  );
};

export default UploadCategoryModel;
