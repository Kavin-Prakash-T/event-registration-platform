const prisma = require("../config/prisma");

const { createAndSendOtp, verifyOtp } = require("./otpService");

const sendEntryOtpService = async (
  registrationId,
  organizerId
) => {
  const registration = await prisma.registration.findUnique({
    where: {
      id: Number(registrationId),
    },
    include: {
      participant: true,
      event: true,
    },
  });

  if (!registration) {
    throw new Error("Registration not found");
  }

  if (
    registration.event.organizerId !== organizerId
  ) {
    throw new Error(
      "You are not allowed to send OTP for this event"
    );
  }

  if (
    registration.registrationStatus !== "CONFIRMED"
  ) {
    throw new Error(
      "Registration is not confirmed"
    );
  }

  await createAndSendOtp(
    registration.participant.email,
    "EVENT_ENTRY"
  );

  return true;
};

const verifyEntryOtpService = async (
  registrationId,
  organizerId,
  otp
) => {
  const registration = await prisma.registration.findUnique({
    where: {
      id: Number(registrationId),
    },
    include: {
      participant: true,
      event: true,
    },
  });

  if (!registration) {
    throw new Error("Registration not found");
  }

  if (
    registration.event.organizerId !== organizerId
  ) {
    throw new Error(
      "You are not allowed to verify entry"
    );
  }

  if (
    registration.registrationStatus !== "CONFIRMED"
  ) {
    throw new Error(
      "Registration is not confirmed"
    );
  }

  if (
    registration.entryStatus === "ALLOWED"
  ) {
    throw new Error(
      "Entry already verified"
    );
  }

  const isValid = await verifyOtp(
    registration.participant.email,
    otp,
    "EVENT_ENTRY"
  );

  if (!isValid) {
    throw new Error(
      "Invalid or expired OTP"
    );
  }

  await prisma.$transaction(async (tx) => {
    await tx.registration.update({
      where: {
        id: Number(registrationId),
      },
      data: {
        entryStatus: "ALLOWED",
      },
    });

    await tx.entryLog.create({
      data: {
        registrationId: Number(registrationId),
        verifiedById: organizerId,
        otp,
        status: "ALLOWED",
      },
    });
  });

  return true;
};

const getEntryLogsService = async (
  organizerId
) => {
  return await prisma.entryLog.findMany({
    where: {
      verifiedById: organizerId,
    },
    include: {
      registration: {
        include: {
          participant: {
            select: {
              id: true,
              name: true,
              email: true,
            },
          },
          event: {
            select: {
              id: true,
              title: true,
            },
          },
        },
      },
    },
    orderBy: {
      verifiedAt: "desc",
    },
  });
};

module.exports = {
  sendEntryOtpService,
  verifyEntryOtpService,
  getEntryLogsService,
};