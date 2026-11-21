import type {
  GithubRepoStats,
  GithubUserSummary,
  LanguageBreakdownItem,
} from '../../shared/types/portfolio'

interface CacheEntry<T> {
  value: T
  expiresAt: number
}

const memoryCache = new Map<string, CacheEntry<unknown>>()
const DEFAULT_TTL_MS = 1000 * 60 * 15 // 15 minutes

const LANGUAGE_COLORS: Record<string, string> = {
  Python: '#3572A5',
  Vue: '#41B883',
  TypeScript: '#3178C6',
  JavaScript: '#F1E05A',
  HTML: '#E34C26',
  CSS: '#563D7C',
  Dockerfile: '#384D54',
  Shell: '#89E051',
  PowerShell: '#012456',
  Go: '#00ADD8',
  Rust: '#DEA584',
  Java: '#B07219',
  'C#': '#178600',
  SQL: '#E38C00',
}

const FALLBACK_USER: Record<string, GithubUserSummary> = {
  gabrielpelizzari: {
    login: 'gabrielpelizzari',
    name: 'Gabriel Pelizzari',
    avatarUrl: 'https://avatars.githubusercontent.com/u/120588619?v=4',
    bio: 'Dev Fullstack. Always learning, always building.',
    location: 'Bento Gonçalves / BR',
    htmlUrl: 'https://github.com/gabrielpelizzari',
    publicRepos: 2,
    followers: 3,
    following: 3,
    createdAt: '2022-12-14T16:44:44Z',
  },
}

const FALLBACK_REPOS: Record<string, { stats: GithubRepoStats; readme: string }> = {
  'gabrielpelizzari/order_flow': {
    stats: {
      fullName: 'gabrielpelizzari/order_flow',
      name: 'order_flow',
      owner: 'gabrielpelizzari',
      description:
        'OrderFlow is a full-stack event-driven order processing system with FastAPI and RabbitMQ. It demonstrates asynchronous workflows with background workers, order status tracking, event timelines, failure simulations.',
      htmlUrl: 'https://github.com/gabrielpelizzari/order_flow',
      homepage: null,
      defaultBranch: 'main',
      primaryLanguage: 'Python',
      stars: 0,
      forks: 0,
      topics: ['fastapi', 'rabbitmq', 'vuejs', 'event-driven', 'docker'],
      updatedAt: '2026-05-07T02:01:51Z',
      createdAt: '2026-05-05T20:32:05Z',
      languages: buildLanguageBreakdown({
        Python: 42444,
        Vue: 12065,
        TypeScript: 4959,
        CSS: 4520,
        Dockerfile: 1131,
        HTML: 294,
      }),
    },
    readme: `# OrderFlow\n\nOrderFlow is a full-stack event-driven order processing system built with FastAPI, Vue.js, RabbitMQ, and SQLite.\n\nIt demonstrates how a mini store can create orders quickly through an API or frontend, then process payment, stock, shipping, and notifications asynchronously through RabbitMQ workers.\n\n![flow](https://raw.githubusercontent.com/gabrielpelizzari/order_flow/main/images/fluxo.png)\n\n## Architecture\n\n\`\`\`text\nPENDING -> PAYMENT_APPROVED -> STOCK_RESERVED -> READY_TO_SHIP\n\`\`\`\n\n## Tech Stack\n\n- **Backend**: Python, FastAPI, uv\n- **Frontend**: Vue.js, Axios, Pinia\n- **Messaging**: RabbitMQ\n- **Database**: SQLite\n- **Infrastructure**: Docker & Docker Compose\n`,
  },
  'gabrielpelizzari/projeto_petshop': {
    stats: {
      fullName: 'gabrielpelizzari/projeto_petshop',
      name: 'projeto_petshop',
      owner: 'gabrielpelizzari',
      description:
        'PetHub is a full-stack web system for pet shop management, built with FastAPI, Vue.js, and MySQL. It centralizes customer, pet, breed, appointment, and contact data, offering an admin dashboard, client portal, JWT authentication, route protection, validations, and automated tests.',
      htmlUrl: 'https://github.com/gabrielpelizzari/projeto_petshop',
      homepage: null,
      defaultBranch: 'main',
      primaryLanguage: 'Vue',
      stars: 0,
      forks: 0,
      topics: ['fastapi', 'vuejs', 'mysql', 'jwt', 'pytest'],
      updatedAt: '2026-05-05T17:59:02Z',
      createdAt: '2025-09-29T11:47:17Z',
      languages: buildLanguageBreakdown({
        Vue: 251819,
        Python: 104618,
        JavaScript: 19817,
        HTML: 505,
        CSS: 22,
      }),
    },
    readme: `# PetHub – Sistema de Gerenciamento para Petshops\n\nSistema web full-stack para gestão de petshops, composto por API REST (FastAPI) e interface SPA (Vue.js).\n\n![Tela inicial do sistema](https://raw.githubusercontent.com/gabrielpelizzari/projeto_petshop/main/image/readme/home.png)\n\n## Funcionalidades Principais\n\n- **Painel Administrativo**: Estatísticas em tempo real, gestão de atendimentos, clientes, pets e raças.\n- **Portal do Cliente**: Gestão de pets cadastrados, histórico detalhado de serviços e perfil pessoal.\n- **Segurança & Qualidade**: Autenticação JWT, proteção granular de rotas, validações com Pydantic e testes automatizados com Pytest.\n`,
  },
}

