import React from "react";
import type {
  UserProfile,
  AIResumeResponse,
  AIOptimizedExperience,
  AIOptimizedEducation,
  AIOptimizedCertification,
  AIOptimizedProject,
  AILanguage,
} from "../types/resumeTypes";

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
      </div>
    </div>
  );
}

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
    // Container offscreen para renderização
    const container = document.createElement("div");
    container.style.position = "absolute";
    container.style.left = "-9999px";
    container.style.top = "-9999px";
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
  });
}
