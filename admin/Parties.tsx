import React from 'react';
import { Link } from 'react-router-dom';

const PartyListScreen = () => {
    return (
        <div className="bg-[#f8f6f7] dark:bg-[#22101c] min-h-screen relative pb-24 max-w-md mx-auto shadow-2xl font-['Plus_Jakarta_Sans']">
            <header className="sticky top-0 z-50 bg-[#f8f6f7]/95 dark:bg-[#22101c]/95 backdrop-blur-md transition-colors duration-300">
                <div className="flex items-center justify-between px-4 pt-4 pb-2">
                    <button className="flex size-10 items-center justify-center rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-colors">
                        <span className="material-symbols-outlined text-[#181116] dark:text-[#f8f6f7]">menu</span>
                    </button>
                    <h1 className="text-[#181116] dark:text-[#f8f6f7] text-lg font-bold leading-tight tracking-tight flex-1 text-center">Minhas Festas</h1>
                    <button className="relative flex size-10 items-center justify-center rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-colors">
                        <span className="material-symbols-outlined text-[#181116] dark:text-[#f8f6f7]">notifications</span>
                        <span className="absolute top-2 right-2 size-2.5 bg-[#ee2bad] rounded-full border-2 border-[#f8f6f7] dark:border-[#22101c]"></span>
                    </button>
                </div>
            </header>
            <main className="w-full flex flex-col gap-6 px-4 pt-2">
                {/* Search */}
                <div className="relative group">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <span className="material-symbols-outlined text-[#89617c] dark:text-[#dcbcd1]">search</span>
                    </div>
                    <input className="block w-full pl-12 pr-4 py-3.5 bg-white dark:bg-[#2d1b27] border-none rounded-xl text-[#181116] dark:text-[#f8f6f7] placeholder-[#89617c] dark:placeholder-[#dcbcd1] focus:ring-2 focus:ring-[#ee2bad]/50 shadow-sm text-base font-medium transition-all" placeholder="Buscar cliente, data ou tema" type="text" />
                </div>
                {/* Chips */}
                <div className="flex gap-2 overflow-x-auto hide-scrollbar pb-1 -mx-4 px-4">
                    <button className="flex shrink-0 items-center h-10 px-5 rounded-full bg-[#ee2bad] text-white shadow-soft transition-transform active:scale-95">
                        <span className="text-sm font-bold">Todas</span>
                    </button>
                    <button className="flex shrink-0 items-center h-10 px-5 rounded-full bg-white dark:bg-[#2d1b27] border border-gray-100 dark:border-gray-700 text-[#181116] dark:text-[#f8f6f7] transition-transform active:scale-95">
                        <span className="text-sm font-medium">Em breve</span>
                    </button>
                    <button className="flex shrink-0 items-center h-10 px-5 rounded-full bg-white dark:bg-[#2d1b27] border border-gray-100 dark:border-gray-700 text-[#181116] dark:text-[#f8f6f7] transition-transform active:scale-95">
                        <span className="text-sm font-medium">Planejamento</span>
                    </button>
                </div>
                {/* Events List */}
                <div className="flex flex-col gap-4">
                    <div className="flex items-center justify-between">
                        <h2 className="text-[#181116] dark:text-[#f8f6f7] text-xl font-bold tracking-tight">Próximos Eventos</h2>
                        <a className="text-[#ee2bad] text-sm font-bold hover:text-[#c91a8e] transition-colors" href="#">Ver calendário</a>
                    </div>
                    {/* Card 1 */}
                    <div className="group relative flex flex-col w-full overflow-hidden rounded-2xl bg-white dark:bg-[#2d1b27] shadow-card transition-all hover:shadow-lg active:scale-[0.99]">
                        <div className="relative h-48 w-full">
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent z-10"></div>
                            <img className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" src="https://lh3.googleusercontent.com/aida-public/AB6AXuC9BHi_0_36IFsOO9x-Y73ghHLyxgsgTRX0eAqgJG_IobwK2sqVnaiMrJ2fQAjCvrsxLjDN3vFE3Kdfj97qEzhUKmEHHQ1pk9r_E-0aIeF31iUclwhl92YU1K9rgx5Vr2jfqyY26iqRhpy25KG1ebI45z-6NFOW8mjPseU-oHMEpD5V7Ii8wswqFmqWl9O3E63XujuFoDKoFnd5juT-PWhvyI8G8R77KDsIxL0h2zu--fcmoKMJ1HCupW9CgVsmH_kZLAA7NeMNBJLK" alt="Party" />
                            <div className="absolute top-3 left-3 z-20">
                                <span className="inline-flex items-center gap-1.5 rounded-full bg-white/20 backdrop-blur-md px-3 py-1 text-xs font-bold text-white border border-white/30">
                                    <span className="h-2 w-2 rounded-full bg-green-400"></span>Confirmada
                                </span>
                            </div>
                            <div className="absolute top-3 right-3 z-20 flex flex-col items-center justify-center rounded-xl bg-white/90 dark:bg-[#2d1b27]/90 backdrop-blur-sm p-2 text-center w-14 shadow-lg">
                                <span className="text-xs font-bold text-[#ee2bad] uppercase">Nov</span>
                                <span className="text-xl font-extrabold text-[#181116] dark:text-[#f8f6f7] leading-none">12</span>
                            </div>
                        </div>
                        <div className="flex flex-col gap-3 p-5">
                            <div>
                                <h3 className="text-lg font-bold text-[#181116] dark:text-[#f8f6f7] leading-tight">Aniversário da Sofia - 5 Anos</h3>
                                <p className="text-[#ee2bad] font-medium text-sm mt-1">Tema: Unicórnio Mágico</p>
                            </div>
                            <div className="flex items-center gap-3 mt-1">
                                <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#f8f6f7] dark:bg-[#22101c]/50">
                                    <span className="material-symbols-outlined text-[18px] text-[#89617c] dark:text-[#dcbcd1]">filter_drama</span>
                                    <span className="text-xs font-bold text-[#181116] dark:text-[#f8f6f7]">Arco Cheio</span>
                                </div>
                                <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#f8f6f7] dark:bg-[#22101c]/50">
                                    <span className="material-symbols-outlined text-[18px] text-[#89617c] dark:text-[#dcbcd1]">table_restaurant</span>
                                    <span className="text-xs font-bold text-[#181116] dark:text-[#f8f6f7]">4 Prov.</span>
                                </div>
                            </div>
                            <div className="mt-2 pt-3 border-t border-gray-100 dark:border-gray-700 flex justify-between items-center">
                                <div className="flex -space-x-2">
                                    <img className="inline-block h-6 w-6 rounded-full ring-2 ring-white dark:ring-[#2d1b27]" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAA2YCUGS47vrNVqGnh_OdCED6uVst82CVtV3qNFMMTafklE5olnix4FUsMv6gSGyY3WBxKx0SZQsj6Ef3CjqnckBLqf0UR9HlBuY6XHuI4pBFWs6Mpklv2u5or-TUWYv4LgJG_YP0gi8Mbz2ay39eFFlVzAdd1sXPNYLebulEa4Wrh04CKljqWQXRSaL_6RdSrUJ9JiztJACeYOr2cz5DNwqtOYWOhkOymAfCSJTJmEhM9xrSSSAJhjODsmdrx4FBkABs3K2x61nYG" alt="Helper" />
                                    <img className="inline-block h-6 w-6 rounded-full ring-2 ring-white dark:ring-[#2d1b27]" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCucLt0950BsasstXWp8rFA8WW5J5uz90hKqIo8UespLCBZqu4zZ52vXOIdhK-AEbgy-Br62mYRjI_SlJ_FZr8X4HAdC-wYyddmyDpadT3F1yW07Dkio96h9se1X_jo1dL7ph9wkn3bsFgLS3FadHZBA81kFGIQHha5Ea49fGnGLfSLxLLw1deawwdqWB5PvqLy_Dcjo05uYBf9Hip_PMT8Xl42pwtdBgbwjWuaQFvCNNtD42fl-OfA67HNkp7FqlGkIkYsEJHPvHA4" alt="Helper" />
                                </div>
                                <button className="text-sm font-bold text-[#89617c] dark:text-[#dcbcd1] hover:text-[#ee2bad] transition-colors flex items-center gap-1">
                                    Gerenciar <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                                </button>
                            </div>
                        </div>
                    </div>
                    {/* Card 2 */}
                    <div className="group relative flex flex-col w-full overflow-hidden rounded-2xl bg-white dark:bg-[#2d1b27] shadow-card transition-all hover:shadow-lg active:scale-[0.99]">
                        <div className="relative h-40 w-full">
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent z-10"></div>
                            <img className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBc6sltUqr8RR2Hk8Bfqpak5RLiHXccMAE-pUaRJUZcGezhFaq1zq4geYESfHWIKo3Wj8Sqx4qiMNFgiMGKUM6qsnRK4wrQ1fR_ND_1V5tU3NJUL_Ewb0vyyxVHOuXa3E8xr4sNeR25WdIWIFzRNuz-fEqC1llzLeNCxaIXLl3_e813GSEjuyyJVEmMyJOUjC9jUWaaJKAljQWn8t-ktllGH6UiUz4GlorH0mXXZ8ugAPwqMfSPX0LF4k4YEZ3Eelk-Sg9RyDsHdaeI" alt="Party" />
                            <div className="absolute top-3 left-3 z-20">
                                <span className="inline-flex items-center gap-1.5 rounded-full bg-white/20 backdrop-blur-md px-3 py-1 text-xs font-bold text-white border border-white/30">
                                    <span className="h-2 w-2 rounded-full bg-yellow-400"></span>Em Planejamento
                                </span>
                            </div>
                        </div>
                        <div className="flex flex-col gap-3 p-5">
                            <div>
                                <h3 className="text-lg font-bold text-[#181116] dark:text-[#f8f6f7] leading-tight">Chá de Bebê - Miguel</h3>
                                <p className="text-[#ee2bad] font-medium text-sm mt-1">Tema: Super Heróis Baby</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="h-12"></div>
            </main>
            <div className="fixed bottom-24 right-4 z-40">
                <Link to="/admin/new-party" className="group flex items-center justify-center size-14 rounded-full bg-[#ee2bad] text-white shadow-[0_8px_25px_rgba(238,43,173,0.4)] hover:bg-[#c91a8e] hover:scale-105 active:scale-95 transition-all duration-300">
                    <span className="material-symbols-outlined text-[32px] group-hover:rotate-90 transition-transform duration-300">add</span>
                </Link>
            </div>
            <nav className="fixed bottom-0 left-0 w-full bg-white dark:bg-[#2d1b27] border-t border-gray-100 dark:border-gray-800 pb-safe pt-2 z-50 max-w-md mx-auto left-0 right-0">
                <div className="flex items-center justify-around pb-4">
                    <Link to="/admin/parties" className="flex flex-col items-center gap-1 p-2 group">
                        <span className="material-symbols-outlined filled text-[#ee2bad] text-[28px] group-active:scale-90 transition-transform">celebration</span>
                        <span className="text-[10px] font-bold text-[#ee2bad]">Festas</span>
                    </Link>
                    <Link to="/admin/dashboard" className="flex flex-col items-center gap-1 p-2 group">
                        <span className="material-symbols-outlined text-[#89617c] dark:text-[#dcbcd1] text-[28px] group-active:scale-90 transition-transform">dashboard</span>
                        <span className="text-[10px] font-medium text-[#89617c] dark:text-[#dcbcd1]">Início</span>
                    </Link>
                    <Link to="/admin/finance" className="flex flex-col items-center gap-1 p-2 group">
                        <span className="material-symbols-outlined text-[#89617c] dark:text-[#dcbcd1] text-[28px] group-active:scale-90 transition-transform">account_balance_wallet</span>
                        <span className="text-[10px] font-medium text-[#89617c] dark:text-[#dcbcd1]">Financeiro</span>
                    </Link>
                    <Link to="/admin/clients" className="flex flex-col items-center gap-1 p-2 group">
                        <span className="material-symbols-outlined text-[#89617c] dark:text-[#dcbcd1] text-[28px] group-active:scale-90 transition-transform">person</span>
                        <span className="text-[10px] font-medium text-[#89617c] dark:text-[#dcbcd1]">Perfil</span>
                    </Link>
                </div>
            </nav>
        </div>
    );
};

export default PartyListScreen;
