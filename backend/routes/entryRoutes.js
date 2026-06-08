const express = require("express");

const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");

const {
  sendEntryOtp,
  verifyEntryOtp,
  getEntryLogs,
} = require("../controllers/entryController");

router.post(
  "/:registrationId/send-otp",
  authMiddleware,
  roleMiddleware("ORGANIZER"),
  sendEntryOtp
);

router.post(
  "/:registrationId/verify",
  authMiddleware,
  roleMiddleware("ORGANIZER"),
  verifyEntryOtp
);

router.get(
  "/logs",
  authMiddleware,
  roleMiddleware("ORGANIZER"),
  getEntryLogs
);

module.exports = router;