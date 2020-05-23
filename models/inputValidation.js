const { check, validationResult } = require("express-validator");

exports.inputValidation = [
  check("name", "Name is required").not().isEmpty(),
  check("email", "Please provide a valid email address").isEmail(),
  check(
    "password",
    "please enter a password with 6 or more characters"
  ).isLength({ min: 6 }),
]; // express user creation validation.

exports.loginInputValidation = [
  check("email", "Please provide a valid email address").isEmail(),
  check("password", "password is required").exists(),
]; // express user creation validation.

exports.createProfileCheck = [check("status", "status is required").not().isEmpty()];