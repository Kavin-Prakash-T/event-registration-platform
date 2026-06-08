const prisma = require("../config/prisma");

const activeStatuses = [
  "PAYMENT_PENDING",
  "PAYMENT_SUBMITTED",
  "CONFIRMED",
];

const registerForEventService = async (eventId, participantId) => {
  const event = await prisma.event.findUnique({
    where: { id: Number(eventId) },
  });

  if (!event) {
    throw new Error("Event not found");
  }

  const existingRegistration = await prisma.registration.findUnique({
    where: {
      participantId_eventId: {
        participantId,
        eventId: Number(eventId),
      },
    },
  });

  if (existingRegistration && existingRegistration.registrationStatus !== "CANCELLED") {
    throw new Error("Already registered for this event");
  }

  const activeRegistrations = await prisma.registration.count({
    where: {
      eventId: Number(eventId),
      registrationStatus: {
        in: activeStatuses,
      },
    },
  });

  if (activeRegistrations >= event.maxCapacity) {
    throw new Error("Event capacity is full");
  }

  const registration = await prisma.registration.create({
    data: {
      participantId,
      eventId: Number(eventId),
      registrationStatus: "PAYMENT_PENDING",
      entryStatus: "NOT_ARRIVED",
    },
    include: {
      event: true,
      participant: {
        select: {
          id: true,
          name: true,
          email: true,
        },
      },
    },
  });

  return registration;
};

const getMyRegistrationsService = async (participantId) => {
  return await prisma.registration.findMany({
    where: { participantId },
    include: {
      event: true,
      payment: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
};

const cancelRegistrationService = async (registrationId, participantId) => {
  const registration = await prisma.registration.findUnique({
    where: { id: Number(registrationId) },
  });

  if (!registration) {
    throw new Error("Registration not found");
  }

  if (registration.participantId !== participantId) {
    throw new Error("You are not allowed to cancel this registration");
  }

  if (registration.registrationStatus === "CONFIRMED") {
    throw new Error("Confirmed registration cannot be cancelled");
  }

  return await prisma.registration.update({
    where: { id: Number(registrationId) },
    data: {
      registrationStatus: "CANCELLED",
    },
  });
};

module.exports = {
  registerForEventService,
  getMyRegistrationsService,
  cancelRegistrationService,
};