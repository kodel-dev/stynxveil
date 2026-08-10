// apps/web/src/app/project/page.tsx
'use client';

import { useState } from 'react';
import { Search, Star, Menu, BookMarked, User, Eye, Crown, Sparkles, ChevronDown } from 'lucide-react';
import Link from 'next/link';

type ComicType = 'Manga' | 'Manhwa' | 'Manhua';

interface Comic {
  id: number;
  title: string;
  type: ComicType;
  status: 'Ongoing' | 'Completed';
  rating: number;
  chapter: string;
  views: string;
  genres: string[];
  cover: string;
}

// Dummy Data Khusus Project Internal
const projectComics: Comic[] = Array.from({ length: 18 }).map((_, i) => {
  const types: ComicType[] = ['Manhwa', 'Manhua', 'Manga'];
  const statuses: ('Ongoing' | 'Completed')[] = ['Ongoing', 'Ongoing', 'Completed'];
  const allGenres = ['Action', 'Fantasy', 'System', 'Martial Arts', 'Overpowered', 'Reincarnation'];
  
  // Deterministic slice instead of Math.random
  const startIndex = i % 3;
  const slicedGenres = allGenres.slice(startIndex, startIndex + 3);

  return {
    id: i + 200,
    title: `Project Stynxveil Ke-${i + 1} Kualitas HD`,
    type: types[i % 3],
    status: statuses[i % 3],
    rating: parseFloat((((i % 5) * 0.3) + 8.5).toFixed(1)), // Deterministic rating
    chapter: `Ch. ${(i * 7) % 150 + 5}`, // Deterministic chapter
    views: `${((i * 13) % 900 + 200).toFixed(0)}K`, // Deterministic views
    genres: slicedGenres,
    cover: `https://picsum.photos/seed/stynxproject${i}/300/400`
  };
});

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

