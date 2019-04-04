const Validator = require("validator");
const _ = require("lodash");

module.exports = data => {
  let errors = {};

  if (!Validator.isLength(data.text || "", { min: 5, max: 300 })) {
    errors.text = "Text must be between 10 and 300 characters";
  }

  if (Validator.isEmpty(data.text || '', { ignore_whitespace: true })) {
    errors.text = "Text field is required";
  }

  return {
    errors,
    isValid: _.isEmpty(errors)
  };
};
