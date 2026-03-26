/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import API from "@/store/lib/api";
import toast from "react-hot-toast";

export default function ResetPassword() {
  const searchParams = useSearchParams();
  const email = searchParams.get("email") || "";
  const router = useRouter();

  const [formData, setFormData] = useState({
    otp: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [loading, setLoading] = useState(false);

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.newPassword !== formData.confirmPassword) {
      return toast.error("Passwords do not match");
    }

    setLoading(true);
    try {
      // Backend Endpoint: POST /api/auth/reset-password
      // Body: { email, otp, newPassword }
      await API.post("/auth/reset-password", {
        email,
        otp: formData.otp,
        newPassword: formData.newPassword,
      });

      toast.success("Password updated! Please login.");
      router.push("/login");
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Invalid OTP or error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-xl border border-gray-100">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">
          Reset Password
        </h1>
        <p className="text-sm text-gray-500 mb-6">
          Enter the 6-digit code sent to{" "}
          <span className="font-bold text-blue-600">{email}</span>
        </p>

        <form onSubmit={handleReset} className="space-y-4">
          <input
            required
            type="text"
            maxLength={6}
            placeholder="6-digit OTP"
            className="w-full border p-3 rounded-xl text-center text-2xl tracking-[1em] font-bold outline-none focus:ring-2 focus:ring-blue-400"
            onChange={(e) => setFormData({ ...formData, otp: e.target.value })}
          />
          <input
            required
            type="password"
            placeholder="New Password"
            className="w-full border p-3 rounded-xl outline-none focus:ring-2 focus:ring-blue-400"
            onChange={(e) =>
              setFormData({ ...formData, newPassword: e.target.value })
            }
          />
          <input
            required
            type="password"
            placeholder="Confirm New Password"
            className="w-full border p-3 rounded-xl outline-none focus:ring-2 focus:ring-blue-400"
            onChange={(e) =>
              setFormData({ ...formData, confirmPassword: e.target.value })
            }
          />

          <button
            disabled={loading}
            className="w-full bg-green-600 text-white py-3 rounded-xl font-bold hover:bg-green-700 transition disabled:bg-green-300 shadow-md"
          >
            {loading ? "Updating..." : "Update Password"}
          </button>
        </form>
      </div>
    </div>
  );
}
