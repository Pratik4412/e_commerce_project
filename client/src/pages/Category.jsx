import React, { useState, useEffect } from "react";
import UploadCategoryModel from "../components/UploadCategoryModel";
import Loding from "../components/Loding";
import NoData from "../components/NoData";
import Axios from "../utils/Axios";
import SummaryApi from "../common/SummaryApi";
import EditCategory from "../components/EditCategory";
import ConfirmBox from "../components/ConfirmBox";
import AxiosToastError from "../utils/AxiosTostError";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
const Category = () => {
  const [openUploadCategory, setOpenUploadCategory] = useState(false);
  const [loading, setLoading] = useState(false);
  const [categorydata, setCategoryData] = useState([]);
  const [openEdit, setOpenEdit] = useState(false);
  const [editData, setEditData] = useState({
    name: "",
    image: "",
  });
  const [openConfirmBox, setOpenConfirmBox] = useState(false);

  const [deleteCategory, setDeleteCategory] = useState({
    _id: "",
  });

  // const allCategory = useSelector((state) => state?.product?.allCategory);

  // useEffect(() => {
  //   setCategoryData(allCategory);
  // }, []);
   const fetchCategories = async () => {
    try {
      setLoading(true);
      const response = await Axios({
        ...SummaryApi.getCategory,
      });
      const { data: ResponseData } = response;
      if (response.data.success) {
        setCategoryData(ResponseData.data);
      }
    } catch (error) {
      return response.status(500).json({
        message: error.message || error,
        error: true,
        success: false,
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleDeleteCategory = async () => {
    try {
      const response = await Axios({
        ...SummaryApi.deleteCategory,
        data: {
          _id: deleteCategory._id,
        },
      });

      const { data: responseData } = response;

      if (responseData.success) {
        toast.success(responseData.message);
        fetchCategories();
        setOpenConfirmBox(false);
      } else {
        toast.error(responseData.message);
      }
    } catch (error) {
      AxiosToastError(error);
    }
  };

  return (
    <section>
      <div className="p-2 flex items-center justify-between font-semibold bg-white shadow-md">
        <h2 className="text-semibold">Category</h2>
        <button
          onClick={() => setOpenUploadCategory(true)}
          className="text-sm border border-primary-100 hover:bg-primary-100 px-3 py-1 rounded"
        >
          Add Category
        </button>
      </div>
      {!categorydata[0] && !loading && <NoData />}
      <div className="p-4 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {categorydata.map((category, index) => {
          return (
            <div
              className="w-full h-full rounded shadow-md p-1"
              key={category._id}
            >
              <img
                src={category.image}
                alt={category.image}
                className="w-full  object-scale-down"
              />
              {/* <h2>{category.name}</h2> */}
              <div className="flex items-center gap-1">
                <button
                  onClick={() => {
                    setOpenEdit(true);
                    setEditData(category);
                  }}
                  className="flex-1 py-1 px-1 bg-green-100 hover:bg-green-200 text-green-700 font-medium rounded"
                >
                  Edit
                </button>
                <button
                  onClick={() => {
                    setOpenConfirmBox(true);
                    setDeleteCategory(category);
                  }}
                  className="flex-1 py-1 px-1 bg-red-100 hover:bg-red-200 text-red-700 font-medium rounded"
                >
                  Delete
                </button>
              </div>
            </div>
          );
        })}
      </div>
      {loading && <Loding />}
      {openUploadCategory && (
        <UploadCategoryModel
          fetchData={fetchCategories}
          close={() => setOpenUploadCategory(false)}
        />
      )}
      {openEdit && (
        <EditCategory
          data={editData}
          close={() => setOpenEdit(false)}
          fetchData={fetchCategories}
        />
      )}
      {openConfirmBox && (
        <ConfirmBox
          close={() => setOpenConfirmBox(false)}
          cancel={() => setOpenConfirmBox(false)}
          confirm={handleDeleteCategory}
        />
      )}
    </section>
  );
};

export default Category;
