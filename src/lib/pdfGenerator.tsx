import React from 'react';
import { createRoot } from 'react-dom/client';
// @ts-ignore
import html2pdf from 'html2pdf.js';

function ResumeRenderer({ userProfile, resumeData }: { userProfile: any, resumeData: any }) {
  return (
    <div className="p-8 font-sans mx-auto box-border" style={{ backgroundColor: '#ffffff', color: '#0f172a', width: '210mm' }} id="cv-content">
      {/* Header */}
      <div className="border-b-2 pb-4 mb-4" style={{ borderColor: '#10b981' }}>
        <h1 className="text-4xl font-bold tracking-tight" style={{ color: '#0f172a' }}>{userProfile.name}</h1>
        <h2 className="text-xl font-medium mt-1" style={{ color: '#059669' }}>{userProfile.role}</h2>
        <div className="flex flex-wrap gap-x-4 gap-y-1 mt-3 text-sm" style={{ color: '#475569' }}>
          <p><span className="font-medium" style={{ color: '#0f172a' }}>Email:</span> {userProfile.email}</p>
          <p><span className="font-medium" style={{ color: '#0f172a' }}>LinkedIn:</span> {userProfile.linkedin.replace('https://www.', '')}</p>
          <p><span className="font-medium" style={{ color: '#0f172a' }}>GitHub:</span> {userProfile.github.replace('https://', '')}</p>
        </div>
      </div>

      {/* Summary */}
      <div className="mb-6">
        <h3 className="text-lg font-bold uppercase tracking-wider mb-2 border-b pb-1" style={{ color: '#0f172a', borderColor: '#e2e8f0' }}>Resumo Profissional</h3>
        <p className="text-sm leading-relaxed" style={{ color: '#334155' }}>{resumeData.professionalSummary}</p>
      </div>

      {/* Experience */}
      <div className="mb-6">
        <h3 className="text-lg font-bold uppercase tracking-wider mb-3 border-b pb-1" style={{ color: '#0f172a', borderColor: '#e2e8f0' }}>Experiência</h3>
        <div className="space-y-4">
          {resumeData.optimizedExperiences.map((exp: any, i: number) => (
            <div key={i}>
              <div className="flex justify-between items-baseline mb-1">
                <h4 className="font-bold text-base" style={{ color: '#0f172a' }}>{exp.role} <span className="font-normal" style={{ color: '#047857' }}>@ {exp.company}</span></h4>
                <span className="text-xs font-medium px-2 py-0.5 rounded" style={{ color: '#64748b', backgroundColor: '#f1f5f9' }}>{exp.period}</span>
              </div>
              <p className="text-sm leading-relaxed whitespace-pre-wrap" style={{ color: '#334155' }}>{exp.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Projects */}
      <div className="mb-6">
        <h3 className="text-lg font-bold uppercase tracking-wider mb-3 border-b pb-1" style={{ color: '#0f172a', borderColor: '#e2e8f0' }}>Projetos em Destaque</h3>
        <div className="grid grid-cols-2 gap-4">
          {resumeData.optimizedProjects.slice(0, 4).map((proj: any, i: number) => (
            <div key={i} className="border p-3 rounded-lg" style={{ borderColor: '#e2e8f0', backgroundColor: '#f8fafc' }}>
              <h4 className="font-bold text-sm mb-1" style={{ color: '#0f172a' }}>{proj.name}</h4>
              <p className="text-xs leading-relaxed" style={{ color: '#334155' }}>{proj.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Education & Tech grouped */}
      <div className="grid grid-cols-2 gap-6 mt-4">
        <div>
          <h3 className="text-lg font-bold uppercase tracking-wider mb-3 border-b pb-1" style={{ color: '#0f172a', borderColor: '#e2e8f0' }}>Formação & Certificações</h3>
          <div className="space-y-3">
            {userProfile.education.map((edu: any, i: number) => (
              <div key={i}>
                <h4 className="font-bold text-sm" style={{ color: '#0f172a' }}>{edu.degree}</h4>
                <p className="text-xs" style={{ color: '#475569' }}>{edu.institution} | {edu.period}</p>
              </div>
            ))}
            {userProfile.certifications.slice(0, 2).map((cert: any, i: number) => (
              <div key={i + 10}>
                <h4 className="font-bold text-sm" style={{ color: '#0f172a' }}>{cert.name}</h4>
                <p className="text-xs" style={{ color: '#475569' }}>{cert.issuer}</p>
              </div>
            ))}
          </div>
        </div>

        <div>
           <h3 className="text-lg font-bold uppercase tracking-wider mb-3 border-b pb-1" style={{ color: '#0f172a', borderColor: '#e2e8f0' }}>Hard Skills</h3>
           <div className="flex flex-wrap gap-1.5">
              {resumeData.tech && resumeData.tech.flatMap((cat: any) => cat.items).slice(0, 15).map((skill: string, i: number) => (
                 <span key={i} className="text-[11px] font-medium px-2 py-1 rounded" style={{ backgroundColor: '#e2e8f0', color: '#1e293b' }}>
                   {skill}
                 </span>
              ))}
           </div>
        </div>
      </div>
    </div>
  );
}

export async function generateResumePDF(userProfile: any, resumeData: any) {
  return new Promise<void>((resolve, reject) => {
    // Inject resume tech dynamically inside resumeData since it's used there
    resumeData.tech = userProfile.tech;
    
    // Create a hidden container
    const container = document.createElement('div');
    container.style.position = 'absolute';
    container.style.left = '-9999px';
    container.style.top = '-9999px';
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
        margin:       0,
        filename:     `${userProfile.name.replace(/\s+/g, "_")}_Curriculo.pdf`,
        image:        { type: 'jpeg' as const, quality: 0.98 },
        html2canvas:  { scale: 2, useCORS: true },
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
    }, 500);
  });
}
