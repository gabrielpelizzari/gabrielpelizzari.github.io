<script setup lang="ts">
import type { ProjectSource } from '../../../shared/types/portfolio'

const { data: projectsData } = await useFetch('/api/projects')
const allProjects = computed(() => projectsData.value?.projects || [])

const query = ref('')
const selectedSource = ref<'all' | ProjectSource>('all')
const hasBothSources = computed(
  () =>
    allProjects.value.some(p => p.source === 'github') &&
    allProjects.value.some(p => p.source === 'custom'),
)

const filteredProjects = computed(() => {
  const q = query.value.trim().toLowerCase()
  return allProjects.value.filter((p) => {
    const matchesSource = selectedSource.value === 'all' || p.source === selectedSource.value
    if (!matchesSource) return false
    if (!q) return true

    return (
      p.title.toLowerCase().includes(q) ||
      p.summary.toLowerCase().includes(q) ||
      (p.repoFullName && p.repoFullName.toLowerCase().includes(q)) ||
      p.stack.some(s => s.toLowerCase().includes(q))
    )
  })
})

useSeoMeta({
  title: 'Projetos — Gabriel Pelizzari',
  description:
    'Arquivo completo de projetos de software, sistemas orientados a eventos, APIs FastAPI e estudos de caso de Gabriel Pelizzari.',
})
</script>

<template>
  <div class="py-12 sm:py-16">
    <div class="mx-auto max-w-5xl px-5 sm:px-8">
      <!-- Top Breadcrumb -->
      <div class="flex items-center justify-between gap-4 mb-8">
        <NuxtLink
          to="/"
          class="inline-flex items-center gap-1.5 text-xs font-mono text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors"
        >
          <Icon name="lucide:arrow-left" class="w-3.5 h-3.5" />
          <span>Voltar ao início</span>
        </NuxtLink>

        <span class="font-mono text-xs text-zinc-400 dark:text-zinc-500">
          {{ allProjects.length }} projetos publicados
        </span>
      </div>

      <!-- Heading -->
      <div class="max-w-2xl space-y-2.5 mb-10">
        <h1 class="text-3xl sm:text-4xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
          Arquivo de Projetos
        </h1>
        <p class="text-sm sm:text-base text-zinc-600 dark:text-zinc-400 leading-relaxed">
          Repositórios open-source sincronizados com o GitHub e estudos de caso de engenharia de software.
        </p>
      </div>

      <!-- Search + Source Filter -->
      <div class="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 mb-10">
        <div class="relative flex-1 max-w-md">
          <Icon
            name="lucide:search"
            class="w-4 h-4 text-zinc-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none"
          />
          <input
            v-model="query"
            type="text"
            placeholder="Filtrar por nome, tecnologia ou repositório..."
            class="w-full h-10 pl-10 pr-4 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-obsidian-900 text-sm text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-400 focus:outline-none focus:border-zinc-400 dark:focus:border-zinc-600 transition-colors"
          />
        </div>

        <div
          v-if="hasBothSources"
          class="inline-flex items-center p-1 rounded-xl border border-zinc-200/80 dark:border-zinc-800 bg-zinc-100/80 dark:bg-zinc-900/80 self-start"
        >
          <button
            type="button"
            class="px-3 py-1.5 rounded-lg text-xs font-medium transition-all"
            :class="
              selectedSource === 'all'
                ? 'bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 shadow-sm'
                : 'text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200'
            "
            @click="selectedSource = 'all'"
          >
            Todos
          </button>
          <button
            type="button"
            class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all"
            :class="
              selectedSource === 'github'
                ? 'bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 shadow-sm'
                : 'text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200'
            "
            @click="selectedSource = 'github'"
          >
            <Icon name="simple-icons:github" class="w-3 h-3" />
            <span>GitHub</span>
          </button>
          <button
            type="button"
            class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all"
            :class="
              selectedSource === 'custom'
                ? 'bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 shadow-sm'
                : 'text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200'
            "
            @click="selectedSource = 'custom'"
          >
            <Icon name="lucide:file-pen-line" class="w-3 h-3" />
            <span>Autorais</span>
          </button>
        </div>
      </div>

      <!-- Grid -->
      <div v-if="filteredProjects.length > 0" class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <ProjectCard
          v-for="(project, idx) in filteredProjects"
          :key="project.slug"
          :project="project"
          :index="idx"
        />
      </div>

      <div
        v-else
        class="rounded-2xl border border-dashed border-zinc-300 dark:border-zinc-800 py-16 text-center space-y-2"
      >
        <p class="text-sm text-zinc-500 dark:text-zinc-400">
          Nenhum projeto corresponde à sua busca.
        </p>
      </div>
    </div>
  </div>
</template>
