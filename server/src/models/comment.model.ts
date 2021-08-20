import mongoose from "mongoose";

interface CommentDocument extends mongoose.Document {
  date: string;
  message: string;
  author: string;
  postId: string;
}

const CommentSchema = new mongoose.Schema({
  date: {
    type: Date,
    default: Date.now,
  },
  message: String,
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  postId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "post",
  },
});

const Comment = mongoose.model<CommentDocument>("Comment", CommentSchema);
export default Comment;
