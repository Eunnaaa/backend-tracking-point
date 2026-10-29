const express = require("express");
const historyController = require("../controller/historyController");

const router = express.Router();

router.get("/", historyController.getHistories);
router.get("/:id", historyController.getHistoryById);

module.exports = router;
