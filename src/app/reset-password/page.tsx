/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, Suspense } from "react"; // 1. Import Suspense
import { useSearchParams, useRouter } from "next/navigation";
import API from "@/store/lib/api";
import toast from "react-hot-toast";
import { Loader2, ShieldCheck } from "lucide-react";

// 2. Move your form logic into a separate internal component
function ResetPasswordContent() {
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
    <div className="flex min-h-screen items-center justify-center bg-white p-4 font-sans">
      <div className="w-full max-w-md bg-white p-10 rounded-[3rem] border border-gray-100 shadow-2xl shadow-emerald-100/50">
        <h1 className="text-4xl font-black text-[#0F172A] tracking-tighter mb-2">
          Reset{" "}
          <span className="text-gray-400 font-medium italic">Security.</span>
        </h1>
        <p className="text-sm text-gray-500 mb-8 font-medium">
          Verify code for{" "}
          <span className="text-[#39E58C] font-bold">{email}</span>
        </p>

        <form onSubmit={handleReset} className="space-y-5">
          <input
            required
            type="text"
            maxLength={6}
            placeholder="6-digit code"
            className="w-full bg-gray-50 border-none rounded-full px-6 py-4 text-center text-2xl tracking-[0.5em] font-black outline-none focus:ring-2 focus:ring-[#39E58C]/20 transition-all"
            onChange={(e) => setFormData({ ...formData, otp: e.target.value })}
          />
          <input
            required
            type="password"
            placeholder="New Password"
            className="w-full bg-gray-50 border-none rounded-full px-6 py-4 outline-none focus:ring-2 focus:ring-[#39E58C]/20 transition-all font-medium"
            onChange={(e) =>
              setFormData({ ...formData, newPassword: e.target.value })
            }
          />
          <input
            required
            type="password"
            placeholder="Confirm New Password"
            className="w-full bg-gray-50 border-none rounded-full px-6 py-4 outline-none focus:ring-2 focus:ring-[#39E58C]/20 transition-all font-medium"
            onChange={(e) =>
              setFormData({ ...formData, confirmPassword: e.target.value })
            }
          />

          <button
            disabled={loading}
            className="w-full bg-[#39E58C] text-[#08331E] py-4 rounded-full font-bold text-lg hover:shadow-xl transition-all disabled:bg-gray-200 flex justify-center items-center gap-2"
          >
            {loading ? <Loader2 className="animate-spin" /> : "Update Password"}
          </button>
        </form>
      </div>
    </div>
  );
}

// 3. The main export wraps everything in Suspense
export default function ResetPasswordPage() {
  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center min-h-screen bg-white">
          <Loader2 className="animate-spin text-[#39E58C]" size={40} />
        </div>
      }
    >
      <ResetPasswordContent />
    </Suspense>
  );
}
