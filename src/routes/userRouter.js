const express = require("express");
const userController = require("../controller/userController");
const router = express.Router();

// Route Users
router.use("/", userController);

module.exports = router;
