import React from 'react';
import { Sparkles, Heart, Quote } from 'lucide-react';
import SocialLinks from './SocialLinks';

const ProfileSection: React.FC = () => {
  return (
    <section className="w-full max-w-5xl mx-auto py-20 px-4 flex flex-col md:flex-row items-center gap-12">
      {/* Imagem/Logo Lateral */}
      <div className="relative flex-shrink-0">
        <div className="absolute -inset-4 bg-gradient-to-tr from-pink-400 to-blue-400 rounded-[3rem] blur-2xl opacity-20 animate-pulse"></div>
        <div className="relative w-72 h-72 md:w-[400px] md:h-[400px] rounded-[3rem] bg-white shadow-2xl overflow-hidden border-8 border-white">
           <img 
             src="/logo.png" 
             alt="Dhanndara Bonito" 
             className="w-full h-full object-cover"
             onError={(e) => {
               const target = e.currentTarget;
               target.style.display = 'none';
               if (target.parentElement) {
                 const fallback = document.createElement('div');
                 fallback.className = 'w-full h-full bg-gradient-to-br from-pink-50 to-blue-50 flex flex-col items-center justify-center p-8 text-center';
                 fallback.innerHTML = `
                   <span class="text-6xl mb-4">👑</span>
                   <span class="text-4xl font-black text-slate-800 font-display">Dhanndara</span>
                   <span class="text-pink-500 font-bold tracking-widest mt-2 uppercase text-sm">A mente por trás da magia</span>
                 `;
                 target.parentElement.appendChild(fallback);
               }
             }}
           />
        </div>
      </div>

      {/* Bio Copy */}
      <div className="flex-1 space-y-6">
        <div className="inline-flex items-center gap-2 text-pink-500 font-bold uppercase tracking-[0.2em] text-xs">
          <div className="w-8 h-[2px] bg-pink-500"></div>
          Quem faz a mágica acontecer
        </div>
        
        <h2 className="text-3xl md:text-5xl font-black text-slate-800 leading-tight font-display">
          Muito prazer, eu sou a <br />
          <span className="text-pink-600 italic">Dhanndara Bonito.</span>
        </h2>

        <div className="relative">
          <Quote className="absolute -top-4 -left-6 text-pink-100 w-12 h-12 -z-10" />
          <p className="text-lg text-slate-600 leading-relaxed font-medium">
            Mãe, esposa e apaixonada por transformar celebrações em experiências sensoriais. Como designer de balões e decoradora intuitiva, minha missão é materializar o amor em cada curva de um arco orgânico.
          </p>
        </div>

        <p className="text-slate-600 leading-relaxed">
          Para mim, decorar não é apenas organizar objetos, é criar o cenário para os momentos mais importantes da sua vida. Cada projeto da <span className="font-bold text-slate-800">dhFestannça</span> carrega um pedaço do meu coração e a promessa de uma entrega impecável.
        </p>

        <div className="pt-6 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <div>
            <p className="text-xs text-slate-400 font-bold uppercase tracking-widest mb-3">Conecte-se comigo</p>
            <SocialLinks />
          </div>
          <div className="flex items-center gap-3 px-6 py-3 bg-white rounded-2xl shadow-sm border border-slate-50">
            <Heart className="text-pink-500 fill-pink-500 animate-pulse" size={20} />
            <span className="font-bold text-slate-700 text-sm uppercase">Feito com Amor</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProfileSection;