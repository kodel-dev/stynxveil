// apps/web/src/app/comic/[id]/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { 
  Star, Eye, Bookmark, BookOpen, Calendar, Globe, User, ArrowLeft, Loader2, Sparkles, ChevronLeft, ChevronRight 
} from 'lucide-react';
import Link from 'next/link';
import { getDetail, getChapters } from '@/lib/api/shinigami';

// Komponen Banner Iklan 4 Kotak
const AdGrid = () => (
  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full my-6" aria-hidden="true">
    {[1, 2, 3, 4].map((i) => (
      <div key={i} className="h-28 border border-dashed border-cyan-500/30 bg-[#0a0a0c]/80 backdrop-blur-sm flex flex-col items-center justify-center text-zinc-500 rounded-xl overflow-hidden hover:border-cyan-400 hover:text-cyan-400 transition shadow-[0_0_15px_rgba(0,0,0,0.5)]">
        <Sparkles className="w-4 h-4 mb-1 opacity-50" />
        <span className="text-[10px] font-bold tracking-widest uppercase">Space Iklan {i}</span>
      </div>
    ))}
  </div>
);

export default function DetailKomikPage() {
  const params = useParams();
  const mangaId = params?.id as string;

  const [comic, setComic] = useState<any>(null);
  const [chapters, setChapters] = useState<any[]>([]);
  const [chapterPage, setChapterPage] = useState(1);
  const [totalChapterPages, setTotalChapterPages] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [isChapterLoading, setIsChapterLoading] = useState(false);

  // Fetch Detail Komik
  useEffect(() => {
    if (!mangaId) return;
    setIsLoading(true);
    getDetail(mangaId)
      .then((res) => {
        if (res.status === 'success') {
          setComic(res.data);
        }
      })
      .catch((err) => console.error("Gagal memuat detail komik:", err))
      .finally(() => setIsLoading(false));
  }, [mangaId]);

  // Fetch Chapter List dengan Pagination API Resmi
  useEffect(() => {
    if (!mangaId) return;
    setIsChapterLoading(true);
    getChapters(mangaId, chapterPage)
      .then((res) => {
        if (res.status === 'success') {
          setChapters(res.data);
          setTotalChapterPages(res.pagination.total_pages);
        }
      })
      .catch((err) => console.error("Gagal memuat chapter:", err))
      .finally(() => setIsChapterLoading(false));
  }, [mangaId, chapterPage]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#09090b] flex flex-col items-center justify-center text-cyan-400">
        <Loader2 className="w-10 h-10 animate-spin mb-3" />
        <p className="text-xs text-zinc-400 tracking-wider uppercase font-bold">Memuat Detail Komik...</p>
      </div>
    );
  }

  if (!comic) {
    return (
      <div className="min-h-screen bg-[#09090b] flex flex-col items-center justify-center text-zinc-400">
        <p className="text-sm font-semibold mb-4">Komik tidak ditemukan.</p>
        <Link href="/daftar-komik" className="px-4 py-2 bg-cyan-500 text-black font-bold text-xs rounded-xl">Kembali ke Daftar Komik</Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#09090b] text-zinc-200 font-sans flex flex-col">
      {/* NAVBAR */}
      <nav className="sticky top-0 z-50 bg-[#121118]/90 backdrop-blur-md border-b border-purple-500/20 h-16 flex items-center justify-between px-6">
        <Link href="/daftar-komik" className="flex items-center gap-2 text-cyan-400 hover:text-white transition text-xs font-bold">
          <ArrowLeft className="w-4 h-4" /> Kembali
        </Link>
        <Link href="/" className="text-xl font-black text-white">
          STYNX<span className="text-cyan-400">VEIL</span>
        </Link>
      </nav>

      <div className="max-w-[1400px] mx-auto px-4 py-8 w-full flex-1">
        {/* BANNER IKLAN ATAS */}
        <AdGrid />

        {/* HEADER DETAIL KOMIK */}
        <div className="bg-[#121118] border border-zinc-800/80 rounded-2xl p-6 md:p-8 relative overflow-hidden shadow-2xl my-6">
          <div className="absolute inset-0 opacity-10 bg-cover bg-center blur-xl pointer-events-none" style={{ backgroundImage: `url(${comic.cover})` }}></div>
          
          <div className="relative z-10 flex flex-col md:flex-row gap-8 items-start">
            <div className="w-full md:w-56 shrink-0 rounded-xl overflow-hidden shadow-2xl border border-zinc-700/50 aspect-[2/3] bg-zinc-900">
              <img src={comic.cover_portrait || comic.cover} alt={comic.title} className="w-full h-full object-cover" />
            </div>

            <div className="flex-1">
              <div className="flex flex-wrap items-center gap-2 mb-3">
                <span className="bg-cyan-500/20 border border-cyan-500/40 text-cyan-400 text-[10px] font-bold px-2.5 py-0.5 rounded-md uppercase">
                  {comic.status}
                </span>
                <span className="bg-purple-500/20 border border-purple-500/40 text-purple-300 text-[10px] font-bold px-2.5 py-0.5 rounded-md">
                  {comic.format?.[0]?.name || comic.format || 'Manga'}
                </span>
                <span className="bg-zinc-800 text-zinc-300 text-[10px] font-bold px-2.5 py-0.5 rounded-md flex items-center gap-1">
                  <Calendar className="w-3 h-3 text-cyan-400" /> {comic.release_year}
                </span>
              </div>

              <h1 className="text-2xl md:text-4xl font-black text-white tracking-tight mb-2">{comic.title}</h1>
              <p className="text-xs text-zinc-400 italic mb-4">{comic.alternative_title}</p>

              <div className="flex flex-wrap items-center gap-6 text-xs text-zinc-300 mb-6 bg-[#0a0a0c]/60 p-4 rounded-xl border border-zinc-800">
                <div className="flex items-center gap-1.5 text-yellow-400 font-bold">
                  <Star className="w-4 h-4 fill-yellow-400" /> {comic.rating || 'N/A'}
                </div>
                <div className="flex items-center gap-1.5 text-cyan-400 font-semibold">
                  <Eye className="w-4 h-4" /> {comic.views?.toLocaleString()} Pembaca
                </div>
                <div className="flex items-center gap-1.5 text-purple-400 font-semibold">
                  <Bookmark className="w-4 h-4" /> {comic.bookmarks?.toLocaleString()} Bookmark
                </div>
              </div>

              {/* GENRES */}
              <div className="flex flex-wrap gap-1.5 mb-6">
                {comic.genres?.map((genre: any, idx: number) => (
                  <span key={idx} className="text-[10px] font-semibold bg-purple-950/50 text-purple-300 border border-purple-500/30 px-3 py-1 rounded-lg">
                    {genre.name}
                  </span>
                ))}
              </div>

              {/* AUTHORS & ARTISTS */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-zinc-400 border-t border-zinc-800/80 pt-4">
                <div>
                  <span className="font-bold text-zinc-500 block mb-0.5">Author:</span>
                  <span className="text-zinc-200 font-medium">{comic.authors?.map((a: any) => a.name).join(', ') || 'Unknown'}</span>
                </div>
                <div>
                  <span className="font-bold text-zinc-500 block mb-0.5">Artist:</span>
                  <span className="text-zinc-200 font-medium">{comic.artists?.map((a: any) => a.name).join(', ') || 'Unknown'}</span>
                </div>
              </div>
            </div>
          </div>

          {/* SINOPSIS */}
          <div className="mt-8 pt-6 border-t border-zinc-800/80 relative z-10">
            <h2 className="text-sm font-bold text-white uppercase tracking-wider mb-2">Sinopsis</h2>
            <p className="text-xs text-zinc-300 leading-relaxed whitespace-pre-line">{comic.description}</p>
          </div>
        </div>

        {/* CHAPTER LIST (MENGGUNAKAN API CHAPTERS) */}
        <section className="bg-[#121118] border border-zinc-800/80 rounded-2xl p-6 shadow-xl mb-8">
          <div className="flex justify-between items-center mb-6 border-b border-zinc-800 pb-4">
            <h2 className="text-base font-bold text-white flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-cyan-400" /> Daftar Chapter
            </h2>
            <span className="text-xs text-zinc-500">Total {comic.latest_chapter?.chapter_number || chapters.length} Chapter</span>
          </div>

          {isChapterLoading ? (
            <div className="flex justify-center py-12 text-cyan-400">
              <Loader2 className="w-8 h-8 animate-spin" />
            </div>
          ) : chapters.length === 0 ? (
            <p className="text-center text-xs text-zinc-500 py-8">Belum ada chapter tersedia.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
              {chapters.map((ch) => (
                <Link 
                  key={ch.chapter_id} 
                  href={`/read/${ch.chapter_id}`}
                  className="bg-[#0a0a0c] hover:bg-cyan-500/10 border border-zinc-800 hover:border-cyan-400/50 p-3 rounded-xl transition flex justify-between items-center group"
                >
                  <span className="text-xs font-bold text-zinc-200 group-hover:text-cyan-400 transition">
                    Chapter {ch.chapter_number}
                  </span>
                  <span className="text-[10px] text-zinc-500">
                    {new Date(ch.release_date).toLocaleDateString('id-ID')}
                  </span>
                </Link>
              ))}
            </div>
          )}

          {/* CHAPTER PAGINATION */}
          {totalChapterPages > 1 && (
            <div className="flex justify-center items-center gap-4 mt-8 pt-4 border-t border-zinc-800">
              <button 
                onClick={() => setChapterPage(p => Math.max(1, p - 1))}
                disabled={chapterPage === 1}
                className="px-3 py-1.5 bg-[#0a0a0c] border border-zinc-800 text-cyan-400 text-xs font-bold rounded-lg disabled:opacity-30"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <span className="text-xs font-medium text-zinc-400">Hal {chapterPage} / {totalChapterPages}</span>
              <button 
                onClick={() => setChapterPage(p => Math.min(totalChapterPages, p + 1))}
                disabled={chapterPage === totalChapterPages}
                className="px-3 py-1.5 bg-[#0a0a0c] border border-zinc-800 text-cyan-400 text-xs font-bold rounded-lg disabled:opacity-30"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </section>

        {/* BANNER IKLAN BAWAH */}
        <AdGrid />
      </div>
    </div>
  );
}