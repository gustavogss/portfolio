import { GoogleGenAI } from "@google/genai";
import type { ResumeInputData, AIResumeResponse, AIOptimizedExperience, AIOptimizedEducation } from "../types/resumeTypes";

// ─── Inicialização segura do client ──────────────────────────────────

let ai: GoogleGenAI | null = null;

try {
  if (import.meta.env.VITE_GEMINI_API_KEY) {
    ai = new GoogleGenAI({ apiKey: import.meta.env.VITE_GEMINI_API_KEY });
  }
} catch (e) {
  console.warn("GoogleGenAI init failed", e);
}

const MAX_GENERATIONS_DEFAULT = 5;
const MAX_GENERATIONS_OWNER = 50;
const STORAGE_KEY = "ai_generation_count";
const OWNER_KEY = "portfolio_owner";

<<<<<<< HEAD
export async function generateResumeContent(data: any) {
=======
// ─── Detecção de owner via URL param ─────────────────────────────────

function initOwnerFlag(): void {
  try {
    const params = new URLSearchParams(window.location.search);
    if (params.get("owner") === "1") {
      localStorage.setItem(OWNER_KEY, "true");
    }
  } catch {
    // SSR-safe
  }
}

initOwnerFlag();

function isOwner(): boolean {
  try {
    return localStorage.getItem(OWNER_KEY) === "true";
  } catch {
    return false;
  }
}

/** Retorna o limite de gerações: 50 para o owner, 5 para visitantes */
export function getMaxGenerations(): number {
  return isOwner() ? MAX_GENERATIONS_OWNER : MAX_GENERATIONS_DEFAULT;
}

// ─── Sanitização de strings antes de enviar ao prompt ────────────────

function sanitize(input: string): string {
  return input
    .replace(/<[^>]*>/g, "")      // Remove HTML tags
    .replace(/[<>]/g, "")         // Remove caracteres perigosos residuais
    .trim()
    .slice(0, 2000);              // Limita tamanho por campo
}

function sanitizeData(data: ResumeInputData): ResumeInputData {
  return {
    name: sanitize(data.name),
    role: sanitize(data.role),
    experiences: data.experiences.map((exp) => ({
      ...exp,
      company: sanitize(exp.company),
      role: sanitize(exp.role),
      period: sanitize(exp.period),
      description: sanitize(exp.description),
    })),
    projects: data.projects.map((proj) => ({
      ...proj,
      name: sanitize(proj.name),
      description: sanitize(proj.description),
    })),
    education: data.education.map((edu) => ({
      ...edu,
      institution: sanitize(edu.institution),
      degree: sanitize(edu.degree),
      period: sanitize(edu.period),
      description: sanitize(edu.description),
    })),
    certifications: data.certifications.map((cert) => ({
      ...cert,
      name: sanitize(cert.name),
      issuer: sanitize(cert.issuer),
      date: sanitize(cert.date),
    })),
    tech: data.tech.map((cat) => ({
      ...cat,
      title: sanitize(cat.title),
      items: cat.items.map((item) => sanitize(item)),
    })),
  };
}

// ─── Prompt profissional completo ────────────────────────────────────

function buildPrompt(data: ResumeInputData): string {
  const sanitized = sanitizeData(data);

  return `
Você é um especialista em recrutamento e criação de currículos profissionais otimizados para ATS (Applicant Tracking Systems), especialmente para a plataforma Gupy.

Sua tarefa é gerar um currículo profissional completo e otimizado com base nos dados abaixo.

## Regras obrigatórias:
1. Linguagem: Português (PT-BR), tom profissional corporativo
2. Use verbos de ação no passado para experiências anteriores e presente para a posição atual
3. Destaque resultados, tecnologias e impactos mensuráveis
4. Evite textos genéricos — seja específico e objetivo
5. Corrija gramática e melhore a clareza de todas as descrições
6. Para formações acadêmicas: enriqueça a descrição com disciplinas relevantes, projetos acadêmicos, conhecimentos adquiridos e foco da formação, mantendo coerência com o curso
7. Mantenha coerência entre seções (não repetir informações exatas)
8. O campo "highlights" de cada experiência deve conter 3-5 bullet points concisos e diretos
9. **REGRA CRÍTICA: NUNCA invente informações que não estejam nos dados fornecidos.** Use EXCLUSIVAMENTE os dados reais do candidato. Pode otimizar, reformular, melhorar a redação e enriquecer dentro do contexto existente, mas NUNCA adicione metodologias, ferramentas, habilidades, certificações, experiências ou qualquer informação que não conste nos dados acima.
10. O campo "additionalInfo" deve conter APENAS informações derivadas dos dados fornecidos (ex: resumo das áreas de atuação). Não invente disponibilidade, modelo de trabalho, ou qualquer dado pessoal não fornecido.
11. **NOMENCLATURA:** Use sempre "DevSecOps" para se referir à especialização em segurança de software e cultura de segurança no desenvolvimento. NUNCA use "AppSec" como rótulo de cargo ou especialização — use "DevSecOps" em todos os contextos. O termo "AppSec" pode aparecer apenas em nomes de certificações ou ferramentas exatamente como estão nos dados (ex: "OWASP Top 10: Security Vulnerabilities").

## Dados do candidato:
${JSON.stringify({
  nome: sanitized.name,
  cargo: sanitized.role,
  experiencias: sanitized.experiences.map(e => ({
    empresa: e.company,
    cargo: e.role,
    periodo: e.period,
    descricao: e.description
  })),
  formacao: sanitized.education.map(e => ({
    curso: e.degree,
    instituicao: e.institution,
    periodo: e.period,
    descricao: e.description
  })),
  certificacoes: sanitized.certifications.map(c => ({
    nome: c.name,
    emissor: c.issuer,
    data: c.date
  })),
  projetos: sanitized.projects.map(p => ({
    nome: p.name,
    descricao: p.description,
    tecnologias: p.techs
  })),
  tecnologias: sanitized.tech.map(t => ({
    categoria: t.title,
    itens: t.items
  }))
}, null, 2)}

## Formato da resposta (JSON estrito):
{
  "professionalSummary": "Resumo profissional executivo de 3-4 frases. Destaque expertise principal, anos de atuação, áreas de domínio e diferencial competitivo.",
  "technicalCompetencies": ["Competência 1", "Competência 2", "...até 18 competências mais relevantes"],
  "optimizedExperiences": [
    {
      "company": "Nome da Empresa",
      "role": "Cargo",
      "period": "Período",
      "highlights": [
        "Conquista ou responsabilidade concisa com tecnologias e resultados",
        "Segunda conquista...",
        "Terceira conquista..."
      ]
    }
  ],
  "optimizedEducation": [
    {
      "degree": "Nome do Curso/Formação",
      "institution": "Instituição",
      "period": "Período",
      "status": "Concluído ou Em andamento",
      "description": "Descrição detalhada: disciplinas relevantes cursadas, projetos acadêmicos desenvolvidos, conhecimentos adquiridos, foco da formação e especializações estudadas. Enriqueça com informações profissionais relevantes."
    }
  ],
  "optimizedCertifications": [
    {
      "name": "Nome da Certificação",
      "issuer": "Emissor",
      "date": "Data"
    }
  ],
  "optimizedProjects": [
    {
      "name": "Nome do Projeto",
      "description": "Resumo de impacto técnico e de negócios em 1-2 frases"
    }
  ],
  "languages": [
    { "name": "Português", "level": "Nativo" }
  ],
  "additionalInfo": "Atuação abrangente em DevSecOps, desenvolvimento Mobile e Web, com formações contínuas em segurança cibernética e inteligência artificial."
}

IMPORTANTE: Gere o campo additionalInfo APENAS com informações que possam ser inferidas diretamente dos dados acima. NÃO mencione disponibilidade para trabalho remoto, metodologias ágeis ou qualquer informação que não conste nos dados fornecidos.
`;
}

// ─── Fallback quando a IA não está disponível ────────────────────────

function buildFallback(data: ResumeInputData): AIResumeResponse {
  return {
    professionalSummary:
      "Engenheiro de Software com ampla especialização em ecossistema Mobile (React Native, Flutter) e Web, com vivência arquitetando soluções pautadas na cultura DevSecOps, metodologias ágeis e integrações com IA. Focado em esteira segura com ferramentas DAST/SAST, OWASP e performance de aplicações.",
    technicalCompetencies: data.tech.flatMap((cat) => cat.items).slice(0, 18),
    optimizedExperiences: data.experiences.map(
      (exp): AIOptimizedExperience => ({
        company: exp.company,
        role: exp.role,
        period: exp.period,
        highlights: [exp.description],
      })
    ),
    optimizedEducation: data.education.map(
      (edu): AIOptimizedEducation => ({
        degree: edu.degree,
        institution: edu.institution,
        period: edu.period,
        status: "Concluído",
        description: edu.description,
      })
    ),
    optimizedCertifications: data.certifications.map((cert) => ({
      name: cert.name,
      issuer: cert.issuer,
      date: cert.date,
    })),
    optimizedProjects: data.projects.map((proj) => ({
      name: proj.name,
      description: proj.description,
    })),
    languages: [
      { name: "Português", level: "Nativo" },
    ],
    additionalInfo:
      "Atuação abrangente em DevSecOps, desenvolvimento Mobile e Web, com formações contínuas em segurança cibernética e inteligência artificial.",
  };
}

// ─── Validação da resposta da IA ─────────────────────────────────────

function isValidAIResponse(obj: unknown): obj is AIResumeResponse {
  if (!obj || typeof obj !== "object") return false;
  const data = obj as Record<string, unknown>;

  return (
    typeof data.professionalSummary === "string" &&
    Array.isArray(data.technicalCompetencies) &&
    Array.isArray(data.optimizedExperiences) &&
    Array.isArray(data.optimizedEducation) &&
    Array.isArray(data.optimizedCertifications) &&
    Array.isArray(data.optimizedProjects) &&
    Array.isArray(data.languages) &&
    typeof data.additionalInfo === "string"
  );
}

// ─── Função principal exportada ──────────────────────────────────────

export async function generateResumeContent(
  data: ResumeInputData
): Promise<AIResumeResponse> {
  // Rate limiting
  const usageCount = parseInt(
    localStorage.getItem(STORAGE_KEY) || "0",
    10
  );

  if (usageCount >= getMaxGenerations()) {
    throw new Error("LIMIT_EXCEEDED");
  }

>>>>>>> 84d975c (feat: arquiteture)
  if (!ai) {
    console.warn("Sem chave do Gemini, retornando dados não alterados.");
    return buildFallback(data);
  }

<<<<<<< HEAD
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
=======
  const prompt = buildPrompt(data);
>>>>>>> 84d975c (feat: arquiteture)

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3.1-pro-preview",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
      },
    });

    if (response && response.text) {
<<<<<<< HEAD
      const result = JSON.parse(response.text);
      return result;
=======
      const parsed: unknown = JSON.parse(response.text);

      if (isValidAIResponse(parsed)) {
        localStorage.setItem(STORAGE_KEY, (usageCount + 1).toString());
        return parsed;
      }

      console.warn("Resposta da IA em formato inesperado, usando fallback.");
>>>>>>> 84d975c (feat: arquiteture)
    }
  } catch (error) {
    console.error("Erro ao gerar com IA:", error);
  }

<<<<<<< HEAD
function fallbackData(data: any) {
  return {
    professionalSummary: "Engenheiro de Software com ampla especialização em ecossistema Mobile (React Native, Flutter) e Web, com vivência arquitetando soluções pautadas na cultura DevSecOps, metodologias ágeis e integrações com IA. Focado na esteira de desenvolvimento segura através de ferramentas DAST/SAST, OWASP e otimização de performance técnica.",
    optimizedExperiences: data.experiences.map((exp: any) => ({
      ...exp,
      description: `• ${exp.description.split('. ').join('\n• ')}`
    })),
    optimizedProjects: data.projects
  };
=======
  // Fallback em caso de qualquer falha
  return buildFallback(data);
>>>>>>> 84d975c (feat: arquiteture)
}
