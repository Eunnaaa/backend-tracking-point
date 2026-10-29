const express = require("express");
const activityController = require("../controller/activityController");

const router = express.Router();

router.get("/", activityController.getActivities);
router.get("/:id", activityController.getActivityById);
router.post("/", activityController.createActivity);

module.exports = router;
