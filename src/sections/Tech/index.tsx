import React from "react";
import { motion } from "motion/react";
import { TECH_CATEGORIES } from "@/constants";

export default function TechSection() {
  return (
    <div className="space-y-8" id="tech-section">
      <div className="text-center md:text-left">
        <h2 className="text-3xl font-bold text-text-main">Stack Tecnológica</h2>
        <p className="text-text-muted mt-1">
          Ferramentas e linguagens que utilizo no meu dia a dia.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {TECH_CATEGORIES.map((category, idx) => (
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
                <category.icon className="w-6 h-6 text-brand-primary" />
              </div>
              <h3 className="font-bold text-text-main text-lg">{category.title}</h3>
            </div>
            <div className="flex flex-wrap justify-center md:justify-start gap-2 w-full">
              {category.items.map((item) => (
                <span
                  key={item}
                  className="px-4 py-2 bg-bg-card/50 text-text-main text-sm rounded-xl border border-border-color hover:border-brand-primary/50 hover:bg-brand-primary/5 transition-all text-center flex-grow"
                >
                  {item}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
