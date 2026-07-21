import React from 'react';
import { motion } from 'motion/react';
import { Award } from 'lucide-react';
import { usePortfolio } from '../../contexts/PortfolioContext';

export function CertificationsSection() {
  const { certifications } = usePortfolio();
  const certs = certifications || [];

  return (
    <div className="space-y-8" id="certifications-section">
      <div className="text-center md:text-left">
        <h2 className="text-3xl font-bold text-white">Certificações</h2>
        <p className="text-slate-400 mt-1">Cursos e selos de proficiência técnica.</p>
      </div>
      
      <div className="relative space-y-6 before:absolute before:inset-0 before:ml-5 md:before:ml-6 before:-translate-x-px before:h-full before:w-0.5 before:bg-linear-to-b before:from-brand-primary/20 before:via-brand-secondary/40 before:to-transparent">
        {certs.map((cert: any, idx: number) => (
          <motion.div 
            key={cert.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="relative pl-12 md:pl-16 group"
          >
            <div className="absolute left-0 top-1.5 w-10 h-10 md:w-12 md:h-12 rounded-full border border-slate-800 bg-slate-950 flex items-center justify-center text-brand-primary group-hover:bg-brand-primary/10 group-hover:border-brand-primary/50 transition-all z-10">
              <Award className="w-5 h-5 md:w-6 h-6" />
            </div>
            
            <div className="glass-morphism p-6 rounded-3xl group-hover:border-brand-primary/20 transition-all flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex flex-col items-center md:items-start text-center md:text-left w-full">
                <h3 className="text-lg font-bold text-white group-hover:text-brand-primary transition-colors">
                  {cert.name} {(cert.date?.includes('2026') || cert.date?.toLowerCase().includes('presente')) && <span className="text-[9px] text-brand-primary font-bold">(Especializando-se)</span>}
                </h3>
                <p className="text-slate-400 text-sm">{cert.issuer}</p>
              </div>
              <div className="flex flex-col items-center md:items-end justify-center">
                <span className="px-3 py-1 bg-slate-800 text-slate-300 text-xs font-bold rounded-full border border-slate-700 whitespace-nowrap">
                  {cert.date}
                </span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
