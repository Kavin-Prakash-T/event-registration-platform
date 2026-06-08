const {
  sendEntryOtpService,
  verifyEntryOtpService,
  getEntryLogsService,
} = require("../services/entryService");

const sendEntryOtp = async (req, res) => {
  try {
    await sendEntryOtpService(req.params.registrationId, req.user.id);

    res.status(200).json({
      success: true,
      message: "Entry OTP sent successfully",
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

const verifyEntryOtp = async (req, res) => {
  try {
    await verifyEntryOtpService(
      req.params.registrationId,
      req.user.id,
      req.body.otp
    );

    res.status(200).json({
      success: true,
      message: "Entry verified successfully",
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

const getEntryLogs = async (req, res) => {
  try {
    const logs = await getEntryLogsService(req.user.id);

    res.status(200).json({
      success: true,
      logs,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  sendEntryOtp,
  verifyEntryOtp,
  getEntryLogs,
};