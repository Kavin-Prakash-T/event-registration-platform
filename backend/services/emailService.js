const transporter = require("../config/nodemailer");

const sendEmail = async ({ to, subject, text, html }) => {
  return transporter.sendMail({
    from: process.env.EMAIL_USER,
    to,
    subject,
    text,
    html,
  });
};

module.exports = {
  sendEmail,
  transporter,
};