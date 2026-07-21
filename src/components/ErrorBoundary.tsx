import React, { Component, ErrorInfo, ReactNode } from 'react';
import { logCriticalError } from '../services/loggerService';
import { AlertTriangle, RefreshCw, ShieldAlert, Home } from 'lucide-react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
  isReporting: boolean;
  reportId: string | null;
}

export default class ErrorBoundary extends React.Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
    errorInfo: null,
    isReporting: false,
    reportId: null
  };

  public static getDerivedStateFromError(error: Error): Partial<State> {
    // Update state so the next render will show the fallback UI.
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    this.setState({ errorInfo, isReporting: true });
    
    // Log the error using our modular loggerService
    logCriticalError(error, errorInfo)
      .then((id) => {
        this.setState({ isReporting: false, reportId: id });
      })
      .catch((err) => {
        console.error('Falha interna no ErrorBoundary:', err);
        this.setState({ isReporting: false });
      });
  }

  private handleReload = () => {
    window.location.reload();
  };

  private handleGoHome = () => {
    window.location.href = '/';
  };

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-[#030712] text-slate-100 flex flex-col items-center justify-center p-6 font-sans">
          <div className="max-w-xl w-full bg-[#111827] border border-red-500/10 rounded-2xl p-8 space-y-6 shadow-2xl relative overflow-hidden">
            {/* Ambient Red glow effect */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-red-500/5 rounded-full blur-2xl pointer-events-none" />
            
            {/* Header Icon */}
            <div className="flex items-center gap-4">
              <div className="p-3 bg-red-500/10 text-red-400 rounded-2xl border border-red-500/20">
                <AlertTriangle className="w-8 h-8 animate-pulse" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-white">Ops! Algo deu errado</h1>
                <p className="text-xs text-slate-400 mt-0.5">O sistema AppSec capturou um erro crítico de execução</p>
              </div>
            </div>

            <p className="text-sm text-slate-300 leading-relaxed">
              Desculpe o inconveniente. Para manter a segurança e a integridade da plataforma do Gustavo Souza, o erro foi catalogado e enviado ao painel de administração em tempo real.
            </p>

            {/* Error Message Collapse */}
            <div className="bg-[#030712] border border-white/5 rounded-xl p-4 space-y-2">
              <div className="flex items-center justify-between text-xs text-slate-400 font-mono">
                <span className="flex items-center gap-1.5 text-red-400">
                  <ShieldAlert className="w-3.5 h-3.5" />
                  DETALHES DO ERRO
                </span>
                {this.state.reportId && (
                  <span className="text-[10px] text-slate-500 bg-white/5 px-2 py-0.5 rounded-md">
                    Ref: {this.state.reportId}
                  </span>
                )}
              </div>
              <p className="text-xs font-mono text-slate-300 select-all overflow-x-auto whitespace-pre-wrap max-h-32">
                {this.state.error?.name}: {this.state.error?.message}
              </p>
              {this.state.isReporting && (
                <p className="text-[10px] text-brand-primary animate-pulse font-mono">
                  Transmitindo relatório de diagnóstico para o Firestore...
                </p>
              )}
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <button
                onClick={this.handleReload}
                className="flex-1 flex items-center justify-center gap-2 px-5 py-3 bg-brand-primary hover:bg-brand-primary/80 text-white rounded-xl text-sm font-bold transition-all shadow-lg shadow-brand-primary/10"
              >
                <RefreshCw className="w-4 h-4" />
                <span>Recarregar Página</span>
              </button>
              <button
                onClick={this.handleGoHome}
                className="flex-1 flex items-center justify-center gap-2 px-5 py-3 bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white rounded-xl text-sm transition-all border border-white/5"
              >
                <Home className="w-4 h-4" />
                <span>Voltar ao Início</span>
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
