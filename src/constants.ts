import {
  Code2,
  Database,
  Globe,
  Layers,
  MessageSquare,
  Monitor,
  ShieldCheck,
  Smartphone,
  Cloud,
  Terminal,
  Github,
  Linkedin,
  Mail,
  ExternalLink,
} from "lucide-react";

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
    id: "1",
    name: "Task Manager (DevSecOps)",
    description:
      "Estudo de Caso de DevSecOps: API Python com simulação de ataque Brute Force com Hydra, gerenciamento com Docker, e pipelines com DAST/SAST (OWASP ZAP, Bandit), mais telemetria completa via Prometheus e Grafana.",
    techs: [
      "Python",
      "Docker",
      "Owasp ZAP",
      "Prometheus",
      "Grafana",
      "Hydra",
      "CI/CD",
    ],
    imageUrl:
      "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=60&w=400",
    link: "https://github.com/gustavogss/task-manager",
  },
  {
    id: "2",
    name: "FinexyIA",
    description:
      "Aplicativo de finanças pessoais com previsões, simulações de investimentos e insights personalizados, provando habilidades em ecossistema mobile com React Native e Expo.",
    techs: ["React Native", "Expo", "TypeScript", "Nativewind"],
    imageUrl:
      "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&q=60&w=400",
    link: "https://github.com/gustavogss/finexyia/tree/main",
  },
  {
    id: "3",
    name: "Osint Toolkit",
    description:
      "Poderoso script focado em segurança ofensiva (Pentest) para automatizar e facilitar os processos de reconhecimento e OSINT durante engajamentos de cyber segurança.",
    techs: ["Shell Script", "Nmap", "Sherlock", "Linux"],
    imageUrl:
      "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=60&w=400",
    link: "https://github.com/gustavogss/osint-toolkit",
  },
  {
    id: "4",
    name: "Lista de Compras",
    description:
      "Aplicativo para gerenciar listas de compras validando conceitos modernos do ecosistema React, implementado com Expo, TypeScript e persistência via Async Storage.",
    techs: ["React Native", "Expo", "TypeScript", "Async Storage"],
    imageUrl:
      "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&q=60&w=400",
    link: "https://github.com/gustavogss/listadecompras",
  },
  {
    id: "5",
    name: "Delivery App",
    description:
      "Aplicativo completo de Delivery multiplataforma para dispositivos Android e iOS demonstrando forte domínio no layout com Flutter e UI components robustos.",
    techs: ["Flutter", "Dart", "Material UI"],
    imageUrl:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=60&w=400",
    link: "https://github.com/gustavogss/delivery",
  },
  {
    id: "6",
    name: "ToDoList React",
    description:
      "Aplicação ToDoList interativa implementada em React.js, TypeScript e Sass — validando conhecimentos práticos de componentização e gerenciamento de estado no frontend.",
    techs: ["React", "TypeScript", "Sass"],
    imageUrl:
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=60&w=400",
    link: "https://github.com/gustavogss/todolist-react",
  },
];

export const TECH_CATEGORIES: TechCategory[] = [
  {
    title: "IA & Automação",
    icon: Layers,
    items: ["LLMs", "Langchain", "N8N", "RAG", "MCP", "Claude", "Ollama"],
  },
  {
    title: "Mobile & Frontend",
    icon: Smartphone,
    items: ["React Native", "Expo", "Flutter", "React", "Next.js", "Tailwind"],
  },
  {
    title: "Backend",
    icon: Code2,
    items: ["Node.js", "Fastify", "Python", "Firebase", "TypeScript", "PostgreSQL", "Prisma"],
  },
  {
    title: "Metodologias",
    icon: Terminal,
    items: ["UML", "Scrum", "XP", "Kanban", "Git Flow", "Clean Code"],
  },
  {
    title: "DevSecOps",
    icon: ShieldCheck,
    items: [
      "Docker",
      "CI/CD",
      "SAST & DAST",
      "Prometheus & Grafana",
      "Sonarqube",
      "Snyk",
    ],
  },
  {
    title: "Segurança da Informação",
    icon: Globe,
    items: ["Kali Linux", "Hydra", "Nmap", "OWASP Top 10", "OSINT", "Pentest"],
  },
];

export const BLOG_POSTS: BlogPost[] = [
  {
    id: "m1",
    title: "Como rodar Magento 2 localmente sem custo (usando Docker)",
    summary:
      "Se você já tentou estudar Magento 2, sabe que o maior desafio não é o código — é a infraestrutura. Aprenda a rodar do jeito certo.",
    date: "10 Mai 2026",
    imageUrl:
      "https://images.unsplash.com/photo-1605379399642-870262d3d051?auto=format&fit=crop&q=60&w=400",
    category: "E-commerce",
  },
  {
    id: "ai1",
    title: "Vibecoding Seguro e Monitoramento Contínuo",
    summary:
      "A empolgação de usar IA para gerar código (Vibecoding) precisa vir acompanhada de uma pipeline de segurança e monitoramento robusto.",
    date: "10 Mai 2026",
    imageUrl:
      "https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?auto=format&fit=crop&w=400&q=60",
    category: "IA",
  },
  {
    id: "2",
    title: "Segurança em Primeiro Lugar",
    summary:
      "Princípios essenciais de DevSecOps para garantir que seu deploy não seja um pesadelo.",
    date: "10 Mai 2026",
    imageUrl:
      "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&q=60&w=400",
    category: "Segurança",
  },
  {
    id: "m2",
    title: "Como ter um emulador para iOS sem um Mac",
    summary:
      "Testar apps iOS sempre foi um desafio custoso para desenvolvedores que não possuem equipamentos da Apple. Veja como resolver isso com Docker.",
    date: "10 Mai 2026",
    imageUrl:
      "https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?auto=format&fit=crop&q=60&w=400",
    category: "Mobile",
  },
  {
    id: "vibe-agents",
    title: "Desenvolvimento com Vibecoding e Agentes",
    summary:
      "A evolução do Vibecoding: como utilizar agentes especialistas para evitar os erros comuns de geração de código e escalar projetos com qualidade.",
    date: "11 Mai 2026",
    imageUrl:
      "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?auto=format&fit=crop&q=60&w=400",
    category: "Boas Práticas",
  },
];

