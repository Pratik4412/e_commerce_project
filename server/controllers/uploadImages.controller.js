import { response } from "express";
import uploadImageCloadinary from "../utils/uploadImageCloadinary.js";

const uploadImageController = async (req, res) => {
  try {
    const file = req.file;
    const uploadImage = await uploadImageCloadinary(file);
    return res.json({
      message: "Image uploaded successfully",
      data: uploadImage,
      success: true,
      error: false,
    });

    console.log("uploadedImgae", file);
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
};

export default uploadImageController;
