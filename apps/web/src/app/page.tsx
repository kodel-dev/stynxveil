// apps/web/src/app/page.tsx
'use client';

import { useState, useEffect, useRef } from 'react';
import { Search, Flame, Clock, Star, Eye, ChevronRight, ChevronLeft, Menu, BookMarked, User, PlayCircle, Info, ShieldAlert, MessageSquare, Heart, Trophy, BookOpen, Gem, MessageCircle } from 'lucide-react';
import Link from 'next/link';

type ComicType = 'Manga' | 'Manhwa' | 'Manhua';
type ComicSource = 'Project' | 'Mirror';

interface HeroSlide {
  id: number;
  title: string;
  genres: string;
  description: string;
  bgImage: string;        
  characterImage: string; 
}

interface HotComic {
  id: number;
  title: string;
  type: ComicType;
  source: ComicSource;
  rating: number;
  chapter: string;
  views: string;
  cover: string;
}

interface ChapterUpdate {
  num: string;
  time: string;
  isNew?: boolean;
}

interface LatestComic {
  id: number;
  title: string;
  type: ComicType;
  source: ComicSource;
  rating: string;
  views: string;
  chapters: ChapterUpdate[];
  cover: string;
}

interface PopularComic {
  id: number;
  title: string;
  genres: string;
  rating: number;
  views: string;
  cover: string;
}

interface TopComment {
  id: number;
  username: string;
  avatar: string;
  comicId: number;
  comicTitle: string;
  text: string;
  likes: number;
  timeAgo: string;
}

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

const initialHeroSlides: HeroSlide[] = [
  { 
    id: 1, 
    title: 'Solo Leveling', 
    genres: 'Action, Fantasy, System', 
    description: '10 tahun lalu, gerbang yang menghubungkan dunia manusia dan monster terbuka. Seong Jin-Woo, Hunter peringkat E, mempertaruhkan nyawanya di dungeon level terendah untuk biaya rumah sakit ibunya.', 
    bgImage: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1600&auto=format&fit=crop',
    characterImage: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?q=80&w=1000&auto=format&fit=crop'
  },
  { 
    id: 2, 
    title: 'Omniscient Reader Viewpoint', 
    genres: 'Action, Survival, Magic', 
    description: 'Kim Dokja, seorang pembaca novel web yang tamat setelah 10 tahun. Tiba-tiba, dunia berubah menjadi persis seperti novel yang ia baca. Dan hanya dia yang tahu akhir dari dunia ini.', 
    bgImage: 'https://images.unsplash.com/photo-1579546929518-9e396f3cc809?q=80&w=1600&auto=format&fit=crop',
    characterImage: 'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?q=80&w=1000&auto=format&fit=crop'
  }
];

const hotComics: HotComic[] = [
  { id: 1, title: 'Solo Leveling: Ragnarok', type: 'Manhwa', source: 'Project', rating: 9.8, chapter: 'Ch. 24', views: '2.5M', cover: 'https://picsum.photos/seed/solo/400/600' },
  { id: 2, title: 'One Piece', type: 'Manga', source: 'Mirror', rating: 9.9, chapter: 'Ch. 1105', views: '15.2M', cover: 'https://picsum.photos/seed/op/400/600' },
  { id: 3, title: 'Martial Peak', type: 'Manhua', source: 'Project', rating: 8.5, chapter: 'Ch. 3500', views: '8.1M', cover: 'https://picsum.photos/seed/mp/400/600' },
  { id: 4, title: 'Wind Breaker', type: 'Manhwa', source: 'Mirror', rating: 9.5, chapter: 'Ch. 480', views: '3.4M', cover: 'https://picsum.photos/seed/wind/400/600' },
  { id: 5, title: 'Jujutsu Kaisen', type: 'Manga', source: 'Project', rating: 9.6, chapter: 'Ch. 250', views: '9.8M', cover: 'https://picsum.photos/seed/jjk/400/600' },
  { id: 6, title: 'Nano Machine', type: 'Manhwa', source: 'Project', rating: 9.7, chapter: 'Ch. 190', views: '4.1M', cover: 'https://picsum.photos/seed/nano6/400/600' },
  { id: 7, title: 'Chainsaw Man', type: 'Manga', source: 'Mirror', rating: 9.3, chapter: 'Ch. 155', views: '6.7M', cover: 'https://picsum.photos/seed/csm7/400/600' },
  { id: 8, title: 'Library of Heaven\'s Path', type: 'Manhua', source: 'Mirror', rating: 8.8, chapter: 'Ch. 520', views: '1.9M', cover: 'https://picsum.photos/seed/lhp8/400/600' },
];

