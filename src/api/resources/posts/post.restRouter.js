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

router.get("/", postController.getPost);

// @route   GET api/posts/:id
// @desc    Get post by id
// @access  Public

router.get("/:id", postController.getPostById);

// @route   POST api/posts/test
// @desc    Create post
// @access  Private

router.post("/", postController.passport, postController.createPost);

// @route   DELETE api/posts/:id
// @desc    Delete post by id
// @access  Private

router.delete("/:id", postController.passport, postController.deletePostById);

// @route   POST api/posts/like/:id
// @desc    Like post
// @access  Private

router.post('/like/:id', postController.passport, postController.likeByPostId)

// @route   POST api/posts/unlike/:id
// @desc    Unlike post
// @access  Private

router.post('/unlike/:id', postController.passport, postController.unlikeByPostId)

// @route   POST api/posts/comment/:id
// @desc    Add comment to post
// @access  Private

router.post('/comment/:id', postController.passport, postController.commentByPostId)

// @route   DELETE api/comment/:id
// @desc    Delete commnet of post by id
// @access  Private

router.delete("/comment/:id/:comment_id", postController.passport, postController.deleteCommentByPostId);


module.exports = router;
