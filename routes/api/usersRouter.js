const express = require("express");
const usersRouter = express.Router();
const { createUser } = require("../../controller/Users.controller");
const { check, validationResult } = require("express-validator");
const {inputValidation} = require("../../controller/Users.controller");


// @ router GET api/users
// @ desc Test route
// @ access Public
usersRouter.route("/").post([...inputValidation], createUser);

module.exports = usersRouter;
