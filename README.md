# Portfólio — Gabriel Pelizzari (`@gabrielpelizzari`)

Portfólio profissional e minimalista desenvolvido com **Nuxt 4**, **Tailwind CSS**, **TypeScript**, **Nitro Server** e **Shiki** — **100% configurado direto em código**, sem login, sem painel administrativo e sem banco de dados externo.

---

## Como Adicionar ou Editar Projetos (`data/projects.ts`)

Toda a inserção de projetos é feita diretamente no arquivo tipado [`data/projects.ts`](./data/projects.ts). O TypeScript valida automaticamente os campos obrigatórios e oferece *autocomplete* para os dois formatos suportados:

### 1. Indicar um repositório direto do GitHub (`source: 'github'`)

Basta apontar o `repo` (`usuario/repositorio` ou URL do GitHub). O servidor Nitro busca e faz cache automático da descrição, proporção de linguagens, stars, datas, imagens relativas e do `README.md` oficial:

```ts
{
  source: 'github',
  repo: 'gabrielpelizzari/order_flow',
  // Opcionais (se omitidos, são extraídos automaticamente do GitHub):
  title: 'OrderFlow',
  summary: 'Resumo personalizado em português...',
  stack: ['Python', 'FastAPI', 'RabbitMQ', 'Vue.js', 'Docker'],
  highlights: [
    'Arquitetura orientada a eventos com workers assíncronos',
  ],
}
```

### 2. Escrever o projeto em si (`source: 'custom'`)

Para projetos privados, freelas, sistemas corporativos ou estudos de caso sem repositório público, escreva o projeto diretamente no objeto em Markdown:

```ts
{
  slug: 'plataforma-financeira',
  source: 'custom',
  title: 'Plataforma de Conciliação Financeira',
  summary: 'Pipeline assíncrono para conciliação de pagamentos em alto volume.',
  year: '2026',
  role: 'Fullstack Software Developer',
  status: 'Em Produção',
  stack: ['Python', 'FastAPI', 'Vue.js', 'MySQL'],
  highlights: [
    'Redução de 70% no tempo de processamento diário',
    'Cobertura automatizada com Pytest',
  ],
  content: `
## Contexto & Desafio
Descrição completa em Markdown com blocos de código, listas e tabelas...
  `,
}
```

---

## Onde Editar Perfil, Contato e Stack (`data/profile.ts`)

Edite [`data/profile.ts`](./data/profile.ts) para ajustar:
- Nome, cargo, localização, status de disponibilidade, e-mail e LinkedIn
- Parágrafos da seção **Sobre & Filosofia** e princípios de engenharia
- Categorias e tecnologias da seção **Stack & Ferramentas**

---

## Executar Localmente & Build

```bash
# Instalar dependências
npm install

# Rodar em desenvolvimento (http://localhost:3000)
npm run dev

# Build de produção (SSR)
npm run build
npm run preview

# Geração estática (GitHub Pages)
npm run generate
```

## Deploy Automático (GitHub Pages)

O workflow [`.github/workflows/deploy.yml`](./.github/workflows/deploy.yml) gera o site estático (`npm run generate`) e publica automaticamente em `https://gabrielpelizzari.github.io` a cada `push` na branch `main` (ou sob demanda pela aba **Actions** no GitHub).
