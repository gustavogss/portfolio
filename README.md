# Gustavo Souza | Portfólio Profissional, Blog & Hub de Carreira

[![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://react.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![jsPDF](https://img.shields.io/badge/jsPDF-E34F26?style=for-the-badge&logo=pdf&logoColor=white)](https://github.com/parallax/jsPDF)

Este é o repositório oficial do portfólio de **Gustavo Souza**, Engenheiro de Software especializado em **Mobile**, **DevSecOps** e **Inteligência Artificial**. O projeto foi estruturado para servir como uma vitrine de alta performance de sua trajetória técnica, seus artigos de blog especializados e um gerador inteligente de currículo em conformidade com as melhores práticas de ATS.

---

## 🚀 Stack Tecnológica

O projeto foi desenvolvido do zero buscando velocidade, legibilidade, acessibilidade e experiência do usuário (UX) excepcional:

*   **Core:** React 18+ (utilizando TypeScript para tipagem estática rigorosa).
*   **Build Tool:** Vite, garantindo tempos de compilação instantâneos e carregamento veloz das páginas.
*   **Estilização:** Tailwind CSS para layouts fluidos, modernos e com comportamento responsivo exemplar em qualquer dispositivo.
*   **Design & Interações:** Efeitos de *Glassmorphism*, paletas vibrantes de gradiente (`brand-primary` para `brand-secondary`) e micro-animações refinadas utilizando Framer Motion (`motion/react`).
*   **Ícones:** Biblioteca Lucide React para representações visuais consistentes e limpas.
*   **Documentos (PDF):** Utilização avançada da biblioteca **jsPDF** para desenhar e renderizar currículos elegantes no padrão de legibilidade exigido por recrutadores e plataformas de ATS (Gupy, etc.).

---

## ✨ Funcionalidades Principais

1.  **Hub de Projetos Reais:** Projetos detalhados e categorizados, cada um acompanhado por suas tecnologias de ponta, repositórios de código e demonstrações ao vivo.
2.  **Seção de Certificações e Cursos Dinâmicos:** Interface visual de cartões que permite ao visitante expandir detalhes da ementa programática (*syllabus*) e a carga horária de cada formação de destaque (Rocketseat, GoHacking, Hackers do Bem, Google, Google Cloud/Coursera).
3.  **Exportação Direta de CV (PDF):** Um gerador de currículos integrado à aplicação. Através de um botão posicionado na seção inicial, os usuários podem exportar o currículo profissional do Gustavo em formato PDF de forma instantânea.
    *   **Práticas ATS:** Layout limpo e direto, estruturado de modo que sistemas de triagem automática de candidatos consigam ler o arquivo sem barreiras.
    *   **Filtros de Privacidade & Foco Técnico:** Remoção inteligente de experiências não alinhadas com o objetivo atual de engenharia de software de ponta (como as atuações em empreendimentos anteriores).
    *   **Monitoramento de Status:** Ajuste automatizado de indicações para certificações ou cursos com status em formação (para os anos correntes ou marcados como "Presente/Atual").
4.  **Sistema de Blog Integrado:** Um espaço dedicado para publicação de artigos técnicos com renderização markdown perfeita, ideal para compartilhar insights de AppSec, segurança cibernética e inovações de IA.

---

## 📁 Estrutura do Projeto

```text
├── .agents/                    # Prompts e contextos para os agentes especialistas de IA (UI, Content, Security)
├── public/                     # Ativos estáticos públicos (favicon, imagens, etc.)
├── src/
│   ├── assets/                 # Recursos visuais locais
│   ├── components/             # Componentes organizados por responsabilidade
│   │   ├── dashboard/          # Telas e modais de gerenciamento administrativo
│   │   ├── sections/           # Seções da página única (Home, Projetos, Cursos, Blog)
│   │   └── ui/                 # Elementos básicos reutilizáveis de interface
│   ├── constants.ts            # Base central de dados estruturados (Cursos, Certificações, Projetos)
│   ├── contexts/               # Provedores de estado global (PortfolioContext)
│   ├── hooks/                  # Custom hooks para consumo de APIs e estados
│   ├── lib/
│   │   └── staticPdfGenerator.ts  # Motor customizado jsPDF para exportação estruturada do CV
│   ├── PortfolioApp.tsx        # Aplicação principal
│   └── main.tsx                # Ponto de entrada React
├── tsconfig.json               # Configurações do compilador TypeScript
├── vite.config.ts              # Arquivo de configuração do bundler Vite
└── package.json                # Gerenciador de dependências e scripts de execução
```

---

## 🛠️ Como Executar o Projeto Localmente

Siga o passo a passo a seguir para ter o ambiente rodando em sua máquina de desenvolvimento:

### Pré-requisitos

Certifique-se de possuir o **Node.js** (versão 18 ou superior) e o gerenciador de pacotes **npm** instalados.

### Passos de Instalação

1.  **Clone o repositório:**
    ```bash
    git clone https://github.com/gustavogss/portfolio.git
    cd portfolio
    ```

2.  **Instale as dependências necessárias:**
    ```bash
    npm install
    ```

3.  **Inicie o servidor de desenvolvimento:**
    ```bash
    npm run dev
    ```

4.  **Acesse no seu navegador:**
    Abra `http://localhost:3000` para visualizar a aplicação de forma interativa.

---

## 🛡️ Segurança e Práticas de Código (AppSec)

Em alinhamento direto com o foco do Gustavo em **Segurança de Aplicações (AppSec)** e **DevSecOps**, o projeto foi desenvolvido com atenção restrita a:

*   **Sanitização e Tratamento de Variáveis:** Nenhuma informação sensível é exposta no código frontend; chaves de API e conexões são gerenciadas por variáveis de ambiente seguras.
*   **Boas Práticas de Navegação:** Uso rigoroso das propriedades `rel="noopener noreferrer"` em links externos de saída para prevenção de vulnerabilidades do tipo *Tabnabbing*.
*   **Código Limpo:** Modularização de componentes, isolamento de lógicas de renderização pesadas em hooks específicos e controle de re-renderizações para melhor desempenho e auditoria mais fácil do código.

---

## 📄 Licença

Este repositório está sob a licença **Apache-2.0**. Para mais informações, consulte o arquivo [LICENSE](./LICENSE) localizado na raiz do projeto.

---

Desenvolvido com carinho e focado em excelência técnica por **[Gustavo Souza](https://github.com/gustavogss)**. 🚀
