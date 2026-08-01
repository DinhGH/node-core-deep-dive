const express = require("express");
const router = express.Router();
const usercontroller = require("./controller.js");

router.post("/", usercontroller.createuser);
router.get("/", usercontroller.getuser);
// router.get("/:id", usercontroller.getuserbyid);
router.get("/1u", usercontroller.getuserbyid);
router.put("/:id", usercontroller.updateuser);
router.patch("/:id", usercontroller.updateuser1);
router.delete("/:id", usercontroller.deleteuser);
module.exports = { router };
