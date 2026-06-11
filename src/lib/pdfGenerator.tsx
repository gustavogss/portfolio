<<<<<<< HEAD
import React from 'react';
=======
import React from "react";
import { createRoot } from "react-dom/client";
// @ts-ignore
import html2pdf from "html2pdf.js";
import type {
  UserProfile,
  AIResumeResponse,
  AIOptimizedExperience,
  AIOptimizedEducation,
  AIOptimizedCertification,
  AIOptimizedProject,
  AILanguage,
} from "../types/resumeTypes";
>>>>>>> 84d975c (feat: arquiteture)

// ─── Estilos reutilizáveis (inline para funcionar no container offscreen) ──

const STYLES = {
  page: {
    backgroundColor: "#ffffff",
    color: "#1a1a1a",
    fontFamily: "'Segoe UI', 'Helvetica Neue', Arial, sans-serif",
    fontSize: "11px",
    lineHeight: "1.5",
    width: "190mm",
    maxWidth: "190mm",
    margin: "0 auto",
    padding: "0",
    boxSizing: "border-box" as const,
  },
  sectionTitle: {
    fontSize: "13px",
    fontWeight: 700,
    color: "#1a1a1a",
    textTransform: "uppercase" as const,
    letterSpacing: "1.5px",
    borderBottom: "2px solid #4a2d8a",
    paddingBottom: "4px",
    marginBottom: "10px",
    marginTop: "16px",
  },
  subTitle: {
    fontSize: "12px",
    fontWeight: 600,
    color: "#1a1a1a",
    margin: "0 0 2px 0",
  },
  meta: {
    fontSize: "10px",
    color: "#555555",
    margin: "0 0 4px 0",
  },
  body: {
    fontSize: "10.5px",
    color: "#333333",
    margin: "4px 0 0 0",
    lineHeight: "1.55",
  },
  badge: {
    display: "inline-block",
    fontSize: "9.5px",
    fontWeight: 600,
    color: "#4a2d8a",
    backgroundColor: "#f0ebf8",
    padding: "3px 10px",
    borderRadius: "4px",
    margin: "2px 4px 2px 0",
    border: "1px solid #e0d5f0",
  },
  bulletList: {
    margin: "4px 0 0 0",
    paddingLeft: "18px",
    listStyleType: "disc" as const,
  },
  bulletItem: {
    fontSize: "10.5px",
    color: "#333333",
    lineHeight: "1.5",
    marginBottom: "2px",
  },
  avoidBreak: {
    pageBreakInside: "avoid" as const,
    breakInside: "avoid" as const,
  },
};

// ─── Header do currículo ─────────────────────────────────────────────

