import React from "react";

export function TextArea({
  placeholder,
  value,
  onChange,
  rows = 6,
  className = "",
}) {
  return (
    <textarea
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      rows={rows}
      className={`w-full px-4 py-3 rounded-xl bg-neuBg text-neuText shadow-neu-pressed placeholder-gray-400 transition-all duration-200 focus:shadow-neu-flat resize-none ${className}`}
    />
  );
}
