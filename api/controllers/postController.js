const { body, validationResult } = require("express-validator");
const Post = require("../models/post");
const Comment = require("../models/comments");
const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");

// Get all published posts on GET
exports.posts = asyncHandler(async (req, res, next) => {
  const posts = await Post.find({ publish: true });
  res.json(posts);
});

// Get a specific post and comments on GET
exports.post_detail = asyncHandler(async (req, res, next) => {
  const [post, comments] = await Promise.all([
    Post.findById(req.params.id).populate("author", "username"),
    Comment.find({ post: req.params.id }),
  ]);
  const response = { post, comments };
  res.json(response);
});

// Handle post create on POST.
exports.create_post = [
  // Validate and sanitize fields.
  body("title", "Title must not be empty.")
    .trim()
    .isLength({ min: 1, max: 1000 })
    .escape(),
  body("content", "Content must not be empty.")
    .trim()
    .isLength({ min: 1, max: 10000 })
    .escape(),
  body("date", "Invalid Date.").toDate(),
  body("author", "Author must not be empty.")
    .optional()
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body("publish", "Publish must not be empty.").trim().isBoolean().escape(),

  // Process request after validation and sanitization.
  asyncHandler(async (req, res, next) => {
    // Extract the validation errors from a request.
    const errors = validationResult(req);

    // Create a Post object with escaped and trimmed data.
    const post = new Post({
      title: req.body.title,
      content: req.body.content,
      author: req.body.author,
      publish: req.body.publish,
    });

    if (!errors.isEmpty()) {
      // There are errors. Render form again with sanitized values/error messages.
      res.json({
        post,
        errors: errors.array(),
      });
    } else {
      // Data from form is valid. Save Post.
      await post.save();
      res.json(post);
    }
  }),
];

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
      post: req.params.id,
    });

    if (!errors.isEmpty()) {
      res.json({
        comment,
        errors: errors.array(),
      });
    } else {
      await comment.save();
      res.json(comment);
    }
  }),
];

// Handle post update on POST.
// Handle post delete on POST.
// Handle post publication details on GET.
exports.posts_status = asyncHandler(async (req, res, next) => {
  const posts = await Post.find();

  jwt.verify(req.token, "secretkey", (err, authData) => {
    if (err) {
      res.sendStatus(403);
    } else {
      res.json({
        posts,
      });
    }
  });
});

// Handle comment update on POST.
// Handle comment delete on POST.
