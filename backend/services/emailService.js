const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_APP_PASSWORD,
  },
});

const sendEmail = async ({ to, subject, text }) => {
  try {
    const response = await transporter.sendMail({
      from: `"EventPass" <${process.env.GMAIL_USER}>`,
      to,
      subject,
      text,
    });

    return response;
  } catch (error) {
    console.error("Gmail Email Error:", error);
    throw new Error("Failed to send email. Please try again.");
  }
};

module.exports = { sendEmail };