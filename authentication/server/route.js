const express = require("express");
const router = express.Router();
const userController = require("./controller.js");
const middleware = require("./middleware.js");

// router.get("/", userController.getUserByEmail);
router.get("/all", middleware.authenticate, userController.getAllUser);
router.post("/register", userController.register);
router.post("/login", userController.login);
router.post("/auth/refresh-token", userController.refreshToken);

module.exports = { router };
