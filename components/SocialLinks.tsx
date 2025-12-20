import React from 'react';
import { Instagram, Facebook } from 'lucide-react';

// Componente personalizado para o ícone real do TikTok (SVG)
const TikTokIcon = ({ size = 24 }: { size?: number | string; strokeWidth?: number | string }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="currentColor" 
    stroke="none"
  >
    <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.65-1.62-1.12-1.09-1.01-1.62-2.14-1.62-2.14v6.86c0 3.78-3.09 6.86-6.86 6.86s-6.86-3.08-6.86-6.86 3.08-6.86 6.86-6.86c.48 0 .95.05 1.41.14v4.06c-.19-.05-.4-.08-.6-.08-2.22 0-4.03 1.81-4.03 4.03s1.81 4.03 4.03 4.03c2.22 0 4.03-1.81 4.03-4.03V4.07h3.56c0-1.35 0-2.7 0-4.05z" />
  </svg>
);

const SocialLinks: React.FC = () => {
  const socialMedia = [
    {
      name: 'Instagram',
      icon: Instagram,
      url: 'https://www.instagram.com/dhfestannca',
      color: 'hover:bg-gradient-to-tr hover:from-yellow-500 hover:via-pink-500 hover:to-purple-600 hover:text-white hover:border-transparent text-pink-600 border-pink-200'
    },
    {
      name: 'TikTok',
      icon: TikTokIcon,
      url: 'https://www.tiktok.com/@dhfestannca',
      color: 'hover:bg-black hover:text-white hover:border-transparent text-slate-800 border-slate-300'
    },
    {
      name: 'Facebook',
      icon: Facebook,
      url: 'https://www.facebook.com/dhfestannca',
      color: 'hover:bg-blue-600 hover:text-white hover:border-transparent text-blue-600 border-blue-200'
    }
  ];

  return (
    <div className="flex items-center gap-4 mt-6">
      {socialMedia.map((social) => (
        <a
          key={social.name}
          href={social.url}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Visite nosso ${social.name}`}
          className={`
            w-12 h-12 flex items-center justify-center rounded-full 
            border-2 bg-white transition-all duration-300 
            transform hover:-translate-y-1 hover:shadow-lg
            ${social.color}
          `}
        >
          <social.icon size={22} strokeWidth={2.5} />
        </a>
      ))}
    </div>
  );
};

export default SocialLinks;