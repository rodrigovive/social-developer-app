const mongoose = require("mongoose");
const passport = require("passport");

// Load Post Model

const Post = require("./post.model");

// Load User Profile

const User = require("../user/user.model");

exports.test = (req, res) => res.status(200).json({ msg: "Posts Works" });

