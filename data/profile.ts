import type { ProfileData } from '../shared/types/portfolio'

export const profileConfig: ProfileData = {
  name: 'Gabriel Pelizzari',
  handle: '@gabrielpelizzari',
  role: 'Desenvolvedor de Software Fullstack',
  headline: 'Construindo sistemas resilientes, APIs bem desenhadas e interfaces minimalistas.',
  subheadline:
    'Desenvolvedor Fullstack focado em Python, FastAPI, arquiteturas orientadas a eventos e ecossistema Vue & Nuxt — unindo engenharia sólida no backend à clareza visual no frontend.',
  location: 'Bento Gonçalves, RS — Brasil',
  available: true,
  availabilityLabel: 'Disponível para oportunidades & projetos',
  email: 'contato@gabrielpelizzari.dev',
  githubUrl: 'https://github.com/gabrielpelizzari',
  githubUsername: 'gabrielpelizzari',
  linkedinUrl: 'https://www.linkedin.com/in/gabrielpelizzari',
  avatarUrl: 'https://avatars.githubusercontent.com/u/120588619?v=4',

  aboutParagraphs: [
    'Sou desenvolvedor de software fullstack em Bento Gonçalves (RS), movido pela mentalidade "Always learning, always building". Gosto de transformar problemas operacionais complexos em sistemas previsíveis, bem testados e simples de operar.',
    'No backend, projeto APIs REST e fluxos assíncronos orientados a eventos utilizando Python, FastAPI, SQLAlchemy, Pydantic e mensageria com RabbitMQ — sempre priorizando contratos de dados claros, segurança com JWT e cobertura automatizada com Pytest.',
    'No frontend, desenvolvo aplicações reativas em Vue.js, Nuxt, TypeScript e Tailwind CSS com foco em performance, tipagem estrita e interfaces minimalistas onde cada elemento tem propósito claro.',
  ],

  principles: [
    {
      index: '01',
      title: 'Arquitetura Assíncrona & Desacoplada',
      description:
        'Uso de mensageria, workers dedicados e máquinas de estado explícitas para manter APIs rápidas e fluxos rastreáveis de ponta a ponta.',
    },
    {
      index: '02',
      title: 'Contratos Fortes & Testes Automatizados',
      description:
        'Validação rigorosa com Pydantic e TypeScript aliada a suítes de testes em Pytest para evoluir o código com confiança.',
    },
    {
      index: '03',
      title: 'Minimalismo Funcional na Interface',
      description:
        'Interfaces limpas, responsivas e sem ruído visual: hierarquia tipográfica precisa, estados claros de feedback e foco total na experiência de uso.',
    },
    {
      index: '04',
      title: 'Ambientes Reprodutíveis',
      description:
        'Padronização com Docker, Docker Compose e gerenciamento moderno de dependências (uv / pnpm) para subir qualquer serviço em um único comando.',
    },
  ],

  stackCategories: [
    {
      id: 'backend',
      title: 'Backend & Arquitetura',
      subtitle: 'APIs de alta performance, regras de negócio e mensageria',
      icon: 'lucide:server',
      items: [
        { name: 'Python', icon: 'simple-icons:python', detail: '3.13+ · Async & Typing' },
        { name: 'FastAPI', icon: 'simple-icons:fastapi', detail: 'REST APIs & OpenAPI' },
        { name: 'RabbitMQ', icon: 'simple-icons:rabbitmq', detail: 'Event-Driven & Workers' },
        { name: 'SQLAlchemy', icon: 'simple-icons:sqlalchemy', detail: 'ORM & Migrations' },
        { name: 'Pydantic', icon: 'simple-icons:pydantic', detail: 'Schemas & Validação' },
        { name: 'JWT Auth', icon: 'lucide:shield-check', detail: 'Autenticação & RBAC' },
      ],
    },
    {
      id: 'frontend',
      title: 'Frontend & UI',
      subtitle: 'Aplicações web reativas, SSR e design minimalista',
      icon: 'lucide:layout-template',
      items: [
        { name: 'Vue.js', icon: 'simple-icons:vuedotjs', detail: 'Composition API & SPA' },
        { name: 'Nuxt', icon: 'simple-icons:nuxtdotjs', detail: 'SSR, Nitro & Fullstack' },
        { name: 'TypeScript', icon: 'simple-icons:typescript', detail: 'Tipagem End-to-End' },
        { name: 'Tailwind CSS', icon: 'simple-icons:tailwindcss', detail: 'Design System & UI' },
        { name: 'Pinia', icon: 'lucide:database-zap', detail: 'Gerenciamento de Estado' },
        { name: 'HTML5 & CSS3', icon: 'simple-icons:html5', detail: 'Semântica & Acessibilidade' },
      ],
    },
    {
      id: 'data-infra',
      title: 'Dados, Qualidade & DevOps',
      subtitle: 'Persistência relacional, conteinerização e testes',
      icon: 'lucide:boxes',
      items: [
        { name: 'MySQL', icon: 'simple-icons:mysql', detail: 'Modelagem Relacional' },
        { name: 'SQLite', icon: 'simple-icons:sqlite', detail: 'Embedded & Zero-Conf' },
        { name: 'Docker', icon: 'simple-icons:docker', detail: 'Containers & Compose' },
        { name: 'Pytest', icon: 'simple-icons:pytest', detail: 'Testes & Cobertura' },
        { name: 'uv', icon: 'lucide:zap', detail: 'Tooling Python Moderno' },
        { name: 'Git & GitHub', icon: 'simple-icons:github', detail: 'Versionamento & Fluxo' },
      ],
    },
  ],
}
