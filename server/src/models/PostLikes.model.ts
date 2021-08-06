import mongoose from "mongoose";

interface PostLikesDocument extends mongoose.Document {
  postId: typeof mongoose.Schema.Types.ObjectId;
  likes: Array<string>;
}

const PostLikesSchema = new mongoose.Schema({
  postId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Post",
  },
  likes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
});

const PostLikes = mongoose.model<PostLikesDocument>(
  "PostLikes",
  PostLikesSchema
);

export default PostLikes;
