import React, { useState } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';

const AdminLayout: React.FC = () => {
    const location = useLocation();
    const isActive = (path: string) => location.pathname === path;
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);

    return (
        <div className="flex min-h-screen w-full bg-[#f8f6f7] dark:bg-[#22101c] font-['Plus_Jakarta_Sans']">
            {/* Desktop Sidebar */}
            <aside className={`hidden md:flex flex-col fixed inset-y-0 left-0 z-50 bg-white dark:bg-[#2d1b27] border-r border-black/5 dark:border-white/5 transition-all duration-300 ${isSidebarOpen ? 'w-64' : 'w-20'}`}>
                {/* Logo Area */}
                <div className="flex h-16 items-center justify-between px-4 border-b border-black/5 dark:border-white/5">
                    {isSidebarOpen ? (
                        <h1 className="text-xl font-bold text-[#ee2bad]">dhFestannça</h1>
                    ) : (
                        <span className="text-2xl font-bold text-[#ee2bad]">dF</span>
                    )}
                    <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="p-1 rounded-md hover:bg-gray-100 dark:hover:bg-white/5">
                        <span className="material-symbols-outlined text-gray-500">{isSidebarOpen ? 'menu_open' : 'menu'}</span>
                    </button>
                </div>

                {/* User Info (Collapsed vs Expanded) */}
                <div className={`p-4 border-b border-black/5 dark:border-white/5 ${isSidebarOpen ? '' : 'flex justify-center'}`}>
                    <div className="flex items-center gap-3">
                        <div className="h-10 w-10 shrink-0 rounded-full bg-cover bg-center ring-2 ring-[#ee2bad]" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuDhuT1uZej6bS-fLcNuWx0znKBesn1MhtsR6CAnF-EFqvjFie-i9FA7jePEYSefIKHX4X7a9IqbfsARY5jS-cW48KPoYHC4MDdXpbxJ0Dkmtqr8-xPBHZQdEu5Hlc-OgJDxHFSyjsP6ZAC2eR4dZIbmt2OMSsi0L-1s1B15wu4mn_MbrNAaV--qByOHSF-ExYFCGbd6Pv5ROJz6rAYFQJarB1c6p0zaqJlCAvcN_HubaGmq0YyDFIsMka9OiTU6wv443yzFSRFGnQ19")' }}></div>
                        {isSidebarOpen && (
                            <div className="overflow-hidden">
                                <p className="text-sm font-bold text-[#181116] dark:text-[#f8f6f7] truncate">Clara Silva</p>
                                <p className="text-xs text-[#89617c] dark:text-[#dcbcd1] truncate">Administradora</p>
                            </div>
                        )}
                    </div>
                </div>

                {/* Navigation Links */}
                <nav className="flex-1 flex flex-col gap-1 p-2 overflow-y-auto">
                    {[
                        { path: '/admin/dashboard', label: 'Início', icon: 'dashboard' },
                        { path: '/admin/parties', label: 'Agenda', icon: 'calendar_month' },
                        { path: '/admin/clients', label: 'Clientes', icon: 'person' },
                        { path: '/admin/finance', label: 'Financeiro', icon: 'account_balance_wallet' },
                    ].map((item) => (
                        <Link
                            key={item.path}
                            to={item.path}
                            className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all ${isActive(item.path)
                                    ? 'bg-[#ee2bad]/10 text-[#ee2bad] font-bold'
                                    : 'text-gray-500 hover:bg-gray-100 dark:hover:bg-white/5 hover:text-[#181116] dark:hover:text-[#f8f6f7]'
                                }`}
                        >
                            <span className={`material-symbols-outlined ${isActive(item.path) ? 'filled' : ''}`} style={isActive(item.path) ? { fontVariationSettings: "'FILL' 1" } : {}}>
                                {item.icon}
                            </span>
                            {isSidebarOpen && <span className="text-sm">{item.label}</span>}
                        </Link>
                    ))}
                </nav>

                {/* Bottom Actions */}
                <div className="p-2 border-t border-black/5 dark:border-white/5">
                    <button className="flex w-full items-center gap-3 px-3 py-2.5 rounded-xl text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 transition-all">
                        <span className="material-symbols-outlined">logout</span>
                        {isSidebarOpen && <span className="text-sm font-medium">Sair</span>}
                    </button>
                </div>
            </aside>

            {/* Mobile Header */}
            <header className="md:hidden fixed top-0 left-0 right-0 z-40 flex items-center justify-between bg-[#f8f6f7]/95 dark:bg-[#22101c]/95 backdrop-blur-md px-6 py-4 border-b border-black/5 dark:border-white/5">
                <div className="flex items-center gap-3">
                    <Link to="/admin/client-details" className="relative group cursor-pointer">
                        <div className="h-9 w-9 rounded-full bg-cover bg-center ring-2 ring-[#ee2bad]" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuDhuT1uZej6bS-fLcNuWx0znKBesn1MhtsR6CAnF-EFqvjFie-i9FA7jePEYSefIKHX4X7a9IqbfsARY5jS-cW48KPoYHC4MDdXpbxJ0Dkmtqr8-xPBHZQdEu5Hlc-OgJDxHFSyjsP6ZAC2eR4dZIbmt2OMSsi0L-1s1B15wu4mn_MbrNAaV--qByOHSF-ExYFCGbd6Pv5ROJz6rAYFQJarB1c6p0zaqJlCAvcN_HubaGmq0YyDFIsMka9OiTU6wv443yzFSRFGnQ19")' }}></div>
                    </Link>
                    <div>
                        <p className="text-[10px] font-medium text-[#89617c] dark:text-[#dcbcd1]">Bem-vinda,</p>
                        <h2 className="text-sm font-bold leading-tight">Clara Silva</h2>
                    </div>
                </div>
                <button className="flex h-9 w-9 items-center justify-center rounded-full bg-white dark:bg-[#2d1b27] shadow-sm ring-1 ring-black/5 dark:ring-white/10 active:scale-95 transition-transform">
                    <span className="material-symbols-outlined text-[#181116] dark:text-[#f8f6f7] text-[20px]">notifications</span>
                </button>
            </header>

            {/* Main Content Area */}
            <main className={`flex-1 flex flex-col w-full h-full transition-all duration-300 pt-[70px] md:pt-0 pb-20 md:pb-0 ${isSidebarOpen ? 'md:ml-64' : 'md:ml-20'}`}>
                {/* Scrollable Content Container */}
                <div className="w-full h-full overflow-y-auto overflow-x-hidden md:p-8">
                    <Outlet />
                </div>
            </main>

            {/* Mobile Bottom Navigation */}
            <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 flex items-center justify-around border-t border-black/5 dark:border-white/10 bg-white/95 dark:bg-[#2d1b27]/95 px-2 pb-5 pt-3 backdrop-blur-lg">
                <Link to="/admin/dashboard" className={`flex flex-col items-center gap-1 p-2 ${isActive('/admin/dashboard') ? 'text-[#ee2bad]' : 'text-gray-400 dark:text-gray-500'}`}>
                    <span className={`material-symbols-outlined text-2xl ${isActive('/admin/dashboard') ? 'filled' : ''}`} style={isActive('/admin/dashboard') ? { fontVariationSettings: "'FILL' 1" } : {}}>dashboard</span>
                    <span className={`text-[10px] ${isActive('/admin/dashboard') ? 'font-bold' : 'font-medium'}`}>Início</span>
                </Link>
                <Link to="/admin/parties" className={`flex flex-col items-center gap-1 p-2 ${isActive('/admin/parties') ? 'text-[#ee2bad]' : 'text-gray-400 dark:text-gray-500'}`}>
                    <span className={`material-symbols-outlined text-2xl ${isActive('/admin/parties') ? 'filled' : ''}`} style={isActive('/admin/parties') ? { fontVariationSettings: "'FILL' 1" } : {}}>calendar_month</span>
                    <span className={`text-[10px] ${isActive('/admin/parties') ? 'font-bold' : 'font-medium'}`}>Agenda</span>
                </Link>
                {/* Floating Action Button for Mobile */}
                <Link to="/admin/new-party" className="relative -top-6 flex h-14 w-14 items-center justify-center rounded-full bg-[#ee2bad] text-white shadow-xl shadow-[#ee2bad]/40 ring-4 ring-[#f8f6f7] dark:ring-[#22101c] active:scale-95 transition-transform">
                    <span className="material-symbols-outlined text-2xl">add</span>
                </Link>
                <Link to="/admin/finance" className={`flex flex-col items-center gap-1 p-2 ${isActive('/admin/finance') ? 'text-[#ee2bad]' : 'text-gray-400 dark:text-gray-500'}`}>
                    <span className={`material-symbols-outlined text-2xl ${isActive('/admin/finance') ? 'filled' : ''}`} style={isActive('/admin/finance') ? { fontVariationSettings: "'FILL' 1" } : {}}>account_balance_wallet</span>
                    <span className={`text-[10px] ${isActive('/admin/finance') ? 'font-bold' : 'font-medium'}`}>Finanças</span>
                </Link>
                <Link to="/admin/clients" className={`flex flex-col items-center gap-1 p-2 ${isActive('/admin/clients') ? 'text-[#ee2bad]' : 'text-gray-400 dark:text-gray-500'}`}>
                    <span className={`material-symbols-outlined text-2xl ${isActive('/admin/clients') ? 'filled' : ''}`} style={isActive('/admin/clients') ? { fontVariationSettings: "'FILL' 1" } : {}}>person</span>
                    <span className={`text-[10px] ${isActive('/admin/clients') ? 'font-bold' : 'font-medium'}`}>Clientes</span>
                </Link>
            </nav>
        </div>
    );
};

export default AdminLayout;
