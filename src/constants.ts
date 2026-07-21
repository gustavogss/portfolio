import { 
  Code2, 
  Database, 
  Globe, 
  Layers, 
  MessageSquare, 
  Monitor, 
  ShieldCheck, 
  Shield,
  Smartphone, 
  Cloud,
  Terminal,
  Github,
  Linkedin,
  Mail,
  ExternalLink
} from 'lucide-react';

const projectTaskManager = 'https://images.unsplash.com/photo-1611224885990-ab7363d1f2a9?auto=format&fit=crop&w=400&q=80';
const projectFinexyia = 'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?auto=format&fit=crop&w=400&q=80';
const projectOsintToolkit = 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=400&q=80';
const projectListadecompras = 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=400&q=80';
const projectDelivery = 'https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&w=400&q=80';
const projectTodolistReact = 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=400&q=80';
const projectSosjampa = 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=400&q=80';

const postMagento2 = 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=400&q=80';
const postVibecodingSeguro = 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=400&q=80';
const postSegurancaPrimeiro = 'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=400&q=80';
const postEmuladorIos = 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=400&q=80';
const postVibeAgents = 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&w=400&q=80';

const courseIa = 'https://images.unsplash.com/photo-1677442136019-21780efad99a?auto=format&fit=crop&w=400&q=80';
const coursePentest = 'https://images.unsplash.com/photo-1601597111158-2fceff270190?auto=format&fit=crop&w=400&q=80';
const courseDevops = 'https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?auto=format&fit=crop&w=400&q=80';
const courseFullstack = 'https://images.unsplash.com/photo-1547082299-de196ea013d6?auto=format&fit=crop&w=400&q=80';
const courseCybersecurity = 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=400&q=80';

export interface Project {
  id: string;
  name: string;
  description: string;
  techs: string[];
  imageUrl: string;
  link?: string;
}

export interface TechCategory {
  title: string;
  icon: any;
  items: string[];
}

export interface BlogPost {
  id: string;
  title: string;
  summary: string;
  content?: string;
  date: string;
  imageUrl: string;
  category: string;
}

export interface Experience {
  company: string;
  role: string;
  period: string;
  description: string;
}

export const PROJECTS: Project[] = [
  {
    id: '1',
    name: 'Task Manager (DevSecOps)',
    description: '**Objetivo**: Estudo de caso prático de segurança, conteinerização e telemetria para APIs Python.\n**Tecnologias**: Python, Docker, OWASP ZAP, Prometheus, Grafana, Hydra, CI/CD.',
    techs: ['Python', 'Docker', 'Owasp ZAP', 'Prometheus', 'Grafana', 'Hydra', 'CI/CD'],
    imageUrl: projectTaskManager,
    link: 'https://github.com/gustavogss/task-manager'
  },
  {
    id: '2',
    name: 'FinexyIA',
    description: '**Objetivo**: Aplicativo para gestão de finanças pessoais com previsões e simulações inteligentes.\n**Tecnologias**: React Native, Expo, TypeScript, Nativewind, Gemini API.',
    techs: ['React Native', 'Expo', 'TypeScript', 'Nativewind'],
    imageUrl: projectFinexyia,
    link: 'https://github.com/gustavogss/finexyia/tree/main'
  },
  {
    id: '3',
    name: 'Osint Toolkit',
    description: '**Objetivo**: Script para automação de atividades de reconhecimento e OSINT em testes de cibersegurança.\n**Tecnologias**: Shell Script, Nmap, Sherlock, Linux CLI.',
    techs: ['Shell Script', 'Nmap', 'Sherlock', 'Linux'],
    imageUrl: projectOsintToolkit,
    link: 'https://github.com/gustavogss/osint-toolkit'
  },
  {
    id: 'HIJKvZesgpH1i031SEqT',
    name: 'SOS Jampa',
    description: '**Objetivo**: Desenvolvimento voluntário de uma plataforma mobile para apoio a ações humanitárias e gestão de doações em situações de emergência na cidade de João Pessoa.\n**Tecnologias**: React Native, Nativewind, Typescript, Firebase',
    techs: ['React Native', 'Nativewind', 'Typescript', 'Firebase'],
    imageUrl: projectSosjampa,
    link: 'https://github.com/gustavogss/sosjampa'
  }
];

