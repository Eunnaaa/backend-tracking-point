const express = require("express");
const userController = require("../controller/userController");

const router = express.Router();

router.get("/", userController.getAllUsers);
router.post("/", userController.createUser);
router.post("/user", userController.createUser); // backward compatibility

router.get("/:id", userController.getUser);
router.get("/user/:id", userController.getUser); // backward compatibility

router.put("/:id", userController.updateUser);
router.put("/user/:id", userController.updateUser); // backward compatibility

router.delete("/:id", userController.deleteUser);
router.delete("/user/:id", userController.deleteUser); // backward compatibility

module.exports = router;
