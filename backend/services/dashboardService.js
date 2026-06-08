const prisma = require("../config/prisma");

const getOrganizerDashboardService = async (organizerId) => {
  const totalEvents = await prisma.event.count({
    where: { organizerId },
  });

  const totalRegistrations = await prisma.registration.count({
    where: {
      event: { organizerId },
    },
  });

  const pendingPayments = await prisma.manualPayment.count({
    where: {
      status: "PENDING",
      registration: {
        event: { organizerId },
      },
    },
  });

  const confirmedRegistrations = await prisma.registration.count({
    where: {
      registrationStatus: "CONFIRMED",
      event: { organizerId },
    },
  });

  const entryAllowed = await prisma.registration.count({
    where: {
      entryStatus: "ALLOWED",
      event: { organizerId },
    },
  });

  const recentRegistrations = await prisma.registration.findMany({
    where: {
      event: { organizerId },
    },
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
          venue: true,
          startTime: true,
        },
      },
      payment: true,
    },
    orderBy: {
      createdAt: "desc",
    },
    take: 5,
  });

  return {
    totalEvents,
    totalRegistrations,
    pendingPayments,
    confirmedRegistrations,
    entryAllowed,
    recentRegistrations,
  };
};

const getParticipantDashboardService = async (participantId) => {
  const totalRegistrations = await prisma.registration.count({
    where: { participantId },
  });

  const pendingPayments = await prisma.registration.count({
    where: {
      participantId,
      registrationStatus: "PAYMENT_PENDING",
    },
  });

  const paymentSubmitted = await prisma.registration.count({
    where: {
      participantId,
      registrationStatus: "PAYMENT_SUBMITTED",
    },
  });

  const confirmedEvents = await prisma.registration.count({
    where: {
      participantId,
      registrationStatus: "CONFIRMED",
    },
  });

  const entryAllowed = await prisma.registration.count({
    where: {
      participantId,
      entryStatus: "ALLOWED",
    },
  });

  const upcomingEvents = await prisma.registration.findMany({
    where: {
      participantId,
      event: {
        startTime: {
          gte: new Date(),
        },
      },
    },
    include: {
      event: {
        select: {
          id: true,
          title: true,
          venue: true,
          startTime: true,
          endTime: true,
          bannerPublicId: true,
        },
      },
      payment: true,
    },
    orderBy: {
      event: {
        startTime: "asc",
      },
    },
    take: 5,
  });

  return {
    totalRegistrations,
    pendingPayments,
    paymentSubmitted,
    confirmedEvents,
    entryAllowed,
    upcomingEvents,
  };
};

module.exports = {
  getOrganizerDashboardService,
  getParticipantDashboardService,
};