export const TECH_CATEGORIES: TechCategory[] = [
  {
    title: 'Frontend',
    icon: Smartphone,
    items: ['React', 'Next.js', 'React Native', 'TypeScript', 'Tailwind CSS', 'HTML/CSS']
  },
  {
    title: 'Backend',
    icon: Code2,
    items: ['Node.js', 'Fastify', 'Prisma', 'PostgreSQL', 'Firebase', 'MySQL']
  },
  {
    title: 'Segurança',
    icon: Shield,
    items: ['Pentests (Web, Wifi, IA)', 'Kali Linux', 'Nmap', 'Burp Suite', 'Metasploit', 'Ethical Hacking']
  },
  {
    title: 'DevSecOps',
    icon: ShieldCheck,
    items: ['Docker', 'CI/CD', 'SAST', 'DAST', 'SonarQube', 'Prometheus', 'Grafana']
  },
  {
    title: 'IA',
    icon: Layers,
    items: ['LangChain', 'RAG', 'MCP', 'Claude', 'Ollama', 'N8N']
  },
  {
    title: 'Metodologias',
    icon: Terminal,
    items: ['Scrum', 'Kanban', 'Git', 'Git Flow', 'Clean Code']
  }
];

export const BLOG_POSTS: BlogPost[] = [
  {
    id: 'm1',
    title: 'Como rodar Magento 2 localmente sem custo (usando Docker)',
    summary: 'Se você já tentou estudar Magento 2, sabe que o maior desafio não é o código — é a infraestrutura. Aprenda a rodar do jeito certo.',
    date: '10 Mai 2026',
    imageUrl: postMagento2,
    category: 'E-commerce'
  },
  {
    id: 'ai1',
    title: 'Vibecoding Seguro e Monitoramento Contínuo',
    summary: 'A empolgação de usar IA para gerar código (Vibecoding) precisa vir acompanhada de uma pipeline de segurança e monitoramento robusto.',
    date: '10 Mai 2026',
    imageUrl: postVibecodingSeguro,
    category: 'IA'
  },
  {
    id: '2',
    title: 'Segurança em Primeiro Lugar',
    summary: 'Princípios essenciais de DevSecOps para garantir que seu deploy não seja um pesadelo.',
    date: '10 Mai 2026',
    imageUrl: postSegurancaPrimeiro,
    category: 'Segurança'
  },
  {
    id: 'm2',
    title: 'Como ter um emulador para iOS sem um Mac',
    summary: 'Testar apps iOS sempre foi um desafio custoso para desenvolvedores que não possuem equipamentos da Apple. Veja como resolver isso com Docker.',
    date: '10 Mai 2026',
    imageUrl: postEmuladorIos,
    category: 'Mobile'
  },
  {
    id: 'vibe-agents',
    title: 'Desenvolvimento com Vibecoding e Agentes',
    summary: 'A evolução do Vibecoding: como utilizar agentes especialistas para evitar os erros comuns de geração de código e escalar projetos com qualidade.',
    date: '11 Mai 2026',
    imageUrl: postVibeAgents,
    category: 'Boas Práticas'
  }
];

