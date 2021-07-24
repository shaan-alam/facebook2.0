const Post = require("../models/post");
const mongoose = require("mongoose");

// Get all the posts
const getPosts = async (req, res) => {
  try {
    const posts = await Post.find();
    res.json(posts);
  } catch (err) {
    res.json({ message: err.message });
  }
};

// Create a new post
const createPost = async (req, res) => {
  const post = req.body;

  try {
    const newPost = await new Post(post);
    await newPost.save();

    res.json(newPost);
  } catch (err) {
    res.json({ message: err.message });
  }
};

// Delete a post
const deletePost = async (req, res) => {
  const { id: _id } = req.params;

  try {
    await Post.findByIdAndRemove(_id);
    res.json({ message: "Post deletion successful!!" });
  } catch (err) {
    res.json({ message: err.message });
  }
};

// Edit a post
const editPost = async (req, res) => {
  const newPost = req.body;
  const { id: _id } = req.params;

  try {
    const updatedPost = await Post.findByIdAndUpdate(_id, newPost, {
      new: true,
    });
    res.json(updatedPost);
  } catch (err) {
    res.json({ message: err.message });
  }
};

// Like a post
const likePost = async (req, res) => {
  const { id: _id } = req.params;

  const userId = String(req.userId);

  if (!mongoose.Types.ObjectId.isValid(req.userId))
    return res.status(404).json({ message: "No Post with that ID!" });

  try {
    let post = await Post.findOne({ _id });

    if (post.likes.findIndex((id) => id === userId) > -1) {
      post.likes = post.likes.filter((user) => user != userId);
    } else {
      post.likes.push(userId);
    }

    const updatedPost = await Post.findByIdAndUpdate(_id, post, { new: true });
    res.json(updatedPost);
  } catch (err) {
    res.json({ message: err.message });
  }
};

module.exports = { getPosts, createPost, deletePost, editPost, likePost };
