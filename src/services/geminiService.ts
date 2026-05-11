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
  if (!ai) {
    console.warn("Sem chave do Gemini, retornando dados não alterados.");
    return fallbackData(data);
  }

  const prompt = `
    ### AGENTE ESPECIALISTA: RESUME & CV MANAGER
    Você é um recrutador técnico sênior e especialista em redação de currículos (CVs) de alto impacto para a área de Tecnologia.
    
    ### OBJETIVO
    Otimizar as experiências profissionais e projetos de GUSTAVO SOUZA para um currículo em PDF.
    O texto deve ter concordância perfeita, ser profissional, coerente e focado em resultados técnicos.

    ### REGRAS CRÍTICAS (ANTI-ALUCINAÇÃO)
    1. USE APENAS OS DADOS FORNECIDOS ABAIXO. NUNCA invente empresas, cargos, datas ou responsabilidades fictícias.
    2. FIDELIDADE AOS DADOS: Se a descrição original diz "Uso de Docker", não diga que houve "Liderança de time de infraestrutura" a menos que esteja no texto.
    3. TOM DE VOZ: Executivo e pragmático. Use verbos de ação (Implementou, Desenvolveu, Otimizou).
    4. FORMATAÇÃO: Use bullet points (•) para listar responsabilidades e conquistas.
    5. FORMAÇÃO E DATAS: Garanta que todas as datas e períodos de formação acadêmica e experiências sejam preservados e destacados.
    6. RESUMO PROFISSIONAL: Crie um parágrafo de 3-4 frases que sintetize a expertise em Engenharia de Software, Desenvolvimento Mobile e DevSecOps.

    ### FONTE ÚNICA DE VERDADE (DADOS BRUTOS)
    ${JSON.stringify({
      role: data.role,
      experiences: data.experiences,
      projects: data.projects,
      education: data.education,
      techCategories: data.techCategories
    })}
    
    ### FORMATO DE RETORNO (JSON OBRIGATÓRIO)
    {
      "professionalSummary": "Resumo executivo de impacto baseado nos dados...",
      "optimizedExperiences": [
        {
          "company": "Nome da Empresa",
          "role": "Cargo",
          "period": "Período",
          "description": "• Responsabilidade 1\n• Conquista técnica 2\n• Implementação de X usando Y"
        }
      ],
      "optimizedProjects": [
        {
          "name": "Nome do Projeto",
          "description": "Explicação técnica clara focada em solução e impacto."
        }
      ]
    }
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3.1-pro-preview",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
      },
    });
    
    if (response && response.text) {
      const result = JSON.parse(response.text);
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
    professionalSummary: "Engenheiro de Software com ampla especialização em ecossistema Mobile (React Native, Flutter) e Web, com vivência arquitetando soluções pautadas na cultura DevSecOps, metodologias ágeis e integrações com IA. Focado na esteira de desenvolvimento segura através de ferramentas DAST/SAST, OWASP e otimização de performance técnica.",
    optimizedExperiences: data.experiences.map((exp: any) => ({
      ...exp,
      description: `• ${exp.description.split('. ').join('\n• ')}`
    })),
    optimizedProjects: data.projects
  };
}
