<script setup lang="ts">
import { useEventListener } from '@vueuse/core'
import type { PortfolioProjectSummary } from '../../shared/types/portfolio'

const props = defineProps<{
  projects: PortfolioProjectSummary[]
  email: string
  githubUrl: string
}>()

const router = useRouter()
const colorMode = useColorMode()
const { isOpen, closePalette, togglePalette } = useCommandPalette()
const { pushToast } = useToast()

const search = ref('')
const inputRef = ref<HTMLInputElement | null>(null)
const selectedIndex = ref(0)

interface PaletteAction {
  id: string
  group: string
  label: string
  hint?: string
  icon: string
  run: () => void
}

const allActions = computed<PaletteAction[]>(() => {
  const base: PaletteAction[] = [
    ...props.projects.map(p => ({
      id: `proj-${p.slug}`,
      group: 'Projetos',
      label: p.title,
      hint: p.source === 'github' ? `GitHub · ${p.repoFullName || ''}` : 'Case Study · Autoral',
      icon: p.source === 'github' ? 'lucide:git-branch' : 'lucide:file-text',
      run: () => router.push(`/projetos/${p.slug}`),
    })),
    {
      id: 'nav-home',
      group: 'Navegação',
      label: 'Ir para o Início',
      hint: '/',
      icon: 'lucide:home',
      run: () => router.push('/'),
    },
    {
      id: 'nav-projects',
      group: 'Navegação',
      label: 'Ver Todos os Projetos',
      hint: '/projetos',
      icon: 'lucide:folder-git-2',
      run: () => router.push('/projetos'),
    },
    {
      id: 'nav-stack',
      group: 'Navegação',
      label: 'Stack & Ferramentas',
      hint: '/#stack',
      icon: 'lucide:layers',
      run: () => router.push('/#stack'),
    },
    {
      id: 'nav-about',
      group: 'Navegação',
      label: 'Sobre & Filosofia',
      hint: '/#sobre',
      icon: 'lucide:user',
      run: () => router.push('/#sobre'),
    },
    {
      id: 'theme-toggle',
      group: 'Preferências & Contato',
      label: `Alternar para modo ${colorMode.value === 'dark' ? 'Claro' : 'Escuro'}`,
      icon: colorMode.value === 'dark' ? 'lucide:sun' : 'lucide:moon',
      run: () => {
        colorMode.preference = colorMode.value === 'dark' ? 'light' : 'dark'
      },
    },
    {
      id: 'copy-email',
      group: 'Preferências & Contato',
      label: 'Copiar endereço de e-mail',
      hint: props.email,
      icon: 'lucide:copy',
      run: async () => {
        if (navigator.clipboard) {
          await navigator.clipboard.writeText(props.email)
          pushToast({
            title: 'E-mail copiado',
            description: props.email,
            variant: 'success',
          })
        }
      },
    },
    {
      id: 'open-github',
      group: 'Preferências & Contato',
      label: 'Abrir perfil no GitHub (@gabrielpelizzari)',
      hint: 'github.com/gabrielpelizzari',
      icon: 'lucide:external-link',
      run: () => {
        window.open(props.githubUrl, '_blank', 'noopener,noreferrer')
      },
    },
  ]

  const q = search.value.trim().toLowerCase()
  if (!q) return base

  return base.filter(
    a =>
      a.label.toLowerCase().includes(q) ||
      a.group.toLowerCase().includes(q) ||
      (a.hint && a.hint.toLowerCase().includes(q)),
  )
})

const groupedActions = computed(() => {
  const groups = new Map<string, PaletteAction[]>()
  for (const action of allActions.value) {
    if (!groups.has(action.group)) {
      groups.set(action.group, [])
    }
    groups.get(action.group)!.push(action)
  }
  return Array.from(groups.entries())
})

function executeAction(action: PaletteAction | undefined) {
  if (!action) return
  closePalette()
  action.run()
}

