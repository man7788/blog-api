const express = require("express");
const router = express.Router();
const verifyToken = require("../controllers/verifyToken");

const postController = require("../controllers/postController");

// Get all published posts
router.get("/", postController.posts);

// Get publication status of all blog posts (Protected)
router.get("/publish", verifyToken, postController.posts_status);

// Create new blog post (Protected)
router.post("/create", postController.create_post);

// Get a specific post
router.get("/:id", postController.post_detail);

// Create new comment for a blog post
router.post("/:id/comment", postController.create_comment);

module.exports = router;
