import React from 'react';

// Componente de Balão aprimorado com mais detalhes visuais
const Balloon = ({ 
  color, 
  size, 
  position, 
  animation, 
  delay,
  rotate = 0,
  opacity = 'opacity-40'
}: { 
  color: 'pink' | 'blue' | 'purple' | 'gold' | 'white'; 
  size: string; 
  position: string; 
  animation: string;
  delay: string;
  rotate?: number;
  opacity?: string;
}) => {
  const colorClasses = {
    pink: 'from-pink-300 via-pink-400 to-rose-400 shadow-pink-200/20',
    blue: 'from-cyan-200 via-blue-300 to-blue-400 shadow-blue-200/20',
    purple: 'from-purple-200 via-fuchsia-300 to-purple-400 shadow-purple-200/20',
    gold: 'from-yellow-100 via-amber-200 to-yellow-400 shadow-yellow-200/20',
    white: 'from-slate-50 via-white to-slate-100 shadow-slate-200/10',
  };

  return (
    <div 
      className={`absolute ${position} ${animation} z-0 pointer-events-none will-change-transform`} 
      style={{ animationDelay: delay, transform: `rotate(${rotate}deg)` }}
    >
      <div className="relative group">
        {/* Corpo do Balão com gradiente e profundidade */}
        <div className={`relative ${size} rounded-[50%_50%_50%_50%_/_45%_45%_55%_55%] bg-gradient-to-br ${colorClasses[color]} shadow-xl ${opacity} backdrop-blur-[1px] transition-all duration-1000`}>
          {/* Brilho Superior (Highlight) */}
          <div className="absolute top-[12%] left-[20%] w-[30%] h-[15%] bg-gradient-to-b from-white/80 to-transparent rounded-full opacity-70 blur-[1px]"></div>
          
          {/* Reflexo Lateral Sutil */}
          <div className="absolute bottom-[20%] right-[15%] w-[10%] h-[20%] bg-white/20 rounded-full blur-[2px]"></div>
        </div>

        {/* Nó do Balão */}
        <div className={`absolute -bottom-[1px] left-1/2 -translate-x-1/2 w-3 h-2 rounded-sm bg-gradient-to-r ${colorClasses[color]} ${opacity}`}></div>

        {/* Linha/Fio do Balão com balanço suave */}
        <div className="absolute top-[98%] left-1/2 -translate-x-1/2 w-[0.5px] h-48 bg-gradient-to-b from-slate-400/20 to-transparent origin-top animate-sway opacity-30"></div>
      </div>
    </div>
  );
};

