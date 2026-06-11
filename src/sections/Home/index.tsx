import React, { useState, useEffect } from "react";
import { Loader2, Download, Layers, Cpu, Newspaper } from "lucide-react";
import { generateResumeContent, getMaxGenerations } from "@/services/geminiService";
import { generateResumePDF } from "@/lib/pdfGenerator";
import type { ResumeInputData, UserProfile } from "@/types/resumeTypes";
import { PROJECTS, TECH_CATEGORIES, EXPERIENCES, EDUCATION, CERTIFICATIONS } from "@/constants";
import SummaryCard from "@/components/SummaryCard";

const GUSTAVO_PHOTO = "https://github.com/gustavogss.png";
const GUSTAVO_GITHUB = "https://github.com/gustavogss";
const GUSTAVO_LINKEDIN = "https://www.linkedin.com/in/gustavosouza-jp/";

export default function HomeSection() {
  const [isGenerating, setIsGenerating] = useState(false);
  const [usageCount, setUsageCount] = useState(0);

  useEffect(() => {
    setUsageCount(parseInt(localStorage.getItem("ai_generation_count") || "0"));
  }, []);

  const handleGenerateResume = async () => {
    const maxGen = getMaxGenerations();
    if (usageCount >= maxGen) {
      alert(`Você atingiu o limite de ${maxGen} gerações por sessão.`);
      return;
    }
    setIsGenerating(true);
    try {
      const inputData: ResumeInputData = {
        name: "Gustavo Souza",
        role: "Engenheiro de Software | Mobile | DevSecOps",
        experiences: EXPERIENCES,
        projects: PROJECTS,
        education: EDUCATION,
        certifications: CERTIFICATIONS,
        tech: TECH_CATEGORIES,
      };

      const aiContent = await generateResumeContent(inputData);
      setUsageCount((prev: number) => prev + 1);

      const userProfile: UserProfile = {
        name: "Gustavo Souza",
        role: "Engenheiro de Software | Mobile | DevSecOps",
        email: "contato@gustavosouza.dev.br",
        phone: "",
        location: "João Pessoa - PB, Brasil",
        github: GUSTAVO_GITHUB,
        linkedin: GUSTAVO_LINKEDIN,
      };

      await generateResumePDF(userProfile, aiContent);
    } catch (error: unknown) {
      console.error("Erro ao gerar currículo:", error);
      const message = error instanceof Error ? error.message : "";
      if (message === "LIMIT_EXCEEDED") {
        const maxGen = getMaxGenerations();
        alert(
          `Você atingiu o limite de ${maxGen} gerações por sessão. Para evitar abusos e custos excessivos, a geração foi limitada.`
        );
      } else {
        alert("Houve um erro ao gerar o currículo com IA. Tente novamente.");
      }
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="space-y-12" id="home-section">
      {/* Hero / Profile */}
      <section
        className="flex flex-col md:flex-row items-center justify-center md:justify-start gap-8 glass-morphism p-8 rounded-3xl text-center md:text-left"
        id="profile-card"
      >
        <div className="relative group">
          <div className="absolute -inset-1 bg-linear-to-r from-brand-primary to-brand-secondary rounded-full blur-md opacity-25 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
          <img
            src={GUSTAVO_PHOTO}
            alt="Gustavo Souza"
            className="relative w-40 h-40 rounded-full object-cover border-4 border-bg-main shadow-2xl"
            id="profile-image"
            fetchPriority="high"
          />
        </div>
        <div className="text-center md:text-left space-y-4">
          <div className="space-y-1">
            <h1 className="text-4xl md:text-5xl font-bold text-text-main tracking-tight">
              Gustavo Souza
            </h1>
            <p className="text-xl text-brand-primary font-medium">
              Engenheiro de Software | Mobile | DevSecOps
            </p>
          </div>
          <p className="text-text-muted max-w-xl leading-relaxed">
            Desenvolvo soluções web e mobile com foco em resultados, segurança,
            ia integrada e automação.
          </p>
          <div className="flex justify-center md:justify-start pt-2">
            <button
              id="generate-cv"
              onClick={handleGenerateResume}
              disabled={isGenerating || usageCount >= getMaxGenerations()}
              className="flex items-center gap-2 px-6 py-3 rounded-xl bg-linear-to-r from-brand-primary to-brand-secondary text-white font-bold hover:scale-105 transition-all shadow-lg shadow-brand-primary/20 disabled:opacity-50 disabled:cursor-not-allowed disabled:scale-100"
            >
              {isGenerating ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <Download className="w-5 h-5" />
              )}
              <span>
                {isGenerating ? "IA Gerando..." : "Gerar Currículo (IA)"}
              </span>
            </button>
          </div>
        </div>
      </section>

      {/* Grid Quick Stats */}
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
