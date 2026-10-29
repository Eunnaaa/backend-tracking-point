const express = require("express");
const moderatorController = require("../controller/moderatorController");

const router = express.Router();

router.post("/handle-request/:id", moderatorController.handlePointRequest);

module.exports = router;
