// apps/web/src/app/page.tsx
'use client';

import { useState, useEffect, useRef } from 'react';
import { Search, Flame, Clock, Star, Eye, ChevronRight, ChevronLeft, Menu, BookMarked, User, PlayCircle, Info, MessageSquare, Heart, Trophy, ShieldCheck, Globe } from 'lucide-react';
import Link from 'next/link';

import { topComments, communityLeaders, genresList, initialHeroSlides } from "../data/dummy";
import { useHome } from "@/hooks/useHome";

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
      <svg className="w-4 h-3 rounded shadow-sm overflow-hidden bg-white shrink-0" viewBox="0 0 900 600">
        <rect width="900" height="600" fill="#fff"/>
        <circle cx="450" cy="300" r="180" fill="#bc002d"/>
      </svg>
    );
  }
  if (format === 'Manhwa') {
    return (
      <svg className="w-4 h-3 rounded shadow-sm overflow-hidden bg-white shrink-0" viewBox="0 0 900 600">
        <rect width="900" height="600" fill="#fff"/>
        <circle cx="450" cy="300" r="160" fill="#cd2e3a"/>
        <path d="M 450 140 A 160 160 0 0 1 450 460 A 80 80 0 0 0 450 300 A 80 80 0 1 1 450 140 Z" fill="#0047a0"/>
      </svg>
    );
  }
  return (
    <svg className="w-4 h-3 rounded shadow-sm overflow-hidden bg-[#ee1c25]" viewBox="0 0 900 600">
      <rect width="900" height="600" fill="#ee1c25"/>
      <path d="M150,150 L165,190 L205,190 L172,215 L185,255 L150,230 L115,255 L128,215 L95,190 L135,190 Z" fill="#ffde00"/>
    </svg>
  );
};

