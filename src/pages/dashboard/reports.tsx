// 'use client'

// import { useEffect, useState } from "react";
// import Layout from "@/components/Layout";
// import { supabase } from "@/lib/supabaseClient";
// import toast from "react-hot-toast";
// import { useAuth } from "@/context/AuthContext"; // Auth context to get user
// import Link from "next/link";

// interface Report {
//   name: string;
//   path: string;
//   summary?: string;
// }

// export default function Reports() {
//   const { user } = useAuth(); // Get logged-in user
//   const [files, setFiles] = useState<File[]>([]);
//   const [uploading, setUploading] = useState(false);
//   const [reports, setReports] = useState<Report[]>([]);

//   // Fetch uploaded files for authenticated user
//   useEffect(() => {
//     if (!user) return;

//     const fetchReports = async () => {
//       const { data, error } = await supabase.storage
//         .from("lab-tests")
//         .list(`${user.id}/`);
//       if (!error && data) {
//         const storedReports: Report[] = data.map((r) => ({
//           name: r.name,
//           path: `${user.id}/${r.name}`,
//         }));
//         setReports(storedReports);
//       }
//     };
//     fetchReports();
//   }, [user]);

//   // Upload multiple PDFs
//   const handleUpload = async () => {
//     if (!user || files.length === 0) return;
//     setUploading(true);

//     for (const file of files) {
//       const { data, error } = await supabase.storage
//         .from("lab-tests")
//         .upload(`${user.id}/${file.name}`, file, { upsert: true, contentType: "application/pdf" });

//       if (error) {
//         toast.error(`Failed to upload ${file.name}: ${error.message}`);
//       } else {
//         setReports((prev) => [...prev, { name: file.name, path: `${user.id}/${file.name}` }]);
//       }
//     }

//     setFiles([]);
//     setUploading(false);
//     toast.success("Upload completed");
//   };

//   // Analyze single PDF
//   const handleAnalyze = async (report: Report) => {
//     if (!user) return;
//     const res = await fetch("/api/analyzeReport", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ filePath: report.path, userId: user.id }),
//     });
//     const data = await res.json();
//     if (res.ok) {
//       setReports((prev) =>
//         prev.map((r) => (r.path === report.path ? { ...r, summary: data.summary } : r))
//       );
//     } else {
//       toast.error(typeof data.error === "string"?data.error : "Failed to analyze report");
//     }
//   };

//   return (
//     <Layout title="Lab Reports">
//       <div className="max-w-5xl mx-auto p-6">
//         <Link
//           href="/dashboard"
//           className="inline-block px-3 py-1 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 text-sm"
//         >
//           ← Back to Dashboard
//         </Link>
//         <h1 className="text-3xl font-bold mb-6 text-center text-teal-700">Lab Reports</h1>

//         <div className="mb-8">
//             <label
//                 htmlFor="pdfFiles"
//                 className="block mb-2 text-lg font-medium text-teal-700"
//             >
//                 Select PDF files
//             </label>

//             <div className="flex flex-wrap items-center gap-4">
//                 <input
//                 id="pdfFiles"
//                 type="file"
//                 accept="application/pdf"
//                 multiple
//                 onChange={(e) => setFiles(Array.from(e.target.files || []))}
//                 className="file:mr-4 file:py-2 file:px-4
//                             file:rounded-md file:border-0
//                             file:text-sm file:font-semibold
//                             file:bg-teal-600 file:text-white
//                             hover:file:bg-teal-700
//                             text-gray-700"
//                 />

//                 <button
//                 onClick={handleUpload}
//                 disabled={uploading || files.length === 0}
//                 className="px-5 py-2 rounded-md bg-teal-600 text-white
//                             hover:bg-teal-700 disabled:opacity-50"
//                 >
//                 {uploading ? "Uploading…" : "Upload PDFs"}
//                 </button>
//             </div>
//         </div>

