const Category = require("../models/Category");

function getRandomInt(max) {
  return Math.floor(Math.random() * max)
}

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
    const allCategory = await Category.find();
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
      .populate({
        path: "courses",
        match: { status: "Published" },
        populate: "ratingAndReviews",
      })
      .exec();

    // validation
    if (!selectedCategory) {
      return res.status(500).json({
        success: false,
        message: "Data not found",
      });
    }

    // Handle the case when there are no courses
    if (selectedCategory.courses.length === 0) {
      console.log("No courses found for the selected category.");
      return res.status(404).json({
        success: false,
        message: "No courses found for the selected category.",
      });
    }

    // get courses that not matches with category id
    const differentCourses = await Category.find({ _id: { $ne: categoryId } })
      .populate("courses")
      .exec();

    let differentCategory = await Category.findOne(
      categoriesExceptSelected[getRandomInt(categoriesExceptSelected.length)]
        ._id
    )
      .populate({
        path: "courses",
        match: { status: "Published" },
      })
      .exec();

    // [HW]-------------> get top selling course

    const allCategories = await Category.find()
      .populate({
        path: "courses",
        match: { status: "Published" },
      })
      .exec();
    const allCourses = allCategories.flatMap((category) => category.courses);
    const mostSellingCourses = allCourses
      .sort((a, b) => b.sold - a.sold)
      .slice(0, 10);

    // return response
    return res.status(200).json({
      success: true,
      data: {
        selectedCategory,
        differentCourses,
        differentCategory,
        mostSellingCourses,
      },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
