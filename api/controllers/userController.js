const { body, validationResult } = require("express-validator");
const User = require("../models/user");
const asyncHandler = require("express-async-handler");

// Testing purpose not open to public
exports.user_sign_up = asyncHandler(async (req, res, next) => {
  const user = new User({
    username: req.body.username,
    password: req.body.password,
  });

  await user.save();
  res.json(user);
});
