import mongoose from "mongoose";

interface FollowingDocument extends mongoose.Document {
  userId: mongoose.Types.ObjectId;
  following: { user: mongoose.Types.ObjectId }[];
}

const FollowingSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  following: [
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    },
  ],
});

const following = mongoose.model<FollowingDocument>(
  "Following",
  FollowingSchema
);
export default following;
