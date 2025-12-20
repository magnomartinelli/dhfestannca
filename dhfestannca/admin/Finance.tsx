import React from 'react';
import { useNavigate, Link } from 'react-router-dom';

const FinanceScreen = () => {
    const navigate = useNavigate();
    return (
        <div className="relative mx-auto flex h-full min-h-screen w-full max-w-md flex-col overflow-x-hidden bg-white dark:bg-[#1a0b15] shadow-2xl font-['Plus_Jakarta_Sans']">
            <header className="sticky top-0 z-20 flex items-center justify-between bg-white/90 dark:bg-[#1a0b15]/90 px-4 py-3 backdrop-blur-md">
                <button onClick={() => navigate(-1)} className="flex size-10 items-center justify-center rounded-full text-[#181116] dark:text-white hover:bg-gray-100 dark:hover:bg-white/10">
                    <span className="material-symbols-outlined">arrow_back</span>
                </button>
                <h1 className="flex-1 text-center text-lg font-bold text-[#181116] dark:text-white">Fluxo de Caixa</h1>
                <button className="flex size-10 items-center justify-center rounded-full text-[#181116] dark:text-white hover:bg-gray-100 dark:hover:bg-white/10">
                    <span className="material-symbols-outlined">settings</span>
                </button>
            </header>
            <div className="flex w-full gap-3 overflow-x-auto px-4 py-2 pb-4 hide-scrollbar">
                <button className="flex h-9 shrink-0 items-center justify-center gap-x-2 rounded-full bg-[#ee2bad] px-4 shadow-lg shadow-[#ee2bad]/30 transition-transform active:scale-95">
                    <span className="material-symbols-outlined text-white text-[18px]">calendar_month</span>
                    <span className="text-sm font-semibold text-white">Outubro 2023</span>
                </button>
                <button className="flex h-9 shrink-0 items-center justify-center gap-x-2 rounded-full bg-[#f4f0f3] dark:bg-white/5 px-4 transition-colors hover:bg-gray-200 dark:hover:bg-white/10">
                    <span className="text-sm font-medium text-[#181116] dark:text-white/80">Novembro 2023</span>
                </button>
            </div>
            <main className="flex-1 space-y-6 pb-24">
                <section className="px-4">
                    <div className="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-[#22101c] to-[#4a233d] p-6 shadow-xl dark:border dark:border-white/10">
                        <div className="absolute -right-12 -top-12 h-40 w-40 rounded-full bg-[#ee2bad]/20 blur-2xl"></div>
                        <div className="relative z-10 flex flex-col items-center gap-1 text-center">
                            <span className="text-sm font-medium text-white/70">Saldo Atual</span>
                            <h2 className="text-4xl font-extrabold tracking-tight text-white">R$ 12.500,00</h2>
                        </div>
                        <div className="mt-6 flex gap-3">
                            <div className="flex flex-1 flex-col items-center gap-1 rounded-2xl bg-white/10 p-3 backdrop-blur-sm">
                                <div className="flex size-8 items-center justify-center rounded-full bg-[#078854]/20 text-[#4ade80]">
                                    <span className="material-symbols-outlined text-[20px]">trending_up</span>
                                </div>
                                <span className="text-xs font-medium text-white/60">Receitas</span>
                                <span className="text-lg font-bold text-white">R$ 25k</span>
                            </div>
                            <div className="flex flex-1 flex-col items-center gap-1 rounded-2xl bg-white/10 p-3 backdrop-blur-sm">
                                <div className="flex size-8 items-center justify-center rounded-full bg-red-500/20 text-red-300">
                                    <span className="material-symbols-outlined text-[20px]">trending_down</span>
                                </div>
                                <span className="text-xs font-medium text-white/60">Despesas</span>
                                <span className="text-lg font-bold text-white">R$ 12.5k</span>
                            </div>
                        </div>
                    </div>
                </section>
                <section className="px-4">
                    <div className="flex items-center justify-between pb-4">
                        <h3 className="text-lg font-bold text-[#181116] dark:text-white">Resumo Visual</h3>
                        <button className="text-sm font-semibold text-[#ee2bad] hover:text-[#ee2bad]/80">Ver tudo</button>
                    </div>
                    <div className="rounded-[2rem] border border-[#e6dbe2] dark:border-white/10 bg-white dark:bg-white/5 p-5 shadow-sm">
                        <div className="mb-4 flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-[#89617c] dark:text-white/60">Maior Gasto</p>
                                <p className="text-xl font-bold text-[#181116] dark:text-white">Buffet & Bebidas</p>
                            </div>
                            <div className="rounded-full bg-red-50 dark:bg-red-900/20 px-3 py-1 text-xs font-bold text-red-600 dark:text-red-300">+15% vs mês anterior</div>
                        </div>
                        <div className="grid grid-cols-5 items-end gap-3 h-[140px] pt-4 border-t border-dashed border-gray-200 dark:border-white/10">
                            {/* Chart Bars Placeholder */}
                            <div className="flex flex-col items-center gap-2 h-full justify-end group">
                                <div className="w-full max-w-[40px] rounded-t-lg bg-[#f4f0f3] dark:bg-white/10" style={{ height: '60%' }}></div>
                                <span className="text-[10px] font-semibold text-[#89617c] dark:text-white/60 truncate w-full text-center">Decoração</span>
                            </div>
                            <div className="flex flex-col items-center gap-2 h-full justify-end group">
                                <div className="w-full max-w-[40px] rounded-t-lg bg-[#ee2bad] shadow-lg shadow-[#ee2bad]/20" style={{ height: '85%' }}></div>
                                <span className="text-[10px] font-bold text-[#ee2bad] truncate w-full text-center">Buffet</span>
                            </div>
                            <div className="flex flex-col items-center gap-2 h-full justify-end group">
                                <div className="w-full max-w-[40px] rounded-t-lg bg-[#f4f0f3] dark:bg-white/10" style={{ height: '40%' }}></div>
                                <span className="text-[10px] font-semibold text-[#89617c] dark:text-white/60 truncate w-full text-center">Som</span>
                            </div>
                            <div className="flex flex-col items-center gap-2 h-full justify-end group">
                                <div className="w-full max-w-[40px] rounded-t-lg bg-[#f4f0f3] dark:bg-white/10" style={{ height: '50%' }}></div>
                                <span className="text-[10px] font-semibold text-[#89617c] dark:text-white/60 truncate w-full text-center">Local</span>
                            </div>
                            <div className="flex flex-col items-center gap-2 h-full justify-end group">
                                <div className="w-full max-w-[40px] rounded-t-lg bg-[#f4f0f3] dark:bg-white/10" style={{ height: '30%' }}></div>
                                <span className="text-[10px] font-semibold text-[#89617c] dark:text-white/60 truncate w-full text-center">Outros</span>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
            <div className="fixed bottom-24 right-4 z-30">
                <button className="flex size-14 items-center justify-center rounded-full bg-[#ee2bad] text-white shadow-lg shadow-[#ee2bad]/40 transition-transform hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-[#ee2bad] focus:ring-offset-2">
                    <span className="material-symbols-outlined text-[32px]">add</span>
                </button>
            </div>
            <nav className="fixed bottom-0 z-20 w-full max-w-md border-t border-gray-100 dark:border-white/5 bg-white dark:bg-[#1a0b15] pb-6 pt-3">
                <div className="flex justify-around">
                    <Link to="/admin/dashboard" className="flex flex-col items-center gap-1 text-[#89617c] dark:text-white/40">
                        <span className="material-symbols-outlined">home</span>
                        <span className="text-[10px] font-medium">Início</span>
                    </Link>
                    <Link to="/admin/finance" className="flex flex-col items-center gap-1 text-[#ee2bad]">
                        <span className="material-symbols-outlined font-bold">account_balance_wallet</span>
                        <span className="text-[10px] font-bold">Fluxo</span>
                    </Link>
                    <Link to="/admin/parties" className="flex flex-col items-center gap-1 text-[#89617c] dark:text-white/40">
                        <span className="material-symbols-outlined">event</span>
                        <span className="text-[10px] font-medium">Eventos</span>
                    </Link>
                    <Link to="/admin/clients" className="flex flex-col items-center gap-1 text-[#89617c] dark:text-white/40">
                        <span className="material-symbols-outlined">person</span>
                        <span className="text-[10px] font-medium">Perfil</span>
                    </Link>
                </div>
            </nav>
        </div>
    );
};

export default FinanceScreen;
