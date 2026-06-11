/**
 * Tipos centralizados para o fluxo de geração de currículo.
 * Garante tipagem forte em todo o pipeline: dados → IA → PDF.
 */

import type { Experience, Education, Certification, Project, TechCategory } from '../constants';

// ─── Dados enviados para a IA ────────────────────────────────────────

export interface ResumeInputData {
  name: string;
  role: string;
  experiences: Experience[];
  projects: Project[];
  education: Education[];
  certifications: Certification[];
  tech: TechCategory[];
}

// ─── Resposta da IA ──────────────────────────────────────────────────

export interface AIOptimizedExperience {
  company: string;
  role: string;
  period: string;
  highlights: string[];
}

export interface AIOptimizedEducation {
  degree: string;
  institution: string;
  period: string;
  status: string;
  description: string;
}

export interface AIOptimizedProject {
  name: string;
  description: string;
}

export interface AIOptimizedCertification {
  name: string;
  issuer: string;
  date: string;
}

export interface AILanguage {
  name: string;
  level: string;
}

export interface AIResumeResponse {
  professionalSummary: string;
  technicalCompetencies: string[];
  optimizedExperiences: AIOptimizedExperience[];
  optimizedEducation: AIOptimizedEducation[];
  optimizedCertifications: AIOptimizedCertification[];
  optimizedProjects: AIOptimizedProject[];
  languages: AILanguage[];
  additionalInfo: string;
}

// ─── Perfil do usuário para o PDF ────────────────────────────────────

export interface UserProfile {
  name: string;
  role: string;
  email: string;
  phone: string;
  location: string;
  github: string;
  linkedin: string;
}

// ─── Dados consolidados para renderização do PDF ─────────────────────

export interface ResumeRenderData {
  userProfile: UserProfile;
  aiContent: AIResumeResponse;
}
