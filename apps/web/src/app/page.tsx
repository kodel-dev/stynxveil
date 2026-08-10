// apps/web/src/app/page.tsx
'use client';

import { useState, useEffect, useRef } from 'react';
import { 
  Search, Flame, Clock, Star, Eye, ChevronRight, ChevronLeft, 
  Menu, BookMarked, User, PlayCircle, Info, MessageSquare, Heart, Trophy, Loader2,
  FolderOpen, Globe2, Map as MapIcon, MapPin, Compass, X
} from 'lucide-react';
import Link from 'next/link';
import { topComments, communityLeaders, genresList } from "../data/dummy";
import { useHome } from "@/hooks/useHome";
import { Manga } from "@/types/manga";

// --- FUNGSI FORMATTING ---
const formatViews = (views: number) => {
  if (!views) return '0';
  if (views >= 1000000) return (views / 1000000).toFixed(1) + 'M';
  if (views >= 1000) return (views / 1000).toFixed(1) + 'K';
  return views.toString();
};

const formatTimeAgo = (dateString: string) => {
  if (!dateString) return '';
  const date = new Date(dateString);
  const now = new Date();
  const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);
  if (seconds < 3600) return `${Math.floor(seconds / 60)} menit lalu`;
  if (seconds < 86400) return `${Math.floor(seconds / 3600)} jam lalu`;
  if (seconds < 2592000) return `${Math.floor(seconds / 86400)} hari lalu`;
  return 'Beberapa waktu lalu';
};

const getFlagSvg = (format: string) => {
  if (format === 'Manga') {
    return (
      <svg className="w-4 h-3 rounded shadow-sm overflow-hidden bg-white" viewBox="0 0 900 600" aria-label="Manga Jepang">
        <rect width="900" height="600" fill="#fff"/>
        <circle cx="450" cy="300" r="180" fill="#bc002d"/>
      </svg>
    );
  }
  if (format === 'Manhwa') {
    return (
      <svg className="w-4 h-3 rounded shadow-sm overflow-hidden bg-white" viewBox="0 0 900 600" aria-label="Manhwa Korea">
        <rect width="900" height="600" fill="#fff"/>
        <circle cx="450" cy="300" r="160" fill="#cd2e3a"/>
        <path d="M 450 140 A 160 160 0 0 1 450 460 A 80 80 0 0 0 450 300 A 80 80 0 1 1 450 140 Z" fill="#0047a0"/>
      </svg>
    );
  }
  return (
    <svg className="w-4 h-3 rounded shadow-sm overflow-hidden bg-[#ee1c25]" viewBox="0 0 900 600" aria-label="Manhua China">
      <rect width="900" height="600" fill="#ee1c25"/>
      <path d="M150,150 L165,190 L205,190 L172,215 L185,255 L150,230 L115,255 L128,215 L95,190 L135,190 Z" fill="#ffde00"/>
    </svg>
  );
};

// --- KOMPONEN PLACEHOLDER IKLAN ---
const AdPlaceholder = ({ className, text }: { className?: string, text?: string }) => (
  <div className={`flex items-center justify-center border border-dashed border-zinc-700 bg-[#0a0a0c]/50 text-zinc-600 rounded-lg overflow-hidden ${className}`} aria-hidden="true">
    <span className="text-xs font-semibold tracking-widest uppercase">{text || "SPACE IKLAN"}</span>
  </div>
);

