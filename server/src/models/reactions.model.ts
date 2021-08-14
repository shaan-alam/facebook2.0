import mongoose from "mongoose";

export type Reaction = {
  _id: string;
  emoji: string;
  by: string;
};

interface ReactionDocument extends mongoose.Document {
  postId: typeof mongoose.Schema.Types.ObjectId;
  reactions: Reaction[];
}

const ReactionSchema = new mongoose.Schema({
  postId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Post",
  },
  reactions: [
    {
      emoji: String,
      by: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    },
  ],
});

export default mongoose.model<ReactionDocument>("Reactions", ReactionSchema);
