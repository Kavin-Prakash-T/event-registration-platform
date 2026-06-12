const prisma = require("../config/prisma");

const submitPaymentService = async (registrationId, participantId, data) => {
  const registration = await prisma.registration.findUnique({
    where: { id: Number(registrationId) },
    include: { event: true },
  });

  if (!registration) {
    throw new Error("Registration not found");
  }

  if (registration.participantId !== participantId) {
    throw new Error("You are not allowed to submit payment for this registration");
  }

  if (registration.registrationStatus !== "PAYMENT_PENDING") {
    throw new Error("Payment cannot be submitted for this registration");
  }

  if (
    registration.event.registrationFee !== null &&
    registration.event.registrationFee !== undefined &&
    Number(data.amount) !== registration.event.registrationFee
  ) {
    throw new Error(
      `Incorrect amount. The registration fee for this event is ₹${registration.event.registrationFee}`
    );
  }

  const existingPayment = await prisma.manualPayment.findUnique({
    where: { registrationId: Number(registrationId) },
  });

  if (existingPayment) {
    throw new Error("Payment already submitted");
  }

  const payment = await prisma.$transaction(async (tx) => {
    const newPayment = await tx.manualPayment.create({
      data: {
        registrationId: Number(registrationId),
        utrId: data.utrId,
        transactionId: data.transactionId,
        amount: Number(data.amount),
        status: "PENDING",
      },
    });

    await tx.registration.update({
      where: { id: Number(registrationId) },
      data: {
        registrationStatus: "PAYMENT_SUBMITTED",
      },
    });

    return newPayment;
  });

  return payment;
};

const getPendingPaymentsService = async (organizerId) => {
  return await prisma.manualPayment.findMany({
    where: {
      status: "PENDING",
      registration: {
        event: {
          organizerId,
        },
      },
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
          event: true,
        },
      },
    },
    orderBy: {
      submittedAt: "desc",
    },
  });
};

const approvePaymentService = async (paymentId, organizerId) => {
  const payment = await prisma.manualPayment.findUnique({
    where: { id: Number(paymentId) },
    include: {
      registration: {
        include: {
          event: true,
        },
      },
    },
  });

  if (!payment) {
    throw new Error("Payment not found");
  }

  if (payment.registration.event.organizerId !== organizerId) {
    throw new Error("You are not allowed to approve this payment");
  }

  if (payment.status !== "PENDING") {
    throw new Error("Payment already processed");
  }

  return await prisma.$transaction(async (tx) => {
    const updatedPayment = await tx.manualPayment.update({
      where: { id: Number(paymentId) },
      data: {
        status: "APPROVED",
        verifiedById: organizerId,
        verifiedAt: new Date(),
      },
    });

    await tx.registration.update({
      where: { id: payment.registrationId },
      data: {
        registrationStatus: "CONFIRMED",
      },
    });

    return updatedPayment;
  });
};

const rejectPaymentService = async (paymentId, organizerId, reason) => {
  const payment = await prisma.manualPayment.findUnique({
    where: { id: Number(paymentId) },
    include: {
      registration: {
        include: {
          event: true,
        },
      },
    },
  });

  if (!payment) {
    throw new Error("Payment not found");
  }

  if (payment.registration.event.organizerId !== organizerId) {
    throw new Error("You are not allowed to reject this payment");
  }

  if (payment.status !== "PENDING") {
    throw new Error("Payment already processed");
  }

  return await prisma.$transaction(async (tx) => {
    const updatedPayment = await tx.manualPayment.update({
      where: { id: Number(paymentId) },
      data: {
        status: "REJECTED",
        rejectionReason: reason || "Payment rejected",
        verifiedById: organizerId,
        verifiedAt: new Date(),
      },
    });

    await tx.registration.update({
      where: { id: payment.registrationId },
      data: {
        registrationStatus: "REJECTED",
      },
    });

    return updatedPayment;
  });
};

module.exports = {
  submitPaymentService,
  getPendingPaymentsService,
  approvePaymentService,
  rejectPaymentService,
};