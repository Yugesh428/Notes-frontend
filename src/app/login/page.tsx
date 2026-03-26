/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import API from "@/store/lib/api";
import { useAppDispatch } from "@/store/hooks";
import { setAuth, setLoading, setAuthError } from "@/store/slice/authSlice";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import Link from "next/link";
import { GoogleLogin, CredentialResponse } from "@react-oauth/google";
import { BookOpen, Zap, ArrowRight, Lock, Eye, EyeOff } from "lucide-react"; // Added Eye icons

interface AuthResponse {
  data: {
    token: string;
    id: string;
    username: string;
    role: "student" | "moderator" | "SuperAdmin";
    level: string;
    faculty: string;
  };
  message: string;
}

export default function LoginPage() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [localLoading, setLocalLoading] = useState(false);

  // New State for Password Visibility
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLocalLoading(true);
    dispatch(setLoading());
    try {
      const res = await API.post<AuthResponse>("/auth/login", formData);
      dispatch(setAuth({ token: res.data.data.token, user: res.data.data }));
      toast.success("Welcome back to Pustakalaya!");
      router.push("/feed");
    } catch (error: any) {
      dispatch(setAuthError());
      toast.error(error.response?.data?.message || "Invalid Email or Password");
    } finally {
      setLocalLoading(false);
    }
  };

  const handleGoogleSuccess = async (
    credentialResponse: CredentialResponse,
  ) => {
    if (!credentialResponse.credential) return;
    dispatch(setLoading());
    try {
      const res = await API.post<AuthResponse>("/auth/google-login", {
        idToken: credentialResponse.credential,
      });
      dispatch(setAuth({ token: res.data.data.token, user: res.data.data }));
      toast.success("Login Successful!");
      router.push("/feed");
    } catch (error: any) {
      dispatch(setAuthError());
      toast.error("Google Auth Failed");
    }
  };

  return (
    <div className="flex min-h-screen bg-white font-sans">
      {/* LEFT SIDE: LOGIN FORM */}
      <div className="flex-1 flex flex-col justify-center px-8 sm:px-12 lg:px-20 py-12 relative overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-64 h-64 bg-[#39E58C]/10 rounded-full blur-[100px] -z-10"></div>

        <div className="max-w-md w-full mx-auto">
          <Link href="/" className="flex items-center gap-2 mb-12 group">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-[#39E58C] to-[#2ecc71] flex items-center justify-center shadow-lg shadow-emerald-100">
              <BookOpen
                size={18}
                className="text-[#08331E]"
                strokeWidth={2.5}
              />
            </div>
            <span className="text-xl font-bold text-[#0F172A] tracking-tighter">
              Pustakalaya
            </span>
          </Link>

          <h1 className="text-4xl font-black text-[#0F172A] tracking-tighter leading-tight mb-2">
            Welcome{" "}
            <span className="text-gray-400 font-medium italic">Back.</span>
          </h1>
          <p className="text-gray-500 font-medium mb-10">
            Log in to access your personalized study feed.
          </p>

          <form onSubmit={handleLogin} className="space-y-5">
            <div className="space-y-1">
              <label className="text-[11px] font-bold text-gray-400 uppercase tracking-widest ml-4">
                Email Address
              </label>
              <input
                required
                type="email"
                placeholder="name@example.com"
                className="w-full bg-gray-5 border-none rounded-full px-6 py-3.5 focus:ring-2 focus:ring-[#39E58C]/30 outline-none font-medium transition-all"
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
              />
            </div>

            <div className="space-y-1">
              <label className="text-[11px] font-bold text-gray-400 uppercase tracking-widest ml-4">
                Password
              </label>
              <div className="relative">
                <input
                  required
                  type={showPassword ? "text" : "password"} // Dynamic type
                  placeholder="••••••••"
                  className="w-full bg-gray-50 border-none rounded-full px-6 py-3.5 focus:ring-2 focus:ring-[#39E58C]/30 outline-none font-medium transition-all"
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                />
                {/* The Eye Button */}
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#39E58C] transition-colors"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <div className="flex justify-end pr-2">
              <Link
                href="/forgot-password"
                className="text-sm font-bold text-[#39E58C] hover:underline transition-all"
              >
                Forgot Password?
              </Link>
            </div>

            <button
              disabled={localLoading}
              className="w-full bg-[#39E58C] text-[#08331E] py-4 rounded-full font-bold text-lg mt-2 hover:shadow-2xl hover:shadow-emerald-200 transition-all active:scale-95 flex items-center justify-center gap-2 disabled:bg-gray-200"
            >
              {localLoading ? "Authenticating..." : "Sign In"}{" "}
              <ArrowRight size={20} />
            </button>
          </form>

          <div className="relative my-10 text-center">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-gray-100"></span>
            </div>
            <span className="relative bg-white px-4 text-[11px] font-bold text-gray-300 uppercase tracking-widest">
              Or Secure Entry
            </span>
          </div>

          <div className="flex justify-center mb-10">
            <GoogleLogin
              onSuccess={handleGoogleSuccess}
              onError={() => toast.error("Google Login Failed")}
              shape="pill"
              width="380"
            />
          </div>

          <p className="text-center text-sm text-gray-500 font-medium">
            New to Pustakalaya?{" "}
            <Link
              href="/register"
              className="text-[#39E58C] font-bold hover:underline"
            >
              Create Account
            </Link>
          </p>
        </div>
      </div>

      {/* RIGHT SIDE: IMAGE */}
      <div className="hidden lg:flex flex-1 bg-gray-50 relative overflow-hidden items-center justify-center p-12">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#39E58C]/20 rounded-full blur-[120px]"></div>

        <div className="relative z-10 w-full max-w-lg">
          <div className="bg-white p-4 rounded-[3rem] shadow-2xl shadow-emerald-900/10 -rotate-2 group hover:rotate-0 transition-transform duration-700">
            <img
              src="https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?q=80&w=1000&auto=format&fit=crop"
              alt="Library"
              className="rounded-[2.5rem] w-full h-full object-cover aspect-[4/5]"
            />
            <div className="absolute -top-6 -right-6 bg-black text-[#39E58C] p-6 rounded-3xl shadow-xl">
              <Lock size={24} fill="currentColor" className="mb-2" />
              <p className="text-xs font-bold uppercase tracking-widest">
                Secure
              </p>
              <p className="text-xl font-black">Archives</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
