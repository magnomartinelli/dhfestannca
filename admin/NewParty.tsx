import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { supabase } from '../lib/supabase';

const NewPartyScreen = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [clients, setClients] = useState<any[]>([]);
    const [clientId, setClientId] = useState('');
    const [formData, setFormData] = useState({
        customerId: '',
        title: '',
        date: '',
        time: '',
        description: '',
        status: 'scheduled'
    });
    const [items, setItems] = useState<any[]>([
        { name: 'Arco de Balões', category: 'Decoração', quantity: 1, icon: 'toys' },
        { name: 'Mesas Provençais', category: 'Mobiliário', quantity: 2, icon: 'table_restaurant' }
    ]);

    useEffect(() => {
        fetchClients();
    }, []);

    const fetchClients = async () => {
        try {
            const { data: { user } } = await supabase.auth.getUser();
            if (!user) return;

            const { data: userData } = await supabase
                .from('users')
                .select('client_id')
                .eq('id', user.id)
                .single();

            if (!userData) return;
            setClientId(userData.client_id);

            const { data } = await supabase
                .from('customer_records')
                .select('*')
                .eq('client_id', userData.client_id)
                .order('name', { ascending: true });

            setClients(data || []);
        } catch (error) {
            console.error('Error fetching clients:', error);
        }
    };

    const handleAddItem = () => {
        const name = prompt('Nome do item:');
        if (name) {
            setItems([...items, { name, category: 'Outros', quantity: 1, icon: 'add_circle' }]);
        }
    };

    const updateItemQuantity = (index: number, delta: number) => {
        const newItems = [...items];
        newItems[index].quantity = Math.max(0, newItems[index].quantity + delta);
        setItems(newItems.filter(item => item.quantity > 0));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!formData.customerId || !formData.title || !formData.date || !formData.time) {
            alert('Por favor, preencha todos os campos obrigatórios.');
            return;
        }

        setLoading(true);
        try {
            const { error } = await supabase
                .from('appointments')
                .insert({
                    client_id: clientId,
                    customer_id: formData.customerId,
                    title: formData.title,
                    description: formData.description,
                    event_date: formData.date,
                    event_time: formData.time,
                    status: formData.status,
                    items: items
                });

            if (error) throw error;
            navigate('/admin/parties');
        } catch (error: any) {
            console.error('Error saving party:', error);
            alert('Erro ao salvar festa: ' + error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="relative flex flex-col min-h-screen w-full max-w-md mx-auto bg-[#f8f6f7] dark:bg-[#22101c] shadow-2xl overflow-hidden font-['Plus_Jakarta_Sans']">
            <header className="sticky top-0 z-50 flex items-center justify-between px-5 py-4 bg-[#f8f6f7]/90 dark:bg-[#22101c]/90 backdrop-blur-md border-b border-zinc-200/50 dark:border-white/5">
                <button onClick={() => navigate(-1)} className="text-zinc-500 dark:text-zinc-400 text-base font-medium hover:text-zinc-800 dark:hover:text-zinc-200 transition-colors">Cancelar</button>
                <h1 className="text-lg font-bold text-zinc-900 dark:text-white tracking-tight">Nova Festa</h1>
                <button
                    onClick={handleSubmit}
                    disabled={loading}
                    className="text-[#ee2bad] font-bold text-base hover:text-[#ee2bad]/80 transition-colors disabled:opacity-50"
                >
                    {loading ? 'Salvando...' : 'Salvar'}
                </button>
            </header>
            <main className="flex-1 overflow-y-auto px-5 pb-32 pt-2">
                <form onSubmit={handleSubmit}>
                    <section className="mt-6">
                        <div className="flex items-center justify-between mb-4 px-1">
                            <h2 className="text-lg font-bold text-zinc-900 dark:text-white">O Cliente</h2>
                            <Link to="/admin/new-client" className="text-xs font-bold text-[#ee2bad] uppercase tracking-wider bg-[#ee2bad]/10 px-3 py-1.5 rounded-full hover:bg-[#ee2bad]/20 transition-colors flex items-center gap-1">
                                <span className="material-symbols-outlined text-[16px]">person_add</span>
                                Novo Cliente
                            </Link>
                        </div>
                        <div className="space-y-4">
                            <div className="group">
                                <label className="block text-sm font-medium text-zinc-500 dark:text-zinc-400 mb-1.5 ml-2">Selecionar Cliente</label>
                                <div className="relative flex items-center">
                                    <select
                                        className="w-full bg-white dark:bg-[#2d1b27] border-0 ring-1 ring-zinc-200 dark:ring-white/10 rounded-full py-3.5 pl-12 pr-4 text-zinc-900 dark:text-white focus:ring-2 focus:ring-[#ee2bad] focus:outline-none transition-shadow shadow-sm appearance-none"
                                        value={formData.customerId}
                                        onChange={(e) => setFormData({ ...formData, customerId: e.target.value })}
                                        required
                                    >
                                        <option value="">Selecione um cliente</option>
                                        {clients.map(c => (
                                            <option key={c.id} value={c.id}>{c.name}</option>
                                        ))}
                                    </select>
                                    <span className="material-symbols-outlined absolute left-4 text-[#ee2bad] text-[22px]">person</span>
                                </div>
                            </div>
                        </div>
                    </section>
                    <section className="mt-8">
                        <h2 className="text-lg font-bold text-zinc-900 dark:text-white mb-4 px-1">O Evento</h2>
                        <div className="space-y-4">
                            <div className="group">
                                <label className="block text-sm font-medium text-zinc-500 dark:text-zinc-400 mb-1.5 ml-2">Título da Festa</label>
                                <div className="relative flex items-center">
                                    <input
                                        className="w-full bg-white dark:bg-[#2d1b27] border-0 ring-1 ring-zinc-200 dark:ring-white/10 rounded-full py-3.5 pl-12 pr-4 text-zinc-900 dark:text-white placeholder-zinc-400 focus:ring-2 focus:ring-[#ee2bad] focus:outline-none transition-shadow shadow-sm"
                                        placeholder="Ex: Aniversário da Sofia"
                                        type="text"
                                        value={formData.title}
                                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                        required
                                    />
                                    <span className="material-symbols-outlined absolute left-4 text-[#ee2bad] text-[22px]">celebration</span>
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-zinc-500 dark:text-zinc-400 mb-1.5 ml-2">Data</label>
                                    <div className="relative flex items-center">
                                        <input
                                            className="w-full bg-white dark:bg-[#2d1b27] border-0 ring-1 ring-zinc-200 dark:ring-white/10 rounded-full py-3.5 pl-11 pr-4 text-zinc-900 dark:text-white focus:ring-2 focus:ring-[#ee2bad] focus:outline-none transition-shadow shadow-sm"
                                            type="date"
                                            value={formData.date}
                                            onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                                            required
                                        />
                                        <span className="material-symbols-outlined absolute left-4 text-[#ee2bad] text-[22px] pointer-events-none">calendar_today</span>
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-zinc-500 dark:text-zinc-400 mb-1.5 ml-2">Horário</label>
                                    <div className="relative flex items-center">
                                        <input
                                            className="w-full bg-white dark:bg-[#2d1b27] border-0 ring-1 ring-zinc-200 dark:ring-white/10 rounded-full py-3.5 pl-11 pr-4 text-zinc-900 dark:text-white focus:ring-2 focus:ring-[#ee2bad] focus:outline-none transition-shadow shadow-sm"
                                            type="time"
                                            value={formData.time}
                                            onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                                            required
                                        />
                                        <span className="material-symbols-outlined absolute left-4 text-[#ee2bad] text-[22px] pointer-events-none">schedule</span>
                                    </div>
                                </div>
                            </div>
                            <div className="group">
                                <label className="block text-sm font-medium text-zinc-500 dark:text-zinc-400 mb-1.5 ml-2">Status</label>
                                <div className="relative flex items-center">
                                    <select
                                        className="w-full bg-white dark:bg-[#2d1b27] border-0 ring-1 ring-zinc-200 dark:ring-white/10 rounded-full py-3.5 pl-12 pr-4 text-zinc-900 dark:text-white focus:ring-2 focus:ring-[#ee2bad] focus:outline-none transition-shadow shadow-sm appearance-none"
                                        value={formData.status}
                                        onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                                        required
                                    >
                                        <option value="scheduled">Confirmada</option>
                                        <option value="pending">Pendente</option>
                                        <option value="completed">Concluída</option>
                                        <option value="cancelled">Cancelada</option>
                                    </select>
                                    <span className="material-symbols-outlined absolute left-4 text-[#ee2bad] text-[22px]">info</span>
                                </div>
                            </div>
                        </div>
                    </section>

                    <section className="mt-8">
                        <div className="flex items-center justify-between mb-4 px-1">
                            <h2 className="text-lg font-bold text-zinc-900 dark:text-white">Itens da Festa</h2>
                            <button
                                type="button"
                                onClick={handleAddItem}
                                className="text-xs font-bold text-[#ee2bad] uppercase tracking-wider bg-[#ee2bad]/10 px-3 py-1.5 rounded-full hover:bg-[#ee2bad]/20 transition-colors"
                            >
                                Adicionar Item
                            </button>
                        </div>
                        <div className="space-y-3">
                            {items.map((item, index) => (
                                <div key={index} className="flex items-center justify-between p-4 bg-white dark:bg-[#2d1b27] rounded-2xl shadow-sm ring-1 ring-zinc-100 dark:ring-white/5">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-full bg-pink-100 dark:bg-pink-900/30 flex items-center justify-center text-[#ee2bad]">
                                            <span className="material-symbols-outlined text-[20px]">{item.icon}</span>
                                        </div>
                                        <div>
                                            <p className="font-bold text-zinc-900 dark:text-white leading-tight">{item.name}</p>
                                            <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">{item.category}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3 bg-zinc-50 dark:bg-black/20 rounded-full p-1">
                                        <button
                                            type="button"
                                            onClick={() => updateItemQuantity(index, -1)}
                                            className="w-7 h-7 flex items-center justify-center rounded-full bg-white dark:bg-[#2d1b27] text-zinc-400 hover:text-[#ee2bad] shadow-sm hover:shadow transition-all"
                                        >
                                            <span className="material-symbols-outlined text-[16px]">remove</span>
                                        </button>
                                        <span className="text-sm font-bold w-3 text-center">{item.quantity}</span>
                                        <button
                                            type="button"
                                            onClick={() => updateItemQuantity(index, 1)}
                                            className="w-7 h-7 flex items-center justify-center rounded-full bg-[#ee2bad] text-white shadow-md hover:bg-[#ee2bad]/90 transition-all"
                                        >
                                            <span className="material-symbols-outlined text-[16px]">add</span>
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>

                    <section className="mt-8 mb-6">
                        <h2 className="text-lg font-bold text-zinc-900 dark:text-white mb-4 px-1">Local / Observações</h2>
                        <div className="relative">
                            <textarea
                                className="w-full bg-white dark:bg-[#2d1b27] border-0 ring-1 ring-zinc-200 dark:ring-white/10 rounded-2xl py-4 px-4 text-zinc-900 dark:text-white placeholder-zinc-400 focus:ring-2 focus:ring-[#ee2bad] focus:outline-none transition-shadow shadow-sm resize-none"
                                placeholder="Local da festa, detalhes importantes..."
                                rows={4}
                                value={formData.description}
                                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                            ></textarea>
                            <div className="absolute bottom-3 right-3 pointer-events-none text-zinc-300 dark:text-zinc-600">
                                <span className="material-symbols-outlined text-[20px]">edit_note</span>
                            </div>
                        </div>
                    </section>
                </form>
            </main>
            <div className="absolute bottom-0 left-0 w-full p-5 bg-gradient-to-t from-[#f8f6f7] via-[#f8f6f7] to-transparent dark:from-[#22101c] dark:via-[#22101c] pointer-events-none flex justify-center pb-8 pt-12">
                <button
                    onClick={handleSubmit}
                    disabled={loading}
                    className="pointer-events-auto w-full max-w-[90%] bg-[#ee2bad] hover:bg-[#ee2bad]/90 text-white font-bold text-lg py-4 px-8 rounded-full shadow-lg shadow-[#ee2bad]/30 flex items-center justify-center gap-2 transform active:scale-95 transition-all disabled:opacity-50"
                >
                    <span>{loading ? 'Salvando...' : 'Agendar Festa'}</span>
                    {!loading && <span className="material-symbols-outlined">arrow_forward</span>}
                </button>
            </div>
        </div>
    );
};

export default NewPartyScreen;
