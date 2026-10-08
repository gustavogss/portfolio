import React, { useState, useEffect } from 'react';
import { 
  Download, 
  Loader2, 
  Layers, 
  Cpu, 
  Newspaper,
  FileText
} from 'lucide-react';
import { motion } from 'motion/react';
import { User as FirebaseUser } from 'firebase/auth';
import { checkGenerationLimit, incrementGenerationCount } from '../../lib/firebase';
import { usePortfolio } from '../../contexts/PortfolioContext';

const GUSTAVO_PHOTO = "https://github.com/gustavogss.png";

export function HomeSection({ user, onLogin }: { user: FirebaseUser | null, onLogin: () => void }) {
  const [isGenerating, setIsGenerating] = useState(false);
  const [remainingGenerations, setRemainingGenerations] = useState(5);
  const portfolioData = usePortfolio();
  
  const { 
    settings, 
    experiences, 
    projects, 
    education, 
    techCategories,
    certifications
  } = portfolioData || {};

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
        role: settings?.title || "Engenheiro de Software | Mobile | AppSec",
        experiences: experiences || [],
        projects: projects || [],
        education: education || [],
        techCategories: techCategories || []
      };
      
      const { generateResumeContent } = await import('../../services/geminiService');
      const aiContent = await generateResumeContent(data);
      await incrementGenerationCount(user!.uid).catch(console.error);
      
      const { remaining } = await checkGenerationLimit(user!.uid);
      setRemainingGenerations(remaining);
      
      const userProfile = {
        name: settings?.name || "Gustavo Souza",
        role: settings?.title || "Engenheiro de Software | Mobile | AppSec",
        email: settings?.email || "contato@gustavosouza.dev.br",
        github: settings?.github,
        linkedin: settings?.linkedin,
        education: education || [],
        certifications: certifications || [],
        techCategories: techCategories || []
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

  const handleDownloadStaticPDF = async () => {
    try {
      const { generateStaticPDF } = await import('../../lib/staticPdfGenerator');
      generateStaticPDF(portfolioData);
    } catch (error) {
      console.error("Erro ao gerar PDF:", error);
      alert("Houve um erro ao baixar o currículo em PDF.");
    }
  };

  return (
    <div className="space-y-12" id="home-section">
      <section className="flex flex-col md:flex-row items-center justify-center md:justify-start gap-8 glass-morphism p-8 rounded-3xl text-center md:text-left" id="profile-card">
        <div className="relative group">
          <div className="absolute -inset-1 bg-linear-to-r from-brand-primary to-brand-secondary rounded-full blur-md opacity-25 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
          <img 
            src={settings?.photoUrl || GUSTAVO_PHOTO} 
            alt={settings?.name || "Gustavo Souza"} 
            className="relative w-40 h-40 rounded-full object-cover border-4 border-slate-900 shadow-2xl" 
            id="profile-image"
          />
        </div>
        <div className="text-center md:text-left space-y-4">
          <div className="space-y-1">
            <h1 className="text-4xl md:text-5xl font-bold text-white tracking-tight">{settings?.name || 'Gustavo Souza'}</h1>
            <p className="text-xl text-brand-primary font-medium">{settings?.title || 'Engenheiro de Software | Mobile | AppSec'}</p>
          </div>
          <p className="text-slate-400 max-w-xl leading-relaxed">
            {settings?.description || 'Desenvolvo soluções web e mobile com foco em resultados, segurança, ia integrada e automação.'}
          </p>
          <div className="flex flex-col gap-3 pt-2 w-full">
            <div className="flex items-center justify-center md:justify-start w-full">
              <button 
                id="download-static-pdf"
                onClick={handleDownloadStaticPDF}
                className="flex items-center gap-2 px-6 py-3 rounded-xl bg-linear-to-r from-brand-primary to-brand-secondary text-white font-bold hover:scale-[1.02] active:scale-[0.98] transition-all shadow-lg shadow-brand-primary/20 w-full sm:w-auto justify-center cursor-pointer"
              >
                <Download className="w-5 h-5 text-white" />
                <span>Baixar CV (PDF)</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6" id="summary-cards">
        <SummaryCard 
          id="summary-projects"
          icon={Layers} 
          count={`+${projects?.length || 0}`}
          title="Projetos e Aplicações" 
          description="Aplicações full-stack, SaaS, e aplicativos para Android e IOS." 
        />
        <SummaryCard 
          id="summary-tech"
          icon={Cpu} 
          count={`+${techCategories?.length || 0}`}
          title="Tecnologias" 
          description="Domínio técnico em metodologias ágeis, desenvolvimento moderno, automação e inteligência artificial." 
        />
        <SummaryCard 
          id="summary-blog"
          icon={Newspaper} 
          count={`+${portfolioData?.blogPosts?.length || 0}`}
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
