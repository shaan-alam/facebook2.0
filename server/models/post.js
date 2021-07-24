const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema({
  title: String,
  description: String,
  tags: [String],
  likes: {
    type: [String],
    default: [],
  },
  creator: String,
  createdAt: {
    type: Date,
    defualt: new Date(),
  },
  imgURL: String,
});

module.exports = mongoose.model("Post", PostSchema);
