const express = require("express");
const router = express.Router();

const posts = {
  posts: [
    {
      title: "First Post",
      content: "This is some blog post content.",
    },
    { title: "Second Post", content: "This is some blog post content too." },
  ],
};
/* GET home page. */
router.get("/", function (req, res, next) {
  res.json(posts);
});

module.exports = router;
