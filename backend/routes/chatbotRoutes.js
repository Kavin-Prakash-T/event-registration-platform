const express = require("express");

const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");

const { askChatbot } = require("../controllers/chatbotController");

router.post("/ask", authMiddleware, askChatbot);

module.exports = router;