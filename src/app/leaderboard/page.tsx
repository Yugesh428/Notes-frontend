/* eslint-disable react/jsx-no-undef */
"use client";

import { useEffect, useState } from "react";
import API from "@/store/lib/api";
import {
  Trophy,
  Medal,
  User as UserIcon,
  Loader2,
  Crown,
  TrendingUp,
  Link,
} from "lucide-react";

interface TopStudent {
  username: string;
  educationLevel: string;
  faculty: string;
  contributionPoints: number;
  profileImage?: string;
}

export default function LeaderboardPage() {
  const [students, setStudents] = useState<TopStudent[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRanking = async () => {
      try {
        const res = await API.get<TopStudent[]>("/users/leaderboard");
        setStudents(res.data);
      } catch (e) {
        console.error("Failed to load rankings");
      } finally {
        setLoading(false);
      }
    };
    fetchRanking();
  }, []);

  if (loading)
    return (
      <div className="flex justify-center items-center min-h-[70vh]">
        <Loader2 className="animate-spin text-[#39E58C]" size={40} />
      </div>
    );

  return (
    <div className="bg-white min-h-screen font-sans">
      <div className="max-w-4xl mx-auto px-6 py-16">
        {/* HEADER SECTION */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#39E58C]/10 border border-[#39E58C]/20 mb-6">
            <Crown size={14} className="text-[#39E58C]" fill="currentColor" />
            <span className="text-[11px] font-bold text-emerald-700 uppercase tracking-widest text-glow-green">
              Global Contributors
            </span>
          </div>
          <h1 className="text-5xl md:text-6xl font-black text-[#0F172A] tracking-tighter leading-none mb-4">
            Top <span className="text-[#39E58C]">Scholars.</span>
          </h1>
          <p className="text-gray-400 font-medium text-lg italic">
            Celebrating students who share the gift of knowledge.
          </p>
        </div>

        {/* RANKINGS LIST */}
        <div className="bg-white rounded-[3rem] shadow-[0_30px_100px_rgba(0,0,0,0.04)] border border-gray-50 overflow-hidden">
          <div className="p-4 space-y-3">
            {students.length === 0 ? (
              <p className="text-center py-20 text-gray-400 font-medium italic">
                The race to the top has begun...
              </p>
            ) : (
              students.map((student, index) => (
                <div
                  key={student.username}
                  className={`group flex items-center justify-between p-6 rounded-[2.5rem] transition-all duration-300
                        ${index === 0 ? "bg-emerald-50/50 border border-emerald-100" : "hover:bg-gray-50 border border-transparent"}`}
                >
                  <div className="flex items-center gap-6">
                    {/* RANK BADGE */}
                    <div className="w-12 flex justify-center">
                      {index === 0 ? (
                        <div className="w-10 h-10 rounded-full bg-[#39E58C] flex items-center justify-center text-[#08331E] shadow-lg shadow-emerald-200">
                          <Crown size={20} fill="currentColor" />
                        </div>
                      ) : index === 1 ? (
                        <div className="w-9 h-9 rounded-full bg-slate-200 flex items-center justify-center text-slate-600">
                          <Medal size={18} />
                        </div>
                      ) : (
                        <span className="text-xl font-black text-gray-300 group-hover:text-[#39E58C] transition-colors">
                          {index + 1}
                        </span>
                      )}
                    </div>

                    {/* AVATAR */}
                    <div className="w-14 h-14 rounded-2xl border-2 border-white shadow-sm overflow-hidden bg-gray-100 flex items-center justify-center shrink-0">
                      {student.profileImage ? (
                        <img
                          src={student.profileImage}
                          className="w-full h-full object-cover"
                          alt=""
                        />
                      ) : (
                        <UserIcon size={24} className="text-gray-300" />
                      )}
                    </div>

                    {/* INFO */}
                    <div>
                      <h3 className="text-lg font-bold text-[#0F172A] group-hover:text-[#39E58C] transition-colors">
                        {student.username}
                      </h3>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                          {student.educationLevel.replace("_", " ")}
                        </span>
                        <span className="w-1 h-1 rounded-full bg-gray-200"></span>
                        <span className="text-[10px] font-bold text-[#39E58C] uppercase tracking-widest">
                          {student.faculty}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* POINTS DISPLAY */}
                  <div className="text-right flex items-center gap-4">
                    <div className="hidden sm:block">
                      <p className="text-[10px] font-black text-gray-300 uppercase tracking-widest mb-1">
                        Total Score
                      </p>
                      <div className="flex items-center gap-1 justify-end text-[#39E58C]">
                        <TrendingUp size={12} />
                        <span className="text-[10px] font-bold uppercase">
                          Trending
                        </span>
                      </div>
                    </div>
                    <div className="bg-white px-6 py-3 rounded-2xl border border-gray-100 shadow-sm group-hover:border-[#39E58C]/30 transition-all">
                      <span className="text-2xl font-black text-[#0F172A]">
                        {student.contributionPoints}
                      </span>
                      <span className="ml-1.5 text-[11px] font-bold text-gray-400 uppercase">
                        Pts
                      </span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* BOTTOM CALL TO ACTION */}
        <div className="mt-16 p-10 rounded-[3rem] bg-[#0F172A] text-center relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-[#39E58C]/10 rounded-full blur-2xl"></div>
          <h4 className="text-white text-2xl font-bold mb-4 tracking-tight">
            Want to see your name here?
          </h4>
          <p className="text-gray-400 mb-8 text-[15px] font-medium">
            Upload high-quality notes and help students across the globe.
          </p>
          <Link
            href="/upload"
            className="inline-flex items-center gap-2 bg-[#39E58C] text-[#08331E] px-8 py-3.5 rounded-full font-bold text-[14px] hover:scale-105 transition-all shadow-xl shadow-emerald-900/20"
          >
            Start Contributing Now
          </Link>
        </div>
      </div>
    </div>
  );
}
