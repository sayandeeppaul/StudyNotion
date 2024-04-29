const { instance } = require("../config/razorpay");
const Course = require("../models/Course");
const User = require("../models/User");
const mailSender = require("../utils/mailSender");
const {
  courseEnrollmentEmail,
} = require("../mail/template/courseEnrollmentEmail");
const { default: mongoose } = require("mongoose");

// capture the payment and initiate razorpay order
exports.capturePayment = async (req, res) => {
  try {
    // get courseId and userId
    const { course_id } = req.body;
    const userId = req.user.id;

    // valid courseID && course details
    if (!course_id) {
      return res.json({
        success: false,
        message: "Please provide valid course Id",
      });
    }
    let course;
    try {
      course = Course.findById(course_id);
      if (!course) {
        return res.json({
          success: false,
          message: "Could not find any course",
        });
      }

      // user already pay for the same course
      const uid = new mongoose.Types.ObjectId(userId);
      if (course.studentEnrolled.includes(uid)) {
        return res.status(200).json({
          success: false,
          message: "Student is already enrolled",
        });
      }
    } catch (error) {
      return res.status(200).json({
        success: false,
        message: error.message,
      });
    }

    // order create
    const amount = course.price;
    const currency = "INR";
    const options = {
      amount: amount * 100,
      currency,
      receipt: Math.random(Date.now().toString()),
      notes: {
        courseId: course_id,
        userId,
      },
    };

    try {
      // initiate the payment using razorpay
      const paymentResponse = await instance.orders.create(options);
      console.log(paymentResponse);

      // return response
      return res.status(200).json({
        success: true,
        courseName: course.courseName,
        courseDescription: course.courseDescription,
        thumbnail: course.thumbnail,
        amount: paymentResponse.amount,
        currency: paymentResponse.currency,
        orderId: paymentResponse.id,
      });
    } catch (error) {
      console.log(error);
      res.json({
        success: false,
        message: "Could not initiate order",
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Problem while capturing payment",
      error: error.message,
    });
  }
};

// verify signature of razorpay and server
exports.verifyPayment = async (req, res) => {
  const webhookSecret = "123456789";
  const signature = req.headers["x-razorpay-signature"];
  const shasum = crypto.createHmac("sha256", webhookSecret);
  shasum.update(JSON.stringify(req.body));
  const digest = shasum.digest("hex");
  if (digest === signature) {
    console.log("Payment is authorized");

    const { courseId, userId } = req.body.payload.payment.entity.notes;
    try {
      // fulfil the action

      // find the course and enroll the student
      const enrollCourse = await Course.findOneAndUpdate(
        { _id: courseId },
        { $push: { studentEnrolled: userId } },
        { new: true }
      );

      if (!enrollCourse) {
        return res.status(500).json({
          success: false,
          message: "Course not found",
        });
      }
      console.log(enrollCourse);

      //find the student and add the course to their enrolled course list
      const enrollStudent = await User.findOneAndUpdate(
        { _id: userId },
        { $push: { courses: courseId } },
        { new: true }
      );

      if (!enrollStudent) {
        return res.status(500).json({
          success: false,
          message: "User not found",
        });
      }
      console.log(enrollStudent);

      // confirmation mail send
      const emailResponse = await mailSender(
        enrollStudent.email,
        "Congratulation from StudyNotion",
        "Congratulation , you are onboarded into StudyNotion course"
      );
      console.log(emailResponse);

      return res.status(200).json({
        success: true,
        message: "Signature is verified and course added",
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "Signature is not verified",
      });
    }
  } else {
    return res.status(400).json({
      success: false,
      message: "Invalid Credentials ! ",
    });
  }
};

// Send Payment Success Email
exports.sendPaymentSuccessEmail = async (req, res) => {
  const { orderId, paymentId, amount } = req.body;

  const userId = req.user.id;

  if (!orderId || !paymentId || !amount || !userId) {
    return res
      .status(400)
      .json({ success: false, message: "Please provide all the details" });
  }

  try {
    const enrolledStudent = await User.findById(userId);

    await mailSender(
      enrolledStudent.email,
      `Payment Received`,
      paymentSuccessEmail(
        `${enrolledStudent.firstName} ${enrolledStudent.lastName}`,
        amount / 100,
        orderId,
        paymentId
      )
    );
  } catch (error) {
    console.log("error in sending mail", error);
    return res
      .status(400)
      .json({ success: false, message: "Could not send email" });
  }
};

// enroll the student in the courses
const enrollStudents = async (courses, userId, res) => {
  if (!courses || !userId) {
    return res
      .status(400)
      .json({ success: false, message: "Please Provide Course ID and User ID" })
  }

  for (const courseId of courses) {
    try {
      // Find the course and enroll the student in it
      const enrolledCourse = await Course.findOneAndUpdate(
        { _id: courseId },
        { $push: { studentsEnroled: userId } },
        { new: true }
      )

      if (!enrolledCourse) {
        return res
          .status(500)
          .json({ success: false, error: "Course not found" })
      }
      console.log("Updated course: ", enrolledCourse)

      const courseProgress = await CourseProgress.create({
        courseID: courseId,
        userId: userId,
        completedVideos: [],
      })
      // Find the student and add the course to their list of enrolled courses
      const enrolledStudent = await User.findByIdAndUpdate(
        userId,
        {
          $push: {
            courses: courseId,
            courseProgress: courseProgress._id,
          },
        },
        { new: true }
      )

      console.log("Enrolled student: ", enrolledStudent)
      // Send an email notification to the enrolled student
      const emailResponse = await mailSender(
        enrolledStudent.email,
        `Successfully Enrolled into ${enrolledCourse.courseName}`,
        courseEnrollmentEmail(
          enrolledCourse.courseName,
          `${enrolledStudent.firstName} ${enrolledStudent.lastName}`
        )
      )

      console.log("Email sent successfully: ", emailResponse.response)
    } catch (error) {
      console.log(error)
      return res.status(400).json({ success: false, error: error.message })
    }
  }
}