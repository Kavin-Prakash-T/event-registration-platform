const bcrypt = require("bcryptjs");
const prisma = require("../config/prisma");
const generateToken = require("../utils/generateToken");
const { createAndSendOtp, verifyOtp } = require("./otpService");

const signupUser = async ({ name, email, password, role }) => {
  const existingUser = await prisma.user.findUnique({
    where: { email },
  });

  if (existingUser) {
    throw new Error("User already exists");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await prisma.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
      role,
    },
  });

  await createAndSendOtp(email, "EMAIL_VERIFICATION");

  return user;
};

const verifyUserEmail = async ({ email, otp }) => {
  const isValid = await verifyOtp(email, otp, "EMAIL_VERIFICATION");

  if (!isValid) {
    throw new Error("Invalid or expired OTP");
  }

  const user = await prisma.user.update({
    where: { email },
    data: { isVerified: true },
  });

  return user;
};

const loginUser = async ({ email, password }) => {
  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user) {
    throw new Error("User not found");
  }

  if (!user.isVerified) {
    throw new Error("Email not verified");
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    throw new Error("Invalid credentials");
  }

  const token = generateToken(user);

  return { user, token };
};

const forgotPasswordService = async ({ email }) => {
  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user) {
    throw new Error("User not found");
  }

  await createAndSendOtp(email, "FORGOT_PASSWORD");

  return true;
};

const verifyForgotOtpService = async ({ email, otp }) => {
  const isValid = await verifyOtp(email, otp, "FORGOT_PASSWORD");

  if (!isValid) {
    throw new Error("Invalid or expired OTP");
  }

  return true;
};

const resetPasswordService = async ({ email, newPassword }) => {
  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user) {
    throw new Error("User not found");
  }

  const hashedPassword = await bcrypt.hash(newPassword, 10);

  await prisma.user.update({
    where: { email },
    data: {
      password: hashedPassword,
    },
  });

  return true;
};

module.exports = {
  signupUser,
  verifyUserEmail,
  loginUser,
  forgotPasswordService,
  verifyForgotOtpService,
  resetPasswordService,
};