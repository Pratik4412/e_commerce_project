import SubCategoryModel from "../models/subCategory.model.js";

export const AddSubCategoryController = async (req, res) => {
  try {
    const { name, image, category } = req.body;

    if (!name && !image && !category[0]) {
      return res.status(400).json({
        message: "Provide required fields name, image, category",
        error: true,
        success: false,
      });
    }
    const payload = {
      name,
      image,
      category,
    };

    const createSubCategory = new SubCategoryModel(payload);
    const save = await createSubCategory.save();
    return res.json({
      message: "Sub Category Created  Successfully",
      data: save,
      error: false,
      success: true,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
};
export const getSubCategoryController = async (req, res) => {
  try {
    const data = await SubCategoryModel.find()
      .sort({ createdAt: -1 })
      .populate("category");
    return res.json({
      message: "Sub Category List",
      data: data,
      error: false,
      success: true,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
};
export const updateSubCategoryController = async (req, res) => {
  try {
    const { _id, name, image, category } = req.body;

    const checkSub = await SubCategoryModel.findById(_id);

    if (!checkSub) {
      return res.status(400).json({
        message: "Sub Category Not Found",
        error: true,
        success: false,
      });
    }
    const updateSubCategory = await SubCategoryModel.findByIdAndUpdate(_id, {
      name,
      image,
      category,
    });

    return res.json({
      message: "Sub Category Updated",
      data: updateSubCategory,
      error: false,
      success: true,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
};
export const deleteSubCategoryController = async (req, res) => {
  try {
    const { _id } = req.body;
    console.log("ID", _id);
    const deleteSub = await SubCategoryModel.findByIdAndDelete(_id);

    if (!deleteSub) {
      return res.status(400).json({
        message: "Sub Category Not Found",
        error: true,
        su,
      });
    }
    return res.json({
      message: "Sub Category Deleted",
      data: deleteSub,
      error: false,
      success: true,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
};
