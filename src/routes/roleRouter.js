const express = require("express");
const router = express.Router();
const roleController = require("../controller/roleController");

router.use("/", roleController);

module.exports = router;
