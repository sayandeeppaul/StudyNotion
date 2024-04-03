const Section = require("../models/Section");
const SubSection = require("../models/SubSection");
const { uploadImageToCloudinary } = require("../utils/imageUploader");
require("dotenv").config();

// create subsection
exports.createSubSection = async (req, res) => {
  try {
    // fetch data from req body
    const { sectionId, title, description } = req.body;

    // extract video
    const video = req.files.videoFile;

    // validation
    if (!sectionId || !title || !description || !video) {
      return res.status(401).json({
        success: false,
        message: "All fields are required !",
      });
    }
    console.log(video);

    // upload to cloudinary
    const uploadDetails = await uploadImageToCloudinary(
      video,
      process.env.FOLDER_NAME
    );

    // create sub section
    const subSectionDetails = await SubSection.create({
      title: title,
      timeDuration: `${uploadDetails.duration}`,
      description: description,
      videoUrl: uploadDetails.secure_url,
    });

    // update section with sub section objectId
    const updatedSection = await Section.findByIdAndUpdate(
      { _id: sectionId },
      {
        $push: {
          subSection: subSectionDetails._id,
        },
      },
      { new: true }
    ).populate("subSection");

    // return response
    return res.status(200).json({
      success: true,
      message: "Sub-section created successfully",
      updatedSection,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Unable to create sub-section , please try again",
      error: error.message,
    });
  }
};

// update subsection controller
exports.updateSubSection = async (req, res) => {
  try {
    const { sectionId, title, description } = req.body;
    const subSection = await SubSection.findById(sectionId);

    if (!subSection) {
      return res.status(404).json({
        success: false,
        message: "SubSection not found",
      });
    }

    if (title !== undefined) {
      subSection.title = title;
    }

    if (description !== undefined) {
      subSection.description = description;
    }

    if (req.files && req.files.video !== undefined) {
      const video = req.files.video;
      const uploadDetails = await uploadImageToCloudinary(
        video,
        process.env.FOLDER_NAME
      );
      subSection.videoUrl = uploadDetails.secure_url;
      subSection.timeDuration = `${uploadDetails.duration}`;
    }

    await subSection.save();

    return res.status(200).json({
      success: true,
      message: "Subsection updated successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "An error occured while updating the subsection",
    });
  }
};

// delete subsection controller
exports.deleteSubSection = async (req, res) => {
  try {
    const { sectionId, subSectionId } = req.body;
    await Section.findByIdAndUpdate(
      { _id: sectionId },
      {
        $pull: {
          subSection: subSectionId,
        },
      }
    );
    const subSection = await SubSection.findByIdAndDelete({
      _id: subSectionId,
    });

    if (!subSection) {
      return res.status(404).json({
        success: false,
        message: "SubSection not found !",
      });
    }

    return res.status(200).json({
      success: true,
      message: "SubSection deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "An error occured while deleting the subsection",
    });
  }
};
