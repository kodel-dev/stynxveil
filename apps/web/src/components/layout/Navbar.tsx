import React, { useState } from 'react';
import Link from 'next/link';
import { Menu, Search, User, BookMarked, X } from 'lucide-react';
import { usePathname } from 'next/navigation';

export const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const pathname = usePathname();

  const isHome = pathname === '/';

  return (
    <nav className="sticky top-0 z-50 bg-[#16151a]/95 backdrop-blur-sm border-b border-purple-900/40 shadow-[0_4px_20px_rgba(0,0,0,0.5)]">
      <div className="max-w-[1400px] mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="lg:hidden text-cyan-400 hover:text-white" aria-label="Buka Menu">
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
          <Link href="/" className="text-2xl font-extrabold tracking-tighter text-white">
            STYNX<span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-purple-500">VEIL</span>
          </Link>
        </div>
        
        <div className="hidden lg:flex items-center gap-6 font-medium text-sm">
          <Link href="/" className={`${pathname === '/' ? 'text-white drop-shadow-[0_0_8px_rgba(34,211,238,0.6)]' : 'text-zinc-400'} hover:text-cyan-400 transition`}>Beranda</Link>
          <Link href="/daftar-komik" className={`${pathname === '/daftar-komik' ? 'text-white drop-shadow-[0_0_8px_rgba(34,211,238,0.6)]' : 'text-zinc-400'} hover:text-purple-400 transition`}>Daftar Komik</Link>
          <Link href="/project" className={`${pathname === '/project' ? 'text-white drop-shadow-[0_0_8px_rgba(34,211,238,0.6)]' : 'text-zinc-400'} hover:text-purple-400 transition`}>Project Kami</Link>
          <Link href="/bookmark" className={`${pathname === '/bookmark' ? 'text-white drop-shadow-[0_0_8px_rgba(34,211,238,0.6)]' : 'text-zinc-400'} hover:text-purple-400 transition flex items-center gap-1`}>
            <BookMarked className="w-4 h-4" /> Bookmark
          </Link>
        </div>
        
        <div className="flex items-center gap-3 md:gap-4">
          <div className="hidden md:flex items-center bg-[#0a0a0c] rounded-md px-3 py-1.5 border border-zinc-800 focus-within:border-cyan-500 transition w-64 shadow-inner">
            <input 
              type="text" 
              placeholder="Cari judul komik..." 
              className="bg-transparent border-none outline-none text-sm w-full text-zinc-200"
            />
            <Search className="w-4 h-4 text-cyan-500" />
          </div>

          <button 
            className="md:hidden text-cyan-400 hover:text-cyan-300 p-1"
            onClick={() => setIsMobileSearchOpen(!isMobileSearchOpen)}
          >
            <Search className="w-5 h-5" />
          </button>

          <button 
            onClick={() => setIsLoggedIn(!isLoggedIn)}
            className="bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-500 hover:to-cyan-500 text-white px-3 py-1.5 md:px-4 rounded-md text-xs font-semibold transition flex items-center gap-2 cursor-pointer shadow-[0_0_15px_rgba(34,211,238,0.3)]"
          >
            <User className="w-4 h-4" /> 
            <span className="hidden sm:inline">{isLoggedIn ? 'Profil Saya' : 'Masuk / Daftar'}</span>
          </button>
        </div>
      </div>

      {isMobileSearchOpen && (
        <div className="md:hidden px-4 pb-3 pt-1 border-t border-zinc-800">
          <div className="flex items-center bg-[#0a0a0c] rounded-md px-3 py-2 border border-cyan-500/50 shadow-inner w-full">
            <input 
              type="text" 
              placeholder="Cari judul komik..." 
              className="bg-transparent border-none outline-none text-sm w-full text-zinc-200"
              autoFocus
            />
            <Search className="w-4 h-4 text-cyan-500" />
          </div>
        </div>
      )}

      {isMobileMenuOpen && (
        <div className="lg:hidden absolute top-full left-0 w-full bg-[#16151a]/95 backdrop-blur-md border-b border-purple-900/40 py-4 px-4 flex flex-col gap-4 shadow-xl">
          <Link href="/" onClick={() => setIsMobileMenuOpen(false)} className={`${pathname === '/' ? 'text-white' : 'text-zinc-400'} hover:text-cyan-400 font-medium text-sm border-b border-zinc-800 pb-2`}>Beranda</Link>
          <Link href="/daftar-komik" onClick={() => setIsMobileMenuOpen(false)} className={`${pathname === '/daftar-komik' ? 'text-white' : 'text-zinc-400'} hover:text-cyan-400 font-medium text-sm border-b border-zinc-800 pb-2`}>Daftar Komik</Link>
          <Link href="/project" onClick={() => setIsMobileMenuOpen(false)} className={`${pathname === '/project' ? 'text-white' : 'text-zinc-400'} hover:text-cyan-400 font-medium text-sm border-b border-zinc-800 pb-2`}>Project Internal</Link>
          <Link href="/bookmark" onClick={() => setIsMobileMenuOpen(false)} className={`${pathname === '/bookmark' ? 'text-white' : 'text-zinc-400'} hover:text-cyan-400 font-medium text-sm flex items-center gap-2`}>
            <BookMarked className="w-4 h-4" /> Bookmark
          </Link>
        </div>
      )}
    </nav>
  );
};
