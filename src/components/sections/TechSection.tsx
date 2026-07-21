import React from 'react';
import { motion } from 'motion/react';
import * as Lucide from 'lucide-react';
import { usePortfolio } from '../../contexts/PortfolioContext';

export function TechSection() {
  const { techCategories } = usePortfolio();
  const list = techCategories || [];

  // Determine if it is the grouped structure or individual database skills
  const isGrouped = list.length > 0 && 'items' in list[0];

  const processedCategories = isGrouped 
    ? list 
    : (() => {
        // Group individual skills by category
        const groups: { [key: string]: string[] } = {};
        const iconMap: { [key: string]: string } = {};
        
        list.forEach((skill: any) => {
          const cat = skill.category || 'Geral';
          if (!groups[cat]) {
            groups[cat] = [];
          }
          groups[cat].push(skill.name);
          if (skill.icon) {
            iconMap[cat] = skill.icon;
          }
        });

        const categoryToIconComponent = (cat: string) => {
          const name = iconMap[cat];
          if (name && (Lucide as any)[name]) {
            return (Lucide as any)[name];
          }
          // Default mappings based on standard category names
          if (cat.includes('IA') || cat.includes('Automação')) return Lucide.Layers;
          if (cat.includes('Mobile') || cat.includes('Frontend')) return Lucide.Smartphone;
          if (cat.includes('Backend')) return Lucide.Code2;
          if (cat.includes('Metodologias')) return Lucide.Terminal;
          if (cat.includes('DevSecOps')) return Lucide.ShieldCheck;
          if (cat.includes('Segurança') || cat.includes('Pentest')) return Lucide.Globe;
          return Lucide.Code2;
        };

        return Object.keys(groups).map(title => ({
          title,
          icon: categoryToIconComponent(title),
          items: groups[title]
        }));
      })();

  return (
    <div className="space-y-8" id="tech-section">
      <div className="text-center md:text-left">
        <h2 className="text-3xl font-bold text-white">Stack Tecnológica</h2>
        <p className="text-slate-400 mt-1">Ferramentas e linguagens que utilizo no meu dia a dia.</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {processedCategories.map((category: any, idx: number) => {
          let IconComponent = category.icon;
          if (typeof IconComponent === 'string' && (Lucide as any)[IconComponent]) {
            IconComponent = (Lucide as any)[IconComponent];
          }
          if (!IconComponent || typeof IconComponent === 'string') {
            const catName = (category.title || category.name || '').toLowerCase();
            if (catName.includes('ia') || catName.includes('automação')) IconComponent = Lucide.Layers;
            else if (catName.includes('mobile') || catName.includes('frontend')) IconComponent = Lucide.Smartphone;
            else if (catName.includes('backend')) IconComponent = Lucide.Code2;
            else if (catName.includes('metodologia') || catName.includes('scrum') || catName.includes('clean code')) IconComponent = Lucide.Terminal;
            else if (catName.includes('devsecops')) IconComponent = Lucide.ShieldCheck;
            else if (catName.includes('segurança') || catName.includes('pentest')) IconComponent = Lucide.Shield;
            else IconComponent = Lucide.Code2;
          }
          return (
            <motion.div 
              key={category.title}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              whileHover={{ y: -5, scale: 1.02 }}
              transition={{ delay: idx * 0.1 }}
              id={`tech-category-${idx}`}
              className="glass-morphism p-6 rounded-3xl flex flex-col items-center md:items-start text-center md:text-left hover:border-brand-primary/30 transition-all shadow-md hover:shadow-xl hover:shadow-brand-primary/10"
            >
              <div className="flex flex-col md:flex-row items-center gap-3 mb-6">
                <div className="p-3 bg-brand-primary/10 rounded-2xl">
                  <IconComponent className="w-6 h-6 text-brand-primary" />
                </div>
                <h3 className="font-bold text-white text-lg">{category.title}</h3>
              </div>
              <div className="flex flex-wrap justify-center md:justify-start gap-2 w-full">
                {category.items?.map((item: string) => (
                  <span key={item} className="px-4 py-2 bg-slate-800/50 text-slate-300 text-sm rounded-xl border border-slate-800 hover:border-brand-primary/50 hover:bg-brand-primary/5 transition-all text-center flex-grow">
                    {item}
                  </span>
                ))}
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
