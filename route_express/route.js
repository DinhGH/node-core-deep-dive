const express = require("express");
const router = express.Router();
const usercontroller = require("./controller.js");
const middleware = require("./middleware.js");
const { validateSchedema, createUserSchdema } = require("./zod.validation.js");

// router.post("/", middleware.validateUserData, usercontroller.createuser);
router.post(
  "/",
  validateSchedema(createUserSchdema),
  usercontroller.createuser,
);
router.get("/", usercontroller.getuser); //get user phan trang
router.get("/filter", usercontroller.getuserfilter); //get user voi filter
router.get("/detail/:id", usercontroller.getUserDetail);
// router.get("/:id", usercontroller.getuserbyid);
router.get("/1u", middleware.checkuserid, usercontroller.getuserbyid);
router.put("/:id", usercontroller.updateuser);
router.patch("/:id", usercontroller.updateuser1);
router.delete("/:id", usercontroller.deleteuser);
module.exports = { router };
