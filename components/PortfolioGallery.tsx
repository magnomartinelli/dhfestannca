import React, { useState, useEffect } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, A11y, Autoplay } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

// Função para converter link do Drive em link direto de imagem
const getDirectLink = (url: string) => {
  if (url.includes('drive.google.com')) {
    const id = url.split('/d/')[1]?.split('/')[0] || url.split('id=')[1]?.split('&')[0];
    return `https://lh3.googleusercontent.com/d/${id}`;
  }
  return url;
};

const portfolioImages = [
  {
    url: "/portfolio/portf1.webp",
  },
  {
    url: "/portfolio/portf2.webp",

  },
  {
    url: "/portfolio/portf3.webp",

  },
  {
    url: "/portfolio/portf4.webp",

  },
  {
    url: "/portfolio/portf5.webp",

  },
  {
    url: "/portfolio/portf6.webp",

  },
  {
    url: "/portfolio/portf7.webp",

  },
];

const PortfolioGallery: React.FC = () => {
  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-12 md:py-24">
      <div className="text-center mb-10 md:mb-16">
        <span className="text-xs md:text-sm font-bold tracking-widest text-[#ee2bad] uppercase mb-3 block">Nosso Trabalho</span>
        <h2 className="text-3xl md:text-5xl font-black text-slate-900 font-display tracking-tight">Portfólio dhFestannça</h2>
        <p className="mt-4 text-slate-500 max-w-2xl mx-auto text-sm md:text-base font-medium">Deslize para ver detalhes das nossas decorações e como transformamos espaços em ambientes mágicos.</p>
      </div>

      <div className="relative w-full bg-white rounded-2xl md:rounded-3xl shadow-xl border border-slate-100/50 overflow-hidden flex flex-col md:flex-row">

        {/* Carousel Area */}
        <div className="relative w-full bg-slate-50 flex items-center justify-center p-2 md:p-4">

          <Swiper
            modules={[Navigation, Pagination, A11y, Autoplay]}
            spaceBetween={20}
            slidesPerView={1}
            navigation={{
              prevEl: '.swiper-button-prev-custom',
              nextEl: '.swiper-button-next-custom',
            }}
            pagination={{ clickable: true, dynamicBullets: true }}
            loop={true}
            autoplay={{
              delay: 3500,
              disableOnInteraction: false,
            }}
            className="w-full h-full rounded-2xl overflow-hidden shadow-lg"
            breakpoints={{
              640: { slidesPerView: 1 },
              768: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}
          >
            {portfolioImages.map((img, idx) => (
              <SwiperSlide key={idx} className="flex flex-col h-full bg-transparent rounded-2xl overflow-hidden group cursor-grab active:cursor-grabbing shadow-sm border border-black/5 dark:border-white/5">
                {/* Image 1x1 Container Only */}
                <div className="relative w-full aspect-square overflow-hidden bg-gray-200">
                  <img
                    src={getDirectLink(img.url)}
                    alt={`Portfolio ${idx + 1}`}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                  />
                  {/* Subtle inner shadow for depth */}
                  <div className="absolute inset-0 ring-1 ring-inset ring-black/10 rounded-2xl"></div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Custom Navigation */}
          <div className="absolute inset-y-0 left-2 md:left-4 flex items-center z-10 pointer-events-none">
            <button className="swiper-button-prev-custom p-2 md:p-3 bg-white hover:bg-white/90 text-slate-800 rounded-full shadow-lg transition-all pointer-events-auto active:scale-95 group">
              <ChevronLeft size={24} className="group-hover:-translate-x-0.5 transition-transform" />
            </button>
          </div>
          <div className="absolute inset-y-0 right-2 md:right-4 flex items-center z-10 pointer-events-none">
            <button className="swiper-button-next-custom p-2 md:p-3 bg-white hover:bg-white/90 text-slate-800 rounded-full shadow-lg transition-all pointer-events-auto active:scale-95 group">
              <ChevronRight size={24} className="group-hover:translate-x-0.5 transition-transform" />
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};

export default PortfolioGallery;