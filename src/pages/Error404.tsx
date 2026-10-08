import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'motion/react';
import { ShieldAlert, ArrowLeft, Home } from 'lucide-react';

export default function Error404() {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div className="min-h-screen bg-[#030712] text-white flex flex-col items-center justify-center relative overflow-hidden px-4 select-none">
      {/* Decorative background glowing shapes */}
      <div className="absolute top-1/4 left-1/4 w-80 h-80 bg-brand-primary/10 rounded-full blur-3xl -z-10 animate-pulse duration-4000" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl -z-10 animate-pulse duration-3000" />

      <div className="max-w-md w-full text-center space-y-8 z-10">
        {/* Animated Icon / Illustration */}
        <div className="flex justify-center">
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: 'spring', stiffness: 120, damping: 15 }}
            className="relative"
          >
            {/* Pulsing circles */}
            <span className="absolute -inset-4 rounded-full bg-red-500/10 animate-ping duration-2000" />
            <span className="absolute -inset-8 rounded-full bg-red-500/5 animate-pulse duration-3000" />
            
            <div className="relative w-24 h-24 rounded-2xl bg-gradient-to-tr from-red-500/20 to-amber-500/20 border border-red-500/30 flex items-center justify-center shadow-lg shadow-red-500/10">
              <ShieldAlert className="w-12 h-12 text-red-500" />
            </div>
          </motion.div>
        </div>

        {/* 404 Text & Details */}
        <div className="space-y-3">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-8xl font-black font-sans tracking-tighter bg-gradient-to-r from-red-500 via-amber-500 to-brand-primary bg-clip-text text-transparent drop-shadow-sm"
          >
            404
          </motion.h1>
          
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-2xl font-bold text-white tracking-tight"
          >
            Acesso Não Autorizado / Rota Inválida
          </motion.h2>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-slate-400 text-sm max-w-sm mx-auto leading-relaxed"
          >
            O endpoint solicitado ou o recurso de rede que você tentou acessar não foi localizado ou não está disponível no servidor.
          </motion.p>
        </div>

        {/* Interactive simulated Terminal */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5 }}
          className="bg-[#0b0f19] border border-white/5 rounded-xl p-4 text-left font-mono text-xs text-emerald-400 shadow-xl"
        >
          <div className="flex items-center gap-1.5 border-b border-white/5 pb-2 mb-2">
            <span className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
            <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
            <span className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
            <span className="ml-2 text-slate-500 text-[10px]">appsec_shield.sh</span>
          </div>
          <div className="space-y-1">
            <p className="text-slate-500"># Verificando logs de auditoria de rede...</p>
            <p className="text-red-400">WARN: Rota "{location.pathname}" não mapeada no roteador.</p>
            <div className="flex items-center gap-1">
              <span className="text-brand-primary">gustavosouza@portfolio:~$</span>
              <motion.span 
                animate={{ opacity: [1, 0, 1] }} 
                transition={{ repeat: Infinity, duration: 1 }}
                className="w-2 h-3.5 bg-emerald-400 inline-block align-middle"
              />
            </div>
          </div>
        </motion.div>

        {/* Navigation Action Buttons */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="flex flex-col sm:flex-row gap-3 justify-center items-center pt-2"
        >
          <button
            onClick={() => navigate('/')}
            className="w-full sm:w-auto px-6 py-3 bg-gradient-to-r from-brand-primary to-emerald-500 hover:from-brand-primary/95 hover:to-emerald-500/95 text-white font-semibold rounded-xl text-sm shadow-lg shadow-brand-primary/10 hover:shadow-brand-primary/20 transition-all flex items-center justify-center gap-2 cursor-pointer group"
          >
            <Home className="w-4 h-4 group-hover:scale-110 transition-transform" />
            <span>Voltar ao Portfólio</span>
          </button>
          
          <button
            onClick={() => navigate(-1)}
            className="w-full sm:w-auto px-6 py-3 bg-[#111827] border border-white/10 hover:bg-white/5 text-slate-300 hover:text-white font-medium rounded-xl text-sm transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Retornar</span>
          </button>
        </motion.div>
      </div>
    </div>
  );
}
