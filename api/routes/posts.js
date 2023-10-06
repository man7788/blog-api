const express = require("express");
const router = express.Router();

const postController = require("../controllers/postController");

// Get all published posts
router.get("/", postController.posts);

// Get a specific post
router.get("/:id", postController.post_detail);

// Create new blog post
router.post("/create", postController.create_post);

// Create new commnet for a blog post
router.post("/:id/comment", postController.create_comment);

module.exports = router;
