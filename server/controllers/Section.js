const Course = require("../models/Course");
const Section = require("../models/Section");

// create section
exports.createSection = async (req, res) => {
  try {
    // data fetch
    const { sectionName, courseId } = req.body;

    // validation
    if (!sectionName || !courseId) {
      return res.status(400).json({
        success: false,
        message: "Missing Properties",
      });
    }

    // create section
    const newSection = await Section.create({ sectionName });

    // update course with section id
    const updatedCourseDetails = await Course.findByIdAndUpdate(
      courseId,
      {
        $push: {
          courseContent: newSection._id,
        },
      },
      { new: true }
    )
      .populate({
        path: "courseContent",
        populate: {
          path: "subSection",
        },
      })
      .exec();

    // return response
    return res.status(200).json({
      success: true,
      message: "Section created successfully",
      updatedCourseDetails,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Unable to create section , please try again",
      error: error.message,
    });
  }
};

// update section
exports.updateSection = async (req, res) => {
  try {
    // date fetch
    const { sectionName, sectionId } = req.body;

    // validation
    if (!sectionName || !sectionId) {
      return res.status(400).json({
        success: false,
        message: "Missing Properties",
      });
    }

    // update
    const section = await Section.findByIdAndUpdate(
      sectionId,
      { sectionName },
      { new: true }
    );

    // response
    return res.status(200).json({
      success: true,
      message: "Section updated successfully",
      data: section,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Unable to update section , please try again",
      error: error.message,
    });
  }
};
// delete section
exports.deleteSection = async (req, res) => {
  try {
    // data fetch
    const { sectionId, courseId } = req.body;

    // validate
    if (!sectionId) {
      return res.status(400).json({
        success: false,
        message: "Missing Properties",
      });
    }

    // use findByIdAndDelete
    await Section.findByIdAndDelete(sectionId);

    // update courseContent DB
    const updatedCourse = await Course.findByIdAndUpdate(
      { _id: courseId },
      {
        $pull: {
          courseContent: sectionId,
        },
      },
      {
        new: true,
      }
    );

    // return response
    return res.status(200).json({
      success: true,
      message: "Section deleted successfully",
      data: updatedCourse,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Unable to delete section , please try again",
      error: error.message,
    });
  }
};
