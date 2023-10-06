const express = require("express");
const router = express.Router();

const userController = require("../controllers/userController");

router.post("/", userController.user_sign_up);

module.exports = router;
