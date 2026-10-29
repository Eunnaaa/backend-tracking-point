const express = require("express");
const pointController = require("../controller/pointController");

const router = express.Router();

router.get("/", pointController.getPointRequest);
router.get("/get-point", pointController.getPointRequest); // backward compatibility

router.get("/history/:studentId", pointController.getPointHistory);
router.get("/get-point-history", pointController.getPointHistory); // backward compatibility
router.get("/get-point-history/:studentId", pointController.getPointHistory); // backward compatibility

router.get("/student/:studentId/total-points", pointController.getPointsByStudent);

router.get("/:id", pointController.getPointsRequestById);
router.get("/get-request/:id", pointController.getPointsRequestById); // backward compatibility

router.delete("/:requestId", pointController.deletePointRequest);
router.delete("/delete-request/:requestId", pointController.deletePointRequest); // backward compatibility
router.delete("/delete-request", pointController.deletePointRequest); // backward compatibility (via body)

module.exports = router;
