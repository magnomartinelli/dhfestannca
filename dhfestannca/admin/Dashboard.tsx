import React from 'react';
import { Link } from 'react-router-dom';

const DashboardScreen = () => {
    return (
        <div className="relative flex h-full min-h-screen w-full flex-col overflow-x-hidden pb-24 max-w-md mx-auto bg-[#f8f6f7] dark:bg-[#22101c] shadow-2xl font-['Plus_Jakarta_Sans']">
            {/* Header */}
            <header className="sticky top-0 z-20 flex items-center justify-between bg-[#f8f6f7]/95 dark:bg-[#22101c]/95 backdrop-blur-md px-6 py-4 transition-colors duration-200">
                <div className="flex items-center gap-3">
                    <Link to="/admin/client-details" className="relative group cursor-pointer">
                        <div className="h-10 w-10 rounded-full bg-cover bg-center ring-2 ring-[#ee2bad] ring-offset-2 ring-offset-[#f8f6f7] dark:ring-offset-[#22101c]" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuDhuT1uZej6bS-fLcNuWx0znKBesn1MhtsR6CAnF-EFqvjFie-i9FA7jePEYSefIKHX4X7a9IqbfsARY5jS-cW48KPoYHC4MDdXpbxJ0Dkmtqr8-xPBHZQdEu5Hlc-OgJDxHFSyjsP6ZAC2eR4dZIbmt2OMSsi0L-1s1B15wu4mn_MbrNAaV--qByOHSF-ExYFCGbd6Pv5ROJz6rAYFQJarB1c6p0zaqJlCAvcN_HubaGmq0YyDFIsMka9OiTU6wv443yzFSRFGnQ19")' }}></div>
                        <div className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-green-500 ring-2 ring-white dark:ring-[#22101c]"></div>
                    </Link>
                    <div>
                        <p className="text-xs font-medium text-[#89617c] dark:text-[#dcbcd1]">Bem-vinda de volta,</p>
                        <h2 className="text-lg font-bold leading-tight">Clara Silva</h2>
                    </div>
                </div>
                <button className="flex h-10 w-10 items-center justify-center rounded-full bg-white dark:bg-[#2d1b27] shadow-sm ring-1 ring-black/5 dark:ring-white/10 active:scale-95 transition-transform">
                    <span className="material-symbols-outlined text-[#181116] dark:text-[#f8f6f7]">notifications</span>
                    <span className="absolute top-3 right-3 h-2 w-2 rounded-full bg-[#ee2bad] animate-pulse"></span>
                </button>
            </header>

            {/* Stats Overview */}
            <section className="w-full px-6 pt-2 pb-6">
                <div className="flex gap-4 overflow-x-auto no-scrollbar pb-2">
                    <div className="flex min-w-[140px] flex-1 flex-col gap-3 rounded-xl bg-white dark:bg-[#2d1b27] p-4 shadow-sm ring-1 ring-black/5 dark:ring-white/5">
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#ee2bad]/10 dark:bg-[#ee2bad]/20 text-[#ee2bad]">
                            <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>event_available</span>
                        </div>
                        <div>
                            <p className="text-2xl font-bold tracking-tight text-[#181116] dark:text-[#f8f6f7]">8</p>
                            <p className="text-xs font-medium text-[#89617c] dark:text-[#dcbcd1]">Eventos Ativos</p>
                        </div>
                    </div>
                    <div className="flex min-w-[140px] flex-1 flex-col gap-3 rounded-xl bg-white dark:bg-[#2d1b27] p-4 shadow-sm ring-1 ring-black/5 dark:ring-white/5">
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-orange-100 dark:bg-orange-500/20 text-orange-600 dark:text-orange-400">
                            <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>request_quote</span>
                        </div>
                        <div>
                            <p className="text-2xl font-bold tracking-tight text-[#181116] dark:text-[#f8f6f7]">3</p>
                            <p className="text-xs font-medium text-[#89617c] dark:text-[#dcbcd1]">Orçamentos</p>
                        </div>
                    </div>
                    <div className="flex min-w-[140px] flex-1 flex-col gap-3 rounded-xl bg-white dark:bg-[#2d1b27] p-4 shadow-sm ring-1 ring-black/5 dark:ring-white/5">
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-500/20 text-blue-600 dark:text-blue-400">
                            <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>task_alt</span>
                        </div>
                        <div>
                            <p className="text-2xl font-bold tracking-tight text-[#181116] dark:text-[#f8f6f7]">12</p>
                            <p className="text-xs font-medium text-[#89617c] dark:text-[#dcbcd1]">Tarefas</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Next Party Hero */}
            <section className="flex flex-col px-6 pb-6">
                <div className="flex items-center justify-between pb-3">
                    <h2 className="text-xl font-bold tracking-tight text-[#181116] dark:text-[#f8f6f7]">Próxima Festa</h2>
                    <Link to="/admin/parties" className="text-xs font-bold text-[#ee2bad] hover:text-[#c91a8e]">Ver agenda</Link>
                </div>
                <Link to="/admin/parties" className="group relative overflow-hidden rounded-2xl bg-white dark:bg-[#2d1b27] shadow-md ring-1 ring-black/5 dark:ring-white/5 transition-all active:scale-[0.98]">
                    <div className="relative h-32 w-full bg-gray-200">
                        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuD9OMNtQ2C9L7Qkrk3f0rc4k7CdU9MG31KpJfh4AXlo7nO9NdwlvixXskCQeBL4P_VY4utyQtieNLfQtsgqAjffiDhYarJwuSyRvtDRpr8GyXcnadUHLa8bXVlzj6wmHJG4oriVMiCMoxE2aOPsJkWKpWam5225d5hyhv-CT1x_wZiiHAsvZWJzHfmX_mgoqx0s30JJo74D1taYxj9VTdWO5_8By6B3JgGdbT9b24Xii5nTN1MkEEjZI8l_Chnv9sIxCyjgYCjgk65y")' }}></div>
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                        <div className="absolute bottom-3 left-4 right-4 flex justify-between items-end">
                            <span className="inline-flex items-center rounded-full bg-white/20 backdrop-blur-md px-2.5 py-0.5 text-xs font-medium text-white ring-1 ring-inset ring-white/30">Confirmado</span>
                            <div className="flex -space-x-2 overflow-hidden">
                                <img alt="" className="inline-block h-6 w-6 rounded-full ring-2 ring-white dark:ring-[#2d1b27]" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAhTAcKRqTDw_TEk1YoK2xzO2OSDxAj3GdNfqcVk5kG0SDBsV7pzLA3DbuLSn-Iyeg7jsZB1f6lgirWOzME7UFeNg2e7fkNLJeNO6n77amHVB7SatfmbAmCgN8YnVgvfFV73e8j91lYqeIvD0zH-i8uXKZgTZk31ieBId-RWpF_dLwCd14XmR9DFW5kzlXTPVxKq_IGru7bGwEsKD68bQ5VmCLjnzO_wFKVcd9XJ6qwGpOTDELS5mDL0b6b9GqTfHHytmoCCLmfdCpB" />
                                <img alt="" className="inline-block h-6 w-6 rounded-full ring-2 ring-white dark:ring-[#2d1b27]" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBLNFY9s2X4uMCO1MXaqGEN3SgTYWGFOMrongK6yojgqY09ZFeQbltOQv2A3NK5E3tUFTeuHghqUcIVUxJZKoiUSgC1ClnxzGkYJPXH4qhLlZ63yJgfP6JWA8XJLKWS3x6E6vRvC6VDb4H7RwldsGhjxqjRjuxkW4RpsTt-axrr9d4D3ViUFnjIIfOQWmvxwVLtmqnLUMhP1Qf6xOt2m1xWH6OvefeZvzWeH87bRQSVI2H_5QkCYnMycNSVcZ8_8WFzJ3izUQjieYSY" />
                                <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-gray-500 ring-2 ring-white dark:ring-[#2d1b27] text-[10px] text-white font-medium">+42</span>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col gap-3 p-4">
                        <div className="flex items-start justify-between">
                            <div>
                                <h3 className="text-lg font-bold leading-tight text-[#181116] dark:text-[#f8f6f7]">15 anos da Júlia</h3>
                                <div className="mt-1 flex items-center gap-1 text-sm text-[#89617c] dark:text-[#dcbcd1]">
                                    <span className="material-symbols-outlined text-base">calendar_month</span>
                                    <span>Sáb, 14 Out - 19:00</span>
                                </div>
                            </div>
                            <button className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#ee2bad] text-white shadow-lg shadow-[#ee2bad]/30 active:translate-y-0.5 transition-all">
                                <span className="material-symbols-outlined">arrow_forward</span>
                            </button>
                        </div>
                        <div className="flex items-center gap-2 pt-1">
                            <div className="flex items-center gap-1.5 rounded-lg bg-gray-100 dark:bg-white/5 px-2.5 py-1.5">
                                <span className="material-symbols-outlined text-sm text-gray-500">location_on</span>
                                <span className="text-xs font-medium text-[#181116] dark:text-[#f8f6f7] truncate max-w-[150px]">Buffet Espaço Real</span>
                            </div>
                            <div className="h-1 w-1 rounded-full bg-gray-300 dark:bg-gray-600"></div>
                            <span className="text-xs text-[#89617c] dark:text-[#dcbcd1]">5 dias restantes</span>
                        </div>
                    </div>
                </Link>
            </section>

            {/* Quick Actions Grid */}
            <section className="px-6 pb-6">
                <h2 className="text-xl font-bold tracking-tight text-[#181116] dark:text-[#f8f6f7] mb-3">Acesso Rápido</h2>
                <div className="grid grid-cols-4 gap-3">
                    <Link to="/admin/new-party" className="flex flex-col items-center gap-2 group">
                        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white dark:bg-[#2d1b27] shadow-sm ring-1 ring-black/5 dark:ring-white/5 group-active:scale-95 transition-all">
                            <span className="material-symbols-outlined text-[#ee2bad] text-2xl">add_circle</span>
                        </div>
                        <span className="text-[10px] font-medium text-center text-[#89617c] dark:text-[#dcbcd1] leading-tight">Nova<br />Festa</span>
                    </Link>
                    <Link to="/admin/finance" className="flex flex-col items-center gap-2 group">
                        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white dark:bg-[#2d1b27] shadow-sm ring-1 ring-black/5 dark:ring-white/5 group-active:scale-95 transition-all">
                            <span className="material-symbols-outlined text-[#ee2bad] text-2xl">request_quote</span>
                        </div>
                        <span className="text-[10px] font-medium text-center text-[#89617c] dark:text-[#dcbcd1] leading-tight">Novo<br />Orçamento</span>
                    </Link>
                    <Link to="/admin/clients" className="flex flex-col items-center gap-2 group">
                        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white dark:bg-[#2d1b27] shadow-sm ring-1 ring-black/5 dark:ring-white/5 group-active:scale-95 transition-all">
                            <span className="material-symbols-outlined text-[#ee2bad] text-2xl">person_add</span>
                        </div>
                        <span className="text-[10px] font-medium text-center text-[#89617c] dark:text-[#dcbcd1] leading-tight">Add<br />Cliente</span>
                    </Link>
                    <button className="flex flex-col items-center gap-2 group">
                        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white dark:bg-[#2d1b27] shadow-sm ring-1 ring-black/5 dark:ring-white/5 group-active:scale-95 transition-all">
                            <span className="material-symbols-outlined text-[#ee2bad] text-2xl">checklist</span>
                        </div>
                        <span className="text-[10px] font-medium text-center text-[#89617c] dark:text-[#dcbcd1] leading-tight">Minhas<br />Tarefas</span>
                    </button>
                </div>
            </section>

            {/* Finance Widget */}
            <section className="px-6 pb-6">
                <div className="flex items-center justify-between pb-3">
                    <h2 className="text-xl font-bold tracking-tight text-[#181116] dark:text-[#f8f6f7]">Fluxo de Caixa</h2>
                    <Link to="/admin/finance" className="text-xs font-bold text-[#ee2bad] hover:text-[#c91a8e]">Ver detalhes</Link>
                </div>
                <div className="rounded-2xl bg-white dark:bg-[#2d1b27] p-5 shadow-sm ring-1 ring-black/5 dark:ring-white/5">
                    <div className="flex justify-between items-end mb-4">
                        <div>
                            <p className="text-xs text-[#89617c] dark:text-[#dcbcd1] mb-1">Saldo Atual (Outubro)</p>
                            <h3 className="text-2xl font-bold text-[#181116] dark:text-[#f8f6f7]">R$ 11.250,00</h3>
                        </div>
                        <div className="flex items-center text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-500/10 px-2 py-1 rounded-full text-xs font-bold">
                            <span className="material-symbols-outlined text-sm mr-1">trending_up</span>
                            +12%
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="relative overflow-hidden rounded-xl bg-[#f8f6f7] dark:bg-white/5 p-3">
                            <div className="relative z-10">
                                <div className="flex items-center gap-2 mb-2">
                                    <div className="h-2 w-2 rounded-full bg-green-500"></div>
                                    <span className="text-xs font-medium text-[#89617c] dark:text-[#dcbcd1]">Entradas</span>
                                </div>
                                <p className="text-sm font-bold text-[#181116] dark:text-[#f8f6f7]">R$ 15.400</p>
                            </div>
                            <span className="material-symbols-outlined absolute -bottom-2 -right-2 text-4xl text-green-500/10 rotate-12">savings</span>
                        </div>
                        <div className="relative overflow-hidden rounded-xl bg-[#f8f6f7] dark:bg-white/5 p-3">
                            <div className="relative z-10">
                                <div className="flex items-center gap-2 mb-2">
                                    <div className="h-2 w-2 rounded-full bg-red-500"></div>
                                    <span className="text-xs font-medium text-[#89617c] dark:text-[#dcbcd1]">Saídas</span>
                                </div>
                                <p className="text-sm font-bold text-[#181116] dark:text-[#f8f6f7]">R$ 4.150</p>
                            </div>
                            <span className="material-symbols-outlined absolute -bottom-2 -right-2 text-4xl text-red-500/10 rotate-12">payments</span>
                        </div>
                    </div>
                    <div className="mt-4 flex h-2 w-full overflow-hidden rounded-full bg-[#f8f6f7] dark:bg-white/10">
                        <div className="h-full bg-green-500" style={{ width: '78%' }}></div>
                        <div className="h-full bg-red-500" style={{ width: '22%' }}></div>
                    </div>
                </div>
            </section>

            {/* Birthdays Carousel */}
            <section className="px-6 pb-6">
                <h2 className="text-xl font-bold tracking-tight text-[#181116] dark:text-[#f8f6f7] mb-3">Aniversariantes do Mês</h2>
                <div className="flex gap-4 overflow-x-auto no-scrollbar py-2">
                    <Link to="/admin/client-details" className="flex flex-col items-center gap-2 min-w-[72px]">
                        <div className="relative h-16 w-16 rounded-full p-0.5 bg-gradient-to-tr from-[#ee2bad] to-orange-400">
                            <div className="h-full w-full rounded-full border-2 border-white dark:border-[#2d1b27] bg-cover bg-center" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuB2LmoHO0y6GqzQQiftEEWBDFdop__LyT-b4CkpQ7IE6BfhLsu1uSz5FnYO1Mbxrps7MNihIKpX6_DnowbG7a6y4gAakfyOoZHFITilBsTTlGOcDQ1Aka5lKQ1RwybnixTCRu7jEsF5C6WItwecWGZ4OCF5sP3abDS0ExzHWPu4XWUlx9lPBhPFQBeU7U560yDg_DdfWVpEx9iZdI7C8zmPf27GeH9aIIyIPDIMH-kU3jg8xgBvIdfg-qE87Zj1gx9Pv9Wqtuoit2KJ")' }}></div>
                            <div className="absolute bottom-0 right-0 rounded-full bg-white dark:bg-[#2d1b27] px-1.5 py-0.5 text-[10px] font-bold shadow-sm ring-1 ring-black/5">12</div>
                        </div>
                        <span className="text-xs font-medium text-[#181116] dark:text-[#f8f6f7]">Ana</span>
                    </Link>
                    <div className="flex flex-col items-center gap-2 min-w-[72px]">
                        <div className="relative h-16 w-16 rounded-full p-0.5 bg-gray-200 dark:bg-white/10">
                            <div className="h-full w-full rounded-full border-2 border-white dark:border-[#2d1b27] bg-cover bg-center" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuCT5hVlZwldaj45x0fCBpxOCKNnH4WRxh3RxBDapbCNjVdbix52hBEGqoCfbgCpPL2FHe7WMhkPwuM9FYub0BxyTbUynpa3LGdeduF4Fcd8qB0toJPvBwe6oMWgY6-dtY9f4iK1ceK7zbs6FC5sbW7HQnJ3n8tP_6qL0pbIaZ9jhqdgnEpDD2prViDI-69OCGp0PcaCLdfAVJycjaW2fvNr0blhtyqrLos6GeGKG7YLXoaTzrKN9tn2TAcLXB40pNyLhkxjxwOZILEl")' }}></div>
                            <div className="absolute bottom-0 right-0 rounded-full bg-white dark:bg-[#2d1b27] px-1.5 py-0.5 text-[10px] font-bold shadow-sm ring-1 ring-black/5">18</div>
                        </div>
                        <span className="text-xs font-medium text-[#181116] dark:text-[#f8f6f7]">Lucas</span>
                    </div>
                    <div className="flex flex-col items-center gap-2 min-w-[72px]">
                        <div className="relative h-16 w-16 rounded-full p-0.5 bg-gray-200 dark:bg-white/10">
                            <div className="h-full w-full rounded-full border-2 border-white dark:border-[#2d1b27] bg-cover bg-center" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuBpjSf7y-oTTMNjz7l_kvSd3ZFwQCG6z-ZyBBBuCuhOumSEt92CnHoHLs7qWxuPXZVBpeVZqU1wRdkgll1KwWfGoYhEmTXa4bZXGrAzBItLKQyeyKFOVI9xieaVu5WBedRIDVHTxcRbW9oJjDhT-q6jhHGMCC6967oox-5aj8qslTyB6MuO-K98-1c8JPRuWfLUBLSrZ-_jeZechCPgbnSLw43YlxK88qC9bHqUDGkELmj8P47s1mXyMBkNoRqguRkc-m14kD8EcOzW")' }}></div>
                            <div className="absolute bottom-0 right-0 rounded-full bg-white dark:bg-[#2d1b27] px-1.5 py-0.5 text-[10px] font-bold shadow-sm ring-1 ring-black/5">24</div>
                        </div>
                        <span className="text-xs font-medium text-[#181116] dark:text-[#f8f6f7]">Beatriz</span>
                    </div>
                </div>
            </section>

            {/* Bottom Navigation */}
            <nav className="fixed bottom-0 left-0 right-0 z-50 flex items-center justify-around border-t border-black/5 dark:border-white/10 bg-white/90 dark:bg-[#2d1b27]/90 px-2 pb-5 pt-3 backdrop-blur-lg max-w-md mx-auto">
                <Link to="/admin/dashboard" className="flex flex-col items-center gap-1 p-2 text-[#ee2bad]">
                    <span className="material-symbols-outlined filled text-2xl" style={{ fontVariationSettings: "'FILL' 1" }}>dashboard</span>
                    <span className="text-[10px] font-bold">Início</span>
                </Link>
                <Link to="/admin/parties" className="flex flex-col items-center gap-1 p-2 text-gray-400 dark:text-gray-500 hover:text-[#ee2bad] dark:hover:text-[#ee2bad] transition-colors">
                    <span className="material-symbols-outlined text-2xl">calendar_month</span>
                    <span className="text-[10px] font-medium">Agenda</span>
                </Link>
                <Link to="/admin/finance" className="flex flex-col items-center gap-1 p-2 text-gray-400 dark:text-gray-500 hover:text-[#ee2bad] dark:hover:text-[#ee2bad] transition-colors">
                    <span className="material-symbols-outlined text-2xl">account_balance_wallet</span>
                    <span className="text-[10px] font-medium">Financeiro</span>
                </Link>
                <Link to="/admin/clients" className="flex flex-col items-center gap-1 p-2 text-gray-400 dark:text-gray-500 hover:text-[#ee2bad] dark:hover:text-[#ee2bad] transition-colors">
                    <span className="material-symbols-outlined text-2xl">person</span>
                    <span className="text-[10px] font-medium">Clientes</span>
                </Link>
            </nav>
        </div>
    );
};

export default DashboardScreen;
