const express = require("express");
const apiRouter = express.Router();
const { send404 } = require("../../error/errorHandling");
const userRouter = require("./usersRouter");
const postsRouter = require("./postsRouter");
const profileRouter = require("./profileRouter");
const  authRouter  = require("./authRouter.js");
// @ router GET api/api
// @ desc Test route
// @ access Public

// working
apiRouter.route("/").all(send404);
apiRouter.use("/users", userRouter);
apiRouter.use("/auth", authRouter);
apiRouter.use("/profile", profileRouter);
apiRouter.use("/posts", postsRouter);

module.exports = apiRouter;
