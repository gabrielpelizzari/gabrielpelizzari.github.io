import MarkdownIt from 'markdown-it'
import { createHighlighter, type Highlighter } from 'shiki'
import type { ProjectTocItem } from '../../shared/types/portfolio'

let highlighterPromise: Promise<Highlighter> | null = null

const SUPPORTED_LANGS = [
  'python',
  'typescript',
  'javascript',
  'vue',
  'html',
  'css',
  'json',
  'yaml',
  'bash',
  'shellscript',
  'powershell',
  'sql',
  'dockerfile',
  'markdown',
] as const

const LANG_ALIASES: Record<string, string> = {
  py: 'python',
  ts: 'typescript',
  js: 'javascript',
  sh: 'bash',
  shell: 'bash',
  zsh: 'bash',
  ps1: 'powershell',
  yml: 'yaml',
  docker: 'dockerfile',
  md: 'markdown',
}

function getHighlighterSingleton(): Promise<Highlighter> {
  if (!highlighterPromise) {
    highlighterPromise = createHighlighter({
      themes: ['github-light-default', 'github-dark-default'],
      langs: [...SUPPORTED_LANGS],
    })
  }
  return highlighterPromise
}

export function slugifyHeading(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^\w\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

export function stripLeadingDuplicateH1(markdown: string): string {
  // Removes a leading '# Heading' line so it does not duplicate the hero title on the detail page
  return markdown.replace(/^\s*#\s+[^\n]+\n+/, '')
}

export async function renderPortfolioMarkdown(markdown: string): Promise<{
  html: string
  toc: ProjectTocItem[]
}> {
  if (!markdown.trim()) {
    return { html: '', toc: [] }
  }

  const highlighter = await getHighlighterSingleton().catch(() => null)
  const toc: ProjectTocItem[] = []
  const usedIds = new Map<string, number>()

  const md = new MarkdownIt({
    html: true,
    linkify: true,
    typographer: true,
    highlight(code, rawLang) {
      const normalized = (LANG_ALIASES[rawLang.toLowerCase()] || rawLang.toLowerCase()).trim()
      if (highlighter && normalized && SUPPORTED_LANGS.includes(normalized as any)) {
        try {
          return highlighter.codeToHtml(code, {
            lang: normalized,
            themes: {
              light: 'github-light-default',
              dark: 'github-dark-default',
            },
            defaultColor: false,
          })
        } catch {
          // Fallback to plain pre/code below
        }
      }
      const langAttr = normalized ? ` data-lang="${escapeHtml(normalized)}"` : ''
      return `<pre class="shiki shiki-plain"${langAttr}><code>${escapeHtml(code)}</code></pre>`
    },
  })

  // Open external links safely in new tab
  const defaultLinkOpen =
    md.renderer.rules.link_open ||
    ((tokens, idx, options, _env, self) => self.renderToken(tokens, idx, options))

  md.renderer.rules.link_open = (tokens, idx, options, env, self) => {
    const token = tokens[idx]
    const href = token?.attrGet('href') || ''
    if (/^https?:\/\//i.test(href)) {
      token?.attrSet('target', '_blank')
      token?.attrSet('rel', 'noopener noreferrer')
    }
    return defaultLinkOpen(tokens, idx, options, env, self)
  }

  // Add anchor IDs to h2 & h3 and collect Table of Contents
  md.renderer.rules.heading_open = (tokens, idx, options, _env, self) => {
    const token = tokens[idx]!
    const level = Number(token.tag.slice(1))
    const inlineToken = tokens[idx + 1]
    const rawText = inlineToken?.content || ''
    let baseId = slugifyHeading(rawText) || `section-${idx}`

    const count = usedIds.get(baseId) || 0
    usedIds.set(baseId, count + 1)
    if (count > 0) {
      baseId = `${baseId}-${count}`
    }

    token.attrSet('id', baseId)

    if ((level === 2 || level === 3) && rawText.trim()) {
      toc.push({
        id: baseId,
        text: rawText.replace(/[#*`_]/g, '').trim(),
        level,
      })
    }

    return self.renderToken(tokens, idx, options)
  }

  const cleaned = stripLeadingDuplicateH1(markdown)
  const html = md.render(cleaned)

  return { html, toc }
}
