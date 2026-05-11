import React, { useState, useEffect } from 'react';
import { 
  Download, 
  Loader2, 
  Layers, 
  Cpu, 
  Newspaper 
} from 'lucide-react';
import { motion } from 'motion/react';
import { User as FirebaseUser } from 'firebase/auth';
import { checkGenerationLimit, incrementGenerationCount } from '../../lib/firebase';
import { generateResumeContent } from '../../services/geminiService';
// Removed static import of generateResumePDF
import { 
  PROJECTS, 
  TECH_CATEGORIES, 
  EXPERIENCES,
  EDUCATION,
  CERTIFICATIONS 
} from '../../constants';

const GUSTAVO_GITHUB = "https://github.com/gustavogss";
const GUSTAVO_LINKEDIN = "https://www.linkedin.com/in/gustavosouza-jp/";
const GUSTAVO_PHOTO = "https://github.com/gustavogss.png";

export function HomeSection({ user, onLogin }: { user: FirebaseUser | null, onLogin: () => void }) {
  const [isGenerating, setIsGenerating] = useState(false);
  const [remainingGenerations, setRemainingGenerations] = useState(5);

  useEffect(() => {
    if (user) {
      checkGenerationLimit(user.uid).then(res => {
        setRemainingGenerations(res.remaining);
      });
    } else {
      setRemainingGenerations(5);
    }
  }, [user]);

  const handleGenerateResume = async () => {
    if (!user) {
      onLogin();
      return;
    }

    setIsGenerating(true);
    try {
      const data = {
        role: "Engenheiro de Software | Mobile | AppSec",
        experiences: EXPERIENCES,
        projects: PROJECTS,
        education: EDUCATION,
        techCategories: TECH_CATEGORIES
      };
      
      const aiContent = await generateResumeContent(data);
      await incrementGenerationCount(user!.uid).catch(console.error);
      
      const { remaining } = await checkGenerationLimit(user!.uid);
      setRemainingGenerations(remaining);
      
      const userProfile = {
        name: "Gustavo Souza",
        role: "Engenheiro de Software | Mobile | AppSec",
        email: "contato@gustavosouza.dev.br",
        github: GUSTAVO_GITHUB,
        linkedin: GUSTAVO_LINKEDIN,
        education: EDUCATION,
        certifications: CERTIFICATIONS,
        techCategories: TECH_CATEGORIES
      };

      const { generateResumePDF } = await import('../../lib/pdfGenerator');
      await generateResumePDF(userProfile, aiContent);
    } catch (error: any) {
      console.error("Erro ao gerar currículo:", error);
      if (error.message === 'LIMIT_EXCEEDED') {
        alert("Você atingiu o limite de gerações de teste. Aguarde a liberação ou entre em contato.");
      } else {
        alert("Houve um erro ao gerar o currículo com IA: " + (error.message || "Erro desconhecido"));
      }
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="space-y-12" id="home-section">
      <section className="flex flex-col md:flex-row items-center justify-center md:justify-start gap-8 glass-morphism p-8 rounded-3xl text-center md:text-left" id="profile-card">
        <div className="relative group">
          <div className="absolute -inset-1 bg-linear-to-r from-brand-primary to-brand-secondary rounded-full blur-md opacity-25 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
          <img 
            src={GUSTAVO_PHOTO} 
            alt="Gustavo Souza" 
            className="relative w-40 h-40 rounded-full object-cover border-4 border-slate-900 shadow-2xl" 
            id="profile-image"
          />
        </div>
        <div className="text-center md:text-left space-y-4">
          <div className="space-y-1">
            <h1 className="text-4xl md:text-5xl font-bold text-white tracking-tight">Gustavo Souza</h1>
            <p className="text-xl text-brand-primary font-medium">Engenheiro de Software | Mobile | AppSec</p>
          </div>
          <p className="text-slate-400 max-w-xl leading-relaxed">
            Desenvolvo soluções web e mobile com foco em resultados, segurança, ia integrada e automação.
          </p>
          <div className="flex justify-center md:justify-start pt-2 flex-col gap-2 items-center md:items-start">
            <button 
              id="generate-cv"
              onClick={handleGenerateResume}
              disabled={isGenerating || (user && remainingGenerations <= 0)}
              className="flex items-center gap-2 px-6 py-3 rounded-xl bg-linear-to-r from-brand-primary to-brand-secondary text-white font-bold hover:scale-105 transition-all shadow-lg shadow-brand-primary/20 disabled:opacity-50 disabled:cursor-not-allowed disabled:scale-100 w-fit"
            >
              {isGenerating ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <Download className="w-5 h-5" />
              )}
              <span>{isGenerating ? 'IA Gerando...' : 'Gerar Currículo (IA)'}</span>
            </button>
            {user && (
              <span className="text-[10px] text-slate-500 font-bold uppercase tracking-widest pl-1">
                Restante: {remainingGenerations} / 5 gerações
              </span>
            )}
          </div>
        </div>
      </section>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6" id="summary-cards">
        <SummaryCard 
          id="summary-projects"
          icon={Layers} 
          count="+100" 
          title="Projetos e Aplicações" 
          description="Aplicações full-stack, SaaS, e aplicativos para Android e IOS." 
        />
        <SummaryCard 
          id="summary-tech"
          icon={Cpu} 
          count="+20" 
          title="Tecnologias" 
          description="Domínio técnico em metodologias ágeis, desenvolvimento moderno, automação e inteligência artificial." 
        />
        <SummaryCard 
          id="summary-blog"
          icon={Newspaper} 
          count="+5" 
          title="Artigos Publicados" 
          description="Compartilhando experiências práticas, desafios reais e soluções técnicas focadas em desenvolvimento Web, Mobile e Segurança." 
        />
      </div>
    </div>
  );
}

function SummaryCard({ id, icon: Icon, count, title, description }: { id: string, icon: any, count: string, title: string, description: string }) {
  return (
    <div className="glass-morphism p-8 rounded-3xl group hover:border-brand-primary/30 transition-all flex flex-col items-center text-center space-y-4" id={id}>
      <div className="p-4 bg-brand-primary/10 rounded-2xl group-hover:bg-brand-primary/20 transition-colors">
        <Icon className="text-brand-primary w-8 h-8" />
      </div>
      <div className="space-y-1">
        <span className="text-3xl font-bold text-white block">{count}</span>
        <h3 className="text-lg font-bold text-slate-300">{title}</h3>
      </div>
      <p className="text-slate-400 text-sm leading-relaxed">
        {description}
      </p>
    </div>
  );
}