export const EXPERIENCES: Experience[] = [
  {
    company: "Programa Hackers do Bem",
    role: "Projeto Prático em DevSecOps",
    period: "2025",
    description:
      "Estudo de caso de implantação de uma pipeline de segurança do build ao deploy com ferramentas SAST, DAST e monitoramento como Prometheus e Grafana, em uma aplicação com Python e Flask, simulações de ataque de Brute Force na rota de login com Hydra.",
  },
  {
    company: "G Soluções Digitais e Consultoria",
    role: "Engenheiro de Software",
    period: "Junho de 2023 - Presente",
    description:
      "Desenvolvimento de aplicações web complexas com React e Next.js. Construção de backends robustos com Node.js, Fastify e Prisma ORM. Atuação em projetos mobile com React Native e implementação de automações.",
  },
  {
    company: "DIASTEC",
    role: "Desenvolvedor Web",
    period: "Agosto de 2023 - Janeiro de 2025",
    description:
      "Desenvolvimento e manutenção de landing pages e sites institucionais, com foco total em otimização de performance e SEO.",
  },
  {
    company: "Way E-commerce",
    role: "Desenvolvedor Web",
    period: "Janeiro de 2020 - Agosto de 2020",
    description:
      "Customização de lojas virtuais na plataforma Magento 2 e integração de gateways de pagamento e frete.",
  },
  {
    company: "Projeto Cooperar",
    role: "Estágio de Analista de Sistema",
    period: "Março de 1998 - Outubro de 1998",
    description:
      "Modelagem com UML e implementação de um sistema gerenciador de frota de veículos da instituição em Delphi e SQL.",
  },
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
    institution: "Rocketseat",
    degree: "IA para Dev e Automação",
    period: "2026",
    description:
      "Especializando: LLMs, Agentes, Langchain, N8N, RAG, Claude, Antropic, Cursor, Ollama, MCP",
  },
  {
    institution: "GoHacking",
    degree: "Pentests Web",
    period: "2025",
    description:
      "Imersão técnica: Enumeração, Osint, ferramentas de intrusão, Openvas, Hydra, Kali Linux, Nmap, Scanners, Pós exploração e Artefatos",
  },
  {
    institution: "RNP e Gov.br",
    degree: "DevOps e DevSecOps",
    period: "2024",
    description:
      "Formação em DevOps e DevSecOps: Docker, CI/CD, Sonarqube, SAST, DAST, Pentests, Snyk, IAC, OWASP Top 10",
  },
  {
    institution: "Rocketseat",
    degree: "Desenvolvimento Web e Mobile",
    period: "2022 - 2023",
    description:
      "Especialização em tecnologias modernas do ecossistema JavaScript (React, Next, React Native e Node).",
  },
  {
    institution: "Trybe",
    degree: "Desenvolvimento Web Full Stack",
    period: "2021 - 2023",
    description:
      "Formação intensiva com foco em fundamentos, Frontend, Backend e Ciência da Computação.",
  },
  {
    institution: "Estácio",
    degree: "Pós-graduação em Sistemas Móveis e Embarcados",
    period: "2012 - 2014",
    description:
      "Especialização em arquitetura de software para dispositivos móveis e sistemas embarcados.",
  },
  {
    institution: "Faculdades Asper",
    degree: "Tecnólogo em Processamento de Dados",
    period: "1996 - 1999",
    description:
      "Graduação tecnológica com base sólida em algoritmos, lógica e estrutura de dados.",
  },
];

export const CERTIFICATIONS: Certification[] = [
  {
    id: "1",
    name: "IA para Dev e Automação",
    issuer: "Rocketseat",
    date: "2026",
    link: "#",
  },
  {
    id: "2",
    name: "Pentests Web",
    issuer: "GoHacking",
    date: "2025",
    link: "#",
  },
  {
    id: "3",
    name: "CyberSegurança (Hackers do Bem)",
    issuer: "RNP/MCTI",
    date: "2025",
    link: "#",
  },
  {
    id: "4",
    name: "DevOps & DevSecOps",
    issuer: "Hackers do Bem / Gov.br",
    date: "2024",
    link: "#",
  },
  {
    id: "5",
    name: "NLW Expert trilha de React",
    issuer: "Rocketseat",
    date: "2024",
    link: "#",
  },
  {
    id: "6",
    name: "Google Cybersecurity Professional Certificate",
    issuer: "Google",
    date: "2023",
    link: "#",
  },
  {
    id: "7",
    name: "Professional Cloud Security Engineer",
    issuer: "Google Cloud",
    date: "2023",
    link: "#",
  },
  {
    id: "8",
    name: "International Career Acceleration",
    issuer: "Volkswagen Digital Solutions",
    date: "2023",
    link: "#",
  },
  {
    id: "9",
    name: "Desenvolvimento Web Full Stack",
    issuer: "Trybe",
    date: "2023",
    link: "#",
  },
  {
    id: "10",
    name: "OWASP Top 10: Security Vulnerabilities",
    issuer: "AppSec Guide",
    date: "2022",
    link: "#",
  },
];
