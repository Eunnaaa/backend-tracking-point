const { register, login, logout } = require("../service/authService");
const { authenticate } = require("../middleware/authMiddleware");
const express = require("express");
const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/logout", authenticate, logout);

module.exports = router;
