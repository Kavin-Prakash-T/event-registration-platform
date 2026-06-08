const {
  registerForEventService,
  getMyRegistrationsService,
  cancelRegistrationService,
  getEventRegistrationsService
} = require("../services/registrationService");

const registerForEvent = async (req, res) => {
  try {
    const registration = await registerForEventService(
      req.params.eventId,
      req.user.id
    );

    res.status(201).json({
      success: true,
      message: "Registered successfully. Please complete payment.",
      registration,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

const getMyRegistrations = async (req, res) => {
  try {
    const registrations = await getMyRegistrationsService(req.user.id);

    res.status(200).json({
      success: true,
      registrations,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

const cancelRegistration = async (req, res) => {
  try {
    await cancelRegistrationService(req.params.registrationId, req.user.id);

    res.status(200).json({
      success: true,
      message: "Registration cancelled successfully",
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

const getEventRegistrations = async (
  req,
  res
) => {
  try {
    const registrations =
      await getEventRegistrationsService(
        req.params.eventId,
        req.user.id,
        req.query.search
      );

    res.status(200).json({
      success: true,
      registrations,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  registerForEvent,
  getMyRegistrations,
  cancelRegistration,
  getEventRegistrations
};