//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
//           {reports.length === 0 && <p className="col-span-full text-gray-500">No reports found.</p>}
//           {reports.map((report) => (
//             <div
//               key={report.path}
//               className="border rounded-lg shadow hover:shadow-lg transition p-4 flex flex-col justify-between"
//             >
//               <p className="font-medium truncate">{report.name}</p>
//               <button
//                 className="mt-2 bg-teal-600 text-white px-3 py-1 rounded hover:bg-teal-700"
//                 onClick={() => handleAnalyze(report)}
//               >
//                 {report.summary ? "Re-analyze" : "Analyze Report"}
//               </button>
//               {report.summary && (
//                 <div className="mt-4 p-3 border rounded bg-gray-50 whitespace-pre-line">
//                   <h2 className="font-semibold mb-2">Summary</h2>
//                   {report.summary}
//                 </div>
//               )}
//             </div>
//           ))}
//         </div>
//       </div>
//     </Layout>
//   );
// }


// 'use client'

// import { useEffect, useState } from "react";
// import Layout from "@/components/Layout";
// import { supabase } from "@/lib/supabaseClient";
// import toast from "react-hot-toast";
// import { useAuth } from "@/context/AuthContext";
// import Link from "next/link";
// import { motion } from "framer-motion";

// interface Report {
//   name: string;
//   path: string;
//   summary?: string;
// }

// export default function Reports() {
//   const { user } = useAuth();
//   const [files, setFiles] = useState<File[]>([]);
//   const [uploading, setUploading] = useState(false);
//   const [reports, setReports] = useState<Report[]>([]);

//   useEffect(() => {
//     if (!user) return;

//     const fetchReports = async () => {
//       const { data, error } = await supabase.storage.from("lab-tests").list(`${user.id}/`);
//       if (!error && data) {
//         const storedReports: Report[] = data.map((r) => ({
//           name: r.name,
//           path: `${user.id}/${r.name}`,
//         }));
//         setReports(storedReports);
//       }
//     };
//     fetchReports();
//   }, [user]);

//   const handleUpload = async () => {
//     if (!user || files.length === 0) return;
//     setUploading(true);

//     for (const file of files) {
//       const { error } = await supabase.storage
//         .from("lab-tests")
//         .upload(`${user.id}/${file.name}`, file, { upsert: true, contentType: "application/pdf" });

//       if (error) toast.error(`Failed to upload ${file.name}: ${error.message}`);
//       else setReports((prev) => [...prev, { name: file.name, path: `${user.id}/${file.name}` }]);
//     }

//     setFiles([]);
//     setUploading(false);
//     toast.success("Upload completed");
//   };

//   const handleAnalyze = async (report: Report) => {
//     if (!user) return;
//     const res = await fetch("/api/analyzeReport", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ filePath: report.path, userId: user.id }),
//     });
//     const data = await res.json();
//     if (res.ok) {
//       setReports((prev) =>
//         prev.map((r) => (r.path === report.path ? { ...r, summary: data.summary } : r))
//       );
//     } else {
//       toast.error(typeof data.error === "string" ? data.error : "Failed to analyze report");
//     }
//   };

//   return (
//     <Layout title="Lab Reports">
//       <div className="max-w-6xl mx-auto p-6">
//         <Link
//           href="/dashboard"
//           className="inline-block px-3 py-1 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition"
//         >
//           ← Back to Dashboard
//         </Link>

//         <h1 className="text-3xl font-bold mb-8 mt-4 text-center text-teal-700">Lab Reports</h1>

//         {/* Upload Section */}
//         <div className="mb-10 bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
//             <label htmlFor="pdfFiles" className="block mb-3 text-lg font-semibold text-teal-600">
//             Select PDF files to upload
//             </label>
//             <div className="flex flex-wrap gap-4 items-center">
//             <input
//                 id="pdfFiles"
//                 type="file"
//                 accept="application/pdf"
//                 multiple
//                 onChange={(e) => setFiles(Array.from(e.target.files || []))}
//                 className="file:mr-4 file:py-2 file:px-4
//                             file:rounded-md file:border-0
//                             file:text-sm file:font-semibold
//                             file:bg-gray-200 file:text-gray-700
//                             hover:file:bg-gray-300
//                             text-gray-700"
//             />
//             <button
//                 onClick={handleUpload}
//                 disabled={uploading || files.length === 0}
//                 className="px-6 py-2 rounded-lg bg-teal-600 text-white hover:bg-teal-700 disabled:opacity-50 transition"
//             >
//                 {uploading ? "Uploading…" : "Upload PDFs"}
//             </button>
//             </div>
//         </div>

//         {/* Reports Grid */}
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//           {reports.length === 0 && (
//             <p className="col-span-full text-gray-500 text-center mt-4">
//               No reports found. Upload PDFs to get started.
//             </p>
//           )}

