import React from 'react';
import { createRoot } from 'react-dom/client';

function ResumeRenderer({ userProfile, resumeData }: { userProfile: any, resumeData: any }) {
  return (
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
      </div>
    </div>
  );
}

export async function generateResumePDF(userProfile: any, resumeData: any) {
  // Dynamic import to reduce initial bundle size
  // @ts-ignore
  const html2pdf = (await import('html2pdf.js')).default;

  return new Promise<void>((resolve, reject) => {
    // Create a hidden container
    const container = document.createElement('div');
    container.style.position = 'absolute';
    container.style.left = '-9999px';
    container.style.top = '-9999px';
    container.style.width = '210mm'; // Standard A4 width
    document.body.appendChild(container);

    const root = createRoot(container);
    root.render(<ResumeRenderer userProfile={userProfile} resumeData={resumeData} />);

    // Wait slightly to ensure React rendering cycle completes
    setTimeout(() => {
      const element = container.querySelector('#cv-content') as HTMLElement;
      if (!element) {
        reject(new Error("Failed to render CV template"));
        return;
      }

      const opt = {
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
  });
}
