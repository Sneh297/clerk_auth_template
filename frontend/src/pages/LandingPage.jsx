import { Link } from "react-router-dom";
import React from "react";

export default function LandingPage() {
  return (
    <div className="w-screen h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-500 to-purple-600 text-white">
      <h1 className="text-5xl font-bold mb-4">Welcome to Med Connect</h1>
      <p className="text-xl mb-8">Your healthcare connection starts here.</p>

      <Link
        to="/auth"
        className="bg-white text-blue-600 px-6 py-3 rounded-xl font-semibold"
      >
        Login / Sign Up
      </Link>
    </div>
  );
}