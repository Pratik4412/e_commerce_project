import React, { useState } from "react";
import UploadSubCategoryModel from "../components/UploadSubCategoryModel";

const SubCategoryPage = () => {
  const [openAddSubCategory, setOpenAddSubCategory] = useState(false);

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

      {openAddSubCategory && (
        <UploadSubCategoryModel close={() => setOpenAddSubCategory(false)} />
      )}
    </section>
  );
};

export default SubCategoryPage;
