const { askChatbotService } = require("../services/chatbotService");

const askChatbot = async (req, res) => {
  try {
    const { message } = req.body;

    if (!message) {
      return res.status(400).json({
        success: false,
        message: "Message is required",
      });
    }

    const answer = await askChatbotService(message, req.user.role);

    res.status(200).json({
      success: true,
      answer,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  askChatbot,
};