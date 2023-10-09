const express = require("express");
const router = express.Router();
const verifyToken = require("../controllers/verifyToken");

const userController = require("../controllers/userController");

// router.post("/sign-up", userController.user_sign_up);

// Sign-up user on POST
router.post("/sign-up", userController.sign_up_b);

// Log-in user on POST
router.post("/log-in", userController.login_b);

// Get publication status of all blog posts (Protected)
router.get("/publish", verifyToken, userController.posts_status);

// Create new blog post (Protected)
router.post("/create", userController.create_post);

module.exports = router;
