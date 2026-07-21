import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

interface MarkdownRendererProps {
  content: string;
  className?: string;
  inline?: boolean;
}

export function MarkdownRenderer({ content, className = '', inline = false }: MarkdownRendererProps) {
  if (inline) {
    return (
      <span className={`inline-markdown ${className}`}>
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          components={{
            p: ({ children }) => <span className="inline">{children}</span>,
            a: ({ href, children }) => (
              <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-brand-secondary hover:text-brand-primary underline transition-colors"
                onClick={(e) => e.stopPropagation()}
              >
                {children}
              </a>
            ),
            strong: ({ children }) => <strong className="font-bold text-white">{children}</strong>,
            em: ({ children }) => <em className="italic">{children}</em>,
            code: ({ children }) => (
              <code className="px-1.5 py-0.5 bg-slate-800 rounded-md text-xs font-mono text-brand-secondary border border-white/5">
                {children}
              </code>
            ),
            h1: ({ children }) => <span className="font-bold">{children}</span>,
            h2: ({ children }) => <span className="font-bold">{children}</span>,
            h3: ({ children }) => <span className="font-bold">{children}</span>,
            h4: ({ children }) => <span className="font-bold">{children}</span>,
            ul: ({ children }) => <span className="inline gap-1"> {children}</span>,
            ol: ({ children }) => <span className="inline gap-1"> {children}</span>,
            li: ({ children }) => <span className="inline-block mx-1">• {children}</span>,
          }}
        >
          {content}
        </ReactMarkdown>
      </span>
    );
  }

  return (
    <div className={`prose-custom max-w-none text-slate-300 space-y-4 ${className}`}>
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          h1: ({ children }) => (
            <h1 className="text-3xl font-extrabold text-white mt-8 mb-4 border-b border-white/10 pb-2">
              {children}
            </h1>
          ),
          h2: ({ children }) => (
            <h2 className="text-2xl font-bold text-white mt-8 mb-4 border-b border-white/10 pb-2">
              {children}
            </h2>
          ),
          h3: ({ children }) => (
            <h3 className="text-xl font-bold text-white mt-6 mb-3">
              {children}
            </h3>
          ),
          h4: ({ children }) => (
            <h4 className="text-lg font-bold text-white mt-4 mb-2">
              {children}
            </h4>
          ),
          p: ({ children }) => (
            <p className="leading-relaxed mb-4 text-slate-300 text-sm md:text-base">
              {children}
            </p>
          ),
          strong: ({ children }) => (
            <strong className="font-bold text-white">{children}</strong>
          ),
          em: ({ children }) => (
            <em className="italic text-slate-200">{children}</em>
          ),
          a: ({ href, children }) => (
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-brand-secondary hover:text-brand-primary underline transition-colors font-medium"
              onClick={(e) => e.stopPropagation()}
            >
              {children}
            </a>
          ),
          ul: ({ children }) => (
            <ul className="list-disc pl-6 space-y-2 mb-4 text-slate-300 text-sm md:text-base">
              {children}
            </ul>
          ),
          ol: ({ children }) => (
            <ol className="list-decimal pl-6 space-y-2 mb-4 text-slate-300 text-sm md:text-base">
              {children}
            </ol>
          ),
          li: ({ children }) => (
            <li className="pl-1 text-slate-300">
              {children}
            </li>
          ),
          blockquote: ({ children }) => (
            <blockquote className="border-l-4 border-brand-primary bg-brand-primary/10 p-4 rounded-r-2xl italic my-6 text-slate-200">
              {children}
            </blockquote>
          ),
          code: ({ className, children, ...props }) => {
            const match = /language-(\w+)/.exec(className || '');
            const isInline = !match;
            return isInline ? (
              <code className="px-1.5 py-0.5 bg-slate-800 rounded-md text-xs font-mono text-brand-secondary border border-white/5" {...props}>
                {children}
              </code>
            ) : (
              <div className="relative my-6 rounded-xl border border-white/10 overflow-hidden bg-slate-900/50">
                <div className="flex items-center justify-between px-4 py-1.5 bg-[#030712] border-b border-white/10 text-[10px] font-mono text-slate-400">
                  <span>{match[1].toUpperCase()}</span>
                </div>
                <pre className="p-4 overflow-x-auto text-xs font-mono text-slate-300 leading-relaxed scrollbar-thin">
                  <code {...props}>{children}</code>
                </pre>
              </div>
            );
          },
          table: ({ children }) => (
            <div className="overflow-x-auto my-6 rounded-xl border border-white/10">
              <table className="min-w-full divide-y divide-white/10">
                {children}
              </table>
            </div>
          ),
          thead: ({ children }) => (
            <thead className="bg-[#030712]/50 text-white">
              {children}
            </thead>
          ),
          tbody: ({ children }) => (
            <tbody className="divide-y divide-white/5">
              {children}
            </tbody>
          ),
          tr: ({ children }) => (
            <tr className="hover:bg-white/[0.01] transition-colors">
              {children}
            </tr>
          ),
          th: ({ children }) => (
            <th className="px-4 py-3 text-left text-xs font-bold uppercase tracking-wider text-slate-300">
              {children}
            </th>
          ),
          td: ({ children }) => (
            <td className="px-4 py-3 text-sm text-slate-400 leading-normal">
              {children}
            </td>
          ),
          img: ({ src, alt }) => (
            <div className="my-8 rounded-xl overflow-hidden border border-slate-700/50">
              <img 
                src={src} 
                alt={alt} 
                referrerPolicy="no-referrer"
                className="w-full object-cover max-h-80"
              />
              {alt && (
                <div className="p-4 bg-slate-800/30 text-sm text-center text-slate-400">
                  {alt}
                </div>
              )}
            </div>
          ),
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
