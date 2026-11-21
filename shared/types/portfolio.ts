export type ProjectSource = 'github' | 'custom'

export interface LanguageBreakdownItem {
  name: string
  bytes: number
  percentage: number
  color: string
}

export interface ProjectTocItem {
  id: string
  text: string
  level: number
}

interface BaseProjectEntry {
  /** Slug único da URL em /projetos/[slug] (opcional para GitHub — usa o nome do repositório se omitido) */
  slug?: string
  /** Destacar projeto na página inicial */
  featured?: boolean
  /** Ano de referência (ex: "2026") */
  year?: string
  /** Seu papel no projeto (ex: "Fullstack Software Developer") */
  role?: string
  /** Status exibido no selo (ex: "Open Source", "Em Produção", "Case Study") */
  status?: string
  /** Tecnologias principais exibidas nos filtros e badges */
  stack?: string[]
  /** Pontos de destaque técnico exibidos no card e no topo da página do projeto */
  highlights?: string[]
  /** Link de demonstração online / deploy (opcional) */
  liveUrl?: string
  /** Imagem de capa opcional (em projetos GitHub é extraída automaticamente do README se omitida) */
  coverImage?: string
}

/**
 * Projeto conectado diretamente a um repositório do GitHub.
 * Apenas `source: 'github'` e `repo: 'owner/name'` são obrigatórios.
 */
export interface GithubProjectEntry extends BaseProjectEntry {
  source: 'github'
  /** Repositório no formato "usuario/repositorio" ou URL completa do GitHub */
  repo: string
  /** Sobrescreve o nome do repositório caso queira um título mais amigável */
  title?: string
  /** Sobrescreve a descrição vinda do GitHub (ex: tradução/resumo em PT-BR) */
  summary?: string
  /** Renderizar automaticamente o README.md do GitHub (padrão: true) */
  useGithubReadme?: boolean
  /** Texto Markdown complementar opcional exibido antes do README do GitHub */
  content?: string
}

/**
 * Projeto escrito diretamente no código do portfólio (sem depender da API do GitHub).
 * Ideal para projetos privados, corporativos, freelas ou estudos de caso autorais.
 */
export interface CustomProjectEntry extends BaseProjectEntry {
  source: 'custom'
  /** Título obrigatório do projeto */
  title: string
  /** Resumo executivo exibido na listagem e no cabeçalho */
  summary: string
  /** Link opcional de repositório caso exista */
  repoUrl?: string
  /** Documentação completa do projeto em Markdown (suporta código, tabelas, listas e imagens) */
  content: string
}

export type HardcodedProjectEntry = GithubProjectEntry | CustomProjectEntry

export interface GithubRepoStats {
  fullName: string
  name: string
  owner: string
  description: string | null
  htmlUrl: string
  homepage: string | null
  defaultBranch: string
  primaryLanguage: string | null
  stars: number
  forks: number
  topics: string[]
  updatedAt: string
  createdAt: string
  languages: LanguageBreakdownItem[]
}

export interface PortfolioProjectSummary {
  slug: string
  source: ProjectSource
  title: string
  summary: string
  featured: boolean
  order: number
  year: string
  role: string
  status: string
  stack: string[]
  highlights: string[]
  liveUrl: string | null
  repoUrl: string | null
  repoFullName: string | null
  coverImage: string | null
  updatedAt: string | null
  github: GithubRepoStats | null
}

export interface PortfolioProjectDetail extends PortfolioProjectSummary {
  html: string
  toc: ProjectTocItem[]
  prevProject: { slug: string; title: string } | null
  nextProject: { slug: string; title: string } | null
}

export interface GithubUserSummary {
  login: string
  name: string
  avatarUrl: string
  bio: string | null
  location: string | null
  htmlUrl: string
  publicRepos: number
  followers: number
  following: number
  createdAt: string
}

export interface StackCategory {
  id: string
  title: string
  subtitle: string
  icon: string
  items: {
    name: string
    icon: string
    detail: string
  }[]
}

export interface EngineeringPrinciple {
  index: string
  title: string
  description: string
}

export interface ProfileData {
  name: string
  handle: string
  role: string
  headline: string
  subheadline: string
  location: string
  available: boolean
  availabilityLabel: string
  email: string
  githubUrl: string
  githubUsername: string
  linkedinUrl: string
  avatarUrl: string
  aboutParagraphs: string[]
  principles: EngineeringPrinciple[]
  stackCategories: StackCategory[]
}
