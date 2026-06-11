import { useState, useEffect } from "react";
import { Section } from "@/types/navigation";

export function useNavigation() {
  const [activeSection, setActiveSection] = useState<Section>("home");
  const [activePostId, setActivePostId] = useState<string | null>(null);

  useEffect(() => {
    const titles: Record<Section, string> = {
      home: "Gustavo Souza | Software Engineer & DevSecOps",
      experience: "Experiência Profissional | Gustavo Souza",
      projects: "Portfólio de Projetos | Gustavo Souza",
      tech: "Habilidades Técnicas | Gustavo Souza",
      education: "Formação Acadêmica | Gustavo Souza",
      certifications: "Certificações Profissionais | Gustavo Souza",
      blog: "Blog de Tecnologia e Insights | Gustavo Souza",
    };

    const descriptions: Record<Section, string> = {
      home: "Conheça Gustavo Souza, Desenvolvedor Full Stack, Mobile e especialista em DevSecOps. Foco em IA e Segurança.",
      experience:
        "Histórico profissional de Gustavo Souza em desenvolvimento mobile, web e segurança cibernética.",
      projects:
        "Galeria de projetos desenvolvidos por Gustavo Souza, incluindo Agentes de IA, Mobile e Fullstack.",
      tech: "Stack tecnológica e competências de Gustavo Souza em React, Flutter, Python e Segurança.",
      education:
        "Trajetória educacional e formação acadêmica de Gustavo Souza.",
      certifications:
        "Principais certificações de Gustavo Souza em Google Cloud, Segurança e Desenvolvimento.",
      blog: "Artigos sobre Vibecoding, DevSecOps, Agentes de IA e inovações no mundo do desenvolvimento.",
    };

    if (!activePostId) {
      document.title = titles[activeSection] || "Gustavo Souza";
      const metaDesc = document.querySelector('meta[name="description"]');
      if (metaDesc) {
        metaDesc.setAttribute("content", descriptions[activeSection]);
      }
    }
  }, [activeSection, activePostId]);

  return {
    activeSection,
    setActiveSection,
    activePostId,
    setActivePostId,
  };
}