function HeaderSection({ profile }: { profile: UserProfile }) {
  return (
<<<<<<< HEAD
    <div style={{ backgroundColor: '#ffffff', color: '#0f172a', width: '100%', fontFamily: 'Inter, sans-serif', boxSizing: 'border-box' }} id="cv-content">
      {/* Header */}
      <div style={{ borderBottom: '2px solid #10b981', paddingBottom: '20px', marginBottom: '24px' }}>
        <h1 style={{ fontSize: '36px', fontWeight: 'bold', letterSpacing: '-0.025em', marginBottom: '4px', color: '#0f172a' }}>{userProfile.name}</h1>
        <h2 style={{ fontSize: '20px', fontWeight: 500, color: '#059669' }}>{userProfile.role}</h2>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '24px', marginTop: '16px', fontSize: '13px', color: '#475569' }}>
          <p><span style={{ fontWeight: 600, color: '#0f172a' }}>Email:</span> {userProfile.email}</p>
          <p><span style={{ fontWeight: 600, color: '#0f172a' }}>LinkedIn:</span> {userProfile.linkedin.replace('https://www.', '')}</p>
          <p><span style={{ fontWeight: 600, color: '#0f172a' }}>GitHub:</span> {userProfile.github.replace('https://', '')}</p>
        </div>
      </div>

      {/* Summary */}
      <div style={{ marginBottom: '32px' }}>
        <h3 style={{ fontSize: '16px', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '12px', borderBottom: '1px solid #e2e8f0', paddingBottom: '6px', color: '#0f172a' }}>Resumo Profissional</h3>
        <p style={{ fontSize: '14px', lineHeight: 1.6, textAlign: 'justify', color: '#334155' }}>{resumeData.professionalSummary}</p>
      </div>

      {/* Experience */}
      <div style={{ marginBottom: '32px' }}>
        <h3 style={{ fontSize: '16px', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '16px', borderBottom: '1px solid #e2e8f0', paddingBottom: '6px', color: '#0f172a' }}>Experiência Profissional</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          {resumeData.optimizedExperiences?.map((exp: any, i: number) => (
            <div key={i} style={{ breakInside: 'avoid' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '8px' }}>
                <h4 style={{ fontSize: '15px', fontWeight: 'bold', color: '#0f172a' }}>{exp.role} <span style={{ fontWeight: 'normal', color: '#047857' }}>@ {exp.company}</span></h4>
                <span style={{ fontSize: '11px', fontWeight: 600, padding: '4px 10px', borderRadius: '9999px', border: '1px solid #e2e8f0', color: '#475569', backgroundColor: '#f1f5f9' }}>{exp.period}</span>
              </div>
              <p style={{ fontSize: '13.5px', lineHeight: 1.6, whiteSpace: 'pre-wrap', color: '#334155' }}>{exp.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Projects */}
      <div style={{ marginBottom: '32px' }}>
        <h3 style={{ fontSize: '16px', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '16px', borderBottom: '1px solid #e2e8f0', paddingBottom: '6px', color: '#0f172a' }}>Projetos em Destaque</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          {resumeData.optimizedProjects?.slice(0, 5).map((proj: any, i: number) => (
            <div key={i} style={{ breakInside: 'avoid' }}>
              <h4 style={{ fontSize: '14px', fontWeight: 'bold', marginBottom: '4px', color: '#0f172a' }}>{proj.name}</h4>
              <p style={{ fontSize: '13.5px', lineHeight: 1.6, textAlign: 'justify', color: '#334155' }}>{proj.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Education */}
      <div style={{ marginBottom: '32px' }}>
        <h3 style={{ fontSize: '16px', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '16px', borderBottom: '1px solid #e2e8f0', paddingBottom: '6px', color: '#0f172a' }}>Formação Acadêmica</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, minmax(0, 1fr))', gap: '16px 40px' }}>
          {userProfile.education?.map((edu: any, i: number) => {
            const isCurrentYear = edu.period?.includes('2026') || edu.period?.toLowerCase().includes('presente');
            return (
              <div key={i} style={{ breakInside: 'avoid' }}>
                <h4 style={{ fontSize: '14px', fontWeight: 'bold', color: '#0f172a' }}>
                  {edu.degree} {isCurrentYear && <span style={{ fontSize: '10px', color: '#059669', fontStyle: 'italic', fontWeight: 600 }}>(Em formação)</span>}
                </h4>
                <p style={{ fontSize: '12px', fontWeight: 600, marginTop: '2px', color: '#059669' }}>{edu.period}</p>
                <p style={{ fontSize: '12px', color: '#1e293b', fontWeight: 500 }}>{edu.institution}</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Certifications */}
      <div style={{ marginBottom: '32px' }}>
        <h3 style={{ fontSize: '16px', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '16px', borderBottom: '1px solid #e2e8f0', paddingBottom: '6px', color: '#0f172a' }}>Certificações</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, minmax(0, 1fr))', gap: '12px 40px' }}>
          {userProfile.certifications?.slice(0, 10).map((cert: any, i: number) => {
            const isCurrentYear = cert.date?.includes('2026') || cert.date?.toLowerCase().includes('presente');
            return (
              <div key={i} style={{ breakInside: 'avoid' }}>
                <h4 style={{ fontSize: '13px', fontWeight: 'bold', lineHeight: 1.2, color: '#0f172a' }}>
                  {cert.name} {isCurrentYear && <span style={{ fontSize: '9px', color: '#059669', fontStyle: 'italic', fontWeight: 600 }}>(Especializando-se)</span>}
                </h4>
                <p style={{ fontSize: '11.5px', marginTop: '2px', color: '#1e293b', fontWeight: 500 }}>{cert.issuer} • {cert.date}</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Technologies */}
      <div style={{ pageBreakInside: 'auto' }}>
        <h3 style={{ fontSize: '16px', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '16px', borderBottom: '1px solid #e2e8f0', paddingBottom: '6px', color: '#0f172a' }}>Tecnologias</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, minmax(0, 1fr))', gap: '20px 40px' }}>
          {[
            { 
              label: 'Frontend', 
              items: userProfile.techCategories?.find((c: any) => c.title.includes('Frontend'))?.items || [] 
            },
            { 
              label: 'Backend', 
              items: userProfile.techCategories?.find((c: any) => c.title.includes('Backend'))?.items || [] 
            },
            { 
              label: 'Metodologias', 
              items: userProfile.techCategories?.find((c: any) => c.title.includes('Metodologias'))?.items || [] 
            },
            { 
              label: 'DevSecOps', 
              items: [
                ...(userProfile.techCategories?.find((c: any) => c.title.includes('DevSecOps'))?.items || []),
                ...(userProfile.techCategories?.find((c: any) => c.title.includes('Segurança'))?.items || [])
              ].slice(0, 12)
            },
            { 
              label: 'Automação & IA', 
              items: userProfile.techCategories?.find((c: any) => c.title.includes('IA'))?.items || [] 
            }
          ].filter(cat => cat.items && cat.items.length > 0).map((cat, i) => (
            <div key={i} style={{ breakInside: 'avoid', marginBottom: '20px' }}>
              <h4 style={{ fontSize: '12px', fontWeight: 'bold', marginBottom: '8px', textTransform: 'uppercase', color: '#059669', borderLeft: '3px solid #10b981', paddingLeft: '8px' }}>{cat.label}</h4>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '4px' }}>
                {cat.items.map((item: string, j: number) => (
                  <li key={j} style={{ fontSize: '11.5px', fontWeight: 500, display: 'flex', alignItems: 'flex-start', gap: '8px', color: '#0f172a', lineHeight: 1.4 }}>
                    <span style={{ width: '4.5px', height: '4.5px', borderRadius: '50%', flexShrink: 0, backgroundColor: '#10b981', marginTop: '6px' }} />
                    <span style={{ color: '#0f172a' }}>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
=======
    <div
      style={{
        textAlign: "center",
        paddingBottom: "10px",
        borderBottom: "3px solid #4a2d8a",
        marginBottom: "4px",
      }}
    >
      <h1
        style={{
          fontSize: "24px",
          fontWeight: 700,
          color: "#1a1a1a",
          margin: "0 0 2px 0",
          letterSpacing: "1px",
        }}
      >
        {profile.name}
      </h1>
      <p
        style={{
          fontSize: "13px",
          fontWeight: 500,
          color: "#4a2d8a",
          margin: "0 0 8px 0",
        }}
      >
        {profile.role}
      </p>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          flexWrap: "wrap",
          gap: "6px 16px",
          fontSize: "10px",
          color: "#555555",
        }}
      >
        {profile.location && <span>📍 {profile.location}</span>}
        <span>✉️ {profile.email}</span>
        {profile.phone && <span>📱 {profile.phone}</span>}
        <span>🔗 {profile.linkedin.replace("https://www.", "")}</span>
        <span>💻 {profile.github.replace("https://", "")}</span>
>>>>>>> 84d975c (feat: arquiteture)
      </div>
    </div>
  );
}

<<<<<<< HEAD
export async function generateResumePDF(userProfile: any, resumeData: any) {
  // Dynamic imports to reduce initial bundle size drastically
  const [
    { createRoot },
    html2pdfModule
  ] = await Promise.all([
    import('react-dom/client'),
    // @ts-ignore
    import('html2pdf.js')
  ]);
  
  const html2pdf = html2pdfModule.default;

  return new Promise<void>((resolve, reject) => {
    // Create a hidden container
    const container = document.createElement('div');
    container.style.position = 'absolute';
    container.style.left = '-9999px';
    container.style.top = '-9999px';
    container.style.width = '210mm'; // Standard A4 width
=======
// ─── Resumo profissional ─────────────────────────────────────────────

function SummarySection({ summary }: { summary: string }) {
  return (
    <div style={STYLES.avoidBreak}>
      <h2 style={STYLES.sectionTitle}>Resumo Profissional</h2>
      <p style={STYLES.body}>{summary}</p>
    </div>
  );
}

// ─── Competências técnicas ───────────────────────────────────────────

function CompetenciesSection({
  competencies,
}: {
  competencies: string[];
}) {
  return (
    <div style={STYLES.avoidBreak}>
      <h2 style={STYLES.sectionTitle}>Competências Técnicas</h2>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "0" }}>
        {competencies.map((skill, i) => (
          <span key={i} style={STYLES.badge}>
            {skill}
          </span>
        ))}
      </div>
    </div>
  );
}

// ─── Experiência profissional ────────────────────────────────────────

function ExperienceSection({
  experiences,
}: {
  experiences: AIOptimizedExperience[];
}) {
  return (
    <div>
      <h2 style={STYLES.sectionTitle}>Experiência Profissional</h2>
      {experiences.map((exp, i) => (
        <div key={i} style={{ ...STYLES.avoidBreak, marginBottom: "10px" }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "baseline",
            }}
          >
            <p style={STYLES.subTitle}>
              {exp.role}{" "}
              <span style={{ fontWeight: 400, color: "#4a2d8a" }}>
                — {exp.company}
              </span>
            </p>
            <span
              style={{
                fontSize: "10px",
                color: "#777777",
                whiteSpace: "nowrap",
                marginLeft: "8px",
              }}
            >
              {exp.period}
            </span>
          </div>
          <ul style={STYLES.bulletList}>
            {exp.highlights.map((h, j) => (
              <li key={j} style={STYLES.bulletItem}>
                {h}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

// ─── Formação acadêmica ──────────────────────────────────────────────

function EducationSection({
  education,
}: {
  education: AIOptimizedEducation[];
}) {
  return (
    <div>
      <h2 style={STYLES.sectionTitle}>Formação Acadêmica</h2>
      {education.map((edu, i) => (
        <div key={i} style={{ ...STYLES.avoidBreak, marginBottom: "10px" }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "baseline",
            }}
          >
            <p style={STYLES.subTitle}>{edu.degree}</p>
            <span
              style={{
                fontSize: "10px",
                color: "#777777",
                whiteSpace: "nowrap",
                marginLeft: "8px",
              }}
            >
              {edu.period}
              {edu.status && ` · ${edu.status}`}
            </span>
          </div>
          <p style={STYLES.meta}>{edu.institution}</p>
          <p style={STYLES.body}>{edu.description}</p>
        </div>
      ))}
    </div>
  );
}

// ─── Certificações ───────────────────────────────────────────────────

function CertificationsSection({
  certifications,
}: {
  certifications: AIOptimizedCertification[];
}) {
  return (
    <div style={STYLES.avoidBreak}>
      <h2 style={STYLES.sectionTitle}>Certificações</h2>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "4px 20px",
        }}
      >
        {certifications.map((cert, i) => (
          <div key={i} style={{ marginBottom: "4px" }}>
            <p
              style={{
                ...STYLES.subTitle,
                fontSize: "10.5px",
                marginBottom: "0",
              }}
            >
              {cert.name}
            </p>
            <p style={{ ...STYLES.meta, fontSize: "9.5px" }}>
              {cert.issuer} · {cert.date}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Projetos ────────────────────────────────────────────────────────

function ProjectsSection({
  projects,
}: {
  projects: AIOptimizedProject[];
}) {
  return (
    <div style={STYLES.avoidBreak}>
      <h2 style={STYLES.sectionTitle}>Projetos em Destaque</h2>
      {projects.map((proj, i) => (
        <div key={i} style={{ marginBottom: "6px" }}>
          <p style={{ ...STYLES.subTitle, fontSize: "10.5px" }}>
            {proj.name}
          </p>
          <p style={{ ...STYLES.body, fontSize: "10px", margin: "0" }}>
            {proj.description}
          </p>
        </div>
      ))}
    </div>
  );
}

// ─── Idiomas ─────────────────────────────────────────────────────────

function LanguagesSection({ languages }: { languages: AILanguage[] }) {
  return (
    <div style={STYLES.avoidBreak}>
      <h2 style={STYLES.sectionTitle}>Idiomas</h2>
      <div style={{ display: "flex", gap: "20px" }}>
        {languages.map((lang, i) => (
          <p key={i} style={STYLES.body}>
            <strong>{lang.name}:</strong> {lang.level}
          </p>
        ))}
      </div>
    </div>
  );
}

// ─── Informações complementares ──────────────────────────────────────

function AdditionalInfoSection({ info }: { info: string }) {
  if (!info) return null;
  return (
    <div style={STYLES.avoidBreak}>
      <h2 style={STYLES.sectionTitle}>Objetivo Profissional</h2>
      <p style={STYLES.body}>{info}</p>
    </div>
  );
}

// ─── Componente principal do currículo ────────────────────────────────

function ResumeRenderer({
  userProfile,
  resumeData,
}: {
  userProfile: UserProfile;
  resumeData: AIResumeResponse;
}) {
  return (
    <div style={STYLES.page} id="cv-content">
      <HeaderSection profile={userProfile} />
      <SummarySection summary={resumeData.professionalSummary} />
      <CompetenciesSection competencies={resumeData.technicalCompetencies} />
      <ExperienceSection experiences={resumeData.optimizedExperiences} />
      <EducationSection education={resumeData.optimizedEducation} />
      <CertificationsSection
        certifications={resumeData.optimizedCertifications}
      />
      <ProjectsSection projects={resumeData.optimizedProjects} />
      <LanguagesSection languages={resumeData.languages} />
      <AdditionalInfoSection info={resumeData.additionalInfo} />
    </div>
  );
}

// ─── Geração do PDF ──────────────────────────────────────────────────

export async function generateResumePDF(
  userProfile: UserProfile,
  resumeData: AIResumeResponse
): Promise<void> {
  return new Promise<void>((resolve, reject) => {
    // Container offscreen para renderização
    const container = document.createElement("div");
    container.style.position = "absolute";
    container.style.left = "-9999px";
    container.style.top = "-9999px";
>>>>>>> 84d975c (feat: arquiteture)
    document.body.appendChild(container);

    const root = createRoot(container);
    root.render(
      <ResumeRenderer userProfile={userProfile} resumeData={resumeData} />
    );

    // Aguarda o ciclo de renderização do React completar
    setTimeout(() => {
      const element = container.querySelector("#cv-content") as HTMLElement;
      if (!element) {
        root.unmount();
        document.body.removeChild(container);
        reject(new Error("Falha ao renderizar o template do currículo."));
        return;
      }

      const safeFilename = userProfile.name
        .replace(/[^a-zA-Z0-9\s]/g, "")
        .replace(/\s+/g, "_");

      const opt = {
<<<<<<< HEAD
        margin:       [15, 15, 15, 15] as [number, number, number, number],
        filename:     `${userProfile.name.replace(/\s+/g, "_")}_Curriculo.pdf`,
        image:        { type: 'jpeg' as const, quality: 1.0 },
        html2canvas:  { scale: 2, useCORS: true, logging: false, letterRendering: true },
        jsPDF:        { unit: 'mm', format: 'a4', orientation: 'portrait' as const }
      };

      html2pdf().set(opt).from(element).save().then(() => {
        root.unmount();
        document.body.removeChild(container);
        resolve();
      }).catch((err: any) => {
        console.error("PDF generation error: ", err);
        root.unmount();
        document.body.removeChild(container);
        reject(err);
      });
    }, 800);
=======
        margin: [10, 10, 10, 10] as [number, number, number, number],
        filename: `${safeFilename}_Curriculo.pdf`,
        image: { type: "jpeg" as const, quality: 0.98 },
        html2canvas: {
          scale: 2,
          useCORS: true,
          letterRendering: true,
        },
        jsPDF: {
          unit: "mm" as const,
          format: "a4" as const,
          orientation: "portrait" as const,
        },
        pagebreak: {
          mode: "css",
        },
      };

      html2pdf()
        .set(opt)
        .from(element)
        .save()
        .then(() => {
          root.unmount();
          document.body.removeChild(container);
          resolve();
        })
        .catch((err: Error) => {
          console.error("Erro na geração do PDF:", err);
          root.unmount();
          document.body.removeChild(container);
          reject(err);
        });
    }, 600);
>>>>>>> 84d975c (feat: arquiteture)
  });
}
