import React from 'react';
import { FaWhatsapp } from 'react-icons/fa';
import { useLocation } from 'react-router-dom';

const FloatingWhatsApp: React.FC = () => {
    const location = useLocation();

    // Hide the WhatsApp button in the admin area
    if (location.pathname.startsWith('/admin')) {
        return null;
    }

    const handleCTA = () => {
        const phoneNumber = "5521970753806";
        const message = encodeURIComponent("Olá! Estou no site e gostaria de tirar algumas dúvidas.");
        const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;
        window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
    };

    return (
        <div className="fixed bottom-6 right-6 z-[90]">
            <button
                onClick={handleCTA}
                aria-label="Falar no WhatsApp"
                className="w-14 h-14 bg-[#25D366] text-white rounded-full flex items-center justify-center shadow-lg hover:shadow-xl hover:scale-110 transition-all duration-300 group"
            >
                <FaWhatsapp className="w-8 h-8 group-hover:animate-pulse" />
            </button>

            {/* Pulse Effect */}
            <div className="absolute inset-0 bg-[#25D366] rounded-full animate-ping opacity-20 -z-10"></div>
        </div>
    );
};

export default FloatingWhatsApp;