export const EXPERIENCES: Experience[] = [
  {
    company: 'G Soluções Digitais e Consultoria',
    role: 'Engenheiro de Software Full Stack & Mobile',
    period: 'Junho de 2023 - Presente',
    description: '• Desenvolvimento de aplicações web utilizando React, Next.js e Tailwind CSS.\n• Construção de APIs com Node.js, Fastify, TypeScript, Prisma e PostgreSQL.\n• Desenvolvimento de aplicativos móveis e automações de processos de negócios.'
  },
  {
    company: 'Programa Hackers do Bem',
    role: 'DevSecOps & AppSec (Projeto Prático de Formação)',
    period: '2025',
    description: '• Implantação de pipeline DevSecOps.\n• Utilização de SAST, DAST, Docker, Prometheus e Grafana.\n• Simulação de ataques utilizando Hydra.'
  },
  {
    company: 'DIASTEC',
    role: 'Desenvolvedor Web Frontend',
    period: 'Agosto de 2023 - Janeiro de 2025',
    description: '• Desenvolvimento de landing pages e sites institucionais.\n• Otimização de SEO e performance.\n• Melhorias de experiência do usuário.'
  },
  {
    company: 'Way E-commerce',
    role: 'Desenvolvedor Web Backend / E-commerce',
    period: 'Janeiro de 2020 - Agosto de 2020',
    description: '• Customização de lojas Magento 2.\n• Integração de meios de pagamento e frete.\n• Correções e manutenção da plataforma.'
  },
  {
    company: 'Projeto Cooperar',
    role: 'Estágio de Analista de Sistemas',
    period: 'Março de 1998 - Outubro de 1998',
    description: '• Desenvolvimento de sistema de gestão em Delphi.\n• Modelagem utilizando UML.\n• Banco de dados SQL.'
  }
];

export interface Education {
  institution: string;
  degree: string;
  period: string;
  description: string;
}

export interface Certification {
  id: string;
  name: string;
  issuer: string;
  date: string;
  link?: string;
}

export const EDUCATION: Education[] = [
  {
    institution: 'Rocketseat',
    degree: 'IA para Dev e Automação',
    period: '2026',
    description: ''
  },
  {
    institution: 'GoHacking',
    degree: 'Pentests Web',
    period: '2025',
    description: ''
  },
  {
    institution: 'RNP e Gov.br',
    degree: 'DevOps e DevSecOps',
    period: '2024',
    description: ''
  },
  {
    institution: 'Rocketseat',
    degree: 'Desenvolvimento Web e Mobile',
    period: '2022 - 2023',
    description: ''
  },
  {
    institution: 'Trybe',
    degree: 'Desenvolvimento Web Full Stack',
    period: '2021 - 2023',
    description: ''
  },
  {
    institution: 'Estácio',
    degree: 'Pós-graduação em Sistemas Móveis e Embarcados',
    period: '2012 - 2014',
    description: ''
  },
  {
    institution: 'Faculdades Asper',
    degree: 'Tecnólogo em Processamento de Dados',
    period: '1996 - 1999',
    description: ''
  }
];

export const CERTIFICATIONS: Certification[] = [
  {
    id: '7',
    name: 'Professional Cloud Security Engineer',
    issuer: 'Google Cloud',
    date: '2023',
    link: '#'
  },
  {
    id: '6',
    name: 'Google Cybersecurity Professional Certificate',
    issuer: 'Google',
    date: '2023',
    link: '#'
  },
  {
    id: '3',
    name: 'CyberSegurança (Hackers do Bem)',
    issuer: 'RNP/MCTI',
    date: '2025',
    link: '#'
  },
  {
    id: '4',
    name: 'DevOps & DevSecOps',
    issuer: 'Hackers do Bem / Gov.br',
    date: '2024',
    link: '#'
  },
  {
    id: '2',
    name: 'Pentests Web',
    issuer: 'GoHacking',
    date: '2025',
    link: '#'
  },
  {
    id: '1',
    name: 'IA para Dev e Automação',
    issuer: 'Rocketseat',
    date: '2026',
    link: '#'
  },
  {
    id: '9',
    name: 'Desenvolvimento Web Full Stack',
    issuer: 'Trybe',
    date: '2023',
    link: '#'
  },
  {
    id: '5',
    name: 'NLW Expert trilha de React',
    issuer: 'Rocketseat',
    date: '2024',
    link: '#'
  },
  {
    id: '8',
    name: 'International Career Acceleration',
    issuer: 'Volkswagen Digital Solutions',
    date: '2023',
    link: '#'
  },
  {
    id: '10',
    name: 'OWASP Top 10: Security Vulnerabilities',
    issuer: 'AppSec Guide',
    date: '2022',
    link: '#'
  }
];

