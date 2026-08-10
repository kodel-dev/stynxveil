// apps/web/src/app/daftar-komik/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { 
  Search, Star, Menu, BookMarked, User, Eye, ChevronLeft, ChevronRight, Loader2, X, Sparkles, SlidersHorizontal 
} from 'lucide-react';
import Link from 'next/link';
import { getLatest, searchManga } from '@/lib/api/shinigami';
import { Manga } from '@/types/manga';

// --- FUNGSI FORMATTING ---
const formatViews = (views: number) => {
  if (!views) return '0';
  if (views >= 1000000) return (views / 1000000).toFixed(1) + 'M';
  if (views >= 1000) return (views / 1000).toFixed(1) + 'K';
  return views.toString();
};

const getFlagSvg = (format: string) => {
  if (format === 'Manga') return <svg className="w-4 h-3 rounded shadow-sm bg-white" viewBox="0 0 900 600"><rect width="900" height="600" fill="#fff"/><circle cx="450" cy="300" r="180" fill="#bc002d"/></svg>;
  if (format === 'Manhwa') return <svg className="w-4 h-3 rounded shadow-sm bg-white" viewBox="0 0 900 600"><rect width="900" height="600" fill="#fff"/><circle cx="450" cy="300" r="160" fill="#cd2e3a"/><path d="M 450 140 A 160 160 0 0 1 450 460 A 80 80 0 0 0 450 300 A 80 80 0 1 1 450 140 Z" fill="#0047a0"/></svg>;
  return <svg className="w-4 h-3 rounded shadow-sm bg-[#ee1c25]" viewBox="0 0 900 600"><rect width="900" height="600" fill="#ee1c25"/><path d="M150,150 L165,190 L205,190 L172,215 L185,255 L150,230 L115,255 L128,215 L95,190 L135,190 Z" fill="#ffde00"/></svg>;
};

// --- KOMPONEN GRID 4 IKLAN ---
const AdGrid = () => (
  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full my-6 max-w-[1400px] mx-auto px-4" aria-hidden="true">
    {[1, 2, 3, 4].map((i) => (
      <div key={i} className="h-28 border border-dashed border-cyan-500/30 bg-[#0a0a0c]/80 backdrop-blur-sm flex flex-col items-center justify-center text-zinc-500 rounded-xl overflow-hidden hover:border-cyan-400 hover:text-cyan-400 transition shadow-[0_0_15px_rgba(0,0,0,0.5)]">
        <Sparkles className="w-4 h-4 mb-1 opacity-50" />
        <span className="text-[10px] font-bold tracking-widest uppercase">Space Iklan {i}</span>
      </div>
    ))}
  </div>
);

