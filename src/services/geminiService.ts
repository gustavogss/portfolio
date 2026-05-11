import { GoogleGenAI } from "@google/genai";

let ai: GoogleGenAI | null = null;

try {
  if (process.env.GEMINI_API_KEY) {
    ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
  }
} catch (e) {
  console.warn("GoogleGenAI init failed", e);
}

const MAX_GENERATIONS = 5;

export async function generateResumeContent(data: any) {
  // Rate limiting logic
  const usageCount = parseInt(localStorage.getItem('ai_generation_count') || '0');
  
  if (usageCount >= MAX_GENERATIONS) {
    throw new Error('LIMIT_EXCEEDED');
  }

  if (!ai) {
    console.warn("Sem chave do Gemini, retornando dados não alterados.");
    return fallbackData(data);
  }

  const prompt = `
    Otimize as descrições de experiência e projetos para um currículo profissional focado em conversão.
    Linguagem: Português. Seja pragmático, remova palavras vazias, e foque em tecnologias e resultados (use verbos de ação). 
    Seja breve para caber em 1 ou 2 páginas.
    
    Dados atuais:
    ${JSON.stringify({
      role: data.role,
      experiences: data.experiences,
      projects: data.projects
    })}
    
    Retorne o resultado estritamente no seguinte formato JSON:
    {
      "professionalSummary": "Bio profissional executiva, max 3 frases destacando expertise em DevSecOps e Mobile.",
      "optimizedExperiences": [
        {
          "company": "Nome",
          "role": "Cargo",
          "period": "Período",
          "description": "Lista curta e direta de conquistas/techs (ex: 'Desenvolveu X usando Y diminuindo Z')"
        }
      ],
      "optimizedProjects": [
        {
          "name": "Nome",
          "description": "Resumo de impacto técnico e de negócios"
        }
      ]
    }
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
      },
    });
    
    if (response && response.text) {
      const result = JSON.parse(response.text);
      localStorage.setItem('ai_generation_count', (usageCount + 1).toString());
      return result;
    }
  } catch (error) {
    console.error("Erro ao gerar com IA:", error);
  }
  
  // Fallback
  return fallbackData(data);
}

function fallbackData(data: any) {
  return {
    professionalSummary: "Engenheiro de Software com ampla especialização em ecossistema Mobile (React Native, Flutter) e Web, com vivência arquitetando soluções pautadas na cultura DevSecOps, metodologias ágeis e integrações com IA. Focado na esteira segura, ferramentas DAST/SAST, OWASP e performance.",
    optimizedExperiences: data.experiences,
    optimizedProjects: data.projects
  };
}