export function parseGithubRepoInput(input: string): { owner: string; name: string; fullName: string } | null {
  const trimmed = input.trim()
  if (!trimmed) return null

  const cleaned = trimmed
    .replace(/^https?:\/\/(www\.)?github\.com\//i, '')
    .replace(/^github\.com\//i, '')
    .replace(/\.git$/i, '')
    .replace(/^\/+|\/+$/g, '')

  const parts = cleaned.split('/').filter(Boolean)
  if (parts.length < 2) return null

  const owner = parts[0]!
  const name = parts[1]!
  if (!/^[\w.-]+$/.test(owner) || !/^[\w.-]+$/.test(name)) {
    return null
  }

  return {
    owner,
    name,
    fullName: `${owner}/${name}`,
  }
}

export function buildLanguageBreakdown(raw: Record<string, number>): LanguageBreakdownItem[] {
  const entries = Object.entries(raw).filter(([, bytes]) => typeof bytes === 'number' && bytes > 0)
  const total = entries.reduce((acc, [, bytes]) => acc + bytes, 0)
  if (total === 0) return []

  return entries
    .sort((a, b) => b[1] - a[1])
    .map(([name, bytes]) => ({
      name,
      bytes,
      percentage: Math.max(0.5, Math.round((bytes / total) * 1000) / 10),
      color: LANGUAGE_COLORS[name] || '#71717A',
    }))
}

function getGithubHeaders(accept = 'application/vnd.github+json'): Record<string, string> {
  const config = useRuntimeConfig()
  const headers: Record<string, string> = {
    Accept: accept,
    'User-Agent': 'gabriel-pelizzari-nuxt-portfolio',
    'X-GitHub-Api-Version': '2022-11-28',
  }

  if (config.githubToken) {
    headers.Authorization = `Bearer ${config.githubToken}`
  }

  return headers
}

async function cachedFetch<T>(key: string, fetcher: () => Promise<T>, ttlMs = DEFAULT_TTL_MS): Promise<T> {
  const now = Date.now()
  const existing = memoryCache.get(key) as CacheEntry<T> | undefined
  if (existing && existing.expiresAt > now) {
    return existing.value
  }

  try {
    const fresh = await fetcher()
    memoryCache.set(key, { value: fresh, expiresAt: now + ttlMs })
    return fresh
  } catch (error) {
    if (existing) {
      return existing.value
    }
    throw error
  }
}

export function rewriteGithubMarkdownAssets(
  markdown: string,
  owner: string,
  repo: string,
  branch = 'main',
): string {
  if (!markdown) return ''

  const rawBase = `https://raw.githubusercontent.com/${owner}/${repo}/${branch}`
  const blobBase = `https://github.com/${owner}/${repo}/blob/${branch}`

  const normalizeRelPath = (rel: string) => rel.replace(/^\.\//, '').replace(/^\/+/, '')
  const isExternal = (url: string) =>
    /^(https?:\/\/|data:|mailto:|#)/i.test(url.trim())

  // 1. Rewrite Markdown images: ![alt](relative/path.png)
  let output = markdown.replace(/!\[([^\]]*)\]\(([^)\s]+)(?:\s+"([^"]*)")?\)/g, (match, alt, url, title) => {
    if (isExternal(url)) return match
    const resolved = `${rawBase}/${normalizeRelPath(url)}`
    return title ? `![${alt}](${resolved} "${title}")` : `![${alt}](${resolved})`
  })

  // 2. Rewrite HTML <img src="relative/path.png">
  output = output.replace(/<img\s+([^>]*?)src=(["'])([^"']+)\2([^>]*)>/gi, (match, pre, quote, url, post) => {
    if (isExternal(url)) return match
    const resolved = `${rawBase}/${normalizeRelPath(url)}`
    return `<img ${pre}src=${quote}${resolved}${quote}${post}>`
  })

  // 3. Rewrite relative links (non-images): [label](relative/file.md)
  output = output.replace(/(?<!!)\[([^\]]+)\]\(([^)\s]+)\)/g, (match, label, url) => {
    if (isExternal(url)) return match
    const resolved = `${blobBase}/${normalizeRelPath(url)}`
    return `[${label}](${resolved})`
  })

  return output
}

