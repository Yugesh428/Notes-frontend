/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import Link from "next/link";
import {
  Search,
  ArrowRight,
  BookOpen,
  Users,
  TrendingUp,
  Zap,
  GraduationCap,
  ShieldCheck,
  Download,
  CloudUpload,
  Globe,
  UserPlus,
  FileUp,
  ClipboardCheck,
  Trophy,
} from "lucide-react";

export default function LandingPage() {
  return (
    <div className="bg-white text-[#0F172A] font-sans min-h-screen">
      {/* --- HERO SECTION --- */}
      <section className="relative pt-20 pb-32 overflow-hidden">
        <div className="absolute top-[-10%] left-[-5%] w-[600px] h-[600px] bg-[#39E58C]/5 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-[10%] right-[-5%] w-[400px] h-[400px] bg-[#39E58C]/10 rounded-full blur-[100px]"></div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-50 border border-emerald-100 mb-10">
            <Zap size={14} className="text-[#39E58C]" fill="currentColor" />
            <span className="text-[11px] font-bold text-emerald-800 uppercase tracking-[0.2em]">
              The Future of Study
            </span>
          </div>

          <h1 className="text-6xl md:text-8xl font-black tracking-tighter leading-[0.95] mb-10 text-[#0F172A]">
            EXPLORE <br />
            <span className="text-[#39E58C]">INFINITE</span> <br />
            KNOWLEDGE.
          </h1>

          <p className="max-w-2xl mx-auto text-gray-500 text-lg md:text-xl font-medium leading-relaxed mb-14">
            Step into the next generation of digital libraries. Discover, share,
            and immerse yourself in a vast collection of notes shared by
            students worldwide.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 p-2 bg-white rounded-full border border-gray-100 shadow-[0_20px_50px_rgba(0,0,0,0.05)] max-w-2xl mx-auto mb-20">
            <div className="relative flex-grow flex items-center pl-6">
              <Search className="text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search subjects, books, topics..."
                className="bg-transparent border-none outline-none w-full px-4 py-3 text-gray-800 placeholder:text-gray-400 font-medium"
              />
            </div>
            <button className="bg-[#39E58C] text-[#08331E] px-10 py-3.5 rounded-full font-bold text-base hover:bg-[#2ecc71] transition-all active:scale-95 shadow-lg shadow-emerald-200">
              Find Notes
            </button>
          </div>

          <div className="flex flex-wrap justify-center gap-8 md:gap-16 border-t border-gray-50 pt-16">
            <StatItem icon={<BookOpen />} value="50K+" label="Total Books" />
            <StatItem icon={<Users />} value="125K+" label="Active Readers" />
            <StatItem icon={<TrendingUp />} value="2.5K+" label="Collections" />
            <StatItem icon={<Zap />} value="100+" label="Daily Updates" />
          </div>
        </div>
      </section>

      {/* --- EDUCATION LEVELS SECTION --- */}
      <section className="py-24 bg-gray-50/50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16">
            <div>
              <h2 className="text-4xl font-bold tracking-tight text-[#0F172A] mb-3">
                Academic <span className="text-[#39E58C]">Categories.</span>
              </h2>
              <p className="text-gray-500 font-medium text-lg">
                Comprehensive study material from Class 1 to PhD.
              </p>
            </div>
            <Link
              href="/all-notes"
              className="hidden md:flex items-center gap-2 text-[14px] font-bold text-[#39E58C] hover:underline"
            >
              Browse All Library <ArrowRight size={18} />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
            <LevelCard
              icon={<GraduationCap />}
              title="School"
              desc="Class 1 - 10"
            />
            <LevelCard
              icon={<Zap />}
              title="High School"
              desc="+2 / A-Levels"
            />
            <LevelCard
              icon={<BookOpen />}
              title="Bachelors"
              desc="University Level"
            />
            <LevelCard
              icon={<ShieldCheck />}
              title="Masters"
              desc="Post Graduation"
            />
            <LevelCard
              icon={<TrendingUp />}
              title="PhD"
              desc="Doctoral Research"
            />
          </div>
        </div>
      </section>

      {/* --- WORKFLOW SECTION: HOW IT WORKS --- */}
      <section className="py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="text-5xl font-black tracking-tighter text-[#0F172A] mb-4">
              How <span className="text-[#39E58C]">Pustakalaya</span> works.
            </h2>
            <p className="text-gray-500 font-medium text-lg max-w-xl mx-auto">
              Your journey from contributor to top scholar in four simple steps.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 relative">
            {/* Connector Line (Desktop) */}
            <div className="hidden lg:block absolute top-1/3 left-0 w-full h-[2px] bg-gray-50 -z-10"></div>

            <WorkflowStep
              number="01"
              icon={<UserPlus className="text-[#39E58C]" size={28} />}
              title="Join Community"
              desc="Create your profile and select your current education level and faculty."
            />
            <WorkflowStep
              number="02"
              icon={<FileUp className="text-[#39E58C]" size={28} />}
              title="Upload Notes"
              desc="Share your handwritten or digital notes. Supports PDF and Images."
            />
            <WorkflowStep
              number="03"
              icon={<ClipboardCheck className="text-[#39E58C]" size={28} />}
              title="Admin Review"
              desc="Our experts verify the content to maintain high-quality study standards."
            />
            <WorkflowStep
              number="04"
              icon={<Trophy className="text-[#39E58C]" size={28} />}
              title="Get Rewarded"
              desc="Earn points for every approved note and climb the global leaderboard."
            />
          </div>
        </div>
      </section>

      {/* --- FEATURES SECTION --- */}
      <section className="py-32 max-w-7xl mx-auto px-6 flex flex-col lg:flex-row items-center gap-20">
        <div className="w-full lg:w-1/2 relative">
          <div className="absolute top-[-20px] left-[-20px] w-full h-full bg-[#39E58C]/10 rounded-[3rem] -rotate-3"></div>
          <img
            src="https://images.unsplash.com/photo-1434030216411-0b793f4b4173?q=80&w=1000&auto=format&fit=crop"
            className="rounded-[3rem] border border-gray-100 shadow-2xl relative z-10 w-full object-cover aspect-video lg:aspect-square"
            alt="Library and Students"
          />
        </div>
        <div className="w-full lg:w-1/2">
          <h2 className="text-5xl font-black tracking-tighter text-[#0F172A] mb-8 leading-[1.1]">
            Empowering Students <br />
            <span className="text-[#39E58C]">Through Community.</span>
          </h2>
          <div className="space-y-10">
            <FeatureItem
              icon={<CloudUpload className="text-[#39E58C]" />}
              title="Global Contribution"
              desc="Upload your notes in seconds. Earn 10 points for every approved resource shared with the world."
            />
            <FeatureItem
              icon={<ShieldCheck className="text-[#39E58C]" />}
              title="Verified Quality"
              desc="Our SuperAdmins review every file to ensure you only get high-quality, relevant study material."
            />
            <FeatureItem
              icon={<Globe className="text-[#39E58C]" />}
              title="Learn Everywhere"
              desc="Access notes from any device. Download and take your library wherever your education leads."
            />
          </div>
          <Link
            href="/register"
            className="inline-block mt-12 bg-[#0F172A] text-white px-10 py-4 rounded-full font-bold text-lg hover:bg-black transition-all shadow-xl active:scale-95"
          >
            Join Pustakalaya Now
          </Link>
        </div>
      </section>

      {/* --- FOOTER --- */}
      {/* ... footer code remains same ... */}
    </div>
  );
}

// --- NEW SUB-COMPONENT: WorkflowStep ---
function WorkflowStep({
  number,
  icon,
  title,
  desc,
}: {
  number: string;
  icon: any;
  title: string;
  desc: string;
}) {
  return (
    <div className="flex flex-col items-center text-center group">
      <div className="relative mb-8">
        <div className="text-6xl font-black text-gray-50 absolute -top-8 -left-4 group-hover:text-emerald-50 transition-colors">
          {number}
        </div>
        <div className="w-20 h-20 rounded-[2rem] bg-white border-2 border-gray-100 shadow-sm flex items-center justify-center relative z-10 group-hover:border-[#39E58C]/30 group-hover:shadow-lg group-hover:shadow-emerald-100 transition-all">
          {icon}
        </div>
      </div>
      <h4 className="text-xl font-bold text-[#0F172A] mb-2">{title}</h4>
      <p className="text-gray-500 font-medium text-sm leading-relaxed px-4">
        {desc}
      </p>
    </div>
  );
}

// --- PREVIOUS SUB-COMPONENTS ---
function StatItem({
  icon,
  value,
  label,
}: {
  icon: any;
  value: string;
  label: string;
}) {
  return (
    <div className="flex flex-col items-center">
      <div className="text-[#39E58C] mb-2">{icon}</div>
      <p className="text-3xl font-black text-[#0F172A] mb-1">{value}</p>
      <p className="text-[11px] font-black text-gray-400 uppercase tracking-widest">
        {label}
      </p>
    </div>
  );
}

function LevelCard({
  icon,
  title,
  desc,
}: {
  icon: any;
  title: string;
  desc: string;
}) {
  return (
    <div className="bg-white border border-gray-100 p-10 rounded-[2.5rem] hover:border-[#39E58C]/40 hover:shadow-2xl hover:shadow-emerald-100 transition-all duration-500 group cursor-pointer text-center">
      <div className="w-14 h-14 rounded-2xl bg-gray-50 flex items-center justify-center mb-8 mx-auto text-gray-400 group-hover:text-[#39E58C] group-hover:bg-emerald-50 transition-all">
        {icon}
      </div>
      <h3 className="text-xl font-bold text-[#0F172A] mb-1">{title}</h3>
      <p className="text-sm text-gray-400 font-semibold">{desc}</p>
    </div>
  );
}

function FeatureItem({
  icon,
  title,
  desc,
}: {
  icon: any;
  title: string;
  desc: string;
}) {
  return (
    <div className="flex gap-8">
      <div className="shrink-0 w-14 h-14 rounded-2xl bg-emerald-50 flex items-center justify-center border border-emerald-100 shadow-sm">
        {icon}
      </div>
      <div>
        <h4 className="text-xl font-bold text-[#0F172A] mb-2">{title}</h4>
        <p className="text-gray-500 font-medium text-[15px] leading-relaxed">
          {desc}
        </p>
      </div>
    </div>
  );
}
