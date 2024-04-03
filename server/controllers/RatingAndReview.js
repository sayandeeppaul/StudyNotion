const RatingAndReviews = require("../models/RatingAndReview");
const Course = require("../models/Course");
const { mongo, default: mongoose } = require("mongoose");

// create rating and review
exports.createRating = async (req, res) => {
  try {
    // get userID
    const userId = req.user.id;

    // fetch data from req body
    const { rating, review, courseId } = req.body;

    // check if user is enrolled or not
    const courseDetails = await Course.findOne({
      _id: courseId,
      studentEnrolled: { $elemMatch: { $eq: userId } },
    });

    if (!courseDetails) {
      return res.status(404).json({
        success: false,
        message: "Student is not enrolled in the course",
      });
    }

    // check if user already reviewed the course or not
    const alreadyReviewed = await RatingAndReviews.findOne({
      user: userId,
      course: courseId,
    });

    if (alreadyReviewed) {
      return res.status(409).json({
        success: false,
        message: "Course is already reviewed by the user",
      });
    }

    // create rating and review
    const ratingAndReviews = await RatingAndReviews.create({
      rating: rating,
      review: review,
      user: userId,
    });

    // update the course with this rating/review
    const updatedCourseDetails = await Course.findByIdAndUpdate(
      { _id: courseId },
      {
        $push: {
          ratingAndReviews: ratingAndReviews.id,
        },
      },
      { new: true }
    );
    console.log(updatedCourseDetails);

    // return response
    return res.status(200).json({
      success: true,
      message: "Rating and Review created successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// get average rating
exports.getAverageRating = async (req, res) => {
  try {
    // get course id
    const { courseId } = req.body;

    // calculate average rating
    const result = await RatingAndReviews.aggregate([
      {
        $match: {
          course: new mongoose.Types.ObjectId(courseId),
        },
      },
      {
        $group: {
          _id: null,
          averageRating: { $avg: "$rating" },
        },
      },
    ]);

    // return average rating
    if (result.length > 0) {
      return res.status(200).json({
        success: true,
        averageRating: result[0].averageRating,
      });
    }

    // if no rating / review exist
    return res.status(200).json({
      success: true,
      message: "Average rating is 0, now rating is given till now",
      averageRating: 0,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// get all rating
exports.getAllRating = async (req, res) => {
  try {
    const allReviews = await RatingAndReviews.find({})
      .sort({ rating: "desc" })
      .populate({
        path: "user",
        select: "firstName lastName email image",
      })
      .populate({
        path: "course",
        select: "courseName",
      })
      .exec();

    return res.status(200).json({
      success: true,
      message: "All Reviews fetched successfully",
      data: allReviews,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
