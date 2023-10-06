const express = require("express");
const router = express.Router();

const userController = require("../controllers/userController");

// router.post("/sign-up", userController.user_sign_up);

// Sign-up user on POST
router.post("/sign-up", userController.sign_up_b);

// Log-in user on POST
router.post("/log-in", userController.login_b);

module.exports = router;