export default function ProjectPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedOrder, setSelectedOrder] = useState<string>('Terbaru');

  // Logika Filter & Sort Data
  let filteredComics = projectComics.filter(comic => 
    comic.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (selectedOrder === 'Terbaru') {
    filteredComics = filteredComics.sort((a, b) => b.id - a.id);
  } else if (selectedOrder === 'Rating Tertinggi') {
    filteredComics = filteredComics.sort((a, b) => b.rating - a.rating);
  } else if (selectedOrder === 'Paling Populer') {
    // Simulasi sorting views berdasarkan string (hanya untuk visual mockup)
    filteredComics = filteredComics.sort((a, b) => parseInt(b.views) - parseInt(a.views));
  }

  return (
    <div className="min-h-screen bg-[#0f0f11] text-zinc-300 font-sans flex flex-col">
      


      {/* 2. HEADER PROJECT KAMI */}
      <div className="bg-[#16151a] border-b border-purple-900/30 py-12 relative overflow-hidden">
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-[120px] pointer-events-none"></div>
        <div className="absolute bottom-0 left-1/4 w-80 h-80 bg-purple-600/10 rounded-full blur-[100px] pointer-events-none"></div>
        
        <div className="max-w-[1000px] mx-auto px-4 relative z-10 text-center flex flex-col items-center">
          <div className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600/20 to-purple-600/20 border border-purple-500/30 text-purple-300 text-xs font-bold px-4 py-1.5 rounded-full mb-4 shadow-[0_0_20px_rgba(147,51,234,0.2)]">
            <Crown className="w-4 h-4 text-yellow-400" /> ORIGINAL TRANSLATION
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4">
            Eksklusif Garapan <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">Tim STYNXVEIL</span>
          </h1>
          <p className="text-sm md:text-base text-zinc-400 max-w-2xl leading-relaxed">
            Kumpulan komik pilihan yang diterjemahkan, di-edit, dan dibersihkan langsung oleh tim internal kami untuk memberikan kualitas bacaan HD terbaik dan terakurat untuk Anda.
          </p>
        </div>
      </div>

      {/* 3. TOOLBAR PENCARIAN & URUTAN */}
      <div className="max-w-[1400px] mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row gap-4 justify-between items-center bg-[#16151a] border border-zinc-800 rounded-xl p-4 mb-8 shadow-lg">
          
          <div className="relative flex items-center w-full md:max-w-md">
            <input 
              type="text" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Cari project komik..." 
              className="w-full bg-[#0f0f11] border border-zinc-700 focus:border-purple-500 rounded-lg px-4 py-2.5 text-sm text-white outline-none pl-10 transition shadow-inner"
            />
            <Search className="w-4 h-4 text-zinc-500 absolute left-3" />
          </div>

          <div className="flex items-center gap-3 w-full md:w-auto">
            <span className="text-xs font-semibold text-zinc-400 whitespace-nowrap hidden sm:block">Urutkan:</span>
            <div className="relative w-full md:w-48">
              <select 
                value={selectedOrder}
                onChange={(e) => setSelectedOrder(e.target.value)}
                className="w-full bg-[#0f0f11] border border-zinc-700 focus:border-purple-500 rounded-lg px-3 py-2.5 text-sm text-zinc-200 outline-none appearance-none cursor-pointer shadow-inner"
              >
                <option value="Terbaru">Update Terbaru</option>
                <option value="Paling Populer">Paling Populer</option>
                <option value="Rating Tertinggi">Rating Tertinggi</option>
              </select>
              <ChevronDown className="w-4 h-4 text-zinc-500 absolute right-3 top-3 pointer-events-none" />
            </div>
          </div>
        </div>

        {/* 4. GRID KOMIK PROJECT */}
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-lg font-bold text-white border-l-4 border-purple-500 pl-3 flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-purple-400" /> Katalog Project Kami
          </h2>
          <span className="text-xs font-medium bg-[#16151a] border border-zinc-800 px-3 py-1 rounded-full text-zinc-400">
            Total: {filteredComics.length} Judul
          </span>
        </div>

        {filteredComics.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-5">
            {filteredComics.map((comic) => (
              <Link href={`/comic/${comic.id}`} key={comic.id} className="bg-[#16151a] rounded-lg border border-purple-900/30 overflow-hidden hover:border-purple-500 transition duration-300 group flex flex-col h-full shadow-[0_4px_15px_rgba(0,0,0,0.5)] hover:shadow-[0_0_20px_rgba(147,51,234,0.3)]">
                <div className="relative aspect-[2/3] overflow-hidden bg-zinc-900">
                  <img src={comic.cover} alt={comic.title} className="w-full h-full object-cover group-hover:scale-110 transition duration-700" />
                  
                  {/* Badge Exclusif Project (Selalu terlihat untuk membedakan) */}
                  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-purple-500"></div>
                  
                  <div className="absolute top-2 left-2 flex items-center gap-1 drop-shadow-md">
                    {getFlagSvg(comic.type)}
                    <span className="text-[9px] font-bold text-white px-1.5 py-0.5 rounded shadow-md backdrop-blur-sm bg-gradient-to-r from-blue-600 to-purple-600 border border-purple-400/50 flex items-center gap-1">
                      <Star className="w-2.5 h-2.5 fill-white" /> PROJECT
                    </span>
                  </div>

                  <div className={`absolute top-2 right-2 text-[9px] font-bold px-2 py-0.5 rounded shadow-md backdrop-blur-sm ${comic.status === 'Ongoing' ? 'bg-green-600/90 text-white' : 'bg-zinc-700/90 text-zinc-200'}`}>
                    {comic.status}
                  </div>

                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/95 via-black/60 to-transparent p-2 pt-10 flex justify-between items-end">
                    <span className="text-xs font-bold text-purple-400 drop-shadow-md">{comic.chapter}</span>
                    <div className="flex items-center gap-1 bg-black/60 text-[10px] font-bold px-1.5 py-0.5 rounded text-white backdrop-blur-sm border border-purple-500/30">
                      <Star className="w-2.5 h-2.5 text-yellow-400 fill-yellow-400" /> {comic.rating}
                    </div>
                  </div>
                </div>
                
                <div className="p-3 flex flex-col flex-1 bg-gradient-to-b from-[#16151a] to-[#0f0f11]">
                  <h3 className="font-semibold text-white text-[13px] line-clamp-2 leading-snug mb-1.5 group-hover:text-purple-400 transition" title={comic.title}>
                    {comic.title}
                  </h3>
                  
                  <div className="flex items-center justify-between text-[10px] text-zinc-500 mb-2">
                    <div className="flex items-center gap-1">
                      <Eye className="w-3 h-3 text-purple-500/70" />
                      <span>{comic.views} views</span>
                    </div>
                  </div>

                  <div className="mt-auto flex flex-wrap gap-1">
                    {comic.genres.slice(0, 2).map((genre, idx) => (
                      <span key={idx} className="text-[9px] text-zinc-300 bg-purple-500/10 border border-purple-500/20 px-1.5 py-0.5 rounded">
                        {genre}
                      </span>
                    ))}
                    {comic.genres.length > 2 && (
                      <span className="text-[9px] text-zinc-500 px-1.5 py-0.5">+{comic.genres.length - 2}</span>
                    )}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="w-full bg-[#16151a] border border-zinc-800 rounded-xl py-20 flex flex-col items-center justify-center text-center">
            <Search className="w-12 h-12 text-zinc-600 mb-4" />
            <h3 className="text-xl font-bold text-white mb-2">Project Tidak Ditemukan</h3>
            <p className="text-sm text-zinc-400">Tidak ada project komik yang sesuai dengan pencarian Anda.</p>
          </div>
        )}
      </div>

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