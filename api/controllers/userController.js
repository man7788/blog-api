const { body, validationResult } = require("express-validator");
const User = require("../models/user");
const Post = require("../models/post");
const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Sign-up using encrypted password
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
// Log-in using encrypted password
exports.login_b = [
  body("username", "Username must not be empty.")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body("password", "Password must not be empty.")
    .trim()
    .isLength({ min: 8 })
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
        throw new Error("User Not Found.");
      }
      const match = await bcrypt.compare(req.body.password, user.password);
      if (!match) {
        throw new Error("Incorrect Password.");
      }
      jwt.sign({ user }, "secretkey", (err, token) => {
        res.json({
          token,
        });
      });
    }
  }),
];

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

// Handle post update on POST.
// Handle post delete on POST.
exports.post_delete = asyncHandler(async (req, res, next) => {
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
