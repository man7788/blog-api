const express = require("express");
const router = express.Router();
const verifyToken = require("../controllers/verifyToken");

const userController = require("../controllers/userController");

// POST request to sign-up user
router.post("/sign-up", userController.sign_up_b);

// POST request log-in user
router.post("/log-in", userController.login_b);

// GET request to display detail of all blog posts (Protected)
router.get("/posts", verifyToken, userController.posts);

// POST request create new blog post (Protected)
router.post("/posts/create", verifyToken, userController.post_create);

// POST request to delete a specific post and comments for edit page (Protected)
router.post("/posts/:postId/delete", verifyToken, userController.post_delete);

// POST request to edit a specific post (Protected)
router.post("/posts/:postId/edit", verifyToken, userController.post_edit);

// GET request to display a specific post and comments for edit page (Protected)
router.get("/posts/:postId", verifyToken, userController.post_detail);

// POST request to delete a specific comment (Protected)
router.post(
  "/comments/:commentId/delete",
  verifyToken,
  userController.comment_delete
);

// POST request to edit a specific comment (Protected)
router.post(
  "/comments/:commentId/edit",
  verifyToken,
  userController.comment_edit
);

// GET request to display a specific comment for edit page (Protected)
router.get("/comments/:commentId/", verifyToken, userController.comment_detail);

module.exports = router;
