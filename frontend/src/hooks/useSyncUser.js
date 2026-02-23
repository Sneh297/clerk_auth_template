import React from "react";
// hooks/useSyncUser.js
// hooks/useSyncUser.js

import { useUser } from "@clerk/clerk-react";
import { useEffect, useRef } from "react";

export default function useSyncUser() {
  const { user, isLoaded, isSignedIn } = useUser();
  const url = import.meta.env.VITE_BACKEND_URL;

  const sessionSyncedRef = useRef(false);

  useEffect(() => {
    if (!isLoaded || !isSignedIn || !user) return;

    // Create stable snapshot with ONLY fields you care about
    const cleanUser = {
      clerkId:   user.id,
      email:     user.primaryEmailAddress?.emailAddress || "",
      firstName: user.firstName || "",
      lastName:  user.lastName || "",
      username:  user.username || "",     // 👈 Added username support
      avatar:    user.imageUrl || "",
    };

    const snapshot = JSON.stringify(cleanUser);

    const previousSnapshot =
      sessionStorage.getItem("user_snapshot_" + user.id);

    // Prevent syncing if no real changes
    if (previousSnapshot === snapshot) return;

    // Prevent multiple syncs per session
    if (sessionSyncedRef.current) return;

    const syncUser = async () => {
      try {
        await fetch(`${url}/api/users/sync`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: snapshot,
        });

        // Mark synced for session
        sessionSyncedRef.current = true;

        // Save snapshot to prevent repeated syncing
        sessionStorage.setItem("user_snapshot_" + user.id, snapshot);
      } catch (err) {
        console.error("Sync failed:", err);
      }
    };

    syncUser();
  }, [isLoaded, isSignedIn, user?.id]);
}