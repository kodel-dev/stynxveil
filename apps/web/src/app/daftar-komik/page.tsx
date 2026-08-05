// apps/web/src/app/daftar-komik/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { Search, Star, Menu, BookMarked, User, Eye, ChevronLeft, ChevronRight, Loader2 } from 'lucide-react';
import Link from 'next/link';

// 1. Tipe Data sesuai Response API
interface Genre {
  name: string;
  slug: string;
}

interface LatestMangaItem {
  manga_id: string;
  title: string;
  alternative_title: string;
  description: string;
  cover: string;
  cover_portrait: string | null;
  status: string;
  release_year: string;
  country: string;
  rating: number | null;
  views: number;
  bookmarks: number;
  latest_chapter: number;
  latest_chapter_id: string;
  latest_chapter_time: string;
  is_recommended: boolean;
  genres: Genre[];
  format: 'Manga' | 'Manhwa' | 'Manhua';
  type: 'Project' | 'Mirror';
}

// 2. Fungsi Utilitas
const formatViews = (views: number) => {
  if (!views) return '0';
  if (views >= 1000000) return (views / 1000000).toFixed(1) + 'M';
  if (views >= 1000) return (views / 1000).toFixed(1) + 'K';
  return views.toString();
};

const getFlagSvg = (format: string) => {
  if (format === 'Manga') {
    return (
      <svg className="w-4 h-3 rounded shadow-sm overflow-hidden bg-white" viewBox="0 0 900 600">
        <rect width="900" height="600" fill="#fff"/>
        <circle cx="450" cy="300" r="180" fill="#bc002d"/>
      </svg>
    );
  }
  if (format === 'Manhwa') {
    return (
      <svg className="w-4 h-3 rounded shadow-sm overflow-hidden bg-white" viewBox="0 0 900 600">
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

// ==========================================
// SESUAIKAN BASE URL INI DENGAN BACKEND ANDA
// ==========================================
// Jika Anda punya file .env, gunakan process.env.NEXT_PUBLIC_API_URL
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'; 

export default function DaftarKomikPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  
  // State Filter & Search
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('Semua');
  const [selectedSort, setSelectedSort] = useState('Terbaru');
  
  // State Data API
  const [comics, setComics] = useState<LatestMangaItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalRecord, setTotalRecord] = useState(0);

  // 3. Fungsi FETCH ke API ASLI
  const fetchComics = async (page: number) => {
    setIsLoading(true);
    try {
      // Endpoint yang Anda berikan: GET /comic/shinigami/latest?page=&page_size=
      const response = await fetch(`${API_BASE_URL}/comic/shinigami/latest?page=${page}&page_size=20`);
      const result = await response.json();

      if (result.status === 'success') {
        // Memaksa label tipe menjadi "Mirror" untuk data dari Shinigami
        const mappedData = result.data.map((comic: LatestMangaItem) => ({
          ...comic,
          type: 'Mirror' as const
        }));
        
        setComics(mappedData);
        setTotalPages(result.pagination.total_pages);
        setTotalRecord(result.pagination.total_record);
      } else {
        console.error("API merespons tetapi gagal mendapatkan data", result);
      }
    } catch (error) {
      console.error("Gagal melakukan fetch ke API:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // 4. Trigger Fetch saat Halaman berubah
  useEffect(() => {
    fetchComics(currentPage);
  }, [currentPage]);

  // Fungsi navigasi klik Next / Prev
  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // 5. Filter Lokal (berlaku untuk 20 data yang sedang di-render)
  const filteredComics = comics.filter(comic => {
    const matchesSearch = comic.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = selectedStatus === 'Semua' || comic.status === selectedStatus;
    return matchesSearch && matchesStatus;
  });

  if (selectedSort === 'Rating Tertinggi') {
    filteredComics.sort((a, b) => (b.rating || 0) - (a.rating || 0));
  } else if (selectedSort === 'Paling Populer') {
    filteredComics.sort((a, b) => b.views - a.views);
  }

  return (
    <div className="min-h-screen bg-[#0f0f11] text-zinc-300 font-sans flex flex-col">
      
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
            <Link href="/" className="text-zinc-400 hover:text-purple-400 transition">Beranda</Link>
            <Link href="/daftar-komik" className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500 font-bold transition border-b-2 border-purple-500 pb-1">Daftar Komik</Link>
            <Link href="/project" className="text-zinc-400 hover:text-purple-400 transition">Project Kami</Link>
            <Link href="/bookmark" className="text-zinc-400 hover:text-purple-400 transition flex items-center gap-1">
              <BookMarked className="w-4 h-4" /> Bookmark
            </Link>
          </div>

          <div className="flex items-center gap-4">
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

      {/* HEADER */}
      <div className="bg-[#16151a] border-b border-purple-900/30 py-10 px-4 text-center">
        <h1 className="text-3xl md:text-4xl font-extrabold text-white mb-2">
          Daftar <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">Komik Terbaru</span>
        </h1>
        <p className="text-sm text-zinc-400 max-w-xl mx-auto">
          {totalRecord > 0 
            ? `Menampilkan koleksi lengkap manga, manhwa, dan manhua terupdate. (Total Komik: ${totalRecord})`
            : "Mengambil data komik terbaru..."}
        </p>
      </div>

      {/* TOOLBAR */}
      <div className="max-w-[1400px] mx-auto px-4 py-6 w-full">
        <div className="flex flex-col md:flex-row gap-4 justify-between items-center bg-[#16151a] border border-zinc-800 rounded-xl p-4 mb-8 shadow-lg">
          
          <div className="relative flex items-center w-full md:max-w-md">
            <input 
              type="text" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Cari judul komik..." 
              className="w-full bg-[#0f0f11] border border-zinc-700 focus:border-purple-500 rounded-lg px-4 py-2.5 text-sm text-white outline-none pl-10 transition shadow-inner"
            />
            <Search className="w-4 h-4 text-zinc-500 absolute left-3" />
          </div>

          <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold text-zinc-400">Status:</span>
              <select 
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="bg-[#0f0f11] border border-zinc-700 focus:border-purple-500 rounded-lg px-3 py-2 text-xs text-zinc-200 outline-none cursor-pointer"
              >
                <option value="Semua">Semua</option>
                <option value="Ongoing">Ongoing</option>
                <option value="Completed">Completed</option>
                <option value="Hiatus">Hiatus</option>
              </select>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold text-zinc-400">Urutkan:</span>
              <select 
                value={selectedSort}
                onChange={(e) => setSelectedSort(e.target.value)}
                className="bg-[#0f0f11] border border-zinc-700 focus:border-purple-500 rounded-lg px-3 py-2 text-xs text-zinc-200 outline-none cursor-pointer"
              >
                <option value="Terbaru">Terbaru</option>
                <option value="Rating Tertinggi">Rating Tertinggi</option>
                <option value="Paling Populer">Paling Populer</option>
              </select>
            </div>
          </div>
        </div>

        {/* AREA KONTEN (Loading State / Data Grid) */}
        {isLoading ? (
          // LOADING SKELETON
          <div className="flex flex-col items-center justify-center py-20">
            <Loader2 className="w-10 h-10 text-purple-500 animate-spin mb-4" />
            <p className="text-zinc-400 font-medium">Memuat komik dari server...</p>
          </div>
        ) : filteredComics.length === 0 ? (
          // JIKA DATA KOSONG
          <div className="flex flex-col items-center justify-center py-20 text-zinc-500">
            <Search className="w-12 h-12 mb-3 opacity-30" />
            <p>Tidak ada komik yang ditemukan.</p>
          </div>
        ) : (
          // GRID DATA API
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-5 gap-5 mb-10">
            {filteredComics.map((comic) => (
              <Link href={`/comic/${comic.manga_id}`} key={comic.manga_id} className="bg-[#16151a] rounded-lg border border-zinc-800 overflow-hidden hover:border-purple-500 transition duration-300 group flex flex-col h-full shadow-lg">
                <div className="relative aspect-[2/3] overflow-hidden bg-zinc-900">
                  <img src={comic.cover_portrait || comic.cover} alt={comic.title} className="w-full h-full object-cover group-hover:scale-105 transition duration-500" />
                  
                  <div className="absolute top-2 left-2 flex items-center gap-1 drop-shadow-md">
                    {getFlagSvg(comic.format)}
                  </div>

                  <div className="absolute top-2 right-2 text-[9px] font-bold px-1.5 py-0.5 rounded shadow-md backdrop-blur-sm bg-zinc-600/90 text-white">
                    {comic.type}
                  </div>

                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/95 via-black/60 to-transparent p-2 pt-10 flex justify-between items-end">
                    <span className="text-xs font-bold text-purple-400 drop-shadow-md">Ch. {comic.latest_chapter}</span>
                    {comic.rating && (
                      <div className="flex items-center gap-1 bg-black/60 text-[10px] font-bold px-1.5 py-0.5 rounded text-white backdrop-blur-sm border border-zinc-700/50">
                        <Star className="w-2.5 h-2.5 text-yellow-400 fill-yellow-400" /> {comic.rating}
                      </div>
                    )}
                  </div>
                </div>
                
                <div className="p-3 flex flex-col flex-1">
                  <h3 className="font-semibold text-white text-[13px] line-clamp-2 leading-snug mb-1.5 group-hover:text-purple-400 transition" title={comic.title}>
                    {comic.title}
                  </h3>
                  
                  <div className="flex items-center justify-between text-[10px] text-zinc-500 mb-2">
                    <div className="flex items-center gap-1">
                      <Eye className="w-3 h-3 text-purple-500/70" />
                      <span>{formatViews(comic.views)} views</span>
                    </div>
                  </div>

                  <div className="mt-auto flex flex-wrap gap-1">
                    {comic.genres?.slice(0, 2).map((genre, idx) => (
                      <span key={idx} className="text-[9px] text-zinc-400 bg-zinc-800/80 px-1.5 py-0.5 rounded">
                        {genre.name}
                      </span>
                    ))}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}

        {/* PAGINATION CONTROLS */}
        {!isLoading && totalPages > 1 && (
          <div className="flex justify-center items-center gap-2 mb-16 flex-wrap">
            <button 
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="bg-[#16151a] hover:bg-zinc-800 disabled:opacity-40 text-white border border-zinc-700 px-4 py-2 rounded-lg text-xs font-semibold transition flex items-center gap-1 cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4" /> Sebelumnya
            </button>

            <span className="text-xs text-zinc-400 px-3">
              Halaman <strong className="text-white">{currentPage}</strong> dari <strong className="text-white">{totalPages}</strong>
            </span>

            <button 
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="bg-[#16151a] hover:bg-zinc-800 disabled:opacity-40 text-white border border-zinc-700 px-4 py-2 rounded-lg text-xs font-semibold transition flex items-center gap-1 cursor-pointer"
            >
              Selanjutnya <ChevronRight className="w-4 h-4" />
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
            Stynxveil adalah website baca komik online gratis berbahasa Indonesia. Koleksi lengkap manga, manhwa, dan manhua terupdate.
          </p>
          <p className="mt-2 text-[11px]">© {new Date().getFullYear()} Stynxveil. All Rights Reserved.</p>
        </div>
      </footer>
    </div>
  );
}