const express = require("express");
const router = express.Router();
const postcontroller = require("./controller.js");
router.get("/", postcontroller.getpost);
router.get("/:id", postcontroller.getpostbyid);
module.exports = { router };
