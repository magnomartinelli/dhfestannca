import React, { useState } from 'react';
import { ChevronDown, HelpCircle, Sparkles } from 'lucide-react';

const faqData = [
  {
    question: "O que está incluso no serviço de decoração da dhFestannça?",
    answer: "Cada projeto inclui criação personalizada, montagem completa no local e finalização estética impecável. Nada é genérico: cada evento é pensado para emocionar e contar uma história única, com foco total no acabamento e na experiência do cliente."
  },
  {
    question: "Com quanto tempo de antecedência devo fazer a reserva da data?",
    answer: "O ideal é reservar com pelo menos 30 a 60 dias de antecedência. Como trabalho com uma agenda limitada para garantir exclusividade e excelência em cada entrega, datas concorridas costumam esgotar rapidamente."
  },
  {
    question: "Posso personalizar totalmente a decoração do meu evento?",
    answer: "Com certeza! A personalização é o DNA da dhFestannça. Criamos tudo a partir do seu tema, paleta de cores e o propósito do evento. Nosso objetivo não é seguir tendências prontas, mas sim traduzir seus sentimentos em arte."
  },
  {
    question: "O valor da decoração pode variar? Por quê?",
    answer: "Sim. O investimento é calculado com base na complexidade do projeto, quantidade de balões, tamanho do cenário e materiais específicos escolhidos. Oferecemos orçamentos detalhados que refletem a qualidade e o design exclusivo que entregamos."
  },
  {
    question: "A dhFestannça atende quais tipos de eventos?",
    answer: "Atendemos desde celebrações íntimas em casa até grandes eventos. Especializamo-nos em festas infantis, aniversários adultos, eventos familiares e qualquer momento que mereça uma atmosfera mágica e inesquecível."
  }
];

const FAQSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="w-full max-w-4xl mx-auto px-4 py-24 md:py-32">
      {/* Header da Seção */}
      <div className="flex flex-col items-center text-center mb-16">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-50 border border-purple-100 text-purple-600 text-[10px] md:text-xs font-black tracking-[0.2em] uppercase mb-6">
          <Sparkles size={14} />
          Central de Ajuda
        </div>
        <h2 className="text-3xl md:text-5xl font-display font-black text-slate-900 leading-tight">
          Dúvidas <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600">Frequentes</span>
        </h2>
        <p className="text-slate-500 mt-4 text-base md:text-lg max-w-xl font-medium">
          Tudo o que você precisa saber para planejar sua celebração mágica com tranquilidade.
        </p>
      </div>

      {/* Lista de FAQ */}
      <div className="space-y-6">
        {faqData.map((item, index) => {
          const isOpen = openIndex === index;
          return (
            <div 
              key={index} 
              className={`
                group bg-white rounded-[2rem] overflow-hidden border transition-all duration-500
                ${isOpen 
                  ? 'shadow-2xl shadow-pink-100 border-pink-200 ring-4 ring-pink-50/50' 
                  : 'shadow-sm border-slate-100 hover:border-pink-100 hover:shadow-md'}
              `}
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full flex items-center justify-between p-6 md:p-8 text-left transition-colors"
              >
                <span className={`
                  font-bold text-base md:text-xl font-display leading-snug transition-colors duration-300
                  ${isOpen ? 'text-pink-600' : 'text-slate-700 group-hover:text-slate-900'}
                `}>
                  {item.question}
                </span>
                
                {/* Ícone de Expansão mais proeminente */}
                <div className={`
                  flex-shrink-0 w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center transition-all duration-500
                  ${isOpen 
                    ? 'bg-pink-500 text-white rotate-180 shadow-lg shadow-pink-200' 
                    : 'bg-slate-50 text-slate-400 group-hover:bg-pink-50 group-hover:text-pink-500'}
                `}>
                  <ChevronDown size={24} strokeWidth={3} />
                </div>
              </button>
              
              <div 
                className={`
                  transition-all duration-500 ease-in-out overflow-hidden
                  ${isOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'}
                `}
              >
                <div className="px-6 md:px-8 pb-8 md:pb-10">
                  <div className="h-[1px] w-full bg-slate-100 mb-6"></div>
                  <p className="text-slate-600 text-sm md:text-base leading-relaxed font-medium">
                    {item.answer}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Rodapé do FAQ */}
      <div className="mt-16 text-center reveal">
        <p className="text-slate-400 font-medium mb-6">Ainda tem alguma pergunta específica?</p>
        <button 
          onClick={() => window.open('https://wa.me/5521970753806', '_blank')}
          className="inline-flex items-center gap-3 px-8 py-4 bg-slate-900 text-white rounded-2xl font-bold hover:bg-slate-800 transition-all hover:scale-105 active:scale-95 shadow-xl"
        >
          <HelpCircle size={20} />
          Falar com um especialista
        </button>
      </div>
    </section>
  );
};

export default FAQSection;