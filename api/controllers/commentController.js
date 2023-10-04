const { body, validationResult } = require("express-validator");
const Comment = require("../models/comment");
const asyncHandler = require("express-async-handler");

exports.submit_comment = asyncHandler(async (req, res, next) => {
  const posts = await Post.find();
  res.json(posts);
});
