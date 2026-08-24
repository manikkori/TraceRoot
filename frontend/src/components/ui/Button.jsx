import React from "react";

export function Button({
  children,
  onClick,
  type = "button",
  className = "",
  disabled = false,
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`px-6 py-3 rounded-lg font-medium transition-all duration-200 
        bg-devAccent text-white hover:bg-blue-500 hover:shadow-[0_0_20px_rgba(59,130,246,0.4)]
        active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 ${className}`}
    >
      {children}
    </button>
  );
}