//           {reports.map((report) => (
//             <motion.div
//               key={report.path}
//               className="bg-white border border-gray-100 rounded-2xl shadow-md p-5 flex flex-col justify-between hover:shadow-xl transition"
//               whileHover={{ scale: 1.02 }}
//             >
//               <p className="font-semibold text-teal-700 truncate">{report.name}</p>
//               <button
//                 className="mt-3 bg-teal-600 text-white px-4 py-2 rounded-lg hover:bg-teal-700 transition"
//                 onClick={() => handleAnalyze(report)}
//               >
//                 {report.summary ? "Re-analyze" : "Analyze Report"}
//               </button>

//               {report.summary && (
//                 <div className="mt-4 p-4 border rounded-lg bg-gray-50 text-gray-700 whitespace-pre-line">
//                   <h2 className="font-semibold mb-2 text-teal-600">Summary</h2>
//                   {report.summary}
//                 </div>
//               )}
//             </motion.div>
//           ))}
//         </div>
//       </div>
//     </Layout>
//   );
// }

'use client';

import { useEffect, useState } from 'react';
import Layout from '@/components/Layout';
import { supabase } from '@/lib/supabaseClient';
import toast from 'react-hot-toast';
import { useAuth } from '@/context/AuthContext';
import Link from 'next/link';
import { motion } from 'framer-motion';
import ReactMarkdown from 'react-markdown';
import { Trash2 } from 'lucide-react';

interface Report {
  name: string;
  path: string;
  summary?: string | null;
}

