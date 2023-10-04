const express = require("express");
const router = express.Router();

const postsController = require("../controllers/postsControllers");

router.get("/", postsController.posts);

module.exports = router;
