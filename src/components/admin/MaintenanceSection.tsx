import React, { useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { 
  Wrench, 
  Trash2, 
  RefreshCw, 
  AlertTriangle, 
  CheckCircle2, 
  Loader2, 
  Database,
  Shield,
  ArrowRight
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function MaintenanceSection() {
  const queryClient = useQueryClient();
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [statusMessage, setStatusMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [showConfirm, setShowConfirm] = useState<'cache' | 'refresh' | null>(null);

  const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

  const handleClearCache = async () => {
    setShowConfirm(null);
    setLoading(true);
    setProgress(10);
    setSuccessMessage(null);
    
    try {
      // Step 1: Cache Storage
      setStatusMessage('Limpando Cache Storage...');
      await delay(400);
      setProgress(30);
      if (window.caches) {
        const cacheNames = await window.caches.keys();
        for (const name of cacheNames) {
          await window.caches.delete(name);
        }
      }

      // Step 2: Service Worker Cache
      setStatusMessage('Removendo registros de Service Worker...');
      await delay(400);
      setProgress(50);
      if (navigator.serviceWorker) {
        const registrations = await navigator.serviceWorker.getRegistrations();
        for (const registration of registrations) {
          await registration.unregister();
        }
      }

      // Step 3: LocalStorage utilizado para cache (not auth/sidebar config)
      setStatusMessage('Removendo cache temporário do LocalStorage...');
      await delay(400);
      setProgress(70);
      const keysToKeep = ['petinho_session', 'sidebarOpen'];
      for (let i = localStorage.length - 1; i >= 0; i--) {
        const key = localStorage.key(i);
        if (key && !keysToKeep.includes(key)) {
          localStorage.removeItem(key);
        }
      }

      // Step 4: SessionStorage temporário
      setStatusMessage('Limpando SessionStorage temporário...');
      await delay(300);
      setProgress(85);
      sessionStorage.clear();

      // Step 5: IndexedDB utilizado para cache (safely checking dbs)
      setStatusMessage('Limpando cache IndexedDB...');
      await delay(400);
      setProgress(95);
      if (window.indexedDB && window.indexedDB.databases) {
        try {
          const dbs = await window.indexedDB.databases();
          for (const dbInfo of dbs) {
            // Keep persistent DBs if any explicitly named persistent, but clear general ones
            const name = dbInfo.name;
            if (name && !name.includes('persistent') && !name.includes('users') && !name.includes('posts') && !name.includes('projects')) {
              window.indexedDB.deleteDatabase(name);
            }
          }
        } catch (e) {
          console.warn('Falha segura ao listar IndexedDB:', e);
        }
      }

      setProgress(100);
      setStatusMessage('Limpeza concluída com sucesso!');
      setSuccessMessage('Cache local limpo com sucesso! A aplicação será recarregada...');
      await delay(1500);
      window.location.reload();
    } catch (error: any) {
      console.error(error);
      alert('Erro ao limpar cache local: ' + (error.message || 'Desconhecido'));
    } finally {
      setLoading(false);
    }
  };

  const handleRefreshData = async () => {
    setShowConfirm(null);
    setLoading(true);
    setProgress(15);
    setSuccessMessage(null);
    setStatusMessage('Iniciando sincronização forçada com o Firestore...');

    try {
      await delay(300);
      setProgress(40);
      setStatusMessage('Invalidando cache do React Query...');
      
      // Invalidate all react-query queries to trigger refetching
      await queryClient.invalidateQueries();
      
      await delay(400);
      setProgress(70);
      setStatusMessage('Buscando dados atualizados do servidor...');
      
      // Force actual refetches of queries in the background
      await queryClient.refetchQueries();

      await delay(400);
      setProgress(100);
      setStatusMessage('Sincronização com o Firestore concluída!');
      setSuccessMessage('Todos os dados foram atualizados diretamente do servidor com sucesso!');
      await delay(2000);
      setSuccessMessage(null);
    } catch (error: any) {
      console.error(error);
      alert('Erro ao atualizar dados: ' + (error.message || 'Desconhecido'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-[#111827] border border-white/5 rounded-2xl p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="p-2.5 bg-brand-primary/10 text-brand-primary rounded-xl border border-brand-primary/10">
          <Wrench className="w-6 h-6 animate-pulse text-brand-primary" />
        </div>
        <div>
          <h2 className="text-lg font-bold text-white font-sans">Manutenção da Aplicação</h2>
          <p className="text-xs text-slate-400">Gerenciamento de cache do cliente, service workers e sincronização com o banco de dados</p>
        </div>
      </div>

      {/* Warning Alert Banner */}
      <div className="p-3.5 bg-amber-500/10 border border-amber-500/20 rounded-xl flex items-start gap-3">
        <AlertTriangle className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
        <div className="space-y-1">
          <h4 className="text-xs font-bold text-amber-400">Salvaguarda de Integridade</h4>
          <p className="text-[11px] text-slate-400 leading-relaxed">
            Nenhuma dessas ações removerá dados persistentes como posts, projetos, usuários, configurações ou bancos de dados do servidor. Apenas dados de cache local e sessões temporárias do navegador são limpos de forma segura.
          </p>
        </div>
      </div>

      {/* Buttons and Actions */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Clear Cache Button Card */}
        <div className="bg-[#030712]/50 border border-white/5 p-5 rounded-xl space-y-4 flex flex-col justify-between">
          <div className="space-y-1">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Trash2 className="w-4 h-4 text-red-400" />
              Limpar Cache Local
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Remove Cache Storage, Service Worker registrations, cache de localStorage, sessionStorage temporário e IndexedDB de cache.
            </p>
          </div>
          <button
            onClick={() => setShowConfirm('cache')}
            disabled={loading}
            className="w-full py-2 px-4 bg-red-500/10 hover:bg-red-500 text-red-400 hover:text-white text-xs font-bold rounded-xl border border-red-500/20 hover:border-red-500/40 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>Limpar Cache Local</span>
          </button>
        </div>

        {/* Refresh Data Button Card */}
        <div className="bg-[#030712]/50 border border-white/5 p-5 rounded-xl space-y-4 flex flex-col justify-between">
          <div className="space-y-1">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <RefreshCw className="w-4 h-4 text-emerald-400" />
              Atualizar Dados
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Força uma revalidação e invalidação de todos os dados do cliente com o banco de dados Firebase Firestore para carregar informações frescas.
            </p>
          </div>
          <button
            onClick={() => setShowConfirm('refresh')}
            disabled={loading}
            className="w-full py-2 px-4 bg-emerald-500/10 hover:bg-emerald-500 text-emerald-400 hover:text-white text-xs font-bold rounded-xl border border-emerald-500/20 hover:border-emerald-500/40 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Atualizar Dados</span>
          </button>
        </div>
      </div>

      {/* Loader / Progress Indicator */}
      <AnimatePresence>
        {loading && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="space-y-3 pt-2"
          >
            <div className="flex items-center justify-between text-xs font-mono">
              <span className="text-slate-400 flex items-center gap-2">
                <Loader2 className="w-3.5 h-3.5 animate-spin text-brand-primary" />
                {statusMessage}
              </span>
              <span className="text-brand-primary font-bold">{progress}%</span>
            </div>
            
            {/* Custom Progress Bar */}
            <div className="w-full h-2 bg-[#030712] rounded-full overflow-hidden border border-white/5">
              <motion.div 
                className="h-full bg-gradient-to-r from-brand-primary to-emerald-500"
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.1 }}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Success Banner */}
      <AnimatePresence>
        {successMessage && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-xl flex items-start gap-3"
          >
            <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
            <div className="space-y-1">
              <h4 className="text-xs font-bold text-emerald-400">Ação Concluída com Sucesso</h4>
              <p className="text-[11px] text-slate-300 leading-relaxed">{successMessage}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Confirmation Overlay / Modal Dialog */}
      <AnimatePresence>
        {showConfirm && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              className="bg-[#111827] border border-white/10 p-6 rounded-2xl max-w-sm w-full space-y-6 shadow-2xl"
            >
              <div className="space-y-3">
                <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center">
                  <AlertTriangle className="w-6 h-6 text-amber-500" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white font-sans">
                    Confirmar Procedimento
                  </h3>
                  <p className="text-xs text-slate-400 mt-1.5 leading-relaxed">
                    {showConfirm === 'cache' ? (
                      'Tem certeza de que deseja limpar o cache local? Seus arquivos de sessões persistentes e posts/projetos continuarão intactos, mas a aplicação precisará recarregar por completo para reconstruir os recursos estáticos.'
                    ) : (
                      'Deseja forçar a atualização imediata dos dados? Isso revalidará todas as consultas locais consultando diretamente os servidores do Firebase Firestore, garantindo sincronização total.'
                    )}
                  </p>
                </div>
              </div>

              <div className="flex gap-3 justify-end pt-2 text-xs font-semibold">
                <button
                  onClick={() => setShowConfirm(null)}
                  className="px-4 py-2 bg-[#030712] border border-white/5 hover:bg-white/5 text-slate-300 rounded-xl transition-colors cursor-pointer"
                >
                  Cancelar
                </button>
                <button
                  onClick={showConfirm === 'cache' ? handleClearCache : handleRefreshData}
                  className={`px-4 py-2 text-white rounded-xl transition-colors cursor-pointer flex items-center gap-1.5 ${
                    showConfirm === 'cache' 
                      ? 'bg-red-500 hover:bg-red-600' 
                      : 'bg-emerald-500 hover:bg-emerald-600'
                  }`}
                >
                  <span>Executar</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
