import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminLayout from '../components/AdminLayout';
import { supabase } from '../lib/supabase';

const FinanceScreen = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [stats, setStats] = useState({
        totalRevenue: 0,
        totalExpenses: 0,
        balance: 0,
    });
    const [records, setRecords] = useState<any[]>([]);
    const [showEntryModal, setShowEntryModal] = useState<'revenue' | 'expense' | 'edit' | null>(null);
    const [editingRecord, setEditingRecord] = useState<any>(null);
    const [entryData, setEntryData] = useState({
        description: '',
        amount: '',
        date: new Date().toISOString().split('T')[0]
    });

    useEffect(() => {
        fetchFinanceData();
    }, []);

    const fetchFinanceData = async () => {
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

            // Fetch all financial records
            const { data: financialRecords } = await supabase
                .from('financial_records')
                .select('*')
                .eq('client_id', clientId)
                .order('reference_date', { ascending: false });

            setRecords(financialRecords || []);

            const totalRevenue = (financialRecords || []).filter(r => r.type === 'receita').reduce((acc, r) => acc + (Number(r.amount) || 0), 0);
            const totalExpenses = (financialRecords || []).filter(r => r.type === 'despesa').reduce((acc, r) => acc + (Number(r.amount) || 0), 0);
            const balance = totalRevenue - totalExpenses;

            setStats({
                totalRevenue,
                totalExpenses,
                balance,
            });
        } catch (error) {
            console.error('Error fetching finance data:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleAddEntry = async () => {
        if (!entryData.description || !entryData.amount) {
            alert('Preencha todos os campos.');
            return;
        }

        setLoading(true);
        try {
            const { data: { user } } = await supabase.auth.getUser();
            const { data: userData } = await supabase.from('users').select('client_id').eq('id', user?.id).single();
            const clientId = userData?.client_id;

            if (showEntryModal === 'edit' && editingRecord) {
                const { error } = await supabase
                    .from('financial_records')
                    .update({
                        description: entryData.description,
                        amount: Number(entryData.amount),
                        reference_date: entryData.date
                    })
                    .eq('id', editingRecord.id);
                if (error) throw error;
            } else {
                const { error } = await supabase
                    .from('financial_records')
                    .insert({
                        client_id: clientId,
                        type: showEntryModal === 'revenue' ? 'receita' : 'despesa',
                        description: entryData.description,
                        amount: Number(entryData.amount),
                        reference_date: entryData.date
                    });
                if (error) throw error;
            }

            setShowEntryModal(null);
            setEditingRecord(null);
            setEntryData({ description: '', amount: '', date: new Date().toISOString().split('T')[0] });
            fetchFinanceData();
        } catch (error: any) {
            alert('Erro ao salvar: ' + error.message);
        } finally {
            setLoading(false);
        }
    };

    const handleDeleteRecord = async (id: string) => {
        if (!confirm('Tem certeza que deseja excluir este registro?')) return;

        try {
            const { error } = await supabase
                .from('financial_records')
                .delete()
                .eq('id', id);

            if (error) throw error;
            fetchFinanceData();
        } catch (error: any) {
            alert('Erro ao excluir: ' + error.message);
        }
    };

    const handleEditClick = (record: any) => {
        setEditingRecord(record);
        setEntryData({
            description: record.description || '',
            amount: record.amount.toString(),
            date: record.reference_date
        });
        setShowEntryModal('edit');
    };

    const formatCurrency = (value: number) => {
        return new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL',
        }).format(value);
    };

    return (
        <AdminLayout title="Fluxo de Caixa" showBackButton>
            <div className="flex w-full gap-3 overflow-x-auto py-2 pb-4 no-scrollbar">
                <button
                    onClick={() => setShowEntryModal('revenue')}
                    className="flex h-9 shrink-0 items-center justify-center gap-x-2 rounded-full bg-green-600 px-4 shadow-lg shadow-green-600/30 transition-transform active:scale-95"
                >
                    <span className="material-symbols-outlined text-white text-[18px]">add_circle</span>
                    <span className="text-sm font-semibold text-white">Receita</span>
                </button>
                <button
                    onClick={() => setShowEntryModal('expense')}
                    className="flex h-9 shrink-0 items-center justify-center gap-x-2 rounded-full bg-red-600 px-4 shadow-lg shadow-red-600/30 transition-transform active:scale-95"
                >
                    <span className="material-symbols-outlined text-white text-[18px]">remove_circle</span>
                    <span className="text-sm font-semibold text-white">Despesa</span>
                </button>
            </div>
            <main className="flex-1 space-y-6">
                <section>
                    <div className="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-[#22101c] to-[#4a233d] p-6 shadow-xl dark:border dark:border-white/10">
                        <div className="absolute -right-12 -top-12 h-40 w-40 rounded-full bg-[#ee2bad]/20 blur-2xl"></div>
                        <div className="relative z-10 flex flex-col items-center gap-1 text-center">
                            <span className="text-sm font-medium text-white/70">Saldo Atual</span>
                            <h2 className="text-4xl font-extrabold tracking-tight text-white">
                                {loading ? '...' : formatCurrency(stats.balance)}
                            </h2>
                        </div>
                        <div className="mt-6 flex gap-3">
                            <div className="flex flex-1 flex-col items-center gap-1 rounded-2xl bg-white/10 p-3 backdrop-blur-sm">
                                <div className="flex size-8 items-center justify-center rounded-full bg-[#078854]/20 text-[#4ade80]">
                                    <span className="material-symbols-outlined text-[20px]">trending_up</span>
                                </div>
                                <span className="text-xs font-medium text-white/60">Receitas</span>
                                <span className="text-lg font-bold text-white">
                                    {loading ? '...' : formatCurrency(stats.totalRevenue)}
                                </span>
                            </div>
                            <div className="flex flex-1 flex-col items-center gap-1 rounded-2xl bg-white/10 p-3 backdrop-blur-sm">
                                <div className="flex size-8 items-center justify-center rounded-full bg-red-500/20 text-red-300">
                                    <span className="material-symbols-outlined text-[20px]">trending_down</span>
                                </div>
                                <span className="text-xs font-medium text-white/60">Despesas</span>
                                <span className="text-lg font-bold text-white">
                                    {loading ? '...' : formatCurrency(stats.totalExpenses)}
                                </span>
                            </div>
                        </div>
                    </div>
                </section>

                <section>
                    <h3 className="text-lg font-bold text-[#181116] dark:text-white mb-4">Lançamentos Recentes</h3>
                    <div className="space-y-3">
                        {loading ? (
                            <div className="flex justify-center py-4">
                                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-[#ee2bad]"></div>
                            </div>
                        ) : records.length > 0 ? records.map((record) => (
                            <div key={record.id} className="flex items-center justify-between p-4 bg-white dark:bg-[#2d1b27] rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800">
                                <div className="flex items-center gap-3">
                                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${record.type === 'receita' ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}>
                                        <span className="material-symbols-outlined text-[20px]">
                                            {record.type === 'receita' ? 'trending_up' : 'trending_down'}
                                        </span>
                                    </div>
                                    <div>
                                        <p className="font-bold text-zinc-900 dark:text-white leading-tight">{record.description}</p>
                                        <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">
                                            {new Date(record.reference_date + 'T00:00:00').toLocaleDateString('pt-BR')}
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4">
                                    <p className={`font-bold ${record.type === 'receita' ? 'text-green-600' : 'text-red-600'}`}>
                                        {record.type === 'receita' ? '+' : '-'} {formatCurrency(record.amount)}
                                    </p>
                                    <div className="flex gap-1">
                                        <button onClick={() => handleEditClick(record)} className="p-1 text-[#89617c] hover:text-[#ee2bad]">
                                            <span className="material-symbols-outlined text-[18px]">edit</span>
                                        </button>
                                        <button onClick={() => handleDeleteRecord(record.id)} className="p-1 text-[#89617c] hover:text-red-500">
                                            <span className="material-symbols-outlined text-[18px]">delete</span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )) : (
                            <p className="text-center py-4 text-[#89617c]">Nenhum lançamento encontrado.</p>
                        )}
                    </div>
                </section>
            </main>

            {showEntryModal && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
                    <div className="w-full max-w-sm bg-white dark:bg-[#2d1b27] rounded-[2rem] p-6 shadow-2xl">
                        <h3 className="text-xl font-bold text-[#181116] dark:text-white mb-4">
                            {showEntryModal === 'edit' ? 'Editar Lançamento' : `Lançar ${showEntryModal === 'revenue' ? 'Receita' : 'Despesa'}`}
                        </h3>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-[#89617c] mb-1">Descrição</label>
                                <input
                                    type="text"
                                    className="w-full rounded-full border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-black/20 px-4 py-2 text-sm focus:ring-[#ee2bad]"
                                    value={entryData.description}
                                    onChange={(e) => setEntryData({ ...entryData, description: e.target.value })}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-[#89617c] mb-1">Valor (R$)</label>
                                <input
                                    type="number"
                                    className="w-full rounded-full border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-black/20 px-4 py-2 text-sm focus:ring-[#ee2bad]"
                                    value={entryData.amount}
                                    onChange={(e) => setEntryData({ ...entryData, amount: e.target.value })}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-[#89617c] mb-1">Data</label>
                                <input
                                    type="date"
                                    className="w-full rounded-full border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-black/20 px-4 py-2 text-sm focus:ring-[#ee2bad]"
                                    value={entryData.date}
                                    onChange={(e) => setEntryData({ ...entryData, date: e.target.value })}
                                />
                            </div>
                        </div>
                        <div className="mt-6 flex gap-3">
                            <button
                                onClick={() => { setShowEntryModal(null); setEditingRecord(null); }}
                                className="flex-1 rounded-full border border-gray-200 dark:border-gray-700 py-2 text-sm font-bold text-[#89617c]"
                            >
                                Cancelar
                            </button>
                            <button
                                onClick={handleAddEntry}
                                className={`flex-1 rounded-full py-2 text-sm font-bold text-white shadow-lg ${showEntryModal === 'revenue' ? 'bg-green-600 shadow-green-600/30' : 'bg-red-600 shadow-red-600/30'}`}
                            >
                                Salvar
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </AdminLayout>
    );
};

export default FinanceScreen;
