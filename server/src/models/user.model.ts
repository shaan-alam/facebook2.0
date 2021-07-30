import mongoose from "mongoose";
import bcrypt from "bcryptjs";

export interface UserDocument extends mongoose.Document {
  fullName: string;
  email: string;
  password: string;
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

// Used for logging in
UserSchema.methods.comparePasswod = async function (candidatePassword: string) {
  const user = this as UserDocument;

  return bcrypt.compare(candidatePassword, user.password).catch((e) => false);
};

// Used For hashing the password
UserSchema.pre("save", async function (next: mongoose.HookNextFunction) {
  const user = this as UserDocument;

  // Hash the password using bcrypt
  const hashedPassword = await bcrypt.hash(user.password, 12);

  user.password = hashedPassword;

  next();
});

const User = mongoose.model<UserDocument>("User", UserSchema);
export default User;