export default function DaftarKomikPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);
  
  // STATE FILTER & SEARCH
  const [searchQuery, setSearchQuery] = useState('');
  const [debouncedQuery, setDebouncedQuery] = useState('');
  const [selectedFormat, setSelectedFormat] = useState('Semua');
  const [selectedSort, setSelectedSort] = useState('Terbaru');
  
  // STATE API & PAGINATION
  const [comics, setComics] = useState<Manga[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [inputPage, setInputPage] = useState('1'); 
  const [totalPages, setTotalPages] = useState(1);

  // Debounce Search
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(searchQuery);
      setCurrentPage(1);
      setInputPage('1');
    }, 400);
    return () => clearTimeout(timer);
  }, [searchQuery]);

  // Reset Halaman ke 1 Saat Format Berubah
  useEffect(() => {
    setCurrentPage(1);
    setInputPage('1');
  }, [selectedFormat]);

  // FETCH DATA MENGGUNAKAN GETLATEST / SEARCH YANG PASTI AMAN DARI 404
  useEffect(() => {
    let isMounted = true;
    setIsLoading(true);

    const fetchData = async () => {
      try {
        let res;
        if (debouncedQuery.trim() !== '') {
          res = await searchManga(debouncedQuery, currentPage);
        } else {
          res = await getLatest(currentPage, 24);
        }

        if (isMounted && res && res.status === 'success' && res.data) {
          // Deduplikasi ketat dengan Map berdasarkan manga_id
          const uniqueMap = new Map<string, Manga>();
          res.data.forEach((comic: Manga) => {
            if (comic.manga_id && !uniqueMap.has(comic.manga_id)) {
              uniqueMap.set(comic.manga_id, { ...comic, type: comic.type || 'Mirror' });
            }
          });

          let processedData = Array.from(uniqueMap.values());

          // Filter Format tambahan di sisi client
          if (selectedFormat !== 'Semua') {
            processedData = processedData.filter(c => c.format?.toLowerCase() === selectedFormat.toLowerCase());
          }

          setComics(processedData);
          setTotalPages(res.pagination?.total_pages || 1);
        }
      } catch (err) {
        console.error("Gagal mengambil data katalog komik:", err);
        if (isMounted) setComics([]);
      } finally {
        if (isMounted) setIsLoading(false);
      }
    };

    fetchData();

    return () => {
      isMounted = false;
    };
  }, [debouncedQuery, currentPage, selectedFormat]);

  // Sorting Sisi Klien
  if (selectedSort === 'Rating Tertinggi') {
    comics.sort((a, b) => (b.rating || 0) - (a.rating || 0));
  } else if (selectedSort === 'Paling Populer') {
    comics.sort((a, b) => b.views - a.views);
  }

  const handleJumpPage = () => {
    let pageNum = parseInt(inputPage);
    if (isNaN(pageNum) || pageNum < 1) pageNum = 1;
    if (pageNum > totalPages) pageNum = totalPages;
    setCurrentPage(pageNum);
    setInputPage(pageNum.toString());
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(prev => prev - 1);
      setInputPage((currentPage - 1).toString());
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(prev => prev + 1);
      setInputPage((currentPage + 1).toString());
    }
  };

  return (
    <div className="min-h-screen bg-[#0f0f11] text-zinc-300 font-sans flex flex-col selection:bg-cyan-500 selection:text-black">
      <h1 className="sr-only">Daftar Komik Katalog - Stynxveil</h1>

      {/* NAVBAR STYNXVEIL */}
      <nav className="sticky top-0 z-50 bg-[#16151a]/95 backdrop-blur-md border-b border-purple-900/40 shadow-[0_4px_20px_rgba(0,0,0,0.5)]">
        <div className="max-w-[1400px] mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="lg:hidden text-cyan-400 hover:text-white transition" aria-label="Buka Menu">
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
            <Link href="/" className="text-2xl font-black tracking-tighter text-white">
              STYNX<span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-purple-500 drop-shadow-[0_0_10px_rgba(34,211,238,0.5)]">VEIL</span>
            </Link>
          </div>
          
          <div className="hidden lg:flex items-center gap-8 font-semibold text-sm">
            <Link href="/" className="text-zinc-400 hover:text-cyan-400 transition">Beranda</Link>
            <Link href="/daftar-komik" className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500 font-bold transition border-b-2 border-cyan-400 pb-1 drop-shadow-[0_0_8px_rgba(34,211,238,0.6)]">Daftar Komik</Link>
            <Link href="/project" className="text-zinc-400 hover:text-purple-400 transition">Project Internal</Link>
            <Link href="/bookmark" className="text-zinc-400 hover:text-purple-400 transition flex items-center gap-1.5">
              <BookMarked className="w-4 h-4 text-purple-400" /> Bookmark
            </Link>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="hidden md:flex items-center bg-[#0a0a0c] rounded-lg px-3 py-1.5 border border-zinc-800 focus-within:border-cyan-400 transition w-64 shadow-inner">
              <input 
                type="text" 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Cari judul komik..." 
                className="bg-transparent border-none outline-none text-xs w-full text-zinc-200 placeholder:text-zinc-600"
              />
              <Search className="w-4 h-4 text-cyan-400" />
            </div>

            <button 
              className="md:hidden text-cyan-400 hover:text-cyan-300 p-2 bg-[#181722] rounded-lg border border-zinc-800"
              onClick={() => setIsMobileSearchOpen(!isMobileSearchOpen)}
              aria-label="Cari Komik"
            >
              <Search className="w-4 h-4" />
            </button>

            <button 
              onClick={() => setIsLoggedIn(!isLoggedIn)}
              className="bg-gradient-to-r from-purple-600 to-cyan-500 hover:from-purple-500 hover:to-cyan-400 text-white px-4 py-2 rounded-lg text-xs font-bold transition flex items-center gap-2 cursor-pointer shadow-[0_0_20px_rgba(34,211,238,0.25)]"
            >
              <User className="w-4 h-4" /> 
              <span className="hidden sm:inline">{isLoggedIn ? 'Profil Saya' : 'Masuk / Daftar'}</span>
            </button>
          </div>
        </div>

        {isMobileSearchOpen && (
          <div className="md:hidden px-4 pb-3 pt-1 border-t border-zinc-800 bg-[#121118]">
            <div className="flex items-center bg-[#0a0a0c] rounded-lg px-3 py-2 border border-cyan-400/50 shadow-inner w-full">
              <input 
                type="text" 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Cari judul komik..." 
                className="bg-transparent border-none outline-none text-xs w-full text-zinc-200"
                autoFocus
              />
              <Search className="w-4 h-4 text-cyan-400" />
            </div>
          </div>
        )}

        {isMobileMenuOpen && (
          <div className="lg:hidden absolute top-full left-0 w-full bg-[#16151a]/95 backdrop-blur-xl border-b border-purple-900/40 py-4 px-6 flex flex-col gap-4 shadow-2xl">
            <Link href="/" onClick={() => setIsMobileMenuOpen(false)} className="text-zinc-400 hover:text-cyan-400 font-medium text-sm py-1 border-b border-zinc-800">Beranda</Link>
            <Link href="/daftar-komik" onClick={() => setIsMobileMenuOpen(false)} className="text-cyan-400 font-bold text-sm py-1 border-b border-zinc-800">Daftar Komik</Link>
            <Link href="/project" onClick={() => setIsMobileMenuOpen(false)} className="text-zinc-400 hover:text-purple-400 font-medium text-sm py-1 border-b border-zinc-800">Project Internal</Link>
            <Link href="/bookmark" onClick={() => setIsMobileMenuOpen(false)} className="text-zinc-400 hover:text-purple-400 font-medium text-sm py-1 flex items-center gap-2">
              <BookMarked className="w-4 h-4" /> Bookmark
            </Link>
          </div>
        )}
      </nav>

      {/* BANNER IKLAN ATAS */}
      <AdGrid />

      {/* HEADER HERO */}
      <header className="bg-gradient-to-b from-[#16151a] to-[#0f0f11] border-y border-purple-900/20 py-10 px-4 text-center relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[180px] bg-cyan-500/10 rounded-full blur-[120px] pointer-events-none"></div>
        <div className="relative z-10 max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-bold mb-2 shadow-[0_0_15px_rgba(34,211,238,0.2)]">
            <Sparkles className="w-3.5 h-3.5" /> Katalog Komik Terbaru
          </div>
          <h2 className="text-2xl md:text-4xl font-black text-white tracking-tight mb-2">
            Daftar <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-500">Katalog Komik</span>
          </h2>
          <p className="text-xs md:text-sm text-zinc-400">
            Jelajahi seluruh daftar komik dengan navigasi halaman yang aman dari error 404.
          </p>
        </div>
      </header>

      {/* KONTEN UTAMA */}
      <div className="max-w-[1400px] mx-auto px-4 py-8 w-full flex-1">
        
        {/* TOOLBAR FILTER */}
        <div className="flex flex-col md:flex-row gap-4 justify-between items-center bg-[#16151a] border border-zinc-800/80 rounded-2xl p-4 mb-8 shadow-xl">
          <div className="flex items-center gap-2 text-zinc-400 text-xs font-bold px-2">
            <SlidersHorizontal className="w-4 h-4 text-cyan-400" /> Filter Katalog:
          </div>
          
          <div className="flex flex-wrap items-center gap-3 w-full md:w-auto justify-end">
            <div className="flex items-center gap-2 bg-[#0a0a0c] border border-zinc-800 rounded-xl px-3 py-2">
              <span className="text-[11px] font-semibold text-zinc-500">Format:</span>
              <select 
                value={selectedFormat}
                onChange={(e) => setSelectedFormat(e.target.value)}
                className="bg-transparent text-xs text-cyan-400 font-bold outline-none cursor-pointer"
              >
                <option value="Semua" className="bg-[#16151a]">Semua Format</option>
                <option value="Manga" className="bg-[#16151a]">Manga</option>
                <option value="Manhwa" className="bg-[#16151a]">Manhwa</option>
                <option value="Manhua" className="bg-[#16151a]">Manhua</option>
              </select>
            </div>

            <div className="flex items-center gap-2 bg-[#0a0a0c] border border-zinc-800 rounded-xl px-3 py-2">
              <span className="text-[11px] font-semibold text-zinc-500">Urutkan:</span>
              <select 
                value={selectedSort}
                onChange={(e) => setSelectedSort(e.target.value)}
                className="bg-transparent text-xs text-pink-400 font-bold outline-none cursor-pointer"
              >
                <option value="Terbaru" className="bg-[#16151a]">Update Terbaru</option>
                <option value="Rating Tertinggi" className="bg-[#16151a]">Rating Tertinggi</option>
                <option value="Paling Populer" className="bg-[#16151a]">Paling Populer</option>
              </select>
            </div>
          </div>
        </div>

        {/* GRID KOMIK */}
        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-28 bg-[#16151a]/40 rounded-2xl border border-zinc-800/60">
            <Loader2 className="w-10 h-10 text-cyan-400 animate-spin mb-3 drop-shadow-[0_0_10px_rgba(34,211,238,0.5)]" />
            <p className="text-zinc-400 font-medium text-xs tracking-wider uppercase">Memuat katalog server...</p>
          </div>
        ) : comics.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-28 text-zinc-500 bg-[#16151a]/40 rounded-2xl border border-zinc-800/60">
            <Search className="w-12 h-12 mb-3 opacity-30 text-cyan-400" />
            <p className="text-center px-4 text-xs font-medium">Komik katalog tidak ditemukan.</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-5 mb-12">
            {comics.map((comic) => (
              <article key={comic.manga_id} className="bg-[#16151a] rounded-xl border border-zinc-800/80 overflow-hidden hover:border-cyan-400/60 transition-all duration-300 group flex flex-col h-full shadow-[0_4px_20px_rgba(0,0,0,0.6)] hover:shadow-[0_0_20px_rgba(34,211,238,0.25)] hover:-translate-y-1">
                <Link href={`/comic/${comic.manga_id}`} className="relative aspect-[2/3] overflow-hidden bg-zinc-900 block">
                  <img src={comic.cover_portrait || comic.cover} alt={`Baca Komik ${comic.title}`} className="w-full h-full object-cover group-hover:scale-105 transition duration-500" loading="lazy" />
                  
                  <div className="absolute top-2 left-2 flex items-center gap-1 drop-shadow-md">
                    {getFlagSvg(comic.format)}
                  </div>
                  <div className="absolute top-2 right-2 text-[9px] font-extrabold px-2 py-0.5 rounded-md shadow-md backdrop-blur-md bg-black/70 text-cyan-300 border border-cyan-500/30">
                    {comic.type}
                  </div>
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/95 via-black/70 to-transparent p-2.5 pt-10 flex justify-between items-end">
                    <span className="text-xs font-black text-cyan-400 drop-shadow-[0_0_8px_rgba(34,211,238,0.5)]">Ch. {comic.latest_chapter}</span>
                    {comic.rating && (
                      <div className="flex items-center gap-1 bg-black/70 text-[10px] font-bold px-1.5 py-0.5 rounded text-yellow-400 backdrop-blur-sm border border-yellow-500/30">
                        <Star className="w-2.5 h-2.5 fill-yellow-400" /> {comic.rating}
                      </div>
                    )}
                  </div>
                </Link>
                
                <div className="p-3.5 flex flex-col flex-1 justify-between">
                  <div>
                    <Link href={`/comic/${comic.manga_id}`}>
                      <h3 className="font-bold text-zinc-100 text-[13px] line-clamp-2 leading-snug mb-2 group-hover:text-cyan-400 transition" title={comic.title}>
                        {comic.title}
                      </h3>
                    </Link>
                    <div className="flex items-center justify-between text-[10px] text-zinc-500 mb-2.5">
                      <div className="flex items-center gap-1">
                        <Eye className="w-3 h-3 text-cyan-500" aria-hidden="true" />
                        <span>{formatViews(comic.views)} pembaca</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {comic.genres?.slice(0, 2).map((genre, idx) => (
                      <span key={idx} className="text-[9px] font-semibold text-purple-300 bg-purple-950/40 border border-purple-500/20 px-2 py-0.5 rounded-md">
                        {genre.name}
                      </span>
                    ))}
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}

        {/* PAGINATION */}
        {!isLoading && totalPages > 1 && (
          <nav className="flex justify-center items-center gap-3 mb-16 flex-wrap" aria-label="Navigasi Halaman Katalog">
            <button 
              onClick={handlePrevPage}
              disabled={currentPage === 1}
              className="bg-[#16151a] hover:bg-zinc-800 disabled:opacity-30 text-cyan-400 border border-zinc-800 px-4 py-2.5 rounded-xl text-xs font-bold transition flex items-center gap-1 cursor-pointer shadow-md"
            >
              <ChevronLeft className="w-4 h-4" /> Prev
            </button>

            <div className="flex items-center gap-2 bg-[#0a0a0c] border border-zinc-800 focus-within:border-cyan-400 transition rounded-xl px-3.5 py-2 shadow-inner">
              <span className="text-xs font-medium text-zinc-500">Hal</span>
              <input 
                type="number" 
                min={1}
                max={totalPages}
                value={inputPage}
                onChange={(e) => setInputPage(e.target.value)}
                onBlur={handleJumpPage}
                onKeyDown={(e) => e.key === 'Enter' && handleJumpPage()}
                className="w-12 bg-transparent text-cyan-400 font-black text-center outline-none text-sm appearance-none"
              />
              <span className="text-xs font-medium text-zinc-500">/ {totalPages}</span>
            </div>

            <button 
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
              className="bg-[#16151a] hover:bg-zinc-800 disabled:opacity-30 text-cyan-400 border border-zinc-800 px-4 py-2.5 rounded-xl text-xs font-bold transition flex items-center gap-1 cursor-pointer shadow-md"
            >
              Next <ChevronRight className="w-4 h-4" />
            </button>
          </nav>
        )}
      </div>

      {/* BANNER IKLAN BAWAH */}
      <AdGrid />

      {/* FOOTER */}
      <footer className="bg-[#0a0a0c] border-t border-purple-900/40 py-10 text-center text-zinc-500 shadow-[0_-4px_30px_rgba(0,0,0,0.8)] mt-auto">
        <div className="max-w-[1400px] mx-auto px-4 flex flex-col items-center gap-4">
          <Link href="/" className="text-2xl font-black tracking-tighter text-white transition">
            STYNX<span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-purple-500">VEIL</span>
          </Link>
          <p className="max-w-2xl text-[13px] leading-relaxed text-zinc-400">
            Stynxveil adalah platform tempat baca komik online gratis terlengkap. Menyediakan koleksi manga, manhwa, dan manhua terjemahan Bahasa Indonesia.
          </p>
          <p className="mt-2 text-[11px] text-purple-400/60 font-medium">© {new Date().getFullYear()} Stynxveil Network. All Rights Reserved.</p>
        </div>
      </footer>
    </div>
  );
}