const express = require("express");

const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");

const {
  getOrganizerDashboard,
  getParticipantDashboard,
} = require("../controllers/dashboardController");

router.get(
  "/organizer",
  authMiddleware,
  roleMiddleware("ORGANIZER"),
  getOrganizerDashboard
);

router.get(
  "/participant",
  authMiddleware,
  roleMiddleware("PARTICIPANT"),
  getParticipantDashboard
);

module.exports = router;