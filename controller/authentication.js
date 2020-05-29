const { check, validationResult } = require("express-validator");
const User = require("../models/Schemas/UserSchema");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const config = require("config");

exports.auth = (req, res, next) => {
  const token = req.header("x-auth-token");
  if (!token) {
    return res.status(401).send({ message: "no token authorisation denied" });
  }
  try {
    const decoded = jwt.verify(token, config.get("jwtToken"));
    req.user = decoded.user
    next();
  } catch (err) {
    res.status(401).send({ message: "token is not valid" });
  }
};

exports.loginUser = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).send({ errors: errors.array() });
  }
  // create new user if no error.
  const { email, password } = req.body;
  try {
    let user = await User.findOne({ email });

    if (!user) {
      return res.status(404).send({ error: "Invalid login details" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(404).send({ error: "Invalid login details" });
    }

    const payload = {
      user: {
        id: user.id,
      },
    };

    jwt.sign(
      payload,
      config.get("jwtToken"),
      { expiresIn: config.get('tokenTimeOut') },
      (err, token) => {
        if (err) throw err;
        res.status(201).send({ token });
      }
    );
  } catch (err) {
    next(err);
  }
};
