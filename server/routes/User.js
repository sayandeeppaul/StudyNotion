const express = require('express')
const router = express.Router()
const { signUp, login, sendOTP, changePassword } = require('../controllers/Auth')
const { auth } = require('../middlewares/auth')
const { resetPasswordToken, resetPassword } = require('../controllers/ResetPassword')

// **********************************************************************************************
//                                   authentication routes  
// **********************************************************************************************

// router for user sign-up
router.post("/signup",signUp)

// router for user login
router.post("/login",login)

// router for sending OTP to user email
router.post("/sendotp",sendOTP)

// router for changing password
router.post("/changepassword",auth,changePassword)


// **********************************************************************************************
//                                   reset routes  
// **********************************************************************************************

// route for generating a reset password token
router.post("/reset-password-token",resetPasswordToken)

// route for resetting user's password after verification
router.post("/reset-password",resetPassword)

module.exports = router