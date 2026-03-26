/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import APIWITHTOKEN from "@/store/lib/apiWithToken";
import { useAppSelector } from "@/store/hooks";
import toast from "react-hot-toast";
import { Upload, CheckCircle, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";

export default function UploadPage() {
  const { user } = useAppSelector((state) => state.auth);
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const [formData, setFormData] = useState({
    title: "",
    subject: "",
    description: "",
  });

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) return toast.error("Please select a study material");

    setLoading(true);
    const data = new FormData();
    data.append("title", formData.title);
    data.append("subject", formData.subject);
    data.append("description", formData.description);

    // Logic: Pull current student's level and faculty from Redux automatically
    data.append("educationLevel", user?.level || "bachelors");
    data.append("faculty", user?.faculty || "general");
    data.append("file", file);

    try {
      await APIWITHTOKEN.post("/notes/upload", data, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      toast.success("Upload successful! Admin will review it shortly.");
      router.push("/feed");
    } catch (error: any) {
      toast.error(error.response?.data?.message || "File upload failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 mt-10">
      <div className="bg-white rounded-3xl p-10 shadow-xl border border-gray-100">
        <h1 className="text-3xl font-black text-gray-900 mb-6">Upload Note</h1>
        <form onSubmit={handleUpload} className="space-y-5">
          <input
            required
            placeholder="Note Title"
            className="w-full border p-4 rounded-2xl outline-none focus:ring-2 focus:ring-blue-400 bg-gray-50"
            onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }
          />

          <input
            required
            placeholder="Subject"
            className="w-full border p-4 rounded-2xl outline-none focus:ring-2 focus:ring-blue-400 bg-gray-50"
            onChange={(e) =>
              setFormData({ ...formData, subject: e.target.value })
            }
          />

          <textarea
            placeholder="Description (Optional)"
            className="w-full border p-4 rounded-2xl outline-none focus:ring-2 focus:ring-blue-400 bg-gray-50 h-32"
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
          />

          <div
            className={`border-2 border-dashed rounded-3xl p-10 text-center transition-all 
            ${file ? "border-green-400 bg-green-50" : "border-gray-200 hover:border-blue-400"}`}
          >
            <input
              type="file"
              id="note-file"
              className="hidden"
              accept=".pdf,.jpg,.jpeg,.png"
              onChange={(e) => setFile(e.target.files?.[0] || null)}
            />
            <label
              htmlFor="note-file"
              className="cursor-pointer flex flex-col items-center"
            >
              {file ? (
                <>
                  <CheckCircle size={40} className="text-green-500 mb-2" />
                  <p className="font-bold text-green-700">{file.name}</p>
                </>
              ) : (
                <>
                  <Upload size={40} className="text-gray-400 mb-2" />
                  <p className="font-bold text-gray-600">Select PDF or Image</p>
                </>
              )}
            </label>
          </div>

          <button
            disabled={loading}
            className="w-full bg-blue-600 text-white py-4 rounded-2xl font-black hover:bg-blue-700 transition disabled:bg-gray-300 flex justify-center items-center gap-2"
          >
            {loading ? (
              <>
                <Loader2 className="animate-spin" /> Publishing...
              </>
            ) : (
              "Publish Material"
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