watch(isOpen, async (open) => {
  if (open) {
    search.value = ''
    selectedIndex.value = 0
    await nextTick()
    inputRef.value?.focus()
  }
})

watch(search, () => {
  selectedIndex.value = 0
})

if (import.meta.client) {
  useEventListener(window, 'keydown', (e: KeyboardEvent) => {
    if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
      e.preventDefault()
      togglePalette()
      return
    }

    if (!isOpen.value) return

    if (e.key === 'Escape') {
      e.preventDefault()
      closePalette()
    } else if (e.key === 'ArrowDown') {
      e.preventDefault()
      if (allActions.value.length > 0) {
        selectedIndex.value = (selectedIndex.value + 1) % allActions.value.length
      }
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      if (allActions.value.length > 0) {
        selectedIndex.value =
          (selectedIndex.value - 1 + allActions.value.length) % allActions.value.length
      }
    } else if (e.key === 'Enter') {
      e.preventDefault()
      executeAction(allActions.value[selectedIndex.value])
    }
  })
}
</script>

<template>
  <Teleport to="body">
    <Transition
      enter-active-class="transition duration-150 ease-out"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="transition duration-100 ease-in"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div
        v-if="isOpen"
        class="fixed inset-0 z-50 flex items-start justify-center pt-[12vh] px-4 bg-zinc-950/60 backdrop-blur-sm"
        @click.self="closePalette"
      >
        <div
          class="w-full max-w-xl overflow-hidden rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-obsidian-900 shadow-2xl"
          role="dialog"
          aria-modal="true"
          aria-label="Paleta de comandos"
        >
          <!-- Input -->
          <div class="flex items-center gap-3 px-4 py-3.5 border-b border-zinc-200/80 dark:border-zinc-800/80">
            <Icon name="lucide:search" class="w-4 h-4 text-zinc-400 shrink-0" />
            <input
              ref="inputRef"
              v-model="search"
              type="text"
              placeholder="Buscar projetos, seções ou contato..."
              class="w-full bg-transparent text-sm text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-400 focus:outline-none"
            />
            <button
              type="button"
              class="font-mono text-[10px] px-1.5 py-0.5 rounded border border-zinc-200 dark:border-zinc-700 text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200"
              @click="closePalette"
            >
              ESC
            </button>
          </div>

          <!-- Results -->
          <div class="max-h-80 overflow-y-auto p-2 space-y-3">
            <div v-if="allActions.length === 0" class="py-10 text-center text-xs text-zinc-500">
              Nenhum resultado encontrado para "{{ search }}".
            </div>

            <div v-for="[groupName, actions] in groupedActions" :key="groupName">
              <div class="px-2.5 py-1 text-[11px] font-mono uppercase tracking-wider text-zinc-400 dark:text-zinc-500">
                {{ groupName }}
              </div>
              <div class="space-y-0.5 mt-0.5">
                <button
                  v-for="action in actions"
                  :key="action.id"
                  type="button"
                  class="w-full flex items-center justify-between gap-3 px-3 py-2.5 rounded-xl text-left text-sm transition-colors"
                  :class="
                    allActions[selectedIndex]?.id === action.id
                      ? 'bg-zinc-100 dark:bg-zinc-800/90 text-zinc-900 dark:text-zinc-50'
                      : 'text-zinc-600 dark:text-zinc-300 hover:bg-zinc-100/70 dark:hover:bg-zinc-800/50'
                  "
                  @mouseenter="selectedIndex = allActions.findIndex(a => a.id === action.id)"
                  @click="executeAction(action)"
                >
                  <span class="flex items-center gap-2.5 min-w-0">
                    <Icon :name="action.icon" class="w-4 h-4 shrink-0 opacity-75" />
                    <span class="truncate font-medium">{{ action.label }}</span>
                  </span>
                  <span v-if="action.hint" class="font-mono text-[11px] text-zinc-400 dark:text-zinc-500 truncate max-w-[180px]">
                    {{ action.hint }}
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>
