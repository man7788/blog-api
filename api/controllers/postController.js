const { body, validationResult } = require("express-validator");
const Post = require("../models/post");
const Comment = require("../models/comments");
const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");

// Handle all published posts on GET
exports.posts = asyncHandler(async (req, res, next) => {
  const posts = await Post.find({ publish: true }).populate({
    path: "author",
    model: "User",
    select: "username",
  });
  res.json(posts);
});

// Handle a specific post and comments on GET
exports.post_detail = asyncHandler(async (req, res, next) => {
  const [post, comments] = await Promise.all([
    Post.findById(req.params.postId).populate({
      path: "author",
      model: "User",
      select: "username",
    }),
    Comment.find({ post: req.params.postId }),
  ]);
  const response = { post, comments };
  res.json(response);
});

// Handle comment create on POST.
exports.create_comment = [
  body("comment", "Comment must not be empty.")
    .trim()
    .isLength({ min: 1, max: 5000 })
    .escape(),
  body("date", "Invalid Date.").toDate(),
  body("author", "Author must not be empty.")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body("post", "Post must not be empty.")
    .optional()
    .isLength({ min: 1 })
    .trim()
    .escape(),

  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);

    const comment = new Comment({
      comment: req.body.comment,
      date: new Date(),
      author: req.body.author,
      post: req.params.postId,
    });

    if (!errors.isEmpty()) {
      res.json({
        errors: errors.array(),
      });
    } else {
      await comment.save();
      res.json(comment);
    }
  }),
];
