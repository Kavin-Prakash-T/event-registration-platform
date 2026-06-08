const {
  getOrganizerDashboardService,
  getParticipantDashboardService,
} = require("../services/dashboardService");

const getOrganizerDashboard = async (req, res) => {
  try {
    const dashboard = await getOrganizerDashboardService(req.user.id);

    res.status(200).json({
      success: true,
      dashboard,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

const getParticipantDashboard = async (req, res) => {
  try {
    const dashboard = await getParticipantDashboardService(req.user.id);

    res.status(200).json({
      success: true,
      dashboard,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  getOrganizerDashboard,
  getParticipantDashboard,
};