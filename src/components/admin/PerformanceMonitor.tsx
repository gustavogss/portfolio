import React from 'react';
import { useTelemetryStore } from '../../services/telemetryService';
import { 
  Zap, 
  Globe, 
  Clock, 
  Database, 
  RefreshCw, 
  CheckCircle, 
  TrendingUp,
  Activity,
  Trash2
} from 'lucide-react';
import { motion } from 'motion/react';

export default function PerformanceMonitor() {
  const { 
    networkReads, 
    networkWrites, 
    cacheHits, 
    totalTimeSaved, 
    recentLogs,
    clearTelemetry 
  } = useTelemetryStore();

  const totalReads = networkReads + cacheHits;
  const cacheHitRatio = totalReads > 0 ? Math.round((cacheHits / totalReads) * 100) : 100;

  // Format time saved elegantly
  const formatTimeSaved = (ms: number) => {
    if (ms < 1000) return `${ms}ms`;
    return `${(ms / 1000).toFixed(2)}s`;
  };

  return (
    <div className="bg-[#111827] border border-white/5 rounded-2xl p-6 space-y-6">
      
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-emerald-500/10 text-emerald-400 rounded-xl">
            <Activity className="w-6 h-6 animate-pulse" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-white">Monitor de Performance (React Query)</h2>
            <p className="text-xs text-slate-400">Status em tempo real das chamadas do Firestore</p>
          </div>
        </div>
        <button
          onClick={clearTelemetry}
          className="flex items-center gap-2 px-3 py-1.5 bg-white/5 hover:bg-red-500/10 hover:text-red-400 text-xs text-slate-300 rounded-lg transition-all border border-white/5 hover:border-red-500/20"
          title="Limpar telemetria"
        >
          <Trash2 className="w-3.5 h-3.5" />
          <span>Limpar</span>
        </button>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* Cache Hit Ratio */}
        <div className="bg-[#1f2937]/50 border border-white/5 p-4 rounded-xl flex flex-col justify-between relative overflow-hidden">
          <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-500/5 rounded-full blur-xl pointer-events-none" />
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-semibold uppercase tracking-wider">Taxa de Hit</span>
            <Zap className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="mt-4">
            <h3 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">
              {cacheHitRatio}%
            </h3>
            <div className="flex items-center gap-1.5 mt-1">
              <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <p className="text-[10px] text-slate-400">Servido do Cache</p>
            </div>
          </div>
        </div>

        {/* Network Reads Avoided */}
        <div className="bg-[#1f2937]/50 border border-white/5 p-4 rounded-xl flex flex-col justify-between relative overflow-hidden">
          <div className="absolute top-0 right-0 w-24 h-24 bg-blue-500/5 rounded-full blur-xl pointer-events-none" />
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-semibold uppercase tracking-wider">Reads Evitados</span>
            <CheckCircle className="w-4 h-4 text-blue-400" />
          </div>
          <div className="mt-4">
            <h3 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">
              {cacheHits}
            </h3>
            <p className="text-[10px] text-slate-400 mt-1">Chamadas de rede salvas</p>
          </div>
        </div>

        {/* Actual Network Reads */}
        <div className="bg-[#1f2937]/50 border border-white/5 p-4 rounded-xl flex flex-col justify-between relative overflow-hidden">
          <div className="absolute top-0 right-0 w-24 h-24 bg-amber-500/5 rounded-full blur-xl pointer-events-none" />
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-semibold uppercase tracking-wider">Leituras de Rede</span>
            <Globe className="w-4 h-4 text-amber-400" />
          </div>
          <div className="mt-4">
            <h3 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">
              {networkReads}
            </h3>
            <p className="text-[10px] text-slate-400 mt-1">Requisições Firestore reais</p>
          </div>
        </div>

        {/* Latency Saved */}
        <div className="bg-[#1f2937]/50 border border-white/5 p-4 rounded-xl flex flex-col justify-between relative overflow-hidden">
          <div className="absolute top-0 right-0 w-24 h-24 bg-purple-500/5 rounded-full blur-xl pointer-events-none" />
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-semibold uppercase tracking-wider">Tempo Economizado</span>
            <Clock className="w-4 h-4 text-purple-400" />
          </div>
          <div className="mt-4">
            <h3 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight text-brand-primary">
              {formatTimeSaved(totalTimeSaved)}
            </h3>
            <p className="text-[10px] text-slate-400 mt-1">Latência de rede poupada</p>
          </div>
        </div>

      </div>

      {/* Real-time Log Stream */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">Log de Operações Recentes</h4>
          <span className="text-[10px] text-slate-500 font-mono">Live Stream</span>
        </div>

        <div className="bg-[#030712] border border-white/5 rounded-xl overflow-hidden font-mono text-xs">
          <div className="max-h-52 overflow-y-auto divide-y divide-white/5">
            {recentLogs.length === 0 ? (
              <div className="p-4 text-center text-slate-500">
                Nenhuma chamada registrada. Navegue ou edite itens para ver os dados.
              </div>
            ) : (
              recentLogs.map((log) => (
                <div key={log.id} className="p-3 flex items-center justify-between hover:bg-white/[0.01] transition-colors">
                  <div className="flex items-center gap-3 min-w-0">
                    <span className="text-slate-500 text-[10px]">{log.timestamp}</span>
                    
                    {/* Method Tag */}
                    <span className={`px-1.5 py-0.5 rounded text-[9px] font-bold ${
                      log.type === 'WRITE' 
                        ? 'bg-purple-500/10 text-purple-400 border border-purple-500/20' 
                        : 'bg-blue-500/10 text-blue-400 border border-blue-500/20'
                    }`}>
                      {log.type}
                    </span>

                    {/* Collection */}
                    <span className="text-slate-200 font-bold truncate">
                      /{log.entity}
                    </span>
                  </div>

                  {/* Cache Status Badge */}
                  <div className="flex items-center gap-3">
                    <span className="text-slate-400 text-[10px]">
                      {log.duration > 0 ? `${log.duration}ms` : '<1ms'}
                    </span>
                    <span className={`px-1.5 py-0.5 rounded-full text-[9px] font-bold ${
                      log.cacheStatus === 'HIT'
                        ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                        : 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                    }`}>
                      {log.cacheStatus === 'HIT' ? 'CACHE HIT' : 'NETWORK'}
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

    </div>
  );
}
