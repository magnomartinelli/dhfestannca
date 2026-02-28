import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import AdminLayout from '../components/AdminLayout';
import { supabase } from '../lib/supabase';

const ClientListScreen = () => {
    const [loading, setLoading] = useState(true);
    const [clients, setClients] = useState<any[]>([]);
    const [search, setSearch] = useState('');
    const [filter, setFilter] = useState('all');

    useEffect(() => {
        fetchClients();
    }, []);

    const fetchClients = async () => {
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
                .from('customer_records')
                .select('*')
                .eq('client_id', clientId)
                .order('created_at', { ascending: false });

            setClients(data || []);
        } catch (error) {
            console.error('Error fetching clients:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleDeleteClient = async (id: string) => {
        if (!confirm('Tem certeza que deseja excluir este cliente?')) return;

        try {
            const { error } = await supabase
                .from('customer_records')
                .delete()
                .eq('id', id);

            if (error) throw error;
            setClients(clients.filter(c => c.id !== id));
        } catch (error: any) {
            alert('Erro ao excluir cliente: ' + error.message);
        }
    };

    const filteredClients = clients.filter(c => {
        const searchLower = search.toLowerCase();
        const matchesSearch =
            c.name.toLowerCase().includes(searchLower) ||
            (c.phone && c.phone.includes(searchLower)) ||
            (c.email && c.email.toLowerCase().includes(searchLower)) ||
            (c.observations && c.observations.toLowerCase().includes(searchLower));
        return matchesSearch;
    });

    return (
        <AdminLayout title="Meus Clientes">
            <div className="pb-2">
                <div className="relative flex h-12 w-full items-center overflow-hidden rounded-full bg-white dark:bg-[#2d1b27] shadow-sm border border-gray-100 dark:border-gray-800 transition-colors">
                    <div className="flex h-full w-12 items-center justify-center text-[#89617c]">
                        <span className="material-symbols-outlined text-[20px]">search</span>
                    </div>
                    <input
                        className="h-full w-full border-none bg-transparent px-0 text-base text-[#181116] dark:text-white placeholder:text-[#89617c] focus:ring-0"
                        placeholder="Buscar por nome ou telefone..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>
            </div>
            <div className="w-full overflow-x-auto no-scrollbar py-4">
                <div className="flex gap-3 w-max">
                    <button
                        onClick={() => setFilter('all')}
                        className={`flex h-9 min-w-[80px] items-center justify-center rounded-full px-4 text-sm font-semibold transition-transform active:scale-95 ${filter === 'all' ? 'bg-[#ee2bad] text-white shadow-soft' : 'bg-white dark:bg-[#2d1b27] text-[#89617c] border border-transparent dark:border-gray-700'}`}
                    >
                        Todos
                    </button>
                </div>
            </div>
            <main className="flex flex-col gap-4 pt-2">
                {loading ? (
                    <div className="flex items-center justify-center py-10">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#ee2bad]"></div>
                    </div>
                ) : filteredClients.length > 0 ? filteredClients.map((client) => (
                    <div key={client.id} className="group relative flex flex-col gap-3 rounded-[1.5rem] bg-white dark:bg-[#2d1b27] p-4 shadow-card transition-all hover:shadow-soft dark:border dark:border-gray-800">
                        <div className="flex items-start gap-4">
                            <div className="relative shrink-0">
                                <div className="h-16 w-16 rounded-full bg-gray-200 flex items-center justify-center shadow-inner">
                                    <span className="material-symbols-outlined text-gray-400 text-3xl">person</span>
                                </div>
                            </div>
                            <div className="flex flex-1 flex-col pt-1">
                                <div className="flex justify-between items-center">
                                    <h3 className="text-lg font-bold text-[#181116] dark:text-white leading-tight">{client.name}</h3>
                                    <div className="flex gap-1">
                                        <Link to={`/admin/edit-client/${client.id}`} className="p-2 text-[#89617c] hover:text-[#ee2bad] transition-colors">
                                            <span className="material-symbols-outlined text-[20px]">edit</span>
                                        </Link>
                                        <button
                                            onClick={() => handleDeleteClient(client.id)}
                                            className="p-2 text-[#89617c] hover:text-red-500 transition-colors"
                                        >
                                            <span className="material-symbols-outlined text-[20px]">delete</span>
                                        </button>
                                    </div>
                                </div>
                                <p className="mt-1 line-clamp-2 text-sm text-[#89617c] dark:text-gray-400 font-medium">
                                    {client.phone || 'Sem telefone'}
                                    {client.birthday && ` • Nasc: ${new Date(client.birthday + 'T00:00:00').toLocaleDateString('pt-BR')}`}
                                </p>
                            </div>
                        </div>
                        <div className="mt-2 flex items-center justify-between border-t border-gray-100 dark:border-gray-700 pt-3">
                            <div className="flex gap-2">
                                {client.phone && (
                                    <a
                                        href={`https://wa.me/${client.phone.replace(/\D/g, '')}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="group/btn flex items-center justify-center gap-2 rounded-full bg-green-50 dark:bg-green-900/20 px-3 py-2 text-green-600 dark:text-green-400 transition-colors hover:bg-green-100 dark:hover:bg-green-900/40"
                                    >
                                        <span className="material-symbols-outlined text-[18px]">chat</span>
                                        <span className="text-xs font-bold">WhatsApp</span>
                                    </a>
                                )}
                            </div>
                            <Link to={`/admin/client-details/${client.id}`} className="flex items-center gap-1 text-xs font-bold text-[#ee2bad] hover:underline">
                                Ver detalhes
                                <span className="material-symbols-outlined text-[16px]">chevron_right</span>
                            </Link>
                        </div>
                    </div>
                )) : (
                    <div className="text-center py-10 text-[#89617c] dark:text-gray-400">
                        Nenhum cliente encontrado.
                    </div>
                )}
            </main>
            <div className="fixed bottom-24 md:bottom-10 right-6 z-50 flex flex-col gap-4">
                <Link to="/admin/new-client" className="flex h-14 w-14 items-center justify-center rounded-full bg-white dark:bg-[#2d1b27] text-[#ee2bad] shadow-lg border border-[#ee2bad]/20 transition-transform active:scale-90 hover:scale-105">
                    <span className="material-symbols-outlined text-[32px]">person_add</span>
                </Link>
                <Link to="/admin/new-party" className="flex h-14 w-14 items-center justify-center rounded-full bg-[#ee2bad] text-white shadow-lg shadow-[#ee2bad]/40 transition-transform active:scale-90 hover:scale-105">
                    <span className="material-symbols-outlined text-[32px]">add</span>
                </Link>
            </div>
        </AdminLayout>
    );
};

export default ClientListScreen;