export default function Reports() {
  const { user } = useAuth();
  const [files, setFiles] = useState<File[]>([]);
  const [uploading, setUploading] = useState(false);
  const [reports, setReports] = useState<Report[]>([]);
  const [loading, setLoading] = useState(true);
  const [analyzing, setAnalyzing] = useState<string | null>(null);
  const [deleting, setDeleting] = useState<string | null>(null);
  const [showSummary, setShowSummary] = useState<string | null>(null);

  // fetch storage list + DB summaries
  useEffect(() => {
    if (!user) return;
    const fetchReports = async () => {
      setLoading(true);
      const { data: files, error } = await supabase.storage
        .from('lab-tests')
        .list(`${user.id}/`);
      if (error) {
        toast.error(error.message);
        setLoading(false);
        return;
      }

      // fetch saved summaries from DB
      const { data: dbReports } = await supabase
        .from('reports')
        .select('file_path, summary')
        .eq('user_id', user.id);

      const mapped: Report[] =
        files?.map((f) => {
          const dbRow = dbReports?.find((r) => r.file_path === `${user.id}/${f.name}`);
          return {
            name: f.name,
            path: `${user.id}/${f.name}`,
            summary: dbRow?.summary ?? null,
          };
        }) ?? [];

      setReports(mapped);
      setLoading(false);
    };
    fetchReports();
  }, [user]);

  const handleUpload = async () => {
    if (!user || files.length === 0) return;
    setUploading(true);

    for (const file of files) {
      const path = `${user.id}/${file.name}`;
      const { error } = await supabase.storage
        .from('lab-tests')
        .upload(path, file, { upsert: true, contentType: 'application/pdf' });

      if (error) {
        toast.error(`Failed to upload ${file.name}: ${error.message}`);
      } else {
        // also insert empty row in DB for tracking
        await supabase.from('reports').upsert({ user_id: user.id, file_path: path });
        setReports((prev) => [...prev, { name: file.name, path, summary: null }]);
      }
    }

    setFiles([]);
    setUploading(false);
    toast.success('Upload completed');
  };

  const handleAnalyze = async (report: Report) => {
    if (!user) return;
    setAnalyzing(report.path);

    try {
      const res = await fetch('/api/analyzeReport', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ filePath: report.path, userId: user.id }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to analyze');

      // save summary to DB
      await supabase
        .from('reports')
        .upsert({ user_id: user.id, file_path: report.path, summary: data.summary });

      setReports((prev) =>
        prev.map((r) =>
          r.path === report.path ? { ...r, summary: data.summary } : r
        )
      );
      toast.success('Analysis completed');
    } catch (err: any) {
      toast.error(err.message || 'Error analyzing report');
    } finally {
      setAnalyzing(null);
    }
  };

  const handleDelete = async (report: Report) => {
    if (!user) return;
    setDeleting(report.path);
    try {
      const { error } = await supabase.storage.from('lab-tests').remove([report.path]);
      if (error) throw error;
      await supabase.from('reports').delete().eq('file_path', report.path);
      setReports((prev) => prev.filter((r) => r.path !== report.path));
      toast.success('Deleted');
    } catch (err: any) {
      toast.error(err.message);
    } finally {
      setDeleting(null);
    }
  };

  return (
    <Layout title="Lab Reports">
      <div className="max-w-6xl mx-auto p-6">
        <Link
          href="/dashboard"
          className="inline-block px-3 py-1 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition"
        >
          ← Back to Dashboard
        </Link>

        <h1 className="text-3xl font-bold mb-8 mt-4 text-center text-teal-700">
          Lab Reports
        </h1>

        {/* Upload */}
        <div className="mb-10 bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
          <label htmlFor="pdfFiles" className="block mb-3 text-lg font-semibold text-teal-600">
            Select PDF files to upload
          </label>
          <div className="flex flex-wrap gap-4 items-center">
            <input
              id="pdfFiles"
              type="file"
              accept="application/pdf"
              multiple
              onChange={(e) => setFiles(Array.from(e.target.files || []))}
              className="file:mr-4 file:py-2 file:px-4
                        file:rounded-md file:border-0
                        file:text-sm file:font-semibold
                        file:bg-gray-200 file:text-gray-700
                        hover:file:bg-gray-300
                        text-gray-700"
            />
            <button
              onClick={handleUpload}
              disabled={uploading || files.length === 0}
              className="px-6 py-2 rounded-lg bg-teal-600 text-white hover:bg-teal-700 disabled:opacity-50 transition"
            >
              {uploading ? 'Uploading…' : 'Upload PDFs'}
            </button>
          </div>
        </div>

        {/* Reports */}
        {loading ? (
          <p className="text-center text-gray-500">Loading…</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {reports.length === 0 && (
              <p className="col-span-full text-gray-500 text-center mt-4">
                No reports found. Upload PDFs to get started.
              </p>
            )}

            {reports.map((report) => (
              <motion.div
                key={report.path}
                className="bg-white border border-gray-100 rounded-2xl shadow-md p-5 flex flex-col justify-between hover:shadow-xl transition"
                whileHover={{ scale: 1.02 }}
              >
                <div className="flex items-center justify-between">
                  <p className="font-semibold text-teal-700 truncate">{report.name}</p>
                  <button
                    onClick={() => handleDelete(report)}
                    disabled={deleting === report.path}
                    className="text-red-500 hover:text-red-700 disabled:opacity-50"
                    title="Delete"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>

                <div className="mt-4 flex gap-2 flex-wrap">
                  {!report.summary ? (
                    <button
                      className="flex-1 bg-teal-600 text-white px-4 py-2 rounded-lg hover:bg-teal-700 transition disabled:opacity-50"
                      onClick={() => handleAnalyze(report)}
                      disabled={analyzing === report.path}
                    >
                      {analyzing === report.path ? 'Analyzing…' : 'Analyze'}
                    </button>
                  ) : (
                    <>
                      <button
                        className="flex-1 bg-gray-100 text-teal-700 border border-teal-600 px-4 py-2 rounded-lg hover:bg-gray-200 transition"
                        onClick={() =>
                          setShowSummary((prev) =>
                            prev === report.path ? null : report.path
                          )
                        }
                      >
                        {showSummary === report.path ? 'Hide Analysis' : 'Show Analysis'}
                      </button>
                      <button
                        className="flex-1 bg-teal-600 text-white px-4 py-2 rounded-lg hover:bg-teal-700 transition disabled:opacity-50"
                        onClick={() => handleAnalyze(report)}
                        disabled={analyzing === report.path}
                      >
                        {analyzing === report.path ? 'Re-Analyzing…' : 'Re-Analyze'}
                      </button>
                    </>
                  )}
                </div>

                {showSummary === report.path && report.summary && (
                  <div className="mt-4 p-4 border rounded-lg bg-gray-50 text-gray-700 overflow-auto max-h-64">
                    <div className="prose prose-sm">
                      <ReactMarkdown>{report.summary}</ReactMarkdown>
                    </div>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
}
