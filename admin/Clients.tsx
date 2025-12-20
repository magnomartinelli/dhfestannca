import React from 'react';
import { Link } from 'react-router-dom';

const ClientListScreen = () => {
    return (
        <div className="bg-[#f8f6f7] dark:bg-[#22101c] font-['Plus_Jakarta_Sans'] text-[#181116] dark:text-white transition-colors duration-200 min-h-screen relative pb-24 max-w-md mx-auto shadow-2xl">
            <header className="sticky top-0 z-40 bg-[#f8f6f7]/90 dark:bg-[#22101c]/90 backdrop-blur-md transition-colors duration-200">
                <div className="flex items-center justify-between px-6 py-4">
                    <div>
                        <h1 className="text-2xl font-bold tracking-tight text-[#181116] dark:text-white">Meus Clientes</h1>
                        <p className="text-xs font-medium text-[#89617c] dark:text-gray-400">Total: 42 clientes</p>
                    </div>
                    <button className="flex h-10 w-10 items-center justify-center rounded-full bg-white dark:bg-[#2d1b27] shadow-sm active:scale-95 transition-all text-[#ee2bad]">
                        <span className="material-symbols-outlined">notifications</span>
                    </button>
                </div>
            </header>
            <div className="px-6 pb-2">
                <div className="relative flex h-12 w-full items-center overflow-hidden rounded-full bg-white dark:bg-[#2d1b27] shadow-sm border border-gray-100 dark:border-gray-800 transition-colors">
                    <div className="flex h-full w-12 items-center justify-center text-[#89617c]">
                        <span className="material-symbols-outlined text-[20px]">search</span>
                    </div>
                    <input className="h-full w-full border-none bg-transparent px-0 text-base text-[#181116] dark:text-white placeholder:text-[#89617c] focus:ring-0" placeholder="Buscar por nome ou telefone..." />
                </div>
            </div>
            <div className="w-full overflow-x-auto no-scrollbar py-4 pl-6">
                <div className="flex gap-3 pr-6 w-max">
                    <button className="flex h-9 min-w-[80px] items-center justify-center rounded-full bg-[#ee2bad] px-4 text-sm font-semibold text-white shadow-soft transition-transform active:scale-95">Todos</button>
                    <button className="flex h-9 min-w-[80px] items-center justify-center rounded-full bg-white dark:bg-[#2d1b27] border border-transparent dark:border-gray-700 px-4 text-sm font-medium text-[#89617c] hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">Ativos</button>
                    <button className="flex h-9 min-w-[80px] items-center justify-center rounded-full bg-white dark:bg-[#2d1b27] border border-transparent dark:border-gray-700 px-4 text-sm font-medium text-[#89617c] hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">Pendentes</button>
                </div>
            </div>
            <main className="flex flex-col gap-4 px-6 pt-2">
                {/* Card 1 */}
                <div className="group relative flex flex-col gap-3 rounded-[1.5rem] bg-white dark:bg-[#2d1b27] p-4 shadow-card transition-all hover:shadow-soft dark:border dark:border-gray-800">
                    <div className="flex items-start gap-4">
                        <div className="relative shrink-0">
                            <div className="h-16 w-16 rounded-full bg-gray-200 bg-cover bg-center shadow-inner" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuDMUUboFGolF-DNiyu3wxC22RaaZ74SCLOXOfnYFrTBvdyPkhyItX3hQN395vEhsZcvanrCLHrhIH5p7sSm8_W9NTKykiOiiyxnCmIWKzY92k4CpBm0kyZKY63SIsBR-t259zSUJBqdimZCx1KtQer1gpyaMG1BNf2ZX5-oq4_hODGyMN5WNFt0XOl1K3QNoLcAp98iwJL92v-Ew0ZONEPERl0hMubo2_bMgmT1DOlHNf-khwNPYyz-59L5yRFMj8QbnptL9lFxYpWm")' }}></div>
                            <div className="absolute -bottom-1 -right-1 flex h-6 w-6 items-center justify-center rounded-full bg-yellow-400 text-white shadow-sm ring-2 ring-white dark:ring-[#2d1b27]">
                                <span className="material-symbols-outlined text-[14px] font-bold">star</span>
                            </div>
                        </div>
                        <div className="flex flex-1 flex-col pt-1">
                            <div className="flex justify-between items-center">
                                <h3 className="text-lg font-bold text-[#181116] dark:text-white leading-tight">Ana Souza</h3>
                                <span className="rounded-full bg-[#ee2bad]/10 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-[#ee2bad]">VIP</span>
                            </div>
                            <p className="mt-1 line-clamp-2 text-sm text-[#89617c] dark:text-gray-400 font-medium">Última festa: Aniversário de 5 anos (12/10/2023)</p>
                        </div>
                    </div>
                    <div className="mt-2 flex items-center justify-between border-t border-gray-100 dark:border-gray-700 pt-3">
                        <div className="flex gap-2">
                            <button className="group/btn flex items-center justify-center gap-2 rounded-full bg-green-50 dark:bg-green-900/20 px-3 py-2 text-green-600 dark:text-green-400 transition-colors hover:bg-green-100 dark:hover:bg-green-900/40">
                                <span className="material-symbols-outlined text-[18px]">chat</span>
                                <span className="text-xs font-bold">WhatsApp</span>
                            </button>
                            <button className="flex h-8 w-8 items-center justify-center rounded-full bg-[#f8f6f7] dark:bg-gray-700 text-[#181116] dark:text-white hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors">
                                <span className="material-symbols-outlined text-[18px]">call</span>
                            </button>
                        </div>
                        <Link to="/admin/client-details" className="flex items-center gap-1 text-xs font-bold text-[#ee2bad] hover:underline">
                            Ver detalhes
                            <span className="material-symbols-outlined text-[16px]">chevron_right</span>
                        </Link>
                    </div>
                </div>
                {/* Card 2 */}
                <div className="group relative flex flex-col gap-3 rounded-[1.5rem] bg-white dark:bg-[#2d1b27] p-4 shadow-card transition-all hover:shadow-soft dark:border dark:border-gray-800">
                    <div className="flex items-start gap-4">
                        <div className="relative shrink-0">
                            <div className="h-16 w-16 rounded-full bg-gray-200 bg-cover bg-center shadow-inner" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuBNukilZJu8XZXUkjImvjJkcB9pMHWGlYjHf3AC5UVtPoVMg5jCgAnJ-zeoDs8aWkR9IQytrzkozGj5IlmG3DM-cAomOT8VWbbmRm5-_hU-dWdJkSKe52gWX0p639ReQADO7WQusv8z5mSG7_WoG13rxjQrC4WczMV2l--bZONCxdGCyeLuOiso3zXj7uTmxB-Rhm9bDFNhanwnTwebNtWSBX6cvIyf1omoJMzB4e5xEgNMR2mb2bppRDSzPN9nDrDPu5MCXgdeGdZh")' }}></div>
                        </div>
                        <div className="flex flex-1 flex-col pt-1">
                            <div className="flex justify-between items-center">
                                <h3 className="text-lg font-bold text-[#181116] dark:text-white leading-tight">Carlos Silva</h3>
                            </div>
                            <p className="mt-1 line-clamp-2 text-sm text-[#89617c] dark:text-gray-400 font-medium">Próxima festa: Casamento Civil (20/12/2023)</p>
                        </div>
                    </div>
                    <div className="mt-2 flex items-center justify-between border-t border-gray-100 dark:border-gray-700 pt-3">
                        <div className="flex gap-2">
                            <button className="group/btn flex items-center justify-center gap-2 rounded-full bg-green-50 dark:bg-green-900/20 px-3 py-2 text-green-600 dark:text-green-400 transition-colors hover:bg-green-100 dark:hover:bg-green-900/40">
                                <span className="material-symbols-outlined text-[18px]">chat</span>
                                <span className="text-xs font-bold">WhatsApp</span>
                            </button>
                        </div>
                        <Link to="/admin/client-details" className="flex items-center gap-1 text-xs font-bold text-[#ee2bad] hover:underline">
                            Ver detalhes
                            <span className="material-symbols-outlined text-[16px]">chevron_right</span>
                        </Link>
                    </div>
                </div>
            </main>
            <Link to="/admin/client-details" className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#ee2bad] text-white shadow-lg shadow-[#ee2bad]/40 transition-transform active:scale-90 hover:scale-105">
                <span className="material-symbols-outlined text-[32px]">add</span>
            </Link>
            <nav className="fixed bottom-0 left-0 right-0 z-50 flex items-center justify-around border-t border-black/5 dark:border-white/10 bg-white/90 dark:bg-[#2d1b27]/90 px-2 pb-5 pt-3 backdrop-blur-lg max-w-md mx-auto">
                <Link to="/admin/dashboard" className="flex flex-col items-center gap-1 p-2 text-gray-400 dark:text-gray-500 hover:text-[#ee2bad] transition-colors">
                    <span className="material-symbols-outlined text-2xl">dashboard</span>
                    <span className="text-[10px] font-medium">Início</span>
                </Link>
                <Link to="/admin/parties" className="flex flex-col items-center gap-1 p-2 text-gray-400 dark:text-gray-500 hover:text-[#ee2bad] transition-colors">
                    <span className="material-symbols-outlined text-2xl">calendar_month</span>
                    <span className="text-[10px] font-medium">Agenda</span>
                </Link>
                <Link to="/admin/finance" className="flex flex-col items-center gap-1 p-2 text-gray-400 dark:text-gray-500 hover:text-[#ee2bad] transition-colors">
                    <span className="material-symbols-outlined text-2xl">account_balance_wallet</span>
                    <span className="text-[10px] font-medium">Financeiro</span>
                </Link>
                <Link to="/admin/clients" className="flex flex-col items-center gap-1 p-2 text-[#ee2bad]">
                    <span className="material-symbols-outlined filled text-2xl" style={{ fontVariationSettings: "'FILL' 1" }}>person</span>
                    <span className="text-[10px] font-bold">Clientes</span>
                </Link>
            </nav>
        </div>
    );
};

export default ClientListScreen;
