const {
  createEventService,
  getAllEventsService,
  getSingleEventService,
  getMyEventsService,
  updateEventService,
  deleteEventService,
} = require("../services/eventService");

const createEvent = async (req, res) => {
  try {
    const event = await createEventService(req.body, req.user.id, req.file);

    res.status(201).json({
      success: true,
      message: "Event created successfully",
      event,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

const getAllEvents = async (req, res) => {
  try {
    const events = await getAllEventsService(req.query);

    res.status(200).json({
      success: true,
      events,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

const getSingleEvent = async (req, res) => {
  try {
    const event = await getSingleEventService(req.params.id);

    res.status(200).json({
      success: true,
      event,
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: error.message,
    });
  }
};

const getMyEvents = async (req, res) => {
  try {
    const events = await getMyEventsService(req.user.id);

    res.status(200).json({
      success: true,
      events,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

const updateEvent = async (req, res) => {
  try {
    const event = await updateEventService(
      req.params.id,
      req.body,
      req.user.id,
      req.file
    );

    res.status(200).json({
      success: true,
      message: "Event updated successfully",
      event,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

const deleteEvent = async (req, res) => {
  try {
    await deleteEventService(req.params.id, req.user.id);

    res.status(200).json({
      success: true,
      message: "Event deleted successfully",
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  createEvent,
  getAllEvents,
  getSingleEvent,
  getMyEvents,
  updateEvent,
  deleteEvent,
};