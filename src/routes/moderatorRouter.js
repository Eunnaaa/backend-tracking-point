const express = require("express");
const router = express.Router();
const moderatorController = require("../controller/moderatorController");

router.use("/", moderatorController);

module.exports = router;
