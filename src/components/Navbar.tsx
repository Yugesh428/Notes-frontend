"use client";

import Link from "next/link";
import { useAppSelector, useAppDispatch } from "@/store/hooks";
import { logout } from "@/store/slice/authSlice";
import { useRouter, usePathname } from "next/navigation";
import {
  LogOut,
  ChevronDown,
  ShieldCheck,
  BookOpen,
  Search,
  User as UserIcon,
  Home,
  LayoutDashboard,
  Trophy,
  Info,
  Mail,
} from "lucide-react";
import toast from "react-hot-toast";

export default function Navbar() {
  const { isAuthenticated, user } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const router = useRouter();
  const pathname = usePathname();

  const handleLogout = () => {
    dispatch(logout());
    toast.success("Logged out");
    router.push("/login");
  };

  const isActive = (path: string) =>
    pathname === path
      ? "text-black font-semibold"
      : "text-gray-500 hover:text-black";

  return (
    <nav className="sticky top-0 z-50 w-full bg-white/90 backdrop-blur-md border-b border-gray-100 h-[72px] flex items-center font-sans">
      <div className="max-w-7xl mx-auto px-6 w-full flex justify-between items-center">
        <div className="flex items-center gap-8">
          <Link href="/" className="flex items-center gap-3 group shrink-0">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-[#39E58C] to-[#2ecc71] flex items-center justify-center shadow-lg shadow-emerald-200/50">
              <BookOpen
                size={20}
                className="text-[#08331E]"
                strokeWidth={2.5}
              />
            </div>
            <div className="flex flex-col leading-none">
              <span className="text-[20px] font-bold text-[#0F172A] tracking-tighter">
                Pustaka<span className="font-medium text-gray-400">laya</span>
              </span>
            </div>
          </Link>

          <div className="hidden lg:flex items-center gap-6">
            <Link
              href="/"
              className={`${isActive("/")} text-[13px] transition-colors flex items-center gap-1.5`}
            >
              <Home size={14} /> Home
            </Link>

            {isAuthenticated && (
              <>
                <Link
                  href="/all-notes"
                  className={`${isActive("/all-notes")} text-[13px] transition-colors flex items-center gap-1.5`}
                >
                  <Search size={14} /> Browse
                </Link>
                <Link
                  href="/feed"
                  className={`${isActive("/feed")} text-[13px] transition-colors flex items-center gap-1.5`}
                >
                  <LayoutDashboard size={14} /> Feed
                </Link>
              </>
            )}

            <Link
              href="/leaderboard"
              className={`${isActive("/leaderboard")} text-[13px] transition-colors flex items-center gap-1.5`}
            >
              <Trophy size={14} /> Rankings
            </Link>

            {/* NEW LINKS */}
            <Link
              href="/about"
              className={`${isActive("/about")} text-[13px] transition-colors flex items-center gap-1.5`}
            >
              <Info size={14} /> About
            </Link>
            <Link
              href="/contact"
              className={`${isActive("/contact")} text-[13px] transition-colors flex items-center gap-1.5`}
            >
              <Mail size={14} /> Contact
            </Link>
          </div>
        </div>

        <div className="flex items-center gap-6">
          {isAuthenticated ? (
            <div className="flex items-center gap-5">
              {user?.role === "SuperAdmin" && (
                <Link
                  href="/admin/dashboard"
                  className="text-[11px] font-black text-emerald-700 bg-[#39E58C]/10 px-3 py-1.5 rounded-full border border-[#39E58C]/20 tracking-wider"
                >
                  ADMIN
                </Link>
              )}
              <Link href="/profile" className="flex items-center gap-3 group">
                <div className="text-right hidden sm:block">
                  <p className="text-[13px] font-bold text-gray-800">
                    {user?.username}
                  </p>
                  <p className="text-[10px] text-[#39E58C] font-bold uppercase tracking-tighter">
                    {user?.level}
                  </p>
                </div>
                <div className="w-8 h-8 rounded-full border border-gray-100 overflow-hidden bg-gray-50 flex items-center justify-center">
                  {user?.profileImage ? (
                    <img
                      src={user.profileImage}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <UserIcon size={16} className="text-gray-400" />
                  )}
                </div>
              </Link>
              <Link
                href="/upload"
                className="bg-[#39E58C] text-[#08331E] px-6 py-2 rounded-full font-bold text-[13px] hover:shadow-lg transition-all active:scale-95"
              >
                Upload
              </Link>
              <button
                onClick={handleLogout}
                className="text-gray-300 hover:text-red-500 transition-colors"
              >
                <LogOut size={18} />
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-6">
              <Link
                href="/login"
                className="text-gray-500 hover:text-black font-semibold text-[13px]"
              >
                Sign In
              </Link>
              <Link
                href="/register"
                className="bg-[#39E58C] text-[#08331E] px-7 py-2.5 rounded-full font-bold text-[13px] hover:shadow-lg transition-all active:scale-95"
              >
                Join Free
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
