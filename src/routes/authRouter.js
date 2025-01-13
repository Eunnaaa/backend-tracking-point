const express = require("express");
const auth = require("../controller/authController");
const router = express.Router();

router.use("/", auth);

module.exports = router;