export function extractFirstImageFromMarkdown(markdown: string): string | null {
  if (!markdown) return null

  const mdImageMatch = markdown.match(/!\[[^\]]*\]\((https?:\/\/[^)\s"]+)/i)
  if (mdImageMatch?.[1]) {
    const url = mdImageMatch[1]
    if (!/shields\.io|badge/i.test(url)) {
      return url
    }
  }

  const htmlImgMatch = markdown.match(/<img[^>]+src=["'](https?:\/\/[^"']+)["']/i)
  if (htmlImgMatch?.[1] && !/shields\.io|badge/i.test(htmlImgMatch[1])) {
    return htmlImgMatch[1]
  }

  return null
}

export async function fetchGithubUser(username: string): Promise<GithubUserSummary | null> {
  const cleanUser = username.trim().toLowerCase()
  if (!cleanUser) return null

  try {
    return await cachedFetch(`gh:user:${cleanUser}`, async () => {
      const res = await $fetch<Record<string, any>>(`https://api.github.com/users/${encodeURIComponent(cleanUser)}`, {
        headers: getGithubHeaders(),
        timeout: 6000,
      })

      return {
        login: res.login,
        name: res.name || res.login,
        avatarUrl: res.avatar_url,
        bio: res.bio || null,
        location: res.location || null,
        htmlUrl: res.html_url,
        publicRepos: res.public_repos ?? 0,
        followers: res.followers ?? 0,
        following: res.following ?? 0,
        createdAt: res.created_at,
      }
    })
  } catch {
    return FALLBACK_USER[cleanUser] || null
  }
}

export async function fetchGithubRepoBundle(
  repoInput: string,
  includeReadme = true,
): Promise<{ stats: GithubRepoStats; readme: string } | null> {
  const parsed = parseGithubRepoInput(repoInput)
  if (!parsed) return null

  const key = parsed.fullName.toLowerCase()

  try {
    const stats = await cachedFetch(`gh:repo:${key}`, async () => {
      const [repoData, langData] = await Promise.all([
        $fetch<Record<string, any>>(`https://api.github.com/repos/${parsed.owner}/${parsed.name}`, {
          headers: getGithubHeaders(),
          timeout: 7000,
        }),
        $fetch<Record<string, number>>(`https://api.github.com/repos/${parsed.owner}/${parsed.name}/languages`, {
          headers: getGithubHeaders(),
          timeout: 7000,
        }).catch(() => ({} as Record<string, number>)),
      ])

      return {
        fullName: repoData.full_name,
        name: repoData.name,
        owner: repoData.owner?.login || parsed.owner,
        description: repoData.description || null,
        htmlUrl: repoData.html_url,
        homepage: repoData.homepage || null,
        defaultBranch: repoData.default_branch || 'main',
        primaryLanguage: repoData.language || null,
        stars: repoData.stargazers_count ?? 0,
        forks: repoData.forks_count ?? 0,
        topics: Array.isArray(repoData.topics) ? repoData.topics : [],
        updatedAt: repoData.updated_at,
        createdAt: repoData.created_at,
        languages: buildLanguageBreakdown(langData),
      } satisfies GithubRepoStats
    })

    let readme = ''
    if (includeReadme) {
      readme = await cachedFetch(`gh:readme:${key}`, async () => {
        const raw = await $fetch<string>(`https://api.github.com/repos/${parsed.owner}/${parsed.name}/readme`, {
          headers: getGithubHeaders('application/vnd.github.raw+json'),
          responseType: 'text',
          timeout: 7000,
        }).catch(() => '')

        return rewriteGithubMarkdownAssets(raw, stats.owner, stats.name, stats.defaultBranch)
      })
    }

    return { stats, readme }
  } catch {
    const fallback = FALLBACK_REPOS[key]
    if (fallback) {
      return {
        stats: fallback.stats,
        readme: includeReadme ? fallback.readme : '',
      }
    }
    return null
  }
}
