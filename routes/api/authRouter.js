const express = require("express");
const authRouter = express.Router();
const auth = require("../../controller/authentication");
const {getUser} = require('../../controller/Users.controller')

// @ router GET api/auth
// @ desc Test route
// @ access Public
authRouter.get("/", auth, getUser);

module.exports = authRouter;
