const express = require("express");

const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");

const {
  registerForEvent,
  getMyRegistrations,
  cancelRegistration,
  getEventRegistrations
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

router.get(
  "/event/:eventId/registrations",
  authMiddleware,
  roleMiddleware("ORGANIZER"),
  getEventRegistrations
);

module.exports = router;