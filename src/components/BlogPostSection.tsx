import React, { useEffect } from 'react';
import { motion } from 'motion/react';
import { X, Share2 } from 'lucide-react';
import { BLOG_POSTS } from '../constants';

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
    telegram: `https://t.me/share/url?url=${encodeURIComponent(currentUrl)}&text=${encodeURIComponent(post.title)}`
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
      <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm" onClick={onBack}></div>
      
      <motion.article 
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className="relative w-full max-w-4xl bg-slate-900 rounded-3xl overflow-hidden shadow-2xl flex flex-col max-h-[90vh] z-10 border border-slate-800"
      >
        <button 
          onClick={onBack}
          className="absolute top-4 right-4 z-50 p-2 bg-black/50 hover:bg-brand-primary rounded-full text-white transition-colors"
        >
          <X className="w-6 h-6" />
        </button>

        <div className="overflow-y-auto overflow-x-hidden flex-1">
          <div className="relative h-[250px] sm:h-[300px] md:h-[400px] w-full shrink-0">
            <div className="absolute inset-0 bg-linear-to-t from-slate-900 via-slate-900/40 to-transparent z-10" />
            <img 
              src={post.imageUrl} 
              alt={post.title} 
              className="w-full h-full object-cover"
            />
            <div className="absolute bottom-0 left-0 p-6 md:p-8 z-20 w-full">
              <div className="flex items-center gap-3 mb-4">
                <span className="px-3 py-1 bg-brand-primary text-white text-xs font-bold uppercase rounded-lg">
                  {post.category}
                </span>
                <span className="text-slate-300 text-sm font-medium">
                  {post.date}
                </span>
              </div>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight font-display mb-2">
                {post.title}
              </h1>
            </div>
          </div>

          <div className="p-6 md:p-8">
            {post.id === 'm1' ? (
              <BlogContentMagento />
            ) : post.id === 'm2' ? (
              <BlogContentIos />
            ) : post.id === 'ai1' ? (
              <BlogContentVibecoding />
            ) : post.id === 'vibe-agents' ? (
              <BlogContentVibeAgents />
            ) : post.id === '2' ? (
              <BlogContentSecurity />
            ) : (
              <div className="prose prose-invert prose-brand max-w-none prose-lg text-slate-300">
                <p className="text-xl leading-relaxed mb-6 font-medium text-white">
                  {post.summary}
                </p>
                <p className="leading-relaxed mb-6">
                  Aprofundar-se neste tema é essencial para compreendermos as constantes evoluções tecnológicas e as demandas atuais do mercado de desenvolvimento e segurança da informação. Ao explorarmos as nuances desta categoria técnica, percebemos que a adoção de boas práticas e a implementação de processos otimizados não são apenas diferenciais competitivos, mas requisitos fundamentais para o sucesso de qualquer projeto de software moderno.
                </p>
                <p className="leading-relaxed mb-6">
                  Além dos desafios técnicos envolvidos na implementação dessa tecnologia, é importante destacar o papel da comunidade e do aprendizado contínuo. Ferramentas, frameworks e metodologias ágeis estão em constante transformação. Portanto, manter-se atualizado e compartilhar conhecimento através de artigos, contribuições open-source e discussões arquiteturais é a melhor estratégia para superarmos os obstáculos do dia a dia e construirmos soluções mais robustas, seguras e de alta performance.
                </p>
              </div>
            )}

            <div className="mt-16 pt-8 border-t border-slate-800">
              <h3 className="text-white font-bold text-xl mb-6 text-center">E aí, gostou? Então compartilhe</h3>
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
                  href={shareLinks.telegram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-6 py-3 bg-[#0088cc]/10 text-[#0088cc] hover:bg-[#0088cc] hover:text-white rounded-xl transition-all font-bold"
                >
                  Telegram
                </a>
              </div>
            </div>
          </div>
        </div>
      </motion.article>
    </div>
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
