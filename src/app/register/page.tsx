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
import { BookOpen, Zap, ArrowRight } from "lucide-react";

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

export default function RegisterPage() {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    educationLevel: "bachelors",
    faculty: "general",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(setLoading());
    try {
      await API.post<AuthResponse>("/auth/register", formData);
      toast.success("Account created! Welcome to Pustakalaya.");
      router.push("/login");
    } catch (error: any) {
      dispatch(setAuthError());
      toast.error(error.response?.data?.message || "Registration failed");
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
        educationLevel: formData.educationLevel,
        faculty: formData.faculty,
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
      {/* LEFT SIDE: FORM (Flex-1) */}
      <div className="flex-1 flex flex-col justify-center px-8 sm:px-12 lg:px-20 py-12 relative overflow-hidden">
        {/* Decorative Background Blur */}
        <div className="absolute top-[-10%] left-[-10%] w-64 h-64 bg-[#39E58C]/10 rounded-full blur-[100px] -z-10"></div>

        <div className="max-w-md w-full mx-auto">
          {/* Logo Link */}
          <Link href="/" className="flex items-center gap-2 mb-10 group">
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
            Create{" "}
            <span className="text-gray-400 font-medium italic">Account.</span>
          </h1>
          <p className="text-gray-500 font-medium mb-8">
            Join the community of 125K+ active scholars.
          </p>

          <form onSubmit={handleRegister} className="space-y-4">
            <div className="space-y-1">
              <label className="text-[11px] font-bold text-gray-400 uppercase tracking-widest ml-4">
                Full Name
              </label>
              <input
                required
                name="username"
                placeholder="e.g. John Doe"
                className="w-full bg-gray-50 border-none rounded-full px-6 py-3.5 focus:ring-2 focus:ring-[#39E58C]/30 outline-none font-medium transition-all"
                onChange={handleChange}
              />
            </div>

            <div className="space-y-1">
              <label className="text-[11px] font-bold text-gray-400 uppercase tracking-widest ml-4">
                Email Address
              </label>
              <input
                required
                name="email"
                type="email"
                placeholder="name@example.com"
                className="w-full bg-gray-50 border-none rounded-full px-6 py-3.5 focus:ring-2 focus:ring-[#39E58C]/30 outline-none font-medium transition-all"
                onChange={handleChange}
              />
            </div>

            <div className="space-y-1">
              <label className="text-[11px] font-bold text-gray-400 uppercase tracking-widest ml-4">
                Password
              </label>
              <input
                required
                name="password"
                type="password"
                placeholder="••••••••"
                className="w-full bg-gray-50 border-none rounded-full px-6 py-3.5 focus:ring-2 focus:ring-[#39E58C]/30 outline-none font-medium transition-all"
                onChange={handleChange}
              />
            </div>

            <div className="grid grid-cols-2 gap-3 pt-2">
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-4">
                  Level
                </label>
                <select
                  name="educationLevel"
                  className="w-full bg-gray-50 border-none rounded-full px-5 py-3 text-sm font-bold text-gray-700 outline-none cursor-pointer"
                  onChange={handleChange}
                  value={formData.educationLevel}
                >
                  <option value="school">School</option>
                  <option value="high_school">High School</option>
                  <option value="bachelors">Bachelors</option>
                  <option value="masters">Masters</option>
                  <option value="phd">PhD</option>
                </select>
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-4">
                  Faculty
                </label>
                <select
                  name="faculty"
                  className="w-full bg-gray-50 border-none rounded-full px-5 py-3 text-sm font-bold text-gray-700 outline-none cursor-pointer"
                  onChange={handleChange}
                  value={formData.faculty}
                >
                  <option value="general">General</option>
                  <option value="science">Science</option>
                  <option value="management">Management</option>
                  <option value="engineering">Engineering</option>
                  <option value="medical">Medical</option>
                  <option value="law">Law</option>
                </select>
              </div>
            </div>

            <button className="w-full bg-[#39E58C] text-[#08331E] py-4 rounded-full font-bold text-lg mt-4 hover:shadow-2xl hover:shadow-emerald-200 transition-all active:scale-95 flex items-center justify-center gap-2">
              Sign Up Free <ArrowRight size={20} />
            </button>
          </form>

          <div className="relative my-8 text-center">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-gray-100"></span>
            </div>
            <span className="relative bg-white px-4 text-[11px] font-bold text-gray-300 uppercase tracking-widest">
              Social Secure Login
            </span>
          </div>

          <div className="flex justify-center mb-8">
            <GoogleLogin
              onSuccess={handleGoogleSuccess}
              onError={() => toast.error("Google Auth Failed")}
              shape="pill"
              width="380"
            />
          </div>

          <p className="text-center text-sm text-gray-500 font-medium">
            Already studying with us?{" "}
            <Link
              href="/login"
              className="text-[#39E58C] font-bold hover:underline"
            >
              Sign In
            </Link>
          </p>
        </div>
      </div>

      {/* RIGHT SIDE: IMAGE (Flex-1) - Hidden on Mobile */}
      <div className="hidden lg:flex flex-1 bg-gray-50 relative overflow-hidden items-center justify-center p-12">
        {/* Subtle background texture or glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#39E58C]/20 rounded-full blur-[120px]"></div>

        <div className="relative z-10 w-full max-w-lg">
          <div className="bg-white p-4 rounded-[3rem] shadow-2xl shadow-emerald-900/10 rotate-2 group hover:rotate-0 transition-transform duration-700">
            <img
              src="https://images.unsplash.com/photo-1544377193-33dcf4d68fb5?q=80&w=1000&auto=format&fit=crop"
              alt="Study illustration"
              className="rounded-[2.5rem] w-full object-cover aspect-[4/5]"
            />
            {/* Floating Badge */}
            <div className="absolute -bottom-6 -left-6 bg-black text-[#39E58C] p-6 rounded-3xl shadow-xl">
              <Zap size={24} fill="currentColor" className="mb-2" />
              <p className="text-xs font-bold uppercase tracking-widest">
                Earn Points
              </p>
              <p className="text-xl font-black">By Sharing</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
