const express = require("express");
const usersRouter = express.Router();
const { createUser } = require("../../controller/Users.controller");
const { check, validationResult } = require("express-validator");
const { inputValidation } = require("../../models/inputValidation");

// @ router GET api/users
// @ desc Test route
// @ access Public
usersRouter.route("/").post([...inputValidation], createUser);

module.exports = usersRouter;
