const { check, validationResult } = require("express-validator");
const { createNewUser } = require("../models/createUser.model");

exports.inputValidation = [
  check("name", "Name is required").not().isEmpty(),
  check("email", "Please provide a valid email address").isEmail(),
  check(
    "password",
    "please enter a password with 6 or more characters"
  ).isLength({ min: 6 }),
]; // express user creation validation.

exports.createUser = async (req, res, next) => {
  // error checking for body of request.
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).send({ errors: errors.array() });
  }
  // create new user if no error.
  const { name, email, password } = req.body;
  try {
    await createNewUser(name, email, password);
    res.send({ message: "User registered", response: req.body });
  } catch (err) {
    next(err);
  }
};
