import React from "react";

export default function SummaryCard({
  id,
  icon: Icon,
  count,
  title,
  description,
}: {
  id: string;
  icon: any;
  count: string;
  title: string;
  description: string;
}) {
  return (
    <div
      className="glass-morphism p-8 rounded-3xl group hover:border-brand-primary/30 transition-all flex flex-col items-center text-center space-y-4"
      id={id}
    >
      <div className="p-4 bg-brand-primary/10 rounded-2xl group-hover:bg-brand-primary/20 transition-colors">
        <Icon className="text-brand-primary w-8 h-8" />
      </div>
      <div className="space-y-1">
        <span className="text-3xl font-bold text-white block">{count}</span>
        <h3 className="text-lg font-bold text-slate-300">{title}</h3>
      </div>
      <p className="text-slate-400 text-sm leading-relaxed">{description}</p>
    </div>
  );
}
