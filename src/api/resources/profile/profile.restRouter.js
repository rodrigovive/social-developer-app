const express = require("express");
const router = express.Router();
const profileController = require('./profile.controller');

// @route   GET api/profile/test
// @desc    Tests profile route
// @access  Public

router.get("/test", profileController.test);

// @ route  GET  api/profile
// @desc    GET current users profile
// @access  Private

router.get("/", profileController.passportAuthenticate , profileController.get);

// @ route  POST  api/profile
// @desc    Create user profile
// @access  Private

router.post("/", profileController.passportAuthenticate , profileController.create);

module.exports = router;