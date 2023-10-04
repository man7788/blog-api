const express = require("express");
const router = express.Router();

const commentController = require("../controllers/commentControllers");

router.post("/comment", commentController.submit_comment);

module.exports = router;
