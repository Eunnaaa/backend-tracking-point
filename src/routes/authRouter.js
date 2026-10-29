const express = require("express");
const authController = require("../controller/authController");
const { authenticate } = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/register", authController.register);
router.post("/login", authController.login);
router.post("/logout", authenticate, authController.logout);

module.exports = router;
