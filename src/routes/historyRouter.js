const express = require("express");
const router = express.Router();
const historyController = require("../controller/historyController");

router.get("/", historyController.getHistories);

module.exports = router;
