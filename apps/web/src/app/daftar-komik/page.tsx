// apps/web/src/app/daftar-komik/page.tsx
'use client';

import { useState } from 'react';
import { Search, Star, Filter, Menu, BookMarked, User, ChevronDown, ListFilter, Eye } from 'lucide-react';
import Link from 'next/link';

type ComicType = 'Manga' | 'Manhwa' | 'Manhua';
type ComicStatus = 'Ongoing' | 'Completed';

interface Comic {
  id: number;
  title: string;
  type: ComicType;
  status: ComicStatus;
  rating: number;
  chapter: string;
  views: string;
  genres: string[];
  cover: string;
}

// Dummy Data Komik Lengkap untuk Daftar Komik
const comicsData: Comic[] = Array.from({ length: 24 }).map((_, i) => {
  const types: ComicType[] = ['Manga', 'Manhwa', 'Manhua'];
  const statuses: ComicStatus[] = ['Ongoing', 'Completed'];
  const allGenres = ['Action', 'Adventure', 'Comedy', 'Fantasy', 'Magic', 'Martial Arts', 'Romance', 'Sci-Fi', 'System', 'Shounen', 'Mystery'];
  
  // Ambil 2-3 genre acak
  const shuffledGenres = allGenres.sort(() => 0.5 - Math.random()).slice(0, 3);

  return {
    id: i + 1,
    title: `Komik Epik Judul Ke-${i + 1} Yang Sangat Keren`,
    type: types[i % 3],
    status: statuses[i % 2],
    rating: parseFloat((Math.random() * 2 + 8).toFixed(1)),
    chapter: `Ch. ${Math.floor(Math.random() * 200) + 10}`,
    views: `${(Math.random() * 800 + 100).toFixed(0)}K`,
    genres: shuffledGenres,
    cover: `https://picsum.photos/seed/stynxveil${i}/300/400`
  };
});

const allGenres = ['Action', 'Adventure', 'Comedy', 'Drama', 'Fantasy', 'Isekai', 'Magic', 'Martial Arts', 'Mecha', 'Mystery', 'Romance', 'School Life', 'Sci-Fi', 'Shounen', 'Slice of Life', 'System'];

