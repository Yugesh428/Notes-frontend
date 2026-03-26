/* eslint-disable react/no-unescaped-entities */
"use client";

import { useEffect, useState } from "react";
import { useAppSelector } from "@/store/hooks";
import APIWITHTOKEN from "@/store/lib/apiWithToken";
import toast from "react-hot-toast";
import {
  Check,
  X,
  FileText,
  ExternalLink,
  Loader2,
  User,
  ShieldCheck,
  Calendar,
} from "lucide-react";
import { useRouter } from "next/navigation";

interface PendingNote {
  id: string;
  title: string;
  subject: string;
  educationLevel: string;
  faculty: string;
  fileUrl: string;
  description: string;
  createdAt: string;
  uploader?: { username: string; email: string; profileImage?: string };
}

export default function AdminDashboard() {
  const { user } = useAppSelector((state) => state.auth);
  const [pendingNotes, setPendingNotes] = useState<PendingNote[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  // Security Guard
  useEffect(() => {
    if (user && user.role !== "SuperAdmin") {
      toast.error("Restricted Access");
      router.push("/feed");
    }
  }, [user, router]);

  const fetchPending = async () => {
    try {
      const res = await APIWITHTOKEN.get<PendingNote[]>("/notes/admin/pending");
      setPendingNotes(res.data);
    } catch (error) {
      toast.error("Failed to load Registry");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPending();
  }, []);

  const handleReview = async (noteId: string, action: "approve" | "reject") => {
    try {
      await APIWITHTOKEN.patch("/notes/admin/review", { noteId, action });
      toast.success(`Note ${action === "approve" ? "Published" : "Discarded"}`);
      setPendingNotes((prev) => prev.filter((n) => n.id !== noteId));
    } catch (error) {
      toast.error("Operation failed");
    }
  };

  if (loading)
    return (
      <div className="flex justify-center items-center min-h-[80vh]">
        <Loader2 className="animate-spin text-[#39E58C]" size={40} />
      </div>
    );

  return (
    <div className="bg-white min-h-screen font-sans pb-20">
      <div className="max-w-7xl mx-auto px-6 pt-12">
        {/* HEADER SECTION */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-100 mb-4">
              <ShieldCheck size={14} className="text-[#39E58C]" />
              <span className="text-[11px] font-bold text-emerald-700 uppercase tracking-widest">
                System Controller
              </span>
            </div>
            <h1 className="text-5xl font-black text-[#0F172A] tracking-tighter leading-tight">
              Moderation{" "}
              <span className="text-gray-400 font-medium italic">Queue.</span>
            </h1>
            <p className="text-gray-500 mt-2 text-lg font-medium">
              Verify and publish community contributions.
            </p>
          </div>

          <div className="bg-gray-50 border border-gray-100 px-8 py-4 rounded-[2rem] flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-white shadow-sm flex items-center justify-center text-[#39E58C]">
              <FileText size={24} />
            </div>
            <div>
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                Waiting Action
              </p>
              <p className="text-2xl font-black text-[#0F172A] leading-none">
                {pendingNotes.length} Files
              </p>
            </div>
          </div>
        </div>

        {/* CONTENT AREA */}
        {pendingNotes.length === 0 ? (
          <div className="py-32 flex flex-col items-center justify-center bg-gray-50/50 rounded-[3rem] border border-dashed border-gray-200">
            <Check size={48} className="text-[#39E58C] mb-4" />
            <p className="text-gray-400 font-bold uppercase tracking-widest text-xs">
              Registry Clean
            </p>
            <p className="text-gray-400 mt-1 italic font-medium">
              All notes have been reviewed.
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            {pendingNotes.map((note) => (
              <div
                key={note.id}
                className="group bg-white rounded-[2.5rem] p-8 border border-gray-100 hover:border-[#39E58C]/30 hover:shadow-2xl hover:shadow-emerald-100/40 transition-all duration-500 flex flex-col lg:flex-row justify-between items-start lg:items-center gap-8"
              >
                <div className="flex gap-6 items-start flex-grow">
                  <div className="w-16 h-16 bg-gray-50 rounded-[1.5rem] flex items-center justify-center text-[#39E58C] group-hover:bg-emerald-50 transition-colors shrink-0 border border-gray-100">
                    <FileText size={28} />
                  </div>

                  <div className="space-y-2">
                    <div className="flex flex-wrap gap-2">
                      <span className="text-[9px] font-black bg-[#0F172A] text-white px-2.5 py-1 rounded-md uppercase tracking-widest">
                        {note.subject}
                      </span>
                      <span className="text-[9px] font-bold border border-gray-200 text-gray-400 px-2.5 py-1 rounded-md uppercase tracking-widest">
                        {note.educationLevel}
                      </span>
                    </div>
                    <h3 className="text-2xl font-bold text-[#0F172A] tracking-tight group-hover:text-[#39E58C] transition-colors">
                      {note.title}
                    </h3>
                    <p className="text-sm text-gray-400 italic line-clamp-1">
                      "{note.description}"
                    </p>

                    <div className="flex items-center gap-6 pt-2">
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center overflow-hidden">
                          {note.uploader?.profileImage ? (
                            <img src={note.uploader.profileImage} />
                          ) : (
                            <User size={12} className="text-gray-400" />
                          )}
                        </div>
                        <span className="text-[11px] font-bold text-gray-700">
                          {note.uploader?.username}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-300">
                        <Calendar size={12} />
                        <span className="text-[11px] font-medium">
                          {new Date(note.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3 w-full lg:w-auto">
                  <a
                    href={note.fileUrl}
                    target="_blank"
                    className="p-4 bg-gray-50 text-gray-400 hover:text-black hover:bg-gray-100 rounded-full transition-all"
                    title="View Document"
                  >
                    <ExternalLink size={20} />
                  </a>

                  <button
                    onClick={() => handleReview(note.id, "approve")}
                    className="flex-grow lg:flex-none bg-[#39E58C] text-[#08331E] px-8 py-4 rounded-full font-bold text-sm hover:shadow-xl hover:shadow-emerald-200 transition-all active:scale-95 flex items-center justify-center gap-2"
                  >
                    <Check size={18} strokeWidth={3} /> Approve
                  </button>

                  <button
                    onClick={() => handleReview(note.id, "reject")}
                    className="p-4 bg-white border border-gray-200 text-red-400 hover:bg-red-50 hover:text-red-600 hover:border-red-100 rounded-full transition-all active:scale-95"
                  >
                    <X size={20} />
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
