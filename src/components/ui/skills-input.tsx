"use client";

import { useState, KeyboardEvent } from "react";
import { X } from "lucide-react";

interface SkillsInputProps {
  skills: string[];
  onChange: (skills: string[]) => void;
  disabled?: boolean;
  placeholder?: string;
  required?: boolean;
}

export function SkillsInput({ 
  skills, 
  onChange, 
  disabled = false,
  placeholder = "Add at least one skill to continue",
  required = false
}: SkillsInputProps) {
  const [inputValue, setInputValue] = useState("");

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && inputValue.trim()) {
      e.preventDefault();
      const trimmedValue = inputValue.trim();
      if (!skills.includes(trimmedValue)) {
        onChange([...skills, trimmedValue]);
      }
      setInputValue("");
    } else if (e.key === "Backspace" && !inputValue && skills.length > 0) {
      // Remove last skill if backspace is pressed with empty input
      onChange(skills.slice(0, -1));
    }
  };

  const removeSkill = (skillToRemove: string) => {
    if (!disabled) {
      onChange(skills.filter((skill) => skill !== skillToRemove));
    }
  };

  return (
    <div className="space-y-2">
      <div className="flex flex-wrap gap-2 min-h-[42px] p-2 border border-gray-200 rounded-md bg-white focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-blue-500 transition-all shadow-sm hover:border-gray-300">
        {skills.map((skill, index) => (
          <span
            key={index}
            className="inline-flex items-center gap-1.5 px-3 py-1 text-sm bg-blue-50 text-blue-700 border border-blue-200 rounded-full font-medium"
          >
            {skill}
            {!disabled && (
              <button
                type="button"
                onClick={() => removeSkill(skill)}
                className="hover:bg-blue-100 rounded-full p-0.5 transition-colors focus:outline-none"
                aria-label={`Remove ${skill}`}
              >
                <X className="w-3 h-3" />
              </button>
            )}
          </span>
        ))}
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={skills.length === 0 ? placeholder : ""}
          disabled={disabled}
          className="flex-1 min-w-[120px] outline-none bg-transparent text-sm placeholder:text-gray-400 disabled:cursor-not-allowed disabled:opacity-50"
          required={required && skills.length === 0}
        />
      </div>
      {skills.length === 0 && (
        <p className="text-xs text-gray-500">Type a skill and Press Enter</p>
      )}
    </div>
  );
}

