const { body, validationResult } = require("express-validator");
const Post = require("../models/post");
const asyncHandler = require("express-async-handler");

exports.posts = asyncHandler(async (req, res, next) => {
  const posts = await Post.find();
  res.json(posts);
});
