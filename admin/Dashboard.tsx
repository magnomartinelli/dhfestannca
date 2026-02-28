import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import AdminLayout from '../components/AdminLayout';
import { supabase } from '../lib/supabase';

const DashboardScreen = () => {
    const [loading, setLoading] = useState(true);
    const [stats, setStats] = useState({ activeEvents: 0, budgets: 0, tasks: 0 });
    const [nextParty, setNextParty] = useState<any>(null);
    const [birthdays, setBirthdays] = useState<any[]>([]);
    const [finance, setFinance] = useState({ balance: 0, income: 0, expenses: 0 });

    useEffect(() => {
        fetchDashboardData();
    }, []);

    const fetchDashboardData = async () => {
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

            // Fetch all appointments for stats calculation
            const { data: appointmentsData } = await supabase
                .from('appointments')
                .select('*')
                .eq('client_id', clientId);

            // Fetch financial summary from financial_records
            const { data: financialRecords } = await supabase
                .from('financial_records')
                .select('type, amount')
                .eq('client_id', clientId);

            const income = (financialRecords || []).filter(r => r.type === 'receita').reduce((acc, r) => acc + (Number(r.amount) || 0), 0);
            const expenses = (financialRecords || []).filter(r => r.type === 'despesa').reduce((acc, r) => acc + (Number(r.amount) || 0), 0);

            setStats({
                activeEvents: appointmentsData?.filter(a => a.status === 'confirmed').length || 0,
                budgets: appointmentsData?.filter(a => a.status === 'pending').length || 0,
                tasks: 0, // Tasks remain 0 as per original
                income,
                expenses,
                balance: income - expenses
            });

            // Fetch Next Party
            const { data: nextPartyData } = await supabase
                .from('appointments')
                .select('*, customer_records(name)')
                .eq('client_id', clientId)
                .gte('event_date', new Date().toISOString().split('T')[0]) // Use event_date
                .order('event_date', { ascending: true })
                .order('event_time', { ascending: true }) // Order by event_time
                .limit(1)
                .maybeSingle();

            if (nextPartyData) {
                setNextParty({
                    ...nextPartyData, // Keep all original data
                    customer: nextPartyData.customer_records?.name || 'N/A',
                    date: new Date(nextPartyData.event_date + 'T00:00:00').toLocaleDateString('pt-BR'),
                    time: nextPartyData.event_time.substring(0, 5)
                });
            } else {
                setNextParty(null);
            }

            // Fetch Birthdays
            const currentMonth = new Date().getMonth() + 1;
            const { data: birthdayData } = await supabase
                .from('customer_records')
                .select('*')
                .eq('client_id', clientId)
                .not('birthday', 'is', null);

            const filteredBirthdays = (birthdayData || []).filter(c => {
                if (!c.birthday) return false;
                const bMonth = new Date(c.birthday).getUTCMonth() + 1;
                return bMonth === currentMonth;
            });
            setBirthdays(filteredBirthdays);

            setFinance({
                balance: income - expenses,
                income: income,
                expenses: expenses
            });

        } catch (error) {
            console.error('Error fetching dashboard data:', error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <AdminLayout>
                <div className="flex items-center justify-center h-[60vh]">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#ee2bad]"></div>
                </div>
            </AdminLayout>
        );
    }

    return (
        <AdminLayout>
            {/* Stats Overview */}
            <section className="w-full pt-2 pb-6">
                <div className="flex gap-4 overflow-x-auto no-scrollbar pb-2">
                    <div className="flex min-w-[140px] flex-1 flex-col gap-3 rounded-xl bg-white dark:bg-[#2d1b27] p-4 shadow-sm ring-1 ring-black/5 dark:ring-white/5">
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#ee2bad]/10 dark:bg-[#ee2bad]/20 text-[#ee2bad]">
                            <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>event_available</span>
                        </div>
                        <div>
                            <p className="text-2xl font-bold tracking-tight text-[#181116] dark:text-[#f8f6f7]">{stats.activeEvents}</p>
                            <p className="text-xs font-medium text-[#89617c] dark:text-[#dcbcd1]">Eventos Ativos</p>
                        </div>
                    </div>
                    <div className="flex min-w-[140px] flex-1 flex-col gap-3 rounded-xl bg-white dark:bg-[#2d1b27] p-4 shadow-sm ring-1 ring-black/5 dark:ring-white/5">
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-orange-100 dark:bg-orange-500/20 text-orange-600 dark:text-orange-400">
                            <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>request_quote</span>
                        </div>
                        <div>
                            <p className="text-2xl font-bold tracking-tight text-[#181116] dark:text-[#f8f6f7]">{stats.budgets}</p>
                            <p className="text-xs font-medium text-[#89617c] dark:text-[#dcbcd1]">Orçamentos</p>
                        </div>
                    </div>
                    <div className="flex min-w-[140px] flex-1 flex-col gap-3 rounded-xl bg-white dark:bg-[#2d1b27] p-4 shadow-sm ring-1 ring-black/5 dark:ring-white/5">
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-500/20 text-blue-600 dark:text-blue-400">
                            <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>task_alt</span>
                        </div>
                        <div>
                            <p className="text-2xl font-bold tracking-tight text-[#181116] dark:text-[#f8f6f7]">{stats.tasks}</p>
                            <p className="text-xs font-medium text-[#89617c] dark:text-[#dcbcd1]">Tarefas</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Next Party Hero */}
            <section className="flex flex-col pb-6">
                <div className="flex items-center justify-between pb-3">
                    <h2 className="text-xl font-bold tracking-tight text-[#181116] dark:text-[#f8f6f7]">Próxima Festa</h2>
                    <Link to="/admin/parties" className="text-xs font-bold text-[#ee2bad] hover:text-[#c91a8e]">Ver agenda</Link>
                </div>
                {nextParty ? (
                    <Link to={`/admin/parties`} className="group relative overflow-hidden rounded-2xl bg-white dark:bg-[#2d1b27] shadow-md ring-1 ring-black/5 dark:ring-white/5 transition-all active:scale-[0.98]">
                        <div className="relative h-32 w-full bg-gray-200">
                            <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1530103043960-ef38714abb15?auto=format&fit=crop&q=80&w=800")' }}></div>
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                            <div className="absolute bottom-3 left-4 right-4 flex justify-between items-end">
                                <span className="inline-flex items-center rounded-full bg-white/20 backdrop-blur-md px-2.5 py-0.5 text-xs font-medium text-white ring-1 ring-inset ring-white/30">{nextParty.status}</span>
                            </div>
                        </div>
                        <div className="flex flex-col gap-3 p-4">
                            <div className="flex items-start justify-between">
                                <div>
                                    <h3 className="text-lg font-bold leading-tight text-[#181116] dark:text-[#f8f6f7]">{nextParty.title}</h3>
                                    <div className="mt-1 flex items-center gap-1 text-sm text-[#89617c] dark:text-[#dcbcd1]">
                                        <span className="material-symbols-outlined text-base">calendar_month</span>
                                        <span>{new Date(nextParty.event_date + 'T00:00:00').toLocaleDateString('pt-BR')} às {nextParty.event_time.substring(0, 5)}</span>
                                    </div>
                                </div>
                                <button className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#ee2bad] text-white shadow-lg shadow-[#ee2bad]/30 active:translate-y-0.5 transition-all">
                                    <span className="material-symbols-outlined">arrow_forward</span>
                                </button>
                            </div>
                            <div className="flex items-center gap-2 pt-1">
                                <div className="flex items-center gap-1.5 rounded-lg bg-gray-100 dark:bg-white/5 px-2.5 py-1.5">
                                    <span className="material-symbols-outlined text-sm text-gray-500">location_on</span>
                                    <span className="text-xs font-medium text-[#181116] dark:text-[#f8f6f7] truncate max-w-[150px]">{nextParty.description || 'Local não definido'}</span>
                                </div>
                            </div>
                        </div>
                    </Link>
                ) : (
                    <div className="rounded-2xl bg-white dark:bg-[#2d1b27] p-8 text-center shadow-sm ring-1 ring-black/5 dark:ring-white/5">
                        <p className="text-[#89617c] dark:text-[#dcbcd1]">Nenhuma festa agendada.</p>
                        <Link to="/admin/new-party" className="mt-4 inline-block text-[#ee2bad] font-bold">Agendar agora</Link>
                    </div>
                )}
            </section>

            {/* Quick Actions Grid */}
            <section className="pb-6">
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
            <section className="pb-6">
                <div className="flex items-center justify-between pb-3">
                    <h2 className="text-xl font-bold tracking-tight text-[#181116] dark:text-[#f8f6f7]">Fluxo de Caixa</h2>
                    <Link to="/admin/finance" className="text-xs font-bold text-[#ee2bad] hover:text-[#c91a8e]">Ver detalhes</Link>
                </div>
                <div className="rounded-2xl bg-white dark:bg-[#2d1b27] p-5 shadow-sm ring-1 ring-black/5 dark:ring-white/5">
                    <div className="flex justify-between items-end mb-4">
                        <div>
                            <p className="text-xs text-[#89617c] dark:text-[#dcbcd1] mb-1">Saldo Atual ({new Date().toLocaleDateString('pt-BR', { month: 'long' })})</p>
                            <h3 className="text-2xl font-bold text-[#181116] dark:text-[#f8f6f7]">R$ {finance.balance.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</h3>
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="relative overflow-hidden rounded-xl bg-[#f8f6f7] dark:bg-white/5 p-3">
                            <div className="relative z-10">
                                <div className="flex items-center gap-2 mb-2">
                                    <div className="h-2 w-2 rounded-full bg-green-500"></div>
                                    <span className="text-xs font-medium text-[#89617c] dark:text-[#dcbcd1]">Entradas</span>
                                </div>
                                <p className="text-sm font-bold text-[#181116] dark:text-[#f8f6f7]">R$ {finance.income.toLocaleString('pt-BR')}</p>
                            </div>
                            <span className="material-symbols-outlined absolute -bottom-2 -right-2 text-4xl text-green-500/10 rotate-12">savings</span>
                        </div>
                        <div className="relative overflow-hidden rounded-xl bg-[#f8f6f7] dark:bg-white/5 p-3">
                            <div className="relative z-10">
                                <div className="flex items-center gap-2 mb-2">
                                    <div className="h-2 w-2 rounded-full bg-red-500"></div>
                                    <span className="text-xs font-medium text-[#89617c] dark:text-[#dcbcd1]">Saídas</span>
                                </div>
                                <p className="text-sm font-bold text-[#181116] dark:text-[#f8f6f7]">R$ {finance.expenses.toLocaleString('pt-BR')}</p>
                            </div>
                            <span className="material-symbols-outlined absolute -bottom-2 -right-2 text-4xl text-red-500/10 rotate-12">payments</span>
                        </div>
                    </div>
                </div>
            </section>

            {/* Birthdays Carousel */}
            <section className="pb-6">
                <h2 className="text-xl font-bold tracking-tight text-[#181116] dark:text-[#f8f6f7] mb-3">Aniversariantes do Mês</h2>
                <div className="flex gap-4 overflow-x-auto no-scrollbar py-2">
                    {birthdays.length > 0 ? birthdays.map((client) => (
                        <Link key={client.id} to={`/admin/clients`} className="flex flex-col items-center gap-2 min-w-[72px]">
                            <div className="relative h-16 w-16 rounded-full p-0.5 bg-gradient-to-tr from-[#ee2bad] to-orange-400">
                                <div className="h-full w-full rounded-full border-2 border-white dark:border-[#2d1b27] bg-gray-200 flex items-center justify-center">
                                    <span className="material-symbols-outlined text-gray-400">person</span>
                                </div>
                                <div className="absolute bottom-0 right-0 rounded-full bg-white dark:bg-[#2d1b27] px-1.5 py-0.5 text-[10px] font-bold shadow-sm ring-1 ring-black/5">
                                    {new Date(client.birthday).getUTCDate()}
                                </div>
                            </div>
                            <span className="text-xs font-medium text-[#181116] dark:text-[#f8f6f7] truncate w-full text-center">{client.name.split(' ')[0]}</span>
                        </Link>
                    )) : (
                        <p className="text-sm text-[#89617c] dark:text-[#dcbcd1] px-2">Nenhum aniversariante este mês.</p>
                    )}
                </div>
            </section>
        </AdminLayout>
    );
};

export default DashboardScreen;