const FloatingBalloons: React.FC = () => {
  return (
    <div className="fixed inset-0 overflow-hidden -z-20 pointer-events-none">
      {/* FUNDO BASE */}
      <div className="absolute inset-0 bg-[#FDFCF9] bg-gradient-to-tr from-rose-50/40 via-white to-sky-50/40 z-[-30]"></div>

      {/* ORBES DE AMBIÊNCIA */}
      <div className="absolute inset-0 opacity-40 z-[-25]">
        <div className="absolute top-[-10%] left-[-10%] w-[60vw] h-[60vw] bg-pink-100/60 rounded-full mix-blend-multiply filter blur-[120px] animate-pulse"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[70vw] h-[70vw] bg-blue-50/60 rounded-full mix-blend-multiply filter blur-[140px] animate-pulse" style={{ animationDelay: '4s' }}></div>
        <div className="absolute top-[30%] right-[10%] w-[40vw] h-[40vw] bg-purple-50/50 rounded-full mix-blend-multiply filter blur-[100px] animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      {/* 
         MÁXIMA DENSIDADE DE BALÕES FLUTUANTES 
         Distribuídos em camadas para criar um cenário 3D
      */}
      
      {/* --- CAMADA DE FUNDO (Pequenos e Pálidos) --- */}
      <Balloon color="white" size="w-8 h-10" position="top-[10%] left-[30%]" animation="animate-float-slow" delay="1s" opacity="opacity-10" />
      <Balloon color="pink" size="w-10 h-14" position="top-[40%] right-[25%]" animation="animate-float-delayed" delay="4s" opacity="opacity-15" />
      <Balloon color="blue" size="w-6 h-8" position="bottom-[30%] left-[45%]" animation="animate-float" delay="2s" opacity="opacity-10" />
      <Balloon color="purple" size="w-12 h-16" position="bottom-[15%] right-[40%]" animation="animate-float-slow" delay="5s" opacity="opacity-15" />

      {/* --- GRUPO SUPERIOR ESQUERDO --- */}
      <Balloon color="pink" size="w-32 h-44" position="top-[2%] left-[3%]" animation="animate-float" delay="0s" rotate={-5} />
      <Balloon color="gold" size="w-16 h-22" position="top-[18%] left-[8%]" animation="animate-float-slow" delay="1.2s" rotate={10} opacity="opacity-30" />
      <Balloon color="white" size="w-20 h-26" position="top-[10%] left-[15%]" animation="animate-float-delayed" delay="2.5s" opacity="opacity-20" />
      <Balloon color="purple" size="w-12 h-16" position="top-[25%] left-[2%]" animation="animate-float" delay="3.2s" rotate={15} opacity="opacity-40" />

      {/* --- GRUPO SUPERIOR DIREITO --- */}
      <Balloon color="blue" size="w-40 h-54" position="top-[-2%] right-[5%]" animation="animate-float-delayed" delay="0.5s" rotate={8} />
      <Balloon color="pink" size="w-24 h-32" position="top-[15%] right-[12%]" animation="animate-float" delay="1.8s" rotate={-12} opacity="opacity-30" />
      <Balloon color="purple" size="w-18 h-24" position="top-[28%] right-[2%]" animation="animate-float-slow" delay="4.5s" rotate={5} opacity="opacity-35" />
      <Balloon color="white" size="w-14 h-18" position="top-[8%] right-[20%]" animation="animate-float-delayed" delay="3s" opacity="opacity-20" />

      {/* --- MEIO DAS LATERAIS --- */}
      <Balloon color="gold" size="w-14 h-18" position="top-[45%] left-[-1%]" animation="animate-float-slow" delay="5.5s" rotate={20} />
      <Balloon color="pink" size="w-18 h-24" position="top-[55%] left-[5%]" animation="animate-float" delay="2.2s" opacity="opacity-25" />
      
      <Balloon color="blue" size="w-28 h-38" position="top-[50%] right-[-2%]" animation="animate-float-delayed" delay="1.5s" rotate={-18} opacity="opacity-30" />
      <Balloon color="purple" size="w-16 h-22" position="top-[65%] right-[6%]" animation="animate-float-slow" delay="3.8s" opacity="opacity-25" />

      {/* --- GRUPO INFERIOR ESQUERDO --- */}
      <Balloon color="purple" size="w-36 h-48" position="bottom-[8%] left-[1%]" animation="animate-float-delayed" delay="2.8s" rotate={-8} />
      <Balloon color="blue" size="w-22 h-30" position="bottom-[22%] left-[12%]" animation="animate-float-slow" delay="1s" rotate={12} opacity="opacity-30" />
      <Balloon color="pink" size="w-14 h-20" position="bottom-[12%] left-[18%]" animation="animate-float" delay="4.2s" opacity="opacity-25" />

      {/* --- GRUPO INFERIOR DIREITO --- */}
      <Balloon color="blue" size="w-48 h-64" position="bottom-[-8%] right-[6%]" animation="animate-float" delay="3.8s" rotate={-15} />
      <Balloon color="gold" size="w-26 h-34" position="bottom-[18%] right-[18%]" animation="animate-float-delayed" delay="1.4s" rotate={10} opacity="opacity-30" />
      <Balloon color="white" size="w-20 h-28" position="bottom-[4%] right-[28%]" animation="animate-float-slow" delay="0.5s" opacity="opacity-25" />
      <Balloon color="purple" size="w-14 h-20" position="bottom-[28%] right-[4%]" animation="animate-float" delay="2.2s" rotate={-10} opacity="opacity-40" />

      {/* --- "PARTÍCULAS" DE BRILHO (BOKEH / MAGIC DUST) --- */}
      <div className="absolute inset-0 z-[-20]">
        {[...Array(8)].map((_, i) => (
          <div 
            key={i}
            className="absolute rounded-full animate-pulse"
            style={{
              width: `${Math.random() * 4 + 2}px`,
              height: `${Math.random() * 4 + 2}px`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              backgroundColor: ['#fed7aa', '#fbcfe8', '#bfdbfe', '#e9d5ff'][Math.floor(Math.random() * 4)],
              opacity: Math.random() * 0.4 + 0.1,
              filter: 'blur(1px)',
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${Math.random() * 3 + 2}s`
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default FloatingBalloons;