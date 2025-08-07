import ProductModel from "../models/product.model.js";
export const createProductController = async (req, res) => {
  try {
    const {
      name,
      image,
      category,
      subCategory,
      unit,
      stock,
      price,
      dicount,
      description,
      more_details,
    } = req.body;

    if (
      !name ||
      !image[0] ||
      !category[0] ||
      !subCategory[0] ||
      !unit ||
      !price ||
      !description
    ) {
      return res.status(400).json({
        message: "inter requied fields",
        error: true,
        success: false,
      });
    }

    const product = new ProductModel({
      name,
      image,
      category,
      subCategory,
      unit,
      stock,
      price,
      dicount,
      description,
      more_details,
    });

    const saveProduct = await product.save();

    return res.json({
      message: "product created successfully",
      data: saveProduct,
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

export const getProductController = async (req, res) => {
  try {
    let { page, limit, search } = req.body;
    page = parseInt(page) || 1;
    limit = parseInt(limit) || 10;

    const query =
      search && search.trim() !== ""
        ? { $text: { $search: search.trim() } }
        : {};

    const skip = (page - 1) * limit;

    const [data, totalCount] = await Promise.all([
      ProductModel.find(query).sort({ createdAt: -1 }).skip(skip).limit(limit),
      ProductModel.countDocuments(query),
    ]);

    return res.json({
      message: "Product List",
      error: false,
      success: true,
      totalCount,
      totalPageCount: Math.ceil(totalCount / limit),
      data,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
};


export const getProductByCategory = async (req, res) => {
  try {
    const { id } = req.body;

    if (!id) {
      return res.status(400).json({
        message: "provide a category id",
        error: true,
        success: false,
      });
    }
    const product = await ProductModel.find({
      category: { $in: id },
    }).limit(15);

    return res.json({
      message: "category product list",
      data: product,
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

export const getProductByCategoryAndSubCategory = async (req, res) => {
  try {
    let { categoryId, subCategoryId, page, limit } = req.body;

    if (!categoryId || !subCategoryId) {
      return res.status(400).json({
        message: "Provide categoryId and subCategoryId",
        error: true,
        success: false,
      });
    }

    if (!page) {
      page = 1;
    }
    if (!limit) {
      limit = 20;
    }
    const query = {
      category: { $in: categoryId },
      subCategory: { $in: subCategoryId },
    };
    const skip = (page - 1) * limit;

    const [data, dataCount] = await Promise.all([
      ProductModel.find(query).sort({ createdAt: -1 }).skip(skip).limit(limit),
      ProductModel.countDocuments(query),
    ]);
    return res.json({
      message: "Product list",
      data: data,
      totalCount: dataCount,
      page: page,
      limit: limit,
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
// export const getProductByCategoryAndSubCategory = async (req, res) => {
//   try {
//     console.log("Raw request body:", req.body);

//     let { categoryId, subCategoryId, page, limit } = req.body;

//     // Validate required fields
//     if (!categoryId) {
//       return res.status(400).json({
//         message: "Provide categoryId",
//         error: true,
//         success: false,
//       });
//     }

//     if (!subCategoryId) {
//       return res.status(400).json({
//         message: "Provide subCategoryId",
//         error: true,
//         success: false,
//       });
//     }

//     // Set default pagination values
//     page = page ? Number(page) : 1;
//     limit = limit ? Number(limit) : 20;

//     // Extract IDs from slugs if necessary
//     // This handles cases like "Toor--Urad---Chana-680b1090af6b292c56659fb2"
//     const extractId = (slugOrId) => {
//       if (!slugOrId) return null;

//       // If it looks like a MongoDB ObjectId already, return it
//       if (slugOrId.length === 24 && /^[0-9a-f]{24}$/i.test(slugOrId)) {
//         return slugOrId;
//       }

//       // Extract the last part after the last hyphen
//       const parts = String(slugOrId).split("-");
//       const lastPart = parts[parts.length - 1];

//       // If the last part looks like an ObjectId, return it
//       if (
//         lastPart &&
//         lastPart.length === 24 &&
//         /^[0-9a-f]{24}$/i.test(lastPart)
//       ) {
//         return lastPart;
//       }

//       // Otherwise return the original input
//       return slugOrId;
//     };

//     // Process arrays or single values
//     const processIds = (ids) => {
//       // Make sure we're working with an array
//       const idArray = Array.isArray(ids) ? ids : [ids];

//       // Process each ID
//       return idArray.map((id) => extractId(id));
//     };

//     // Process the IDs
//     const processedCategoryIds = processIds(categoryId);
//     const processedSubCategoryIds = processIds(subCategoryId);

//     console.log("Processed IDs:", {
//       categoryId: processedCategoryIds,
//       subCategoryId: processedSubCategoryIds,
//     });

//     // Convert to ObjectIds where possible
//     const toObjectId = (id) => {
//       try {
//         if (id && id.length === 24 && /^[0-9a-f]{24}$/i.test(id)) {
//           return mongoose.Types.ObjectId(id);
//         }
//       } catch (e) {}
//       return id;
//     };

//     const categoryObjectIds = processedCategoryIds.map(toObjectId);
//     const subCategoryObjectIds = processedSubCategoryIds.map(toObjectId);

//     console.log("Final query values:", {
//       categoryObjectIds,
//       subCategoryObjectIds,
//     });

//     // Build the query
//     const query = {
//       category: { $in: categoryObjectIds },
//       subCategory: { $in: subCategoryObjectIds },
//     };

//     const skip = (page - 1) * limit;

//     // Run the database queries
//     const [data, dataCount] = await Promise.all([
//       ProductModel.find(query).sort({ createdAt: -1 }).skip(skip).limit(limit),
//       ProductModel.countDocuments(query),
//     ]);

//     console.log(
//       `Query returned ${data.length} results out of ${dataCount} total`
//     );

//     return res.json({
//       message: "Product list",
//       data: data,
//       totalCount: dataCount,
//       page: page,
//       limit: limit,
//       error: false,
//       success: true,
//     });
//   } catch (error) {
//     console.error("Full error:", error);
//     return res.status(500).json({
//       message: error.message || String(error),
//       error: true,
//       success: false,
//     });
//   }
// };
