const historyService = require("../service/historyService");

const getHistories = async (req, res, next) => {
  try {
    const { studentId, status } = req.query;
    const histories = await historyService.getAllHistories({ studentId, status });
    res.status(200).json({
      status: "success",
      data: histories,
    });
  } catch (error) {
    next(error);
  }
};

const getHistoryById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const history = await historyService.getHistoryById(id);
    res.status(200).json({
      status: "success",
      data: history,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getHistories,
  getHistoryById,
};
