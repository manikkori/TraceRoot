import React from 'react';

export function Card({ children, className = '' }) {
  return (
    <div className={`bg-neuBg shadow-neu-flat rounded-2xl p-6 ${className}`}>
      {children}
    </div>
  );
}