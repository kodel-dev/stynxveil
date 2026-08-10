import React from 'react';
import Link from 'next/link';

export const Footer = () => {
  return (
    <footer className="bg-[#0a0a0c] border-t border-purple-900/40 py-8 text-center text-zinc-500 shadow-[0_-4px_20px_rgba(0,0,0,0.5)] mt-auto">
      <div className="max-w-[1400px] mx-auto px-4 flex flex-col items-center gap-4">
        <Link href="/" className="text-2xl font-extrabold tracking-tighter text-white opacity-90 hover:opacity-100 transition drop-shadow-[0_0_8px_rgba(34,211,238,0.5)]">
          STYNX<span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-purple-500">VEIL</span>
        </Link>
        <p className="max-w-2xl text-[13px] leading-relaxed">
          Stynxveil adalah platform tempat baca komik online gratis terlengkap. Menyediakan koleksi manga, manhwa, dan manhua terjemahan Bahasa Indonesia dengan update setiap hari dan kualitas gambar resolusi tinggi.
        </p>
        <p className="mt-2 text-[11px] text-purple-500/50">© {new Date().getFullYear()} Stynxveil Network. All Rights Reserved.</p>
      </div>
    </footer>
  );
};
