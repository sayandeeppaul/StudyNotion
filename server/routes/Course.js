const express = require("express");
const {
  auth,
  isInstructor,
  isAdmin,
  isStudent,
} = require("../middlewares/auth");
const {
  createCourse,
  editCourse,
  getAllCourses,
  getCourseDetails,
  getInstructorCourses,
  getFullCourseDetails,
  deleteCourse
} = require("../controllers/Course");
const {
  createSection,
  updateSection,
  deleteSection,
} = require("../controllers/Section");
const {
  updateSubSection,
  deleteSubSection,
  createSubSection,
} = require("../controllers/SubSection");
const {
  createCategory,
  showAllCategories,
  categoryPageDetails,
} = require("../controllers/Category");
const {
  createRating,
  getAverageRating,
  getAllRating,
} = require("../controllers/RatingAndReview");
const {
  updateCourseProgress,
  getProgressPercentage,
} = require("../controllers/courseProgress");
const router = express.Router();

// **********************************************************************************************
//                                   course routes
// **********************************************************************************************

// courses can only be created by instructors
router.post("/createCourse", auth, isInstructor, createCourse);

// Edit Course routes
router.post("/editCourse", auth, isInstructor, editCourse);

// add a section
router.post("/addSection", auth, isInstructor, createSection);

// update a section
router.put("/updateSection", auth, isInstructor, updateSection);

// delete a section
router.delete("/deleteSection", auth, isInstructor, deleteSection);

// add a sub-section
router.post("/addSubSection", auth, isInstructor, createSubSection);

// update a sub-section
router.put("/updateSubSection", auth, isInstructor, updateSubSection);

// delete a sub-section
router.delete("/deleteSubSection", auth, isInstructor, deleteSubSection);

// Get all Courses Under a Specific Instructor
router.get("/getInstructorCourses", auth, isInstructor, getInstructorCourses);

// get all registered courses
router.get("/getAllCourses", getAllCourses);

// get specific courses details
router.post("/getCourseDetails", getCourseDetails);

// Get Details for a Specific Courses
router.post("/getFullCourseDetails", auth, getFullCourseDetails);

// To Update Course Progress
router.post("/updateCourseProgress", auth, isStudent, updateCourseProgress);

// Delete a Course
router.delete("/deleteCourse", deleteCourse)

// **********************************************************************************************
//                                   category routes (only by admin)
// **********************************************************************************************

router.post("/createCategory", auth, isAdmin, createCategory);
router.get("/showAllCategories", showAllCategories);
router.post("/getCategoryPageDetails", categoryPageDetails);

// **********************************************************************************************
//                                          rating and reviews
// **********************************************************************************************

router.post("/createRating", auth, isStudent, createRating);
router.get("/getAverageRating", getAverageRating);
router.get("/getReviews", getAllRating);

module.exports = router;
