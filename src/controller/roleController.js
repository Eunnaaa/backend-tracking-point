const { assignRole } = require("../service/roleService");
const express = require("express");
const router = express.Router();

router.post("/choose-role", assignRole);

module.exports = router;
