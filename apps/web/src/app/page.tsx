'use client';

import { useState, useRef } from 'react';
import Link from 'next/link';
import { 
  Flame, Clock, Eye, ChevronRight, ChevronLeft, 
  FolderOpen, Globe2, Map as MapIcon, MapPin, Compass, Loader2
} from 'lucide-react';
import { useHome } from "@/hooks/useHome";
import { Manga } from "@/types/manga";
import { formatViews, formatTimeAgo, getFlagSvg } from '@/utils/formatters';

// Komponen yang telah diekstrak
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { HeroSlider } from '@/components/home/HeroSlider';
import { Sidebar } from '@/components/home/Sidebar';
import { ComicSliderSection } from '@/components/shared/ComicSliderSection';
import { AdPlaceholder } from '@/components/shared/AdPlaceholder';

export default function HomePage() {
  const { 
    home, slides, loading, error, 
    latestComics, latestPage, latestTotalPages, fetchLatestPage, loadingLatest 
  } = useHome();

  const hotSliderRef = useRef<HTMLDivElement>(null);

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

      <Navbar />

      <HeroSlider slides={slides} />

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

          <Sidebar popularComics={home?.popular || []} />
        </div>
      </main>

      <div className="max-w-[1400px] mx-auto px-4 mt-4 mb-8">
        <AdPlaceholder className="w-full h-[90px] max-w-[970px] mx-auto" text="Banner Iklan Bawah (970x90)" />
      </div>

      <Footer />
    </div>
  );
}