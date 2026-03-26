/* eslint-disable react/no-unescaped-entities */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import API from "@/store/lib/api";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import Link from "next/link";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Backend Endpoint: POST /api/auth/forgot-password
      await API.post("/auth/forgot-password", { email });

      toast.success("OTP sent! Check your Gmail.");

      // We pass the email in the URL so the Reset page knows who is resetting
      router.push(`/reset-password?email=${encodeURIComponent(email)}`);
    } catch (error: any) {
      toast.error(error.response?.data?.message || "User not found");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-xl border border-gray-100">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">
          Forgot Password?
        </h1>
        <p className="text-gray-500 text-sm mb-6">
          Enter your email and we'll send you a 6-digit reset code.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            required
            type="email"
            placeholder="email@example.com"
            className="w-full border p-3 rounded-xl outline-none focus:ring-2 focus:ring-blue-400"
            onChange={(e) => setEmail(e.target.value)}
          />
          <button
            disabled={loading}
            className="w-full bg-blue-600 text-white py-3 rounded-xl font-bold hover:bg-blue-700 transition disabled:bg-blue-300"
          >
            {loading ? "Sending..." : "Send Reset Code"}
          </button>
        </form>

        <div className="mt-6 text-center">
          <Link
            href="/login"
            className="text-sm text-blue-600 hover:underline font-medium"
          >
            Back to Login
          </Link>
        </div>
      </div>
    </div>
  );
}
