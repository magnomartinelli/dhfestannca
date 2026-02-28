import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';

const NewClientScreen = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        email: '',
        birthday: '',
        observations: ''
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!formData.name) {
            alert('Por favor, preencha o nome do cliente.');
            return;
        }

        setLoading(true);
        try {
            const { data: { user } } = await supabase.auth.getUser();
            if (!user) throw new Error('Usuário não autenticado');

            const { data: userData } = await supabase
                .from('users')
                .select('client_id')
                .eq('id', user.id)
                .single();

            if (!userData) throw new Error('Cliente não encontrado');

            const { error } = await supabase
                .from('customer_records')
                .insert({
                    client_id: userData.client_id,
                    name: formData.name,
                    phone: formData.phone,
                    email: formData.email,
                    birthday: formData.birthday || null,
                    observations: formData.observations
                });

            if (error) throw error;
            navigate('/admin/clients');
        } catch (error: any) {
            console.error('Error saving client:', error);
            alert('Erro ao salvar cliente: ' + error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="relative flex flex-col min-h-screen w-full max-w-md mx-auto bg-[#f8f6f7] dark:bg-[#22101c] shadow-2xl overflow-hidden font-['Plus_Jakarta_Sans']">
            <header className="sticky top-0 z-50 flex items-center justify-between px-5 py-4 bg-[#f8f6f7]/90 dark:bg-[#22101c]/90 backdrop-blur-md border-b border-zinc-200/50 dark:border-white/5">
                <button onClick={() => navigate(-1)} className="text-zinc-500 dark:text-zinc-400 text-base font-medium hover:text-zinc-800 dark:hover:text-zinc-200 transition-colors">Cancelar</button>
                <h1 className="text-lg font-bold text-zinc-900 dark:text-white tracking-tight">Novo Cliente</h1>
                <button
                    onClick={handleSubmit}
                    disabled={loading}
                    className="text-[#ee2bad] font-bold text-base hover:text-[#ee2bad]/80 transition-colors disabled:opacity-50"
                >
                    {loading ? 'Salvando...' : 'Salvar'}
                </button>
            </header>
            <main className="flex-1 overflow-y-auto px-5 pb-32 pt-2">
                <form onSubmit={handleSubmit} className="mt-6 space-y-6">
                    <div className="group">
                        <label className="block text-sm font-medium text-zinc-500 dark:text-zinc-400 mb-1.5 ml-2">Nome Completo</label>
                        <div className="relative flex items-center">
                            <input
                                className="w-full bg-white dark:bg-[#2d1b27] border-0 ring-1 ring-zinc-200 dark:ring-white/10 rounded-full py-3.5 pl-12 pr-4 text-zinc-900 dark:text-white placeholder-zinc-400 focus:ring-2 focus:ring-[#ee2bad] focus:outline-none transition-shadow shadow-sm"
                                placeholder="Ex: Maria Silva"
                                type="text"
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                required
                            />
                            <span className="material-symbols-outlined absolute left-4 text-[#ee2bad] text-[22px]">person</span>
                        </div>
                    </div>

                    <div className="group">
                        <label className="block text-sm font-medium text-zinc-500 dark:text-zinc-400 mb-1.5 ml-2">Telefone / WhatsApp</label>
                        <div className="relative flex items-center">
                            <input
                                className="w-full bg-white dark:bg-[#2d1b27] border-0 ring-1 ring-zinc-200 dark:ring-white/10 rounded-full py-3.5 pl-12 pr-4 text-zinc-900 dark:text-white placeholder-zinc-400 focus:ring-2 focus:ring-[#ee2bad] focus:outline-none transition-shadow shadow-sm"
                                placeholder="(00) 00000-0000"
                                type="tel"
                                value={formData.phone}
                                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                            />
                            <span className="material-symbols-outlined absolute left-4 text-[#ee2bad] text-[22px]">call</span>
                        </div>
                    </div>

                    <div className="group">
                        <label className="block text-sm font-medium text-zinc-500 dark:text-zinc-400 mb-1.5 ml-2">E-mail</label>
                        <div className="relative flex items-center">
                            <input
                                className="w-full bg-white dark:bg-[#2d1b27] border-0 ring-1 ring-zinc-200 dark:ring-white/10 rounded-full py-3.5 pl-12 pr-4 text-zinc-900 dark:text-white placeholder-zinc-400 focus:ring-2 focus:ring-[#ee2bad] focus:outline-none transition-shadow shadow-sm"
                                placeholder="maria@exemplo.com"
                                type="email"
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            />
                            <span className="material-symbols-outlined absolute left-4 text-[#ee2bad] text-[22px]">mail</span>
                        </div>
                    </div>

                    <div className="group">
                        <label className="block text-sm font-medium text-zinc-500 dark:text-zinc-400 mb-1.5 ml-2">Data de Nascimento</label>
                        <div className="relative flex items-center">
                            <input
                                className="w-full bg-white dark:bg-[#2d1b27] border-0 ring-1 ring-zinc-200 dark:ring-white/10 rounded-full py-3.5 pl-12 pr-4 text-zinc-900 dark:text-white focus:ring-2 focus:ring-[#ee2bad] focus:outline-none transition-shadow shadow-sm"
                                type="date"
                                value={formData.birthday}
                                onChange={(e) => setFormData({ ...formData, birthday: e.target.value })}
                            />
                            <span className="material-symbols-outlined absolute left-4 text-[#ee2bad] text-[22px]">cake</span>
                        </div>
                    </div>

                    <div className="group">
                        <label className="block text-sm font-medium text-zinc-500 dark:text-zinc-400 mb-1.5 ml-2">Observações</label>
                        <div className="relative">
                            <textarea
                                className="w-full bg-white dark:bg-[#2d1b27] border-0 ring-1 ring-zinc-200 dark:ring-white/10 rounded-2xl py-4 px-4 text-zinc-900 dark:text-white placeholder-zinc-400 focus:ring-2 focus:ring-[#ee2bad] focus:outline-none transition-shadow shadow-sm resize-none"
                                placeholder="Detalhes adicionais sobre o cliente..."
                                rows={4}
                                value={formData.observations}
                                onChange={(e) => setFormData({ ...formData, observations: e.target.value })}
                            ></textarea>
                        </div>
                    </div>
                </form>
            </main>
            <div className="absolute bottom-0 left-0 w-full p-5 bg-gradient-to-t from-[#f8f6f7] via-[#f8f6f7] to-transparent dark:from-[#22101c] dark:via-[#22101c] pointer-events-none flex justify-center pb-8 pt-12">
                <button
                    onClick={handleSubmit}
                    disabled={loading}
                    className="pointer-events-auto w-full max-w-[90%] bg-[#ee2bad] hover:bg-[#ee2bad]/90 text-white font-bold text-lg py-4 px-8 rounded-full shadow-lg shadow-[#ee2bad]/30 flex items-center justify-center gap-2 transform active:scale-95 transition-all disabled:opacity-50"
                >
                    <span>{loading ? 'Salvando...' : 'Cadastrar Cliente'}</span>
                    {!loading && <span className="material-symbols-outlined">person_add</span>}
                </button>
            </div>
        </div>
    );
};

export default NewClientScreen;
