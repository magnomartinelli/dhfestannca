import React, { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { useNavigate } from 'react-router-dom';
import { Calendar, Users, PartyPopper, LogOut } from 'lucide-react';

interface Module {
    module_name: string;
}

const Dashboard: React.FC = () => {
    const [modules, setModules] = useState<string[]>([]);
    const [appointments, setAppointments] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const { data: { user } } = await supabase.auth.getUser();

                if (!user) {
                    navigate('/login');
                    return;
                }

                // Fetch modules
                const { data: modulesData, error: modulesError } = await supabase
                    .from('client_modules')
                    .select('module_name');

                if (modulesError) throw modulesError;

                if (modulesData) {
                    setModules(modulesData.map((m: Module) => m.module_name));
                }

                // Fetch appointments (example query)
                const { data: appointmentsData, error: appointmentsError } = await supabase
                    .from('appointments')
                    .select('*');

                if (appointmentsError) {
                    console.error('Error fetching appointments:', appointmentsError);
                } else {
                    setAppointments(appointmentsData || []);
                }

            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [navigate]);

    const handleLogout = async () => {
        await supabase.auth.signOut();
        navigate('/login');
    };

    if (loading) {
        return <div style={{ padding: '2rem', textAlign: 'center' }}>Carregando...</div>;
    }

    return (
        <div style={{ minHeight: '100vh', backgroundColor: '#f9fafb' }}>
            <nav style={{ backgroundColor: 'white', boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)', padding: '1rem 2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h1 style={{ fontSize: '1.25rem', fontWeight: 'bold', color: '#111827' }}>Área do Cliente</h1>
                <button onClick={handleLogout} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#4b5563', background: 'none', border: 'none', cursor: 'pointer' }}>
                    <LogOut size={18} /> Sair
                </button>
            </nav>

            <main style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem', marginBottom: '3rem' }}>
                    {modules.includes('Agenda') && (
                        <div style={{ backgroundColor: 'white', padding: '1.5rem', borderRadius: '0.5rem', boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
                                <div style={{ padding: '0.75rem', backgroundColor: '#eff6ff', borderRadius: '0.5rem', color: '#2563eb' }}>
                                    <Calendar size={24} />
                                </div>
                                <h3 style={{ fontSize: '1.125rem', fontWeight: '600', color: '#1f2937' }}>Agenda</h3>
                            </div>
                            <p style={{ color: '#6b7280' }}>Visualize seus próximos compromissos.</p>
                        </div>
                    )}

                    {modules.includes('Clientes') && (
                        <div style={{ backgroundColor: 'white', padding: '1.5rem', borderRadius: '0.5rem', boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
                                <div style={{ padding: '0.75rem', backgroundColor: '#ecfdf5', borderRadius: '0.5rem', color: '#059669' }}>
                                    <Users size={24} />
                                </div>
                                <h3 style={{ fontSize: '1.125rem', fontWeight: '600', color: '#1f2937' }}>Clientes</h3>
                            </div>
                            <p style={{ color: '#6b7280' }}>Gerencie sua lista de clientes.</p>
                        </div>
                    )}

                    {modules.includes('Eventos') && (
                        <div style={{ backgroundColor: 'white', padding: '1.5rem', borderRadius: '0.5rem', boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
                                <div style={{ padding: '0.75rem', backgroundColor: '#fdf2f8', borderRadius: '0.5rem', color: '#db2777' }}>
                                    <PartyPopper size={24} />
                                </div>
                                <h3 style={{ fontSize: '1.125rem', fontWeight: '600', color: '#1f2937' }}>Eventos</h3>
                            </div>
                            <p style={{ color: '#6b7280' }}>Organize seus eventos e festas.</p>
                        </div>
                    )}
                </div>

                <section>
                    <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1.5rem', color: '#1f2937' }}>Dados de Exemplo (Appointments)</h2>
                    <div style={{ backgroundColor: 'white', borderRadius: '0.5rem', boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)', overflow: 'hidden' }}>
                        <table style={{ width: '100%', textAlign: 'left', borderCollapse: 'collapse' }}>
                            <thead style={{ backgroundColor: '#f9fafb' }}>
                                <tr>
                                    <th style={{ padding: '0.75rem 1.5rem', fontSize: '0.75rem', fontWeight: '600', textTransform: 'uppercase', color: '#6b7280', letterSpacing: '0.05em' }}>ID</th>
                                    <th style={{ padding: '0.75rem 1.5rem', fontSize: '0.75rem', fontWeight: '600', textTransform: 'uppercase', color: '#6b7280', letterSpacing: '0.05em' }}>Data</th>
                                    <th style={{ padding: '0.75rem 1.5rem', fontSize: '0.75rem', fontWeight: '600', textTransform: 'uppercase', color: '#6b7280', letterSpacing: '0.05em' }}>Detalhes</th>
                                </tr>
                            </thead>
                            <tbody>
                                {appointments.length > 0 ? (
                                    appointments.map((apt: any) => (
                                        <tr key={apt.id} style={{ borderTop: '1px solid #e5e7eb' }}>
                                            <td style={{ padding: '1rem 1.5rem', color: '#111827' }}>{apt.id}</td>
                                            <td style={{ padding: '1rem 1.5rem', color: '#4b5563' }}>{apt.created_at || 'N/A'}</td>
                                            <td style={{ padding: '1rem 1.5rem', color: '#4b5563' }}>{JSON.stringify(apt)}</td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan={3} style={{ padding: '1rem 1.5rem', textAlign: 'center', color: '#6b7280' }}>Nenhum agendamento encontrado.</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </section>
            </main>
        </div>
    );
};

export default Dashboard;
