import React from 'react';
import { History } from 'lucide-react';
import { usePortfolio } from '../../contexts/PortfolioContext';

export function ExperienceSection() {
  const { experiences } = usePortfolio();
  const list = experiences || [];

  return (
    <div className="space-y-8" id="experience-section">
      <div className="text-center md:text-left">
        <h2 className="text-3xl font-bold text-white">Experiência Profissional</h2>
        <p className="text-slate-400 mt-1">Minha trajetória no mercado de tecnologia.</p>
      </div>
      <div className="relative space-y-8 before:hidden md:before:block before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-linear-to-b before:from-transparent before:via-slate-800 before:to-transparent flex flex-col items-center md:items-start md:block">
        {list.map((exp: any, idx: number) => (
          <div key={`${exp.company}-${idx}`} className="relative flex flex-col md:flex-row items-center justify-center md:justify-normal md:odd:flex-row-reverse group w-full" id={`exp-item-${idx}`}>
            <div className="flex items-center justify-center w-10 h-10 mb-4 md:mb-0 rounded-full border border-slate-800 bg-slate-950 text-brand-primary relative md:absolute left-auto md:left-1/2 md:-ml-5 shadow-sm group-hover:border-brand-primary/50 transition-colors z-10">
              <History className="w-5 h-5" />
            </div>
            <div className="w-full md:w-[calc(50%-2.5rem)] glass-morphism p-6 rounded-3xl ml-0 text-center md:text-left flex flex-col items-center md:items-start">
              <div className="flex flex-col md:flex-row md:items-center justify-between mb-2 w-full">
                <h3 className="font-bold text-white text-lg">{exp.role}</h3>
                <time className="text-sm font-bold text-brand-primary mt-1 md:mt-0">{exp.period}</time>
              </div>
              <div className="text-brand-secondary font-medium mb-3">{exp.company}</div>
              <div className="text-slate-400 text-sm leading-relaxed mb-3 w-full text-left space-y-1">
                {exp.description && exp.description.includes('\n') ? (
                  exp.description.split('\n').map((line: string, lIdx: number) => {
                    if (line.trim().startsWith('-')) {
                      return (
                        <div key={lIdx} className="flex gap-2 items-start text-left">
                          <span className="text-brand-primary mt-1.5">•</span>
                          <span>{line.trim().substring(1).trim()}</span>
                        </div>
                      );
                    }
                    return <p key={lIdx} className="text-left">{line}</p>;
                  })
                ) : (
                  <p className="text-left">{exp.description}</p>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
