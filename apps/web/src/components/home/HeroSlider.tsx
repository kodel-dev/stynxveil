import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { Star, PlayCircle, Info } from 'lucide-react';
import { HeroSlide } from '@/data/dummy';

interface HeroSliderProps {
  slides: HeroSlide[];
}

export const HeroSlider = ({ slides }: HeroSliderProps) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const slideIntervalRef = useRef<NodeJS.Timeout | null>(null);

  const startAutoSlide = () => {
    if (slideIntervalRef.current) clearInterval(slideIntervalRef.current);
    if (slides.length === 0) return;
    slideIntervalRef.current = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6000);
  };

  useEffect(() => {
    startAutoSlide();
    return () => {
      if (slideIntervalRef.current) clearInterval(slideIntervalRef.current);
    };
  }, [slides.length]);

  const handleDotClick = (index: number) => {
    setCurrentSlide(index);
    startAutoSlide();
  };

  const activeSlide = slides[currentSlide] || slides[0];

  if (!activeSlide) return null;

  return (
    <header className="relative w-full max-w-[1400px] mx-auto md:my-6 px-0 md:px-4 group">
      <div className="relative w-full h-[320px] sm:h-[380px] md:h-[420px] md:rounded-2xl border-b md:border border-cyan-500/30 bg-[#0c0b0e] overflow-visible md:shadow-[0_0_30px_rgba(147,51,234,0.15)]">
        <div className="absolute inset-0 z-0 overflow-hidden md:rounded-2xl pointer-events-none">
          <img src={activeSlide.background_image} alt={`Background ${activeSlide.title}`} className="w-full h-full object-cover opacity-30 md:opacity-40 scale-105 transition-all duration-700" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0c0b0e] via-[#0c0b0e]/90 to-[#0c0b0e]/40 md:to-transparent" />
        </div>
        
        <div className="relative z-10 w-full h-full flex items-center px-5 md:px-12 overflow-visible">
          <div className="w-[65%] md:w-[60%] flex flex-col justify-center z-30">
            <div className="flex flex-wrap items-center gap-1.5 md:gap-2 mb-2 md:mb-3">
              <div className="inline-flex items-center gap-1 bg-[#1e1935] text-yellow-400 border border-yellow-500/40 text-[10px] md:text-xs font-bold px-2 py-0.5 rounded-md uppercase tracking-wider backdrop-blur-md">
                <Star className="w-2.5 h-2.5 fill-yellow-400" /> {activeSlide.rating}
              </div>
              {activeSlide.badges?.map((badge, idx) => (
                <span 
                  key={idx} 
                  className="text-[9px] md:text-[10px] font-bold text-white px-2 py-0.5 rounded-md shadow-md uppercase tracking-wider"
                  style={{ backgroundColor: badge.color }}
                >
                  {badge.name}
                </span>
              ))}
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-5xl font-extrabold text-white mb-1.5 md:mb-2 leading-tight drop-shadow-[0_4px_10px_rgba(0,0,0,1)] tracking-wide line-clamp-3">
              {activeSlide.title}
            </h2>
            <p className="text-zinc-300 text-[10px] sm:text-xs md:text-sm line-clamp-3 mb-4 md:mb-6 leading-relaxed drop-shadow-md">
              {activeSlide.description}
            </p>
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 md:gap-3.5">
              <Link href={`/read/${activeSlide.manga_id}-1`} className="bg-gradient-to-r from-cyan-600 to-purple-600 hover:from-cyan-500 hover:to-purple-500 text-white px-4 md:px-6 py-2 md:py-3 rounded-xl font-bold text-xs md:text-sm transition-all shadow-[0_4px_20px_rgba(34,211,238,0.4)] flex items-center gap-2 hover:scale-105">
                <PlayCircle className="w-4 h-4 md:w-5 md:h-5" /> Baca Sekarang
              </Link>
              <Link href={`/comic/${activeSlide.manga_id}`} className="bg-[#1e1b24]/90 hover:bg-[#2a2633] text-cyan-400 px-4 md:px-6 py-2 md:py-3 rounded-xl font-bold text-xs md:text-sm transition-all shadow-lg flex items-center gap-2 backdrop-blur-md border border-cyan-500/30">
                <Info className="w-4 h-4 md:w-5 md:h-5" /> Detail Komik
              </Link>
            </div>
          </div>

          <div className="absolute right-0 top-0 bottom-0 h-full w-[45%] md:w-[50%] flex items-end justify-end z-20 pointer-events-none">
            <img 
              src={activeSlide.chara_image} 
              alt={`Karakter utama ${activeSlide.title}`} 
              className="absolute right-[-10px] md:right-0 bottom-[-5px] md:bottom-[-10px] top-[-20px] md:top-[-70px] w-auto h-[110%] md:h-[130%] max-w-none object-contain transition-all duration-700 select-none drop-shadow-[0_0_20px_rgba(168,85,247,0.5)]"
              style={{ WebkitMaskImage: 'linear-gradient(to bottom, rgba(0,0,0,1) 80%, rgba(0,0,0,0) 100%)' }}
            />
          </div>
        </div>
        
        <div className="absolute bottom-3 md:bottom-4 left-5 md:left-12 z-50 flex gap-2">
          {slides.map((slide, index) => (
            <button 
              key={slide.id} 
              aria-label={`Slide komik ${index + 1}`}
              onClick={() => handleDotClick(index)} 
              className={`h-1.5 md:h-2 rounded-full transition-all duration-300 cursor-pointer ${currentSlide === index ? 'bg-gradient-to-r from-cyan-400 to-purple-500 w-5 md:w-6 shadow-[0_0_8px_rgba(34,211,238,0.8)]' : 'bg-zinc-600 w-1.5 md:w-2 hover:bg-purple-400'}`} 
            />
          ))}
        </div>
      </div>
    </header>
  );
};
