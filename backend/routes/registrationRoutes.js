const express = require("express");

const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");

const {
  registerForEvent,
  getMyRegistrations,
  cancelRegistration,
} = require("../controllers/registrationController");

router.post(
  "/:eventId/register",
  authMiddleware,
  roleMiddleware("PARTICIPANT"),
  registerForEvent
);

router.get(
  "/my-registrations",
  authMiddleware,
  roleMiddleware("PARTICIPANT"),
  getMyRegistrations
);

router.delete(
  "/:registrationId/cancel",
  authMiddleware,
  roleMiddleware("PARTICIPANT"),
  cancelRegistration
);

module.exports = router;