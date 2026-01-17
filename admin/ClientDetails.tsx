import React, { useEffect, useState } from 'react';
import { useNavigate, Link, useParams } from 'react-router-dom';
import AdminLayout from '../components/AdminLayout';
import { supabase } from '../lib/supabase';

const ClientDetailsScreen = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [client, setClient] = useState<any>(null);
    const [parties, setParties] = useState<any[]>([]);

    useEffect(() => {
        if (id) {
            fetchClientDetails();
        }
    }, [id]);

    const fetchClientDetails = async () => {
        setLoading(true);
        try {
            const { data: clientData } = await supabase
                .from('customer_records')
                .select('*')
                .eq('id', id)
                .single();

            setClient(clientData);

            const { data: partyData } = await supabase
                .from('appointments')
                .select('*')
                .eq('customer_id', id)
                .order('event_date', { ascending: false });

            setParties(partyData || []);
        } catch (error) {
            console.error('Error fetching client details:', error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <AdminLayout title="Detalhes do Cliente" showBackButton>
                <div className="flex items-center justify-center h-[60vh]">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#ee2bad]"></div>
                </div>
            </AdminLayout>
        );
    }

    if (!client) {
        return (
            <AdminLayout title="Detalhes do Cliente" showBackButton>
                <div className="text-center py-10 text-[#89617c] dark:text-gray-400">
                    Cliente não encontrado.
                </div>
            </AdminLayout>
        );
    }

    return (
        <AdminLayout title="Detalhes do Cliente" showBackButton>
            {/* Profile Header */}
            <div className="flex flex-col items-center p-4 gap-4">
                <div className="relative">
                    <div className="bg-gray-200 flex items-center justify-center rounded-full h-32 w-32 shadow-xl ring-4 ring-white dark:ring-white/10">
                        <span className="material-symbols-outlined text-gray-400 text-6xl">person</span>
                    </div>
                </div>
                <div className="flex flex-col items-center justify-center">
                    <h1 className="text-slate-900 dark:text-white text-[22px] font-bold leading-tight tracking-[-0.015em] text-center">{client.name}</h1>
                    <p className="text-slate-500 dark:text-slate-400 text-sm font-medium leading-normal text-center mt-1">
                        Cliente desde {new Date(client.created_at).getFullYear()}
                    </p>
                </div>
            </div>
            {/* Actions */}
            <div className="px-4 py-2">
                <div className="grid grid-cols-3 gap-3">
                    {client.phone && (
                        <a href={`tel:${client.phone}`} className="flex flex-col items-center gap-2 bg-white dark:bg-[#2d1b27] p-3 rounded-xl shadow-sm hover:bg-gray-50 dark:hover:bg-white/5 transition-colors group">
                            <div className="rounded-full bg-[#ee2bad]/10 p-2.5 text-[#ee2bad] group-hover:bg-[#ee2bad] group-hover:text-white transition-colors">
                                <span className="material-symbols-outlined text-[24px]">call</span>
                            </div>
                            <span className="text-slate-700 dark:text-slate-200 text-xs font-medium">Ligar</span>
                        </a>
                    )}
                    {client.phone && (
                        <a href={`https://wa.me/${client.phone.replace(/\D/g, '')}`} target="_blank" rel="noopener noreferrer" className="flex flex-col items-center gap-2 bg-white dark:bg-[#2d1b27] p-3 rounded-xl shadow-sm hover:bg-gray-50 dark:hover:bg-white/5 transition-colors group">
                            <div className="rounded-full bg-[#ee2bad]/10 p-2.5 text-[#ee2bad] group-hover:bg-[#ee2bad] group-hover:text-white transition-colors">
                                <span className="material-symbols-outlined text-[24px]">chat</span>
                            </div>
                            <span className="text-slate-700 dark:text-slate-200 text-xs font-medium">WhatsApp</span>
                        </a>
                    )}
                    {client.email && (
                        <a href={`mailto:${client.email}`} className="flex flex-col items-center gap-2 bg-white dark:bg-[#2d1b27] p-3 rounded-xl shadow-sm hover:bg-gray-50 dark:hover:bg-white/5 transition-colors group">
                            <div className="rounded-full bg-[#ee2bad]/10 p-2.5 text-[#ee2bad] group-hover:bg-[#ee2bad] group-hover:text-white transition-colors">
                                <span className="material-symbols-outlined text-[24px]">mail</span>
                            </div>
                            <span className="text-slate-700 dark:text-slate-200 text-xs font-medium">Email</span>
                        </a>
                    )}
                </div>
            </div>
            <div className="h-4"></div>
            {/* Birthday Spotlight */}
            {client.birthday && (
                <div className="flex flex-col gap-3 px-4">
                    <h3 className="text-slate-900 dark:text-white tracking-tight text-lg font-bold leading-tight">Aniversário</h3>
                    <div className="flex flex-col rounded-xl overflow-hidden shadow-md bg-white dark:bg-[#2d1b27] ring-1 ring-black/5 dark:ring-white/10 p-4">
                        <div className="flex items-center gap-4">
                            <div className="bg-[#ee2bad]/10 p-3 rounded-full text-[#ee2bad]">
                                <span className="material-symbols-outlined text-3xl">cake</span>
                            </div>
                            <div>
                                <p className="text-2xl font-bold text-slate-900 dark:text-white">
                                    {new Date(client.birthday + 'T00:00:00').toLocaleDateString('pt-BR', { day: '2-digit', month: 'long' })}
                                </p>
                                <p className="text-sm text-slate-500 dark:text-slate-400">Data de nascimento</p>
                            </div>
                        </div>
                    </div>
                </div>
            )}
            <div className="h-6"></div>
            {/* Info Section */}
            <div className="px-4">
                <h3 className="text-slate-900 dark:text-white tracking-tight text-lg font-bold leading-tight mb-3">Informações</h3>
                <div className="bg-white dark:bg-[#2d1b27] rounded-xl p-4 shadow-sm ring-1 ring-black/5 dark:ring-white/10 space-y-4">
                    <div className="flex items-start gap-3">
                        <div className="mt-1 text-slate-400 dark:text-slate-500">
                            <span className="material-symbols-outlined text-[20px]">mail</span>
                        </div>
                        <div>
                            <p className="text-sm font-medium text-slate-900 dark:text-white">E-mail</p>
                            <p className="text-sm text-slate-500 dark:text-slate-400 mt-0.5">{client.email || 'Não informado'}</p>
                        </div>
                    </div>
                    <div className="h-px bg-slate-100 dark:bg-white/5 w-full"></div>
                    <div className="flex items-start gap-3">
                        <div className="mt-1 text-slate-400 dark:text-slate-500">
                            <span className="material-symbols-outlined text-[20px]">call</span>
                        </div>
                        <div>
                            <p className="text-sm font-medium text-slate-900 dark:text-white">Telefone</p>
                            <p className="text-sm text-slate-500 dark:text-slate-400 mt-0.5">{client.phone || 'Não informado'}</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="h-6"></div>
            {/* History Section */}
            <div className="px-4 mb-8">
                <div className="flex items-center justify-between mb-3">
                    <h3 className="text-slate-900 dark:text-white tracking-tight text-lg font-bold leading-tight">Histórico de Festas</h3>
                </div>
                <div className="bg-white dark:bg-[#2d1b27] rounded-xl p-0 shadow-sm ring-1 ring-black/5 dark:ring-white/10 overflow-hidden">
                    {parties.length > 0 ? parties.map((party) => (
                        <div key={party.id} className="relative flex gap-4 p-4 group border-b border-slate-100 dark:border-white/5 last:border-0 hover:bg-slate-50 dark:hover:bg-white/5 transition-colors">
                            <div className="flex flex-col flex-1 justify-center">
                                <div className="flex justify-between items-start">
                                    <p className="text-sm font-bold text-slate-900 dark:text-white">{party.title}</p>
                                    <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${party.status === 'scheduled' ? 'text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-900/30' : 'text-slate-600 dark:text-slate-400 bg-slate-50 dark:bg-slate-900/30'}`}>
                                        {party.status}
                                    </span>
                                </div>
                                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                                    {new Date(party.event_date + 'T00:00:00').toLocaleDateString('pt-BR', { day: '2-digit', month: 'short', year: 'numeric' })} às {party.event_time?.substring(0, 5)}
                                </p>
                            </div>
                        </div>
                    )) : (
                        <div className="p-4 text-center text-sm text-slate-500 dark:text-slate-400">
                            Nenhuma festa registrada.
                        </div>
                    )}
                </div>
            </div>
            <Link to="/admin/new-party" className="fixed bottom-24 md:bottom-10 right-6 h-14 w-14 rounded-full bg-[#ee2bad] text-white shadow-lg shadow-[#ee2bad]/40 flex items-center justify-center hover:scale-105 active:scale-95 transition-all z-50 ring-2 ring-white dark:ring-[#2d1b27]">
                <span className="material-symbols-outlined text-[28px]">add</span>
            </Link>
        </AdminLayout>
    );
};

export default ClientDetailsScreen;
