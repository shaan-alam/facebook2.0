import mongoose from "mongoose";

interface FollowingDocument extends mongoose.Document {
  userId: mongoose.Schema.Types.ObjectId;
  following: mongoose.Schema.Types.ObjectId[];
}

const FollowingSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  following: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
});

const following = mongoose.model<FollowingDocument>(
  "Following",
  FollowingSchema
);
export default following;
