const express = require("express");
const {
  getPointRequest,
  getPointsRequestById,
  getPointHistory,
  deletePointRequest,
} = require("../service/pointService");

const router = express.Router();

router.get("/get-point", getPointRequest);
router.get("/get-point-history", getPointHistory);
router.get("/get-request/:id", getPointsRequestById);
router.delete("/delete-request", deletePointRequest);

module.exports = router;
