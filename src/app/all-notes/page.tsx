"use client";

import { useEffect, useState } from "react";
import APIWITHTOKEN from "@/store/lib/apiWithToken";
import toast from "react-hot-toast";
import {
  Search,
  Download,
  ShieldAlert,
  Loader2,
  BookOpen,
  User,
  ChevronDown,
} from "lucide-react";

interface Note {
  id: string;
  title: string;
  description: string;
  subject: string;
  educationLevel: string;
  faculty: string;
  fileUrl: string;
  uploader?: { username: string; profileImage?: string };
}

export default function BrowseNotes() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [filteredNotes, setFilteredNotes] = useState<Note[]>([]);
  const [loading, setLoading] = useState(true);

  // Filter States
  const [search, setSearch] = useState("");
  const [levelFilter, setLevelFilter] = useState("all");

  useEffect(() => {
    const fetchAllNotes = async () => {
      try {
        const res = await APIWITHTOKEN.get<Note[]>("/notes/all");
        setNotes(res.data);
        setFilteredNotes(res.data);
      } catch (error) {
        toast.error("Failed to load library");
      } finally {
        setLoading(false);
      }
    };
    fetchAllNotes();
  }, []);

  useEffect(() => {
    let temp = notes;
    if (search) {
      temp = temp.filter(
        (n) =>
          n.title.toLowerCase().includes(search.toLowerCase()) ||
          n.subject.toLowerCase().includes(search.toLowerCase()),
      );
    }
    if (levelFilter !== "all") {
      temp = temp.filter((n) => n.educationLevel === levelFilter);
    }
    setFilteredNotes(temp);
  }, [search, levelFilter, notes]);

  if (loading)
    return (
      <div className="flex justify-center items-center min-h-[80vh]">
        <Loader2 className="animate-spin text-[#39E58C]" size={40} />
      </div>
    );

  return (
    <div className="bg-white min-h-screen font-sans">
      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* HEADER SECTION */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
          <div className="max-w-xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-100 mb-4">
              <div className="w-1.5 h-1.5 rounded-full bg-[#39E58C] animate-pulse"></div>
              <span className="text-[11px] font-bold text-emerald-700 uppercase tracking-wider">
                Public Library
              </span>
            </div>
            <h1 className="text-5xl font-bold text-[#0F172A] tracking-tighter leading-tight">
              Knowledge <span className="text-gray-400 font-medium">Base.</span>
            </h1>
            <p className="text-gray-500 mt-4 text-lg font-medium max-w-sm">
              Explore resources shared by the Pustakalaya community.
            </p>
          </div>

          {/* SEARCH & FILTER CONTROLS */}
          <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
            <div className="relative group">
              <Search
                className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#39E58C] transition-colors"
                size={18}
              />
              <input
                type="text"
                placeholder="Find a subject..."
                className="w-full sm:w-80 pl-12 pr-6 py-4 rounded-full bg-gray-50 border-none focus:ring-2 focus:ring-[#39E58C]/30 outline-none transition-all font-medium text-[15px]"
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>

            <div className="relative">
              <select
                className="appearance-none w-full sm:w-48 pl-6 pr-12 py-4 rounded-full bg-gray-50 border-none focus:ring-2 focus:ring-[#39E58C]/30 outline-none font-bold text-gray-700 text-[14px] cursor-pointer"
                onChange={(e) => setLevelFilter(e.target.value)}
              >
                <option value="all">All Levels</option>
                <option value="school">School</option>
                <option value="high_school">High School</option>
                <option value="bachelors">Bachelors</option>
                <option value="masters">Masters</option>
                <option value="phd">PhD</option>
              </select>
              <ChevronDown
                className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
                size={16}
              />
            </div>
          </div>
        </div>

        {/* RESULTS GRID */}
        {filteredNotes.length === 0 ? (
          <div className="py-32 flex flex-col items-center justify-center bg-gray-50/50 rounded-[3rem] border border-dashed border-gray-200">
            <BookOpen size={48} className="text-gray-300 mb-4" />
            <p className="text-gray-400 font-medium italic text-lg">
              No study material found matching your criteria.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {filteredNotes.map((note) => (
              <div
                key={note.id}
                className="group bg-white rounded-[2rem] p-8 border border-gray-100 hover:border-[#39E58C]/40 hover:shadow-2xl hover:shadow-emerald-100/50 transition-all duration-500 flex flex-col"
              >
                <div className="flex justify-between items-start mb-6">
                  <div className="flex flex-col">
                    <span className="text-[10px] font-bold text-[#39E58C] uppercase tracking-[0.15em] mb-1">
                      {note.subject}
                    </span>
                    <span className="text-[12px] font-bold text-[#0F172A] opacity-30 uppercase tracking-tighter">
                      {note.educationLevel.replace("_", " ")}
                    </span>
                  </div>
                  <button
                    onClick={() => {
                      APIWITHTOKEN.post(`/notes/report/${note.id}`);
                      toast.success("Flagged for review");
                    }}
                    className="p-2 text-gray-200 hover:text-red-400 transition-colors"
                    title="Report content"
                  >
                    <ShieldAlert size={18} />
                  </button>
                </div>

                <h3 className="text-2xl font-bold text-[#0F172A] mb-4 group-hover:text-[#39E58C] transition-colors tracking-tight leading-tight">
                  {note.title}
                </h3>

                <p className="text-gray-500 text-[14px] leading-relaxed mb-8 line-clamp-3 font-medium opacity-80">
                  {note.description ||
                    "Shared material for academic excellence and conceptual understanding."}
                </p>

                <div className="mt-auto pt-6 border-t border-gray-50 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-gray-100 border border-gray-200 flex items-center justify-center overflow-hidden">
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
                      <span className="text-[13px] font-bold text-gray-800">
                        {note.uploader?.username}
                      </span>
                      <span className="text-[10px] text-gray-400 font-medium">
                        Contributor
                      </span>
                    </div>
                  </div>

                  <a
                    href={note.fileUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() =>
                      APIWITHTOKEN.post(`/notes/download/${note.id}`)
                    }
                    className="w-12 h-12 bg-[#39E58C] text-[#08331E] rounded-full flex items-center justify-center hover:bg-[#2ecc71] hover:scale-110 transition-all shadow-lg shadow-emerald-200 active:scale-95"
                  >
                    <Download size={20} strokeWidth={2.5} />
                  </a>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
