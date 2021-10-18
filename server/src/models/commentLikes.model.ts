import mongoose from "mongoose";

interface Like {
  _id: string;
  by: string;
}

interface CommentLike {
  commentId: typeof mongoose.Schema.Types.ObjectId;
  likes: Like[];
}

const CommentLikesSchema = new mongoose.Schema({
  commentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Post",
  },
  likes: [
    {
      by: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    },
  ],
});

export default mongoose.model<CommentLike>("CommentLikes", CommentLikesSchema);
