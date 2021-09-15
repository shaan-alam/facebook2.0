import mongoose from "mongoose";

interface FollowersDocument extends mongoose.Document {
  userId: mongoose.Types.ObjectId;
  followers: { user: mongoose.Types.ObjectId }[];
}

const FollowersSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  followers: [
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    },
  ],
});

const Followers = mongoose.model<FollowersDocument>(
  "Followers",
  FollowersSchema
);

export default Followers;
