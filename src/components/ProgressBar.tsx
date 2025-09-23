import React from "react";

interface ProgressBarProps {
  step: number;
  total: number;
  className?: string; // optional className
}

export default function ProgressBar({ step, total, className = "" }: ProgressBarProps) {
  const percent = Math.min((step / total) * 100, 100);

  return (
    <div className={`w-full h-3 bg-gray-200 rounded-full overflow-hidden ${className}`}>
      <div
        className="h-3 rounded-full transition-all duration-500 shadow-inner"
        style={{
          width: `${percent}%`,
          background: "linear-gradient(to right, #4fd1c5, #38b2ac)", // teal gradient
        }}
      />
    </div>
  );
}
