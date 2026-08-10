import React from 'react';

export const AdPlaceholder = ({ className, text }: { className?: string, text?: string }) => (
  <div className={`flex items-center justify-center border border-dashed border-zinc-700 bg-[#0a0a0c]/50 text-zinc-600 rounded-lg overflow-hidden ${className}`} aria-hidden="true">
    <span className="text-xs font-semibold tracking-widest uppercase">{text || "SPACE IKLAN"}</span>
  </div>
);
