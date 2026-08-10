import React from 'react';
import Link from 'next/link';
import { Star, MessageSquare, Trophy } from 'lucide-react';
import { AdPlaceholder } from '@/components/shared/AdPlaceholder';
import { formatViews } from '@/utils/formatters';
import { Manga } from '@/types/manga';
import { topComments, communityLeaders, genresList } from '@/data/dummy';

interface SidebarProps {
  popularComics: Manga[];
}

export const Sidebar = ({ popularComics }: SidebarProps) => {
  return (
    <aside className="lg:col-span-1 flex flex-col gap-6">
      <AdPlaceholder className="w-full h-[250px] shadow-md" text="Rectangle Ads (300x250)" />

      <section className="bg-[#121115] rounded-xl border border-zinc-800 p-4 shadow-[0_4px_15px_rgba(0,0,0,0.5)] hover:border-purple-900/50 transition">
        <div className="border-b border-purple-900/30 pb-2 mb-4">
          <h2 className="text-[15px] font-bold text-white uppercase tracking-wider flex items-center gap-2 drop-shadow-[0_0_5px_rgba(168,85,247,0.5)]">
            <Star className="w-4 h-4 text-purple-500 fill-purple-500" /> Trending Minggu Ini
          </h2>
        </div>
        <div className="flex flex-col gap-3">
          {popularComics.slice(0, 7).map((comic, index) => (
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
      
      <section className="bg-[#121115] rounded-xl border border-zinc-800 p-4 shadow-[0_4px_15px_rgba(0,0,0,0.5)]">
        <div className="border-b border-purple-900/30 pb-2 mb-4">
          <h2 className="text-[15px] font-bold text-white uppercase tracking-wider flex items-center gap-2">
            <Trophy className="w-4 h-4 text-yellow-400" /> Peringkat Pembaca
          </h2>
        </div>
        <div className="flex flex-col gap-3">
          {communityLeaders.map((leader, index) => (
            <div key={leader.id} className={`flex items-center gap-3 p-3 rounded-lg border border-zinc-800/50 ${leader.bg}`}>
              <div className="relative">
                <img src={leader.avatar} alt={leader.name} className="w-10 h-10 rounded-full object-cover border-2 border-zinc-700" loading="lazy" />
                <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-zinc-900 rounded-full flex items-center justify-center border border-zinc-700 text-[10px] font-bold text-white">
                  {index + 1}
                </div>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[10px] uppercase tracking-wider text-zinc-400 font-semibold mb-0.5">{leader.category}</p>
                <p className="text-sm font-bold text-white truncate">{leader.name}</p>
                <p className={`text-xs font-medium mt-0.5 ${leader.color}`}>{leader.value}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </aside>
  );
};

function Eye(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  )
}
