const activityService = require("../service/activityService");

const getActivities = async (req, res, next) => {
  try {
    const activities = await activityService.getAllActivities();
    res.status(200).json({
      status: "success",
      data: activities,
    });
  } catch (error) {
    next(error);
  }
};

const getActivityById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const activity = await activityService.getActivityById(id);
    res.status(200).json({
      status: "success",
      data: activity,
    });
  } catch (error) {
    next(error);
  }
};

const createActivity = async (req, res, next) => {
  try {
    const activity = await activityService.createActivity(req.body);
    res.status(201).json({
      status: "success",
      message: "Activity berhasil dibuat",
      data: activity,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getActivities,
  getActivityById,
  createActivity,
};
