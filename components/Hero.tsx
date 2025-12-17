import React from 'react';
import { Sparkles, ArrowRight, Heart, Balloon, Palette } from 'lucide-react';

interface HeroProps {
  onCtaClick: () => void;
}

const Hero: React.FC<HeroProps> = ({ onCtaClick }) => {
  return (
    <section className="relative w-full pt-12 md:pt-20 pb-20 md:pb-28 flex flex-col items-center text-center px-4 overflow-hidden">
      <div className="inline-flex items-center gap-2 px-4 md:px-5 py-2 md:py-2.5 rounded-full bg-pink-100/60 border border-pink-200 text-pink-600 text-[10px] md:text-sm font-bold tracking-widest uppercase mb-6 md:mb-10 animate-float-slow backdrop-blur-md">
        <Sparkles size={16} className="text-yellow-500" />
        Decorações que Contam Histórias
      </div>

      <h1 className="text-4xl md:text-7xl lg:text-8xl font-black text-slate-900 leading-[1.2] md:leading-[1.1] mb-6 md:mb-8 font-display tracking-tight">
        Transformamos Sonhos em <br />
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500">
          Memórias Eternas
        </span>
      </h1>

      <p className="max-w-2xl text-lg md:text-2xl text-slate-600 mb-10 md:mb-14 leading-relaxed font-medium px-2">
        Sua celebração merece mais que balões. Criamos universos mágicos e personalizados que traduzem sentimentos em cada detalhe.
      </p>

      <button
        onClick={onCtaClick}
        className="group relative w-full max-w-xs md:max-w-none md:w-auto px-8 md:px-12 py-5 md:py-7 bg-gradient-to-r from-pink-500 via-fuchsia-500 to-purple-600 text-white rounded-2xl md:rounded-3xl font-black text-lg md:text-xl shadow-[0_20px_40px_-15px_rgba(236,72,153,0.5)] hover:shadow-[0_30px_60px_-12px_rgba(236,72,153,0.6)] transition-all hover:scale-105 active:scale-95 flex items-center justify-center gap-3 md:gap-5 border-b-[4px] md:border-b-[6px] border-purple-800"
      >
        <span className="tracking-wide">QUERO MINHA FESTA MÁGICA</span>
        <ArrowRight className="group-hover:translate-x-3 transition-transform hidden md:block" strokeWidth={3} />

        <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:animate-[shimmer_2s_infinite]"></div>
      </button>

      <div className="mt-16 md:mt-20 flex flex-wrap justify-center items-center gap-4 md:gap-8 text-slate-400 text-[10px] md:text-xs font-bold tracking-[0.1em] md:tracking-[0.2em] uppercase">
        <span className="flex items-center gap-1.5 bg-white/40 px-3 md:px-5 py-2 md:py-2.5 rounded-lg md:rounded-xl border border-white/50 shadow-sm"><Palette size={12} className="text-pink-400" /> ARTE EXCLUSIVA</span>
        <span className="flex items-center gap-1.5 bg-white/40 px-3 md:px-5 py-2 md:py-2.5 rounded-lg md:rounded-xl border border-white/50 shadow-sm"><Balloon size={12} className="text-blue-400" /> BALLOON DESIGN</span>
        <span className="flex items-center gap-1.5 bg-white/40 px-3 md:px-5 py-2 md:py-2.5 rounded-lg md:rounded-xl border border-white/50 shadow-sm"><Heart size={12} className="text-purple-400" /> AFETO REAL</span>
      </div>

      <style>{`
        @keyframes shimmer {
          100% { transform: translateX(100%); }
        }
      `}</style>
    </section>
  );
};

export default Hero;