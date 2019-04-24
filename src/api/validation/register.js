const Validator = require("validator");
const _ = require("lodash");

module.exports = data => {
  let errors = {};

  if (!Validator.isLength(data.name || "", { min: 2, max: 30 })) {
    errors.name = "Name must be between 2 and 30 characters";
  }
  if (Validator.isEmpty(data.name || '', { ignore_whitespace: true })) {
    errors.name = "Name field is required";
  }
  if (!Validator.isEmail(data.email || "")) {
    errors.email = "Email is invalid";
  }
  if (Validator.isEmpty(data.email || "", { ignore_whitespace: true })) {
    errors.email = "Email field is required";
  }
  if (Validator.isEmpty(data.password2 || "", { ignore_whitespace: true })) {
    errors.password2 = "Confirm Password field is required";
  }
  if (!Validator.equals(data.password || "", data.password2 || "")) {
    errors.password = "Password must match";
  }
  if (!Validator.isLength(data.password || "", { min: 6, max: 30 })) {
    errors.password = "Password must be at least 6 characters";
  }
  if (Validator.isEmpty(data.password || '', { ignore_whitespace: true })) {
    errors.password = "Password field is required";
  }
  return {
    errors,
    isValid: _.isEmpty(errors)
  };
};
