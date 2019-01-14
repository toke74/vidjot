const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateIdeasInput(data) {
  let errors = {};

  data.title = !isEmpty(data.title) ? data.title : "";
  data.details = !isEmpty(data.details) ? data.details : "";

  if (Validator.isEmpty(data.title)) {
    errors.title = "Title field is required";
  }

  if (Validator.isEmpty(data.details)) {
    errors.details = "Details field is required";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
