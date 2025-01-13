const express = require("express");
const {
  getStudent,
  getHistory,
  getActivity,
  getAllStudents,
  pointRequest,
} = require("../service/studentService");
const router = express.Router();

// Endpoint Students
router.get("/history/:id", getHistory);
router.get("/student/:id", getStudent);
router.get("/activity/:id", getActivity);
router.get("/all-student", getAllStudents);
router.post("/request-point/:studentId", pointRequest);

module.exports = router;
