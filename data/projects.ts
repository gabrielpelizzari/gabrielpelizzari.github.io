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
]
