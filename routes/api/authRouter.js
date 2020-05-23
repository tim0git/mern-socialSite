const express = require("express");
const authRouter = express.Router();
const {auth, loginUser} = require("../../controller/authentication");
const {getUser}  = require("../../controller/Users.controller");
const { loginInputValidation } = require("../../models/inputValidation");




// @ router GET api/auth
// @ desc Test route
// @ access Public


authRouter
  .route("/")
  .get(auth, getUser)
  .post([...loginInputValidation], loginUser);

module.exports = authRouter;
