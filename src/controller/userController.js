const express = require("express");
const {
  getUser,
  createUser,
  updateUser,
  deleteUser,
} = require("../service/userService");
const router = express.Router();

// Endpoint Users
router.get("/user/:id", getUser);
router.post("/user", createUser);
router.put("/user/:id", updateUser);
router.delete("/user/:id", deleteUser);

module.exports = router;
