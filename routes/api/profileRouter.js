const express = require("express");
const profileRouter = express.Router();
const { auth, loginUser } = require("../../controller/authentication");
const { getProfile } = require("../../controller/profile.controller");
const {createProfileCheck} = require('../../models/inputValidation')
const { check, validationResult } = require("express-validator");

// @ router GET api/profile
// @ desc Test route
// @ access Public

profileRouter
  .route("/")
  .get((req, res, next) => {
    res.send("profile Route");
  })
  .post([auth, [...createProfileCheck]], (req, res) => {});

profileRouter.route("/me").get(auth, getProfile);

module.exports = profileRouter;
