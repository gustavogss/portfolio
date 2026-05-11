import React from 'react';
import { motion } from 'motion/react';
import { ExternalLink } from 'lucide-react';
import { PROJECTS } from '../../constants';

export function ProjectsSection() {
  return (
    <div className="space-y-8" id="projects-section">
      <div className="flex items-end justify-center md:justify-between text-center md:text-left">
        <div>
          <h2 className="text-3xl font-bold text-white">Meus Projetos</h2>
          <p className="text-slate-400 mt-1">Uma seleção de trabalhos que combinam design e tecnologia.</p>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {PROJECTS.map((project, idx) => (
          <motion.div 
            key={project.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ y: -10, scale: 1.05 }}
            transition={{ 
              initial: { delay: idx * 0.1 },
              whileHover: { duration: 0.3, ease: "easeOut" }
            }}
            id={`project-card-${project.id}`}
            className="group glass-morphism rounded-3xl overflow-hidden hover:border-brand-primary/30 transition-all duration-300 flex flex-col items-center md:items-start text-center md:text-left shadow-lg hover:shadow-2xl hover:shadow-brand-primary/20"
          >
            <div className="relative h-48 w-full overflow-hidden">
              <img 
                src={project.imageUrl} 
                alt={project.name} 
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
              />
              <div className="absolute inset-0 bg-linear-to-t from-slate-900/80 to-transparent"></div>
            </div>
            <div className="p-6 space-y-4 flex flex-col items-center md:items-start w-full">
              <h3 className="text-xl font-bold text-white group-hover:text-brand-primary transition-colors">{project.name}</h3>
              <p className="text-slate-400 text-sm line-clamp-2">{project.description}</p>
              <div className="flex flex-wrap justify-center md:justify-start gap-2">
                {project.techs.slice(0, 3).map(tech => (
                  <span key={tech} className="px-3 py-1 bg-slate-800 text-slate-300 text-[10px] uppercase tracking-wider font-bold rounded-full border border-slate-700">
                    {tech}
                  </span>
                ))}
                {project.techs.length > 3 && (
                  <span className="text-[10px] text-slate-500 flex items-center">+{project.techs.length - 3} mais</span>
                )}
              </div>
              <a 
                href={project.link} 
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-brand-primary font-medium text-sm hover:gap-3 transition-all"
              >
                Ver Detalhes <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
