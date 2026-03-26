/* eslint-disable react/no-unescaped-entities */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import API from "@/store/lib/api"; // Using public API
import toast from "react-hot-toast";
import { Mail, Send, MapPin, MessageCircle, Loader2 } from "lucide-react";

export default function ContactPage() {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await API.post("/users/contact", formData);
      toast.success("Message sent! Check your inbox soon.");
      setFormData({ name: "", email: "", subject: "", message: "" });
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white min-h-screen font-sans">
      <div className="max-w-7xl mx-auto px-6 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">
          {/* LEFT SIDE: INFO */}
          <div className="space-y-12">
            <div>
              <h4 className="text-[#39E58C] font-bold uppercase tracking-[0.2em] text-[11px] mb-4">
                Contact Us
              </h4>
              <h1 className="text-5xl md:text-7xl font-black tracking-tighter text-[#0F172A] leading-tight">
                Let's{" "}
                <span className="text-gray-400 font-medium italic">Talk.</span>
              </h1>
              <p className="text-gray-500 mt-6 text-lg font-medium leading-relaxed max-w-md">
                Have a question about Pustakalaya? Need help with your account?
                Our team is here to support your academic journey.
              </p>
            </div>

            <div className="space-y-8">
              <ContactDetail
                icon={<Mail size={24} className="text-[#39E58C]" />}
                label="Email Support"
                value="bastolayugesh2@gmail.com"
              />
              <ContactDetail
                icon={<MessageCircle size={24} className="text-[#39E58C]" />}
                label="Follow on Social media"
                value="Join our server"
              />
              <ContactDetail
                icon={<MapPin size={24} className="text-[#39E58C]" />}
                label="Gothatar"
                value="Kathmandu, Nepal"
              />
            </div>
          </div>

          {/* RIGHT SIDE: FORM */}
          <div className="bg-gray-50/50 border border-gray-100 p-8 md:p-12 rounded-[3rem] shadow-sm">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[11px] font-bold text-gray-400 uppercase tracking-widest ml-4">
                    Full Name
                  </label>
                  <input
                    required
                    placeholder="Enter your name"
                    className="w-full bg-white border border-gray-200 rounded-full px-6 py-4 outline-none focus:ring-2 focus:ring-[#39E58C]/20 transition-all font-medium"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[11px] font-bold text-gray-400 uppercase tracking-widest ml-4">
                    Email Address
                  </label>
                  <input
                    required
                    type="email"
                    placeholder="name@example.com"
                    className="w-full bg-white border border-gray-200 rounded-full px-6 py-4 outline-none focus:ring-2 focus:ring-[#39E58C]/20 transition-all font-medium"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[11px] font-bold text-gray-400 uppercase tracking-widest ml-4">
                  Subject
                </label>
                <input
                  placeholder="How can we help?"
                  className="w-full bg-white border border-gray-200 rounded-full px-6 py-4 outline-none focus:ring-2 focus:ring-[#39E58C]/20 transition-all font-medium"
                  value={formData.subject}
                  onChange={(e) =>
                    setFormData({ ...formData, subject: e.target.value })
                  }
                />
              </div>

              <div className="space-y-2">
                <label className="text-[11px] font-bold text-gray-400 uppercase tracking-widest ml-4">
                  Message
                </label>
                <textarea
                  required
                  rows={5}
                  placeholder="Write your message here..."
                  className="w-full bg-white border border-gray-200 rounded-[2rem] px-6 py-6 outline-none focus:ring-2 focus:ring-[#39E58C]/20 transition-all font-medium resize-none"
                  value={formData.message}
                  onChange={(e) =>
                    setFormData({ ...formData, message: e.target.value })
                  }
                />
              </div>

              <button
                disabled={loading}
                className="w-full bg-[#0F172A] text-[#39E58C] py-4 rounded-full font-bold text-lg flex items-center justify-center gap-3 hover:bg-black transition-all active:scale-95 disabled:bg-gray-300"
              >
                {loading ? (
                  <Loader2 className="animate-spin" />
                ) : (
                  <>
                    <Send size={20} /> Send Message
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

function ContactDetail({
  icon,
  label,
  value,
}: {
  icon: any;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center gap-5 group">
      <div className="w-14 h-14 rounded-2xl bg-emerald-50 flex items-center justify-center border border-emerald-100 group-hover:scale-110 transition-transform">
        {icon}
      </div>
      <div>
        <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest leading-none mb-1.5">
          {label}
        </p>
        <p className="text-xl font-bold text-[#0F172A]">{value}</p>
      </div>
    </div>
  );
}
