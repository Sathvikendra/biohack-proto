import React from "react";

export default function ProgressBar({ step, total }: { step: number; total: number }) {
  const percent = (step / total) * 100;
  return (
    <div className="w-full bg-gray-200 h-2 rounded-full mb-6">
      <div
        className="bg-teal-600 h-2 rounded-full transition-all duration-300"
        style={{ width: `${percent}%` }}
      />
    </div>
  );
}
