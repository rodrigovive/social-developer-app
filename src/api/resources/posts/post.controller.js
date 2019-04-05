const mongoose = require("mongoose");
const passport = require("passport");
const validatePost = require("../../validation/post");
// Load Post Model

const Post = require("./post.model");

// Load Profile Model

const Profile = require("../profile/profile.model");

exports.test = (req, res) => res.status(200).json({ msg: "Posts Works" });

exports.getPost = (req, res) => {
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

exports.createPost = (req, res) => {
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

exports.likeByPostId = (req, res) => {
  const {
    user: { id: idUser },
    params: { id: idPost }
  } = req;

  Profile.findOne({ user: idUser })
    .then(profile => {
      Post.findById(idPost)
        .then(post => {
          if (post.likes.some(like => like.user.toString() === idUser)) {
            return res.status(400).json({
              alreadyliked: "User already liked this post"
            });
          }
          // Add user id to likes array
          post.likes.unshift({ user: idUser });

          post.save().then(post => res.status(200).json(post));
        })
        .catch(err =>
          res.status(404).json({
            postnotfound: "No post found"
          })
        );
    })
    .catch(err => res.status(404).json(err));
};

exports.unlikeByPostId = (req, res) => {
  const {
    user: { id: idUser },
    params: { id: idPost }
  } = req;

  Profile.findOne({ user: idUser })
    .then(profile => {
      Post.findById(idPost)
        .then(post => {
          if (!post.likes.some(like => like.user.toString() === idUser)) {
            return res.status(400).json({
              nolikedyet: "You have not yet liked this post"
            });
          }
          // Get remove index
          const removeIndex = post.likes
            .map(item => {
              item => item.user.toString();
            })
            .indexOf(idUser);

          // Splice out of array
          post.likes.splice(removeIndex, 1);

          post.save().then(post => res.status(200).json(post));
        })
        .catch(err =>
          res.status(404).json({
            postnotfound: "No post found"
          })
        );
    })
    .catch(err => res.status(404).json(err));
};

exports.commentByPostId = (req, res) => {
  const {isValid, errors} = validatePost(req.body);

  if(!isValid){
    return res.status(400).json(errors);
  }
  const {
    user: { id: idUser },
    params: { id: idPost },
    body: { text, name, avatar }
  } = req;

  Post.findById(idPost)
    .then(post => {
      const newComment = {
        text,
        name,
        avatar
      };

      // add to comments array

      post.comments.unshift(newComment);
      post.save().then(post => res.json(post));
    })
    .catch(err => res.status(404).json({ postnotfound: "No post found" }));
};

exports.deleteCommentByPostId = (req, res) => {
  const {
    user: { id: idUser },
    params: { id: idPost, comment_id: idComment }
  } = req;

  Post.findById(idPost)
    .then(post => {
      if (post.comments.some(comment => comment._id.toString() === idComment)) {
        // Get remove index
        const removeIndex = post.comments
          .map(item => item._id.toString())
          .indexOf(idComment);

        // Splice comment out of array

        post.comments.splice(removeIndex, 1);
        post.save().then(post => res.json(post));
      } else {
        return res.status(404).json({
          commentnotexists: "Comment does not exist"
        });
      }
    })
    .catch(err => res.status(404).json({ postnotfound: "No post found" }));
};
