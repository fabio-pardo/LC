const Validator = require("validator");
const isEmpty = require("is-empty");

module.exports = function validateLoginInput(data) {
  let errors = {};

  // Convert empty fields to empty string so we can use the validator functions
  data.email = !isEmpty(data.email) ? data.email : "";
  data.password = !isEmpty(data.email) ? data.password : "";

  // Email checks
  if (Validator.isEmpty(data.email)) {
    errors.email = "Email field is required";
  } else if (!Validator.isEmail(data.email)) {
    errors.email = "Email is invalid";
  }

  // Password checks
  if (Validator.isEmpty(data.password)) {
    errors.password = "Password field is required";
  }

  return {
    errors: errors,
    isValid: isEmpty(errors),
  };
};
