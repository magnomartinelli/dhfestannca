import React, { useState, useEffect } from 'react';
import FloatingBalloons from './components/FloatingBalloons';
import ProfileSection from './components/ProfileSection';
import ActionButtons from './components/ActionButtons';
import PortfolioGallery from './components/PortfolioGallery';
import TestimonialsGallery from './components/TestimonialsGallery';
import FAQSection from './components/FAQSection';
import Hero from './components/Hero';
import PromiseSection from './components/PromiseSection';

const App: React.FC = () => {
  const [isPortfolioOpen, setIsPortfolioOpen] = useState(false);
  const [isTestimonialsOpen, setIsTestimonialsOpen] = useState(false);

  // Lógica de Scroll Reveal para efeitos sutis ao rolar
  useEffect(() => {
    const reveals = document.querySelectorAll('.reveal');

    const revealOnScroll = () => {
      reveals.forEach(reveal => {
        const windowHeight = window.innerHeight;
        const revealTop = reveal.getBoundingClientRect().top;
        const revealPoint = 80;

        if (revealTop < windowHeight - revealPoint) {
          reveal.classList.add('active');
        }
      });
    };

    window.addEventListener('scroll', revealOnScroll);
    revealOnScroll();

    return () => window.removeEventListener('scroll', revealOnScroll);
  }, []);

  const handlePrimaryCTA = () => {
    const phoneNumber = "5521970753806";
    const message = encodeURIComponent("Olá! Vi o site e quero transformar meu sonho em uma decoração mágica! 🎈✨");
    window.open(`https://wa.me/${phoneNumber}?text=${message}`, '_blank');
  };

  return (
    <div className="min-h-screen w-full text-slate-800 relative overflow-x-hidden selection:bg-pink-300 selection:text-pink-900 bg-transparent">

      {/* Camada de Balões e Atmosfera */}
      <FloatingBalloons />

      {/* Conteúdo Principal */}
      <main className="relative z-10 flex flex-col items-center">

        {/* Seção Hero */}
        <Hero onCtaClick={handlePrimaryCTA} />

        <div className="reveal w-full max-w-7xl px-4">
          <PromiseSection />
        </div>

        <div className="reveal w-full bg-white/50 backdrop-blur-md py-16 md:py-24 border-y border-white/60 shadow-inner mt-12 md:mt-20">
          <ProfileSection />
        </div>

        <section className="reveal container mx-auto px-4 py-20 md:py-32 flex flex-col items-center">
          <div className="text-center mb-12 md:mb-20">
            <h2 className="text-3xl md:text-6xl font-black text-slate-900 mb-4 md:mb-6 font-display tracking-tight px-4">O Próximo Passo da Mágica</h2>
            <p className="text-slate-500 text-sm md:text-lg font-semibold uppercase tracking-widest">Toque abaixo para planejar seu evento</p>
          </div>

          <ActionButtons
            onPortfolioClick={() => setIsPortfolioOpen(true)}
            onTestimonialsClick={() => setIsTestimonialsOpen(true)}
          />
        </section>

        <div className="reveal w-full bg-slate-50/70 backdrop-blur-sm border-t border-slate-200/50">
          <FAQSection />
        </div>

        {/* Footer */}
        <footer className="w-full py-16 md:py-24 text-center bg-white/95 backdrop-blur-md border-t border-slate-100 mt-12 md:mt-20 px-6">
          <div className="flex justify-center mb-8 md:mb-12">
            <div className="w-20 md:w-28 h-1.5 bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 rounded-full opacity-60"></div>
          </div>
          <p className="font-display font-black text-2xl md:text-4xl text-slate-900 tracking-tighter mb-4 uppercase">DHFESTANNÇA</p>
          <p className="text-slate-500 text-xs md:text-sm font-medium max-w-xs mx-auto md:max-w-none">
            © {new Date().getFullYear()} dhFestannça. <br className="md:hidden" /> Criando memórias que duram para sempre.
          </p>

          <div className="mt-8 flex justify-center gap-4 md:gap-8 text-pink-400/80 text-[10px] md:text-xs font-bold tracking-[0.2em] md:tracking-[0.4em] uppercase">
            <div>CRIATIVIDADE</div>
            <div>•</div>
            <div>DESIGN</div>
            <div>•</div>
            <div>AFETO</div>
          </div>

          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="mt-12 text-slate-400 hover:text-pink-500 text-xs font-semibold tracking-widest uppercase transition-colors"
          >
            Voltar ao topo
          </button>
        </footer>

      </main>

      {/* Modais */}
      <PortfolioGallery isOpen={isPortfolioOpen} onClose={() => setIsPortfolioOpen(false)} />
      <TestimonialsGallery isOpen={isTestimonialsOpen} onClose={() => setIsTestimonialsOpen(false)} />
    </div>
  );
};

export default App;