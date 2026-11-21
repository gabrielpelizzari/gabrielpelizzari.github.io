import type { HardcodedProjectEntry } from '../shared/types/portfolio'

/**
 * CATÁLOGO HARDCODED DE PROJETOS
 * ----------------------------------------------------------------------------
 * Adicione, reordene ou edite seus projetos diretamente neste array.
 * A ordem no array define a ordem de exibição no portfólio.
 *
 * 1) INDICAR UM REPOSITÓRIO DIRETO DO GITHUB (sincroniza linguagens, links, imagens e README):
 *    {
 *      source: 'github',
 *      repo: 'gabrielpelizzari/nome-do-repositorio',
 *    }
 *
 * 2) ESCREVER O PROJETO EM SI (ideal para projetos privados, freelas ou case studies):
 *    {
 *      source: 'custom',
 *      title: 'Nome do Sistema',
 *      summary: 'Resumo curto do problema resolvido e arquitetura.',
 *      year: '2026',
 *      stack: ['Python', 'FastAPI', 'Vue.js'],
 *      content: `
 *        ## Contexto
 *        Descrição completa em Markdown...
 *      `,
 *    }
 */
export const projectsCatalog: HardcodedProjectEntry[] = [
  {
    slug: 'order-flow',
    source: 'github',
    repo: 'gabrielpelizzari/order_flow',
    title: 'OrderFlow',
    summary:
      'Sistema full-stack de processamento de pedidos orientado a eventos com FastAPI, Vue.js, RabbitMQ e Docker — demonstrando fluxos assíncronos, workers em background, timeline de eventos e simulação de falhas.',
    featured: true,
    year: '2026',
    role: 'Fullstack Software Developer',
    status: 'Open Source',
    stack: [
      'Python',
      'FastAPI',
      'RabbitMQ',
      'Vue.js',
      'TypeScript',
      'Pinia',
      'SQLite',
      'Docker',
    ],
    highlights: [
      'Arquitetura orientada a eventos desacoplando criação de pedidos e processamento pesado via filas RabbitMQ',
      'Máquina de estados rastreável (PENDING → PAYMENT_APPROVED → STOCK_RESERVED → READY_TO_SHIP)',
      'Simulador integrado de cenários de falha (cartão sem limite, ruptura de estoque) com timeline em tempo real',
      'Ambiente completo orquestrado com Docker Compose e gerenciamento Python moderno via uv',
    ],
    useGithubReadme: true,
  },

  {
    slug: 'pethub',
    source: 'github',
    repo: 'gabrielpelizzari/projeto_petshop',
    title: 'PetHub — Gestão para Petshops',
    summary:
      'Plataforma web full-stack para gestão operacional de petshops construída com FastAPI, Vue.js e MySQL. Centraliza clientes, pets, raças e atendimentos com painel administrativo, portal do cliente, autenticação JWT e testes automatizados.',
    featured: true,
    year: '2026',
    role: 'Fullstack Software Developer',
    status: 'Open Source',
    stack: [
      'Vue.js',
      'Python',
      'FastAPI',
      'SQLAlchemy',
      'Pydantic',
      'MySQL',
      'JWT',
      'Pytest',
    ],
    highlights: [
      'Painel administrativo dinâmico com métricas em tempo real, gestão de atendimentos, clientes, pets e raças',
      'Portal dedicado ao cliente com histórico completo de serviços e gerenciamento dos próprios animais',
      'Autenticação segura via JWT com proteção granular de rotas por perfil e validação dupla (Frontend + Pydantic)',
      'Suíte de testes automatizados no backend com Pytest e relatório de cobertura',
    ],
    useGithubReadme: true,
  },

  {
    slug: 'arquitetura-portfolio-hibrido',
    source: 'custom',
    title: 'Arquitetura Híbrida de Portfólio em Nuxt',
    summary:
      'Aplicação full-stack minimalista em Nuxt 4, Nitro e Tailwind CSS projetada sem banco de dados ou autenticação, combinando catálogo tipado em código com sincronização automática da API do GitHub.',
    featured: true,
    year: '2026',
    role: 'Autor & Arquiteto Fullstack',
    status: 'Em Produção',
    stack: [
      'Nuxt 4',
      'Vue 3',
      'TypeScript',
      'Tailwind CSS',
      'Nitro Server',
      'Shiki',
      'GitHub API',
    ],
    highlights: [
      'Catálogo 100% declarativo e tipado em TypeScript, dispensando login, painel administrativo ou banco externo',
      'Unificação transparente entre repositórios vivos do GitHub e estudos de caso escritos diretamente no código',
      'Reescrita automática de imagens relativas de READMEs e destaque de sintaxe dual-theme no servidor com Shiki',
      'Interface minimalista com suporte nativo Dark/Light e navegação rápida via Command Palette (Ctrl+K)',
    ],
    content: `
## Contexto & Decisão de Arquitetura

Portfólios de engenharia costumam cair em dois extremos: páginas puramente estáticas que ficam desatualizadas sempre que um repositório evolui no GitHub, ou sistemas com painel administrativo, banco de dados e autenticação desnecessários para um único autor.

A solução adotada neste projeto combina o melhor dos dois mundos por meio de um **catálogo tipado diretamente no código** (\`data/projects.ts\`):

- **Projetos Open Source (\`source: 'github'\`)**: basta apontar \`owner/repo\` para que a camada Nitro busque e faça cache automático de descrição, proporção de linguagens, branch padrão, datas, imagens e \`README.md\`.
- **Projetos Autorais ou Privados (\`source: 'custom'\`)**: toda a documentação técnica, decisões de arquitetura e resultados são escritos diretamente em Markdown tipado no próprio repositório, sem depender de links externos.

## Fluxo de Renderização SSR

\`\`\`text
data/projects.ts (TypeScript Discriminated Union)
   ├── source: "github"  ──► Nitro GitHub Client (Cache em Memória + Fallback)
   │                            ├── Linguagens (bytes e %), stars e metadados
   │                            └── README.md remoto + resolução de imagens Raw
   │
   └── source: "custom"  ──► Markdown autoral embutido no código
                                └── Renderização SSR com Markdown-it + Shiki
\`\`\`

## Detalhes de Implementação

1. **Tipagem Estrita com Discriminated Unions**: Ao declarar \`source: 'github'\` ou \`source: 'custom'\`, o próprio TypeScript valida em tempo de desenvolvimento quais propriedades são obrigatórias e oferece autocompletar imediato.
2. **Cache Resiliente na Camada Nitro**: As respostas da API REST do GitHub ficam em cache em memória no servidor com fallback seguro, garantindo carregamento instantâneo e proteção contra *rate limits*.
3. **Destaque de Sintaxe Zero-JS no Cliente**: Os blocos de código são processados no servidor pelo **Shiki** com variáveis CSS duplas (\`github-light-default\` e \`github-dark-default\`), alternando entre tema claro e escuro sem custo de bundle no navegador.
`,
  },
]
