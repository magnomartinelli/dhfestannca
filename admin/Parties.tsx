import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import AdminLayout from '../components/AdminLayout';
import { supabase } from '../lib/supabase';

const PartyListScreen = () => {
    const [loading, setLoading] = useState(true);
    const [parties, setParties] = useState<any[]>([]);
    const [search, setSearch] = useState('');
    const [filter, setFilter] = useState('all');

    useEffect(() => {
        fetchParties();
    }, []);

    const fetchParties = async () => {
        setLoading(true);
        try {
            const { data: { user } } = await supabase.auth.getUser();
            if (!user) return;

            const { data: userData } = await supabase
                .from('users')
                .select('client_id')
                .eq('id', user.id)
                .single();

            if (!userData) return;
            const clientId = userData.client_id;

            const { data } = await supabase
                .from('appointments')
                .select('*, customer_records(name)')
                .eq('client_id', clientId)
                .order('event_date', { ascending: true });

            setParties(data || []);
        } catch (error) {
            console.error('Error fetching parties:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleDeleteParty = async (id: string) => {
        if (!confirm('Tem certeza que deseja excluir esta festa?')) return;

        try {
            const { error } = await supabase
                .from('appointments')
                .delete()
                .eq('id', id);

            if (error) throw error;
            setParties(parties.filter(p => p.id !== id));
        } catch (error: any) {
            alert('Erro ao excluir festa: ' + error.message);
        }
    };

    const filteredParties = parties.filter(p => {
        const searchLower = search.toLowerCase();
        const eventDate = p.event_date ? new Date(p.event_date + 'T00:00:00').toLocaleDateString('pt-BR') : '';
        const statusMap: { [key: string]: string } = {
            'scheduled': 'confirmada',
            'pending': 'pendente',
            'completed': 'concluída',
            'cancelled': 'cancelada'
        };
        const statusLabel = statusMap[p.status] || '';

        const matchesSearch =
            p.title.toLowerCase().includes(searchLower) ||
            (p.customer_records?.name && p.customer_records.name.toLowerCase().includes(searchLower)) ||
            (p.description && p.description.toLowerCase().includes(searchLower)) ||
            statusLabel.includes(searchLower) ||
            eventDate.includes(searchLower);

        const matchesFilter = filter === 'all' || p.status === filter;
        return matchesSearch && matchesFilter;
    });

    return (
        <AdminLayout title="Minhas Festas">
            <main className="w-full flex flex-col gap-6 pt-2">
                {/* Search */}
                <div className="relative group">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <span className="material-symbols-outlined text-[#89617c] dark:text-[#dcbcd1]">search</span>
                    </div>
                    <input
                        className="block w-full pl-12 pr-4 py-3.5 bg-white dark:bg-[#2d1b27] border-none rounded-xl text-[#181116] dark:text-[#f8f6f7] placeholder-[#89617c] dark:placeholder-[#dcbcd1] focus:ring-2 focus:ring-[#ee2bad]/50 shadow-sm text-base font-medium transition-all"
                        placeholder="Buscar cliente, data ou tema"
                        type="text"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>
                {/* Chips */}
                <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1">
                    <button
                        onClick={() => setFilter('all')}
                        className={`flex shrink-0 items-center h-10 px-5 rounded-full transition-transform active:scale-95 ${filter === 'all' ? 'bg-[#ee2bad] text-white shadow-soft' : 'bg-white dark:bg-[#2d1b27] border border-gray-100 dark:border-gray-700 text-[#181116] dark:text-[#f8f6f7]'}`}
                    >
                        <span className="text-sm font-bold">Todas</span>
                    </button>
                    <button
                        onClick={() => setFilter('scheduled')}
                        className={`flex shrink-0 items-center h-10 px-5 rounded-full transition-transform active:scale-95 ${filter === 'scheduled' ? 'bg-[#ee2bad] text-white shadow-soft' : 'bg-white dark:bg-[#2d1b27] border border-gray-100 dark:border-gray-700 text-[#181116] dark:text-[#f8f6f7]'}`}
                    >
                        <span className="text-sm font-medium">Confirmadas</span>
                    </button>
                    <button
                        onClick={() => setFilter('pending')}
                        className={`flex shrink-0 items-center h-10 px-5 rounded-full transition-transform active:scale-95 ${filter === 'pending' ? 'bg-[#ee2bad] text-white shadow-soft' : 'bg-white dark:bg-[#2d1b27] border border-gray-100 dark:border-gray-700 text-[#181116] dark:text-[#f8f6f7]'}`}
                    >
                        <span className="text-sm font-medium">Pendentes</span>
                    </button>
                    <button
                        onClick={() => setFilter('completed')}
                        className={`flex shrink-0 items-center h-10 px-5 rounded-full transition-transform active:scale-95 ${filter === 'completed' ? 'bg-[#ee2bad] text-white shadow-soft' : 'bg-white dark:bg-[#2d1b27] border border-gray-100 dark:border-gray-700 text-[#181116] dark:text-[#f8f6f7]'}`}
                    >
                        <span className="text-sm font-medium">Concluídas</span>
                    </button>
                    <button
                        onClick={() => setFilter('cancelled')}
                        className={`flex shrink-0 items-center h-10 px-5 rounded-full transition-transform active:scale-95 ${filter === 'cancelled' ? 'bg-[#ee2bad] text-white shadow-soft' : 'bg-white dark:bg-[#2d1b27] border border-gray-100 dark:border-gray-700 text-[#181116] dark:text-[#f8f6f7]'}`}
                    >
                        <span className="text-sm font-medium">Canceladas</span>
                    </button>
                </div>
                {/* Events List */}
                <div className="flex flex-col gap-4">
                    <div className="flex items-center justify-between">
                        <h2 className="text-[#181116] dark:text-[#f8f6f7] text-xl font-bold tracking-tight">Eventos</h2>
                    </div>
                    {loading ? (
                        <div className="flex items-center justify-center py-10">
                            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#ee2bad]"></div>
                        </div>
                    ) : filteredParties.length > 0 ? filteredParties.map((party) => (
                        <div key={party.id} className="group relative flex flex-col w-full overflow-hidden rounded-2xl bg-white dark:bg-[#2d1b27] shadow-card transition-all hover:shadow-lg active:scale-[0.99]">
                            <div className="relative h-40 w-full">
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent z-10"></div>
                                <img className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" src="https://images.unsplash.com/photo-1530103043960-ef38714abb15?auto=format&fit=crop&q=80&w=800" alt="Party" />
                                <div className="absolute top-3 left-3 z-20">
                                    <span className={`inline-flex items-center gap-1.5 rounded-full bg-white/20 backdrop-blur-md px-3 py-1 text-xs font-bold text-white border border-white/30`}>
                                        <span className={`h-2 w-2 rounded-full ${party.status === 'scheduled' ? 'bg-green-400' :
                                            party.status === 'pending' ? 'bg-yellow-400' :
                                                party.status === 'completed' ? 'bg-blue-400' :
                                                    'bg-red-400'
                                            }`}></span>
                                        {
                                            party.status === 'scheduled' ? 'Confirmada' :
                                                party.status === 'pending' ? 'Pendente' :
                                                    party.status === 'completed' ? 'Concluída' :
                                                        'Cancelada'
                                        }
                                    </span>
                                </div>
                                <div className="absolute top-3 right-3 z-20 flex flex-col items-center justify-center rounded-xl bg-white/90 dark:bg-[#2d1b27]/90 backdrop-blur-sm p-2 text-center w-14 shadow-lg">
                                    <span className="text-xs font-bold text-[#ee2bad] uppercase">
                                        {party.event_date ? new Date(party.event_date + 'T00:00:00').toLocaleDateString('pt-BR', { month: 'short' }) : '---'}
                                    </span>
                                    <span className="text-xl font-extrabold text-[#181116] dark:text-[#f8f6f7] leading-none">
                                        {party.event_date ? new Date(party.event_date + 'T00:00:00').getDate() : '--'}
                                    </span>
                                </div>
                            </div>
                            <div className="flex flex-col gap-3 p-5">
                                <div className="flex justify-between items-start">
                                    <div>
                                        <h3 className="text-lg font-bold text-[#181116] dark:text-[#f8f6f7] leading-tight">{party.title}</h3>
                                        <p className="text-[#ee2bad] font-medium text-sm mt-1">{party.customer_records?.name}</p>
                                    </div>
                                    <div className="flex gap-1">
                                        <Link to={`/admin/edit-party/${party.id}`} className="p-2 text-[#89617c] hover:text-[#ee2bad] transition-colors">
                                            <span className="material-symbols-outlined text-[20px]">edit</span>
                                        </Link>
                                        <button
                                            onClick={() => handleDeleteParty(party.id)}
                                            className="p-2 text-[#89617c] hover:text-red-500 transition-colors"
                                        >
                                            <span className="material-symbols-outlined text-[20px]">delete</span>
                                        </button>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3 mt-1">
                                    <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#f8f6f7] dark:bg-[#22101c]/50">
                                        <span className="material-symbols-outlined text-[18px] text-[#89617c] dark:text-[#dcbcd1]">schedule</span>
                                        <span className="text-xs font-bold text-[#181116] dark:text-[#f8f6f7]">{party.event_time ? party.event_time.substring(0, 5) : '--:--'}</span>
                                    </div>
                                    <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#f8f6f7] dark:bg-[#22101c]/50">
                                        <span className="material-symbols-outlined text-[18px] text-[#89617c] dark:text-[#dcbcd1]">location_on</span>
                                        <span className="text-xs font-bold text-[#181116] dark:text-[#f8f6f7] truncate max-w-[150px]">{party.description || 'Local não definido'}</span>
                                    </div>
                                </div>
                                <div className="mt-2 pt-3 border-t border-gray-100 dark:border-gray-700 flex justify-end items-center">
                                    <Link to={`/admin/edit-party/${party.id}`} className="text-sm font-bold text-[#ee2bad] hover:text-[#c91a8e] transition-colors flex items-center gap-1">
                                        Gerenciar <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    )) : (
                        <div className="text-center py-10 text-[#89617c] dark:text-gray-400">
                            Nenhuma festa encontrada.
                        </div>
                    )}
                </div>
                <div className="h-12"></div>
            </main>
            <div className="fixed bottom-24 md:bottom-10 right-4 z-40">
                <Link to="/admin/new-party" className="group flex items-center justify-center size-14 rounded-full bg-[#ee2bad] text-white shadow-[0_8px_25px_rgba(238,43,173,0.4)] hover:bg-[#c91a8e] hover:scale-105 active:scale-95 transition-all duration-300">
                    <span className="material-symbols-outlined text-[32px] group-hover:rotate-90 transition-transform duration-300">add</span>
                </Link>
            </div>
        </AdminLayout>
    );
};

export default PartyListScreen;
