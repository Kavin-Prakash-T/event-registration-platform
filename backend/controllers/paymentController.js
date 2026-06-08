const {
  submitPaymentService,
  getPendingPaymentsService,
  approvePaymentService,
  rejectPaymentService,
} = require("../services/paymentService");

const submitPayment = async (req, res) => {
  try {
    const payment = await submitPaymentService(
      req.params.registrationId,
      req.user.id,
      req.body
    );

    res.status(201).json({
      success: true,
      message: "Payment submitted successfully. Waiting for organizer approval.",
      payment,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

const getPendingPayments = async (req, res) => {
  try {
    const payments = await getPendingPaymentsService(req.user.id);

    res.status(200).json({
      success: true,
      payments,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

const approvePayment = async (req, res) => {
  try {
    const payment = await approvePaymentService(
      req.params.paymentId,
      req.user.id
    );

    res.status(200).json({
      success: true,
      message: "Payment approved successfully",
      payment,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

const rejectPayment = async (req, res) => {
  try {
    const payment = await rejectPaymentService(
      req.params.paymentId,
      req.user.id,
      req.body.reason
    );

    res.status(200).json({
      success: true,
      message: "Payment rejected successfully",
      payment,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  submitPayment,
  getPendingPayments,
  approvePayment,
  rejectPayment,
};