import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { supabase } from '../lib/supabase';

interface AdminLayoutProps {
    children: React.ReactNode;
    title?: string;
    showBackButton?: boolean;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ children, title, showBackButton }) => {
    const location = useLocation();
    const [userName, setUserName] = useState('Admin');
    const isActive = (path: string) => location.pathname === path;

    useEffect(() => {
        fetchUserName();
        applyTheme();
    }, []);

    const applyTheme = () => {
        const savedTheme = localStorage.getItem('theme') || 'light';
        if (savedTheme === 'dark') {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    };

    const fetchUserName = async () => {
        try {
            const { data: { user } } = await supabase.auth.getUser();
            if (user) {
                const { data } = await supabase
                    .from('users')
                    .select('name')
                    .eq('id', user.id)
                    .single();
                if (data?.name) setUserName(data.name);
            }
        } catch (error) {
            console.error('Error fetching user name:', error);
        }
    };

    return (
        <div className="min-h-screen bg-[#f8f6f7] dark:bg-[#22101c] font-['Plus_Jakarta_Sans'] text-[#181116] dark:text-white transition-colors duration-200 flex">

            {/* Desktop Sidebar */}
            <aside className="hidden md:flex flex-col w-64 bg-white dark:bg-[#2d1b27] border-r border-gray-200 dark:border-white/10 h-screen sticky top-0">
                <div className="p-6">
                    <h1 className="text-2xl font-black tracking-tighter uppercase bg-gradient-to-r from-[#007bff] to-[#ee2bad] bg-clip-text text-transparent">
                        DHFestannça
                    </h1>
                    <p className="text-[10px] font-bold text-gray-400 dark:text-gray-500 tracking-[0.2em] uppercase mt-1">Painel Administrativo</p>
                </div>

                <nav className="flex-1 px-4 space-y-2">
                    <Link to="/admin/dashboard" className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${isActive('/admin/dashboard') ? 'bg-gradient-to-r from-[#007bff]/10 to-[#ee2bad]/10 text-[#ee2bad] shadow-sm' : 'text-gray-500 hover:bg-gray-50 dark:hover:bg-white/5'}`}>
                        <span className={`material-symbols-outlined ${isActive('/admin/dashboard') ? 'filled' : ''}`} style={isActive('/admin/dashboard') ? { fontVariationSettings: "'FILL' 1", color: '#ee2bad' } : {}}>dashboard</span>
                        <span className="font-semibold">Início</span>
                    </Link>
                    <Link to="/admin/parties" className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${isActive('/admin/parties') ? 'bg-gradient-to-r from-[#007bff]/10 to-[#ee2bad]/10 text-[#ee2bad] shadow-sm' : 'text-gray-500 hover:bg-gray-50 dark:hover:bg-white/5'}`}>
                        <span className={`material-symbols-outlined ${isActive('/admin/parties') ? 'filled' : ''}`} style={isActive('/admin/parties') ? { fontVariationSettings: "'FILL' 1", color: '#ee2bad' } : {}}>calendar_month</span>
                        <span className="font-semibold">Agenda</span>
                    </Link>
                    <Link to="/admin/finance" className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${isActive('/admin/finance') ? 'bg-gradient-to-r from-[#007bff]/10 to-[#ee2bad]/10 text-[#ee2bad] shadow-sm' : 'text-gray-500 hover:bg-gray-50 dark:hover:bg-white/5'}`}>
                        <span className={`material-symbols-outlined ${isActive('/admin/finance') ? 'filled' : ''}`} style={isActive('/admin/finance') ? { fontVariationSettings: "'FILL' 1", color: '#ee2bad' } : {}}>account_balance_wallet</span>
                        <span className="font-semibold">Financeiro</span>
                    </Link>
                    <Link to="/admin/clients" className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${isActive('/admin/clients') ? 'bg-gradient-to-r from-[#007bff]/10 to-[#ee2bad]/10 text-[#ee2bad] shadow-sm' : 'text-gray-500 hover:bg-gray-50 dark:hover:bg-white/5'}`}>
                        <span className={`material-symbols-outlined ${isActive('/admin/clients') ? 'filled' : ''}`} style={isActive('/admin/clients') ? { fontVariationSettings: "'FILL' 1", color: '#ee2bad' } : {}}>person</span>
                        <span className="font-semibold">Clientes</span>
                    </Link>
                    <Link to="/admin/settings" className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${isActive('/admin/settings') ? 'bg-gradient-to-r from-[#007bff]/10 to-[#ee2bad]/10 text-[#ee2bad] shadow-sm' : 'text-gray-500 hover:bg-gray-50 dark:hover:bg-white/5'}`}>
                        <span className={`material-symbols-outlined ${isActive('/admin/settings') ? 'filled' : ''}`} style={isActive('/admin/settings') ? { fontVariationSettings: "'FILL' 1", color: '#ee2bad' } : {}}>settings</span>
                        <span className="font-semibold">Configurações</span>
                    </Link>
                    <Link to="/" className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-500 hover:bg-gray-50 dark:hover:bg-white/5 transition-colors mt-auto">
                        <span className="material-symbols-outlined">logout</span>
                        <span className="font-medium">Sair do Painel</span>
                    </Link>
                </nav>

                <div className="p-4 border-t border-gray-200 dark:border-white/10">
                    <div className="flex items-center gap-3 px-4 py-3">
                        <div className="h-10 w-10 rounded-full bg-cover bg-center ring-2 ring-[#ee2bad]" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuDhuT1uZej6bS-fLcNuWx0znKBesn1MhtsR6CAnF-EFqvjFie-i9FA7jePEYSefIKHX4X7a9IqbfsARY5jS-cW48KPoYHC4MDdXpbxJ0Dkmtqr8-xPBHZQdEu5Hlc-OgJDxHFSyjsP6ZAC2eR4dZIbmt2OMSsi0L-1s1B15wu4mn_MbrNAaV--qByOHSF-ExYFCGbd6Pv5ROJz6rAYFQJarB1c6p0zaqJlCAvcN_HubaGmq0YyDFIsMka9OiTU6wv443yzFSRFGnQ19")' }}></div>
                        <div>
                            <p className="text-sm font-bold leading-tight">{userName}</p>
                            <p className="text-xs text-gray-500">Admin</p>
                        </div>
                    </div>
                </div>
            </aside>

            {/* Main Content Area */}
            <div className="flex-1 flex flex-col min-w-0">
                {/* Mobile Header */}
                <header className="md:hidden sticky top-0 z-20 flex items-center justify-between bg-[#f8f6f7]/95 dark:bg-[#22101c]/95 backdrop-blur-md px-6 py-4 transition-colors duration-200 border-b border-black/5 dark:border-white/5">
                    {showBackButton ? (
                        <button onClick={() => window.history.back()} className="flex h-10 w-10 items-center justify-center rounded-full text-[#181116] dark:text-white hover:bg-gray-100 dark:hover:bg-white/10 -ml-2">
                            <span className="material-symbols-outlined">arrow_back</span>
                        </button>
                    ) : (
                        <div className="flex items-center gap-3">
                            <Link to="/admin/settings" className="relative group cursor-pointer">
                                <div className="h-10 w-10 rounded-full bg-cover bg-center ring-2 ring-[#ee2bad] ring-offset-2 ring-offset-[#f8f6f7] dark:ring-offset-[#22101c]" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuDhuT1uZej6bS-fLcNuWx0znKBesn1MhtsR6CAnF-EFqvjFie-i9FA7jePEYSefIKHX4X7a9IqbfsARY5jS-cW48KPoYHC4MDdXpbxJ0Dkmtqr8-xPBHZQdEu5Hlc-OgJDxHFSyjsP6ZAC2eR4dZIbmt2OMSsi0L-1s1B15wu4mn_MbrNAaV--qByOHSF-ExYFCGbd6Pv5ROJz6rAYFQJarB1c6p0zaqJlCAvcN_HubaGmq0YyDFIsMka9OiTU6wv443yzFSRFGnQ19")' }}></div>
                                <div className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-green-500 ring-2 ring-white dark:ring-[#22101c]"></div>
                            </Link>
                            <div>
                                <p className="text-xs font-medium text-[#89617c] dark:text-[#dcbcd1]">Bem-vinda de volta,</p>
                                <h2 className="text-lg font-bold leading-tight">{userName}</h2>
                            </div>
                        </div>
                    )}

                    <div className="flex items-center gap-2">
                        {title && <h1 className="text-lg font-bold md:hidden mr-2">{title}</h1>}
                        <button className="flex h-10 w-10 items-center justify-center rounded-full bg-white dark:bg-[#2d1b27] shadow-sm ring-1 ring-black/5 dark:ring-white/10 active:scale-95 transition-transform">
                            <span className="material-symbols-outlined text-[#181116] dark:text-[#f8f6f7]">notifications</span>
                            <span className="absolute top-3 right-3 h-2 w-2 rounded-full bg-[#ee2bad] animate-pulse"></span>
                        </button>
                    </div>
                </header>

                {/* Desktop Header (Minimal) */}
                <header className="hidden md:flex items-center justify-between px-8 py-6 bg-transparent">
                    <div>
                        <h2 className="text-2xl font-bold text-[#181116] dark:text-white">{title || 'Dashboard'}</h2>
                        <p className="text-sm text-gray-500">Visão geral do sistema</p>
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="relative">
                            <span className="material-symbols-outlined text-gray-400 absolute left-3 top-1/2 -translate-y-1/2">search</span>
                            <input type="text" placeholder="Buscar..." className="pl-10 pr-4 py-2 rounded-full bg-white dark:bg-[#2d1b27] border border-gray-200 dark:border-white/10 focus:outline-none focus:ring-2 focus:ring-[#ee2bad] w-64" />
                        </div>
                        <button className="flex h-10 w-10 items-center justify-center rounded-full bg-white dark:bg-[#2d1b27] shadow-sm ring-1 ring-black/5 dark:ring-white/10 hover:bg-gray-50">
                            <span className="material-symbols-outlined">notifications</span>
                        </button>
                    </div>
                </header>

                <main className="flex-1 overflow-y-auto p-0 md:p-8 pb-24 md:pb-8">
                    <div className="max-w-7xl mx-auto w-full">
                        {children}
                    </div>
                </main>

                {/* Mobile Bottom Navigation */}
                <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 flex items-center justify-around border-t border-black/5 dark:border-white/10 bg-white/90 dark:bg-[#2d1b27]/90 px-2 pb-5 pt-3 backdrop-blur-lg">
                    <Link to="/admin/dashboard" className={`flex flex-col items-center gap-1 p-2 ${isActive('/admin/dashboard') ? 'text-[#ee2bad]' : 'text-gray-400 dark:text-gray-500 hover:text-[#ee2bad]'}`}>
                        <span className={`material-symbols-outlined text-2xl ${isActive('/admin/dashboard') ? 'filled' : ''}`} style={isActive('/admin/dashboard') ? { fontVariationSettings: "'FILL' 1", color: '#ee2bad' } : {}}>dashboard</span>
                        <span className="text-[10px] font-bold">Início</span>
                    </Link>
                    <Link to="/admin/parties" className={`flex flex-col items-center gap-1 p-2 ${isActive('/admin/parties') ? 'text-[#ee2bad]' : 'text-gray-400 dark:text-gray-500 hover:text-[#ee2bad]'}`}>
                        <span className={`material-symbols-outlined text-2xl ${isActive('/admin/parties') ? 'filled' : ''}`} style={isActive('/admin/parties') ? { fontVariationSettings: "'FILL' 1", color: '#ee2bad' } : {}}>calendar_month</span>
                        <span className="text-[10px] font-bold">Agenda</span>
                    </Link>
                    <Link to="/admin/finance" className={`flex flex-col items-center gap-1 p-2 ${isActive('/admin/finance') ? 'text-[#ee2bad]' : 'text-gray-400 dark:text-gray-500 hover:text-[#ee2bad]'}`}>
                        <span className={`material-symbols-outlined text-2xl ${isActive('/admin/finance') ? 'filled' : ''}`} style={isActive('/admin/finance') ? { fontVariationSettings: "'FILL' 1", color: '#ee2bad' } : {}}>account_balance_wallet</span>
                        <span className="text-[10px] font-bold">Financeiro</span>
                    </Link>
                    <Link to="/admin/clients" className={`flex flex-col items-center gap-1 p-2 ${isActive('/admin/clients') ? 'text-[#ee2bad]' : 'text-gray-400 dark:text-gray-500 hover:text-[#ee2bad]'}`}>
                        <span className={`material-symbols-outlined text-2xl ${isActive('/admin/clients') ? 'filled' : ''}`} style={isActive('/admin/clients') ? { fontVariationSettings: "'FILL' 1", color: '#ee2bad' } : {}}>person</span>
                        <span className="text-[10px] font-bold">Clientes</span>
                    </Link>
                    <Link to="/admin/settings" className={`flex flex-col items-center gap-1 p-2 ${isActive('/admin/settings') ? 'text-[#ee2bad]' : 'text-gray-400 dark:text-gray-500 hover:text-[#ee2bad]'}`}>
                        <span className={`material-symbols-outlined text-2xl ${isActive('/admin/settings') ? 'filled' : ''}`} style={isActive('/admin/settings') ? { fontVariationSettings: "'FILL' 1", color: '#ee2bad' } : {}}>settings</span>
                        <span className="text-[10px] font-bold">Ajustes</span>
                    </Link>
                </nav>
            </div>
        </div>
    );
};

export default AdminLayout;
