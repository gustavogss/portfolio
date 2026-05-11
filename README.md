# Gustavo Souza | Portfolio & Blog

![Gustavo Souza Banner](https://gustavosouza.dev/images/og-banner.png)

Este é o repositório do portfólio profissional de **Gustavo Souza**, Engenheiro de Software especializado em Mobile e DevSecOps. O projeto foi construído para ser uma central de informações sobre sua carreira, projetos técnicos, habilidades e insights de tecnologia.

## 🚀 Tecnologias Utilizadas

O projeto utiliza uma stack moderna e foca em performance e experiência do usuário (UX):

- **Framework:** [React 19](https://react.dev/)
- **Build Tool:** [Vite](https://vitejs.dev/)
- **Estilização:** [Tailwind CSS 4](https://tailwindcss.com/)
- **Animações:** [Framer Motion (motion/react)](https://www.framer.com/motion/)
- **Ícones:** [Lucide React](https://lucide.dev/)
- **IA Integrada:** [Google Gemini API](https://ai.google.dev/) (para geração inteligente de currículo)
- **PDF Generation:** [jsPDF](https://github.com/parallax/jsPDF) & [html2pdf.js](https://ekoopmans.github.io/html2pdf.js/)

## ✨ Funcionalidades

- **Dashboard Interativo:** Navegação fluida entre seções como Projetos, Experiência, Educação e Blog.
- **Gerador de Currículo com IA:** Integração com a API do Google Gemini para gerar um resumo profissional personalizado em tempo real.
- **Exportação para PDF:** Funcionalidade para baixar o currículo gerado diretamente em formato PDF.
- **Sistema de Blog:** Visualização de artigos e posts sobre tecnologia com suporte a Meta Tags dinâmicas.
- **Design Responsivo:** Otimizado para dispositivos mobile e desktop com uma interface de "Glassmorphism".
- **SEO & Open Graph:** Configurações completas de SEO para compartilhamento em redes sociais e indexação em buscadores.

## 📁 Estrutura do Projeto

```
├── .agents/                # Instruções para agentes de IA (Contexto do projeto)
├── public/                 # Ativos estáticos (robots.txt, favicon, etc)
├── src/
│   ├── assets/             # Logos e imagens
│   ├── components/         # Componentes React reutilizáveis
│   ├── lib/                # Utilitários e geradores (PDF, etc)
│   ├── services/           # Integrações com APIs (Gemini)
│   ├── App.tsx             # Componente principal e roteamento lógico
│   ├── constants.ts        # Base de dados estática (Projetos, Experiência, etc)
│   └── main.tsx            # Ponto de entrada do React
├── index.html              # Template principal HTML
└── package.json            # Dependências e scripts
```

## 🛠️ Como Executar

Para rodar este projeto localmente, siga os passos abaixo:

1. **Clone o repositório:**
   ```bash
   git clone https://github.com/gustavogss/portfolio.git
   ```

2. **Instale as dependências:**
   ```bash
   npm install
   ```

3. **Configure as variáveis de ambiente:**
   Crie um arquivo `.env` na raiz do projeto com sua chave da API do Gemini (opcional para as funcionalidades de IA):
   ```env
   VITE_GEMINI_API_KEY=sua_chave_aqui
   ```

4. **Inicie o servidor de desenvolvimento:**
   ```bash
   npm run dev
   ```

5. **Acesse no navegador:**
   O projeto estará disponível em `http://localhost:3000` (ou na porta configurada pelo Vite).

## 🛡️ Segurança e Boas Práticas

Como um especialista em **AppSec**, este portfólio segue padrões de segurança:
- Sanitização de entradas.
- Uso de `rel="noopener noreferrer"` em links externos.
- Estruturação de código limpa e modular.

## 📄 Licença

Este projeto está sob a licença Apache-2.0. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

---

Desenvolvido com ☕ e 💻 por [Gustavo Souza](https://github.com/gustavogss).
