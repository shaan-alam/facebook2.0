import mongoose from "mongoose";

interface PostDocument extends mongoose.Document {
  imageURL: string;
  caption: string;
  author: typeof mongoose.Schema.Types.ObjectId;
  likes: typeof mongoose.Schema.Types.ObjectId[];
}

const PostSchema = new mongoose.Schema({
  imageURL: {
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
});

const Post = mongoose.model<PostDocument>("Post", PostSchema);
export default Post;
