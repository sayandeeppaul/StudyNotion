const express = require("express");
const router = express.Router();
const { auth, isInstructor } = require("../middlewares/auth");
const {
  deleteAccount,
  updateProfile,
  getAllUserDetails,
  updateDisplayPicture,
  getEnrolledCourses,
  instructorDashboard,
} = require("../controllers/Profile");

// **********************************************************************************************
//                                   profile routes
// **********************************************************************************************

// delete user account
router.delete("/deleteProfile", auth, deleteAccount);

// update user profile
router.put("/updateProfile", auth, updateProfile);

// get all user details
router.get("/getUserDetails", auth, getAllUserDetails);

// update profile picture
router.put("/updateDisplayPicture", auth, updateDisplayPicture);

// get enrolled courses
router.get("/getEnrolledCourses", auth, getEnrolledCourses);

router.get("/instructorDashboard", auth, isInstructor, instructorDashboard);

module.exports = router;
