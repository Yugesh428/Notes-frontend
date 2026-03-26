"use client";

import Link from "next/link";
import { BookOpen, Mail, Heart } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-100 pt-20 pb-12 font-sans">
      <div className="max-w-7xl mx-auto px-6">
        {/* Top Section: 4 Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Column 1: Brand Identity */}
          <div className="space-y-6">
            <Link href="/" className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#39E58C] to-[#2ecc71] flex items-center justify-center shadow-lg shadow-emerald-100">
                <BookOpen
                  size={22}
                  className="text-[#08331E]"
                  strokeWidth={2.5}
                />
              </div>
              <span className="text-2xl font-black tracking-tighter text-[#0F172A]">
                Pustaka<span className="text-gray-400 font-medium">laya</span>
              </span>
            </Link>
            <p className="text-gray-500 font-medium leading-relaxed text-[15px]">
              Empowering students from Class 1 to PhD with a community-driven
              digital library.
            </p>
          </div>

          {/* Column 2: Platform Links */}
          <div>
            <h4 className="text-[#0F172A] font-bold uppercase tracking-[0.15em] text-[11px] mb-8">
              Platform
            </h4>
            <ul className="space-y-4">
              <FooterLink href="/all-notes" label="Browse Library" />
              <FooterLink href="/leaderboard" label="Contribution Rankings" />
              <FooterLink href="/feed" label="Personalized Feed" />
              <FooterLink href="/register" label="Join Pustakalaya" />
            </ul>
          </div>

          {/* Column 3: Resource Links */}
          <div>
            <h4 className="text-[#0F172A] font-bold uppercase tracking-[0.15em] text-[11px] mb-8">
              Resources launching soon....
            </h4>
            <ul className="space-y-4">
              <FooterLink href="/about" label="Our Mission" />
              <FooterLink href="/contact" label="Get in Touch" />
              <FooterLink href="/privacy" label="Privacy Policy" />
              <FooterLink href="/terms" label="Terms of Service" />
            </ul>
          </div>

          {/* Column 4: Support / Newsletter */}
          <div className="bg-gray-50 p-8 rounded-[2.5rem] border border-gray-100">
            <h4 className="text-[#0F172A] font-bold text-sm mb-4 flex items-center gap-2">
              <Mail size={16} className="text-[#39E58C]" /> Updates
            </h4>
            <p className="text-gray-500 text-[13px] font-medium mb-6">
              Subscribe for new resources in your field.
            </p>
            <div className="flex flex-col gap-2">
              <input
                type="email"
                placeholder="email@example.com"
                className="w-full bg-white border border-gray-200 rounded-full px-5 py-3 text-xs outline-none focus:ring-2 focus:ring-[#39E58C]/30 transition-all font-medium"
              />
              <button className="w-full bg-[#0F172A] text-[#39E58C] py-3 rounded-full text-[11px] font-bold uppercase tracking-widest hover:bg-black transition-all">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-10 border-t border-gray-50 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex flex-col md:flex-row items-center gap-2 md:gap-6 text-gray-400 text-[11px] font-bold uppercase tracking-widest">
            <span>© 2024 Pustakalaya Portal</span>
            <span className="hidden md:block w-1 h-1 rounded-full bg-gray-200"></span>
            <span>All Rights Reserved</span>
          </div>

          <div className="flex items-center gap-1.5 text-gray-400 text-[13px] font-medium">
            Built with <Heart size={14} className="text-red-400 fill-red-400" />{" "}
            for students by{" "}
            <span className="text-[#0F172A] font-bold">Yugesh</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

// Minimalist Link Component
function FooterLink({ href, label }: { href: string; label: string }) {
  return (
    <li>
      <Link
        href={href}
        className="text-gray-500 hover:text-[#39E58C] font-semibold text-[14px] transition-colors duration-200"
      >
        {label}
      </Link>
    </li>
  );
}