export default function DaftarKomikPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  
  // State Filter
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState<string>('Semua');
  const [selectedStatus, setSelectedStatus] = useState<string>('Semua');
  const [selectedOrder, setSelectedOrder] = useState<string>('Terbaru');
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
  const [showGenreFilter, setShowGenreFilter] = useState(false);

  // Toggle Genre Filter
  const toggleGenre = (genre: string) => {
    if (selectedGenres.includes(genre)) {
      setSelectedGenres(selectedGenres.filter(g => g !== genre));
    } else {
      setSelectedGenres([...selectedGenres, genre]);
    }
  };

  // Fungsi Reset Filter
  const resetFilters = () => {
    setSearchQuery('');
    setSelectedType('Semua');
    setSelectedStatus('Semua');
    setSelectedOrder('Terbaru');
    setSelectedGenres([]);
  };

  // Logika Filter Data
  let filteredComics = comicsData.filter(comic => {
    const matchSearch = comic.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchType = selectedType === 'Semua' || comic.type === selectedType;
    const matchStatus = selectedStatus === 'Semua' || comic.status === selectedStatus;
    const matchGenre = selectedGenres.length === 0 || selectedGenres.every(g => comic.genres.includes(g));
    
    return matchSearch && matchType && matchStatus && matchGenre;
  });

  // Logika Sorting Data
  if (selectedOrder === 'Terbaru') {
    filteredComics = filteredComics.sort((a, b) => b.id - a.id); // Asumsi id lebih besar = lebih baru
  } else if (selectedOrder === 'A-Z') {
    filteredComics = filteredComics.sort((a, b) => a.title.localeCompare(b.title));
  } else if (selectedOrder === 'Z-A') {
    filteredComics = filteredComics.sort((a, b) => b.title.localeCompare(a.title));
  } else if (selectedOrder === 'Rating Tertinggi') {
    filteredComics = filteredComics.sort((a, b) => b.rating - a.rating);
  }

  return (
    <div className="min-h-screen bg-[#0f0f11] text-zinc-300 font-sans flex flex-col">
      
      {/* 1. NAVBAR */}
      <nav className="sticky top-0 z-50 bg-[#16151a]/95 backdrop-blur-sm border-b border-zinc-800 shadow-md">
        <div className="max-w-[1400px] mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button className="lg:hidden text-zinc-400 hover:text-white"><Menu className="w-6 h-6" /></button>
            <Link href="/" className="text-2xl font-extrabold tracking-tighter text-white">
              STYNX<span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">VEIL</span>
            </Link>
          </div>

          <div className="hidden lg:flex items-center gap-6 font-medium text-sm">
            <Link href="/" className="text-zinc-400 hover:text-purple-400 transition">Beranda</Link>
            {/* Navigasi Daftar Komik Aktif */}
            <Link href="/daftar-komik" className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500 font-bold transition border-b-2 border-purple-500 pb-1">Daftar Komik</Link>
            <Link href="/project" className="text-zinc-400 hover:text-purple-400 transition">Project Kami</Link>
            <Link href="/bookmark" className="text-zinc-400 hover:text-purple-400 transition flex items-center gap-1">
              <BookMarked className="w-4 h-4" /> Bookmark
            </Link>
          </div>

          <div className="flex items-center gap-4">
            {/* FITUR LOGIN PENGGUNA */}
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

      {/* 2. HEADER DAFTAR KOMIK */}
      <div className="bg-[#16151a] border-b border-purple-900/30 py-8 relative overflow-hidden">
        {/* Dekorasi Glow Transparan di Background */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-purple-600/10 rounded-full blur-[100px] pointer-events-none"></div>
        
        <div className="max-w-[1400px] mx-auto px-4 relative z-10">
          <h1 className="text-3xl font-extrabold text-white mb-2 flex items-center gap-3">
            <ListFilter className="w-8 h-8 text-purple-400" /> Daftar Komik Lengkap
          </h1>
          <p className="text-sm text-zinc-400">Jelajahi ribuan koleksi komik Manga, Manhwa, dan Manhua kami dengan fitur filter canggih.</p>
        </div>
      </div>

      {/* 3. FILTER SECTION */}
      <div className="max-w-[1400px] mx-auto px-4 py-6">
        <div className="bg-[#16151a] border border-zinc-800 rounded-xl p-4 md:p-6 mb-8 shadow-lg relative z-20">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-end">
            
            {/* Pencarian */}
            <div className="md:col-span-4">
              <label className="block text-xs font-semibold text-zinc-400 mb-1.5">Cari Judul Komik</label>
              <div className="relative flex items-center w-full">
                <input 
                  type="text" 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Ketik judul komik..." 
                  className="w-full bg-[#0f0f11] border border-zinc-700 focus:border-purple-500 rounded-lg px-4 py-2.5 text-sm text-white outline-none pl-10 transition shadow-inner"
                />
                <Search className="w-4 h-4 text-zinc-500 absolute left-3" />
              </div>
            </div>

            {/* Tipe Komik */}
            <div className="md:col-span-2">
              <label className="block text-xs font-semibold text-zinc-400 mb-1.5">Tipe</label>
              <div className="relative">
                <select 
                  value={selectedType}
                  onChange={(e) => setSelectedType(e.target.value)}
                  className="w-full bg-[#0f0f11] border border-zinc-700 focus:border-purple-500 rounded-lg px-3 py-2.5 text-sm text-zinc-200 outline-none appearance-none cursor-pointer shadow-inner"
                >
                  <option value="Semua">Semua Tipe</option>
                  <option value="Manga">Manga (Jepang)</option>
                  <option value="Manhwa">Manhwa (Korea)</option>
                  <option value="Manhua">Manhua (China)</option>
                </select>
                <ChevronDown className="w-4 h-4 text-zinc-500 absolute right-3 top-3 pointer-events-none" />
              </div>
            </div>

            {/* Status */}
            <div className="md:col-span-2">
              <label className="block text-xs font-semibold text-zinc-400 mb-1.5">Status</label>
              <div className="relative">
                <select 
                  value={selectedStatus}
                  onChange={(e) => setSelectedStatus(e.target.value)}
                  className="w-full bg-[#0f0f11] border border-zinc-700 focus:border-purple-500 rounded-lg px-3 py-2.5 text-sm text-zinc-200 outline-none appearance-none cursor-pointer shadow-inner"
                >
                  <option value="Semua">Semua Status</option>
                  <option value="Ongoing">Ongoing</option>
                  <option value="Completed">Completed</option>
                </select>
                <ChevronDown className="w-4 h-4 text-zinc-500 absolute right-3 top-3 pointer-events-none" />
              </div>
            </div>

            {/* Urutkan */}
            <div className="md:col-span-2">
              <label className="block text-xs font-semibold text-zinc-400 mb-1.5">Urutkan</label>
              <div className="relative">
                <select 
                  value={selectedOrder}
                  onChange={(e) => setSelectedOrder(e.target.value)}
                  className="w-full bg-[#0f0f11] border border-zinc-700 focus:border-purple-500 rounded-lg px-3 py-2.5 text-sm text-zinc-200 outline-none appearance-none cursor-pointer shadow-inner"
                >
                  <option value="Terbaru">Update Terbaru</option>
                  <option value="A-Z">A - Z</option>
                  <option value="Z-A">Z - A</option>
                  <option value="Rating Tertinggi">Rating Tertinggi</option>
                </select>
                <ChevronDown className="w-4 h-4 text-zinc-500 absolute right-3 top-3 pointer-events-none" />
              </div>
            </div>

            {/* Tombol Filter Tambahan */}
            <div className="md:col-span-2 flex gap-2">
              <button 
                onClick={() => setShowGenreFilter(!showGenreFilter)}
                className={`w-full flex items-center justify-center gap-2 px-3 py-2.5 rounded-lg text-sm font-semibold transition border ${showGenreFilter ? 'bg-purple-600/20 border-purple-500 text-purple-400 shadow-[0_0_10px_rgba(147,51,234,0.2)]' : 'bg-[#0f0f11] border-zinc-700 text-zinc-300 hover:border-purple-500/50'}`}
              >
                <Filter className="w-4 h-4" /> Filter Genre
              </button>
            </div>
          </div>

          {/* Kolom Expand Filter Genre */}
          {showGenreFilter && (
            <div className="mt-5 pt-5 border-t border-zinc-800/80">
              <div className="flex items-center justify-between mb-4">
                <label className="block text-sm font-bold text-white">Pilih Genre (Bisa Lebih Dari Satu)</label>
                <button onClick={resetFilters} className="text-xs text-red-400 hover:text-red-300 font-semibold transition cursor-pointer">
                  Reset Semua Filter
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {allGenres.map((genre) => {
                  const isActive = selectedGenres.includes(genre);
                  return (
                    <button
                      key={genre}
                      onClick={() => toggleGenre(genre)}
                      className={`px-3.5 py-1.5 text-xs font-semibold rounded-md border transition-all cursor-pointer ${
                        isActive 
                        ? 'bg-gradient-to-r from-blue-600 to-purple-600 border-transparent text-white shadow-[0_0_12px_rgba(147,51,234,0.4)] scale-105' 
                        : 'bg-[#0f0f11] border-zinc-700 text-zinc-400 hover:border-purple-500/50 hover:text-zinc-200'
                      }`}
                    >
                      {genre}
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* 4. GRID KOMIK */}
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-lg font-bold text-white border-l-4 border-purple-500 pl-3">
            Menampilkan <span className="text-purple-400">{filteredComics.length}</span> Komik
          </h2>
        </div>

        {filteredComics.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
            {filteredComics.map((comic) => (
              <Link href={`/comic/${comic.id}`} key={comic.id} className="bg-[#16151a] rounded-lg border border-zinc-800/80 overflow-hidden hover:border-purple-500/50 transition duration-300 group flex flex-col h-full shadow-lg">
                <div className="relative aspect-[2/3] overflow-hidden bg-zinc-900">
                  <img src={comic.cover} alt={comic.title} className="w-full h-full object-cover group-hover:scale-105 transition duration-500" />
                  
                  {/* Badge Tipe */}
                  <div className="absolute top-2 left-2 flex items-center gap-1 drop-shadow-md">
                    <span className={`text-[9px] font-bold text-white px-2 py-0.5 rounded shadow-md backdrop-blur-sm ${comic.type === 'Manga' ? 'bg-red-600/90' : comic.type === 'Manhwa' ? 'bg-gradient-to-r from-blue-600 to-purple-600' : 'bg-orange-500/90'}`}>
                      {comic.type}
                    </span>
                  </div>

                  {/* Badge Status */}
                  <div className={`absolute top-2 right-2 text-[9px] font-bold px-2 py-0.5 rounded shadow-md backdrop-blur-sm ${comic.status === 'Ongoing' ? 'bg-green-600/90 text-white' : 'bg-zinc-700/90 text-zinc-200'}`}>
                    {comic.status}
                  </div>

                  {/* Gradient & Info Bawah */}
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/95 via-black/60 to-transparent p-2 pt-10 flex justify-between items-end">
                    <span className="text-xs font-semibold text-purple-400 drop-shadow-md">{comic.chapter}</span>
                    <div className="flex items-center gap-1 bg-black/60 text-[10px] font-bold px-1.5 py-0.5 rounded text-white backdrop-blur-sm border border-zinc-700/50">
                      <Star className="w-2.5 h-2.5 text-yellow-400 fill-yellow-400" /> {comic.rating}
                    </div>
                  </div>
                </div>
                
                <div className="p-3 flex flex-col flex-1">
                  <h3 className="font-semibold text-white text-[13px] line-clamp-2 leading-snug mb-1.5 group-hover:text-purple-400 transition" title={comic.title}>
                    {comic.title}
                  </h3>
                  
                  <div className="flex items-center gap-1 text-[10px] text-zinc-500 mb-2">
                    <Eye className="w-3 h-3 text-zinc-600" />
                    <span>{comic.views} pembaca</span>
                  </div>

                  <div className="mt-auto flex flex-wrap gap-1">
                    {comic.genres.slice(0, 2).map((genre, idx) => (
                      <span key={idx} className="text-[9px] text-zinc-400 bg-[#0f0f11] border border-zinc-800 px-1.5 py-0.5 rounded">
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
            <h3 className="text-xl font-bold text-white mb-2">Komik Tidak Ditemukan</h3>
            <p className="text-sm text-zinc-400">Maaf, tidak ada komik yang cocok dengan kriteria filter Anda.</p>
            <button onClick={resetFilters} className="mt-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white px-6 py-2 rounded-lg text-sm font-semibold transition shadow-lg cursor-pointer">
              Reset Semua Filter
            </button>
          </div>
        )}

        {/* 5. PAGINATION (UI Dummy) */}
        {filteredComics.length > 0 && (
          <div className="mt-12 flex justify-center items-center gap-2">
            <button className="px-4 py-2 rounded-lg bg-[#16151a] border border-zinc-800 text-zinc-400 hover:text-white hover:border-zinc-600 transition text-sm font-semibold disabled:opacity-50" disabled>
              Prev
            </button>
            <button className="w-10 h-10 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold shadow-[0_0_15px_rgba(147,51,234,0.4)]">
              1
            </button>
            <button className="w-10 h-10 rounded-lg bg-[#16151a] border border-zinc-800 text-zinc-400 hover:bg-zinc-800 hover:text-white hover:border-purple-500/50 transition font-semibold">
              2
            </button>
            <button className="w-10 h-10 rounded-lg bg-[#16151a] border border-zinc-800 text-zinc-400 hover:bg-zinc-800 hover:text-white hover:border-purple-500/50 transition font-semibold">
              3
            </button>
            <span className="text-zinc-500 mx-1">...</span>
            <button className="px-4 py-2 rounded-lg bg-[#16151a] border border-zinc-800 text-zinc-400 hover:text-white hover:border-purple-500/50 transition text-sm font-semibold">
              Next
            </button>
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
            Stynxveil adalah website baca komik online gratis berbahasa Indonesia. Kami memiliki ribuan koleksi komik manga, manhwa, dan manhua yang di-update setiap hari. Semua komik di website ini hanya preview dari komik aslinya.
          </p>
          <p className="mt-2 text-[11px]">© {new Date().getFullYear()} Stynxveil. All Rights Reserved.</p>
        </div>
      </footer>
    </div>
  );
}