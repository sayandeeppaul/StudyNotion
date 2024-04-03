const express = require('express')
const router = express.Router()
const { auth } = require('../middlewares/auth')
const { deleteAccount, updateProfile, getAllUserDetails, updateDisplayPicture, getEnrolledCourses } = require('../controllers/Profile')


// **********************************************************************************************
//                                   profile routes  
// **********************************************************************************************


// delete user account
router.delete("/deleteProfile",auth,deleteAccount)

// update user profile
router.put("/updateProfile",auth,updateProfile)

// get all user details
router.get("/getUserDetails",auth,getAllUserDetails)

// update profile picture 
router.put("/updateDisplayPicture",auth,updateDisplayPicture)

// get enrolled courses
router.get("/getEnrolledCourses",auth,getEnrolledCourses)

module.exports = router