const Category = require("../models/Category");

// create Category
exports.createCategory = async (req, res) => {
  try {
    // data fetch
    const { name, description } = req.body;

    // validation
    if (!name) {
      return res.status(401).json({
        success: false,
        message: "All fields are required !",
      });
    }

    // DB entry create
    const categoryDetails = await Category.create({
      name: name,
      description: description,
    });
    console.log(categoryDetails);

    // return response
    return res.status(200).json({
      success: true,
      message: "Category created successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Problem while creating the Category , please try again",
    });
  }
};

// get Categories
exports.showAllCategories = async (req, res) => {
  try {
    const allCategory = await Category.find(
      {},
      {
        name: true,
        description: true,
      }
    );
    console.log(allCategory);

    // return response
    return res.status(200).json({
      success: true,
      message: "All categories returned successfully",
      data: allCategory,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// category page controller
exports.categoryPageDetails = async (req, res) => {
  try {
    // get category ID
    const { categoryId } = req.body;

    // get courses for specific category id
    const selectedCategory = await Category.findById(categoryId)
      .populate("courses")
      .exec();

    // validation
    if (!selectedCategory) {
      return res.status(500).json({
        success: false,
        message: "Data not found",
      });
    }

    // get courses that not matches with category id
    const differentCourses = await Category.find({ _id: { $ne: categoryId } })
      .populate("courses")
      .exec();

    // [HW]-------------> get top selling course

    // return response
    return res.status(200).json({
      success: true,
      data: {
        selectedCategory,
        differentCourses,
      },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
