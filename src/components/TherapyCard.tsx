import { useState } from "react";
import { Therapy } from "@/utils/therapies";

interface TherapyCardProps {
  therapy: Therapy;
}

export default function TherapyCard({ therapy }: TherapyCardProps) {
  const [showDetails, setShowDetails] = useState(false);

  return (
    <div
      className="border rounded-lg overflow-hidden shadow hover:shadow-lg cursor-pointer transition duration-200"
      onClick={() => setShowDetails((prev) => !prev)}
    >
      <img
        src={ "/placeholder.png"}
        alt={therapy.name}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h3 className="text-lg font-semibold mb-2">{therapy.name}</h3>

        {/* Show details only if clicked */}
        {showDetails ? (
          <p className="text-gray-700 text-sm">{therapy.description}</p>
        ) : (
          <p className="text-gray-400 text-sm italic">Click to see more...</p>
        )}
      </div>
    </div>
  );
}
