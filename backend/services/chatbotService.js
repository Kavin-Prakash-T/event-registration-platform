const Groq = require("groq-sdk");

const groq = new Groq({
    apiKey: process.env.GROQ_API_KEY,
});

const askChatbotService = async (message, userRole) => {
    const systemPrompt = `
You are a support chatbot for an Event Registration Platform.

The platform has two roles:
1. PARTICIPANT
2. ORGANIZER

Participant features:
- Signup and login
- Email OTP verification
- Browse and search events
- Register for events
- Submit UTR ID and Transaction ID for manual UPI payment
- View registration status
- Receive entry OTP
- Show OTP at event entry

Organizer features:
- Create, update, delete events
- Upload event poster/banner
- Set event capacity
- View registrations
- Verify manual UPI payments
- Approve or reject payments
- Send entry OTP manually
- Verify participant entry OTP
- View dashboard

Current user role: ${userRole}

Rules:
- Answer only about this event registration platform.
- Keep answers short and helpful.
- If participant asks organizer-only action, tell them only organizer can do it.
- If organizer asks participant-only action, explain from organizer perspective.
`;

    const response = await groq.chat.completions.create({
        model: "openai/gpt-oss-120b",
        messages: [
            {
                role: "system",
                content: systemPrompt,
            },
            {
                role: "user",
                content: message,
            },
        ],
    });

    return response.choices[0].message.content;
};

module.exports = {
    askChatbotService,
};