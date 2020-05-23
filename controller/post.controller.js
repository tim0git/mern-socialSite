const { check, validationResult } = require("express-validator");
const Profile = require("../models/Schemas/ProfileSchema");
const User = require("../models/Schemas/UserSchema");
const Post = require("../models/Schemas/Post.Schema");

exports.createNewPost = async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).send({ errors: errors.array() });
  }

  try {
    const user = await User.findById(req.user.id).select("-password");
    const newPost = new Post({
      text: req.body.text,
      name: user.name,
      avatar: user.avatar,
      user: req.user.id,
    });
    const post = await newPost.save();
    res.status(201).send(post);
  } catch (error) {
    next(error);
  }
};

exports.getAllPosts = async (req, res, next) => {
  try {
    const posts = await Post.find().sort({ date: -1 });
    res.status(200).send(posts);
  } catch (error) {
    next(error);
  }
};

exports.getPostsById = async (req, res, next) => {
  try {
    const posts = await Post.findById(req.params.id);
    if (!posts) {
      return res.status(404).send({ message: "post not found" });
    }
    res.status(200).send(posts);
  } catch (error) {
    next(error);
  }
};

exports.deletePostById = async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).send({ message: "post not found" });
    }

    if (post.user.toString() !== req.user.id) {
      return res.status(401).send({ message: "user not authorised" });
    }

    await post.remove();

    res.status(200).send({ message: "post removed" });
  } catch (error) {
    next(error);
  }
};

exports.likePost = async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.id);

    if (
      post.likes.filter((like) => like.user.toString() === req.user.id).length >
      0
    ) {
      return res.status(400).send({ message: "post can only be like once" });
    }

    post.likes.unshift({ user: req.user.id });

    await post.save();

    res.status(201).send(post.likes);
  } catch (error) {
    next(error);
  }
};

exports.unlikePost = async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.id);

    if (
      post.likes.filter((like) => like.user.toString() === req.user.id)
        .length === 0
    ) {
      return res.status(400).send({ message: "post has not yet been liked" });
    }

    const removeIndex = post.likes
      .map((like) => like.user.toString())
      .indexOf(req.user.id);

    post.likes.splice(removeIndex, 1);

    await post.save();

    res.status(200).send(post.likes);
  } catch (error) {
    next(error);
  }
};

exports.createNewComment = async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).send({ errors: errors.array() });
  }

  try {
    const user = await User.findById(req.user.id).select("-password");
    const post = await Post.findById(req.params.id);

    const newComment = {
      text: req.body.text,
      name: user.name,
      avatar: user.avatar,
      user: req.user.id,
    };

    post.comments.unshift(newComment);

    await post.save();

    res.status(201).send(post.comments);
  } catch (error) {
    next(error);
  }
};

exports.deleteComment = async (req, res, next) => {
  try {
    //const user = await User.findById(req.user.id).select("-password");
    const post = await Post.findById(req.params.id);

    const comment = post.comments.find(
      (comment) => comment.id === req.params.comment_id
    );

    if (!comment) {
      return res.status(404).send({ message: "comment not found" });
    }

    if (comment.user.toString() !== req.user.id) {
      return res.status(401).send({ message: "user not authorised" });
    }

    const removeIndex = post.comments
      .map((comment) => comment.user.toString())
      .indexOf(req.user.id);

    post.comments.splice(removeIndex, 1);

    await post.save();

    res.status(200).send(post.comments);
  } catch (error) {
    next(error);
  }
};
