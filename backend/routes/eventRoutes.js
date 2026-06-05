const express = require("express");

const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");
const upload = require("../middleware/uploadMiddleware");

const {
  createEvent,
  getAllEvents,
  getSingleEvent,
  getMyEvents,
  updateEvent,
  deleteEvent,
} = require("../controllers/eventController");

router.get("/", getAllEvents);

router.get(
  "/my-events",
  authMiddleware,
  roleMiddleware("ORGANIZER"),
  getMyEvents
);

router.get("/:id", getSingleEvent);

router.post(
  "/",
  authMiddleware,
  roleMiddleware("ORGANIZER"),
  upload.single("banner"),
  createEvent
);

router.put(
  "/:id",
  authMiddleware,
  roleMiddleware("ORGANIZER"),
  upload.single("banner"),
  updateEvent
);

router.delete(
  "/:id",
  authMiddleware,
  roleMiddleware("ORGANIZER"),
  deleteEvent
);

module.exports = router;