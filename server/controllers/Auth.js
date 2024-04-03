const User = require("../models/User");
const OTP = require("../models/OTP");
const otpGenerator = require("otp-generator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cookie = require("cookie-parser");
const Profile = require("../models/Profile")
const mailSender = require("../utils/mailSender")
const {passwordUpdated} = require("../mail/template/passwordUpdate")
require("dotenv").config();

// sendOTP
exports.sendOTP = async (req, res) => {
  try {
    // fetch email from request body
    const { email } = req.body;
    console.log(email)

    // check if user already exist or not
    const checkUserPresent = await User.findOne({ email });

    // if user already exist then return response
    if (checkUserPresent) {
      return res.status(409).json({
        success: false,
        message: "User Already Registered",
      });
    }

    // otp generate
    let otp = otpGenerator.generate(6, {
      upperCaseAlphabets: false,
      lowerCaseAlphabets: false,
      specialChars: false,
    });
    console.log("OTP generated", otp);

    // check unique otp or not
    const result = await OTP.findOne({ otp: otp });

    console.log("Result is Generate OTP Func",result);
    console.log("OTP", otp);
    console.log("Result", result);

    while (result) {
      otp = otpGenerator.generate(6, {
        upperCaseAlphabets: false,
        lowerCaseAlphabets: false,
        specialChars: false,
      });
      result = await OTP.findOne({ otp: otp });
    }

    const otpPayload = { email, otp };

    // DB entry for new otp
    const otpBody = await OTP.create(otpPayload);
    console.log(otpBody);

    // return successful response
    res.status(200).json({
      success: true,
      message: "OTP sent successfully",
      otp,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// signUp
exports.signUp = async (req, res) => {
  try {
    // data fetch from request body
    const {
      firstName,
      lastName,
      email,
      password,
      confirmPassword,
      accountType,
      contactNumber,
      otp,
    } = req.body;

    // validate data
    if (
      !firstName ||
      !lastName ||
      !email ||
      !password ||
      !confirmPassword ||
      !otp
    ) {
      return res.status(400).json({
        success: false,
        message: "All fields are required !",
      });
    }

    // match 2 password
    if (password !== confirmPassword) {
      return res.status(401).json({
        success: false,
        message:
          "Password and Confirm Password values doesn't match, please try again",
      });
    }

    // check user is already exist or not
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: "User is already registered",
      });
    }

    // find the most recent OTP
    const recentOtp = await OTP.find({ email })
      .sort({ createdAt: -1 })
      .limit(1);
    console.log("recent otp is ---------->",recentOtp);

    // validate otp
    if (recentOtp.length === 0) {
      // OTP not found
      return res.status(404).json({
        success: false,
        message: "OTP not found",
      });
    } else if (otp !== recentOtp[0].otp) {
      // Invalid
      return res.status(401).json({
        success: false,
        message: "Invalid OTP",
      });
    }

    // password hash
    const hashedPassword = await bcrypt.hash(password, 10);

    // create new user
    let approved = "";
    approved === "Instructor" ? (approved = false) : (approved = true);

    // new entry in DB
    const profileDetails = await Profile.create({
      gender: null,
      dateOfBirth: null,
      about: null,
      contactNumber: null,
    });
    const user = await User.create({
      firstName,
      lastName,
      email,
      contactNumber,
      password: hashedPassword,
      accountType,
      additionalDetails: profileDetails._id,
      image: `https://api.dicebear.com/7.x/fun-emoji/svg?seed=${firstName} ${lastName}`,
    });

    // response
    return res.status(200).json({
      success: true,
      message: "User is registered successfully",
      user,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "User cannot be registered , please try again",
    });
  }
};

// login
exports.login = async (req, res) => {
  try {
    // get data from request body
    const { email, password } = req.body;
    // validation
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields are required !",
      });
    }


    // check user is exist or not
    const user = await User.findOne({ email }).populate("additionalDetails");
    if (!user) {
      return res.status(409).json({
        success: false,
        message: "User is not registered , please first sign-up",
      });
    }

    // password checking && JWT token generation
    if (await bcrypt.compare(password, user.password)) {
      const payload = {
        email: user.email,
        id: user._id,
        accountType: user.accountType,
      };
      const token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: "24h",
      });
      user.token = token;
      user.password = undefined;

      // create cookies
      const options = {
        expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
        httpOnly: true,
      };
      // response
      res.cookie("token", token, options).status(200).json({
        success: true,
        token,
        user,
        message: "Logged in successfully",
      });
    } else {
      return res.status(401).json({
        success: false,
        message: "Password is incorrect",
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Login failed , please try again",
    });
  }
};

// changePassword
exports.changePassword = async (req, res) => {
  
  try {
    // get user data from user id
    const userDetails = await User.findById(req.user.id);

    // get old password , new password, confirm password from req body
    const { oldPassword, newPassword, confirmPassword } = req.body;

    // validate old password
    const isPasswordMatch = await bcrypt.compare(
      oldPassword,
      userDetails.password
    );
    if (!isPasswordMatch) {
      // if old password does not match return 401 error
      return res.status(401).json({
        success: false,
        message: "The password is incorrect",
      });
    }
    // match new password and confirm password
    if (newPassword !== confirmPassword) {
      return res.status(401).json({
        success: false,
        message: "The new password and confirm password is not same !",
      });
    }

    // update password
    const encryptedPassword = await bcrypt.hash(newPassword, 10);
    const updatedUserDetails = await User.findByIdAndUpdate(
      req.user.id,
      { password: encryptedPassword },
      { new: true }
    );

    // send notification mail
    try {
      const emailResponse = await mailSender(
        userDetails.email,
        passwordUpdated(
          updatedUserDetails.email,
          `Password updated successfully for ${updatedUserDetails.firstName} ${updatedUserDetails.lastName}`
        )
      );

      console.log("Email sent successfully:", emailResponse.response);
    } catch (error) {
      console.log("Error occured while sending the email", error);
      return res.status(500).json({
        success: false,
        message: "Error occured while sending the email",
        error: error.message,
      });
    }

    // return response
    return res.status(200).json({
      success: true,
      message: "Password updated successfully",
    });
  } catch (error) {
    console.log("Error occured while Updating the password", error);
    return res.status(500).json({
      success: false,
      message: "Error occured while Updating the password",
      error: error.message,
    });
  }
};
