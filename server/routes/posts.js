const express = require("express");
const router = express.Router();
const {
  getPosts,
  createPost,
  deletePost,
  editPost,
  likePost,
} = require("../controllers/posts");
const { auth } = require("../middlewares/auth");

// Get all the posts
router.get("/", auth, getPosts);

// Create a new post
router.post("/", auth, createPost);

// Delete a post
router.delete("/:id", auth, deletePost);

// Edit a post
router.patch("/:id", auth, editPost);

// Like a post
router.patch("/likePost/:id", auth, likePost);

module.exports = router;
