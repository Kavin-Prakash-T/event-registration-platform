const express = require("express");

const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");

const {
  submitPayment,
  getPendingPayments,
  approvePayment,
  rejectPayment,
} = require("../controllers/paymentController");

router.post(
  "/:registrationId/submit",
  authMiddleware,
  roleMiddleware("PARTICIPANT"),
  submitPayment
);

router.get(
  "/pending",
  authMiddleware,
  roleMiddleware("ORGANIZER"),
  getPendingPayments
);

router.patch(
  "/:paymentId/approve",
  authMiddleware,
  roleMiddleware("ORGANIZER"),
  approvePayment
);

router.patch(
  "/:paymentId/reject",
  authMiddleware,
  roleMiddleware("ORGANIZER"),
  rejectPayment
);

module.exports = router;