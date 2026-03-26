/* eslint-disable react/no-unescaped-entities */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import Link from "next/link";
import {
  Target,
  Users,
  ShieldCheck,
  Lightbulb,
  ArrowRight,
  GraduationCap,
} from "lucide-react";

export default function AboutPage() {
  return (
    <div className="bg-white text-[#0F172A] font-sans min-h-screen">
      {/* --- HERO SECTION --- */}
      <section className="relative pt-24 pb-20 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-[400px] bg-[#39E58C]/5 rounded-full blur-[120px] -z-10"></div>

        <div className="max-w-4xl mx-auto px-6 text-center">
          <h4 className="text-[#39E58C] font-bold uppercase tracking-[0.25em] text-[11px] mb-6">
            Our Mission
          </h4>
          <h1 className="text-5xl md:text-7xl font-black tracking-tighter leading-tight mb-8">
            Democratizing{" "}
            <span className="text-gray-400 font-medium italic">Knowledge</span>{" "}
            for every Student.
          </h1>
          <p className="text-gray-500 text-lg md:text-xl font-medium leading-relaxed italic">
            "Pustakalaya was built on the idea that a student's location or
            grade shouldn't limit their access to high-quality learning
            materials."
          </p>
        </div>
      </section>

      {/* --- STORY SECTION --- */}
      <section className="py-20 border-t border-gray-50">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div className="space-y-6">
            <h2 className="text-4xl font-bold tracking-tight">
              The <span className="text-[#39E58C]">Pustakalaya</span> Story.
            </h2>
            <div className="space-y-4 text-gray-600 text-[17px] leading-relaxed font-medium">
              <p>
                In an era where information is everywhere but quality is scarce,
                we saw students struggling to find reliable notes that matched
                their specific curriculum—whether it was Class 5 Science or PhD
                level research.
              </p>
              <p>
                We decided to build a{" "}
                <span className="text-black font-bold border-b-4 border-[#39E58C]/30">
                  Digital Library
                </span>{" "}
                that didn't just store files, but built a community. A place
                where a senior in university could help a junior in high school,
                and everyone is rewarded for their contribution.
              </p>
              <p>
                Today, Pustakalaya serves as a bridge, connecting thousands of
                learners and creators in a single, verified ecosystem.
              </p>
            </div>
          </div>
          <div className="relative">
            <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-[#39E58C]/10 rounded-[3rem] -z-10"></div>
            <img
              src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=1000&auto=format&fit=crop"
              className="rounded-[2.5rem] shadow-2xl grayscale hover:grayscale-0 transition-all duration-700"
              alt="Collaboration"
            />
          </div>
        </div>
      </section>

      {/* --- CORE PILLARS --- */}
      <section className="py-24 bg-gray-50/50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold tracking-tight">
              Our Core <span className="text-[#39E58C]">Pillars.</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <AboutCard
              icon={<ShieldCheck size={30} />}
              title="Verified Trust"
              desc="Quality is our priority. Every note goes through a strict Admin review process before it reaches your screen."
            />
            <AboutCard
              icon={<Users size={30} />}
              title="Community Driven"
              desc="100% of our content is uploaded by students. We believe peer-to-peer sharing is the fastest way to learn."
            />
            <AboutCard
              icon={<GraduationCap size={30} />}
              title="Class 1 to PhD"
              desc="Inclusive by design. We provide a tailored experience for every level of the academic journey."
            />
          </div>
        </div>
      </section>

      {/* --- VISION SECTION --- */}
      <section className="py-32 max-w-5xl mx-auto px-6 text-center">
        <div className="bg-[#0F172A] rounded-[3rem] p-12 md:p-20 relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-[#39E58C]/20 to-transparent"></div>

          <div className="relative z-10">
            <Lightbulb className="text-[#39E58C] mx-auto mb-8" size={48} />
            <h2 className="text-4xl md:text-5xl font-black text-white tracking-tighter mb-6">
              Ready to be part of the{" "}
              <span className="text-[#39E58C]">Future?</span>
            </h2>
            <p className="text-gray-400 text-lg mb-10 max-w-xl mx-auto">
              Join Yugesh and thousands of other students who are making
              education better, one note at a time.
            </p>
            <Link
              href="/register"
              className="inline-flex items-center gap-2 bg-[#39E58C] text-[#08331E] px-10 py-4 rounded-full font-bold text-lg hover:scale-105 transition-all shadow-xl shadow-emerald-900/20"
            >
              Start Contributing <ArrowRight size={20} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

// --- Helper Component ---

function AboutCard({
  icon,
  title,
  desc,
}: {
  icon: any;
  title: string;
  desc: string;
}) {
  return (
    <div className="bg-white p-10 rounded-[2.5rem] border border-gray-100 hover:shadow-xl transition-all duration-300 group">
      <div className="w-16 h-16 rounded-2xl bg-emerald-50 flex items-center justify-center text-[#39E58C] mb-8 group-hover:scale-110 transition-transform">
        {icon}
      </div>
      <h3 className="text-2xl font-bold mb-4">{title}</h3>
      <p className="text-gray-500 font-medium leading-relaxed">{desc}</p>
    </div>
  );
}
