const Validator = require("validator");
const _ = require("lodash");

module.exports = data => {
  let errors = {};

  // Handle Validator
  if (!Validator.isLength(data.handle || "", { min: 2, max: 40 })) {
    errors.handle = "Handle needs to between 2 and 40 characters";
  }

  if (Validator.isEmpty(data.handle || "", { ignore_whitespace: true })) {
    errors.handle = "Handle field is required";
  }

  // Status Validator
  if (Validator.isEmpty(data.status || "", { ignore_whitespace: true })) {
    errors.status = "Status field is required";
  }

  // Skills Validator
  if (Validator.isEmpty(data.skills || "", { ignore_whitespace: true })) {
    errors.skills = "Skill field is required";
  }

  // Website Validator

  if (!Validator.isEmpty(data.website || "", { ignore_whitespace: true })) {
    if (!Validator.isURL(data.website)) {
      errors.website = "Not a valid URL";
    }
  }

  // Social Validator

  if (!Validator.isEmpty(data.youtube || "", { ignore_whitespace: true })) {
    if (!Validator.isURL(data.youtube)) {
      errors.youtube = "Not a valid URL";
    }
  }

  if (!Validator.isEmpty(data.twitter || "", { ignore_whitespace: true })) {
    if (!Validator.isURL(data.twitter)) {
      errors.twitter = "Not a valid URL";
    }
  }

  if (!Validator.isEmpty(data.facebook || "", { ignore_whitespace: true })) {
    if (!Validator.isURL(data.facebook)) {
      errors.facebook = "Not a valid URL";
    }
  }

  if (!Validator.isEmpty(data.instagram || "", { ignore_whitespace: true })) {
    if (!Validator.isURL(data.instagram)) {
      errors.instagram = "Not a valid URL";
    }
  }

  if (!Validator.isEmpty(data.linkedin || "", { ignore_whitespace: true })) {
    if (!Validator.isURL(data.linkedin)) {
      errors.linkedin = "Not a valid URL";
    }
  }

  return {
    errors,
    isValid: _.isEmpty(errors)
  };
};
