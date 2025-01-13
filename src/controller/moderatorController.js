const {
  handlePointRequestByModerator,
} = require("../service/moderatorService");
const express = require("express");
const router = express.Router();

router.post("/handle-request/:id", handlePointRequestByModerator);

module.exports = router;
