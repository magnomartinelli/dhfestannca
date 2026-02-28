import React from 'react';
import { Palette, Gem, Heart } from 'lucide-react';

const pillars = [
  {
    icon: Palette,
    title: "Criação Intuitiva",
    desc: "Nada aqui é genérico. Cada projeto nasce de uma escuta atenta aos seus desejos, resultando em uma paleta e tema exclusivos."
  },
  {
    icon: Gem,
    title: "Acabamento de Luxo",
    desc: "A magia está nos detalhes. Utilizamos as melhores técnicas de balloon design para garantir um visual impecável e duradouro."
  },
  {
    icon: Heart,
    title: "Propósito e Afeto",
    desc: "Decoramos para emocionar. Nossa missão é criar o cenário onde as fotos mais felizes da sua vida serão tiradas."
  }
];

const PromiseSection: React.FC = () => {
  return (
    <section className="w-full max-w-6xl mx-auto py-20 px-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {pillars.map((p, i) => (
          <div key={i} className="bg-white/50 backdrop-blur-sm p-8 rounded-3xl border border-white hover:border-pink-200 transition-all hover:shadow-xl group">
            <div className="w-14 h-14 bg-pink-100 rounded-2xl flex items-center justify-center text-pink-600 mb-6 group-hover:scale-110 transition-transform">
              <p.icon size={28} />
            </div>
            <h3 className="text-xl font-bold text-slate-800 mb-4 font-display">{p.title}</h3>
            <p className="text-slate-600 leading-relaxed font-medium">{p.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default PromiseSection;