// --- KOMPONEN KATEGORI SLIDER ---
const ComicSliderSection = ({ title, icon: Icon, comics, accentColor = "cyan" }: { title: string, icon: any, comics: Manga[], accentColor?: string }) => {
  const sliderRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (sliderRef.current) {
      const { scrollLeft, clientWidth } = sliderRef.current;
      const scrollAmount = clientWidth * 0.75;
      sliderRef.current.scrollTo({
        left: direction === 'left' ? scrollLeft - scrollAmount : scrollLeft + scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section className="mt-12 relative">
      <div className="flex items-center justify-between border-b border-purple-900/30 pb-2 mb-4">
        <div className="flex items-center gap-2">
          <Icon className={`w-5 h-5 text-${accentColor}-400`} aria-hidden="true" />
          <h2 className="text-lg font-bold text-white uppercase tracking-wider drop-shadow-[0_0_5px_rgba(34,211,238,0.5)]">{title}</h2>
        </div>
        <div className="flex items-center gap-1.5">
          <button onClick={() => scroll('left')} aria-label="Geser ke kiri" className="bg-[#121115] hover:bg-zinc-800 text-zinc-200 p-1.5 rounded transition border border-zinc-700 hover:border-purple-500 cursor-pointer shadow-md"><ChevronLeft className="w-4 h-4" /></button>
          <button onClick={() => scroll('right')} aria-label="Geser ke kanan" className="bg-[#121115] hover:bg-zinc-800 text-zinc-200 p-1.5 rounded transition border border-zinc-700 hover:border-purple-500 cursor-pointer shadow-md"><ChevronRight className="w-4 h-4" /></button>
        </div>
      </div>
      
      <div ref={sliderRef} className="flex gap-4 overflow-x-auto no-scrollbar scroll-smooth pb-4 pt-1 px-1">
        {comics.length > 0 ? (
          comics.map((comic) => (
            <article key={comic.manga_id} className="group relative rounded-lg overflow-hidden bg-[#121115] border border-zinc-800 hover:border-purple-500/50 transition duration-300 w-[140px] sm:w-[160px] flex-none shadow-[0_4px_10px_rgba(0,0,0,0.5)] hover:shadow-[0_0_15px_rgba(168,85,247,0.2)] flex flex-col">
              <Link href={`/comic/${comic.manga_id}`} className="aspect-[2/3] w-full relative bg-zinc-900 overflow-hidden block">
                <img src={comic.cover_portrait || comic.cover} alt={`Cover komik ${comic.title}`} className="w-full h-full object-cover group-hover:scale-105 transition duration-300" loading="lazy" />
                <div className="absolute top-2 left-2 flex items-center gap-1 drop-shadow-md">
                  {getFlagSvg(comic.format)}
                </div>
                <div className="absolute top-2 right-2 text-[9px] font-bold px-1.5 py-0.5 rounded shadow-md backdrop-blur-sm bg-zinc-800/90 text-zinc-200 border border-zinc-700">
                  {comic.type}
                </div>
                {comic.rating && (
                  <div className="absolute bottom-2 right-2 flex items-center gap-1 bg-black/80 backdrop-blur-sm text-[10px] font-bold px-1.5 py-0.5 rounded text-yellow-400 border border-yellow-500/30">
                    <Star className="w-3 h-3 fill-yellow-400" /> {comic.rating}
                  </div>
                )}
              </Link>
              <div className="p-2.5 flex flex-col flex-1">
                <Link href={`/comic/${comic.manga_id}`}>
                  <h3 className="font-semibold text-zinc-100 text-xs sm:text-sm line-clamp-2 group-hover:text-cyan-400 transition drop-shadow-md">
                    {comic.title}
                  </h3>
                </Link>
                <div className="flex justify-between items-center text-[10px] sm:text-xs text-zinc-400 mt-auto pt-1.5 font-medium">
                  <span className="text-cyan-400 font-bold">Ch. {comic.latest_chapter}</span>
                  <span className="flex items-center gap-1"><Eye className="w-3 h-3 text-purple-500/70" aria-hidden="true" /> {formatViews(comic.views)}</span>
                </div>
              </div>
            </article>
          ))
        ) : (
          <div className="w-full py-10 flex flex-col items-center justify-center border border-dashed border-zinc-800 rounded-lg text-zinc-500 bg-[#121115]">
            <FolderOpen className="w-8 h-8 text-zinc-700 mb-2" />
            <p className="text-xs">Koleksi {title} sedang diperbarui.</p>
          </div>
        )}
      </div>
    </section>
  );
};

// --- HALAMAN UTAMA ---
export default function HomePage() {
  const { 
    home, slides, loading, error, 
    latestComics, latestPage, latestTotalPages, fetchLatestPage, loadingLatest 
  } = useHome();

  const [currentSlide, setCurrentSlide] = useState(0);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);

  const slideIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const hotSliderRef = useRef<HTMLDivElement>(null);

  const startAutoSlide = () => {
    if (slideIntervalRef.current) clearInterval(slideIntervalRef.current);
    if (slides.length === 0) return;
    slideIntervalRef.current = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6000);
  };

  useEffect(() => {
    startAutoSlide();
    return () => {
      if (slideIntervalRef.current) clearInterval(slideIntervalRef.current);
    };
  }, [slides.length]);

  const handleDotClick = (index: number) => {
    setCurrentSlide(index);
    startAutoSlide();
  };

  const scrollHot = (direction: 'left' | 'right') => {
    if (hotSliderRef.current) {
      const { scrollLeft, clientWidth } = hotSliderRef.current;
      const scrollAmount = clientWidth * 0.75;
      hotSliderRef.current.scrollTo({
        left: direction === 'left' ? scrollLeft - scrollAmount : scrollLeft + scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= latestTotalPages) {
      fetchLatestPage(newPage);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-[#0f0f11] text-cyan-400 font-medium">
        <Loader2 className="w-8 h-8 animate-spin mr-3" /> Memuat data komik...
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen text-red-500 font-medium bg-[#0f0f11]">
        {error}
      </div>
    );
  }

  const activeSlide = slides[currentSlide] || slides[0];

  const allComicsRaw: Manga[] = [
    ...(home?.latest || []),
    ...(home?.recommended || []),
    ...(home?.popular || []),
    ...(latestComics || [])
  ];
  
  const uniqueComics = Array.from(new Map<string, Manga>(allComicsRaw.map(c => [c.manga_id, c])).values());

  const projectComics = uniqueComics.filter(c => c.type === 'Project');
  const mirrorComics = uniqueComics.filter(c => c.type === 'Mirror');
  const manhwaComics = uniqueComics.filter(c => c.format === 'Manhwa');
  const manhuaComics = uniqueComics.filter(c => c.format === 'Manhua');
  const mangaComics = uniqueComics.filter(c => c.format === 'Manga');

  return (
    <div className="min-h-screen bg-[#0f0f11] text-zinc-300 font-sans">
      <h1 className="sr-only">Stynxveil - Baca Komik Manga, Manhwa, Manhua Bahasa Indonesia Terlengkap</h1>

      {/* NAVBAR */}
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
            <Link href="/" className="text-white hover:text-cyan-400 transition drop-shadow-[0_0_8px_rgba(34,211,238,0.6)]">Beranda</Link>
            <Link href="/daftar-komik" className="text-zinc-400 hover:text-purple-400 transition">Daftar Komik</Link>
            <Link href="/project" className="text-zinc-400 hover:text-purple-400 transition">Project Kami</Link>
            <Link href="/bookmark" className="text-zinc-400 hover:text-purple-400 transition flex items-center gap-1">
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
            <Link href="/" onClick={() => setIsMobileMenuOpen(false)} className="text-white hover:text-cyan-400 font-medium text-sm border-b border-zinc-800 pb-2">Beranda</Link>
            <Link href="/daftar-komik" onClick={() => setIsMobileMenuOpen(false)} className="text-zinc-400 hover:text-cyan-400 font-medium text-sm border-b border-zinc-800 pb-2">Daftar Komik</Link>
            <Link href="/project" onClick={() => setIsMobileMenuOpen(false)} className="text-zinc-400 hover:text-cyan-400 font-medium text-sm border-b border-zinc-800 pb-2">Project Internal</Link>
            <Link href="/bookmark" onClick={() => setIsMobileMenuOpen(false)} className="text-zinc-400 hover:text-cyan-400 font-medium text-sm flex items-center gap-2">
              <BookMarked className="w-4 h-4" /> Bookmark
            </Link>
          </div>
        )}
      </nav>

      {/* HERO SLIDER */}
      {activeSlide && (
        <header className="relative w-full max-w-[1400px] mx-auto md:my-6 px-0 md:px-4 group">
          <div className="relative w-full h-[320px] sm:h-[380px] md:h-[420px] md:rounded-2xl border-b md:border border-cyan-500/30 bg-[#0c0b0e] overflow-visible md:shadow-[0_0_30px_rgba(147,51,234,0.15)]">
            <div className="absolute inset-0 z-0 overflow-hidden md:rounded-2xl pointer-events-none">
              <img src={activeSlide.background_image} alt={`Background ${activeSlide.title}`} className="w-full h-full object-cover opacity-30 md:opacity-40 scale-105 transition-all duration-700" />
              <div className="absolute inset-0 bg-gradient-to-r from-[#0c0b0e] via-[#0c0b0e]/90 to-[#0c0b0e]/40 md:to-transparent" />
            </div>
            
            <div className="relative z-10 w-full h-full flex items-center px-5 md:px-12 overflow-visible">
              <div className="w-[65%] md:w-[60%] flex flex-col justify-center z-30">
                <div className="flex flex-wrap items-center gap-1.5 md:gap-2 mb-2 md:mb-3">
                  <div className="inline-flex items-center gap-1 bg-[#1e1935] text-yellow-400 border border-yellow-500/40 text-[10px] md:text-xs font-bold px-2 py-0.5 rounded-md uppercase tracking-wider backdrop-blur-md">
                    <Star className="w-2.5 h-2.5 fill-yellow-400" /> {activeSlide.rating}
                  </div>
                  {activeSlide.badges?.map((badge, idx) => (
                    <span 
                      key={idx} 
                      className="text-[9px] md:text-[10px] font-bold text-white px-2 py-0.5 rounded-md shadow-md uppercase tracking-wider"
                      style={{ backgroundColor: badge.color }}
                    >
                      {badge.name}
                    </span>
                  ))}
                </div>
                <h2 className="text-2xl sm:text-3xl md:text-5xl font-extrabold text-white mb-1.5 md:mb-2 leading-tight drop-shadow-[0_4px_10px_rgba(0,0,0,1)] tracking-wide line-clamp-3">
                  {activeSlide.title}
                </h2>
                <p className="text-zinc-300 text-[10px] sm:text-xs md:text-sm line-clamp-3 mb-4 md:mb-6 leading-relaxed drop-shadow-md">
                  {activeSlide.description}
                </p>
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 md:gap-3.5">
                  <Link href={`/read/${activeSlide.manga_id}-1`} className="bg-gradient-to-r from-cyan-600 to-purple-600 hover:from-cyan-500 hover:to-purple-500 text-white px-4 md:px-6 py-2 md:py-3 rounded-xl font-bold text-xs md:text-sm transition-all shadow-[0_4px_20px_rgba(34,211,238,0.4)] flex items-center gap-2 hover:scale-105">
                    <PlayCircle className="w-4 h-4 md:w-5 md:h-5" /> Baca Sekarang
                  </Link>
                  <Link href={`/comic/${activeSlide.manga_id}`} className="bg-[#1e1b24]/90 hover:bg-[#2a2633] text-cyan-400 px-4 md:px-6 py-2 md:py-3 rounded-xl font-bold text-xs md:text-sm transition-all shadow-lg flex items-center gap-2 backdrop-blur-md border border-cyan-500/30">
                    <Info className="w-4 h-4 md:w-5 md:h-5" /> Detail Komik
                  </Link>
                </div>
              </div>

              <div className="absolute right-0 top-0 bottom-0 h-full w-[45%] md:w-[50%] flex items-end justify-end z-20 pointer-events-none">
                <img 
                  src={activeSlide.chara_image} 
                  alt={`Karakter utama ${activeSlide.title}`} 
                  className="absolute right-[-10px] md:right-0 bottom-[-5px] md:bottom-[-10px] top-[-20px] md:top-[-70px] w-auto h-[110%] md:h-[130%] max-w-none object-contain transition-all duration-700 select-none drop-shadow-[0_0_20px_rgba(168,85,247,0.5)]"
                  style={{ WebkitMaskImage: 'linear-gradient(to bottom, rgba(0,0,0,1) 80%, rgba(0,0,0,0) 100%)' }}
                />
              </div>
            </div>
            
            <div className="absolute bottom-3 md:bottom-4 left-5 md:left-12 z-50 flex gap-2">
              {slides.map((slide, index) => (
                <button 
                  key={slide.id} 
                  aria-label={`Slide komik ${index + 1}`}
                  onClick={() => handleDotClick(index)} 
                  className={`h-1.5 md:h-2 rounded-full transition-all duration-300 cursor-pointer ${currentSlide === index ? 'bg-gradient-to-r from-cyan-400 to-purple-500 w-5 md:w-6 shadow-[0_0_8px_rgba(34,211,238,0.8)]' : 'bg-zinc-600 w-1.5 md:w-2 hover:bg-purple-400'}`} 
                />
              ))}
            </div>
          </div>
        </header>
      )}

      {/* SPACE IKLAN (TOP BANNER) */}
      <div className="max-w-[1400px] mx-auto px-4 mt-6 md:mt-0">
        <AdPlaceholder className="w-full h-[90px] max-w-[970px] mx-auto mb-6" text="Banner Iklan (970x90)" />
      </div>

      {/* MAIN CONTAINER */}
      <main className="max-w-[1400px] mx-auto px-4 pb-12">
        <section className="mb-10 relative">
          <div className="flex items-center justify-between border-b border-purple-900/30 pb-2 mb-4">
            <div className="flex items-center gap-2">
              <Flame className="w-5 h-5 text-yellow-500" />
              <h2 className="text-lg font-bold text-white uppercase tracking-wider drop-shadow-[0_0_5px_rgba(234,179,8,0.5)]">Rekomendasi Pilihan</h2>
            </div>
            <div className="flex items-center gap-1.5">
              <button onClick={() => scrollHot('left')} aria-label="Geser ke kiri" className="bg-zinc-800 hover:bg-cyan-600 text-zinc-200 p-2 rounded transition border border-zinc-700 hover:border-cyan-500 cursor-pointer"><ChevronLeft className="w-4 h-4" /></button>
              <button onClick={() => scrollHot('right')} aria-label="Geser ke kanan" className="bg-zinc-800 hover:bg-cyan-600 text-zinc-200 p-2 rounded transition border border-zinc-700 hover:border-cyan-500 cursor-pointer"><ChevronRight className="w-4 h-4" /></button>
            </div>
          </div>
          
          <div ref={hotSliderRef} className="flex gap-4 overflow-x-auto no-scrollbar scroll-smooth pb-4 pt-1 px-1">
            {home?.recommended?.map((comic) => (
              <article key={comic.manga_id} className="group relative rounded-lg overflow-hidden bg-[#16151a] border border-zinc-800 hover:border-cyan-500/50 transition duration-300 w-[140px] sm:w-[160px] md:w-[180px] flex-none shadow-[0_4px_15px_rgba(0,0,0,0.6)] hover:shadow-[0_0_15px_rgba(34,211,238,0.2)] flex flex-col">
                <Link href={`/comic/${comic.manga_id}`} className="aspect-[2/3] w-full relative bg-zinc-900 overflow-hidden block">
                  <img src={comic.cover_portrait || comic.cover} alt={`Cover ${comic.title}`} className="w-full h-full object-cover group-hover:scale-105 transition duration-300" loading="lazy" />
                  <div className="absolute top-2 left-2 flex items-center gap-1 drop-shadow-md">
                    {getFlagSvg(comic.format)}
                  </div>
                  <div className="absolute top-2 right-2 text-[9px] font-bold px-1.5 py-0.5 rounded shadow-md backdrop-blur-sm bg-purple-600/90 text-white border border-purple-400/30">
                    {comic.type}
                  </div>
                  {comic.rating && (
                    <div className="absolute bottom-2 right-2 flex items-center gap-1 bg-black/80 backdrop-blur-sm text-[10px] font-bold px-1.5 py-0.5 rounded text-yellow-400 border border-yellow-500/30">
                      <Star className="w-3 h-3 fill-yellow-400" /> {comic.rating}
                    </div>
                  )}
                </Link>
                <div className="p-2.5 flex flex-col flex-1">
                  <Link href={`/comic/${comic.manga_id}`}>
                    <h3 className="font-semibold text-zinc-100 text-xs sm:text-sm line-clamp-2 group-hover:text-cyan-400 transition drop-shadow-md">
                      {comic.title}
                    </h3>
                  </Link>
                  <div className="flex justify-between items-center text-[10px] sm:text-xs text-zinc-400 mt-auto pt-1.5 font-medium">
                    <span className="text-purple-400 font-bold">Ch. {comic.latest_chapter}</span>
                    <span className="flex items-center gap-1"><Eye className="w-3 h-3 text-cyan-500/70" /> {formatViews(comic.views)}</span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* DUA KOLOM LAYOUT */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="lg:col-span-3">
            <section>
              <div className="flex items-center justify-between border-b border-purple-900/30 pb-2 mb-4">
                <div className="flex items-center gap-2">
                  <Clock className="w-5 h-5 text-cyan-400" />
                  <h2 className="text-lg font-bold text-white uppercase tracking-wider drop-shadow-[0_0_5px_rgba(34,211,238,0.5)]">Update Terbaru</h2>
                </div>
                <Link href="/daftar-komik" className="text-xs font-medium text-cyan-400 hover:text-white bg-cyan-900/20 hover:bg-cyan-600/40 px-3 py-1 rounded transition flex items-center gap-1 border border-cyan-800 hover:border-cyan-400">
                  Lihat Semua <ChevronRight className="w-3 h-3" />
                </Link>
              </div>
              
              {loadingLatest ? (
                <div className="w-full py-20 flex flex-col items-center justify-center bg-[#121115] rounded-xl border border-zinc-800/80 shadow-inner">
                  <Loader2 className="w-10 h-10 text-cyan-500 animate-spin mb-3" />
                  <span className="text-sm font-medium text-zinc-400">Memuat Update Komik...</span>
                </div>
              ) : (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-3 sm:gap-4">
                  {latestComics.map((comic) => (
                    <article key={comic.manga_id} className="bg-[#121115] rounded-md border border-zinc-800/80 overflow-hidden hover:border-purple-500/50 transition group flex flex-col h-full shadow-[0_4px_10px_rgba(0,0,0,0.5)] hover:shadow-[0_0_15px_rgba(168,85,247,0.2)] w-full">
                      <Link href={`/comic/${comic.manga_id}`} className="block relative aspect-[2/3] w-full overflow-hidden bg-zinc-900">
                        <img src={comic.cover_portrait || comic.cover} alt={`Cover komik ${comic.title}`} className="w-full h-full object-cover group-hover:scale-105 transition duration-300" loading="lazy" />
                        <div className="absolute top-1.5 left-1.5 flex items-center gap-1 drop-shadow-md">
                          {getFlagSvg(comic.format)}
                        </div>
                        <div className="absolute top-1.5 right-1.5">
                          <span className="text-[9px] font-bold text-zinc-200 px-1.5 py-0.5 rounded shadow-md backdrop-blur-sm bg-zinc-800/90 border border-zinc-700">
                            {comic.type}
                          </span>
                        </div>
                      </Link>
                      <div className="p-2.5 flex flex-col flex-1">
                        <Link href={`/comic/${comic.manga_id}`}>
                          <h3 className="font-semibold text-zinc-100 text-[13px] line-clamp-2 leading-snug mb-1 group-hover:text-cyan-400 transition" title={comic.title}>
                            {comic.title}
                          </h3>
                        </Link>
                        <div className="flex items-center gap-1 text-[10px] text-zinc-400 mb-2.5">
                          <Eye className="w-3 h-3 text-cyan-600" aria-hidden="true" />
                          <span>{formatViews(comic.views)} pembaca</span>
                        </div>
                        <div className="flex flex-col gap-1 mt-auto">
                          <Link href={`/read/${comic.manga_id}-${comic.latest_chapter}`} className="flex justify-between items-center text-[11px] bg-[#0a0a0c] hover:bg-zinc-800/80 p-1.5 rounded border border-zinc-800 hover:border-cyan-500/50 transition">
                            <div className="flex items-center gap-1.5">
                              <span className="font-medium text-cyan-300">Ch. {comic.latest_chapter}</span>
                              <span className="bg-purple-600 text-white text-[8px] font-bold px-1 py-0.5 rounded animate-pulse shadow-[0_0_8px_rgba(168,85,247,0.6)]">NEW</span>
                            </div>
                            <span className="text-zinc-500 italic text-[9px] truncate">{formatTimeAgo(comic.latest_chapter_time)}</span>
                          </Link>

                          {comic.latest_chapter > 1 && (
                            <Link href={`/read/${comic.manga_id}-${comic.latest_chapter - 1}`} className="flex justify-between items-center text-[11px] bg-[#0a0a0c] hover:bg-zinc-800/80 p-1.5 rounded border border-zinc-800 hover:border-cyan-500/50 transition">
                              <div className="flex items-center gap-1.5">
                                <span className="font-medium text-zinc-400">Ch. {comic.latest_chapter - 1}</span>
                              </div>
                              <span className="text-zinc-600 italic text-[9px]">Chapter Sebelumnya</span>
                            </Link>
                          )}
                        </div>
                      </div>
                    </article>
                  ))}
                </div>
              )}

              {!loadingLatest && latestTotalPages > 1 && (
                <nav className="flex justify-center items-center gap-3 mt-10 mb-6" aria-label="Navigasi Update Terbaru">
                  <button 
                    onClick={() => handlePageChange(latestPage - 1)}
                    disabled={latestPage === 1 || loadingLatest}
                    className="bg-[#121115] hover:bg-zinc-800 disabled:opacity-40 text-cyan-400 border border-zinc-700 px-4 py-2 rounded-lg text-xs font-semibold transition flex items-center gap-1 cursor-pointer shadow-md"
                  >
                    <ChevronLeft className="w-4 h-4" /> Prev
                  </button>
                  <div className="text-xs text-zinc-400 font-medium px-4 py-2 bg-[#0a0a0c] border border-zinc-800 rounded-lg">
                    Halaman <strong className="text-cyan-400">{latestPage}</strong> / {latestTotalPages}
                  </div>
                  <button 
                    onClick={() => handlePageChange(latestPage + 1)}
                    disabled={latestPage === latestTotalPages || loadingLatest}
                    className="bg-[#121115] hover:bg-zinc-800 disabled:opacity-40 text-cyan-400 border border-zinc-700 px-4 py-2 rounded-lg text-xs font-semibold transition flex items-center gap-1 cursor-pointer shadow-md"
                  >
                    Next <ChevronRight className="w-4 h-4" />
                  </button>
                </nav>
              )}
            </section>

            <div className="mt-4 pt-4 border-t border-purple-900/30">
              <ComicSliderSection title="Project Internal Kami" icon={FolderOpen} comics={projectComics} accentColor="cyan" />
              <ComicSliderSection title="Manga & Manhwa Populer" icon={Globe2} comics={mirrorComics} accentColor="purple" />
              <ComicSliderSection title="Koleksi Manhwa" icon={MapIcon} comics={manhwaComics} accentColor="cyan" />
              <ComicSliderSection title="Koleksi Manhua" icon={MapPin} comics={manhuaComics} accentColor="purple" />
              <ComicSliderSection title="Koleksi Manga" icon={Compass} comics={mangaComics} accentColor="cyan" />
            </div>
          </div>

          <aside className="lg:col-span-1 flex flex-col gap-6">
            <AdPlaceholder className="w-full h-[250px] shadow-md" text="Rectangle Ads (300x250)" />

            <section className="bg-[#121115] rounded-xl border border-zinc-800 p-4 shadow-[0_4px_15px_rgba(0,0,0,0.5)] hover:border-purple-900/50 transition">
              <div className="border-b border-purple-900/30 pb-2 mb-4">
                <h2 className="text-[15px] font-bold text-white uppercase tracking-wider flex items-center gap-2 drop-shadow-[0_0_5px_rgba(168,85,247,0.5)]">
                  <Star className="w-4 h-4 text-purple-500 fill-purple-500" /> Trending Minggu Ini
                </h2>
              </div>
              <div className="flex flex-col gap-3">
                {home?.popular?.slice(0, 7).map((comic, index) => (
                  <Link href={`/comic/${comic.manga_id}`} key={comic.manga_id} className="flex gap-3 group items-center bg-[#0a0a0c] p-2 rounded-lg border border-transparent hover:border-cyan-500/30 transition">
                    <div className="text-xl font-bold text-zinc-700 italic w-5 text-center group-hover:text-cyan-400 transition drop-shadow-[0_0_5px_rgba(34,211,238,0.3)]">
                      {index + 1}
                    </div>
                    <div className="w-12 h-16 shrink-0 rounded overflow-hidden relative shadow-md bg-zinc-900 border border-zinc-800">
                      <img src={comic.cover_portrait || comic.cover} alt={comic.title} className="w-full h-full object-cover group-hover:scale-110 transition duration-300" loading="lazy" />
                    </div>
                    <div className="flex flex-col justify-center flex-1 min-w-0">
                      <h3 className="text-[13px] font-semibold text-zinc-200 line-clamp-2 group-hover:text-purple-400 transition leading-tight">
                        {comic.title}
                      </h3>
                      <p className="text-[10px] text-zinc-500 mt-0.5 truncate">
                        {comic.genres?.map(g => g.name).slice(0, 2).join(', ')}
                      </p>
                      <div className="flex items-center justify-between mt-1 text-[10px]">
                        <span className="flex items-center gap-1 font-bold text-yellow-400">
                          <Star className="w-2.5 h-2.5 fill-yellow-400" /> {comic.rating || '-'}
                        </span>
                        <span className="flex items-center gap-1 text-cyan-600 font-medium">
                          <Eye className="w-2.5 h-2.5" /> {formatViews(comic.views)}
                        </span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </section>

            <section className="bg-[#121115] rounded-xl border border-zinc-800 p-4 shadow-[0_4px_15px_rgba(0,0,0,0.5)]">
              <div className="border-b border-purple-900/30 pb-2 mb-4">
                <h2 className="text-[15px] font-bold text-white uppercase tracking-wider">Daftar Genre</h2>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {genresList.map((genre) => (
                  <Link 
                    href={`/genre/${genre.toLowerCase()}`} 
                    key={genre} 
                    className="text-[11px] font-medium bg-[#0a0a0c] border border-zinc-800/80 text-zinc-400 hover:text-cyan-300 hover:border-cyan-500 hover:bg-cyan-500/10 px-2.5 py-1 rounded-md transition-all duration-200 shadow-sm"
                  >
                    {genre}
                  </Link>
                ))}
              </div>
            </section>
            
            <section className="bg-[#121115] rounded-xl border border-zinc-800 p-4 shadow-[0_4px_15px_rgba(0,0,0,0.5)]">
              <div className="border-b border-purple-900/30 pb-2 mb-4">
                <h2 className="text-[15px] font-bold text-white uppercase tracking-wider flex items-center gap-2">
                  <MessageSquare className="w-4 h-4 text-cyan-400" /> Komentar Terbaru
                </h2>
              </div>
              <div className="flex flex-col gap-4">
                {topComments.map(comment => (
                  <div key={comment.id} className="flex gap-3 border-b border-zinc-800/50 pb-3 last:border-0 last:pb-0">
                    <img src={comment.avatar} alt={`Avatar user ${comment.username}`} className="w-8 h-8 rounded-full object-cover border border-purple-500/50 shadow-[0_0_8px_rgba(168,85,247,0.3)]" loading="lazy" />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-cyan-400 truncate">{comment.username}</span>
                        <span className="text-[9px] text-zinc-500 shrink-0">{comment.timeAgo}</span>
                      </div>
                      <Link href={`/comic/${comment.comicId}`} className="text-[10px] text-purple-400 hover:text-purple-300 hover:underline mb-1 inline-block truncate w-full">
                          {comment.comicTitle}
                      </Link>
                      <p className="text-xs text-zinc-300 line-clamp-3 leading-relaxed mt-0.5">
                        "{comment.text}"
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </aside>
        </div>
      </main>

      <div className="max-w-[1400px] mx-auto px-4 mt-4 mb-8">
        <AdPlaceholder className="w-full h-[90px] max-w-[970px] mx-auto" text="Banner Iklan Bawah (970x90)" />
      </div>

      <footer className="bg-[#0a0a0c] border-t border-purple-900/40 py-8 text-center text-zinc-500 shadow-[0_-4px_20px_rgba(0,0,0,0.5)]">
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
    </div>
  );
}