const latestUpdates: LatestComic[] = Array.from({ length: 15 }).map((_, i) => {
  const type: ComicType = i % 3 === 0 ? 'Manga' : i % 2 === 0 ? 'Manhua' : 'Manhwa';
  const source: ComicSource = i % 4 === 0 ? 'Project' : 'Mirror';
  return {
    id: i + 10,
    title: `Judul Komik ${i + 1} Yang Sangat Seru dan Panjang`,
    type: type,
    source: source,
    rating: (Math.random() * 2 + 8).toFixed(1),
    views: `${(Math.random() * 800 + 100).toFixed(0)}K`,
    chapters: [
      { num: `Ch. ${100 - i}`, time: '2 jam lalu', isNew: true },
      { num: `Ch. ${99 - i}`, time: '1 hari lalu', isNew: false }
    ],
    cover: `https://picsum.photos/seed/comic-new-${i}/300/400`
  };
});

const popularComics: PopularComic[] = [
  { id: 101, title: 'Omniscient Reader Viewpoint', genres: 'Action, Fantasy', rating: 9.7, views: '12.4M', cover: 'https://picsum.photos/seed/orv/200/300' },
  { id: 102, title: 'Nano Machine', genres: 'Action, Murim', rating: 9.5, views: '9.1M', cover: 'https://picsum.photos/seed/nano/200/300' },
  { id: 103, title: 'The Beginning After The End', genres: 'Fantasy, Magic', rating: 9.6, views: '14.2M', cover: 'https://picsum.photos/seed/tbate/200/300' },
];

const topComments: TopComment[] = [
  { id: 1, username: 'ShadowMonarch', avatar: 'https://picsum.photos/seed/user1/100', comicId: 1, comicTitle: 'Solo Leveling', text: 'Sumpah artnya gila banget chapter ini! Berinding bacanya parah 🔥', likes: 2450, timeAgo: '2 jam lalu' },
  { id: 2, username: 'DokjaReader', avatar: 'https://picsum.photos/seed/user2/100', comicId: 2, comicTitle: 'Omniscient Reader Viewpoint', text: 'Gak sabar nunggu Dokja ketemu Yoo Joonghyuk lagi, plotnya makin kesini makin mindblowing 😭', likes: 1892, timeAgo: '5 jam lalu' },
  { id: 3, username: 'PirateKing', avatar: 'https://picsum.photos/seed/user3/100', comicId: 2, comicTitle: 'One Piece', text: 'Oda sensei emang ga pernah gagal bikin plot twist, chapter 1105 ini gila beneran!', likes: 1321, timeAgo: '1 hari lalu' },
];

// Data Dummy Peringkat Komunitas
const communityLeaders = [
  { id: 1, category: 'Top Pembaca', name: 'KutuBuku99', avatar: 'https://picsum.photos/seed/reader/100', value: '4,521 Chapter', icon: BookOpen, color: 'text-blue-400', bg: 'bg-blue-500/20' },
  { id: 2, category: 'Top Donatur', name: 'SultanKhilaf', avatar: 'https://picsum.photos/seed/sultan/100', value: 'Rp 5.500.000', icon: Gem, color: 'text-yellow-400', bg: 'bg-yellow-500/20' },
  { id: 3, category: 'Top Komentator', name: 'SiPalingSuhu', avatar: 'https://picsum.photos/seed/commenter/100', value: '2,134 Komentar', icon: MessageCircle, color: 'text-green-400', bg: 'bg-green-500/20' },
];

const genres: string[] = ['Action', 'Adventure', 'Comedy', 'Drama', 'Fantasy', 'Isekai', 'Magic', 'Martial Arts', 'Mecha', 'Mystery', 'Romance', 'School Life', 'Sci-Fi', 'Shounen'];

