import React, { useState, useEffect } from 'react';
import { X, ChevronLeft, ChevronRight, MessageCircleHeart } from 'lucide-react';

interface TestimonialsGalleryProps {
  isOpen: boolean;
  onClose: () => void;
}

// Função utilitária para converter links do Google Drive em links diretos de imagem
const getDirectLink = (url: string) => {
  if (url.includes('drive.google.com')) {
    const id = url.split('/d/')[1]?.split('/')[0] || url.split('id=')[1]?.split('&')[0];
    return `https://drive.google.com/thumbnail?id=${id}&sz=s1000`;
  }
  return url;
};

const testimonialImages = [
  {
    url: "https://drive.google.com/file/d/1OUPRhO3EjCVLvIu7qgURlKxAxDOG5sqG/view?usp=drive_link",
    client: "Feedback WhatsApp",
    highlight: "O projeto superou todas as expectativas."
  },
  {
    url: "https://drive.google.com/file/d/1jCdtEP-Ri8WdqxGli2mPvAF7mbEseavB/view?usp=drive_link",
    client: "Cliente Satisfeita",
    highlight: "Encantada com cada detalhe da decoração."
  },
  {
    url: "https://drive.google.com/file/d/1vB67l6gyLSdtCbcDVOEpt2Rlkcy8z0Fg/view?usp=drive_link",
    client: "Mensagem Carinhosa",
    highlight: "Memórias eternizadas em um cenário mágico."
  },
  {
    url: "https://drive.google.com/file/d/1WOGNRNgWPdWuKTJfIND6pcVaW2VCpMrT/view?usp=drive_link",
    client: "Cliente Especial",
    highlight: "Mais um sonho realizado com sucesso."
  },
  {
    url: "https://drive.google.com/file/d/170PD_w230J7L9E4dc89iEfFSd-GVy0uA/view?usp=drive_link",
    client: "Cliente Feliz",
    highlight: "Sua festa, nosso compromisso."
  }
];

const TestimonialsGallery: React.FC<TestimonialsGalleryProps> = ({ isOpen, onClose }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (isOpen) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = 'unset';
    return () => { document.body.style.overflow = 'unset'; };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-slate-900/90 backdrop-blur-md" onClick={onClose}></div>

      <div className="relative w-full max-w-sm md:max-w-4xl flex flex-col md:flex-row items-center justify-center gap-4 md:gap-8">
        {/* Botão Fechar Mobile e Desktop */}
        <button
          onClick={onClose}
          className="absolute -top-12 right-0 md:-top-16 md:-right-16 p-2 bg-white/10 hover:bg-white/20 text-white rounded-full transition-colors z-50"
        >
          <X size={28} />
        </button>

        {/* Navegação Desktop Esquerda */}
        <button
          onClick={(e) => { e.stopPropagation(); setCurrentIndex((prev) => (prev - 1 + testimonialImages.length) % testimonialImages.length); }}
          className="hidden md:flex p-4 bg-white/10 hover:bg-white/20 text-white rounded-full transition-colors active:scale-90"
        >
          <ChevronLeft size={40} />
        </button>

        {/* Simulador de Print / Mockup de Celular Responsivo */}
        <div className="relative w-[280px] h-[560px] md:w-[320px] md:h-[640px] bg-white rounded-[2.5rem] shadow-2xl border-[8px] md:border-[12px] border-slate-900 overflow-hidden flex flex-col animate-in slide-in-from-bottom duration-500">
          {/* Notch do Celular */}
          <div className="h-6 md:h-8 bg-slate-900 w-full flex justify-center items-center shrink-0">
            <div className="w-16 md:w-20 h-3 md:h-4 bg-black rounded-b-xl"></div>
          </div>

          <div className="flex-1 relative bg-slate-50 overflow-hidden">
            <img
              key={currentIndex}
              src={getDirectLink(testimonialImages[currentIndex].url)}
              alt="Depoimento real dhFestannça"
              className="w-full h-full object-contain md:object-cover animate-fade-in"
            />

            {/* Setas de Navegação Mobile */}
            <div className="absolute inset-x-2 top-1/2 -translate-y-1/2 flex justify-between md:hidden pointer-events-none">
              <button
                onClick={(e) => { e.stopPropagation(); setCurrentIndex(p => (p - 1 + testimonialImages.length) % testimonialImages.length); }}
                className="p-2 bg-black/40 text-white rounded-full backdrop-blur-sm pointer-events-auto active:scale-95"
              >
                <ChevronLeft size={20} />
              </button>
              <button
                onClick={(e) => { e.stopPropagation(); setCurrentIndex(p => (p + 1) % testimonialImages.length); }}
                className="p-2 bg-black/40 text-white rounded-full backdrop-blur-sm pointer-events-auto active:scale-95"
              >
                <ChevronRight size={20} />
              </button>
            </div>
          </div>

          {/* Rodapé do Mockup com Info */}
          <div className="bg-white p-4 md:p-5 border-t border-slate-100 flex items-center gap-3 md:gap-4 shrink-0">
            <div className="p-2 bg-pink-100 rounded-full text-pink-600">
              <MessageCircleHeart size={18} />
            </div>
            <div className="overflow-hidden">
              <h4 className="font-bold text-slate-800 text-[13px] md:text-sm truncate">
                {testimonialImages[currentIndex].client}
              </h4>
              <p className="text-[11px] md:text-xs text-slate-500 truncate italic">
                "{testimonialImages[currentIndex].highlight}"
              </p>
            </div>
          </div>
        </div>

        {/* Navegação Desktop Direita */}
        <button
          onClick={(e) => { e.stopPropagation(); setCurrentIndex((prev) => (prev + 1) % testimonialImages.length); }}
          className="hidden md:flex p-4 bg-white/10 hover:bg-white/20 text-white rounded-full transition-colors active:scale-90"
        >
          <ChevronRight size={40} />
        </button>
      </div>

      <style>{`
        @keyframes fade-in {
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
        }
        .animate-fade-in {
          animation: fade-in 0.4s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default TestimonialsGallery;