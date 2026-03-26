"use client";

import {
  User,
  Award,
  CheckCircle,
  FileText,
  Mail,
  Zap,
  ChevronRight,
  ShieldCheck,
  TrendingUp,
} from "lucide-react";
import Link from "next/link";

export default function ProfilePage() {
  // STATIC DATA - Hardcoded to prevent backend association errors for now
  const staticUser = {
    username: "Scholar Student",
    email: "student@pustakalaya.com",
    educationLevel: "Bachelors",
    faculty: "Engineering",
    contributionPoints: 120,
    rank: "Elite Contributor",
  };

  const staticNotes = [
    {
      id: "1",
      title: "Advanced Quantum Mechanics",
      subject: "Physics",
      status: "approved",
      date: "2024-03-20",
    },
    {
      id: "2",
      title: "Data Structures & Algorithms",
      subject: "Computer Science",
      status: "approved",
      date: "2024-03-18",
    },
    {
      id: "3",
      title: "Thermodynamics Chapter 4",
      subject: "Mechanical",
      status: "pending",
      date: "2024-03-25",
    },
  ];

  return (
    <div className="bg-white min-h-screen font-sans pb-20">
      <div className="max-w-6xl mx-auto px-6 pt-12">
        {/* --- PROFILE HEADER --- */}
        <div className="bg-gray-50/50 rounded-[3.5rem] p-10 md:p-16 border border-gray-100 flex flex-col lg:flex-row items-center gap-12 mb-16 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-64 h-64 bg-[#39E58C]/5 rounded-full blur-3xl -z-10"></div>

          {/* Avatar Area */}
          <div className="w-40 h-40 rounded-[3rem] bg-white border-4 border-white shadow-2xl shadow-emerald-900/10 flex items-center justify-center shrink-0 overflow-hidden">
            <User size={60} className="text-gray-200" />
          </div>

          {/* User Details */}
          <div className="flex-grow text-center lg:text-left space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#39E58C]/10 border border-[#39E58C]/20">
              <ShieldCheck size={14} className="text-[#39E58C]" />
              <span className="text-[10px] font-black text-emerald-700 uppercase tracking-widest">
                {staticUser.rank}
              </span>
            </div>
            <h1 className="text-5xl font-black text-[#0F172A] tracking-tighter leading-tight">
              {staticUser.username.split(" ")[0]}{" "}
              <span className="text-gray-400 font-medium italic">
                Profile is under development will be live soon .
              </span>
            </h1>
            <div className="flex flex-wrap justify-center lg:justify-start gap-6 text-gray-500 font-medium">
              <div className="flex items-center gap-2">
                <Mail size={16} className="text-[#39E58C]" />
                <span className="text-sm">{staticUser.email}</span>
              </div>
              <div className="flex items-center gap-2">
                <Zap size={16} className="text-[#39E58C]" />
                <span className="text-sm uppercase font-bold tracking-tight">
                  {staticUser.educationLevel} • {staticUser.faculty}
                </span>
              </div>
            </div>
          </div>

          {/* Points Card */}
          <div className="bg-[#0F172A] rounded-[2.5rem] p-8 text-center min-w-[200px] shadow-2xl shadow-emerald-900/20 group hover:scale-105 transition-transform duration-500">
            <Award
              className="text-[#39E58C] mx-auto mb-3"
              size={36}
              fill="currentColor"
            />
            <p className="text-4xl font-black text-[#39E58C] tracking-tighter">
              {staticUser.contributionPoints}
            </p>
            <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mt-1">
              Global Score
            </p>
          </div>
        </div>

        {/* --- CONTENT SECTION --- */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Left: Quick Stats */}
          <div className="space-y-6">
            <h3 className="text-xl font-bold text-[#0F172A] tracking-tight ml-4 italic">
              Platform <span className="text-gray-400">Activity.</span>
            </h3>
            <div className="bg-white border border-gray-100 rounded-[2.5rem] p-8 space-y-8">
              <div className="flex justify-between items-center">
                <span className="text-sm font-bold text-gray-400 uppercase tracking-widest">
                  Total Shared
                </span>
                <span className="text-xl font-black text-[#0F172A]">08</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm font-bold text-gray-400 uppercase tracking-widest">
                  Achievements
                </span>
                <span className="text-xl font-black text-[#39E58C]">04</span>
              </div>
              <Link
                href="/upload"
                className="block w-full text-center bg-gray-50 py-4 rounded-2xl font-bold text-sm text-[#0F172A] hover:bg-[#39E58C] hover:text-[#08331E] transition-all"
              >
                Upload More
              </Link>
            </div>
          </div>

          {/* Right: Static Archives */}
          <div className="lg:col-span-2 space-y-6">
            <div className="flex items-center justify-between ml-4">
              <h3 className="text-xl font-bold text-[#0F172A] tracking-tight italic">
                Personal <span className="text-gray-400">Archives.</span>
              </h3>
              <span className="text-[10px] font-black text-gray-300 uppercase tracking-[0.2em]">
                Maintenance Mode
              </span>
            </div>

            <div className="space-y-4">
              {staticNotes.map((note) => (
                <div
                  key={note.id}
                  className="group bg-white border border-gray-100 p-6 rounded-[2rem] flex items-center justify-between opacity-80 cursor-not-allowed"
                >
                  <div className="flex items-center gap-5">
                    <div className="w-12 h-12 rounded-2xl bg-gray-50 flex items-center justify-center text-gray-300">
                      <FileText size={22} />
                    </div>
                    <div>
                      <h4 className="font-bold text-[#0F172A]">{note.title}</h4>
                      <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                        {note.subject} • {note.date}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    {note.status === "approved" ? (
                      <span className="text-[9px] font-black text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full uppercase border border-emerald-100">
                        Live
                      </span>
                    ) : (
                      <span className="text-[9px] font-black text-gray-400 bg-gray-50 px-3 py-1 rounded-full uppercase">
                        Review
                      </span>
                    )}
                    <ChevronRight size={18} className="text-gray-100" />
                  </div>
                </div>
              ))}

              {/* Notice Card */}
              <div className="p-8 bg-emerald-50 rounded-[2.5rem] border border-emerald-100 text-center">
                <TrendingUp size={32} className="text-[#39E58C] mx-auto mb-4" />
                <h4 className="text-emerald-900 font-bold mb-1">
                  Archive System Syncing
                </h4>
                <p className="text-emerald-700/60 text-sm font-medium">
                  We are currently linking your uploads to your profile
                  rankings. Your files are safe in our secure vaults.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
