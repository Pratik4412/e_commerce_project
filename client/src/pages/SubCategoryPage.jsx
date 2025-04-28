import React, { useEffect, useState } from "react";
import UploadSubCategoryModel from "../components/UploadSubCategoryModel";
import SummaryApi from "../common/SummaryApi";
import AxiosToastError from "../utils/AxiosTostError";
import Axios from "../utils/Axios";
import DisplayTable from "../components/DisplayTable";
import { createColumnHelper } from "@tanstack/react-table";
import ViewImage from "../components/ViewImage";
import { BiSolidPencil } from "react-icons/bi";
import { MdDelete } from "react-icons/md";
import EditSubCategory from "../components/EditSubCategory";
import ConfirmBox from "../components/ConfirmBox";
import toast from "react-hot-toast";
const SubCategoryPage = () => {
  const [openAddSubCategory, setOpenAddSubCategory] = useState(false);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
  const columnHelper = createColumnHelper();
  const [openEditSubCategory, setOpenEditSubCategory] = useState(false);
  const [editData, setEditData] = useState({
    _id: "",
  });

  const [deleteSubCategory, setDeleteSubCategory] = useState({
    _id: "",
  });
  const [openDeleteConfirmsBox, setOpenDeleteConfirmsBox] = useState(false);

  const fetchSubCategory = async () => {
    try {
      const response = await Axios({
        ...SummaryApi.getSubCategory,
      });
      const { data: responseData } = response;

      if (responseData.success) {
        setData(responseData.data);
      }
    } catch (error) {
      AxiosToastError(error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchSubCategory();
  }, []);
  const column = [
    columnHelper.accessor("name", {
      header: "Name",
    }),
    columnHelper.accessor("image", {
      header: "Image",
      cell: ({ row }) => {
        return (
          <div className="flex items-center justify-center">
            <img
              src={row.original.image}
              alt={row.original.name}
              className="w-8 h-8 cursor-pointer"
              onClick={() => {
                setImageUrl(row.original.image);
              }}
            />
          </div>
        );
      },
    }),
    columnHelper.accessor("category", {
      header: "Category",
      cell: ({ row }) => {
        return (
          <>
            {row.original.category.map((c, index) => {
              return (
                <p
                  key={c._id + "table"}
                  className="shadow-md px-1 inline-block"
                >
                  {c.name}
                </p>
              );
            })}
          </>
        );
      },
    }),
    columnHelper.accessor("_id", {
      header: "Action",
      cell: ({ row }) => {
        return (
          <div className="flex items-center justify-center gap-3">
            <button
              className="p-2 bg-green-100 rounded-full text-green-500 hover:text-green-700"
              onClick={() => {
                setOpenEditSubCategory(true);
                setEditData(row.original);
              }}
            >
              <BiSolidPencil size={20} />
            </button>
            <button
              onClick={() => {
                setOpenDeleteConfirmsBox(true);
                setDeleteSubCategory(row.original);
              }}
              className="p-2 bg-red-100 rounded-full text-red-500 hover:text-red-700"
            >
              <MdDelete size={20} />
            </button>
          </div>
        );
      },
    }),
  ];
  console.log("sub category data", data);

  const handleDeleteSubCategory = async () => {
    try {
      const response = await Axios({
        ...SummaryApi.deleteSubCategory,
        data: deleteSubCategory,
      });

      const { data: responseData } = response;
      if (responseData.success) {
        toast.success(responseData.message);
        fetchSubCategory();
        setOpenDeleteConfirmsBox(false);
        setDeleteSubCategory({ _id: "" });
      }
    } catch (error) {
      AxiosToastError(error);
    }
  };
  return (
    <section>
      <div className="p-2 flex items-center justify-between font-semibold bg-white shadow-md">
        <h2 className="text-semibold">Sub Category</h2>
        <button
          onClick={() => setOpenAddSubCategory(true)}
          className="text-sm border border-primary-100 hover:bg-primary-100 px-3 py-1 rounded"
        >
          Add Sub Category
        </button>
      </div>
      <div className="overflow-auto w-full max-w-[95vw]">
        <DisplayTable data={data} column={column} />
      </div>
      {openAddSubCategory && (
        <UploadSubCategoryModel
          close={() => setOpenAddSubCategory(false)}
          fetchData={fetchSubCategory}
        />
      )}

      {imageUrl && <ViewImage url={imageUrl} close={() => setImageUrl("")} />}

      {openEditSubCategory && (
        <EditSubCategory
          data={editData}
          close={() => setOpenEditSubCategory(false)}
          fetchData={fetchSubCategory}
        />
      )}

      {openDeleteConfirmsBox && (
        <ConfirmBox
          cancel={() => setOpenDeleteConfirmsBox(false)}
          close={() => setOpenDeleteConfirmsBox(false)}
          confirm={handleDeleteSubCategory}
        />
      )}
    </section>
  );
};

export default SubCategoryPage;