export default function HomePage() {
  const [heroSlides, setHeroSlides] = useState<HeroSlide[]>(initialHeroSlides);
  const [currentSlide, setCurrentSlide] = useState(0);
  
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const slideIntervalRef = useRef<NodeJS.Timeout | null>(null);

  const startAutoSlide = () => {
    if (slideIntervalRef.current) clearInterval(slideIntervalRef.current);
    slideIntervalRef.current = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);
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

  const activeSlide = heroSlides[currentSlide] || heroSlides[0];

  return (
    <div className="min-h-screen bg-[#0f0f11] text-zinc-300 font-sans">
      
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

      {/* 2. HERO SLIDER UTAMA */}
      <div className="relative w-full max-w-[1400px] mx-auto my-6 px-4 group">
        <div className="relative w-full h-[400px] md:h-[440px] rounded-2xl border border-purple-500/20 shadow-[0_0_30px_rgba(147,51,234,0.1)] bg-[#0c0b0e] overflow-visible">
          
          <button 
            onClick={prevSlide} 
            className="absolute left-3 top-1/2 -translate-y-1/2 z-50 bg-black/60 hover:bg-black/90 text-white p-2 rounded-full backdrop-blur-md border border-zinc-700/50 transition opacity-0 group-hover:opacity-100 cursor-pointer"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button 
            onClick={nextSlide} 
            className="absolute right-3 top-1/2 -translate-y-1/2 z-50 bg-black/60 hover:bg-black/90 text-white p-2 rounded-full backdrop-blur-md border border-zinc-700/50 transition opacity-0 group-hover:opacity-100 cursor-pointer"
          >
            <ChevronRight className="w-5 h-5" />
          </button>

          {/* LAYER 1: BACKGROUND UTAMA */}
          <div className="absolute inset-0 z-0 overflow-hidden rounded-2xl pointer-events-none">
            <img 
              src={activeSlide.bgImage} 
              alt={activeSlide.title} 
              className="w-full h-full object-cover opacity-50 scale-105 transition-all duration-700" 
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#0c0b0e] via-[#0c0b0e]/85 to-purple-900/10" />
          </div>

          {/* LAYER 2: KONTEN UTAMA */}
          <div className="relative z-10 w-full h-full grid grid-cols-1 md:grid-cols-12 items-center px-6 md:px-12 overflow-visible">
            
            <div className="md:col-span-7 flex flex-col justify-center z-20 pr-0 md:pr-4">
              <div className="inline-flex items-center gap-1.5 bg-[#1e1935] text-[#c084fc] border border-[#a855f7]/40 text-xs font-bold px-3 py-1 rounded-md w-fit mb-3 uppercase tracking-wider backdrop-blur-md shadow-[0_0_15px_rgba(168,85,247,0.3)]">
                <Star className="w-3.5 h-3.5 fill-[#c084fc]" /> TERBAIK BULAN INI
              </div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white mb-2 leading-tight drop-shadow-[0_4px_10px_rgba(0,0,0,0.8)] tracking-wide">
                {activeSlide.title}
              </h1>
              <p className="text-xs md:text-sm text-purple-300 mb-3 font-semibold tracking-wide">{activeSlide.genres}</p>
              <p className="hidden sm:block text-zinc-200 text-xs md:text-sm line-clamp-2 md:line-clamp-3 mb-6 leading-relaxed max-w-xl drop-shadow">
                {activeSlide.description}
              </p>
              
              <div className="flex items-center gap-3.5">
                <Link href={`/read/${activeSlide.id}-1`} className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white px-6 py-3 rounded-xl font-bold text-sm transition-all shadow-[0_4px_20px_rgba(147,51,234,0.4)] flex items-center gap-2 hover:scale-105">
                  <PlayCircle className="w-5 h-5" /> Baca Sekarang
                </Link>
                <Link href={`/comic/${activeSlide.id}`} className="bg-[#1e1b24]/90 hover:bg-[#2a2633] text-white px-6 py-3 rounded-xl font-bold text-sm transition-all shadow-lg flex items-center gap-2 backdrop-blur-md border border-purple-500/30">
                  <Info className="w-5 h-5 text-zinc-400" /> Detail
                </Link>
              </div>
            </div>

            {/* LAYER 3: KARAKTER POP-OUT */}
            <div className="md:col-span-5 absolute right-0 top-0 bottom-0 h-full flex items-end justify-end z-40 overflow-visible pointer-events-none">
              <div className="relative w-[380px] md:w-[520px] h-full flex items-end justify-end overflow-visible">
                <img 
                  src={activeSlide.characterImage} 
                  alt={activeSlide.title} 
                  className="absolute right-[-10px] bottom-[-45px] md:bottom-[-65px] top-[-35px] md:top-[-55px] w-auto h-[130%] md:h-[140%] max-w-none object-contain drop-shadow-[-40px_20px_60px_rgba(0,0,0,0.99)] transition-all duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-[#0c0b0e] via-transparent to-transparent opacity-60 pointer-events-none" />
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
        
        {/* 3. HOT COMICS BANNER */}
        <section className="mb-10 relative">
          <div className="flex items-center justify-between border-b border-purple-900/30 pb-2 mb-4">
            <div className="flex items-center gap-2">
              <Flame className="w-5 h-5 text-red-500" />
              <h2 className="text-lg font-bold text-white uppercase tracking-wider">Project Hot Bulan Ini</h2>
            </div>
            
            <div className="flex items-center gap-1.5">
              <button onClick={() => scrollHot('left')} className="bg-zinc-800 hover:bg-purple-600 text-zinc-200 p-2 rounded transition border border-zinc-700 hover:border-purple-500 cursor-pointer">
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button onClick={() => scrollHot('right')} className="bg-zinc-800 hover:bg-purple-600 text-zinc-200 p-2 rounded transition border border-zinc-700 hover:border-purple-500 cursor-pointer">
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
          
          <div ref={hotSliderRef} className="flex gap-4 overflow-x-auto no-scrollbar scroll-smooth pb-3 pt-1 px-1">
            {hotComics.map((comic) => (
              <Link href={`/comic/${comic.id}`} key={comic.id} className="group relative rounded-lg overflow-hidden bg-[#16151a] border border-zinc-800 hover:border-purple-500/50 transition duration-300 min-w-[170px] sm:min-w-[200px] md:min-w-[220px] shrink-0 shadow-lg">
                <div className="aspect-[3/4] relative">
                  <img src={comic.cover} alt={comic.title} className="w-full h-full object-cover group-hover:scale-105 transition duration-300" />
                  <div className="absolute top-2 left-2 flex items-center gap-1 drop-shadow-md">
                    {getFlagSvg(comic.type)}
                    <span className={`text-[9px] font-bold text-white px-1.5 py-0.5 rounded shadow-md backdrop-blur-sm ${comic.source === 'Project' ? 'bg-gradient-to-r from-blue-600 to-purple-600' : 'bg-zinc-600/90'}`}>
                      {comic.source}
                    </span>
                  </div>
                  <div className="absolute bottom-2.5 right-2.5 flex items-center gap-1 bg-black/80 backdrop-blur-sm text-xs font-bold px-2 py-0.5 rounded text-white border border-zinc-700/50">
                    <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" /> {comic.rating}
                  </div>
                </div>

                <div className="p-3 bg-gradient-to-t from-[#16151a] via-[#16151a]/95 to-transparent absolute bottom-0 w-full pt-9">
                  <h3 className="font-semibold text-white text-sm line-clamp-1 group-hover:text-purple-400 transition drop-shadow-md">{comic.title}</h3>
                  <div className="flex justify-between items-center text-xs text-zinc-400 mt-1.5 font-medium">
                    <span className="text-purple-400">{comic.chapter}</span>
                    <span className="flex items-center gap-1"><Eye className="w-3.5 h-3.5" /> {comic.views}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* 4. DUA KOLOM LAYOUT */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          
          {/* KOLOM KIRI */}
          <div className="lg:col-span-3">
            <div className="flex items-center justify-between border-b border-purple-900/30 pb-2 mb-4">
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-purple-400" />
                <h2 className="text-lg font-bold text-white uppercase tracking-wider">Update Terbaru</h2>
              </div>
              <div className="flex items-center gap-4">
                <div className="hidden sm:flex items-center gap-3 text-[11px] font-medium text-zinc-400">
                  <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-purple-500"></span> Project</span>
                  <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-zinc-500"></span> Mirror</span>
                </div>
                <Link href="/daftar-komik" className="text-xs font-medium text-zinc-400 hover:text-white bg-zinc-800/50 hover:bg-zinc-800 px-3 py-1 rounded transition flex items-center gap-1 hover:border-purple-500 border border-transparent">
                  Lihat Semua <ChevronRight className="w-3 h-3" />
                </Link>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-3">
              {latestUpdates.map((comic) => (
                <div key={comic.id} className="bg-[#16151a] rounded-md border border-zinc-800/80 overflow-hidden hover:border-purple-500/50 transition group flex flex-col h-full">
                  <Link href={`/comic/${comic.id}`} className="block relative aspect-[2/3] overflow-hidden bg-zinc-900">
                    <img src={comic.cover} alt={comic.title} className="w-full h-full object-cover group-hover:scale-105 transition duration-300" />
                    
                    <div className="absolute top-1.5 left-1.5 flex items-center gap-1 drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)]">
                      {getFlagSvg(comic.type)}
                      <span className={`text-[9px] font-bold text-white px-1.5 py-0.5 rounded shadow-md backdrop-blur-sm ${comic.source === 'Project' ? 'bg-gradient-to-r from-blue-600 to-purple-600' : 'bg-zinc-600/90'}`}>
                        {comic.source}
                      </span>
                    </div>

                    <div className="absolute bottom-1.5 right-1.5 flex items-center gap-1 bg-black/80 text-[10px] font-bold px-1.5 py-0.5 rounded text-white backdrop-blur-sm border border-zinc-700/50">
                      <Star className="w-2.5 h-2.5 text-yellow-400 fill-yellow-400" /> {comic.rating}
                    </div>
                  </Link>
                  
                  <div className="p-2 flex flex-col flex-1">
                    <Link href={`/comic/${comic.id}`}>
                      <h3 className="font-semibold text-white text-[13px] line-clamp-2 leading-snug mb-1 group-hover:text-purple-400 transition" title={comic.title}>
                        {comic.title}
                      </h3>
                    </Link>

                    <div className="flex items-center gap-1 text-[10px] text-zinc-400 mb-2">
                      <Eye className="w-3 h-3 text-zinc-500" />
                      <span>{comic.views} pembaca</span>
                    </div>
                    
                    <div className="flex flex-col gap-1 mt-auto">
                      {comic.chapters.map((ch, idx) => (
                        <Link href={`/read/${comic.id}-${ch.num}`} key={idx} className="flex justify-between items-center text-[11px] bg-[#0f0f11] hover:bg-zinc-800 p-1.5 rounded border border-transparent hover:border-purple-500/50 transition">
                          <div className="flex items-center gap-1.5">
                            <span className="font-medium text-zinc-200">{ch.num}</span>
                            {ch.isNew && (
                              <span className="bg-purple-600 text-white text-[8px] font-bold px-1 py-0.5 rounded animate-pulse shadow-[0_0_8px_rgba(168,85,247,0.6)]">
                                NEW
                              </span>
                            )}
                          </div>
                          <span className="text-zinc-500 italic text-[9px]">{ch.time}</span>
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 flex justify-center">
              <button className="bg-[#16151a] hover:bg-gradient-to-r hover:from-blue-600 hover:to-purple-600 text-white font-semibold py-2.5 px-8 rounded-md transition-all border border-zinc-800 hover:border-transparent text-sm w-full md:w-auto shadow-lg hover:shadow-[0_0_20px_rgba(147,51,234,0.4)]">
                Muat Lebih Banyak
              </button>
            </div>
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
              
              <div className="flex flex-col gap-1.5">
                {popularComics.map((comic, index) => (
                  <Link href={`/comic/${comic.id}`} key={comic.id} className="flex gap-3 group items-center">
                    <div className="text-xl font-bold text-zinc-700 italic w-5 text-center group-hover:text-purple-500 transition">
                      {index + 1}
                    </div>
                    <div className="w-12 h-16 shrink-0 rounded overflow-hidden relative shadow-md">
                      <img src={comic.cover} alt={comic.title} className="w-full h-full object-cover group-hover:scale-110 transition duration-300" />
                    </div>
                    <div className="flex flex-col justify-center flex-1 min-w-0">
                      <h3 className="text-[13px] font-semibold text-zinc-200 line-clamp-2 group-hover:text-purple-400 transition leading-tight">
                        {comic.title}
                      </h3>
                      <p className="text-[10px] text-zinc-500 mt-0.5 truncate">{comic.genres}</p>
                      <div className="flex items-center justify-between mt-1 text-[10px]">
                        <span className="flex items-center gap-1 font-bold text-white">
                          <Star className="w-2.5 h-2.5 text-yellow-400 fill-yellow-400" /> {comic.rating}
                        </span>
                        <span className="flex items-center gap-1 text-zinc-400">
                          <Eye className="w-2.5 h-2.5 text-zinc-500" /> {comic.views}
                        </span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            {/* Widget Genre */}
            <div className="bg-[#16151a] rounded-xl border border-zinc-800 p-4">
              <div className="border-b border-purple-900/30 pb-2 mb-4">
                <h2 className="text-[15px] font-bold text-white uppercase tracking-wider">Kategori Genre</h2>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {genres.map((genre) => (
                  <Link 
                    href={`/genre/${genre.toLowerCase()}`} 
                    key={genre} 
                    className="text-[11px] font-medium bg-[#0f0f11] border border-zinc-800/80 text-zinc-400 hover:text-white hover:border-purple-500 hover:bg-purple-500/20 px-2.5 py-1 rounded-md transition-all duration-200"
                  >
                    {genre}
                  </Link>
                ))}
              </div>
            </div>

            {/* Widget Komunitas / Komentar Teratas */}
            <div className="bg-[#16151a] rounded-xl border border-zinc-800 p-4">
              <div className="border-b border-purple-900/30 pb-2 mb-4">
                <h2 className="text-[15px] font-bold text-white uppercase tracking-wider flex items-center gap-2">
                  <MessageSquare className="w-4 h-4 text-cyan-400" /> Komentar Komunitas
                </h2>
              </div>
              <div className="flex flex-col gap-4">
                {topComments.map(comment => (
                  <div key={comment.id} className="flex gap-3 border-b border-zinc-800/50 pb-3 last:border-0 last:pb-0">
                    <img 
                      src={comment.avatar} 
                      alt={comment.username} 
                      className="w-8 h-8 rounded-full object-cover border border-purple-500/50" 
                    />
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
                        <span className="font-semibold text-zinc-300">{comment.likes.toLocaleString('id-ID')}</span> <span className="text-zinc-500">Suka</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Widget Papan Peringkat (Leaderboard) */}
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
                      <img 
                        src={leader.avatar} 
                        alt={leader.name} 
                        className="w-10 h-10 rounded-lg object-cover border border-zinc-700" 
                      />
                      <div className={`absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full ${leader.bg} flex items-center justify-center border border-[#16151a]`}>
                        <leader.icon className={`w-3 h-3 ${leader.color}`} />
                      </div>
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <p className="text-[10px] text-zinc-400 font-semibold mb-0.5 uppercase tracking-wide">{leader.category}</p>
                      <h4 className="text-xs font-bold text-zinc-200 truncate">{leader.name}</h4>
                      <p className={`text-[11px] font-bold ${leader.color} mt-0.5`}>{leader.value}</p>
                    </div>
                    
                    <div className="shrink-0 flex flex-col items-center">
                      <Trophy className="w-4 h-4 text-yellow-500 fill-yellow-500/20 mb-0.5" />
                      <span className="text-[9px] font-bold text-zinc-500">Rank #1</span>
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
            Stynxveil adalah website baca komik online gratis berbahasa Indonesia. Kami memiliki ribuan koleksi komik manga, manhwa, dan manhua yang di-update setiap hari. Semua komik di website ini hanya preview dari komik aslinya.
          </p>
          <p className="mt-2 text-[11px]">© {new Date().getFullYear()} Stynxveil. All Rights Reserved.</p>
        </div>
      </footer>
    </div>
  );
}