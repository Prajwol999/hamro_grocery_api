import mongoose from "mongoose";

const { Schema } = mongoose;

const UserSchema = new Schema(
  {
    fullName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      default: "normal",
    },
    profilePicture: {
      type: String,
      default: '', // Default to an empty string
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", UserSchema);

export default User; 