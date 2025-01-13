// endpoint only

const historyService = require("../service/historyService");

const getHistories = async (req, res) => {
  try {
    const histories = await historyService.getAllHistories();
    res.status(200).json(histories);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving histories", error });
  }
};

module.exports = {
  getHistories,
};
