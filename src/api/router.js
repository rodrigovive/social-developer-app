const express = require("express");
const userRouter = require("./resources/user/user.restRouter");
const profileRouter = require("./resources/profile/profile.restRouter");
const router = express.Router();
router.use("/users", userRouter);
router.use("/profile", profileRouter);

module.exports = router;
