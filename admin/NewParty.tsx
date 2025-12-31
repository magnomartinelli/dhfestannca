import React from 'react';
import { useNavigate } from 'react-router-dom';

const NewPartyScreen = () => {
    const navigate = useNavigate();
    return (
        <div className="relative flex flex-col min-h-screen w-full max-w-md mx-auto bg-[#f8f6f7] dark:bg-[#22101c] shadow-2xl overflow-hidden font-['Plus_Jakarta_Sans']">
            <header className="sticky top-0 z-50 flex items-center justify-between px-5 py-4 bg-[#f8f6f7]/90 dark:bg-[#22101c]/90 backdrop-blur-md border-b border-zinc-200/50 dark:border-white/5">
                <button onClick={() => navigate(-1)} className="text-zinc-500 dark:text-zinc-400 text-base font-medium hover:text-zinc-800 dark:hover:text-zinc-200 transition-colors">Cancelar</button>
                <h1 className="text-lg font-bold text-zinc-900 dark:text-white tracking-tight">Nova Festa</h1>
                <button onClick={() => navigate('/admin/parties')} className="text-[#ee2bad] font-bold text-base hover:text-[#ee2bad]/80 transition-colors">Salvar</button>
            </header>
            <main className="flex-1 overflow-y-auto px-5 pb-32 pt-2">
                <section className="mt-6">
                    <h2 className="text-lg font-bold text-zinc-900 dark:text-white mb-4 px-1">O Cliente</h2>
                    <div className="space-y-4">
                        <div className="group">
                            <label className="block text-sm font-medium text-zinc-500 dark:text-zinc-400 mb-1.5 ml-2">Nome do Cliente</label>
                            <div className="relative flex items-center">
                                <input className="w-full bg-white dark:bg-[#2d1b27] border-0 ring-1 ring-zinc-200 dark:ring-white/10 rounded-full py-3.5 pl-12 pr-4 text-zinc-900 dark:text-white placeholder-zinc-400 focus:ring-2 focus:ring-[#ee2bad] focus:outline-none transition-shadow shadow-sm" placeholder="Ex: Maria Silva" type="text" />
                                <span className="material-symbols-outlined absolute left-4 text-[#ee2bad] text-[22px]">person</span>
                            </div>
                        </div>
                        <div className="group">
                            <label className="block text-sm font-medium text-zinc-500 dark:text-zinc-400 mb-1.5 ml-2">Contato</label>
                            <div className="relative flex items-center">
                                <input className="w-full bg-white dark:bg-[#2d1b27] border-0 ring-1 ring-zinc-200 dark:ring-white/10 rounded-full py-3.5 pl-12 pr-4 text-zinc-900 dark:text-white placeholder-zinc-400 focus:ring-2 focus:ring-[#ee2bad] focus:outline-none transition-shadow shadow-sm" placeholder="(00) 00000-0000" type="tel" />
                                <span className="material-symbols-outlined absolute left-4 text-[#ee2bad] text-[22px]">call</span>
                            </div>
                        </div>
                    </div>
                </section>
                <section className="mt-8">
                    <h2 className="text-lg font-bold text-zinc-900 dark:text-white mb-4 px-1">O Evento</h2>
                    <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-zinc-500 dark:text-zinc-400 mb-1.5 ml-2">Data</label>
                                <div className="relative flex items-center">
                                    <input className="w-full bg-white dark:bg-[#2d1b27] border-0 ring-1 ring-zinc-200 dark:ring-white/10 rounded-full py-3.5 pl-11 pr-4 text-zinc-900 dark:text-white placeholder-zinc-400 focus:ring-2 focus:ring-[#ee2bad] focus:outline-none transition-shadow shadow-sm appearance-none" type="date" />
                                    <span className="material-symbols-outlined absolute left-4 text-[#ee2bad] text-[22px] pointer-events-none">calendar_today</span>
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-zinc-500 dark:text-zinc-400 mb-1.5 ml-2">Horário</label>
                                <div className="relative flex items-center">
                                    <input className="w-full bg-white dark:bg-[#2d1b27] border-0 ring-1 ring-zinc-200 dark:ring-white/10 rounded-full py-3.5 pl-11 pr-4 text-zinc-900 dark:text-white placeholder-zinc-400 focus:ring-2 focus:ring-[#ee2bad] focus:outline-none transition-shadow shadow-sm appearance-none" type="time" />
                                    <span className="material-symbols-outlined absolute left-4 text-[#ee2bad] text-[22px] pointer-events-none">schedule</span>
                                </div>
                            </div>
                        </div>
                        <div className="group">
                            <label className="block text-sm font-medium text-zinc-500 dark:text-zinc-400 mb-1.5 ml-2">Tema da Festa</label>
                            <div className="relative flex items-center">
                                <input className="w-full bg-white dark:bg-[#2d1b27] border-0 ring-1 ring-zinc-200 dark:ring-white/10 rounded-full py-3.5 pl-12 pr-4 text-zinc-900 dark:text-white placeholder-zinc-400 focus:ring-2 focus:ring-[#ee2bad] focus:outline-none transition-shadow shadow-sm" placeholder="Ex: Safari, Frozen, Anos 80" type="text" />
                                <span className="material-symbols-outlined absolute left-4 text-[#ee2bad] text-[22px]">celebration</span>
                            </div>
                        </div>
                    </div>
                </section>
                <section className="mt-8">
                    <div className="flex items-center justify-between mb-4 px-1">
                        <h2 className="text-lg font-bold text-zinc-900 dark:text-white">Itens Personalizados</h2>
                        <button className="text-xs font-bold text-[#ee2bad] uppercase tracking-wider bg-[#ee2bad]/10 px-3 py-1.5 rounded-full hover:bg-[#ee2bad]/20 transition-colors">Editar Lista</button>
                    </div>
                    <div className="space-y-3">
                        <div className="flex items-center justify-between p-4 bg-white dark:bg-[#2d1b27] rounded-2xl shadow-sm ring-1 ring-zinc-100 dark:ring-white/5">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400">
                                    <span className="material-symbols-outlined text-[20px]">toys</span>
                                </div>
                                <div>
                                    <p className="font-bold text-zinc-900 dark:text-white leading-tight">Arco de Balões</p>
                                    <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">Decoração</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-3 bg-zinc-50 dark:bg-black/20 rounded-full p-1">
                                <button className="w-7 h-7 flex items-center justify-center rounded-full bg-white dark:bg-[#2d1b27] text-zinc-400 hover:text-[#ee2bad] shadow-sm hover:shadow transition-all">
                                    <span className="material-symbols-outlined text-[16px]">remove</span>
                                </button>
                                <span className="text-sm font-bold w-3 text-center">1</span>
                                <button className="w-7 h-7 flex items-center justify-center rounded-full bg-[#ee2bad] text-white shadow-md hover:bg-[#ee2bad]/90 transition-all">
                                    <span className="material-symbols-outlined text-[16px]">add</span>
                                </button>
                            </div>
                        </div>
                        <div className="flex items-center justify-between p-4 bg-white dark:bg-[#2d1b27] rounded-2xl shadow-sm ring-1 ring-zinc-100 dark:ring-white/5">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center text-purple-600 dark:text-purple-400">
                                    <span className="material-symbols-outlined text-[20px]">table_restaurant</span>
                                </div>
                                <div>
                                    <p className="font-bold text-zinc-900 dark:text-white leading-tight">Mesas Provençais</p>
                                    <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">Mobiliário</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-3 bg-zinc-50 dark:bg-black/20 rounded-full p-1">
                                <button className="w-7 h-7 flex items-center justify-center rounded-full bg-white dark:bg-[#2d1b27] text-zinc-400 hover:text-[#ee2bad] shadow-sm hover:shadow transition-all">
                                    <span className="material-symbols-outlined text-[16px]">remove</span>
                                </button>
                                <span className="text-sm font-bold w-3 text-center">2</span>
                                <button className="w-7 h-7 flex items-center justify-center rounded-full bg-[#ee2bad] text-white shadow-md hover:bg-[#ee2bad]/90 transition-all">
                                    <span className="material-symbols-outlined text-[16px]">add</span>
                                </button>
                            </div>
                        </div>
                        <button className="w-full flex items-center justify-center gap-2 p-4 border-2 border-dashed border-[#ee2bad]/30 dark:border-[#ee2bad]/20 rounded-2xl text-[#ee2bad] font-bold hover:bg-[#ee2bad]/5 transition-colors group">
                            <span className="material-symbols-outlined group-hover:scale-110 transition-transform">add_circle</span>Adicionar Novo Item
                        </button>
                    </div>
                </section>
                <section className="mt-8 mb-6">
                    <h2 className="text-lg font-bold text-zinc-900 dark:text-white mb-4 px-1">Observações</h2>
                    <div className="relative">
                        <textarea className="w-full bg-white dark:bg-[#2d1b27] border-0 ring-1 ring-zinc-200 dark:ring-white/10 rounded-2xl py-4 px-4 text-zinc-900 dark:text-white placeholder-zinc-400 focus:ring-2 focus:ring-[#ee2bad] focus:outline-none transition-shadow shadow-sm resize-none" placeholder="Detalhes importantes, restrições alimentares, cores específicas..." rows={4}></textarea>
                        <div className="absolute bottom-3 right-3 pointer-events-none text-zinc-300 dark:text-zinc-600">
                            <span className="material-symbols-outlined text-[20px]">edit_note</span>
                        </div>
                    </div>
                </section>
            </main>
            <div className="absolute bottom-0 left-0 w-full p-5 bg-gradient-to-t from-[#f8f6f7] via-[#f8f6f7] to-transparent dark:from-[#22101c] dark:via-[#22101c] pointer-events-none flex justify-center pb-8 pt-12">
                <button onClick={() => navigate('/admin/parties')} className="pointer-events-auto w-full max-w-[90%] bg-[#ee2bad] hover:bg-[#ee2bad]/90 text-white font-bold text-lg py-4 px-8 rounded-full shadow-lg shadow-[#ee2bad]/30 flex items-center justify-center gap-2 transform active:scale-95 transition-all">
                    <span>Agendar Festa</span>
                    <span className="material-symbols-outlined">arrow_forward</span>
                </button>
            </div>
        </div>
    );
};

export default NewPartyScreen;
