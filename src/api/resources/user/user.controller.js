// Load User model
const User = require("./user.model");

const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken')
const {secretOrKey} = require('../../../config/keys');
exports.index = (req, res) => {
  res.json({
    msg: "User Works"
  });
};

exports.register = (req, res) => {
  User.findOne({
    email: req.body.email
  }).then(user => {
    if (user) {
      return res.status(400), json({ email: "Email already exists" });
    } else {
      const avatar = gravatar.url(req.body.email, {
        s: "200", // Size
        r: "pg", // Rating
        d: "mm" // Default
      });
      const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        avatar,
        password: req.body.password
      });

      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          newUser
            .save()
            .then(user => res.status(201).json(user))
            .catch(err => console.log(err));
        });
      });
    }
  });
};

exports.login = (req, res) => {
  const { email, password } = req.body;

  // Find user by email
  User.findOne({ email }).then(user => {
    if (!user) {
      return res.status(404).json({ email: "User not found" });
    }

    // Check password
    bcrypt.compare(password, user.password).then(isMatch => {
      if (isMatch) {
        // res.json({ msg: "Success" });
        // User Matched
        const payload = {  id: user.id, name: user.name, avatar: user.avatar} // Create JWT Payload
        // Sign Token
        jwt.sign(
          payload, 
          secretOrKey, 
          { expireIn: 3600 }, 
          (err, token) => {
            if(err) throw Error('JWT Error');
            res.json({
              success: true,
              token: `Bearer${token}`
            })
          });
      
      } else {
        return res
          .status(400)
          .json({
          password: "Password incorrect"
        });
      }
    });
  });
};
