const express = require("express");
const router = express.Router();
const pointController = require("../controller/pointController");

router.use("/", pointController);

module.exports = router;