export interface Course {
  id: string;
  title: string;
  description: string;
  category: string;
  issuer: string;
  date: string;
  imageUrl: string;
  link: string;
  syllabus?: string[];
  duration?: string;
}

export const COURSES: Course[] = [
  {
    id: 'c1',
    title: 'IA para Dev e Automação',
    description: 'Especialização avançada focada no desenvolvimento de agentes inteligentes, orquestração de LLMs com Langchain, automação de fluxos complexos no N8N, e técnicas de RAG (Retrieval-Augmented Generation) integradas localmente com Claude e Ollama.',
    category: 'IA & Automação',
    issuer: 'Rocketseat',
    date: '2026',
    imageUrl: courseIa,
    link: 'https://rocketseat.com.br/',
    duration: '60 horas',
    syllabus: [
      'Introdução a LLMs, Modelos Open-Source (Ollama) e APIs proprietárias',
      'Orquestração de LLMs e Cadeias complexas com LangChain',
      'Desenvolvimento de Agentes de IA autônomos e Multi-Agentes',
      'Sistemas de RAG (Retrieval-Augmented Generation) com Bancos de Vetores',
      'Construção de Automações visuais robustas no N8N',
      'Integrações com APIs de Mensageria e Ferramentas Corporativas'
    ]
  },
  {
    id: 'c2',
    title: 'Pentests Web Avançado',
    description: 'Formação em testes de intrusão e segurança ofensiva em aplicações web. Cobrindo enumeração detalhada, exploração prática do OWASP Top 10, scanners automatizados (Nmap, OpenVAS), OSINT, técnicas de brute force com Hydra, engenharia social e análise de artefatos residuais.',
    category: 'Segurança & Pentest',
    issuer: 'GoHacking',
    date: '2025',
    imageUrl: coursePentest,
    link: 'https://gohacking.com.br/',
    duration: '80 horas',
    syllabus: [
      'Information Gathering, Reconhecimento e OSINT avançado',
      'Varredura de Vulnerabilidades ativas/passivas (Nmap, OWASP ZAP, Burp Suite)',
      'Exploração profunda de vulnerabilidades do OWASP Top 10 (SQLi, XSS, SSRF, LFI/RFI)',
      'Técnicas de bypass de Web Application Firewalls (WAF)',
      'Ataques de Força Bruta estruturados e quebra de senhas offline/online',
      'Escalação de privilégios e pós-exploração de servidores Web',
      'Desenvolvimento de relatórios profissionais de auditoria (Report)'
    ]
  },
  {
    id: 'c3',
    title: 'DevOps e DevSecOps Professional',
    description: 'Programa prático e intensivo focado em esteiras modernas de CI/CD. Abrange conteinerização escalável com Docker, orquestração de deploys seguros, análise estática de código com SonarQube, detecção de vulnerabilidades com Snyk, testes dinâmicos (DAST) e práticas robustas de Shift-Left.',
    category: 'DevSecOps',
    issuer: 'Hackers do Bem / Gov.br',
    date: '2024',
    imageUrl: courseDevops,
    link: 'https://hackersdobem.org.br/',
    duration: '120 horas',
    syllabus: [
      'Cultura DevOps, Shift-Left e os pilares de Segurança (DevSecOps)',
      'Conteinerização escalável com Docker e Docker Compose',
      'Automação de Pipelines CI/CD com GitHub Actions e GitLab CI',
      'Análise Estática de Segurança de Aplicações (SAST) com SonarQube e Semgrep',
      'Análise de Composição de Software (SCA) e vulnerabilidades com Snyk',
      'Testes Dinâmicos de Segurança (DAST) automatizados no fluxo CI/CD',
      'Infraestrutura como Código (IaC) segura utilizando Terraform e Ansible'
    ]
  },
  {
    id: 'c4',
    title: 'Desenvolvimento Web e Mobile Full Stack',
    description: 'Imersão no ecossistema JavaScript e TypeScript. Desenvolvimento de interfaces SPA e SSR altamente responsivas com ReactJS e Next.js, backends escaláveis com NodeJS e Fastify, e aplicativos nativos para iOS e Android com React Native (Expo) e Flutter.',
    category: 'Mobile & Frontend',
    issuer: 'Rocketseat',
    date: '2023',
    imageUrl: courseFullstack,
    link: 'https://rocketseat.com.br/',
    duration: '240 horas',
    syllabus: [
      'Fundamentos sólidos de TypeScript e Padrões de Projetos Modernos',
      'Criação de Interfaces Interativas e Otimizadas com ReactJS e TailwindCSS',
      'Renderização do lado do servidor (SSR) e SEO otimizado com Next.js',
      'Construção de APIs REST robustas com Node.js, Fastify e Express',
      'Integração de Bancos de Dados Relacionais e Não-Relacionais com Prisma e Drizzle',
      'Desenvolvimento Multiplataforma Nativo com React Native, Expo e Flutter',
      'Testes Unitários e de Integração com Jest, Vitest e Playwright'
    ]
  },
  {
    id: 'c5',
    title: 'Google Cybersecurity Professional',
    description: 'Certificado profissional emitido pelo Google focado em arquiteturas defensivas, controle e análise de tráfego de redes, programação aplicada à segurança com Python, uso do Linux Terminal, detecção de ameaças e gerenciamento de incidentes de SIEM.',
    category: 'Segurança & Pentest',
    issuer: 'Google',
    date: '2023',
    imageUrl: courseCybersecurity,
    link: 'https://grow.google/certificates/cybersecurity/',
    duration: '180 horas',
    syllabus: [
      'Fundamentos de Cibersegurança e Frameworks de Segurança (NIST)',
      'Gerenciamento de Riscos e Detecção de Ameaças ativas',
      'Segurança de Redes: Protocolos TCP/IP, Firewalls e análise de tráfego de rede',
      'Automação de tarefas e análises de logs usando a linguagem Python',
      'Comandos e Administração básica em sistemas Linux via Terminal',
      'Investigação de incidentes e uso de ferramentas SIEM (Chronicle, Splunk)',
      'Técnicas defensivas e preparação para certificações internacionais'
    ]
  },
  {
    id: 'c6',
    title: 'Cloud Security Engineering Specialist',
    description: 'Formação com foco na segurança de infraestruturas em nuvem da Google Cloud Platform (GCP). Implementação de controles rígidos de acesso (IAM), chaves criptográficas, segurança e isolamento de redes virtuais, monitoramento integrado e conformidade em containers.',
    category: 'DevSecOps',
    issuer: 'Google Cloud / Coursera',
    date: '2023',
    imageUrl: courseCybersecurity,
    link: 'https://cloud.google.com/certification/cloud-security-engineer',
    duration: '40 horas',
    syllabus: [
      'Estrutura de recursos e governança no Google Cloud Platform (GCP)',
      'Gerenciamento de Identidade e Acesso (IAM) com privilégio mínimo',
      'Isolamento de Redes: VPCs, Firewall Rules, Cloud NAT e Conectividade Segura',
      'Proteção de Dados: Cloud KMS (criptografia), Cloud HSM e Cloud Data Loss Prevention (DLP)',
      'Segurança em Containers: Auditorias no GKE e varreduras de vulnerabilidades de imagens',
      'Monitoramento Inteligente com Cloud Logging, Cloud Monitoring e Security Command Center'
    ]
  }
];
