const Validator = require("validator");
const _ = require("lodash");

module.exports = data => {
  let errors = {};

  // Title Validate
  if (Validator.isEmpty(data.title || "", { ignore_whitespace: true })) {
    errors.title = "Job title field is required";
  }

  // Company Validate
  if (Validator.isEmpty(data.company || "", { ignore_whitespace: true })) {
    errors.company = "Company field is required";
  }

  // From Validate
  if (Validator.isEmpty(data.from || "")) {
    errors.from = "From date field is required";
  }

  return {
    errors,
    isValid: _.isEmpty(errors)
  };
};
