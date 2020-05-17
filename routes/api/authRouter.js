const express = require("express");
const authRouter = express.Router();

// @ router GET api/auth
// @ desc Test route
// @ access Public
authRouter.route("/").get((req, res, next) => {
  res.send("auth Route");
});

module.exports = authRouter;
