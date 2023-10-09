const express = require("express");
const router = express.Router();
const verifyToken = require("../controllers/verifyToken");

const userController = require("../controllers/userController");

// Sign-up user
router.post("/sign-up", userController.sign_up_b);

// Log-in user
router.post("/log-in", userController.login_b);

// Get publication status of all blog posts (Protected)
router.get("/posts", verifyToken, userController.posts);

// Create new blog post (Protected)
router.post("/posts/create", verifyToken, userController.post_create);

// Delete a specific post and comments for edit page (Protected)
router.post("/posts/:id/delete", verifyToken, userController.post_delete);

// Get a specific post and comments for edit page (Protected)
router.get("/posts/:id", verifyToken, userController.post_detail);

module.exports = router;
