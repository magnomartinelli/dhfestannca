import React from 'react';
import { useRegisterSW } from 'virtual:pwa-register/react';
import { RefreshCw, X } from 'lucide-react';

const ReloadPrompt: React.FC = () => {
    const {
        offlineReady: [offlineReady, setOfflineReady],
        needRefresh: [needRefresh, setNeedRefresh],
        updateServiceWorker,
    } = useRegisterSW({
        onRegistered(r) {
            console.log('SW Registered: ' + r);
        },
        onRegisterError(error) {
            console.log('SW registration error', error);
        },
    });

    const close = () => {
        setOfflineReady(false);
        setNeedRefresh(false);
    };

    if (!offlineReady && !needRefresh) return null;

    return (
        <div className="fixed bottom-4 right-4 p-4 bg-white rounded-lg shadow-lg border border-gray-200 z-50 flex flex-col gap-2 max-w-sm animate-in fade-in slide-in-from-bottom-4">
            <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                    <h3 className="font-semibold text-gray-900">
                        {offlineReady ? 'Aplicativo pronto' : 'Nova versão disponível'}
                    </h3>
                    <p className="text-sm text-gray-600 mt-1">
                        {offlineReady
                            ? 'O aplicativo está pronto para uso offline.'
                            : 'Clique em atualizar para carregar a nova versão.'}
                    </p>
                </div>
                <button
                    onClick={close}
                    className="text-gray-400 hover:text-gray-600 transition-colors"
                    aria-label="Fechar"
                >
                    <X size={18} />
                </button>
            </div>

            {needRefresh && (
                <button
                    onClick={() => updateServiceWorker(true)}
                    className="flex items-center justify-center gap-2 w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-md text-sm font-medium transition-colors"
                >
                    <RefreshCw size={16} />
                    Atualizar agora
                </button>
            )}
        </div>
    );
};

export default ReloadPrompt;
