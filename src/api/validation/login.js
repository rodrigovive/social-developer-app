const Validator = require("validator");
const _ = require("lodash");

module.exports = data => {
  let errors = {};
 
  if (!Validator.isEmail(data.email || "")) {
    errors.email = "Email is invalid";
  }

  if (!Validator.isLength(data.password || "", { min: 6, max: 30 })) {
    errors.password = "Password must be at least 6 characters";
  }
  if (Validator.isEmpty(data.password || '', { ignore_whitespace: true })) {
    errors.password = "Password field is required";
  }

  if (Validator.isEmpty(data.email || "", { ignore_whitespace: true })) {
    errors.email = "Email field is required";
  }
  return {
    errors,
    isValid: _.isEmpty(errors)
  };
};
