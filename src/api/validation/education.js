const Validator = require("validator");
const _ = require("lodash");

module.exports = data => {
  let errors = {};

  // School Validate
  if (Validator.isEmpty(data.school || "", { ignore_whitespace: true })) {
    errors.school = "School field is required";
  }

  // Degree Validate
  if (Validator.isEmpty(data.degree || "", { ignore_whitespace: true })) {
    errors.degree = "Degree field is required";
  }

  // Field of Study Validate
  if (Validator.isEmpty(data.fieldofstudy || "")) {
    errors.fieldofstudy = "Field of Study field is required";
  }

  return {
    errors,
    isValid: _.isEmpty(errors)
  };
};
