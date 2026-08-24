import React from "react";

export function Card({ children, className = "" }) {
  return (
    <div
      className={`bg-devCard border border-devBorder rounded-xl p-6 shadow-2xl ${className}`}
    >
      {children}
    </div>
  );
}
