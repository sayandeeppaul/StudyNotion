const express = require('express')
const router = express.Router()
const { auth, isStudent } = require('../middlewares/auth')
const { capturePayment, verifySignature } = require('../controllers/Payment')

// **********************************************************************************************
//                                   payment routes  
// **********************************************************************************************

router.post("/capturePayment",auth,isStudent,capturePayment)
router.post("/verifySignature",verifySignature)

module.exports = router