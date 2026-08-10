// apps/web/src/app/bookmark/page.tsx
'use client';

import { useState } from 'react';
import { Search, Star, Menu, BookMarked, User, Eye, History, LockKeyhole, PlayCircle, Trash2, Library } from 'lucide-react';
import Link from 'next/link';

type ComicType = 'Manga' | 'Manhwa' | 'Manhua';

interface BookmarkComic {
  id: number;
  title: string;
  type: ComicType;
  rating: number;
  latestChapter: string;
  cover: string;
  addedAt: string;
}

interface HistoryComic {
  id: number;
  title: string;
  type: ComicType;
  lastReadChapter: string;
  totalChapter: string;
  timeAgo: string;
  cover: string;
  progress: number; // Persentase (0-100)
}

// Dummy Data Bookmark
const bookmarkData: BookmarkComic[] = Array.from({ length: 8 }).map((_, i) => ({
  id: i + 300,
  title: `Komik Favorit Judul Ke-${i + 1}`,
  type: i % 2 === 0 ? 'Manhwa' : 'Manga',
  rating: parseFloat((Math.random() * 1.5 + 8.5).toFixed(1)),
  latestChapter: `Ch. ${Math.floor(Math.random() * 150) + 50}`,
  addedAt: `${i + 1} hari yang lalu`,
  cover: `https://picsum.photos/seed/bookmark${i}/300/400`
}));

// Dummy Data History
const historyData: HistoryComic[] = Array.from({ length: 5 }).map((_, i) => ({
  id: i + 400,
  title: `Komik Yang Sedang Dibaca ${i + 1}`,
  type: i % 3 === 0 ? 'Manhua' : 'Manhwa',
  lastReadChapter: `Ch. ${Math.floor(Math.random() * 50) + 10}`,
  totalChapter: `Ch. 150`,
  timeAgo: i === 0 ? 'Baru saja' : `${i * 2} jam yang lalu`,
  cover: `https://picsum.photos/seed/history${i}/300/400`,
  progress: Math.floor(Math.random() * 60) + 10,
}));

const getFlagSvg = (type: ComicType) => {
  if (type === 'Manga') {
    return (
      <svg className="w-5 h-3.5 rounded shadow-md overflow-hidden bg-white" viewBox="0 0 900 600">
        <rect width="900" height="600" fill="#fff"/>
        <circle cx="450" cy="300" r="180" fill="#bc002d"/>
      </svg>
    );
  }
  if (type === 'Manhwa') {
    return (
      <svg className="w-5 h-3.5 rounded shadow-md overflow-hidden bg-white" viewBox="0 0 900 600">
        <rect width="900" height="600" fill="#fff"/>
        <circle cx="450" cy="300" r="160" fill="#cd2e3a"/>
        <path d="M 450 140 A 160 160 0 0 1 450 460 A 80 80 0 0 0 450 300 A 80 80 0 1 1 450 140 Z" fill="#0047a0"/>
      </svg>
    );
  }
  return (
    <svg className="w-5 h-3.5 rounded shadow-md overflow-hidden bg-[#ee1c25]" viewBox="0 0 900 600">
      <rect width="900" height="600" fill="#ee1c25"/>
      <path d="M150,150 L165,190 L205,190 L172,215 L185,255 L150,230 L115,255 L128,215 L95,190 L135,190 Z" fill="#ffde00"/>
    </svg>
  );
};

