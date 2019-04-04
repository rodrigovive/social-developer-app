const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");
const postController = require("./post.controller");

// @route   GET api/posts/test
// @desc    Tests post route
// @access  Public

router.get("/test", postController.test);

module.exports = router;
