import React, { useEffect, useState } from 'react';
import AdminLayout from '../components/AdminLayout';
import { supabase } from '../lib/supabase';

const SettingsScreen = () => {
    const [loading, setLoading] = useState(false);
    const [user, setUser] = useState<any>(null);
    const [profile, setProfile] = useState({ name: '', email: '' });
    const [passwords, setPasswords] = useState({ new: '', confirm: '' });
    const [theme, setTheme] = useState<'light' | 'dark'>(
        (localStorage.getItem('theme') as 'light' | 'dark') || 'light'
    );

    useEffect(() => {
        fetchProfile();
    }, []);

    const fetchProfile = async () => {
        setLoading(true);
        try {
            const { data: { user: authUser } } = await supabase.auth.getUser();
            if (authUser) {
                setUser(authUser);
                const { data: userData } = await supabase
                    .from('users')
                    .select('*')
                    .eq('id', authUser.id)
                    .single();

                if (userData) {
                    setProfile({
                        name: userData.name || '',
                        email: authUser.email || ''
                    });
                }
            }
        } catch (error) {
            console.error('Error fetching profile:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleUpdateProfile = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            const { error: profileError } = await supabase
                .from('users')
                .update({ name: profile.name })
                .eq('id', user.id);

            if (profileError) throw profileError;

            if (profile.email !== user.email) {
                const { error: authError } = await supabase.auth.updateUser({ email: profile.email });
                if (authError) throw authError;
                alert('E-mail atualizado! Verifique sua caixa de entrada para confirmar.');
            }

            alert('Perfil atualizado com sucesso!');
        } catch (error: any) {
            alert('Erro ao atualizar perfil: ' + error.message);
        } finally {
            setLoading(false);
        }
    };

    const handleChangePassword = async (e: React.FormEvent) => {
        e.preventDefault();
        if (passwords.new !== passwords.confirm) {
            alert('As senhas não coincidem.');
            return;
        }
        setLoading(true);
        try {
            const { error } = await supabase.auth.updateUser({ password: passwords.new });
            if (error) throw error;
            alert('Senha alterada com sucesso!');
            setPasswords({ new: '', confirm: '' });
        } catch (error: any) {
            alert('Erro ao alterar senha: ' + error.message);
        } finally {
            setLoading(false);
        }
    };

    const toggleTheme = () => {
        const newTheme = theme === 'light' ? 'dark' : 'light';
        setTheme(newTheme);
        localStorage.setItem('theme', newTheme);
        if (newTheme === 'dark') {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
        // Force a small delay to ensure the class is applied before any other logic
        setTimeout(() => {
            window.dispatchEvent(new Event('storage'));
        }, 0);
    };

    return (
        <AdminLayout title="Configurações">
            <main className="flex flex-col gap-8 pt-2 pb-20">
                {/* Theme Section */}
                <section className="bg-white dark:bg-[#2d1b27] rounded-3xl p-8 shadow-xl shadow-black/5 border border-gray-100 dark:border-white/5">
                    <div className="flex items-center justify-between mb-8">
                        <div>
                            <h3 className="text-xl font-black text-[#181116] dark:text-white flex items-center gap-2">
                                <span className="material-symbols-outlined text-[#ee2bad] text-28">palette</span>
                                Aparência
                            </h3>
                            <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">Personalize o visual do seu painel</p>
                        </div>
                        <button
                            onClick={toggleTheme}
                            className="flex h-12 w-24 items-center rounded-full bg-gray-100 dark:bg-white/5 p-1.5 transition-all relative shadow-inner"
                        >
                            <div className={`h-9 w-9 rounded-full bg-gradient-to-br from-[#007bff] to-[#ee2bad] shadow-lg flex items-center justify-center transition-all duration-500 ease-out ${theme === 'dark' ? 'translate-x-12 rotate-[360deg]' : 'translate-x-0'}`}>
                                <span className="material-symbols-outlined text-white text-[22px] filled" style={{ fontVariationSettings: "'FILL' 1" }}>
                                    {theme === 'dark' ? 'dark_mode' : 'light_mode'}
                                </span>
                            </div>
                        </button>
                    </div>

                    <div className="space-y-4">
                        <p className="text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest">Paleta de Cores Sugerida</p>
                        <div className="grid grid-cols-3 gap-4">
                            <div className="group relative">
                                <div className="h-20 rounded-2xl bg-white border-2 border-gray-100 dark:border-white/10 shadow-sm flex items-center justify-center transition-transform group-hover:-translate-y-1">
                                    <div className="w-8 h-8 rounded-full bg-gray-50 border border-gray-200"></div>
                                </div>
                                <p className="text-[10px] font-bold text-center mt-2 text-gray-500">Branco (Fundo)</p>
                            </div>
                            <div className="group relative">
                                <div className="h-20 rounded-2xl bg-[#007bff] shadow-lg shadow-blue-500/20 flex items-center justify-center transition-transform group-hover:-translate-y-1">
                                    <span className="material-symbols-outlined text-white">check_circle</span>
                                </div>
                                <p className="text-[10px] font-bold text-center mt-2 text-[#007bff]">Azul (Destaque)</p>
                            </div>
                            <div className="group relative">
                                <div className="h-20 rounded-2xl bg-[#ee2bad] shadow-lg shadow-pink-500/20 flex items-center justify-center transition-transform group-hover:-translate-y-1">
                                    <span className="material-symbols-outlined text-white">favorite</span>
                                </div>
                                <p className="text-[10px] font-bold text-center mt-2 text-[#ee2bad]">Rosa (Ação)</p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Profile Section */}
                <section className="bg-white dark:bg-[#2d1b27] rounded-3xl p-6 shadow-sm border border-gray-100 dark:border-gray-800">
                    <h3 className="text-lg font-bold text-[#181116] dark:text-white mb-6 flex items-center gap-2">
                        <span className="material-symbols-outlined text-[#ee2bad]">person</span>
                        Meu Perfil
                    </h3>
                    <form onSubmit={handleUpdateProfile} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-zinc-500 dark:text-zinc-400 mb-1.5 ml-2">Nome do Administrador</label>
                            <input
                                type="text"
                                className="w-full bg-[#f8f6f7] dark:bg-black/20 border-none rounded-full py-3 px-5 text-zinc-900 dark:text-white focus:ring-2 focus:ring-[#ee2bad]"
                                value={profile.name}
                                onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-zinc-500 dark:text-zinc-400 mb-1.5 ml-2">E-mail</label>
                            <input
                                type="email"
                                className="w-full bg-[#f8f6f7] dark:bg-black/20 border-none rounded-full py-3 px-5 text-zinc-900 dark:text-white focus:ring-2 focus:ring-[#ee2bad]"
                                value={profile.email}
                                onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                            />
                        </div>
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-[#ee2bad] text-white font-bold py-3 rounded-full shadow-lg shadow-[#ee2bad]/30 active:scale-95 transition-all disabled:opacity-50"
                        >
                            {loading ? 'Salvando...' : 'Salvar Alterações'}
                        </button>
                    </form>
                </section>

                {/* Password Section */}
                <section className="bg-white dark:bg-[#2d1b27] rounded-3xl p-6 shadow-sm border border-gray-100 dark:border-gray-800">
                    <h3 className="text-lg font-bold text-[#181116] dark:text-white mb-6 flex items-center gap-2">
                        <span className="material-symbols-outlined text-[#ee2bad]">lock</span>
                        Segurança
                    </h3>
                    <form onSubmit={handleChangePassword} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-zinc-500 dark:text-zinc-400 mb-1.5 ml-2">Nova Senha</label>
                            <input
                                type="password"
                                className="w-full bg-[#f8f6f7] dark:bg-black/20 border-none rounded-full py-3 px-5 text-zinc-900 dark:text-white focus:ring-2 focus:ring-[#ee2bad]"
                                value={passwords.new}
                                onChange={(e) => setPasswords({ ...passwords, new: e.target.value })}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-zinc-500 dark:text-zinc-400 mb-1.5 ml-2">Confirmar Nova Senha</label>
                            <input
                                type="password"
                                className="w-full bg-[#f8f6f7] dark:bg-black/20 border-none rounded-full py-3 px-5 text-zinc-900 dark:text-white focus:ring-2 focus:ring-[#ee2bad]"
                                value={passwords.confirm}
                                onChange={(e) => setPasswords({ ...passwords, confirm: e.target.value })}
                            />
                        </div>
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-zinc-900 dark:bg-white dark:text-zinc-900 text-white font-bold py-3 rounded-full shadow-lg active:scale-95 transition-all disabled:opacity-50"
                        >
                            {loading ? 'Alterando...' : 'Alterar Senha'}
                        </button>
                    </form>
                </section>
                {/* Logout Section */}
                <section className="bg-white dark:bg-[#2d1b27] rounded-3xl p-6 shadow-sm border border-gray-100 dark:border-gray-800">
                    <h3 className="text-lg font-bold text-[#181116] dark:text-white mb-6 flex items-center gap-2">
                        <span className="material-symbols-outlined text-[#ee2bad]">logout</span>
                        Sessão
                    </h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
                        Deseja sair do painel administrativo e voltar para o site principal?
                    </p>
                    <button
                        onClick={() => window.location.href = '/'}
                        className="w-full flex items-center justify-center gap-2 bg-gray-100 dark:bg-white/5 text-gray-600 dark:text-gray-300 font-bold py-3 rounded-full hover:bg-gray-200 dark:hover:bg-white/10 active:scale-95 transition-all"
                    >
                        <span className="material-symbols-outlined">logout</span>
                        Sair do Painel
                    </button>
                </section>
            </main>
        </AdminLayout>
    );
};

export default SettingsScreen;
