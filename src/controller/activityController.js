// only endpoint

const activityService = require("../service/activityService");

const getActivities = async (req, res) => {
  try {
    const activities = await activityService.getAllActivities();
    res.status(200).json(activities);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving activities", error });
  }
};

module.exports = {
  getActivities,
};
