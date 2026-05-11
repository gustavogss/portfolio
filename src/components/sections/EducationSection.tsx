import React from 'react';
import { motion } from 'motion/react';
import { GraduationCap } from 'lucide-react';
import { EDUCATION } from '../../constants';

export function EducationSection() {
  return (
    <div className="space-y-8" id="education-section">
      <div className="text-center md:text-left">
        <h2 className="text-3xl font-bold text-white">Formação Acadêmica</h2>
        <p className="text-slate-400 mt-1">Minha base educacional e especializações.</p>
      </div>
      
      <div className="relative space-y-8 before:absolute before:inset-0 before:ml-5 md:before:ml-6 before:-translate-x-px before:h-full before:w-0.5 before:bg-linear-to-b before:from-brand-primary/20 before:via-brand-secondary/40 before:to-transparent">
        {EDUCATION.map((edu, idx) => (
          <motion.div 
            key={`${edu.institution}-${idx}`}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="relative pl-12 md:pl-16 group"
          >
            <div className="absolute left-0 top-1 w-10 h-10 md:w-12 md:h-12 rounded-full border border-slate-800 bg-slate-950 flex items-center justify-center text-brand-primary group-hover:bg-brand-primary/10 group-hover:border-brand-primary/50 transition-all z-10">
              <GraduationCap className="w-5 h-5 md:w-6 h-6" />
            </div>

            <div className="glass-morphism p-6 rounded-3xl group-hover:border-brand-primary/20 transition-all flex flex-col md:flex-row justify-between gap-4">
              <div className="flex flex-col items-center md:items-start text-center md:text-left">
                <h3 className="text-xl font-bold text-white group-hover:text-brand-primary transition-colors">
                  {edu.degree} {(edu.period?.includes('2026') || edu.period?.toLowerCase().includes('presente')) && <span className="text-[10px] text-brand-primary font-bold">(Em formação)</span>}
                </h3>
                <p className="text-brand-secondary font-medium">{edu.institution}</p>
                <p className="text-slate-400 text-sm leading-relaxed mt-4">{edu.description}</p>
              </div>
              <div className="flex flex-col items-center md:items-end justify-start">
                <span className="px-4 py-1.5 bg-slate-800 text-brand-primary text-xs font-bold rounded-full border border-slate-700 whitespace-nowrap">
                  {edu.period}
                </span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
