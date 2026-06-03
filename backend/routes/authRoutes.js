const express = require("express");
const router = express.Router();

const {
  signup,
  verifyEmail,
  login,
  forgotPassword,
  verifyForgotOtp,
  resetPassword,
} = require("../controllers/authController");

router.post("/signup", signup);
router.post("/verify-email", verifyEmail);
router.post("/login", login);
router.post("/forgot-password", forgotPassword);
router.post("/verify-forgot-otp", verifyForgotOtp);
router.post("/reset-password", resetPassword);

module.exports = router;