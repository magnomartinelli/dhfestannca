import React from 'react';
import { useNavigate, Link } from 'react-router-dom';

const ClientDetailsScreen = () => {
    const navigate = useNavigate();
    return (
        <div className="relative flex min-h-screen flex-col w-full overflow-x-hidden pb-24 group/design-root bg-[#f8f6f7] dark:bg-[#22101c] max-w-md mx-auto shadow-2xl font-['Plus_Jakarta_Sans']">
            <div className="sticky top-0 z-50 flex items-center justify-between p-4 bg-[#f8f6f7]/80 dark:bg-[#22101c]/80 backdrop-blur-md">
                <button onClick={() => navigate(-1)} className="flex size-10 shrink-0 items-center justify-center rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-colors">
                    <span className="material-symbols-outlined text-slate-900 dark:text-white">arrow_back</span>
                </button>
                <h2 className="text-slate-900 dark:text-white text-lg font-bold leading-tight tracking-[-0.015em] flex-1 text-center">Detalhes do Cliente</h2>
                <button className="flex h-10 items-center justify-center px-2">
                    <p className="text-[#ee2bad] text-base font-bold leading-normal tracking-[0.015em] shrink-0">Editar</p>
                </button>
            </div>
            {/* Profile Header */}
            <div className="flex flex-col items-center p-4 gap-4">
                <div className="relative">
                    <div className="bg-center bg-no-repeat aspect-square bg-cover rounded-full h-32 w-32 shadow-xl ring-4 ring-white dark:ring-white/10" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuBLl--xMESLMml9nqZwvF82Wtq8k_pE2P7qIPR8_1ASaa3RdPNTa3nC-uGD8_qNAi4KTCycSnKwm1owVbTmIxfKUzdVgwUu_T9rcAsf-gwagnhcxoDTCawLSqSF6u-HMrGA6Yd7MIHoguAOAPPRkO97z3J4p7Y9qER4aP5J59V9yD3oPRKJMl6WUfixe3R_S49ZKDgCGRHvttTz60z2vkvXvbh6cQUVVArkD8ngtbroLU33CYcanOpf2ID8ET_fEVIw6BquSlBMjM0g")' }}></div>
                    <div className="absolute bottom-0 right-0 bg-[#ee2bad] text-white text-xs font-bold px-2 py-1 rounded-full border-2 border-white dark:border-[#2d1b27] shadow-sm">VIP</div>
                </div>
                <div className="flex flex-col items-center justify-center">
                    <h1 className="text-slate-900 dark:text-white text-[22px] font-bold leading-tight tracking-[-0.015em] text-center">Mariana Silva</h1>
                    <p className="text-slate-500 dark:text-slate-400 text-sm font-medium leading-normal text-center mt-1">Cliente desde 2019</p>
                </div>
            </div>
            {/* Actions */}
            <div className="px-4 py-2">
                <div className="grid grid-cols-3 gap-3">
                    <button className="flex flex-col items-center gap-2 bg-white dark:bg-[#2d1b27] p-3 rounded-xl shadow-sm hover:bg-gray-50 dark:hover:bg-white/5 transition-colors group">
                        <div className="rounded-full bg-[#ee2bad]/10 p-2.5 text-[#ee2bad] group-hover:bg-[#ee2bad] group-hover:text-white transition-colors">
                            <span className="material-symbols-outlined text-[24px]">call</span>
                        </div>
                        <span className="text-slate-700 dark:text-slate-200 text-xs font-medium">Ligar</span>
                    </button>
                    <button className="flex flex-col items-center gap-2 bg-white dark:bg-[#2d1b27] p-3 rounded-xl shadow-sm hover:bg-gray-50 dark:hover:bg-white/5 transition-colors group">
                        <div className="rounded-full bg-[#ee2bad]/10 p-2.5 text-[#ee2bad] group-hover:bg-[#ee2bad] group-hover:text-white transition-colors">
                            <span className="material-symbols-outlined text-[24px]">chat</span>
                        </div>
                        <span className="text-slate-700 dark:text-slate-200 text-xs font-medium">WhatsApp</span>
                    </button>
                    <button className="flex flex-col items-center gap-2 bg-white dark:bg-[#2d1b27] p-3 rounded-xl shadow-sm hover:bg-gray-50 dark:hover:bg-white/5 transition-colors group">
                        <div className="rounded-full bg-[#ee2bad]/10 p-2.5 text-[#ee2bad] group-hover:bg-[#ee2bad] group-hover:text-white transition-colors">
                            <span className="material-symbols-outlined text-[24px]">mail</span>
                        </div>
                        <span className="text-slate-700 dark:text-slate-200 text-xs font-medium">Email</span>
                    </button>
                </div>
            </div>
            <div className="h-4"></div>
            {/* Birthday Spotlight */}
            <div className="flex flex-col gap-3 px-4">
                <h3 className="text-slate-900 dark:text-white tracking-tight text-lg font-bold leading-tight">Próximo Aniversário</h3>
                <div className="flex flex-col rounded-xl overflow-hidden shadow-md bg-white dark:bg-[#2d1b27] ring-1 ring-black/5 dark:ring-white/10">
                    <div className="relative h-40 w-full">
                        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuBaD6es_HGA8NgFHn5ipx7bQ0xKVeF2qSjWnlr-qUV2tuVzgR_yhky34QluGBmeTUYIw1S6jpXtLape--cx115v551X5VFgzQnxP27TO0HgcNxezRyCW2lfsbfd7swJk8Fzdosi-qPlg7bMjnf0pzs7xY6dSD7uVSVSZ7VnZdgJdTxFJCZOoofzrKFgEJ3jxH9sfrtsXbYiQ375ICxgT5tkOGXHs--gNgRtgneZpLFOdTa1WpzJtL7ooK69KiaNrgBBQwaLghCdEVMr")' }}></div>
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                        <div className="absolute bottom-3 left-4 text-white">
                            <p className="text-sm font-medium opacity-90">Vai fazer 6 anos</p>
                            <p className="text-2xl font-bold">12 de Outubro</p>
                        </div>
                        <div className="absolute top-3 right-3 bg-white/20 backdrop-blur-md border border-white/30 text-white text-xs font-bold px-2 py-1 rounded-full flex items-center gap-1">
                            <span className="material-symbols-outlined text-[14px]">timer</span>Faltam 3 meses
                        </div>
                    </div>
                    <div className="p-4 flex flex-col gap-3">
                        <div className="flex items-center justify-between gap-4">
                            <div className="flex flex-col">
                                <span className="text-sm font-bold text-slate-900 dark:text-white">Planejamento Pendente</span>
                                <span className="text-xs text-slate-500 dark:text-slate-400">Nenhuma festa agendada ainda</span>
                            </div>
                            <Link to="/admin/new-party" className="flex-1 max-w-[160px] cursor-pointer items-center justify-center rounded-full h-10 px-4 bg-[#ee2bad] hover:bg-[#ee2bad]/90 text-white text-sm font-bold shadow-lg shadow-[#ee2bad]/30 transition-all active:scale-95 flex">
                                <span className="truncate">Planejar Festa</span>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
            <div className="h-6"></div>
            {/* Info Section */}
            <div className="px-4">
                <h3 className="text-slate-900 dark:text-white tracking-tight text-lg font-bold leading-tight mb-3">Informações</h3>
                <div className="bg-white dark:bg-[#2d1b27] rounded-xl p-4 shadow-sm ring-1 ring-black/5 dark:ring-white/10 space-y-4">
                    <div className="flex items-start gap-3">
                        <div className="mt-1 text-slate-400 dark:text-slate-500">
                            <span className="material-symbols-outlined text-[20px]">location_on</span>
                        </div>
                        <div>
                            <p className="text-sm font-medium text-slate-900 dark:text-white">Endereço Principal</p>
                            <p className="text-sm text-slate-500 dark:text-slate-400 mt-0.5">Av. Paulista, 1578 - Bela Vista, São Paulo - SP</p>
                        </div>
                    </div>
                    <div className="h-px bg-slate-100 dark:bg-white/5 w-full"></div>
                    <div className="flex items-start gap-3">
                        <div className="mt-1 text-slate-400 dark:text-slate-500">
                            <span className="material-symbols-outlined text-[20px]">sticky_note_2</span>
                        </div>
                        <div>
                            <p className="text-sm font-medium text-slate-900 dark:text-white">Notas & Preferências</p>
                            <div className="flex flex-wrap gap-2 mt-2">
                                <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300">Alergia a amendoim</span>
                                <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300">Gosta de Super-heróis</span>
                                <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-300">Contato via WhatsApp</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="h-6"></div>
            {/* History Section */}
            <div className="px-4 mb-8">
                <div className="flex items-center justify-between mb-3">
                    <h3 className="text-slate-900 dark:text-white tracking-tight text-lg font-bold leading-tight">Histórico de Festas</h3>
                    <span className="text-xs font-medium text-[#ee2bad] cursor-pointer">Ver todos</span>
                </div>
                <div className="bg-white dark:bg-[#2d1b27] rounded-xl p-0 shadow-sm ring-1 ring-black/5 dark:ring-white/10 overflow-hidden">
                    <div className="relative flex gap-4 p-4 group border-b border-slate-100 dark:border-white/5 last:border-0 hover:bg-slate-50 dark:hover:bg-white/5 transition-colors">
                        <div className="shrink-0 relative">
                            <div className="h-12 w-12 rounded-lg bg-cover bg-center" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuCXA8OO_frS70gL-2FSFADXiA0hLhqGg8QR2Gk6_3tMCYIBjmwB5oUS_t28mvt8RnHfuH_yuNTtBWjGCRfjNUDwvNTdWO5JfWrInmrt1IMsuSgmyR-Eq1kR9oWmegHLmftBQ49bhhZXZXMRgUT27x7wAUSO4YldNNrZ3AixkpqjGB1dSETARYTJO0pPTaJLJCBLS9wHHCU1Wm21JaATBxL4bALXmWt9MyAaKil2FFIzKTtZYrvto6gwLzsRxMiMTk6kYAT-8YyttvZd")' }}></div>
                        </div>
                        <div className="flex flex-col flex-1 justify-center">
                            <div className="flex justify-between items-start">
                                <p className="text-sm font-bold text-slate-900 dark:text-white">Festa de 5 Anos</p>
                                <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-900/30 px-2 py-0.5 rounded-full">R$ 4.500</span>
                            </div>
                            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Tema: Frozen • Out 2023</p>
                        </div>
                    </div>
                </div>
            </div>
            <Link to="/admin/new-party" className="fixed bottom-6 right-6 h-14 w-14 rounded-full bg-[#ee2bad] text-white shadow-lg shadow-[#ee2bad]/40 flex items-center justify-center hover:scale-105 active:scale-95 transition-all z-50 ring-2 ring-white dark:ring-[#2d1b27]">
                <span className="material-symbols-outlined text-[28px]">add</span>
            </Link>
        </div>
    );
};

export default ClientDetailsScreen;
