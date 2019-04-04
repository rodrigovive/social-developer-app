const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");
const postController = require("./post.controller");

// @route   GET api/posts/test
// @desc    Tests post route
// @access  Public

router.get("/test", postController.test);

// @route   GET api/posts
// @desc    Get post 
// @access  Public

router.get("/", postController.get);

// @route   GET api/posts/:id
// @desc    Get post by id
// @access  Public

router.get("/:id", postController.getPostById);

// @route   POST api/posts/test
// @desc    Create post
// @access  Private

router.post("/", postController.passport, postController.create);

// @route   DELETE api/posts/:id
// @desc    Delete post by id
// @access  Private

router.delete("/:id", postController.passport, postController.deletePostById);

module.exports = router;
