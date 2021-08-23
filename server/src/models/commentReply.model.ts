import mongoose from "mongoose";

interface CommentReplyDocument extends mongoose.Document {
  _id: string;
  message: string;
  commentId: string;
  date: string;
}

const commentReplySchema = new mongoose.Schema({
  message: {
    type: String,
    required: true,
  },
  commentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Comment",
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model<CommentReplyDocument>(
  "CommentReply",
  commentReplySchema
);
