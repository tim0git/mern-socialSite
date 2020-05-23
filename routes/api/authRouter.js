const express = require("express");
const authRouter = express.Router();
const {auth, loginUser} = require("../../controller/authentication");
const {getUser}  = require("../../controller/Users.controller");
const { loginInputValidation } = require("../../models/inputValidation");
const {handle405} = require('../../error/errorHandling.js')


// @ router POST api/auth
// @ desc Login User (validate login credentials and retrieve token)
// @ access Private
authRouter
  .route("/")
  .get(auth, getUser)
  .post([...loginInputValidation], loginUser).all(handle405);

module.exports = authRouter;
