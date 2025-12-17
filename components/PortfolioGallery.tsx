import React, { useState, useEffect } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

interface PortfolioGalleryProps {
  isOpen: boolean;
  onClose: () => void;
}

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
    url: "https://drive.google.com/file/d/1BovT6yE6N3UjBh5wm63YdqDF6jke-rZL/view?usp=sharing",
    title: "Arco Orgânico Real",
    desc: "Um exemplo de como nossos arcos de balões transformam o ambiente."
  },
  {
    url: "https://drive.google.com/file/d/1VS4HiIs4q5Rz5WclTczFWWai_gFQAzoG/view?usp=sharing",
    title: "Mesa de Doces Mágica",
    desc: "Cenários pensados em cada pequeno detalhe para encantar."
  },
  {
    url: "https://drive.google.com/file/d/1BYQ4rohhK-ZjqPplHQO9VLYu6L80j38C/view?usp=sharing",
    title: "Painéis Temáticos",
    desc: "Personalização total para que sua festa seja única."
  },
  {
    url: "https://drive.google.com/file/d/1npqZClH0mzPUfebTsJ5mnQo-AM7FElUc/view?usp=sharing",
    title: "Eventos Inesquecíveis",
    desc: "Onde o amor e a técnica se encontram para criar memórias."
  }
];

const PortfolioGallery: React.FC<PortfolioGalleryProps> = ({ isOpen, onClose }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (isOpen) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = 'unset';
    return () => { document.body.style.overflow = 'unset'; };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-2 md:p-8">
      <div className="absolute inset-0 bg-slate-900/90 backdrop-blur-sm transition-opacity" onClick={onClose}></div>

      <div className="relative w-full max-w-6xl bg-white rounded-2xl md:rounded-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row max-h-[95vh] animate-in fade-in zoom-in duration-300">
        
        {/* Close Button Mobile */}
        <button onClick={onClose} className="absolute top-4 right-4 z-50 p-2 bg-black/50 text-white rounded-full md:hidden">
          <X size={20} />
        </button>

        {/* Image Display */}
        <div className="relative w-full md:w-2/3 h-[50vh] md:h-[80vh] bg-slate-100 flex items-center justify-center">
          <img 
            src={getDirectLink(portfolioImages[currentIndex].url)} 
            alt={portfolioImages[currentIndex].title} 
            className="w-full h-full object-cover transition-all duration-500"
          />
          
          <div className="absolute inset-x-4 top-1/2 -translate-y-1/2 flex justify-between pointer-events-none">
            <button 
              onClick={(e) => { e.stopPropagation(); setCurrentIndex(prev => (prev - 1 + portfolioImages.length) % portfolioImages.length); }}
              className="p-2 md:p-3 bg-white/20 hover:bg-white/90 text-white md:text-slate-800 rounded-full backdrop-blur-sm pointer-events-auto"
            >
              <ChevronLeft size={24} />
            </button>
            <button 
              onClick={(e) => { e.stopPropagation(); setCurrentIndex(prev => (prev + 1) % portfolioImages.length); }}
              className="p-2 md:p-3 bg-white/20 hover:bg-white/90 text-white md:text-slate-800 rounded-full backdrop-blur-sm pointer-events-auto"
            >
              <ChevronRight size={24} />
            </button>
          </div>
        </div>

        {/* Text Details */}
        <div className="w-full md:w-1/3 bg-white p-6 md:p-10 flex flex-col justify-between overflow-y-auto">
          <div>
             <div className="flex justify-between items-start mb-4 md:mb-6">
                <span className="text-[10px] md:text-xs font-bold tracking-widest text-pink-500 uppercase">Portfólio dhFestannça</span>
                <button onClick={onClose} className="hidden md:block p-1 text-slate-400 hover:text-slate-800"><X size={24} /></button>
             </div>
             <h3 className="text-xl md:text-2xl font-display font-bold text-slate-800 mb-2 md:mb-4">{portfolioImages[currentIndex].title}</h3>
             <p className="text-sm md:text-base text-slate-500 font-medium leading-relaxed">{portfolioImages[currentIndex].desc}</p>
          </div>

          <div className="mt-6 md:mt-8">
            <div className="text-xs text-slate-400 mb-3">{currentIndex + 1} de {portfolioImages.length}</div>
            <div className="flex gap-2">
              {portfolioImages.map((_, idx) => (
                <button 
                  key={idx} 
                  onClick={() => setCurrentIndex(idx)} 
                  className={`h-1.5 rounded-full transition-all ${idx === currentIndex ? 'w-8 bg-pink-500' : 'w-2 bg-slate-200'}`} 
                />
              ))}
            </div>
            <button onClick={onClose} className="w-full mt-8 py-4 rounded-xl bg-slate-900 text-white font-bold text-sm shadow-lg md:hidden">
              Voltar para o site
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PortfolioGallery;