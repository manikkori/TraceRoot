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
      className={`w-full px-4 py-3 rounded-lg bg-black/50 border border-devBorder text-devText 
        placeholder-devMuted transition-all duration-200 focus:outline-none focus:border-devAccent 
        focus:ring-1 focus:ring-devAccent resize-none ${className}`}
    />
  );
}
