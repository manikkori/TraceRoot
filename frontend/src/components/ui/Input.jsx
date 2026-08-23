import React from "react";

export function Input({
  placeholder,
  value,
  onChange,
  type = "text",
  className = "",
}) {
  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className={`w-full px-4 py-3 rounded-xl bg-neuBg text-neuText shadow-neu-pressed placeholder-gray-400 transition-all duration-200 focus:shadow-neu-flat ${className}`}
    />
  );
}
