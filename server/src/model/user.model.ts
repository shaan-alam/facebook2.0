import mongoose from "mongoose";

interface UserDocument extends mongoose.Document {
  fullName: String;
  email: String;
  password: String;
}

const UserSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      min: 6,
      required: true,
    },
  },
  { timestamps: true }
);

const User = mongoose.model<UserDocument>("User", UserSchema);
export default User;
