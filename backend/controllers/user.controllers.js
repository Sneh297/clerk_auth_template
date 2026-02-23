// controllers/user.controller.js

import User from "../models/User.js";

export const syncUser = async (req, res) => {
  try {
    const { clerkId, email, firstName, lastName,username, avatar } = req.body;

   
    // validation
    if (!clerkId || !email) {
      return res.status(400).json({ error: "clerkId and email are required" });
    }

    // upsert — create if new, skip if already exists
   const user = await User.findOneAndUpdate(
  { clerkId },
  { clerkId, email, firstName, lastName, username, avatar },
  { upsert: true, returnDocument: 'after' }
);
    return res.status(200).json({ success: true, user });

  } catch (err) {
    console.error("Sync user error:", err.message);
    return res.status(500).json({ error: "Internal server error" });
  }
};