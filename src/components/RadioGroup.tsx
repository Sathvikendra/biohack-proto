import React from "react";

interface RadioGroupProps {
  name: string;
  options: string[];
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  label?: string;
}

const RadioGroup: React.FC<RadioGroupProps> = ({ name, options, value, onChange, label }) => {
  return (
    <div className="mb-4">
      {label && <p className="mb-1 font-medium">{label}</p>}
      <div className="flex flex-wrap gap-4">
        {options.map((opt) => (
          <label key={opt} className="flex items-center space-x-1">
            <input
              type="radio"
              name={name}
              value={opt}
              checked={value === opt}
              onChange={onChange}
              className="w-4 h-4"
            />
            <span>{opt}</span>
          </label>
        ))}
      </div>
    </div>
  );
};

export default RadioGroup;
