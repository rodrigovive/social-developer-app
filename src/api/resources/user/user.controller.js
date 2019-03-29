// Load User model
const User = require("./user.model");

// Load Input Validation
const validateRegisterInput = require("../../validation/register");
const validateLoginInput = require("../../validation/login");

const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { secretOrKey } = require("../../../config/keys");
const passport = require("passport");

exports.index = (req, res) => {
  res.json({
    msg: "User Works"
  });
};

exports.register = (req, res) => {
  const { errors, isValid } = validateRegisterInput(req.body);

  // Check Validation
  if(!isValid) {
    return res.status(400).json(errors);
  }

  User.findOne({
    email: req.body.email
  }).then(user => {
    if (user) {
      errors.email = "Email already exists";
      return res.status(400).json(errors);
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


  const { errors, isValid } = validateLoginInput({email, password})

  if(!isValid) {
    return res.status(400).json(errors);
  }
  // Find user by email
  User.findOne({ email }).then(user => {
    if (!user) {
      errors.email = "User not found";
      return res.status(404).json(errors);
    }

    // Check password
    bcrypt.compare(password, user.password).then(isMatch => {
      if (isMatch) {
        // res.json({ msg: "Success" });
        // User Matched
        const payload = { id: user.id, name: user.name, avatar: user.avatar }; // Create JWT Payload
        // Sign Token
        jwt.sign(payload, secretOrKey, { expiresIn: 3600 }, (err, token) => {
          if (err) throw Error("JWT Error");
          res.json({
            success: true,
            token: `Bearer ${token}`
          });
        });
      } else {
        errors.password = "Password incorrect";
        return res.status(400).json(errors);
      }
    });
  });
};

exports.passportAuthenticate = passport.authenticate("jwt", { session: false });

exports.current = (req, res) => {
  const { id, email, name } = req.user;
  res.json({
    id,
    name,
    email
  });
};