export default function HomePage() {
  const { home, loading, error } = useHome();

  const [heroSlides] = useState(initialHeroSlides);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const slideIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const hotSliderRef = useRef<HTMLDivElement>(null);

  const startAutoSlide = () => {
    if (slideIntervalRef.current) clearInterval(slideIntervalRef.current);
    slideIntervalRef.current = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 6000);
  };

  useEffect(() => {
    startAutoSlide();
    return () => {
      if (slideIntervalRef.current) clearInterval(slideIntervalRef.current);
    };
  }, [heroSlides.length]);

  const handleDotClick = (index: number) => {
    setCurrentSlide(index);
    startAutoSlide();
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    startAutoSlide();
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);
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

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-[#0f0f11] text-purple-400 font-medium">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-4 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
          <p className="animate-pulse">Memuat Stynxveil...</p>
        </div>
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

  const activeSlide = heroSlides[currentSlide] || heroSlides[0];

  return (
    <div className="min-h-screen bg-[#0f0f11] text-zinc-300 font-sans selection:bg-purple-500 selection:text-white">
      
      {/* NAVBAR */}
      <nav className="sticky top-0 z-50 bg-[#16151a]/95 backdrop-blur-sm border-b border-zinc-800 shadow-md">
        <div className="max-w-[1400px] mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button className="lg:hidden text-zinc-400 hover:text-white"><Menu className="w-6 h-6" /></button>
            <Link href="/" className="text-2xl font-extrabold tracking-tighter text-white">
              STYNX<span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">VEIL</span>
            </Link>
          </div>

          <div className="hidden lg:flex items-center gap-6 font-medium text-sm">
            <Link href="/" className="text-white hover:text-purple-400 transition">Beranda</Link>
            <Link href="/daftar-komik" className="text-zinc-400 hover:text-purple-400 transition">Daftar Komik</Link>
            <Link href="/project" className="text-zinc-400 hover:text-purple-400 transition">Project Kami</Link>
            <Link href="/bookmark" className="text-zinc-400 hover:text-purple-400 transition flex items-center gap-1">
              <BookMarked className="w-4 h-4" /> Bookmark
            </Link>
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden md:flex items-center bg-[#0f0f11] rounded-md px-3 py-1.5 border border-zinc-800 focus-within:border-purple-500 transition w-64">
              <input 
                type="text" 
                placeholder="Cari komik..." 
                className="bg-transparent border-none outline-none text-sm w-full text-zinc-200"
              />
              <Search className="w-4 h-4 text-zinc-500" />
            </div>

            <button 
              onClick={() => setIsLoggedIn(!isLoggedIn)}
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white px-4 py-1.5 rounded-md text-xs font-semibold transition flex items-center gap-2 cursor-pointer shadow-[0_0_15px_rgba(147,51,234,0.3)]"
            >
              <User className="w-4 h-4" /> 
              <span>{isLoggedIn ? 'Profil Saya' : 'Masuk / Daftar'}</span>
            </button>
          </div>
        </div>
      </nav>

      {/* HERO SLIDER (DUMMY) */}
      <div className="relative w-full max-w-[1400px] mx-auto my-6 px-4 group">
        <div className="relative w-full h-[380px] md:h-[420px] rounded-2xl border border-purple-500/20 bg-[#0c0b0e] overflow-visible shadow-lg">
          
          <button onClick={prevSlide} className="absolute left-3 top-1/2 -translate-y-1/2 z-50 bg-black/60 hover:bg-black/90 text-white p-2 rounded-full backdrop-blur-md border border-zinc-700/50 transition opacity-0 group-hover:opacity-100 cursor-pointer">
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button onClick={nextSlide} className="absolute right-3 top-1/2 -translate-y-1/2 z-50 bg-black/60 hover:bg-black/90 text-white p-2 rounded-full backdrop-blur-md border border-zinc-700/50 transition opacity-0 group-hover:opacity-100 cursor-pointer">
            <ChevronRight className="w-5 h-5" />
          </button>

          <div className="absolute inset-0 z-0 overflow-hidden rounded-2xl pointer-events-none">
            <img src={activeSlide?.background_image} alt={activeSlide?.title} className="w-full h-full object-cover opacity-40 scale-105 transition-all duration-700" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#0c0b0e] via-[#0c0b0e]/90 to-transparent" />
          </div>

          <div className="relative z-10 w-full h-full grid grid-cols-1 md:grid-cols-12 items-center px-6 md:px-12 overflow-visible">
            <div className="md:col-span-7 flex flex-col justify-center z-20 pr-0 md:pr-4">
              <div className="flex flex-wrap items-center gap-2 mb-3">
                <div className="inline-flex items-center gap-1 bg-[#1e1935] text-[#c084fc] border border-[#a855f7]/40 text-xs font-bold px-2.5 py-0.5 rounded-md uppercase tracking-wider backdrop-blur-md">
                  <Star className="w-3 h-3 fill-[#c084fc]" /> {activeSlide?.rating}
                </div>
                {activeSlide?.badges?.map((badge: any, idx: number) => (
                  <span key={idx} className="text-[10px] font-bold text-white px-2.5 py-0.5 rounded-md shadow-md uppercase tracking-wider" style={{ backgroundColor: badge.color }}>
                    {badge.name}
                  </span>
                ))}
              </div>

              <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white mb-2 leading-tight drop-shadow-[0_4px_10px_rgba(0,0,0,0.8)] tracking-wide">
                {activeSlide?.title}
              </h1>

              <p className="text-zinc-300 text-xs md:text-sm line-clamp-2 md:line-clamp-3 mb-6 leading-relaxed max-w-xl drop-shadow">
                {activeSlide?.description}
              </p>
              
              <div className="flex items-center gap-3.5">
                <Link href={`/read/${activeSlide?.manga_id}-1`} className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white px-6 py-3 rounded-xl font-bold text-sm transition-all shadow-[0_4px_20px_rgba(147,51,234,0.4)] flex items-center gap-2 hover:scale-105">
                  <PlayCircle className="w-5 h-5" /> Baca Sekarang
                </Link>
                <Link href={`/comic/${activeSlide?.manga_id}`} className="bg-[#1e1b24]/90 hover:bg-[#2a2633] text-white px-6 py-3 rounded-xl font-bold text-sm transition-all shadow-lg flex items-center gap-2 backdrop-blur-md border border-purple-500/30">
                  <Info className="w-5 h-5 text-zinc-400" /> Detail
                </Link>
              </div>
            </div>

            <div className="md:col-span-5 absolute right-4 md:right-10 top-0 bottom-0 h-full flex items-end justify-end z-40 overflow-visible pointer-events-none">
              <div className="relative w-[340px] md:w-[460px] h-full flex items-end justify-end overflow-visible">
                <img 
                  src={activeSlide?.chara_image} 
                  alt={activeSlide?.title} 
                  className="absolute right-0 bottom-[-10px] top-[-50px] md:top-[-70px] w-auto h-[130%] max-w-none object-contain transition-all duration-700 select-none"
                  style={{
                    maskImage: 'linear-gradient(to bottom, rgba(0,0,0,1) 75%, rgba(0,0,0,0) 100%)',
                    WebkitMaskImage: 'linear-gradient(to bottom, rgba(0,0,0,1) 75%, rgba(0,0,0,0) 100%)'
                  }}
                />
              </div>
            </div>
          </div>

          <div className="absolute bottom-4 left-6 z-50 flex gap-2">
            {heroSlides.map((slide, index) => (
              <button 
                key={slide.id} 
                onClick={() => handleDotClick(index)} 
                className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${currentSlide === index ? 'bg-gradient-to-r from-blue-400 to-purple-500 w-6' : 'bg-zinc-600 w-2 hover:bg-purple-400'}`} 
              />
            ))}
          </div>
        </div>
      </div>

      {/* MAIN CONTAINER */}
      <main className="max-w-[1400px] mx-auto px-4 pb-12">
        
        {/* HOT BULAN INI (Tepat 10 Komik Terbaik) */}
        <section className="mb-10 relative">
          <div className="flex items-center justify-between border-b border-purple-900/30 pb-2 mb-4">
            <div className="flex items-center gap-2">
              <Flame className="w-5 h-5 text-red-500" />
              <h2 className="text-lg font-bold text-white uppercase tracking-wider">Hot Bulan Ini</h2>
            </div>
            <div className="flex items-center gap-1.5">
              <button onClick={() => scrollHot('left')} className="bg-zinc-800 hover:bg-purple-600 text-zinc-200 p-2 rounded transition border border-zinc-700 hover:border-purple-500 cursor-pointer"><ChevronLeft className="w-4 h-4" /></button>
              <button onClick={() => scrollHot('right')} className="bg-zinc-800 hover:bg-purple-600 text-zinc-200 p-2 rounded transition border border-zinc-700 hover:border-purple-500 cursor-pointer"><ChevronRight className="w-4 h-4" /></button>
            </div>
          </div>
          
          <div ref={hotSliderRef} className="flex gap-4 overflow-x-auto no-scrollbar scroll-smooth pb-4 pt-1 px-1">
            {home?.recommended && home.recommended.length > 0 ? (
              home.recommended.slice(0, 10).map((comic) => (
                <Link href={`/comic/${comic.manga_id}`} key={comic.manga_id} className="group relative rounded-lg overflow-hidden bg-[#16151a] border border-zinc-800 hover:border-purple-500/50 transition duration-300 w-[140px] sm:w-[160px] md:w-[180px] flex-none shadow-lg flex flex-col">
                  <div className="aspect-[2/3] w-full relative bg-zinc-900 overflow-hidden">
                    <img src={comic.cover_portrait || comic.cover} alt={comic.title} className="w-full h-full object-cover group-hover:scale-105 transition duration-300" />
                    <div className="absolute top-2 left-2 flex items-center gap-1 drop-shadow-md">
                      {getFlagSvg(comic.format)}
                    </div>
                    <div className="absolute top-2 right-2 text-[9px] font-bold px-1.5 py-0.5 rounded shadow-md backdrop-blur-sm bg-zinc-600/90 text-white">
                      {comic.type}
                    </div>
                    {comic.rating && (
                      <div className="absolute bottom-2 right-2 flex items-center gap-1 bg-black/80 backdrop-blur-sm text-[10px] sm:text-xs font-bold px-1.5 sm:px-2 py-0.5 rounded text-white border border-zinc-700/50">
                        <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" /> {comic.rating}
                      </div>
                    )}
                  </div>
                  <div className="p-2.5 flex flex-col flex-1">
                    <h3 className="font-semibold text-white text-xs sm:text-sm line-clamp-2 sm:line-clamp-1 group-hover:text-purple-400 transition drop-shadow-md leading-tight sm:leading-normal">
                      {comic.title}
                    </h3>
                    <div className="flex justify-between items-center text-[10px] sm:text-xs text-zinc-400 mt-auto pt-1.5 font-medium">
                      <span className="text-purple-400 font-bold">Ch. {comic.latest_chapter}</span>
                      <span className="flex items-center gap-1"><Eye className="w-3 h-3 sm:w-3.5 sm:h-3.5" /> {formatViews(comic.views)}</span>
                    </div>
                  </div>
                </Link>
              ))
            ) : (
              <div className="w-full py-8 flex flex-col items-center justify-center border border-dashed border-zinc-800 rounded-lg text-zinc-500">
                <Flame className="w-6 h-6 text-zinc-700 mb-2" />
                <p className="text-xs">Belum ada komik terpanas bulan ini.</p>
              </div>
            )}
          </div>
        </section>

        {/* DUA KOLOM LAYOUT */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          
          {/* KOLOM KIRI (Update Terbaru, Project, & Mirror) */}
          <div className="lg:col-span-3 space-y-12">
            
            {/* 1. UPDATE TERBARU (Menampilkan 2 Tombol Chapter) */}
            <section>
              <div className="flex items-center justify-between border-b border-purple-900/30 pb-2 mb-4">
                <div className="flex items-center gap-2">
                  <Clock className="w-5 h-5 text-purple-400" />
                  <h2 className="text-lg font-bold text-white uppercase tracking-wider">Update Terbaru</h2>
                </div>
                <Link href="/daftar-komik" className="text-xs font-medium text-zinc-400 hover:text-white bg-zinc-800/50 hover:bg-zinc-800 px-3 py-1 rounded transition flex items-center gap-1 hover:border-purple-500 border border-transparent">
                  Lihat Semua <ChevronRight className="w-3 h-3" />
                </Link>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-3 sm:gap-4">
                {home?.latest && home.latest.length > 0 ? (
                  home.latest.map((comic) => (
                    <div key={comic.manga_id} className="bg-[#16151a] rounded-md border border-zinc-800/80 overflow-hidden hover:border-purple-500/50 transition group flex flex-col h-full shadow-md w-full">
                      <Link href={`/comic/${comic.manga_id}`} className="block relative aspect-[2/3] w-full overflow-hidden bg-zinc-900">
                        <img src={comic.cover_portrait || comic.cover} alt={comic.title} className="w-full h-full object-cover group-hover:scale-105 transition duration-300" />
                        <div className="absolute top-1.5 left-1.5 flex items-center gap-1 drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)]">
                          {getFlagSvg(comic.format)}
                        </div>
                        <div className="absolute top-1.5 right-1.5">
                          <span className="text-[9px] font-bold text-white px-1.5 py-0.5 rounded shadow-md backdrop-blur-sm bg-zinc-600/90">
                            {comic.type}
                          </span>
                        </div>
                        {comic.rating && (
                          <div className="absolute bottom-1.5 right-1.5 flex items-center gap-1 bg-black/80 text-[10px] font-bold px-1.5 py-0.5 rounded text-white backdrop-blur-sm border border-zinc-700/50">
                            <Star className="w-2.5 h-2.5 text-yellow-400 fill-yellow-400" /> {comic.rating}
                          </div>
                        )}
                      </Link>
                      
                      <div className="p-2.5 flex flex-col flex-1">
                        <Link href={`/comic/${comic.manga_id}`}>
                          <h3 className="font-semibold text-white text-[13px] line-clamp-2 leading-snug mb-1 group-hover:text-purple-400 transition" title={comic.title}>
                            {comic.title}
                          </h3>
                        </Link>
                        <div className="flex items-center gap-1 text-[10px] text-zinc-400 mb-2.5">
                          <Eye className="w-3 h-3 text-zinc-500" />
                          <span>{formatViews(comic.views)} pembaca</span>
                        </div>
                        
                        {/* 2 Tombol Chapter (Terbaru & Sebelumnya) */}
                        <div className="flex flex-col gap-1 mt-auto">
                          <Link href={`/read/${comic.latest_chapter_id}`} className="flex justify-between items-center text-[11px] bg-[#0f0f11] hover:bg-zinc-800 p-1.5 rounded border border-zinc-800 hover:border-purple-500/50 transition">
                            <div className="flex items-center gap-1.5">
                              <span className="font-medium text-zinc-200">Ch. {comic.latest_chapter}</span>
                              <span className="bg-purple-600 text-white text-[8px] font-bold px-1 py-0.5 rounded animate-pulse">NEW</span>
                            </div>
                            <span className="text-zinc-500 italic text-[9px] truncate max-w-[50px]">{formatTimeAgo(comic.latest_chapter_time)}</span>
                          </Link>

                          {comic.latest_chapter > 1 && (
                            <Link href={`/read/${comic.manga_id}-${comic.latest_chapter - 1}`} className="flex justify-between items-center text-[11px] bg-[#0f0f11] hover:bg-zinc-800 p-1.5 rounded border border-zinc-800 hover:border-purple-500/50 transition">
                              <span className="font-medium text-zinc-400">Ch. {comic.latest_chapter - 1}</span>
                              <span className="text-zinc-600 italic text-[9px]">Sebelumnya</span>
                            </Link>
                          )}
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="col-span-full py-16 flex flex-col items-center justify-center text-center bg-[#16151a] rounded-xl border border-dashed border-zinc-800">
                    <Clock className="w-10 h-10 text-zinc-600 mb-3" />
                    <h3 className="text-zinc-400 font-semibold text-sm">Belum ada Update Terbaru</h3>
                  </div>
                )}
              </div>
            </section>

            {/* 2. KOMIK PROJECT STYNXVEIL */}
            <section>
              <div className="flex items-center justify-between border-b border-purple-900/30 pb-2 mb-4">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5 text-cyan-400" />
                  <h2 className="text-lg font-bold text-white uppercase tracking-wider">Komik Project Stynxveil</h2>
                </div>
                <Link href="/project" className="text-xs font-medium text-cyan-400 hover:text-white bg-cyan-950/40 hover:bg-cyan-900/60 px-3 py-1 rounded transition border border-cyan-800/50">
                  Lihat Semua <ChevronRight className="w-3 h-3 inline" />
                </Link>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-3 sm:gap-4">
                {home?.projectComics && home.projectComics.length > 0 ? (
                  home.projectComics.map((comic) => (
                    <div key={`proj-${comic.manga_id}`} className="bg-[#16151a] rounded-md border border-cyan-900/40 overflow-hidden hover:border-cyan-400/60 transition group flex flex-col h-full shadow-md w-full">
                      <Link href={`/comic/${comic.manga_id}`} className="block relative aspect-[2/3] w-full overflow-hidden bg-zinc-900">
                        <img src={comic.cover_portrait || comic.cover} alt={comic.title} className="w-full h-full object-cover group-hover:scale-105 transition duration-300" />
                        <div className="absolute top-1.5 left-1.5">{getFlagSvg(comic.format)}</div>
                        <div className="absolute top-1.5 right-1.5">
                          <span className="text-[9px] font-bold text-black bg-cyan-400 px-1.5 py-0.5 rounded shadow-md uppercase">Project</span>
                        </div>
                        {comic.rating && (
                          <div className="absolute bottom-1.5 right-1.5 flex items-center gap-1 bg-black/80 text-[10px] font-bold px-1.5 py-0.5 rounded text-white border border-zinc-700/50">
                            <Star className="w-2.5 h-2.5 text-yellow-400 fill-yellow-400" /> {comic.rating}
                          </div>
                        )}
                      </Link>
                      <div className="p-2.5 flex flex-col flex-1">
                        <Link href={`/comic/${comic.manga_id}`}>
                          <h3 className="font-semibold text-white text-[13px] line-clamp-2 leading-snug mb-1 group-hover:text-cyan-400 transition" title={comic.title}>
                            {comic.title}
                          </h3>
                        </Link>
                        <div className="flex flex-col gap-1 mt-auto pt-2">
                          <Link href={`/read/${comic.latest_chapter_id}`} className="flex justify-between items-center text-[11px] bg-[#0f0f11] hover:bg-zinc-800 p-1.5 rounded border border-cyan-900/30 hover:border-cyan-500 transition">
                            <span className="font-medium text-cyan-300">Ch. {comic.latest_chapter}</span>
                            <span className="text-zinc-500 italic text-[9px]">{formatTimeAgo(comic.latest_chapter_time)}</span>
                          </Link>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="col-span-full py-10 text-center text-zinc-500 border border-dashed border-zinc-800 rounded-lg text-xs">
                    Tidak ada komik project saat ini (Menunggu unggahan original Anda).
                  </div>
                )}
              </div>
            </section>

            {/* 3. KOMIK MIRROR SHINIGAMI */}
            <section>
              <div className="flex items-center justify-between border-b border-purple-900/30 pb-2 mb-4">
                <div className="flex items-center gap-2">
                  <Globe className="w-5 h-5 text-purple-400" />
                  <h2 className="text-lg font-bold text-white uppercase tracking-wider">Komik Mirror Shinigami</h2>
                </div>
                <Link href="/daftar-komik?type=mirror" className="text-xs font-medium text-purple-400 hover:text-white bg-purple-950/40 hover:bg-purple-900/60 px-3 py-1 rounded transition border border-purple-800/50">
                  Lihat Semua <ChevronRight className="w-3 h-3 inline" />
                </Link>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-3 sm:gap-4">
                {home?.mirrorComics && home.mirrorComics.length > 0 ? (
                  home.mirrorComics.map((comic) => (
                    <div key={`mirror-${comic.manga_id}`} className="bg-[#16151a] rounded-md border border-purple-900/40 overflow-hidden hover:border-purple-400/60 transition group flex flex-col h-full shadow-md w-full">
                      <Link href={`/comic/${comic.manga_id}`} className="block relative aspect-[2/3] w-full overflow-hidden bg-zinc-900">
                        <img src={comic.cover_portrait || comic.cover} alt={comic.title} className="w-full h-full object-cover group-hover:scale-105 transition duration-300" />
                        <div className="absolute top-1.5 left-1.5">{getFlagSvg(comic.format)}</div>
                        <div className="absolute top-1.5 right-1.5">
                          <span className="text-[9px] font-bold text-white bg-purple-600 px-1.5 py-0.5 rounded shadow-md uppercase">Mirror</span>
                        </div>
                        {comic.rating && (
                          <div className="absolute bottom-1.5 right-1.5 flex items-center gap-1 bg-black/80 text-[10px] font-bold px-1.5 py-0.5 rounded text-white border border-zinc-700/50">
                            <Star className="w-2.5 h-2.5 text-yellow-400 fill-yellow-400" /> {comic.rating}
                          </div>
                        )}
                      </Link>
                      <div className="p-2.5 flex flex-col flex-1">
                        <Link href={`/comic/${comic.manga_id}`}>
                          <h3 className="font-semibold text-white text-[13px] line-clamp-2 leading-snug mb-1 group-hover:text-purple-400 transition" title={comic.title}>
                            {comic.title}
                          </h3>
                        </Link>
                        <div className="flex flex-col gap-1 mt-auto pt-2">
                          <Link href={`/read/${comic.latest_chapter_id}`} className="flex justify-between items-center text-[11px] bg-[#0f0f11] hover:bg-zinc-800 p-1.5 rounded border border-purple-900/30 hover:border-purple-500 transition">
                            <span className="font-medium text-purple-300">Ch. {comic.latest_chapter}</span>
                            <span className="text-zinc-500 italic text-[9px]">{formatTimeAgo(comic.latest_chapter_time)}</span>
                          </Link>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="col-span-full py-10 text-center text-zinc-500 border border-dashed border-zinc-800 rounded-lg text-xs">
                    Tidak ada komik mirror saat ini.
                  </div>
                )}
              </div>
            </section>

          </div>

          {/* KOLOM KANAN (Sidebar) */}
          <aside className="lg:col-span-1 flex flex-col gap-6">
            
            {/* Widget Populer */}
            <div className="bg-[#16151a] rounded-xl border border-zinc-800 p-4">
              <div className="border-b border-purple-900/30 pb-2 mb-4">
                <h2 className="text-[15px] font-bold text-white uppercase tracking-wider flex items-center gap-2">
                  <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" /> Populer Minggu Ini
                </h2>
              </div>
              <div className="flex flex-col gap-3">
                {home?.popular && home.popular.length > 0 ? (
                  home.popular.slice(0, 7).map((comic, index) => (
                    <Link href={`/comic/${comic.manga_id}`} key={comic.manga_id} className="flex gap-3 group items-center">
                      <div className="text-xl font-bold text-zinc-700 italic w-5 text-center group-hover:text-purple-500 transition">
                        {index + 1}
                      </div>
                      <div className="w-12 h-16 shrink-0 rounded overflow-hidden relative shadow-md bg-zinc-900">
                        <img src={comic.cover_portrait || comic.cover} alt={comic.title} className="w-full h-full object-cover group-hover:scale-110 transition duration-300" />
                      </div>
                      <div className="flex flex-col justify-center flex-1 min-w-0">
                        <h3 className="text-[13px] font-semibold text-zinc-200 line-clamp-2 group-hover:text-purple-400 transition leading-tight">
                          {comic.title}
                        </h3>
                        <p className="text-[10px] text-zinc-500 mt-0.5 truncate">
                          {comic.genres?.map(g => g.name).slice(0, 2).join(', ')}
                        </p>
                        <div className="flex items-center justify-between mt-1 text-[10px]">
                          <span className="flex items-center gap-1 font-bold text-white">
                            <Star className="w-2.5 h-2.5 text-yellow-400 fill-yellow-400" /> {comic.rating || '-'}
                          </span>
                          <span className="flex items-center gap-1 text-zinc-400">
                            <Eye className="w-2.5 h-2.5 text-zinc-500" /> {formatViews(comic.views)}
                          </span>
                        </div>
                      </div>
                    </Link>
                  ))
                ) : (
                  <div className="py-6 text-center text-zinc-500 text-[11px]">Data populer kosong.</div>
                )}
              </div>
            </div>

            {/* Widget Genre */}
            <div className="bg-[#16151a] rounded-xl border border-zinc-800 p-4">
              <div className="border-b border-purple-900/30 pb-2 mb-4">
                <h2 className="text-[15px] font-bold text-white uppercase tracking-wider">Kategori Genre</h2>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {genresList.map((genre) => (
                  <Link href={`/genre/${genre.toLowerCase()}`} key={genre} className="text-[11px] font-medium bg-[#0f0f11] border border-zinc-800/80 text-zinc-400 hover:text-white hover:border-purple-500 hover:bg-purple-500/20 px-2.5 py-1 rounded-md transition-all duration-200">
                    {genre}
                  </Link>
                ))}
              </div>
            </div>

            {/* Widget Komentar */}
            <div className="bg-[#16151a] rounded-xl border border-zinc-800 p-4">
              <div className="border-b border-purple-900/30 pb-2 mb-4">
                <h2 className="text-[15px] font-bold text-white uppercase tracking-wider flex items-center gap-2">
                  <MessageSquare className="w-4 h-4 text-cyan-400" /> Komentar Komunitas
                </h2>
              </div>
              <div className="flex flex-col gap-4">
                {topComments.map(comment => (
                  <div key={comment.id} className="flex gap-3 border-b border-zinc-800/50 pb-3 last:border-0 last:pb-0">
                    <img src={comment.avatar} alt={comment.username} className="w-8 h-8 rounded-full object-cover border border-purple-500/50" />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-blue-400 truncate">{comment.username}</span>
                        <span className="text-[9px] text-zinc-500 shrink-0">{comment.timeAgo}</span>
                      </div>
                      <Link href={`/comic/${comment.comicId}`} className="text-[10px] text-purple-400 hover:text-purple-300 hover:underline mb-1 inline-block truncate w-full">
                        📖 {comment.comicTitle}
                      </Link>
                      <p className="text-xs text-zinc-300 line-clamp-3 leading-relaxed mt-0.5">
                        "{comment.text}"
                      </p>
                      <div className="flex items-center gap-1 mt-2 text-[10px] text-zinc-400">
                        <Heart className="w-3.5 h-3.5 text-red-500 fill-red-500/20" /> 
                        <span className="font-semibold text-zinc-300">{comment.likes.toLocaleString('id-ID')}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Widget Leaderboard */}
            <div className="bg-[#16151a] rounded-xl border border-zinc-800 p-4 sticky top-20 shadow-[0_0_20px_rgba(0,0,0,0.5)]">
              <div className="border-b border-purple-900/30 pb-2 mb-4">
                <h2 className="text-[15px] font-bold text-white uppercase tracking-wider flex items-center gap-2">
                  <Trophy className="w-4 h-4 text-yellow-500" /> Peringkat Komunitas
                </h2>
              </div>
              <div className="flex flex-col gap-3">
                {communityLeaders.map((leader) => (
                  <div key={leader.id} className="flex items-center gap-3 bg-[#0f0f11] border border-zinc-800/80 p-2.5 rounded-lg relative overflow-hidden">
                    <div className={`absolute top-0 left-0 w-1 h-full ${leader.bg}`}></div>
                    <div className="relative">
                      <img src={leader.avatar} alt={leader.name} className="w-10 h-10 rounded-lg object-cover border border-zinc-700" />
                      <div className={`absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full ${leader.bg} flex items-center justify-center border border-[#16151a]`}>
                        <Star className={`w-3 h-3 ${leader.color} fill-current`} />
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-[10px] text-zinc-400 font-semibold mb-0.5 uppercase tracking-wide">{leader.category}</p>
                      <h4 className="text-xs font-bold text-zinc-200 truncate">{leader.name}</h4>
                      <p className={`text-[11px] font-bold ${leader.color} mt-0.5`}>{leader.value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </aside>
        </div>
      </main>

      {/* FOOTER */}
      <footer className="bg-[#16151a] border-t border-zinc-800 mt-12 py-8 text-center text-zinc-500">
        <div className="max-w-[1400px] mx-auto px-4 flex flex-col items-center gap-4">
          <Link href="/" className="text-2xl font-extrabold tracking-tighter text-white opacity-90 hover:opacity-100 transition">
            STYNX<span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">VEIL</span>
          </Link>
          <p className="max-w-2xl text-[13px] leading-relaxed">
            Stynxveil adalah website baca komik online gratis berbahasa Indonesia. Semua komik di website ini hanya preview dari komik aslinya.
          </p>
          <p className="mt-2 text-[11px]">© {new Date().getFullYear()} Stynxveil. All Rights Reserved.</p>
        </div>
      </footer>
    </div>
  );
}