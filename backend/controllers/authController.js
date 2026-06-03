const {
  signupUser,
  verifyUserEmail,
  loginUser,
  forgotPasswordService,
  verifyForgotOtpService,
  resetPasswordService,
} = require("../services/authService");

const signup = async (req, res) => {
  try {
    await signupUser(req.body);

    res.status(201).json({
      success: true,
      message: "Account created. OTP sent to email",
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

const verifyEmail = async (req, res) => {
  try {
    await verifyUserEmail(req.body);

    res.status(200).json({
      success: true,
      message: "Email verified successfully",
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

const login = async (req, res) => {
  try {
    const result = await loginUser(req.body);

    res.status(200).json({
      success: true,
      message: "Login successful",
      token: result.token,
      user: result.user,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

const forgotPassword = async (req, res) => {
  try {
    await forgotPasswordService(req.body);

    res.status(200).json({
      success: true,
      message: "Forgot password OTP sent to email",
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

const verifyForgotOtp = async (req, res) => {
  try {
    await verifyForgotOtpService(req.body);

    res.status(200).json({
      success: true,
      message: "Forgot password OTP verified successfully",
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

const resetPassword = async (req, res) => {
  try {
    await resetPasswordService(req.body);

    res.status(200).json({
      success: true,
      message: "Password reset successfully",
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  signup,
  verifyEmail,
  login,
  forgotPassword,
  verifyForgotOtp,
  resetPassword,
};
