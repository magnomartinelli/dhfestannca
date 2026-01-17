import React, { useState, useEffect } from 'react';
import { X, Wand2, Sparkles } from 'lucide-react';

const BudgetPopup: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [hasBeenClosed, setHasBeenClosed] = useState(false);

  useEffect(() => {
    // Aparece após 7 segundos se não tiver sido fechado antes
    const timer = setTimeout(() => {
      if (!hasBeenClosed) {
        setIsVisible(true);
      }
    }, 7000);

    return () => clearTimeout(timer);
  }, [hasBeenClosed]);

  const handleClose = () => {
    setIsVisible(false);
    setHasBeenClosed(true);
  };

  const handleCTA = () => {
    const phoneNumber = "5521970753806";
    const message = encodeURIComponent("Olá! Vi o pop-up no site e gostaria de um Orçamento Encantado para minha festa. 🎈✨");
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
    handleClose();
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-6 right-6 z-[100] max-w-[280px] md:max-w-xs animate-slide-up">
      <div className="relative bg-white rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.15)] p-5 border border-pink-100 overflow-hidden group">
        {/* Background Decorative Sparkle */}
        <div className="absolute -top-4 -left-4 w-12 h-12 bg-pink-50 rounded-full blur-xl group-hover:bg-pink-100 transition-colors"></div>
        
        {/* Close Button */}
        <button 
          onClick={handleClose}
          className="absolute top-2 right-2 p-1 text-slate-400 hover:text-slate-600 transition-colors"
          aria-label="Fechar"
        >
          <X size={18} />
        </button>

        <div className="flex flex-col items-center text-center space-y-3">
          <div className="w-12 h-12 bg-gradient-to-tr from-pink-500 to-purple-500 rounded-full flex items-center justify-center text-white shadow-lg animate-bounce">
            <Wand2 size={24} />
          </div>
          
          <div>
            <h4 className="font-display font-bold text-slate-800 flex items-center justify-center gap-1">
              Sonhando com a festa ideal? <Sparkles size={14} className="text-yellow-400" />
            </h4>
            <p className="text-sm text-slate-500 mt-1 leading-snug">
              Transformamos seu desejo em uma decoração mágica!
            </p>
          </div>

          <button
            onClick={handleCTA}
            className="w-full py-3 bg-gradient-to-r from-pink-500 to-fuchsia-600 text-white rounded-xl font-bold text-sm shadow-md hover:shadow-lg hover:scale-[1.02] transition-all active:scale-95 flex items-center justify-center gap-2"
          >
            Peça seu orçamento agora!
          </button>
        </div>
      </div>

      <style>{`
        @keyframes slide-up {
          from { opacity: 0; transform: translateY(20px) scale(0.9); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
        .animate-slide-up {
          animation: slide-up 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
      `}</style>
    </div>
  );
};

export default BudgetPopup;