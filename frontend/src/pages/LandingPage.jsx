import React from 'react';
import { Link } from 'react-router-dom';

export default function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-blue-600 to-indigo-700 text-white p-6">
      <h1 className="text-5xl font-extrabold mb-4">Welcome to GripInvest</h1>
      <p className="mb-8 text-lg max-w-xl text-center">
        Your mini investment platform for smart and AI-powered portfolio management.
      </p>
      <div className="space-x-6">
        <Link
          to="/signup"
          className="bg-white text-blue-700 px-6 py-3 rounded font-semibold hover:bg-gray-100 transition"
        >
          Get Started (Signup)
        </Link>
        <Link
          to="/login"
          className="border border-white px-6 py-3 rounded font-semibold hover:bg-white hover:text-blue-700 transition"
        >
          Login
        </Link>
      </div>
    </div>
  );
}
