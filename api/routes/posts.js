const express = require("express");
const router = express.Router();

const postController = require("../controllers/postController");

// Get all published posts
router.get("/", postController.posts);

// Get a specific post
router.get("/:postId", postController.post_detail);

// Create new comment for a blog post
router.post("/:postId/comment/create", postController.create_comment);

module.exports = router;
