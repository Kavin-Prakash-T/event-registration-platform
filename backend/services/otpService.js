const prisma = require("../config/prisma");
const generateOtp = require("../utils/generateOtp");
const { sendEmail } = require("./emailService");

const createAndSendOtp = async (email, type) => {
  const otp = generateOtp();

  const expiresAt = new Date(Date.now() + 10 * 60 * 1000);

  await prisma.otp.create({
    data: {
      email,
      otp,
      type,
      expiresAt,
    },
  });

  await sendEmail({
    to: email,
    subject: "Your OTP Code",
    text: `Your OTP is ${otp}. It will expire in 10 minutes.`,
  });

  return otp;
};

const verifyOtp = async (email, otp, type) => {
  const otpRecord = await prisma.otp.findFirst({
    where: {
      email,
      otp,
      type,
      isUsed: false,
      expiresAt: {
        gt: new Date(),
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  if (!otpRecord) {
    return false;
  }

  await prisma.otp.update({
    where: {
      id: otpRecord.id,
    },
    data: {
      isUsed: true,
    },
  });

  return true;
};

module.exports = {
  createAndSendOtp,
  verifyOtp,
};