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
      className={`w-full px-4 py-3 rounded-lg bg-black/50 border border-devBorder text-devText 
        placeholder-devMuted transition-all duration-200 focus:outline-none focus:border-devAccent 
        focus:ring-1 focus:ring-devAccent ${className}`}
    />
  );
}
