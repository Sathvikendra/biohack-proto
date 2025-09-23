import { useState } from "react";
import Layout from "@/components/Layout";
import { therapies, Therapy } from "@/utils/therapies";
import TherapyCard from "@/components/TherapyCard";
import Link from "next/link";
import { motion } from "framer-motion";
import { FaSearch } from "react-icons/fa";

export default function TherapyGallery() {
  const [search, setSearch] = useState("");

  const filteredTherapies = therapies.filter((therapy: Therapy) => {
    const searchLower = search.toLowerCase();
    return (
      therapy.name.toLowerCase().includes(searchLower) ||
      (therapy.keywords &&
        therapy.keywords.some((k) => k.toLowerCase().includes(searchLower)))
    );
  });

  return (
    <Layout title="Therapy Gallery">
      <div className="max-w-6xl mx-auto p-6 space-y-6 bg-gradient-to-b from-gray-50 to-white rounded-3xl shadow-xl">
        <Link
          href="/dashboard"
          className="inline-block px-3 py-1 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition"
        >
          ← Back to Dashboard
        </Link>

        <h2 className="text-3xl font-bold mb-6 text-center text-teal-700">
          Virtual Biohack Center
        </h2>

        {/* Search Bar */}
        <div className="relative w-full max-w-lg mx-auto">
          <FaSearch className="absolute top-1/2 left-3 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Enter your problem or goal..."
            className="w-full border rounded-full px-10 py-3 focus:outline-none focus:ring-2 focus:ring-teal-500 shadow-sm transition"
          />
        </div>

        {/* Therapies Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
          {filteredTherapies && filteredTherapies.length > 0 ? (
            filteredTherapies.map((therapy: Therapy, i) => (
              <motion.div
                key={therapy.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
              >
                <TherapyCard therapy={therapy} className="hover:shadow-xl transition transform hover:-translate-y-1 rounded-2xl backdrop-blur-sm bg-white/80 p-4" />
              </motion.div>
            ))
          ) : (
            <p className="col-span-full text-gray-500 text-center">
              No therapies found for "{search}"
            </p>
          )}
        </div>
      </div>
    </Layout>
  );
}
