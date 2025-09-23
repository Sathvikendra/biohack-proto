import { useState } from "react";
import { Therapy } from "@/utils/therapies";
import { motion } from "framer-motion";

interface TherapyCardProps {
  therapy: Therapy;
  className?: string; // allow custom classNames
}

export default function TherapyCard({ therapy, className = "" }: TherapyCardProps) {
  const [showDetails, setShowDetails] = useState(false);

  return (
    <motion.div
      onClick={() => setShowDetails((prev) => !prev)}
      className={`cursor-pointer overflow-hidden rounded-2xl shadow-md transition-all duration-300 hover:shadow-xl hover:-translate-y-1 ${className}`}
      whileHover={{ scale: 1.02 }}
    >
      {/* Image */}
      <div className="h-48 w-full bg-gray-200 overflow-hidden rounded-t-2xl">
        <img
          src={
            // therapy.image || 
            "/placeholder.png"}
          alt={therapy.name}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Content */}
      <div className="p-4 bg-white/80 backdrop-blur-sm">
        <h3 className="text-lg font-bold mb-2 text-teal-700">{therapy.name}</h3>

        {showDetails ? (
          <p className="text-gray-700 text-sm">{therapy.description}</p>
        ) : (
          <p className="text-gray-400 text-sm italic">Click to see more...</p>
        )}

        {/* Optional keywords */}
        {therapy.keywords && therapy.keywords.length > 0 && showDetails && (
          <div className="mt-2 flex flex-wrap gap-2">
            {therapy.keywords.map((k) => (
              <span
                key={k}
                className="text-xs bg-teal-100 text-teal-700 px-2 py-1 rounded-full"
              >
                {k}
              </span>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
}
