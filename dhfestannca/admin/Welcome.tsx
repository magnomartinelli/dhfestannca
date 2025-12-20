import React from 'react';
import { useNavigate } from 'react-router-dom';

const WelcomeScreen = () => {
    const navigate = useNavigate();

    return (
        <div className="relative flex h-screen w-full flex-col justify-between overflow-hidden max-w-md mx-auto bg-[#f8f6f7] dark:bg-[#22101c] shadow-2xl font-['Plus_Jakarta_Sans']">
            {/* Header / Logo */}
            <div className="flex w-full items-center justify-center pt-10 pb-2 z-10">
                <div className="flex items-center gap-2">
                    <div className="bg-[#ee2bad]/10 p-2 rounded-full">
                        <span className="material-symbols-outlined text-[#ee2bad] text-3xl">celebration</span>
                    </div>
                    <span className="text-xl font-bold text-[#181116] dark:text-white tracking-tight">Universo dhFestannça</span>
                </div>
            </div>
            {/* Main Content Wrapper */}
            <div className="flex flex-col flex-1 h-full relative">
                {/* Hero Image Section */}
                <div className="flex w-full grow bg-transparent px-6 py-4 items-center justify-center relative">
                    {/* Background decorative blob */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[130%] h-[90%] bg-center bg-cover rounded-full opacity-10 blur-3xl -z-10 animate-pulse" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/d/1DEVfI30mYZbC6GYtO04r7IluuezeGhAE")' }}></div>
                    <div className="w-full relative aspect-[4/5] max-h-[50vh] overflow-hidden rounded-xl shadow-xl flex border-4 border-white dark:border-[#351a2c]">
                        <div className="w-full bg-center bg-no-repeat bg-cover flex-1 transition-transform duration-700 hover:scale-105" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/d/1DEVfI30mYZbC6GYtO04r7IluuezeGhAE")' }}>
                            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
                        </div>
                        {/* Floating Badge */}
                        <div className="absolute bottom-6 right-6 bg-white dark:bg-[#351a2c] p-3 pl-4 pr-5 rounded-lg shadow-lg flex items-center gap-3 animate-[bounce_3s_infinite]">
                            <div className="bg-green-100 dark:bg-green-900/30 p-2 rounded-full flex items-center justify-center">
                                <span className="material-symbols-outlined text-green-600 dark:text-green-400 text-xl">check</span>
                            </div>
                            <div className="flex flex-col">
                                <span className="text-[10px] text-gray-500 dark:text-gray-400 uppercase tracking-wider font-bold">Status</span>
                                <span className="text-sm font-bold text-[#181116] dark:text-white">Organizado</span>
                            </div>
                        </div>
                    </div>
                </div>
                {/* Text Content & Controls */}
                <div className="bg-[#f8f6f7] dark:bg-[#22101c] w-full rounded-t-xl z-10 flex flex-col justify-end pb-8">
                    <div className="px-6 pt-2">
                        <h1 className="text-[#181116] dark:text-white tracking-tight text-[32px] font-extrabold leading-[1.1] text-center">
                            Sua Empresa de <span className="text-[#ee2bad] inline-block">Festas</span> no Bolso
                        </h1>
                    </div>
                    <div className="px-8 pt-4 pb-2">
                        <p className="text-gray-600 dark:text-gray-300 text-base font-medium leading-relaxed text-center">
                            Gerencie clientes, fornecedores e orçamentos em um só lugar. Adeus planilhas, olá festas inesquecíveis.
                        </p>
                    </div>
                    <div className="flex w-full flex-row items-center justify-center gap-2 py-6">
                        <div className="h-2 w-8 rounded-full bg-[#ee2bad] shadow-sm shadow-[#ee2bad]/50 transition-all duration-300"></div>
                        <div className="h-2 w-2 rounded-full bg-[#e6dbe2] dark:bg-gray-700"></div>
                        <div className="h-2 w-2 rounded-full bg-[#e6dbe2] dark:bg-gray-700"></div>
                    </div>
                    <div className="flex flex-col gap-3 px-6 pt-2">
                        <button
                            onClick={() => navigate('/admin/login')}
                            className="w-full bg-[#ee2bad] hover:bg-[#ee2bad]/90 text-white font-bold text-lg py-5 px-8 rounded-full shadow-lg shadow-[#ee2bad]/30 flex items-center justify-center gap-2 transform active:scale-95 transition-all"
                        >
                            <span>Começar Agora</span>
                            <span className="material-symbols-outlined">arrow_forward</span>
                        </button>
                        <button onClick={() => navigate('/admin/dashboard')} className="w-full text-center text-[#181116] dark:text-white/80 font-semibold py-3 px-6 rounded-full hover:bg-black/5 dark:hover:bg-white/5 transition-colors">
                            Já tenho uma conta
                        </button>
                    </div>
                </div>
            </div>
            <div className="h-2 w-full"></div>
        </div>
    );
};

export default WelcomeScreen;
