const User = require('../models/User')
const mailSender = require('../utils/mailSender')
const bcrypt = require('bcrypt')
const crypto = require('crypto');

// resetPasswordToken
exports.resetPasswordToken = async (req, res) => {
    try {
        // get email from request body
        const email = req.body.email

        // check user for this email , email validation
        const user = await User.findOne({ email: email })
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "Your email is not registered with us"
            })
        }

        // generate token
        const token = crypto.randomBytes(32).toString('hex');
        console.log(token)

        // expiration token
        const updatedDetails = await User.findOneAndUpdate({ email: email },
            {
                token: token,
                resetPasswordExpires: Date.now() + 5 * 60 * 1000
            },
            { new: true }
        )

        // link generate (url)
        const url = `http://localhost:3000/update-password/${token}`

        // send the url into the user's mail
        mailSender(email, "Password Reset Link", `Password reset link: ${url}`)

        // return response
        return res.status(200).json({
            success: true,
            token:token,
            message: "Email sent successfully , please check email and change password"
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success: false,
            message: "Something wents wrong while sending the reset password link"
        })
    }
}

// resetPassword
exports.resetPassword = async (req, res) => {
    try {
        // data fetch
        const { password, confirmPassword, token } = req.body

        // data validation
        if (password !== confirmPassword) {
            return res.status(401).json({
                success: false,
                message: "Password not matching"
            })
        }

        // get userDetails from the db using token
        const userDetails = await User.findOne({ token: token })

        // if no entry - token invalid
        if (!userDetails) {
            return res.status(401).json({
                success: false,
                message: "Token is invalid"
            })
        }

        // token time check
        if (userDetails.resetPasswordExpires < Date.now()) {
            return res.status(404).json({
                success: false,
                message: "Token is expired , please regenerate your token"
            })
        }

        // hash password
        const hashedPassword = await bcrypt.hash(password, 10)

        // password update on DB
        await User.findOneAndUpdate({ token: token },
            {
                token: token,
                password: hashedPassword
            },
            { new: true })

        // return response
        return res.status(200).json({
            success: true,
            message: "Password reset successfully"
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Somethinng wents wrong while resetting the password"
        })
    }
}