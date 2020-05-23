const express = require("express");
const apiRouter = express.Router();
const { send404 } = require("../../error/errorHandling");
const userRouter = require("./usersRouter");
const postsRouter = require("./postsRouter");
const profileRouter = require("./profileRouter");
const  authRouter  = require("./authRouter.js");


// @ router All Methods, routes not described below send 404
// @ desc All methods /api
// @ access Public
apiRouter.route("/").all(send404);

// @ router All Methods
// @ desc All methods /api/users
// @ access Public
apiRouter.use("/users", userRouter);

// @ router All Methods
// @ desc All methods /api/auth
// @ access Public
apiRouter.use("/auth", authRouter);

// @ router All Methods
// @ desc All methods /api/profile
// @ access Public
apiRouter.use("/profile", profileRouter);

// @ router All Methods
// @ desc All methods /api/posts
// @ access Public
apiRouter.use("/posts", postsRouter);

module.exports = apiRouter;
