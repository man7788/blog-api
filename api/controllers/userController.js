const { body, validationResult } = require("express-validator");
const User = require("../models/user");
const Post = require("../models/post");
const Comment = require("../models/comments");
const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Handle sign-up using encrypted password on POST
exports.sign_up_b = [
  body("nickname", "Nickname must not be empty.")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body("username", "Username must not be empty.")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body("password", "Password must not be empty.")
    .trim()
    .isLength({ min: 8 })
    .escape(),
  body("match-password")
    .custom((value, { req }) => {
      return value === req.body.password;
    })
    .withMessage("Passwords do not match."),

  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      res.json({
        nickname: req.body.nickname,
        username: req.body.username,
        password: req.body.password,
        match_password: req.body.match_password,
        errors: errors.array(),
      });
    } else {
      bcrypt.hash(req.body.password, 10, async (err, hashedPassword) => {
        // if err, do something
        if (err) {
          return next(err);
        }
        // otherwise, store hashedPassword in DB
        try {
          const user = new User({
            nickname: req.body.nickname,
            username: req.body.username,
            password: hashedPassword,
          });
          const result = await user.save();
          res.json(result);
        } catch (err) {
          return next(err);
        }
      });
    }
  }),
];

// Handle log-in using encrypted password on POST
exports.login_b = [
  body("username", "Username must not be empty.")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body("password", "Password must not be empty.")
    .trim()
    .isLength({ min: 1 })
    .escape(),

  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      res.json({
        username: req.body.username,
        errors: errors.array(),
      });
    } else {
      const user = await User.findOne({ username: req.body.username });
      if (!user) {
        res.json({
          errors: [{ msg: "User Not Found." }],
        });
      }
      const match = await bcrypt.compare(req.body.password, user.password);
      if (!match) {
        res.json({
          errors: [{ msg: "Incorrect Password." }],
        });
      }
      jwt.sign({ user }, "secretkey", (err, token) => {
        res.json({
          token,
        });
      });
    }
  }),
];

// Display all post on GET.
exports.posts = asyncHandler(async (req, res, next) => {
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

// Display edit a specific post and comments on GET
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
  jwt.verify(req.token, "secretkey", (err, authData) => {
    if (err) {
      res.sendStatus(403);
    } else {
      res.json(response);
    }
  });
});

// Handle post create on POST.
exports.post_create = [
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
      jwt.verify(req.token, "secretkey", async (err, authData) => {
        if (err) {
          res.sendStatus(403);
        } else {
          await post.save();
          res.json({
            post,
          });
        }
      });
    }
  }),
];

// Handle post delete on POST.
exports.post_delete = asyncHandler(async (req, res, next) => {
  const [post, comments] = await Promise.all([
    Post.findById(req.params.postId),
    Comment.find({ post: req.params.postId }),
  ]);
  const response = { post, comments };

  jwt.verify(req.token, "secretkey", async (err, authData) => {
    if (err) {
      res.sendStatus(403);
    } else {
      await Post.findByIdAndRemove(req.params.postId);
      await Comment.deleteMany({ post: req.params.postId });
      res.json(response);
    }
  });
});

// Handle post edit on POST.
exports.post_edit = [
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

  asyncHandler(async (req, res, next) => {
    // Extract the validation errors from a request.
    const errors = validationResult(req);

    // Create a Post object with escaped and trimmed data.
    const post = new Post({
      title: req.body.title,
      content: req.body.content,
      author: req.body.author,
      publish: req.body.publish,
      _id: req.params.postId,
    });

    if (!errors.isEmpty()) {
      // There are errors. Render form again with sanitized values/error messages.
      res.json({
        post,
        errors: errors.array(),
      });
    } else {
      // Data from form is valid. Save Post.
      jwt.verify(req.token, "secretkey", async (err, authData) => {
        if (err) {
          res.sendStatus(403);
        } else {
          await Post.findByIdAndUpdate(req.params.postId, post, {});
          res.json({
            post,
          });
        }
      });
    }
  }),
];

// Display to edit a specific comment on GET
exports.comment_detail = asyncHandler(async (req, res, next) => {
  const comment = await Comment.findById(req.params.commentId);

  jwt.verify(req.token, "secretkey", (err, authData) => {
    if (err) {
      res.sendStatus(403);
    } else {
      res.json({
        comment,
      });
    }
  });
});

// Handle comment delete on POST.
exports.comment_delete = asyncHandler(async (req, res, next) => {
  const comment = await Comment.findById(req.params.commentId);

  jwt.verify(req.token, "secretkey", async (err, authData) => {
    if (err) {
      res.sendStatus(403);
    } else {
      await Comment.findByIdAndRemove(req.params.commentId);
      res.json(comment);
    }
  });
});

// Handle comment edit on POST.
exports.comment_edit = [
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

    const originalComment = await Comment.findById(req.params.commentId);

    const comment = new Comment({
      comment: req.body.comment,
      date: new Date(),
      author: req.body.author,
      post: originalComment.post,
      _id: req.params.commentId,
    });

    if (!errors.isEmpty()) {
      // There are errors. Render form again with sanitized values/error messages.
      res.json({
        comment,
        errors: errors.array(),
      });
    } else {
      jwt.verify(req.token, "secretkey", async (err, authData) => {
        if (err) {
          res.sendStatus(403);
        } else {
          await Comment.findByIdAndUpdate(req.params.commentId, comment, {});
          res.json(comment);
        }
      });
    }
  }),
];
