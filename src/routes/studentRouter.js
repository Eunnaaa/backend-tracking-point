const express = require("express");
const studentController = require("../controller/studentController");

const router = express.Router();

router.get("/", studentController.getAllStudents);
router.get("/all-student", studentController.getAllStudents); // backward compatibility

router.get("/:id", studentController.getStudent);
router.get("/student/:id", studentController.getStudent); // backward compatibility

router.get("/:id/history", studentController.getHistory);
router.get("/history/:id", studentController.getHistory); // backward compatibility

router.get("/activity/:id", studentController.getActivity);

router.post("/request-point/:studentId", studentController.pointRequest);
router.post("/:studentId/request-point", studentController.pointRequest);

module.exports = router;
