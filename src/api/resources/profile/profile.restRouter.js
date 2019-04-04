const express = require("express");
const router = express.Router();
const profileController = require('./profile.controller');

// @route   GET api/profile/test
// @desc    Tests profile route
// @access  Public

router.get("/test", profileController.test);

// @route  GET  api/profile
// @desc    GET current users profile
// @access  Private

router.get("/", profileController.passportAuthenticate , profileController.get);

// @route  GET  api/profile/handle/:handle
// @desc    GET profile by handle
// @access  Public

router.get('/handle/:handle', profileController.getUserByHandle);

// @route  GET  api/profile/user/:user_id
// @desc    GET profile by user ID
// @access  Public

router.get('/user/:user_id', profileController.getUserById);

// @route  GET  api/profile/all
// @desc    GET all profiles
// @access  Public

router.get("/all", profileController.getAllProfile);

// @route  POST  api/profile
// @desc    Create or edit user profile
// @access  Private

router.post("/", profileController.passportAuthenticate , profileController.create);

// @route  POST  api/profile/experience
// @desc    Add experience to profile
// @access  Private

router.post("/experience", profileController.passportAuthenticate , profileController.addExperience);

// @route  POST  api/profile/education
// @desc    Add education to profile
// @access  Private

router.post("/education", profileController.passportAuthenticate , profileController.addEducation);

// @route  DELETE  api/profile/experience/:exp_id
// @desc    Delete experience from profile
// @access  Private

router.delete("/experience/:exp_id", profileController.passportAuthenticate , profileController.deleteExperience);

// @route  DELETE  api/profile/education/:exp_id
// @desc    Delete education from profile
// @access  Private

router.delete("/education/:edu_id", profileController.passportAuthenticate , profileController.deleteEducation);

// @route  DELETE  api/profile
// @desc    Delete profile and user
// @access  Private

router.delete("/", profileController.passportAuthenticate , profileController.deleteProfileAndUser);

module.exports = router;