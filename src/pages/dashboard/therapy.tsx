import { useState } from "react";
import Layout from "@/components/Layout";
import { therapies, Therapy } from "@/utils/therapies";
import TherapyCard from "@/components/TherapyCard";
import Link from "next/link";

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
        <Link
          href="/dashboard"
          className="inline-block px-3 py-1 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 text-sm"
        >
          ← Back to Dashboard
        </Link>
      <div className="max-w-5xl mx-auto p-6 space-y-4">
        <h2 className="text-2xl font-bold mb-4">Virtual Biohack Center</h2>

        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Enter your problem or goal..."
          className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500"
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
          {filteredTherapies && filteredTherapies.length > 0 ? (
            filteredTherapies.map((therapy: Therapy) => (
              <TherapyCard key={therapy.name} therapy={therapy} />
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
