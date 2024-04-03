const express = require('express')
const { auth, isInstructor, isAdmin, isStudent } = require('../middlewares/auth')
const { createCourse, getAllCourses, getCourseDetails } = require('../controllers/Course')
const { createSection, updateSection, deleteSection } = require('../controllers/Section')
const { updateSubSection, deleteSubSection, createSubSection } = require('../controllers/SubSection')
const { createCategory, showAllCategories, categoryPageDetails } = require('../controllers/Category')
const { createRating, getAverageRating, getAllRating } = require('../controllers/RatingAndReview')
const router = express.Router()

// **********************************************************************************************
//                                   course routes  
// **********************************************************************************************

// courses can only be created by instructors
router.post("/createCourse",auth,isInstructor,createCourse)

// add a section
router.post("/addSection",auth,isInstructor,createSection)

// update a section
router.put("/updateSection",auth,isInstructor,updateSection)

// delete a section
router.delete("/deleteSection",auth,isInstructor,deleteSection)

// add a sub-section
router.post("/addSubSection",auth,isInstructor,createSubSection)

// update a sub-section
router.put("/updateSubSection",auth,isInstructor,updateSubSection)

// delete a sub-section
router.delete("/deleteSubSection",auth,isInstructor,deleteSubSection)

// get all registered courses
router.get("/getAllCourses",getAllCourses)

// get specific courses details
router.post("/getCourseDetails",getCourseDetails)

// **********************************************************************************************
//                                   category routes (only by admin)  
// **********************************************************************************************

router.post("/createCategory",auth,isAdmin,createCategory)
router.get("/showAllCategories",showAllCategories)
router.post("/getCategoryPageDetails",categoryPageDetails)

// **********************************************************************************************
//                                          rating and reviews 
// **********************************************************************************************

router.post("/createRating",auth,isStudent,createRating)
router.get("/getAverageRating",getAverageRating)
router.get("/getReviews",getAllRating)

module.exports = router