import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'motion/react';
import { Home, ArrowLeft, RefreshCw, Terminal, ShieldAlert, Lock, Compass } from 'lucide-react';

interface ErrorPageProps {
  statusCode?: string | number;
  title?: string;
  message?: string;
}

export default function ErrorPage({
  statusCode = '404',
  title = 'Página não encontrada',
  message = 'A página que você tentou acessar não foi localizada, foi removida ou está temporariamente indisponível no sistema.'
}: ErrorPageProps) {
  const navigate = useNavigate();
  const location = useLocation();

  // Permite receber dados de erro passados via route state
  const state = location.state as { statusCode?: string; title?: string; message?: string } | null;
  const currentStatus = state?.statusCode || statusCode;
  const currentTitle = state?.title || title;
  const currentMessage = state?.message || message;

  return (
    <div className="min-h-screen bg-[#030712] text-white flex flex-col items-center justify-center relative overflow-hidden px-4 py-12 select-none">
      {/* Background radial glow inspired by Cyber Blue Shield */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-sky-500/10 rounded-full blur-[130px] -z-10 pointer-events-none" />
      <div className="absolute top-1/4 left-1/3 w-80 h-80 bg-blue-600/15 rounded-full blur-3xl -z-10 pointer-events-none animate-pulse" />
      <div className="absolute bottom-1/4 right-1/3 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl -z-10 pointer-events-none animate-pulse" />

      {/* Grid Pattern Overlay */}
      <div 
        className="absolute inset-0 opacity-[0.03] pointer-events-none -z-10" 
        style={{
          backgroundImage: 'radial-gradient(rgba(255, 255, 255, 0.4) 1px, transparent 1px)',
          backgroundSize: '32px 32px'
        }}
      />

      <div className="max-w-xl w-full text-center space-y-8 z-10">
        
        {/* Animated Cyber Lock Graphic - Inspirado na Imagem de Referência */}
        <div className="flex justify-center relative my-2">
          <div className="relative w-48 h-48 md:w-56 md:h-56 flex items-center justify-center">
            
            {/* Outer Glowing Concentric Ring */}
            <div className="absolute inset-0 rounded-full border border-sky-500/20 shadow-[0_0_40px_rgba(14,165,233,0.15)]" />

            {/* Rotating Dotted / Dashed Outer Circle */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 25, ease: 'linear' }}
              className="absolute inset-2 rounded-full border border-dashed border-sky-400/30"
            />

            {/* Rotating Segmented Tech Circle (Counter Clockwise) */}
            <motion.div
              animate={{ rotate: -360 }}
              transition={{ repeat: Infinity, duration: 18, ease: 'linear' }}
              className="absolute inset-6 rounded-full border-2 border-t-sky-400 border-r-transparent border-b-cyan-500/40 border-l-transparent opacity-80"
            />

            {/* Inner Circular Reticle */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 12, ease: 'linear' }}
              className="absolute inset-10 rounded-full border border-blue-500/40 border-t-cyan-300"
            />

            {/* Center Glowing Hub with Padlock */}
            <motion.div 
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: 'spring', stiffness: 140, damping: 14 }}
              className="relative w-24 h-24 md:w-28 md:h-28 rounded-full bg-gradient-to-b from-sky-500/20 via-[#0a192f] to-[#030712] border-2 border-sky-400/60 shadow-[0_0_30px_rgba(56,189,248,0.4)] flex items-center justify-center z-10"
            >
              <div className="absolute inset-0 rounded-full bg-sky-400/10 animate-ping duration-3000 pointer-events-none" />
              
              {/* Central Glowing Lock Icon */}
              <div className="relative flex flex-col items-center justify-center">
                <Lock className="w-10 h-10 md:w-12 md:h-12 text-sky-400 drop-shadow-[0_0_12px_rgba(56,189,248,0.8)]" />
                <div className="w-1.5 h-1.5 rounded-full bg-cyan-300 shadow-[0_0_8px_#38bdf8] mt-1" />
              </div>
            </motion.div>

            {/* Radar Sweep Effect */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 4, ease: 'linear' }}
              className="absolute inset-0 rounded-full pointer-events-none"
              style={{
                background: 'conic-gradient(from 0deg, transparent 0deg, transparent 270deg, rgba(56, 189, 248, 0.15) 360deg)'
              }}
            />
          </div>
        </div>

        {/* Text & Details */}
        <div className="space-y-3">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-sky-500/10 border border-sky-500/30 text-sky-400 text-xs font-mono font-semibold uppercase tracking-wider"
          >
            <ShieldAlert className="w-3.5 h-3.5" />
            <span>Erro {currentStatus} • Sistema Seguro</span>
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-3xl md:text-5xl font-black font-sans tracking-tight text-white"
          >
            {currentTitle}
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-slate-400 text-sm md:text-base max-w-md mx-auto leading-relaxed"
          >
            {currentMessage}
          </motion.p>
        </div>

        {/* Diagnostic Terminal Card */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-[#0b0f19]/90 border border-slate-800 rounded-2xl p-4 text-left font-mono text-xs text-slate-300 shadow-2xl backdrop-blur-md"
        >
          <div className="flex items-center justify-between border-b border-white/5 pb-2 mb-3 text-slate-500 text-[11px]">
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
              <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
              <span className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
              <span className="ml-2 font-semibold text-slate-400">audit_monitor.log</span>
            </div>
            <span className="text-sky-400/80">DevSecOps Protection</span>
          </div>

          <div className="space-y-1.5 font-mono text-[11px] md:text-xs">
            <p className="text-slate-500">
              # Rota solicitada: <span className="text-sky-300 font-bold">{location.pathname}</span>
            </p>
            <p className="text-red-400">
              [ALERTA] Código de status: {currentStatus} (Recurso não encontrado no servidor)
            </p>
            <p className="text-slate-400">
              [STATUS] Integridade do sistema: <span className="text-emerald-400 font-bold">100% SEGURO</span>
            </p>
            <div className="flex items-center gap-1 pt-1 text-slate-400">
              <span className="text-sky-400 font-bold">gustavosouza@portfolio:~$</span>
              <motion.span 
                animate={{ opacity: [1, 0, 1] }} 
                transition={{ repeat: Infinity, duration: 1 }}
                className="w-2 h-3.5 bg-sky-400 inline-block align-middle"
              />
            </div>
          </div>
        </motion.div>

        {/* Action Buttons */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="flex flex-col sm:flex-row gap-3 justify-center items-center pt-2"
        >
          {/* Botão Principal Solicitado: Voltar para a página de início */}
          <button
            onClick={() => navigate('/')}
            className="w-full sm:w-auto px-7 py-3.5 bg-gradient-to-r from-sky-500 via-brand-primary to-blue-600 hover:from-sky-400 hover:via-brand-primary hover:to-blue-500 text-white font-bold rounded-2xl text-sm shadow-xl shadow-sky-500/25 hover:shadow-sky-500/40 hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2.5 cursor-pointer group"
          >
            <Home className="w-4 h-4 group-hover:-translate-y-0.5 transition-transform" />
            <span>Voltar para a página de início</span>
          </button>
          
          {/* Botão Secundário: Voltar à página anterior */}
          <button
            onClick={() => navigate(-1)}
            className="w-full sm:w-auto px-6 py-3.5 bg-slate-900/90 border border-slate-700/80 hover:bg-slate-800 text-slate-300 hover:text-white font-medium rounded-2xl text-sm transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Página anterior</span>
          </button>

          {/* Botão Terciário: Recarregar */}
          <button
            onClick={() => window.location.reload()}
            className="w-full sm:w-auto px-4 py-3.5 bg-slate-900/60 border border-slate-800 hover:bg-slate-800/80 text-slate-400 hover:text-slate-200 rounded-2xl text-sm transition-all flex items-center justify-center gap-2 cursor-pointer"
            title="Recarregar página"
          >
            <RefreshCw className="w-4 h-4" />
            <span className="sm:hidden">Recarregar</span>
          </button>
        </motion.div>

        {/* Rodapé informativo sutil */}
        <p className="text-xs text-slate-500 pt-4">
          Gustavo Souza • Portfólio de Engenharia de Software, Mobile & DevSecOps
        </p>

      </div>
    </div>
  );
}
