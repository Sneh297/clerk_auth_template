// models/User.js

import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    clerkId:   { type: String, required: true, unique: true },
    email:     { type: String, required: true, unique: true },
    firstName: { type: String, default: "" },
    lastName:  { type: String, default: "" },
     username:  { type: String, default: "" },
    avatar:    { type: String, default: "" },
  },
  { timestamps: true } // adds createdAt and updatedAt automatically
);

export default mongoose.models.User || mongoose.model("User", UserSchema);