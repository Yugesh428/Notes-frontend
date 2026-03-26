/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/no-unescaped-entities */
"use client";

import { useEffect, useState } from "react";
import { useAppSelector } from "@/store/hooks";
import APIWITHTOKEN from "@/store/lib/apiWithToken";
import toast from "react-hot-toast";
import {
  FileText,
  Download,
  ShieldAlert,
  Star,
  Loader2,
  User,
  Zap,
  ArrowRight,
} from "lucide-react";

interface Note {
  id: string;
  title: string;
  description: string;
  subject: string;
  fileUrl: string;
  uploader?: {
    username: string;
    profileImage?: string;
  };
}

export default function StudentFeed() {
  const { user } = useAppSelector((state) => state.auth);
  const [notes, setNotes] = useState<Note[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchMyFeed = async () => {
    try {
      const res = await APIWITHTOKEN.get<Note[]>("/notes/feed");
      setNotes(res.data);
    } catch (error: any) {
      toast.error("Failed to load notes");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) fetchMyFeed();
  }, [user]);

  const handleDownload = async (id: string, url: string) => {
    try {
      await APIWITHTOKEN.post(`/notes/download/${id}`);
      window.open(url, "_blank");
    } catch (error) {
      console.error("Download tracking failed");
    }
  };

  if (loading)
    return (
      <div className="flex flex-col items-center justify-center min-h-[80vh] gap-4">
        <Loader2 className="animate-spin text-[#39E58C]" size={40} />
        <p className="text-gray-400 font-bold uppercase tracking-[0.2em] text-[10px]">
          Accessing Vault...
        </p>
      </div>
    );

  return (
    <div className="bg-white min-h-screen font-sans">
      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* --- ATOMIC HEADER SECTION --- */}
        <section className="relative overflow-hidden bg-gray-50/50 rounded-[3.5rem] p-10 md:p-16 mb-16 border border-gray-100 shadow-sm">
          {/* Neon Background Glows */}
          <div className="absolute top-[-20%] right-[-10%] w-[400px] h-[400px] bg-[#39E58C]/10 rounded-full blur-[100px] -z-10"></div>
          <div className="absolute bottom-[-20%] left-[-5%] w-[300px] h-[300px] bg-[#39E58C]/5 rounded-full blur-[80px] -z-10"></div>

          <div className="relative z-10 max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#39E58C]/10 border border-[#39E58C]/20 mb-6">
              <Zap size={14} className="text-[#39E58C]" fill="currentColor" />
              <span className="text-[11px] font-bold text-emerald-700 uppercase tracking-widest">
                Personalized Intelligence
              </span>
            </div>

            <h1 className="text-5xl md:text-6xl font-black text-[#0F172A] tracking-tighter leading-[1.1] mb-6">
              Welcome back, <br />
              <span className="text-[#39E58C]">
                {user?.username?.split(" ")[0]}.
              </span>
            </h1>

            <p className="text-gray-500 text-lg md:text-xl font-medium leading-relaxed max-w-xl">
              Curated study material for{" "}
              <span className="text-black font-bold underline decoration-[#39E58C]/40 decoration-4">
                {user?.level?.replace("_", " ")}
              </span>{" "}
              in <span className="text-black font-bold">{user?.faculty}</span>.
            </p>
          </div>
        </section>

        {/* --- GRID TITLE & STATS --- */}
        <div className="flex items-center justify-between mb-10 px-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gray-50 flex items-center justify-center text-[#39E58C] border border-gray-100">
              <Star size={20} fill="currentColor" />
            </div>
            <h2 className="text-3xl font-bold text-[#0F172A] tracking-tight">
              Recent{" "}
              <span className="text-gray-400 font-medium italic">Uploads.</span>
            </h2>
          </div>
          <div className="bg-white border border-gray-100 px-5 py-2 rounded-2xl shadow-sm text-[11px] font-bold text-gray-400 uppercase tracking-widest">
            {notes.length} Records Found
          </div>
        </div>

        {/* --- NOTES GRID --- */}
        {notes.length === 0 ? (
          <div className="text-center py-32 bg-gray-50/50 rounded-[3rem] border border-dashed border-gray-200">
            <FileText size={48} className="text-gray-200 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-gray-400 italic">
              Vault is currently empty.
            </h3>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {notes.map((note) => (
              <div
                key={note.id}
                className="group bg-white rounded-[2.5rem] p-8 border border-gray-100 hover:border-[#39E58C]/30 hover:shadow-[0_30px_60px_-15px_rgba(57,229,140,0.15)] transition-all duration-500 flex flex-col h-full"
              >
                <div className="flex justify-between items-start mb-8">
                  <div className="flex flex-col gap-1">
                    <span className="bg-[#39E58C]/10 text-emerald-700 px-3 py-1 rounded-lg font-black text-[10px] uppercase tracking-wider border border-[#39E58C]/20">
                      {note.subject}
                    </span>
                  </div>
                  <button
                    onClick={() => {
                      APIWITHTOKEN.post(`/notes/report/${note.id}`);
                      toast.success("Flagged for review");
                    }}
                    className="p-2 text-gray-200 hover:text-red-400 transition-colors"
                  >
                    <ShieldAlert size={18} />
                  </button>
                </div>

                <h3 className="text-2xl font-bold text-[#0F172A] mb-4 group-hover:text-[#39E58C] transition-colors leading-snug tracking-tight">
                  {note.title}
                </h3>

                <p className="text-gray-500 text-[14px] leading-relaxed mb-8 line-clamp-3 font-medium opacity-80 italic">
                  "
                  {note.description ||
                    "Shared for the community to enhance conceptual learning and exam preparation."}
                  "
                </p>

                <div className="flex items-center justify-between pt-6 border-t border-gray-50 mt-auto">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-2xl bg-gray-50 flex items-center justify-center border border-gray-100 overflow-hidden shadow-sm">
                      {note.uploader?.profileImage ? (
                        <img
                          src={note.uploader.profileImage}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <User size={18} className="text-gray-400" />
                      )}
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[13px] font-bold text-[#0F172A]">
                        {note.uploader?.username}
                      </span>
                      <span className="text-[10px] text-[#39E58C] font-black uppercase tracking-tighter">
                        Top Contributor
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={() => handleDownload(note.id, note.fileUrl)}
                    className="w-12 h-12 bg-[#39E58C] text-[#08331E] rounded-full flex items-center justify-center hover:bg-[#2ecc71] hover:scale-110 transition-all shadow-lg shadow-emerald-200 active:scale-95"
                  >
                    <Download size={20} strokeWidth={2.5} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
