"use client";
import { useState } from "react";
import { calculateBioScoreDetails, UserProfile } from "@/utils/bioscore";
import { motion, AnimatePresence } from "framer-motion"; // for smooth animation

export default function BioScoreModal({ profile }: { profile: UserProfile }) {
  const [open, setOpen] = useState(false);
  const { total, categories } = calculateBioScoreDetails(profile);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="px-5 py-2 rounded-xl bg-gradient-to-r from-emerald-500 to-green-600 
                   text-white font-semibold shadow hover:shadow-lg transition-transform
                   hover:scale-105"
      >
        View your BioScore
      </button>

      <AnimatePresence>
        {open && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
            onClick={() => setOpen(false)}
          >
            <motion.div
              onClick={e => e.stopPropagation()}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.25 }}
              className="bg-white rounded-2xl w-full max-w-lg p-6 shadow-2xl relative"
            >
              {/* Header */}
              <div className="text-center mb-6">
                <h2 className="text-2xl font-bold text-emerald-700">
                  Your BioScore
                </h2>
                <p className="mt-1 text-gray-500">
                  Overall wellness rating out of 100
                </p>
                <div className="mt-4 text-4xl font-extrabold text-emerald-600">
                  {total}/100
                </div>
                <div className="w-full h-3 bg-gray-200 rounded-full mt-2">
                  <div
                    className="h-3 rounded-full bg-emerald-500"
                    style={{ width: `${total}%` }}
                  />
                </div>
              </div>

              {/* Categories */}
              <ul className="space-y-4 max-h-[60vh] overflow-y-auto pr-1">
                {categories.map(cat => (
                  <li key={cat.category}>
                    <div className="flex justify-between text-sm font-medium text-gray-700 mb-1">
                      <span>{cat.category}</span>
                      <span>{cat.points}/{cat.max}</span>
                    </div>
                    <div className="w-full h-2 bg-gray-100 rounded-full">
                      <div
                        className="h-2 rounded-full bg-gradient-to-r from-emerald-400 to-green-600"
                        style={{ width: `${(cat.points / cat.max) * 100}%` }}
                      />
                    </div>
                    {cat.tip && (
                      <p className="text-xs text-red-500 mt-1">
                        Tip: {cat.tip}
                      </p>
                    )}
                  </li>
                ))}
              </ul>

              {/* Close Button */}
              <button
                onClick={() => setOpen(false)}
                className="absolute top-4 right-4 rounded-full bg-gray-200
                           hover:bg-gray-300 w-8 h-8 flex items-center justify-center
                           text-gray-700 font-bold text-lg"
                aria-label="Close"
              >
                ×
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
