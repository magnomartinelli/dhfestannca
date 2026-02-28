import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';

const LoginScreen = () => {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const [loading, setLoading] = useState(false);
    const [isResetting, setIsResetting] = useState(false);
    const [resetSuccess, setResetSuccess] = useState(false);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const { error } = await supabase.auth.signInWithPassword({
                email: username, // Assuming username is email for now
                password: password,
            });

            if (error) throw error;

            navigate('/admin/dashboard');
        } catch (err: any) {
            setError(err.message || 'Erro ao fazer login. Verifique suas credenciais.');
        } finally {
            setLoading(false);
        }
    };

    const handleResetPassword = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!username) {
            setError('Por favor, preencha o campo Usuário com o seu e-mail para recuperar a senha.');
            return;
        }

        setLoading(true);
        setError('');
        setResetSuccess(false);

        try {
            const { error } = await supabase.auth.resetPasswordForEmail(username, {
                redirectTo: `${window.location.origin}/admin/settings`,
            });

            if (error) throw error;

            setResetSuccess(true);
        } catch (err: any) {
            setError(err.message || 'Erro ao enviar e-mail de recuperação.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="relative flex min-h-screen w-full flex-col justify-center overflow-hidden max-w-md mx-auto bg-[#f8f6f7] dark:bg-[#22101c] shadow-2xl font-['Plus_Jakarta_Sans'] px-6">
            <div className="flex flex-col items-center mb-10">
                <div className="bg-[#ee2bad]/10 p-4 rounded-full mb-4">
                    <span className="material-symbols-outlined text-[#ee2bad] text-5xl">lock</span>
                </div>
                <h1 className="text-3xl font-extrabold text-[#181116] dark:text-white tracking-tight">Acesso Administrativo</h1>
                <p className="text-[#89617c] dark:text-[#dcbcd1] mt-2 text-center font-medium">Insira suas credenciais para gerenciar o Universo dhFestannça</p>
            </div>

            <form onSubmit={isResetting ? handleResetPassword : handleLogin} className="flex flex-col gap-5">
                <div className="flex flex-col gap-2">
                    <label className="text-sm font-bold text-[#181116] dark:text-white ml-2">Usuário</label>
                    <div className="relative flex items-center">
                        <input
                            type="email"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="w-full bg-white dark:bg-[#2d1b27] border-0 ring-1 ring-zinc-200 dark:ring-white/10 rounded-full py-4 pl-12 pr-4 text-zinc-900 dark:text-white placeholder-zinc-400 focus:ring-2 focus:ring-[#ee2bad] focus:outline-none transition-shadow shadow-sm"
                            placeholder="Seu usuário"
                        />
                        <span className="material-symbols-outlined absolute left-4 text-[#ee2bad] text-[22px]">person</span>
                    </div>
                </div>

                {!isResetting && (
                    <div className="flex flex-col gap-2">
                        <div className="flex justify-between items-center ml-2">
                            <label className="text-sm font-bold text-[#181116] dark:text-white">Senha</label>
                            <button
                                type="button"
                                onClick={() => { setIsResetting(true); setError(''); setResetSuccess(false); }}
                                className="text-xs font-bold text-[#ee2bad] hover:underline"
                            >
                                Esqueceu a senha?
                            </button>
                        </div>
                        <div className="relative flex items-center">
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full bg-white dark:bg-[#2d1b27] border-0 ring-1 ring-zinc-200 dark:ring-white/10 rounded-full py-4 pl-12 pr-4 text-zinc-900 dark:text-white placeholder-zinc-400 focus:ring-2 focus:ring-[#ee2bad] focus:outline-none transition-shadow shadow-sm"
                                placeholder="Sua senha"
                            />
                            <span className="material-symbols-outlined absolute left-4 text-[#ee2bad] text-[22px]">key</span>
                        </div>
                    </div>
                )}

                {error && (
                    <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl p-3 flex items-center gap-2">
                        <span className="material-symbols-outlined text-red-500 text-sm">error</span>
                        <p className="text-red-600 dark:text-red-400 text-xs font-bold">{error}</p>
                    </div>
                )}

                {resetSuccess && (
                    <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-xl p-3 flex items-center gap-2">
                        <span className="material-symbols-outlined text-green-500 text-sm">check_circle</span>
                        <p className="text-green-600 dark:text-green-400 text-xs font-bold">E-mail de recuperação enviado! Verifique sua caixa de entrada.</p>
                    </div>
                )}

                <button
                    type="submit"
                    disabled={loading}
                    className="mt-4 w-full bg-[#ee2bad] hover:bg-[#ee2bad]/90 text-white font-bold text-lg py-4 px-8 rounded-full shadow-lg shadow-[#ee2bad]/30 flex items-center justify-center gap-2 transform active:scale-95 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    <span>{loading ? 'Aguarde...' : (isResetting ? 'Enviar link de recuperação' : 'Entrar')}</span>
                    {!loading && <span className="material-symbols-outlined">{isResetting ? 'send' : 'login'}</span>}
                </button>

                {isResetting && (
                    <button
                        type="button"
                        onClick={() => { setIsResetting(false); setError(''); setResetSuccess(false); }}
                        className="w-full mt-2 font-bold text-sm text-[#89617c] dark:text-[#dcbcd1] hover:text-[#181116] dark:hover:text-white transition-colors"
                    >
                        Voltar ao login
                    </button>
                )}
            </form>

            <button
                onClick={() => navigate('/admin')}
                className="mt-8 text-[#89617c] dark:text-[#dcbcd1] hover:text-[#ee2bad] text-sm font-bold flex items-center justify-center gap-1 transition-colors"
            >
                <span className="material-symbols-outlined text-[18px]">arrow_back</span>
                <span>Voltar</span>
            </button>
        </div>
    );
};

export default LoginScreen;
