const express = require("express");
const postsRouter = express.Router();
const { auth } = require("../../controller/authentication");
const { postInputCheck } = require("../../models/inputValidation");
const {
  createNewPost,
  getAllPosts,
  getPostsById,
  deletePostById,
  likePost,
  unlikePost,
  createNewComment,
  deleteComment,
} = require("../../controller/post.controller");
const { handle405 } = require("../../error/errorHandling.js");

// @ router GET api/posts
// @ desc gets all post
// @ access Private
postsRouter
  .route("/")
  .get(auth, getAllPosts)
  .post([auth, [...postInputCheck]], createNewPost)
  .all(handle405);

// @ router GET api/posts/:id
// @ desc Gets all post by a specific post :id
// @ access Private
postsRouter
  .route("/:id")
  .get(getPostsById)
  .delete(auth, deletePostById)
  .all(handle405);

// @ router PUT api/posts/like/:id
// @ desc Adds a like to a specific post by post :id
// @ access Private
postsRouter.route("/like/:id").put(auth, likePost).all(handle405);

// @ router PUT api/posts/unlike/:id
// @ desc Removes a like to a specific post by post :id
// @ access Private
postsRouter.route("/unlike/:id").put(auth, unlikePost).all(handle405);

// @ router POST api/posts/comment/:id/:comment_id
// @ desc Adds a comment to a specific post by post :id
// @ access Private
postsRouter
  .route("/comment/:id")
  .post([auth, [...postInputCheck]], createNewComment)
  .all(handle405);

// @ router delete api/posts/comment/:id/:comment_id
// @ desc Deletes a comment to a specific post by post :id
// @ access Private
postsRouter
  .route("/comment/:id/:comment_id")
  .delete(auth, deleteComment)
  .all(handle405);

module.exports = postsRouter;
