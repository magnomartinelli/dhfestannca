import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const LoginScreen = () => {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        if (username === 'admin' && password === 'admin') {
            navigate('/admin/dashboard');
        } else {
            setError('Credenciais inválidas. Tente novamente.');
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

            <form onSubmit={handleLogin} className="flex flex-col gap-5">
                <div className="flex flex-col gap-2">
                    <label className="text-sm font-bold text-[#181116] dark:text-white ml-2">Usuário</label>
                    <div className="relative flex items-center">
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="w-full bg-white dark:bg-[#2d1b27] border-0 ring-1 ring-zinc-200 dark:ring-white/10 rounded-full py-4 pl-12 pr-4 text-zinc-900 dark:text-white placeholder-zinc-400 focus:ring-2 focus:ring-[#ee2bad] focus:outline-none transition-shadow shadow-sm"
                            placeholder="Seu usuário"
                        />
                        <span className="material-symbols-outlined absolute left-4 text-[#ee2bad] text-[22px]">person</span>
                    </div>
                </div>

                <div className="flex flex-col gap-2">
                    <label className="text-sm font-bold text-[#181116] dark:text-white ml-2">Senha</label>
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

                {error && (
                    <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl p-3 flex items-center gap-2">
                        <span className="material-symbols-outlined text-red-500 text-sm">error</span>
                        <p className="text-red-600 dark:text-red-400 text-xs font-bold">{error}</p>
                    </div>
                )}

                <button
                    type="submit"
                    className="mt-4 w-full bg-[#ee2bad] hover:bg-[#ee2bad]/90 text-white font-bold text-lg py-4 px-8 rounded-full shadow-lg shadow-[#ee2bad]/30 flex items-center justify-center gap-2 transform active:scale-95 transition-all"
                >
                    <span>Entrar</span>
                    <span className="material-symbols-outlined">login</span>
                </button>
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
