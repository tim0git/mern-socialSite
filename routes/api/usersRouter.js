const express = require("express");
const usersRouter = express.Router();
const { createUser } = require("../../controller/Users.controller");
const { check, validationResult } = require("express-validator");
const { inputValidation } = require("../../models/inputValidation");
const { handle405 } = require("../../error/errorHandling.js");

// @ router POST api/users
// @ desc Create new user from user registation page
// @ access Public
usersRouter
  .route("/")
  .post([...inputValidation], createUser)
  .all(handle405);

module.exports = usersRouter;
