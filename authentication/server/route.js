const express = require("express");
const router = express.Router();
const userController = require("./controller.js");

// router.get("/", userController.getUserByEmail);
router.post("/register", userController.register);
// router.post("/login", userController.login);

module.exports = router;
