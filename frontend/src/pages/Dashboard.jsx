import { UserButton, useUser ,} from "@clerk/clerk-react";

import useSyncUser from "../hooks/useSyncUser";
import React from "react";
export default function Dashboard() {
   useSyncUser();
  const { user } = useUser();


  
  if (!user) return null; // loading state

  return (
    <div className="p-6 text-black">
      <UserButton />
      <h1 className="text-3xl font-bold">Welcome, {user.firstName} 👋</h1>

      <div className="mt-4 space-y-2">
        <p><strong>Email:</strong> {user.primaryEmailAddress?.emailAddress}</p>
        <p><strong>User ID:</strong> {user.id}</p>
        <p><strong>Full Name:</strong> {user.fullName}</p>
        <p><strong>User Name</strong> {user.username}</p>
        

        {user.imageUrl && (
          <img
            src={user.imageUrl}
            alt="profile"
            className="w-20 h-20 rounded-full mt-4"
          />
        )}
      </div>
    </div>
  );
}