const express = require("express");
const studentController = require("../controller/studentController");
const router = express.Router();

// Route Students
router.use("/", studentController);

module.exports = router;
