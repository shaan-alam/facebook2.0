import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import Followers from "./followers.model";
import Following from "./following.model";

export interface UserDocument extends mongoose.Document {
  fullName: string;
  email: string;
  password: string;
  avatar: string;
  details: {
    lives_in_city: string;
    from_city: string;
    bio: string;
    education: string[];
    works: string[];
  };
  cover_picture: string;
  comparePassword: (c: string) => Promise<boolean>;
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
    },
    avatar: {
      type: String,
      default: "",
    },
    cover_picture: {
      type: String,
      default: "",
    },
    details: {
      lives_in_city: {
        type: String,
        default: "",
      },
      from_city: {
        type: String,
        default: "",
      },
      bio: {
        type: String,
        default: "",
      },
      education: {
        type: [String],
        default: [],
      },
      works: {
        type: [String],
        default: [],
      },
    },
  },
  { timestamps: true }
);

// Used for logging in
UserSchema.methods.comparePassword = async function (
  candidatePassword: string
) {
  const user = this as UserDocument;

  return bcrypt.compare(candidatePassword, user.password).catch((e) => false);
};

// Middleware Used For hashing the password
UserSchema.pre("save", async function (next: mongoose.HookNextFunction) {
  const user = this as UserDocument;

  if (user.password) {
    // Hash the password using bcrypt
    const hashedPassword = await bcrypt.hash(user.password, 12);
    user.password = hashedPassword;
  }


  next();
});

// Middleware to create a followers and following document when a new user is created
UserSchema.post("save", async function (user) {
  const followers = await new Followers({ userId: user._id });
  await followers.save();

  const following = await new Following({ userId: user._id });
  await following.save();

  console.log(followers);
  console.log(following);
});

const User = mongoose.model<UserDocument>("User", UserSchema);
export default User;
