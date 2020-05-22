const { check, validationResult } = require("express-validator");
const User = require("../models/Schemas/UserSchema");
const gravatar = require("gravatar");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const config = require("config");


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
    const avatar = gravatar.url(email, { s: 200, r: "pg", d: "mm" });
    user = new User({
      name,
      email,
      avatar,
      password,
    });
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);
    await user.save();

    const payload = {
      user: {
        id: user.id,
      },
    };
    console.log("called");

    jwt.sign(
      payload,
      config.get("jwtToken"),
      { expiresIn: 3600 },
      (err, token) => {
        if (err) throw err;
        res.status(201).send({ token });
      }
    );
  } catch (err) {
    next(err);
  }
};

exports.getUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    res.status(200).send(user);
  } catch (err) {
    next(err);
  }
};
