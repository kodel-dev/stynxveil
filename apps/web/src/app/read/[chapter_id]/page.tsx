// apps/web/src/app/read/[chapter_id]/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { ArrowLeft, ChevronLeft, ChevronRight, Loader2, Sparkles, Home } from 'lucide-react';
import Link from 'next/link';
import { readChapter } from '@/lib/api/shinigami';

export default function ReaderPage() {
  const params = useParams();
  const chapterId = params?.chapter_id as string;

  const [readerData, setReaderData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!chapterId) return;
    setIsLoading(true);
    readChapter(chapterId)
      .then((res) => {
        if (res.status === 'success') {
          setReaderData(res.data);
          window.scrollTo(0, 0);
        }
      })
      .catch((err) => console.error("Gagal memuat chapter reader:", err))
      .finally(() => setIsLoading(false));
  }, [chapterId]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#09090b] flex flex-col items-center justify-center text-cyan-400">
        <Loader2 className="w-10 h-10 animate-spin mb-3" />
        <p className="text-xs text-zinc-400 tracking-wider uppercase font-bold">Memuat Panel Komik...</p>
      </div>
    );
  }

  if (!readerData) {
    return (
      <div className="min-h-screen bg-[#09090b] flex flex-col items-center justify-center text-zinc-400">
        <p className="text-sm font-semibold mb-4">Chapter tidak ditemukan atau gagal dimuat.</p>
        <Link href="/daftar-komik" className="px-4 py-2 bg-cyan-500 text-black font-bold text-xs rounded-xl">Kembali</Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#060608] text-zinc-200 font-sans flex flex-col items-center">
      {/* READER TOP BAR */}
      <header className="sticky top-0 z-50 bg-[#121118]/95 backdrop-blur-md border-b border-purple-500/20 w-full h-16 flex items-center justify-between px-6 shadow-2xl">
        <Link href={`/comic/${readerData.manga_id}`} className="flex items-center gap-2 text-cyan-400 hover:text-white text-xs font-bold transition">
          <ArrowLeft className="w-4 h-4" /> Detail Komik
        </Link>
        <div className="text-center">
          <h1 className="text-xs md:text-sm font-bold text-white">Chapter {readerData.chapter_number}</h1>
        </div>
        <Link href="/" className="p-2 bg-[#0a0a0c] border border-zinc-800 rounded-lg text-zinc-400 hover:text-cyan-400 transition">
          <Home className="w-4 h-4" />
        </Link>
      </header>

      {/* NAVIGASI ATAS CHAPTER */}
      <div className="flex items-center justify-center gap-4 my-6 w-full max-w-2xl px-4">
        {readerData.prev_chapter ? (
          <Link href={`/read/${readerData.prev_chapter.chapter_id}`} className="flex-1 py-2.5 bg-[#121118] border border-zinc-800 hover:border-cyan-400 rounded-xl text-center text-xs font-bold text-cyan-400 transition">
            ← Ch. {readerData.prev_chapter.chapter_number}
          </Link>
        ) : (
          <div className="flex-1"></div>
        )}

        {readerData.next_chapter ? (
          <Link href={`/read/${readerData.next_chapter.chapter_id}`} className="flex-1 py-2.5 bg-gradient-to-r from-purple-600 to-cyan-500 hover:opacity-90 rounded-xl text-center text-xs font-bold text-white transition shadow-[0_0_15px_rgba(34,211,238,0.3)]">
            Ch. {readerData.next_chapter.chapter_number} →
          </Link>
        ) : (
          <div className="flex-1"></div>
        )}
      </div>

      {/* RENDER GAMBAR PANEL KOMIK */}
      <main className="w-full max-w-[850px] flex flex-col items-center bg-black shadow-2xl min-h-screen">
        {readerData.images?.map((imgUrl: string, idx: number) => (
          <img 
            key={idx} 
            src={imgUrl} 
            alt={`Panel ${idx + 1}`} 
            className="w-full h-auto block select-none pointer-events-none" 
            loading="lazy" 
          />
        ))}
      </main>

      {/* NAVIGASI BAWAH CHAPTER */}
      <div className="flex items-center justify-center gap-4 my-10 w-full max-w-2xl px-4">
        {readerData.prev_chapter && (
          <Link href={`/read/${readerData.prev_chapter.chapter_id}`} className="flex-1 py-3 bg-[#121118] border border-zinc-800 hover:border-cyan-400 rounded-xl text-center text-xs font-bold text-cyan-400 transition">
            ← Chapter Sebelumnya
          </Link>
        )}
        {readerData.next_chapter && (
          <Link href={`/read/${readerData.next_chapter.chapter_id}`} className="flex-1 py-3 bg-gradient-to-r from-purple-600 to-cyan-500 hover:opacity-90 rounded-xl text-center text-xs font-bold text-white transition shadow-[0_0_15px_rgba(34,211,238,0.3)]">
            Chapter Selanjutnya →
          </Link>
        )}
      </div>
    </div>
  );
}