import React, { useRef } from 'react';
import Link from 'next/link';
import { ChevronLeft, ChevronRight, Star, Eye, FolderOpen } from 'lucide-react';
import { Manga } from '@/types/manga';
import { getFlagSvg, formatViews } from '@/utils/formatters';

interface ComicSliderSectionProps {
  title: string;
  icon: any;
  comics: Manga[];
  accentColor?: string;
}

export const ComicSliderSection = ({ title, icon: Icon, comics, accentColor = "cyan" }: ComicSliderSectionProps) => {
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
