import mongoose from "mongoose";

interface PostDocument extends mongoose.Document {
  imageURL: string;
  caption: string;
  author: typeof mongoose.Schema.Types.ObjectId;
  filter: string
}

const PostSchema = new mongoose.Schema(
  {
    filter: String,
    imageURL: {
      type: String,
      default: "",
    },
    thumbnailURL: {
      type: String,
      default: "",
    },
    caption: {
      type: String,
      default: "",
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

const Post = mongoose.model<PostDocument>("Post", PostSchema);
export default Post;
