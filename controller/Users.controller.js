const { check, validationResult } = require("express-validator");
const User = require("../models/Schemas/UserSchema");
const Profile = require("../models/Schemas/ProfileSchema");
const gravatar = require("gravatar");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const config = require("config");

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
    console.log(config.get("tokenTimeOut"));
    jwt.sign(
      payload,
      config.get("jwtToken"),
      { expiresIn: config.get("tokenTimeOut") },
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

exports.deleteUserById = async (req, res, next) => {
  const { id } = req.user;
  try {
    //@todo remove users posts
    await Profile.findOneAndRemove({ user: id });
    await User.findOneAndRemove({ _id: id });
    res.status(200).send({ message: `user ${id} deleted` });
  } catch (error) {
    next(error);
  }
};