export default function BookmarkPage() {
  // Simulasi Status Login (Default false agar terlihat fitur terkunci)
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  
  // Tab State: 'bookmark' atau 'history'
  const [activeTab, setActiveTab] = useState<'bookmark' | 'history'>('bookmark');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#0f0f11] text-zinc-300 font-sans flex flex-col">
      {/* NAVBAR */}
      <nav className="sticky top-0 z-50 bg-[#16151a]/95 backdrop-blur-sm border-b border-purple-900/40 shadow-[0_4px_20px_rgba(0,0,0,0.5)]">
        <div className="max-w-[1400px] mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="lg:hidden text-cyan-400 hover:text-white" aria-label="Buka Menu">
              {isMobileMenuOpen ? <Menu className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
            <Link href="/" className="text-2xl font-extrabold tracking-tighter text-white">
              STYNX<span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-purple-500">VEIL</span>
            </Link>
          </div>
          
          <div className="hidden lg:flex items-center gap-6 font-medium text-sm">
            <Link href="/" className="text-zinc-400 hover:text-cyan-400 transition">Beranda</Link>
            <Link href="/daftar-komik" className="text-zinc-400 hover:text-purple-400 transition">Daftar Komik</Link>
            <Link href="/project" className="text-zinc-400 hover:text-purple-400 transition">Project Kami</Link>
            <Link href="/bookmark" className="text-white hover:text-cyan-400 transition drop-shadow-[0_0_8px_rgba(34,211,238,0.6)] flex items-center gap-1">
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
            <Link href="/" onClick={() => setIsMobileMenuOpen(false)} className="text-zinc-400 hover:text-cyan-400 font-medium text-sm border-b border-zinc-800 pb-2">Beranda</Link>
            <Link href="/daftar-komik" onClick={() => setIsMobileMenuOpen(false)} className="text-zinc-400 hover:text-cyan-400 font-medium text-sm border-b border-zinc-800 pb-2">Daftar Komik</Link>
            <Link href="/project" onClick={() => setIsMobileMenuOpen(false)} className="text-zinc-400 hover:text-cyan-400 font-medium text-sm border-b border-zinc-800 pb-2">Project Internal</Link>
            <Link href="/bookmark" onClick={() => setIsMobileMenuOpen(false)} className="text-white hover:text-cyan-400 font-medium text-sm flex items-center gap-2">
              <BookMarked className="w-4 h-4" /> Bookmark
            </Link>
          </div>
        )}
      </nav>      {/* 2. MAIN CONTENT AREA */}
      <main className="flex-1 w-full max-w-[1400px] mx-auto px-4 py-8">
        
        {/* JIKA BELUM LOGIN (GUEST VIEW) */}
        {!isLoggedIn ? (
          <div className="flex flex-col items-center justify-center py-20 mt-10 max-w-lg mx-auto text-center bg-[#16151a] border border-purple-900/30 rounded-2xl shadow-[0_0_40px_rgba(147,51,234,0.1)] relative overflow-hidden">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-64 bg-purple-600/10 rounded-full blur-[80px] pointer-events-none"></div>
            
            <div className="bg-[#0f0f11] p-4 rounded-full border border-zinc-800 mb-6 relative z-10">
              <LockKeyhole className="w-12 h-12 text-purple-400" />
            </div>
            
            <h1 className="text-2xl md:text-3xl font-bold text-white mb-3 relative z-10">Fitur Terkunci</h1>
            <p className="text-zinc-400 mb-8 px-6 relative z-10">
              Silakan masuk ke akun Anda untuk menyimpan komik favorit ke Bookmark dan melihat Riwayat Bacaan Anda secara otomatis.
            </p>
            
            <button 
              onClick={() => setIsLoggedIn(true)} 
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-bold py-3 px-8 rounded-xl transition shadow-[0_0_20px_rgba(147,51,234,0.4)] hover:scale-105 flex items-center gap-2 relative z-10 cursor-pointer"
            >
              <User className="w-5 h-5" /> Masuk ke Akun Sekarang
            </button>
          </div>
        ) : (
          /* JIKA SUDAH LOGIN (AUTHENTICATED VIEW) */
          <div className="w-full flex flex-col md:flex-row gap-8">
            
            {/* SIDEBAR NAVIGASI PROFIL */}
            <aside className="w-full md:w-64 shrink-0 flex flex-col gap-4">
              <div className="bg-[#16151a] border border-purple-900/30 rounded-xl p-5 flex flex-col items-center text-center shadow-lg">
                <img src="https://picsum.photos/seed/useravatar/150" alt="Avatar" className="w-20 h-20 rounded-full border-2 border-purple-500 mb-3 object-cover shadow-[0_0_15px_rgba(147,51,234,0.3)]" />
                <h3 className="font-bold text-white text-lg">StynxReader</h3>
                <p className="text-xs text-purple-400 mb-4">Member Sejak 2023</p>
                <div className="w-full bg-[#0f0f11] rounded-lg p-3 flex justify-between border border-zinc-800">
                  <div className="flex flex-col items-center">
                    <span className="text-white font-bold text-sm">124</span>
                    <span className="text-[10px] text-zinc-500">Dibaca</span>
                  </div>
                  <div className="w-px bg-zinc-800"></div>
                  <div className="flex flex-col items-center">
                    <span className="text-white font-bold text-sm">45</span>
                    <span className="text-[10px] text-zinc-500">Tersimpan</span>
                  </div>
                </div>
              </div>

              <div className="bg-[#16151a] border border-zinc-800 rounded-xl overflow-hidden flex flex-col">
                <button 
                  onClick={() => setActiveTab('bookmark')}
                  className={`flex items-center gap-3 px-4 py-3 text-sm font-semibold transition ${activeTab === 'bookmark' ? 'bg-gradient-to-r from-blue-600/20 to-purple-600/20 border-l-4 border-purple-500 text-purple-400' : 'text-zinc-400 hover:bg-zinc-800/50 hover:text-white border-l-4 border-transparent'}`}
                >
                  <BookMarked className="w-4 h-4" /> Bookmark Saya
                </button>
                <button 
                  onClick={() => setActiveTab('history')}
                  className={`flex items-center gap-3 px-4 py-3 text-sm font-semibold transition ${activeTab === 'history' ? 'bg-gradient-to-r from-blue-600/20 to-purple-600/20 border-l-4 border-purple-500 text-purple-400' : 'text-zinc-400 hover:bg-zinc-800/50 hover:text-white border-l-4 border-transparent'}`}
                >
                  <History className="w-4 h-4" /> Riwayat Baca
                </button>
              </div>
            </aside>

            {/* KONTEN UTAMA PERPUSTAKAAN */}
            <div className="flex-1">
              <div className="flex items-center justify-between mb-6 pb-4 border-b border-purple-900/30">
                <h2 className="text-2xl font-extrabold text-white flex items-center gap-2">
                  {activeTab === 'bookmark' ? (
                    <><Library className="w-6 h-6 text-purple-400" /> Bookmark Tersimpan</>
                  ) : (
                    <><History className="w-6 h-6 text-blue-400" /> Terakhir Dibaca</>
                  )}
                </h2>
                
                {/* Search in Bookmark/History */}
                <div className="relative hidden sm:flex items-center">
                  <input 
                    type="text" 
                    placeholder={activeTab === 'bookmark' ? "Cari bookmark..." : "Cari riwayat..."}
                    className="bg-[#16151a] border border-zinc-700 focus:border-purple-500 rounded-lg px-4 py-2 text-xs text-white outline-none pl-9 transition"
                  />
                  <Search className="w-3.5 h-3.5 text-zinc-500 absolute left-3" />
                </div>
              </div>

              {/* RENDER TAB BOOKMARK */}
              {activeTab === 'bookmark' && (
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                  {bookmarkData.map((comic) => (
                    <div key={comic.id} className="bg-[#16151a] rounded-lg border border-zinc-800/80 overflow-hidden hover:border-purple-500/50 transition duration-300 group flex flex-col h-full relative shadow-md">
                      
                      {/* Tombol Hapus Bookmark */}
                      <button className="absolute top-2 right-2 z-20 bg-red-600/80 hover:bg-red-500 text-white p-1.5 rounded-md backdrop-blur-md opacity-0 group-hover:opacity-100 transition duration-300 shadow-md">
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>

                      <Link href={`/comic/${comic.id}`} className="relative aspect-[2/3] overflow-hidden bg-zinc-900 block">
                        <img src={comic.cover} alt={comic.title} className="w-full h-full object-cover group-hover:scale-105 transition duration-500" />
                        <div className="absolute top-2 left-2 flex items-center gap-1 drop-shadow-md">
                          {getFlagSvg(comic.type)}
                        </div>
                        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/95 via-black/60 to-transparent p-2 pt-10 flex justify-between items-end">
                          <span className="text-xs font-bold text-purple-400 drop-shadow-md">{comic.latestChapter}</span>
                          <div className="flex items-center gap-1 bg-black/60 text-[10px] font-bold px-1.5 py-0.5 rounded text-white backdrop-blur-sm border border-zinc-700/50">
                            <Star className="w-2.5 h-2.5 text-yellow-400 fill-yellow-400" /> {comic.rating}
                          </div>
                        </div>
                      </Link>
                      
                      <div className="p-3 flex flex-col flex-1">
                        <Link href={`/comic/${comic.id}`}>
                          <h3 className="font-semibold text-white text-[13px] line-clamp-2 leading-snug mb-1 group-hover:text-purple-400 transition" title={comic.title}>
                            {comic.title}
                          </h3>
                        </Link>
                        <p className="text-[10px] text-zinc-500 mt-auto pt-2">Disimpan {comic.addedAt}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* RENDER TAB HISTORY */}
              {activeTab === 'history' && (
                <div className="flex flex-col gap-3">
                  {historyData.map((comic) => (
                    <div key={comic.id} className="bg-[#16151a] border border-zinc-800 rounded-xl p-3 flex gap-4 hover:border-purple-500/40 transition group relative shadow-sm">
                      <Link href={`/comic/${comic.id}`} className="w-20 h-28 sm:w-24 sm:h-32 shrink-0 rounded-lg overflow-hidden relative block shadow-md">
                        <img src={comic.cover} alt={comic.title} className="w-full h-full object-cover group-hover:scale-105 transition duration-300" />
                        <div className="absolute top-1 left-1">{getFlagSvg(comic.type)}</div>
                      </Link>
                      
                      <div className="flex flex-col justify-center flex-1 min-w-0">
                        <div className="flex justify-between items-start mb-1">
                          <Link href={`/comic/${comic.id}`}>
                            <h3 className="font-bold text-white text-sm sm:text-base line-clamp-1 group-hover:text-purple-400 transition">
                              {comic.title}
                            </h3>
                          </Link>
                          <span className="text-[10px] text-zinc-500 hidden sm:block whitespace-nowrap ml-2">Dibaca {comic.timeAgo}</span>
                        </div>
                        
                        <p className="text-xs font-semibold text-zinc-400 mb-3">
                          Terakhir dibaca: <span className="text-purple-400">{comic.lastReadChapter}</span> / {comic.totalChapter}
                        </p>

                        {/* Progress Bar UI */}
                        <div className="w-full max-w-sm mb-3">
                          <div className="flex justify-between text-[10px] mb-1">
                            <span className="text-zinc-500">Progress</span>
                            <span className="text-blue-400 font-bold">{comic.progress}%</span>
                          </div>
                          <div className="w-full bg-[#0f0f11] h-1.5 rounded-full overflow-hidden border border-zinc-800">
                            <div className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full" style={{ width: `${comic.progress}%` }}></div>
                          </div>
                        </div>

                        <div className="flex gap-2 mt-auto">
                          <Link href={`/read/${comic.id}-${comic.lastReadChapter.replace('Ch. ', '')}`} className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white text-xs font-bold px-4 py-1.5 rounded-md transition shadow-md flex items-center gap-1.5 w-fit">
                            <PlayCircle className="w-3.5 h-3.5" /> Lanjut Baca
                          </Link>
                          <button className="bg-[#0f0f11] hover:bg-red-500/20 text-zinc-400 hover:text-red-400 border border-zinc-800 hover:border-red-500/50 text-xs font-bold px-3 py-1.5 rounded-md transition flex items-center justify-center">
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </main>

      {/* FOOTER */}
      <footer className="bg-[#16151a] border-t border-zinc-800 mt-auto py-8 text-center text-zinc-500">
        <div className="max-w-[1400px] mx-auto px-4 flex flex-col items-center gap-4">
          <Link href="/" className="text-2xl font-extrabold tracking-tighter text-white opacity-90 hover:opacity-100 transition">
            STYNX<span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">VEIL</span>
          </Link>
          <p className="max-w-2xl text-[13px] leading-relaxed">
            Stynxveil adalah website baca komik online gratis berbahasa Indonesia. Kami memiliki ribuan koleksi komik manga, manhwa, dan manhua yang di-update setiap hari.
          </p>
          <p className="mt-2 text-[11px]">© {new Date().getFullYear()} Stynxveil. All Rights Reserved.</p>
        </div>
      </footer>
    </div>
  );
}