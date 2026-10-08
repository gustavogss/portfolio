import React, { useEffect } from 'react';
import { motion } from 'motion/react';
import { ChevronLeft, Share2, Github, ExternalLink, Smartphone, CheckCircle2, ArrowRight, ShieldCheck, Zap } from 'lucide-react';
import { BLOG_POSTS } from '../constants';
import { MarkdownRenderer } from './MarkdownRenderer';

interface BlogPostSectionProps {
  postId: string;
  onBack: () => void;
}

export function BlogPostSection({ postId, onBack }: BlogPostSectionProps) {
  const post = BLOG_POSTS.find((p) => p.id === postId);

  useEffect(() => {
    if (post) {
      document.title = `${post.title} | Gustavo Souza`;
      const metaDescription = document.querySelector('meta[name="description"]');
      if (metaDescription) {
        metaDescription.setAttribute('content', post.summary);
      }
      
      // Update OG Tags
      const ogTitle = document.querySelector('meta[property="og:title"]');
      if (ogTitle) ogTitle.setAttribute('content', `${post.title} | Gustavo Souza`);
      
      const ogDesc = document.querySelector('meta[property="og:description"]');
      if (ogDesc) ogDesc.setAttribute('content', post.summary);

      const ogImage = document.querySelector('meta[property="og:image"]');
      if (ogImage) ogImage.setAttribute('content', post.imageUrl);
    }
  }, [post]);

  if (!post) {
    return (
      <div className="text-center text-white py-12">
        <h2 className="text-2xl font-bold">Artigo não encontrado</h2>
        <button 
          onClick={onBack}
          className="mt-4 px-6 py-2 bg-slate-800 hover:bg-brand-primary rounded-xl transition-colors"
        >
          Voltar para o blog
        </button>
      </div>
    );
  }

  const currentUrl = typeof window !== 'undefined' ? window.location.href : 'https://gustavosouza.dev.br/blog';
  
  const shareLinks = {
    whatsapp: `https://wa.me/?text=${encodeURIComponent(`${post.title} - ${currentUrl}`)}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(currentUrl)}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(currentUrl)}`
  };

  return (
    <motion.article 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-4xl mx-auto pb-12 px-4 sm:px-6 md:px-8 w-full overflow-hidden break-words"
    >
      <button 
        onClick={onBack}
        className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors mb-8"
      >
        <ChevronLeft className="w-4 h-4" />
        <span>Voltar para o blog</span>
      </button>

      <div className="rounded-3xl overflow-hidden mb-12 relative h-[300px] md:h-[400px]">
        <div className="absolute inset-0 bg-black/50 z-10" />
        <img 
          src={post.imageUrl} 
          alt={post.title} 
          className="w-full h-full object-cover"
        />
        <div className="absolute bottom-0 left-0 p-8 z-20 w-full">
          <div className="flex items-center gap-3 mb-4">
            <span className="px-3 py-1 bg-brand-primary text-white text-xs font-bold uppercase rounded-lg">
              {post.category}
            </span>
            <span className="text-slate-300 text-sm font-medium">
              {post.date}
            </span>
          </div>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight font-display mb-4">
            {post.title}
          </h1>
        </div>
      </div>

      {post.id === 'site-para-app' ? (
        <BlogContentSiteToApp />
      ) : post.id === 'm1' ? (
        <BlogContentMagento />
      ) : post.id === 'm2' ? (
        <BlogContentIos />
      ) : post.id === 'ai1' ? (
        <BlogContentVibecoding />
      ) : post.id === 'vibe-agents' ? (
        <BlogContentVibeAgents />
      ) : post.id === '2' ? (
        <BlogContentSecurity />
      ) : post.content ? (
        <MarkdownRenderer content={post.content} />
      ) : (
        <div className="prose prose-invert prose-brand max-w-none prose-lg">
          <p className="text-xl text-slate-300 leading-relaxed">
            {post.summary}
          </p>
          <div className="mt-8 p-6 bg-slate-800/50 rounded-2xl border border-slate-700">
            <p className="text-slate-400 text-center">Conteúdo completo em breve.</p>
          </div>
        </div>
      )}

      <div className="mt-16 pt-8 border-t border-slate-800">
        <h3 className="text-white font-bold text-xl mb-6 text-center">E aí, gostou do conteúdo? Compartilhe 👇</h3>
        <div className="flex flex-wrap justify-center gap-3 md:gap-4">
          <a 
            href={shareLinks.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-6 py-3 bg-[#25D366]/10 text-[#25D366] hover:bg-[#25D366] hover:text-white rounded-xl transition-all font-bold"
          >
            WhatsApp
          </a>
          <a 
            href={shareLinks.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-6 py-3 bg-[#0A66C2]/10 text-[#0A66C2] hover:bg-[#0A66C2] hover:text-white rounded-xl transition-all font-bold"
          >
            LinkedIn
          </a>
          <a 
            href={shareLinks.facebook}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-6 py-3 bg-[#1877F2]/10 text-[#1877F2] hover:bg-[#1877F2] hover:text-white rounded-xl transition-all font-bold"
          >
            Facebook
          </a>
        </div>
      </div>
    </motion.article>
  );
}

function BlogContentMagento() {
  return (
    <div className="prose prose-invert prose-brand max-w-none prose-lg font-sans text-slate-300">
      <p className="text-xl text-slate-200 leading-relaxed mb-8">
        Se você já tentou estudar Magento 2, sabe que o maior desafio não é o código — é a infraestrutura.
      </p>

      <p className="mb-8">
        Magento exige uma stack robusta: PHP, MySQL, Elasticsearch, Redis, Nginx… e tudo isso com bastante memória. Não é à toa que hospedagens compartilhadas não são recomendadas para esse tipo de aplicação.
      </p>

      <p className="mb-12">
        Pensando nisso, criei uma solução simples para quem quer estudar Magento 2 sem gastar com servidores.
      </p>

      <h2 className="text-2xl font-bold text-white mt-12 mb-6 border-b border-white/10 pb-4">A solução</h2>
      <p className="mb-8">
        Você pode encontrar o projeto completo e as instruções detalhadas no repositório abaixo:
      </p>
      <a 
        href="https://github.com/gustavogss/magento2-docker/tree/6b3d6509abd245554dc14e68cbd7aa0a83877002" 
        target="_blank" 
        rel="noopener noreferrer"
        className="block p-6 bg-slate-800/50 hover:bg-slate-800 border border-slate-700 hover:border-brand-primary rounded-2xl transition-all break-all text-brand-primary font-medium text-center mb-12"
      >
        Projeto Magento2-Docker no GitHub
      </a>

      <h2 className="text-2xl font-bold text-white mt-12 mb-6 border-b border-white/10 pb-4">O que essa solução resolve</h2>
      <ul className="space-y-3 mb-12 list-disc pl-6">
        <li><strong>Evita custos</strong> com VPS ou cloud</li>
        <li><strong>Elimina problemas</strong> de configuração manual</li>
        <li><strong>Padroniza</strong> o ambiente para a equipe</li>
        <li>Permite <strong>estudar Magento</strong> de forma prática e rápida</li>
      </ul>

      <h2 className="text-2xl font-bold text-white mt-12 mb-6 border-b border-white/10 pb-4">O que tem por trás</h2>
      <div className="flex flex-wrap gap-3 mb-12">
        {['PHP', 'MySQL', 'Nginx', 'Redis', 'Elasticsearch'].map((tech) => (
          <span key={tech} className="px-4 py-2 bg-[#212121] border border-slate-700 rounded-lg text-white font-medium">
            {tech}
          </span>
        ))}
      </div>

      <h2 className="text-2xl font-bold text-white mt-12 mb-6 border-b border-white/10 pb-4">Por que usar Docker?</h2>
      <ul className="space-y-4 mb-12">
        <li className="flex flex-col">
          <strong className="text-white">Isolamento</strong>
          <span className="text-slate-400 text-base">Não polui sua máquina com dezenas de dependências que podem quebrar.</span>
        </li>
        <li className="flex flex-col">
          <strong className="text-white">Reprodutibilidade</strong>
          <span className="text-slate-400 text-base">Funciona na minha máquina, e vai funcionar na sua também, graças aos containers.</span>
        </li>
        <li className="flex flex-col">
          <strong className="text-white">Facilidade de setup</strong>
          <span className="text-slate-400 text-base">Com poucos comandos (como docker-compose up) você levanta toda a infraestrutura complexa necessária.</span>
        </li>
      </ul>

      <h2 className="text-2xl font-bold text-white mt-12 mb-6 border-b border-white/10 pb-4">Para quem é?</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-12">
        <div className="p-4 bg-slate-800/30 rounded-xl border border-slate-700/50 flex items-center gap-3">
          <div className="w-2 h-2 rounded-full bg-brand-primary" /> Iniciantes
        </div>
        <div className="p-4 bg-slate-800/30 rounded-xl border border-slate-700/50 flex items-center gap-3">
          <div className="w-2 h-2 rounded-full bg-brand-primary" /> Devs estudando Magento
        </div>
        <div className="p-4 bg-slate-800/30 rounded-xl border border-slate-700/50 flex items-center gap-3">
          <div className="w-2 h-2 rounded-full bg-brand-primary" /> Estudantes de TI
        </div>
        <div className="p-4 bg-slate-800/30 rounded-xl border border-slate-700/50 flex items-center gap-3">
          <div className="w-2 h-2 rounded-full bg-brand-primary" /> Pessoas sem infraestrutura
        </div>
      </div>

      <h2 className="text-2xl font-bold text-white mt-12 mb-6 border-b border-white/10 pb-4">Como começar</h2>
      <ol className="list-decimal pl-6 space-y-4 mb-12 marker:text-brand-primary marker:font-bold">
        <li className="pl-2">Clone o repositório</li>
        <li className="pl-2">Suba os containers (<code>docker-compose up -d</code>)</li>
        <li className="pl-2">Acesse o Magento no seu navegador</li>
        <li className="pl-2">Comece a estudar!</li>
      </ol>

      <h2 className="text-2xl font-bold text-white mt-12 mb-6 border-b border-white/10 pb-4">Conclusão</h2>
      <p className="text-xl p-6 bg-brand-primary/10 border-l-4 border-brand-primary rounded-r-2xl italic text-slate-200">
        Magento é complexo, mas com Docker fica acessível e gratuito. Aproveite!
      </p>

      <div className="mt-12 pt-8 flex flex-wrap gap-2">
        {['#Magento2', '#Docker', '#Ecommerce', '#PHP', '#DevOps', '#WebDevelopment', '#Backend'].map((tag) => (
          <span key={tag} className="text-sm font-medium text-brand-primary/60">
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
}

function BlogContentSecurity() {
  return (
    <div className="prose prose-invert prose-brand max-w-none prose-lg font-sans text-slate-300">
      <p className="text-xl text-slate-200 leading-relaxed mb-8">
        Quando falamos sobre desenvolvimento de software, a segurança muitas vezes é deixada para a reta final do projeto. O resultado? Deploys que se tornam verdadeiros pesadelos e vulnerabilidades críticas em produção. 
      </p>

      <p className="mb-8">
        Adotar uma cultura <strong>DevSecOps</strong> significa mudar essa mentalidade. É trazer a segurança para a esquerda (<em>Shift Left</em>), integrando-a desde a fase de planejamento até a entrega e o monitoramento contínuo.
      </p>

      <h2 className="text-2xl font-bold text-white mt-12 mb-6 border-b border-white/10 pb-4">A Importância da Cultura DevSecOps</h2>
      <p className="mb-8">
        Não se trata apenas de ferramentas, mas de <strong>cultura</strong>. Desenvolvedores, operações e segurança precisam trabalhar com o mesmo propósito. Quando a segurança faz parte do fluxo de trabalho diário de forma automatizada, garantimos mais agilidade e tranquilidade nas entregas.
      </p>
      
      <h2 className="text-2xl font-bold text-white mt-12 mb-6 border-b border-white/10 pb-4">Pipeline de Segurança</h2>
      <p className="mb-4">
        Uma esteira automatizada (CI/CD) forte é o coração do DevSecOps. Nela podemos acoplar diversas verificações:
      </p>
      <ul className="space-y-4 mb-12">
        <li className="flex flex-col">
          <strong className="text-white">SAST (Static Application Security Testing)</strong>
          <span className="text-slate-400 text-base">Análise estática de código para encontrar falhas de segurança como SQL Injection e XSS antes mesmo da aplicação rodar.</span>
        </li>
        <li className="flex flex-col">
          <strong className="text-white">SCA (Software Composition Analysis)</strong>
          <span className="text-slate-400 text-base">Verifica se as bibliotecas e dependências de terceiros possuem vulnerabilidades conhecidas (CVEs).</span>
        </li>
        <li className="flex flex-col">
          <strong className="text-white">DAST (Dynamic Application Security Testing)</strong>
          <span className="text-slate-400 text-base">Testes dinâmicos que simulam ataques automatizados na aplicação já em execução (no ambiente de staging, por exemplo).</span>
        </li>
      </ul>

      <h2 className="text-2xl font-bold text-white mt-12 mb-6 border-b border-white/10 pb-4">Monitoramento Contínuo</h2>
      <p className="mb-8">
        Deploy feito não significa trabalho finalizado. O monitoramento contínuo é o que permite identificar e responder a incidentes e novas ameaças de prontidão. Alertas configurados e rastreamento de logs e métricas mantêm a aplicação segura.
      </p>

      <h2 className="text-2xl font-bold text-white mt-12 mb-6 border-b border-white/10 pb-4">Projeto Prático</h2>
      <p className="mb-8">
        A teoria é ótima, mas como é na prática? Construí um projeto focado nesses conceitos para exemplificar como incorporar segurança diretamente no código e na automação.
      </p>
      
      <a 
        href="https://github.com/gustavogss/task-manager" 
        target="_blank" 
        rel="noopener noreferrer"
        className="block p-6 bg-slate-800/50 hover:bg-slate-800 border border-slate-700 hover:border-brand-primary rounded-2xl transition-all break-all text-brand-primary font-medium text-center mb-12"
      >
        Projeto Task Manager no GitHub
      </a>

      <h2 className="text-2xl font-bold text-white mt-12 mb-6 border-b border-white/10 pb-4">Conclusão</h2>
      <p className="text-xl p-6 bg-brand-primary/10 border-l-4 border-brand-primary rounded-r-2xl italic text-slate-200">
        Investir na cultura e nas ferramentas de DevSecOps significa não apenas proteger seus usuários e dados, mas garantir previsibilidade e sucesso em cada deploy. O momento de aplicar essas práticas em seus projetos é agora.
      </p>

      <div className="mt-12 pt-8 flex flex-wrap gap-2">
        {['#DevSecOps', '#Cybersecurity', '#AppSec', '#SAST', '#DAST', '#CICD', '#ShiftLeft', '#Security'].map((tag) => (
          <span key={tag} className="text-sm font-medium text-brand-primary/60">
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
}

function BlogContentIos() {
  return (
    <div className="prose prose-invert prose-brand max-w-none prose-lg font-sans text-slate-300">
      <p className="text-xl text-slate-200 leading-relaxed mb-8">
        Se você já desenvolveu aplicativos multiplataforma usando React Native, Flutter ou Ionic, provavelmente já se deparou com um grande obstáculo: <strong>como testar o aplicativo no iOS sem ter um Mac?</strong>
      </p>

      <p className="mb-8">
        O ecossistema da Apple é notório por ser fechado. Para compilar e rodar um app iOS, você obrigatoriamente precisa do Xcode, que só funciona no macOS. Isso cria uma barreira de entrada gigante, especialmente em países onde os equipamentos da maçã têm valores exorbitantes.
      </p>

      <h2 className="text-2xl font-bold text-white mt-12 mb-6 border-b border-white/10 pb-4">O Preço do Desenvolvimento iOS</h2>
      <p className="mb-4">As alternativas tradicionais costumam pesar no bolso:</p>
      <ul className="space-y-4 mb-12">
        <li className="flex flex-col">
          <strong className="text-white">Comprar um Mac</strong>
          <span className="text-slate-400 text-base">A opção mais "simples", porém exige um investimento de milhares de reais (ou dólares), o que nem sempre é viável para desenvolvedores independentes ou iniciantes.</span>
        </li>
        <li className="flex flex-col">
          <strong className="text-white">Serviços em Nuvem (MacinCloud, AWS Mac, etc)</strong>
          <span className="text-slate-400 text-base">Outra alternativa é alugar um Mac remoto. Mas isso tem um custo recorrente mensal ou por hora que pode se acumular rapidamente e comprometer o orçamento do projeto.</span>
        </li>
      </ul>

      <h2 className="text-2xl font-bold text-white mt-12 mb-6 border-b border-white/10 pb-4">A Solução: macOS no Docker</h2>
      <p className="mb-8">
        Felizmente, existe uma alternativa engenhosa e sem custos adicionais: rodar o sistema da Apple dentro do Docker. Essa abordagem usa virtualização KVM junto com o Docker para subir o macOS em qualquer computador Windows (via WSL) ou Linux que tenha os recursos mínimos necessários.
      </p>

      <h2 className="text-2xl font-bold text-white mt-12 mb-6 border-b border-white/10 pb-4">Vantagens</h2>
      <ul className="space-y-3 mb-12 list-disc pl-6">
        <li><strong>Gratuito:</strong> Você só precisa do hardware do seu PC atual.</li>
        <li><strong>Portátil:</strong> O Docker garante que o setup possa ser facilmente recriado ou transferido.</li>
        <li><strong>Simulador embutido:</strong> Dentro do macOS virtualizado você usa o próprio Xcode e o simulador do iPhone da mesma forma que usaria em um Mac físico.</li>
      </ul>

      <h2 className="text-2xl font-bold text-white mt-12 mb-6 border-b border-white/10 pb-4">O Projeto Prático</h2>
      <p className="mb-8">
        Para facilitar e demonstrar todo esse processo de ponta a ponta, organizei um repositório que detalha como orquestrar a inicialização do macOS utilizando Docker e como acessar e testar seus aplicativos a partir da máquina host.
      </p>
      
      <a 
        href="https://github.com/gustavogss/mac-docker" 
        target="_blank" 
        rel="noopener noreferrer"
        className="block p-6 bg-slate-800/50 hover:bg-slate-800 border border-slate-700 hover:border-brand-primary rounded-2xl transition-all break-all text-brand-primary font-medium text-center mb-12"
      >
        Acessar Projeto no GitHub: gustavogss/mac-docker
      </a>

      <h2 className="text-2xl font-bold text-white mt-12 mb-6 border-b border-white/10 pb-4">Conclusão</h2>
      <p className="text-xl p-6 bg-brand-primary/10 border-l-4 border-brand-primary rounded-r-2xl italic text-slate-200">
        Criar experiências mobile consistentes exige testes em dispositivos reais e simuladores de ambas as plataformas. Com a ajuda da virtualização e do Docker, o mundo do iOS agora está ao alcance de qualquer desenvolvedor, derrubando a barreira de custo e democratizando o acesso.
      </p>

      <div className="mt-12 pt-8 flex flex-wrap gap-2">
        {['#iOSDevelopment', '#macOS', '#Docker', '#MobileDev', '#Virtualization', '#Xcode', '#ReactNative', '#Flutter'].map((tag) => (
          <span key={tag} className="text-sm font-medium text-brand-primary/60">
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
}

function BlogContentVibeAgents() {
  return (
    <div className="prose prose-invert prose-brand max-w-none prose-lg font-sans text-slate-300">
      <p className="text-xl text-slate-200 leading-relaxed mb-8">
        O "Vibecoding" (programar no fluxo da conversa com IAs) é libertador, mas quando mal executado, pode se tornar um gerador de dívida técnica em escala industrial.
      </p>

      <p className="mb-8">
        Muitos desenvolvedores cometem o erro de tratar a IA como uma "caixa preta" que entrega soluções prontas, resultando em códigos sem estrutura, alucinações arquiteturais e dependências infladas. A forma mais recomendada de escalar essa produtividade é através do uso de <strong>Agentes Especialistas</strong>.
      </p>

      <h2 className="text-2xl font-bold text-white mt-12 mb-6 border-b border-white/10 pb-4">Os Erros Comuns do Vibecoding "Solitário"</h2>
      <ul className="space-y-4 mb-8">
        <li className="flex flex-col">
          <strong className="text-white">Falta de Contexto Global</strong>
          <span className="text-slate-400 text-base">A IA foca na tarefa imediata e esquece o impacto na arquitetura existente.</span>
        </li>
        <li className="flex flex-col">
          <strong className="text-white">Alucinação de Bibliotecas</strong>
          <span className="text-slate-400 text-base">Inclusão de pacotes inexistentes ou obsoletos sem validação.</span>
        </li>
        <li className="flex flex-col">
          <strong className="text-white">Ausência de Code Review</strong>
          <span className="text-slate-400 text-base">Aceitar o código sem entender a lógica, o que impede a manutenção futura pelo humano.</span>
        </li>
      </ul>

      <h2 className="text-2xl font-bold text-white mt-12 mb-6 border-b border-white/10 pb-4">A Estratégia de Agentes Especialistas</h2>
      <p className="mb-8">Ao invés de um único chat, o fluxo ideal envolve delegar responsabilidades para agentes com personas distintas:</p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-12">
        <div className="p-6 bg-slate-800/50 rounded-2xl border border-slate-700">
          <h4 className="text-brand-primary font-bold mb-2">Project Manager</h4>
          <p className="text-sm text-slate-400">Define o escopo e garante que a IA não fuja do objetivo principal.</p>
        </div>
        <div className="p-6 bg-slate-800/50 rounded-2xl border border-slate-700">
          <h4 className="text-brand-primary font-bold mb-2">Architect Agent</h4>
          <p className="text-sm text-slate-400">Valida se o código gerado segue os padrões de Clean Architecture e SOLID.</p>
        </div>
        <div className="p-6 bg-slate-800/50 rounded-2xl border border-slate-700">
          <h4 className="text-brand-primary font-bold mb-2">Security Auditor</h4>
          <p className="text-sm text-slate-400">Auditagem automática contra OWASP Top 10 e vazamento de segredos.</p>
        </div>
        <div className="p-6 bg-slate-800/50 rounded-2xl border border-slate-700">
          <h4 className="text-brand-primary font-bold mb-2">Senior Developer</h4>
          <p className="text-sm text-slate-400">Refatora o código para performance e legibilidade humana.</p>
        </div>
      </div>

      <h2 className="text-2xl font-bold text-white mt-12 mb-6 border-b border-white/10 pb-4">Na Prática: Agentes Fullstack</h2>
      <p className="mb-8">
        No meu projeto <strong>Agentes Fullstack</strong>, explorei exatamente essa orquestração. O sistema demonstra como automatizar a criação de features complexas garantindo que cada linha de código passe por uma esteira de validação inteligente antes de ser persistida.
      </p>
      
      <a 
        href="https://github.com/gustavogss/agentes-fullstack" 
        target="_blank" 
        rel="noopener noreferrer"
        className="block p-6 bg-slate-800/50 hover:bg-slate-800 border border-slate-700 hover:border-brand-primary rounded-2xl transition-all break-all text-brand-primary font-medium text-center mb-12"
      >
        Acessar Projeto no GitHub: gustavogss/agentes-fullstack
      </a>

      <h2 className="text-2xl font-bold text-white mt-12 mb-6 border-b border-white/10 pb-4">Conclusão</h2>
      <p className="text-xl p-6 bg-brand-primary/10 border-l-4 border-brand-primary rounded-r-2xl italic text-slate-200">
        O Vibecoding é o presente, mas os Agentes Especialistas são o futuro do software profissional. Não apenas "vibre", mas orquestre com inteligência.
      </p>

      <div className="mt-12 pt-8 flex flex-wrap gap-2">
        {['#AI', '#ArtificialIntelligence', '#Vibecoding', '#SoftwareAgents', '#CleanCode', '#LLM', '#Automation', '#FutureOfCoding'].map((tag) => (
          <span key={tag} className="text-sm font-medium text-brand-primary/60">
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
}

function BlogContentVibecoding() {
  return (
    <div className="prose prose-invert prose-brand max-w-none prose-lg font-sans text-slate-300">
      <p className="text-xl text-slate-200 leading-relaxed mb-8">
        O termo "Vibecoding" (escrever código iterando e "conversando" com IA) trouxe uma agilidade inédita para o desenvolvimento de software. Modelos potentes transformam linguagem natural em features completas em minutos.
      </p>

      <p className="mb-8">
        No entanto, códigos gerados por IA ainda podem introduzir vulnerabilidades de segurança, problemas estruturais de performance e dependências comprometidas sem que a gente perceba — caso não haja revisão atenta. É por isso que o <strong>Vibecoding só é seguro e sustentável com monitoramento e CI/CD estritos</strong>.
      </p>

      <h2 className="text-2xl font-bold text-white mt-12 mb-6 border-b border-white/10 pb-4">A Importância da Esteira de CI/CD</h2>
      <p className="mb-4">Para se beneficiar do Vibecoding e ao mesmo tempo blindar sua aplicação, ter uma pipeline eficiente é fundamental:</p>
      <ul className="space-y-6 mb-12 list-none p-0">
        <li className="flex flex-col">
          <strong className="text-white">Segurança Shift Left (SAST/DAST)</strong>
          <span className="text-slate-400 text-base">Verificações acionadas no momento do pull request. A IA introduziu uma injeção de SQL ou hardcoded de uma key? A pipeline barra a PR instantaneamente.</span>
        </li>
        <li className="flex flex-col">
          <strong className="text-white">Análise de Composição de Software (SCA)</strong>
          <span className="text-slate-400 text-base">Testar se a IA sugeriu uma biblioteca desatualizada ou com CVE antes da ida para a produção.</span>
        </li>
        <li className="flex flex-col">
          <strong className="text-white">Linting e Formatters Automatizados</strong>
          <span className="text-slate-400 text-base">A IA escreve código mais próximo de prosa; o CI/CD unifica o estilo arquitetural final de volta ao padrão do time.</span>
        </li>
      </ul>

      <h2 className="text-2xl font-bold text-white mt-12 mb-6 border-b border-white/10 pb-4">Na Prática: Diet Case</h2>
      <p className="mb-8">
        No meu projeto prático "Diet Case", uni a eficiência das IAs a uma esteira rigorosa no GitHub. O projeto demonstra que, além de ser ágil com a IA, é imprescindível criar uma malha de automações para validar testes para que o código esteja maduro sob os critérios de DevSecOps.
      </p>
      
      <a 
        href="https://github.com/gustavogss/diet-case" 
        target="_blank" 
        rel="noopener noreferrer"
        className="block p-6 bg-slate-800/50 hover:bg-slate-800 border border-slate-700 hover:border-brand-primary rounded-2xl transition-all break-all text-brand-primary font-medium text-center mb-12"
      >
        Acessar Projeto no GitHub: gustavogss/diet-case
      </a>

      <h2 className="text-2xl font-bold text-white mt-12 mb-6 border-b border-white/10 pb-4">Conclusão</h2>
      <p className="text-xl p-6 bg-brand-primary/10 border-l-4 border-brand-primary rounded-r-2xl italic text-slate-200">
        O Vibecoding representa o fim do boilerplate, mas eleva o papel do CI/CD como o principal "árbitro" da qualidade do nosso emaranhado digital. Domine as automações e voe tranquilo com a IA.
      </p>

      <div className="mt-12 pt-8 flex flex-wrap gap-2">
        {['#AI', '#Vibecoding', '#CICD', '#SoftwareQuality', '#GitHubActions', '#DevSecOps', '#Automation', '#TechInnovation'].map((tag) => (
          <span key={tag} className="text-sm font-medium text-brand-primary/60">
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
}

function BlogContentSiteToApp() {
  return (
    <div className="prose prose-invert prose-brand max-w-none prose-lg font-sans text-slate-300">
      {/* Introdução / Oportunidade */}
      <p className="text-xl text-slate-200 leading-relaxed mb-6">
        Você já possui um site funcionando, com design responsivo, catálogo ou sistema em produção, mas o seu cliente pergunta com frequência: <em>"A gente não poderia ter um aplicativo na loja também?"</em>
      </p>

      <p className="mb-6">
        Para a grande maioria dos negócios — sejam lojas virtuais, portais de conteúdo, catálogos digitais ou sistemas de agendamento — reconstruir absolutamente toda a regra de negócio do zero em código mobile nativo é inviável financeiramente e desnecessário operacionalmente.
      </p>

      <p className="mb-8">
        Existe um caminho muito mais inteligente e estratégico: transformar o próprio site existente na fonte de conteúdo do aplicativo, empacotando-o em uma camada mobile profissional desenvolvida com <strong>React Native</strong> e <strong>Expo</strong>. Assim, você entrega uma experiência mobile completa com ícone próprio, splash screen personalizada e prontidão para a Google Play Store.
      </p>

      {/* CTA Inicial de Destaque para Clonar o Repositório */}
      <div className="p-8 my-10 bg-slate-800/60 rounded-3xl border border-slate-700/80 shadow-2xl relative overflow-hidden group">
        <div className="absolute top-0 right-0 w-72 h-72 bg-brand-primary/10 rounded-full blur-3xl -z-10 group-hover:bg-brand-primary/20 transition-all duration-500" />
        <div className="flex items-center gap-3 text-brand-primary font-bold text-lg mb-3">
          <Zap className="w-5 h-5 text-brand-primary animate-pulse" />
          <span>🚀 Quer fazer isso no seu próprio projeto?</span>
        </div>
        <p className="text-slate-300 text-base mb-6 leading-relaxed">
          Você não precisa começar do zero. Criamos uma estrutura base completa e pronta: basta clonar o repositório, trocar a URL do site, personalizar a identidade visual (nome, ícone e splash screen) e gerar seu próprio aplicativo Android.
        </p>
        <a 
          href="https://github.com/gustavogss/gustavoapp" 
          target="_blank" 
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-brand-primary hover:bg-brand-primary/90 text-white rounded-2xl font-bold transition-all shadow-lg hover:shadow-brand-primary/30 w-full sm:w-auto text-center"
        >
          <Github className="w-5 h-5" />
          <span>CLONAR REPOSITÓRIO NO GITHUB</span>
          <ExternalLink className="w-4 h-4 opacity-70" />
        </a>
        <span className="block mt-3 text-xs text-slate-400">
          Repositório: <code className="text-brand-secondary font-mono">github.com/gustavogss/SEU_REPOSITORIO_GITHUB</code>
        </span>
      </div>

      {/* Por que transformar um site em aplicativo? */}
      <h2 className="text-2xl font-bold text-white mt-12 mb-6 border-b border-white/10 pb-4">
        Por que transformar um site em aplicativo?
      </h2>
      <p className="mb-6">
        A proposta aqui não é substituir o seu site, e sim criar uma simbiose perfeita: <strong>SITE + APLICATIVO</strong> trabalhando juntos. Enquanto o site atrai novos visitantes por SEO e campanhas web, o aplicativo atua diretamente na fidelização e na retenção dos seus clientes mais fiéis.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10">
        <div className="p-6 bg-slate-800/40 rounded-2xl border border-slate-700/60">
          <h4 className="text-brand-primary font-bold mb-2 flex items-center gap-2">
            <Smartphone className="w-4 h-4" /> Aumento do Valor Percebido
          </h4>
          <p className="text-sm text-slate-400">
            Um cliente que tem um aplicativo com ícone oficial na tela inicial enxerga sua solução como muito mais consolidada e de alto padrão.
          </p>
        </div>
        <div className="p-6 bg-slate-800/40 rounded-2xl border border-slate-700/60">
          <h4 className="text-brand-primary font-bold mb-2 flex items-center gap-2">
            <Zap className="w-4 h-4" /> Canal Direto de Acesso
          </h4>
          <p className="text-sm text-slate-400">
            Elimina a necessidade de abrir o navegador, digitar a URL ou lembrar senhas em guias anônimas. O acesso é feito com 1 único toque.
          </p>
        </div>
        <div className="p-6 bg-slate-800/40 rounded-2xl border border-slate-700/60">
          <h4 className="text-brand-primary font-bold mb-2 flex items-center gap-2">
            <ShieldCheck className="w-4 h-4" /> Presença na Google Play Store
          </h4>
          <p className="text-sm text-slate-400">
            Permite que sua marca apareça nos resultados de busca da loja de aplicativos do Google, transmitindo credibilidade instantânea.
          </p>
        </div>
        <div className="p-6 bg-slate-800/40 rounded-2xl border border-slate-700/60">
          <h4 className="text-brand-primary font-bold mb-2 flex items-center gap-2">
            <ArrowRight className="w-4 h-4" /> Nova Oportunidade Comercial
          </h4>
          <p className="text-sm text-slate-400">
            Para freelancers e agências, entregar o aplicativo representa uma oportunidade real de upgrade e serviço adicional com alta margem.
          </p>
        </div>
      </div>

      {/* Como a solução funciona? */}
      <h2 className="text-2xl font-bold text-white mt-12 mb-6 border-b border-white/10 pb-4">
        Como a solução funciona?
      </h2>
      <p className="mb-6">
        A arquitetura é elegante em sua simplicidade: a aplicação móvel é construída em React Native e utiliza uma <strong>WebView</strong> de alta performance. Ela carrega o site com renderização acelerada por hardware e interage com os eventos nativos do sistema operacional Android.
      </p>

      {/* Fluxo Visual */}
      <div className="p-6 bg-[#030712]/90 rounded-2xl border border-slate-800 my-8">
        <p className="text-xs font-mono text-slate-400 uppercase tracking-wider mb-4 text-center">Fluxo da Aplicação</p>
        <div className="flex flex-wrap items-center justify-center gap-2 md:gap-3 font-mono text-xs md:text-sm text-slate-200 font-bold">
          <span className="px-3 py-2 bg-slate-800 rounded-xl border border-slate-700">SITE WEB</span>
          <span className="text-brand-primary font-bold">→</span>
          <span className="px-3 py-2 bg-slate-800 rounded-xl border border-slate-700">INTERNET (HTTPS)</span>
          <span className="text-brand-primary font-bold">→</span>
          <span className="px-3 py-2 bg-brand-primary/20 text-brand-primary rounded-xl border border-brand-primary/40">WEBVIEW</span>
          <span className="text-brand-primary font-bold">→</span>
          <span className="px-3 py-2 bg-slate-800 rounded-xl border border-slate-700">APP REACT NATIVE</span>
          <span className="text-brand-primary font-bold">→</span>
          <span className="px-3 py-2 bg-emerald-500/20 text-emerald-400 rounded-xl border border-emerald-500/40">DISPOSITIVO ANDROID</span>
        </div>
      </div>

      <h3 className="text-xl font-bold text-white mt-8 mb-4">Transparência: Quando esta solução é recomendada?</h3>
      <p className="mb-4">
        Uma abordagem profissional de engenharia de software exige clareza sobre limitações. A WebView é perfeita para sites que já possuem boa usabilidade mobile, mas não é uma solução mágica para qualquer contexto:
      </p>
      <ul className="space-y-3 mb-10 list-disc pl-6">
        <li><strong>Dependência de Internet:</strong> Como o conteúdo é servido via web, a navegação depende de conexão ativa com a internet.</li>
        <li><strong>Qualidade do Site:</strong> A experiência no app é um reflexo direto do site. Se o site for lento ou tiver elementos quebrados no mobile, isso se refletirá no app.</li>
        <li><strong>Recursos Nativos Profundos:</strong> Caso o seu projeto demande Bluetooth Low Energy contínuo, sensores de giroscópio complexos ou processamento offline em massa, um desenvolvimento 100% nativo será necessário.</li>
        <li><strong>Políticas da Google Play:</strong> A Google Play exige que aplicativos baseados em WebView ofereçam valor real e uma experiência legítima, e não apenas um redirecionamento genérico sem propósito.</li>
      </ul>

      {/* Tecnologias Utilizadas */}
      <h2 className="text-2xl font-bold text-white mt-12 mb-6 border-b border-white/10 pb-4">
        Tecnologias Utilizadas
      </h2>
      <p className="mb-6">
        O projeto utiliza as ferramentas mais consolidadas e modernas do ecossistema mobile atual:
      </p>
      <div className="flex flex-wrap gap-3 mb-10">
        <span className="px-4 py-2 bg-[#1e293b] border border-slate-700 rounded-xl text-white font-medium">
          Expo
        </span>
        <span className="px-4 py-2 bg-[#1e293b] border border-slate-700 rounded-xl text-white font-medium">
          React Native
        </span>
        <span className="px-4 py-2 bg-[#1e293b] border border-slate-700 rounded-xl text-white font-medium">
          react-native-webview
        </span>
        <span className="px-4 py-2 bg-[#1e293b] border border-slate-700 rounded-xl text-white font-medium">
          EAS Build (Cloud)
        </span>
      </div>

      <ul className="space-y-4 mb-10">
        <li className="flex flex-col">
          <strong className="text-white">Expo</strong>
          <span className="text-slate-400 text-base">Elimina a complexidade de gerenciar pastas nativas do Android manualmente e orquestra assets e configurações de forma limpa e declarativa.</span>
        </li>
        <li className="flex flex-col">
          <strong className="text-white">React Native</strong>
          <span className="text-slate-400 text-base">Garante o ciclo de vida da aplicação móvel, integração com botão voltar do Android e controle do hardware de tela.</span>
        </li>
        <li className="flex flex-col">
          <strong className="text-white">react-native-webview</strong>
          <span className="text-slate-400 text-base">Componente oficial com motor Chromium de alto desempenho, suporte a injeção segura de JavaScript e controle fino de navegação.</span>
        </li>
        <li className="flex flex-col">
          <strong className="text-white">EAS Build</strong>
          <span className="text-slate-400 text-base">Serviço em nuvem da Expo para compilar APKs e AABs assinados diretamente na nuvem, sem depender de máquinas ultra potentes.</span>
        </li>
      </ul>

      {/* O que você precisa */}
      <h2 className="text-2xl font-bold text-white mt-12 mb-6 border-b border-white/10 pb-4">
        O que você precisa
      </h2>
      <ul className="space-y-3 mb-10 list-disc pl-6">
        <li><strong>Node.js</strong> instalado (v18 ou superior LTS) e gerenciador de pacotes (npm).</li>
        <li><strong>Git</strong> instalado e uma conta ativa no GitHub.</li>
        <li><strong>Expo CLI</strong> (executado via <code>npx expo</code>).</li>
        <li><strong>EAS CLI</strong> instalado globalmente via <code>npm install -g eas-cli</code>.</li>
        <li><strong>Dispositivo Android</strong> físico (com o app Expo Go instalado) ou emulador Android Studio para testes.</li>
        <li><strong>Um site funcional</strong> que utilize protocolo seguro <strong>HTTPS</strong>.</li>
        <li><strong>Conta no Google Play Console</strong> (necessária para quando for distribuir o AAB na Play Store).</li>
      </ul>

      {/* Clonando o Repositório */}
      <h2 className="text-2xl font-bold text-white mt-12 mb-6 border-b border-white/10 pb-4">
        Clonando o Repositório
      </h2>
      <p className="mb-4">
        Para que você não precise digitar dezenas de arquivos de configuração, o código base completo está estruturado no repositório. Abra o seu terminal e execute:
      </p>

      <div className="relative my-6 rounded-xl border border-white/10 overflow-hidden bg-slate-900/60">
        <div className="flex items-center justify-between px-4 py-2 bg-[#030712] border-b border-white/10 text-xs font-mono text-slate-400">
          <span>BASH</span>
        </div>
        <pre className="p-4 overflow-x-auto text-sm font-mono text-slate-300 leading-relaxed scrollbar-thin">
          <code>{`# 1. Clone o repositório base
git clone https://github.com/gustavogss/SEU_REPOSITORIO_GITHUB.git

# 2. Acesse a pasta do projeto
cd SEU_REPOSITORIO_GITHUB

# 3. Instale as dependências
npm install

# 4. Inicie o servidor de desenvolvimento
npx expo start`}</code>
        </pre>
      </div>

      {/* Configurando a URL do site */}
      <h2 className="text-2xl font-bold text-white mt-12 mb-6 border-b border-white/10 pb-4">
        Configurando a URL do site
      </h2>
      <p className="mb-4">
        No arquivo central de configuração (como <code className="text-brand-secondary">app.json</code> ou na constante em <code className="text-brand-secondary">config/site.ts</code>), substitua a URL padrão pelo endereço do site do cliente:
      </p>

      <div className="relative my-6 rounded-xl border border-white/10 overflow-hidden bg-slate-900/60">
        <div className="flex items-center justify-between px-4 py-2 bg-[#030712] border-b border-white/10 text-xs font-mono text-slate-400">
          <span>JSON</span>
        </div>
        <pre className="p-4 overflow-x-auto text-sm font-mono text-slate-300 leading-relaxed scrollbar-thin">
          <code>{`{
  "expo": {
    "extra": {
      "siteUrl": "https://seusite.com.br"
    }
  }
}`}</code>
        </pre>
      </div>

      <p className="p-4 bg-amber-500/10 border-l-4 border-amber-500 rounded-r-2xl text-amber-200 text-sm mb-8">
        <strong>Atenção ao HTTPS:</strong> O Android bloqueia por padrão conexões HTTP sem criptografia por questões de segurança (Cleartext Traffic). O site precisa obrigatoriamente estar com certificado SSL ativo (HTTPS).
      </p>

      {/* Personalizando o Aplicativo */}
      <h2 className="text-2xl font-bold text-white mt-12 mb-6 border-b border-white/10 pb-4">
        Personalizando o Aplicativo
      </h2>
      <p className="mb-6">
        No <code className="text-brand-secondary">app.json</code>, você ajusta as informações de identificação do aplicativo:
      </p>

      <div className="relative my-6 rounded-xl border border-white/10 overflow-hidden bg-slate-900/60">
        <div className="flex items-center justify-between px-4 py-2 bg-[#030712] border-b border-white/10 text-xs font-mono text-slate-400">
          <span>JSON</span>
        </div>
        <pre className="p-4 overflow-x-auto text-sm font-mono text-slate-300 leading-relaxed scrollbar-thin">
          <code>{`{
  "expo": {
    "name": "Nome do Seu Cliente",
    "slug": "cliente-app",
    "version": "1.0.0",
    "android": {
      "package": "com.cliente.meuapp",
      "versionCode": 1,
      "adaptiveIcon": {
        "foregroundImage": "./assets/adaptive-icon.png",
        "backgroundColor": "#030712"
      }
    }
  }
}`}</code>
        </pre>
      </div>

      {/* Splash Screen */}
      <h3 className="text-xl font-bold text-white mt-8 mb-4">Splash Screen: A primeira impressão</h3>
      <p className="mb-4">
        A <strong>Splash Screen</strong> é a tela exibida durante a inicialização do app enquanto a WebView carrega os recursos da rede. Ela é determinante para a percepção de performance e profissionalismo.
      </p>
      <ul className="space-y-2 mb-8 list-disc pl-6">
        <li>Substitua o arquivo em <code className="text-brand-secondary">assets/splash.png</code> com o logo centralizado do seu cliente.</li>
        <li>Configure a cor de fundo correspondente no <code className="text-brand-secondary">app.json</code> em <code>splash.backgroundColor</code>.</li>
      </ul>

      {/* Ícone */}
      <h3 className="text-xl font-bold text-white mt-8 mb-4">Ícone do Aplicativo</h3>
      <p className="mb-4">
        O ícone é o elemento mais visível no dia a dia do usuário final: ele fica na gaveta de aplicativos e na tela inicial do celular.
      </p>
      <ul className="space-y-2 mb-8 list-disc pl-6">
        <li>Crie um ícone quadrado (1024x1024 px) e substitua em <code className="text-brand-secondary">assets/icon.png</code>.</li>
        <li>Gere o ícone adaptativo para Android (<code className="text-brand-secondary">assets/adaptive-icon.png</code>) para garantir compatibilidade com as formas circulares ou quadradas do Android 13+.</li>
      </ul>

      {/* Transformando em Template */}
      <h2 className="text-2xl font-bold text-white mt-12 mb-6 border-b border-white/10 pb-4">
        Transformando o Projeto em um Template Reutilizável
      </h2>
      <p className="mb-6">
        A beleza dessa arquitetura para freelancers e agências é a escalabilidade. O mesmo repositório serve como um gerador instantâneo para múltiplos clientes:
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10">
        <div className="p-6 bg-slate-800/40 rounded-2xl border border-slate-700/60">
          <span className="text-xs font-mono text-brand-primary uppercase font-bold">CLIENTE 1 (Ex: Loja de Roupas)</span>
          <p className="text-sm text-slate-300 mt-2">
            Clonar repo → URL: <code>loja.com.br</code> → Nome: "Loja X" → Ícone e Splash da Loja → Gerar APK/AAB em 30 minutos.
          </p>
        </div>
        <div className="p-6 bg-slate-800/40 rounded-2xl border border-slate-700/60">
          <span className="text-xs font-mono text-emerald-400 uppercase font-bold">CLIENTE 2 (Ex: Clínica Médica)</span>
          <p className="text-sm text-slate-300 mt-2">
            Mesmo repo base → URL: <code>clinicax.med.br</code> → Nome: "Clínica X" → Identidade da clínica → Gerar APK/AAB sem retrabalho.
          </p>
        </div>
      </div>

      {/* Testando o Aplicativo */}
      <h2 className="text-2xl font-bold text-white mt-12 mb-6 border-b border-white/10 pb-4">
        Testando o Aplicativo
      </h2>
      <p className="mb-4">
        Com o comando <code>npx expo start</code>, você pode abrir o aplicativo no seu dispositivo físico:
      </p>
      <ul className="space-y-3 mb-10 list-disc pl-6">
        <li><strong>Navegação interna:</strong> Navegue pelas páginas do site e certifique-se de que a transição entre telas ocorre de forma suave.</li>
        <li><strong>Botão Voltar nativo do Android:</strong> O template intercepta o evento do botão físico/virtual de voltar do Android (<code className="text-brand-secondary">BackHandler</code>), fazendo o histórico da WebView retroceder uma página em vez de fechar o app bruscamente.</li>
        <li><strong>Links Externos:</strong> Verifique se links para WhatsApp (<code>wa.me</code>), discador de telefone (<code>tel:</code>) e e-mail abrem diretamente os aplicativos nativos do celular.</li>
      </ul>

      {/* Gerando o APK */}
      <h2 className="text-2xl font-bold text-white mt-12 mb-6 border-b border-white/10 pb-4">
        Gerando o APK (Para Testes e Homologação)
      </h2>
      <p className="mb-4">
        O <strong>APK</strong> é o arquivo binário ideal para testes práticos: você pode enviar o link de download direto para o cliente instalar no celular dele e aprovar antes da publicação.
      </p>

      <div className="relative my-6 rounded-xl border border-white/10 overflow-hidden bg-slate-900/60">
        <div className="flex items-center justify-between px-4 py-2 bg-[#030712] border-b border-white/10 text-xs font-mono text-slate-400">
          <span>BASH</span>
        </div>
        <pre className="p-4 overflow-x-auto text-sm font-mono text-slate-300 leading-relaxed scrollbar-thin">
          <code>{`# Compilar APK na nuvem via EAS Build
eas build -p android --profile preview`}</code>
        </pre>
      </div>

      <p className="mb-8 text-sm text-slate-400">
        Ao final da compilação, o EAS disponibiliza um QR Code e um link direto para baixar o arquivo <code>.apk</code> pronto para instalação.
      </p>

      {/* Gerando o AAB */}
      <h2 className="text-2xl font-bold text-white mt-12 mb-6 border-b border-white/10 pb-4">
        Gerando o AAB (Para Publicação na Play Store)
      </h2>
      <p className="mb-4">
        O <strong>AAB (Android App Bundle)</strong> é o formato padrão oficial exigido pelo Google Play Console para distribuição pública. A Google Play gera os binários otimizados de acordo com a arquitetura de processador de cada dispositivo.
      </p>

      <div className="relative my-6 rounded-xl border border-white/10 overflow-hidden bg-slate-900/60">
        <div className="flex items-center justify-between px-4 py-2 bg-[#030712] border-b border-white/10 text-xs font-mono text-slate-400">
          <span>BASH</span>
        </div>
        <pre className="p-4 overflow-x-auto text-sm font-mono text-slate-300 leading-relaxed scrollbar-thin">
          <code>{`# Compilar AAB de produção assinado para a Google Play
eas build -p android --profile production`}</code>
        </pre>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10">
        <div className="p-4 bg-slate-800/30 rounded-xl border border-slate-700/50">
          <strong className="text-white block mb-1">APK</strong>
          <span className="text-slate-400 text-sm">Instalação direta, envio via WhatsApp para o cliente homologar e validação interna.</span>
        </div>
        <div className="p-4 bg-slate-800/30 rounded-xl border border-slate-700/50">
          <strong className="text-white block mb-1">AAB</strong>
          <span className="text-slate-400 text-sm">Upload obrigatório no Google Play Console para publicação oficial na Play Store.</span>
        </div>
      </div>

      {/* Segurança */}
      <h2 className="text-2xl font-bold text-white mt-12 mb-6 border-b border-white/10 pb-4">
        Segurança: Por que NÃO usar conversores online genéricos?
      </h2>
      <p className="mb-6">
        Na internet, existem dezenas de sites prometendo: <em>"Insira a URL do seu site e baixe o APK grátis em 1 minuto"</em>. Para um desenvolvedor ou empresa séria, utilizar esses serviços representa um enorme risco na <strong>cadeia de suprimentos de software (Supply Chain Security)</strong>:
      </p>

      <div className="p-6 bg-red-950/20 border border-red-500/30 rounded-2xl mb-8 space-y-3">
        <h4 className="text-red-400 font-bold text-base flex items-center gap-2">
          <ShieldCheck className="w-5 h-5" /> Os Riscos de Conversores Desconhecidos
        </h4>
        <ul className="space-y-2 text-sm text-slate-300 list-disc pl-5">
          <li><strong>Código Fechado e Inauditável:</strong> Você não tem acesso ao código fonte real que foi compilado dentro do APK.</li>
          <li><strong>Injeção Oculta de Anúncios e Telemetria:</strong> Muitos serviços injetam adwares ou scripts de rastreamento em segundo plano para monetizar o instalador.</li>
          <li><strong>Permissões Abusivas:</strong> O APK pode solicitar acesso a contatos, câmera ou localização sem qualquer necessidade do seu site, gerando alertas no Android.</li>
          <li><strong>Perda de Controle de Chaves de Assinatura:</strong> Se o serviço fechar ou mudar a chave (keystore), você nunca mais conseguirá atualizar o app nas lojas.</li>
        </ul>
      </div>

      <p className="mb-8">
        Ao utilizar uma base própria com React Native e Expo no GitHub, <strong>você tem controle total</strong>: o código é 100% auditável, apenas as permissões necessárias são solicitadas e você detém a propriedade das credenciais de assinatura.
      </p>

      <h3 className="text-xl font-bold text-white mt-8 mb-4">Boas Práticas de Segurança no App</h3>
      <ul className="space-y-3 mb-10 list-disc pl-6">
        <li><strong>Restrição de Domínio:</strong> Valide as URLs para impedir que a WebView navegue inadvertidamente para domínios maliciosos externos.</li>
        <li><strong>Mixed Content Bloqueado:</strong> Mantenha <code>mixedContentMode="never"</code> para proibir carregamento de recursos inseguros HTTP dentro do HTTPS.</li>
        <li><strong>Sem Segredos no Frontend:</strong> Jamais coloque credenciais ou senhas privadas de banco de dados no código do aplicativo.</li>
        <li><strong>Manuseio Seguro de Keystore:</strong> Guarde as chaves de assinatura do app em cofre seguro ou utilize os serviços gerenciados do Expo (EAS Credentials).</li>
      </ul>

      {/* Site Atualizado = Aplicativo Atualizado */}
      <h2 className="text-2xl font-bold text-white mt-12 mb-6 border-b border-white/10 pb-4">
        Site Atualizado = Aplicativo Atualizado
      </h2>
      <p className="mb-6">
        Esta é uma das maiores vantagens operacionais da abordagem: como o app consome o site em tempo real, <strong>qualquer atualização de conteúdo feita no site reflete instantaneamente no aplicativo</strong>, sem precisar passar por nova compilação ou fila de aprovação da Play Store.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10">
        <div className="p-6 bg-slate-800/40 rounded-2xl border border-slate-700/60">
          <h4 className="text-emerald-400 font-bold mb-2">Atualiza Automaticamente</h4>
          <ul className="text-sm text-slate-300 space-y-1">
            <li>✓ Novos produtos ou serviços</li>
            <li>✓ Alterações de preços e promoções</li>
            <li>✓ Textos, artigos de blog e banners</li>
            <li>✓ Atualizações de estilos CSS e layout web</li>
          </ul>
        </div>
        <div className="p-6 bg-slate-800/40 rounded-2xl border border-slate-700/60">
          <h4 className="text-amber-400 font-bold mb-2">Exige Novo Build (EAS)</h4>
          <ul className="text-sm text-slate-300 space-y-1">
            <li>• Mudança do ícone do app</li>
            <li>• Troca da imagem da splash screen</li>
            <li>• Inclusão de novas permissões no Android</li>
            <li>• Atualização da versão no Play Console</li>
          </ul>
        </div>
      </div>

      {/* Agregando Valor Comercial */}
      <h2 className="text-2xl font-bold text-white mt-12 mb-6 border-b border-white/10 pb-4">
        Agregando Valor ao Produto e Fidelizando o Cliente
      </h2>
      <p className="mb-6">
        Comercialmente, essa entrega eleva o status do seu trabalho. Veja a transformação na percepção do cliente:
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-8">
        <div className="p-6 bg-slate-900/60 rounded-2xl border border-red-500/20">
          <h4 className="text-red-400 font-bold text-lg mb-3">ANTES (Apenas o Site)</h4>
          <ul className="space-y-2 text-sm text-slate-400">
            <li>• Depende do cliente abrir o navegador e digitar a URL</li>
            <li>• Sem presença fixa na tela inicial do celular</li>
            <li>• Fácil de ser esquecido entre abas abertas</li>
            <li>• Menor valor percebido na entrega técnica</li>
          </ul>
        </div>
        <div className="p-6 bg-slate-900/60 rounded-2xl border border-emerald-500/30">
          <h4 className="text-emerald-400 font-bold text-lg mb-3">DEPOIS (Site + Aplicativo Android)</h4>
          <ul className="space-y-2 text-sm text-slate-200">
            <li>✓ Ícone exclusivo da marca do cliente na tela inicial</li>
            <li>✓ Abertura em 1 clique com splash screen de alto padrão</li>
            <li>✓ Possibilidade de presença na Google Play Store</li>
            <li>✓ Percepção imediata de produto consolidado e profissional</li>
          </ul>
        </div>
      </div>

      <p className="mb-8">
        Você pode oferecer essa solução como um <strong>pacote de upgrade</strong> na contratação de um site novo, ou como um <strong>serviço adicional</strong> para a sua base de clientes antigos, cobrando pela implantação inicial e por uma mensalidade de suporte e monitoramento.
      </p>

      {/* Publicação na Play Store */}
      <h2 className="text-2xl font-bold text-white mt-12 mb-6 border-b border-white/10 pb-4">
        Publicação na Google Play Store
      </h2>
      <p className="mb-4">
        O caminho até a publicação oficial na loja do Google envolve etapas bem delimitadas:
      </p>

      <div className="p-6 bg-[#030712]/90 rounded-2xl border border-slate-800 my-6">
        <div className="flex flex-wrap items-center justify-center gap-2 font-mono text-xs text-slate-200 font-bold">
          <span>REPOSITÓRIO</span>
          <span className="text-brand-primary">→</span>
          <span>CONFIGURAÇÃO</span>
          <span className="text-brand-primary">→</span>
          <span>TESTE LOCAL</span>
          <span className="text-brand-primary">→</span>
          <span>APK (VALIDAÇÃO)</span>
          <span className="text-brand-primary">→</span>
          <span>AAB (PRODUÇÃO)</span>
          <span className="text-brand-primary">→</span>
          <span>PLAY CONSOLE</span>
          <span className="text-brand-primary">→</span>
          <span className="text-emerald-400">PUBLICAÇÃO</span>
        </div>
      </div>

      <ul className="space-y-3 mb-10 list-disc pl-6">
        <li><strong>Conta Google Play Console:</strong> Taxa única de US$ 25 para criar a conta de desenvolvedor.</li>
        <li><strong>Materiais Visuais:</strong> Ícone em alta resolução (512x512 px), gráfico de recursos (1024x500 px) e capturas de tela do aplicativo em smartphones.</li>
        <li><strong>Política de Privacidade:</strong> URL pública da política de privacidade no ar.</li>
        <li><strong>Políticas da Loja:</strong> Certifique-se de que o aplicativo oferece navegação fluida e conteúdo útil para os usuários.</li>
      </ul>

      {/* Exemplo Prático */}
      <h2 className="text-2xl font-bold text-white mt-12 mb-6 border-b border-white/10 pb-4">
        Exemplo Completo: Caso Real de Aplicação
      </h2>
      <p className="mb-4">
        Imagine um cliente dono de uma distribuidora local com o site <code className="text-brand-secondary">https://distribuidoraexemplo.com.br</code>. O fluxo completo de entrega leva menos de uma tarde:
      </p>
      <ol className="list-decimal pl-6 space-y-3 mb-10 marker:text-brand-primary marker:font-bold">
        <li>Você clona o repositório base no seu ambiente.</li>
        <li>Atualiza a URL para <code>https://distribuidoraexemplo.com.br</code>.</li>
        <li>Troca o nome do app para "Distribuidora Exemplo".</li>
        <li>Coloca o logo da distribuidora na splash screen e no ícone adaptativo.</li>
        <li>Roda <code>eas build -p android --profile preview</code> e gera o APK.</li>
        <li>Envia o link do APK para o cliente testar e validar no telefone dele.</li>
        <li>Após aprovação, gera o AAB com <code>eas build -p android --profile production</code> e sobe no Play Console.</li>
      </ol>

      {/* Checklist Final */}
      <h2 className="text-2xl font-bold text-white mt-12 mb-6 border-b border-white/10 pb-4">
        Checklist Final de Entrega
      </h2>
      <div className="space-y-3 p-6 bg-slate-800/40 rounded-2xl border border-slate-700/60 mb-12">
        {[
          'Site funcionando perfeitamente sob HTTPS e responsivo',
          'Repositório clonado e dependências instaladas (npm install)',
          'URL do site configurada no arquivo de configuração do projeto',
          'Nome do aplicativo atualizado no app.json',
          'Package name único definido (ex: com.cliente.meuapp)',
          'Ícone oficial do cliente gerado e substituído em assets/icon.png',
          'Splash screen personalizada gerada em assets/splash.png',
          'Navegação e botão voltar nativo do Android testados no dispositivo',
          'Tratamento de links externos (WhatsApp, e-mail, telefone) verificado',
          'Build de homologação (APK) gerado via EAS e validado com o cliente',
          'Build de produção (AAB) gerado via EAS para a Google Play',
          'Ficha técnica, capturas de tela e política de privacidade preparadas',
          'Aplicativo pronto para publicação oficial'
        ].map((item, idx) => (
          <div key={idx} className="flex items-start gap-3 p-2 rounded-lg hover:bg-white/[0.02]">
            <CheckCircle2 className="w-5 h-5 text-brand-primary shrink-0 mt-0.5" />
            <span className="text-slate-300 text-sm md:text-base">{item}</span>
          </div>
        ))}
      </div>

      {/* Conclusão */}
      <h2 className="text-2xl font-bold text-white mt-12 mb-6 border-b border-white/10 pb-4">
        Conclusão
      </h2>
      <p className="text-xl p-6 bg-brand-primary/10 border-l-4 border-brand-primary rounded-r-2xl italic text-slate-200 mb-8">
        Se o seu cliente já possui um site, você não precisa começar um aplicativo do zero para surpreendê-lo. Clone o projeto, aponte para a URL do site, personalize a identidade visual e gere um aplicativo Android que agrega valor real ao negócio.
      </p>

      {/* CTA Final */}
      <div className="p-8 my-10 bg-slate-800/60 rounded-3xl border border-slate-700/80 shadow-2xl text-center">
        <h3 className="text-2xl font-bold text-white mb-3">Pronto para colocar a mão na massa?</h3>
        <p className="text-slate-300 max-w-xl mx-auto mb-6">
          Acesse agora o repositório, faça o clone e comece a criar aplicativos para os seus sites ou clientes hoje mesmo.
        </p>
        <a 
          href="https://github.com/gustavogss/SEU_REPOSITORIO_GITHUB" 
          target="_blank" 
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-brand-primary hover:bg-brand-primary/90 text-white rounded-2xl font-bold transition-all shadow-lg hover:shadow-brand-primary/30"
        >
          <Github className="w-5 h-5" />
          <span>CLONAR REPOSITÓRIO NO GITHUB</span>
        </a>
      </div>

      {/* Tags */}
      <div className="mt-12 pt-8 flex flex-wrap gap-2">
        {[
          '#Mobile',
          '#ReactNative',
          '#Expo',
          '#Android',
          '#WebView',
          '#DevSecOps',
          '#AppSec',
          '#EmpreendedorismoDev'
        ].map((tag) => (
          <span key={tag} className="text-sm font-medium text-brand-primary/60">
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
}

