const mongoose = require("mongoose");
const passport = require("passport");
const validatePost = require("../../validation/post");
// Load Post Model

const Post = require("./post.model");

// Load Profile Model

const Profile = require("../profile/profile.model");

exports.test = (req, res) => res.status(200).json({ msg: "Posts Works" });

exports.get = (req, res) => {
  Post.find()
    .sort({ date: -1 })
    .then(posts => res.json(posts))
    .catch(err => res.status(404).json({ nopostsfound: "No posts found" }));
};

exports.passport = passport.authenticate("jwt", { session: false });

exports.getPostById = (req, res) => {
  const { id } = req.params;
  Post.findById(id)
    .then(post => res.json(post))
    .catch(err =>
      res.status(404).json({ nopostfound: "No post Found with that ID" })
    );
};

exports.create = (req, res) => {
  const { errors, isValid } = validatePost(req.body);
  const {
    body: { name, text, avatar },
    user: { id: userId }
  } = req;
  // Check Validation
  if (!isValid) {
    // Errors
    return res.status(400).json(errors);
  }

  const newPost = new Post({
    text,
    name,
    avatar,
    user: userId
  });
  newPost
    .save()
    .then(post => res.json(post))
    .catch(err => res.json(err));
};

exports.deletePostById = (req, res) => {
  const {
    user: { id: idUser },
    params: { id: idPost }
  } = req;

  Profile.findOne({
    user: idUser
  }).then(profile => {
    Post.findById(idPost)
      .then(post => {
        // Check for post owner
        if (post.user.toString() !== idUser) {
          return res.status(401).json({ notauthorized: "User not authorized" });
        }

        // Delete
        post.remove().then(() => res.json({ success: true }));
      })
      .catch(err => res.status(400).json({ postnotfound: "No post found" }));
  });
};
