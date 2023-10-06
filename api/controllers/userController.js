const { body, validationResult } = require("express-validator");
const User = require("../models/user");
const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");

// // Testing purpose not open to public
// exports.user_sign_up = asyncHandler(async (req, res, next) => {
//   const user = new User({
//     username: req.body.username,
//     password: req.body.password,
//   });

//   await user.save();
//   res.json(user);
// });

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
      res.json(user);
    }
  }),
];
