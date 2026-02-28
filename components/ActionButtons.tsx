import React from 'react';
import { Image as ImageIcon, MessageCircleHeart, Wand2 } from 'lucide-react';
import { ActionButtonProps } from '../types';

interface ActionButtonsComponentProps {
  onPortfolioClick?: () => void;
  onTestimonialsClick?: () => void;
}

const buttons: Omit<ActionButtonProps, 'onClick'>[] = [
  {
    label: "Explorar Nosso Portfólio",
    icon: ImageIcon,
    variant: 'secondary'
  },
  {
    label: "Depoimentos das Clientes",
    icon: MessageCircleHeart,
    variant: 'secondary'
  },
  {
    label: "Falar no WhatsApp",
    icon: Wand2,
    variant: 'highlight'
  }
];

const ActionButtons: React.FC<ActionButtonsComponentProps> = ({ onPortfolioClick, onTestimonialsClick }) => {
  const handleAction = (label: string) => {
    if (label.includes("WhatsApp")) {
      const phoneNumber = "5521970753806";
      const message = encodeURIComponent("Olá! Gostaria de um orçamento para transformar minha festa em um momento mágico. 🎈✨");
      window.open(`https://wa.me/${phoneNumber}?text=${message}`, '_blank');
      return;
    }

    if (label.includes("Portfólio")) {
      if (onPortfolioClick) onPortfolioClick();
      return;
    }

    if (label.includes("Depoimentos")) {
      if (onTestimonialsClick) onTestimonialsClick();
      return;
    }
  };

  return (
    <div className="flex flex-col space-y-4 md:space-y-6 w-full max-w-sm md:max-w-lg px-4">
      {buttons.map((btn, idx) => (
        <button
          key={idx}
          onClick={() => handleAction(btn.label)}
          className={`
            group relative w-full overflow-hidden rounded-xl md:rounded-2xl p-4 md:p-6 transition-all duration-300 flex items-center justify-between active:scale-[0.98]
            ${btn.variant === 'highlight' 
              ? 'bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-600 text-white shadow-xl md:shadow-2xl' 
              : 'bg-white text-slate-800 border border-slate-100 shadow-md hover:shadow-lg md:hover:-translate-y-1'}
          `}
        >
          <div className="flex items-center space-x-3 md:space-x-5 z-10">
            <div className={`
              p-2.5 md:p-3 rounded-lg md:rounded-xl 
              ${btn.variant === 'highlight' ? 'bg-white/20' : 'bg-pink-50 text-pink-600'}
            `}>
              <btn.icon className="w-5 h-5 md:w-7 md:h-7" />
            </div>
            <span className={`text-base md:text-xl font-bold font-display tracking-tight ${btn.variant === 'highlight' ? 'text-white' : 'text-slate-800'}`}>
              {btn.label}
            </span>
          </div>
          
          <div className={`p-1.5 md:p-2 rounded-full transition-all group-hover:translate-x-1 ${btn.variant === 'highlight' ? 'bg-white/20' : 'bg-slate-100'}`}>
            <svg className="w-4 h-4 md:w-5 md:h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </button>
      ))}
    </div>
  );
};

export default ActionButtons;