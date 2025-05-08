const express = require("express");
const router = express.Router();
const { authMiddleware } = require("../middleware/authmiddleware");
const { onlyAdmin } = require("../middleware/adminmiddleware");
const Post = require("../controller/post");

// Create a new post
router.post("/create", authMiddleware, onlyAdmin, Post.CreatePost);
router.get("/allpost", authMiddleware, onlyAdmin, Post.GetAllPost);

module.exports = router;
