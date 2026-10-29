const express = require("express");
const roleController = require("../controller/roleController");
const { authenticate } = require("../middleware/authMiddleware");

const router = express.Router();

// Assign role dapat diproteksi atau dipanggil setelah registrasi
router.post("/choose-role", roleController.assignRole);

module.exports = router;
