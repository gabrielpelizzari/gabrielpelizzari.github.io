import { projectsCatalog } from '../../data/projects'
import type {
  HardcodedProjectEntry,
  PortfolioProjectDetail,
  PortfolioProjectSummary,
} from '../../shared/types/portfolio'
import {
  extractFirstImageFromMarkdown,
  fetchGithubRepoBundle,
  parseGithubRepoInput,
} from './github'
import { renderPortfolioMarkdown } from './markdown'

export function normalizeSlug(input: string): string {
  return input
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9-_]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .replace(/-+/g, '-')
}

function humanizeRepoName(repoName: string): string {
  return repoName
    .replace(/[-_]+/g, ' ')
    .replace(/\b\w/g, char => char.toUpperCase())
}

async function hydrateEntry(
  entry: HardcodedProjectEntry,
  index: number,
): Promise<{
  summary: PortfolioProjectSummary
  combinedMarkdown: string
}> {
  const parsedRepo = entry.source === 'github' ? parseGithubRepoInput(entry.repo) : null

  const githubBundle =
    entry.source === 'github' && parsedRepo
      ? await fetchGithubRepoBundle(parsedRepo.fullName, true)
      : null

  const ghStats = githubBundle?.stats || null
  const ghReadme = githubBundle?.readme || ''

  const derivedSlug =
    entry.slug?.trim() ||
    (parsedRepo ? normalizeSlug(parsedRepo.name) : normalizeSlug(entry.title || `projeto-${index + 1}`))

  const derivedTitle =
    entry.title?.trim() ||
    (ghStats ? humanizeRepoName(ghStats.name) : humanizeRepoName(derivedSlug))

  const derivedSummary =
    entry.summary?.trim() ||
    ghStats?.description ||
    'Projeto de engenharia de software desenvolvido por Gabriel Pelizzari.'

  let derivedStack: string[] = Array.isArray(entry.stack)
    ? entry.stack.map(s => String(s).trim()).filter(Boolean)
    : []

  if (derivedStack.length === 0 && ghStats) {
    const langNames = ghStats.languages.slice(0, 5).map(l => l.name)
    const topicNames = ghStats.topics.slice(0, 4)
    derivedStack = Array.from(new Set([...langNames, ...topicNames]))
  }

  const localMarkdown = (entry.content || '').trim()
  const useGithubReadme = entry.source === 'github' ? entry.useGithubReadme ?? true : false

  let combinedMarkdown = ''
  if (entry.source === 'github') {
    if (localMarkdown && useGithubReadme && ghReadme) {
      combinedMarkdown = `${localMarkdown}\n\n---\n\n${ghReadme}`
    } else if (useGithubReadme && ghReadme) {
      combinedMarkdown = ghReadme
    } else {
      combinedMarkdown = localMarkdown
    }
  } else {
    combinedMarkdown = localMarkdown
  }

  const derivedCover =
    entry.coverImage?.trim() ||
    extractFirstImageFromMarkdown(localMarkdown) ||
    extractFirstImageFromMarkdown(ghReadme) ||
    null

  const derivedYear =
    entry.year?.trim() ||
    (ghStats?.updatedAt
      ? new Date(ghStats.updatedAt).getFullYear().toString()
      : new Date().getFullYear().toString())

  const liveUrl = entry.liveUrl?.trim() || ghStats?.homepage?.trim() || null
  const repoUrl =
    entry.source === 'custom'
      ? entry.repoUrl?.trim() || null
      : ghStats?.htmlUrl || (parsedRepo ? `https://github.com/${parsedRepo.fullName}` : null)

  return {
    summary: {
      slug: derivedSlug,
      source: entry.source,
      title: derivedTitle,
      summary: derivedSummary,
      featured: entry.featured ?? true,
      order: index + 1,
      year: derivedYear,
      role: entry.role?.trim() || 'Fullstack Software Developer',
      status: entry.status?.trim() || (entry.source === 'github' ? 'Open Source' : 'Case Study'),
      stack: derivedStack,
      highlights: Array.isArray(entry.highlights)
        ? entry.highlights.map(h => String(h).trim()).filter(Boolean)
        : [],
      liveUrl: liveUrl || null,
      repoUrl,
      repoFullName: parsedRepo?.fullName || ghStats?.fullName || null,
      coverImage: derivedCover,
      updatedAt: ghStats?.updatedAt || null,
      github: ghStats,
    },
    combinedMarkdown,
  }
}

export async function listPortfolioProjects(): Promise<PortfolioProjectSummary[]> {
  const hydrated = await Promise.all(
    projectsCatalog.map((entry, idx) => hydrateEntry(entry, idx)),
  )
  return hydrated.map(item => item.summary)
}

export async function getPortfolioProjectBySlug(slug: string): Promise<PortfolioProjectDetail | null> {
  const hydrated = await Promise.all(
    projectsCatalog.map((entry, idx) => hydrateEntry(entry, idx)),
  )

  const index = hydrated.findIndex(item => item.summary.slug === slug)
  if (index === -1) return null

  const target = hydrated[index]!
  const { html, toc } = await renderPortfolioMarkdown(target.combinedMarkdown)

  const prev = index > 0 ? hydrated[index - 1]!.summary : null
  const next = index < hydrated.length - 1 ? hydrated[index + 1]!.summary : null

  return {
    ...target.summary,
    html,
    toc,
    prevProject: prev ? { slug: prev.slug, title: prev.title } : null,
    nextProject: next ? { slug: next.slug, title: next.title } : null,
  }
}
