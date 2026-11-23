<script setup lang="ts">
import type { ProjectSource } from '../../shared/types/portfolio'

const [{ data: profileData }, { data: projectsData }] = await Promise.all([
  useFetch('/api/profile'),
  useFetch('/api/projects'),
])

const profile = computed(() => profileData.value?.profile)
const githubUser = computed(() => profileData.value?.githubUser || null)
const allProjects = computed(() => projectsData.value?.projects || [])

const selectedSource = ref<'all' | ProjectSource>('all')
const selectedTag = ref<string>('all')

const availableTags = computed(() => {
  const counts = new Map<string, number>()
  for (const proj of allProjects.value) {
    for (const tech of proj.stack) {
      counts.set(tech, (counts.get(tech) || 0) + 1)
    }
  }
  return Array.from(counts.entries())
    .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
    .slice(0, 8)
    .map(([tag]) => tag)
})

const filteredProjects = computed(() => {
  return allProjects.value.filter((p) => {
    const matchesSource = selectedSource.value === 'all' || p.source === selectedSource.value
    const matchesTag = selectedTag.value === 'all' || p.stack.includes(selectedTag.value)
    return matchesSource && matchesTag
  })
})

const githubCount = computed(() => allProjects.value.filter(p => p.source === 'github').length)
const customCount = computed(() => allProjects.value.filter(p => p.source === 'custom').length)

useSeoMeta({
  title: 'Gabriel Pelizzari — Desenvolvedor de Software Fullstack',
  description:
    'Portfólio de Gabriel Pelizzari — Desenvolvedor Fullstack focado em Python, FastAPI, arquiteturas orientadas a eventos, Vue.js e Nuxt.',
  ogTitle: 'Gabriel Pelizzari — Desenvolvedor de Software Fullstack',
  ogDescription:
    'Sistemas resilientes, APIs bem desenhadas em Python/FastAPI e interfaces minimalistas em Vue & Nuxt.',
  ogType: 'website',
})
</script>

<template>
  <div v-if="profile">
    <!-- Hero -->
    <HeroSection
      :profile="profile"
      :github-user="githubUser"
      :total-projects="allProjects.length"
    />

    <!-- Projects Section -->
    <section id="projetos" class="py-12 sm:py-20 scroll-mt-20">
      <div class="mx-auto max-w-5xl px-5 sm:px-8">
        <!-- Header Row -->
        <div class="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
          <div class="space-y-2 max-w-xl">
            <p class="font-mono text-xs uppercase tracking-widest text-zinc-400 dark:text-zinc-500">
              01 // Trabalhos &amp; Arquitetura
            </p>
            <h2 class="text-2xl sm:text-3xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
              Projetos Selecionados
            </h2>
            <p class="text-sm sm:text-base text-zinc-600 dark:text-zinc-400 leading-relaxed">
              Sistemas full-stack, arquiteturas orientadas a eventos e estudos de caso de engenharia.
            </p>
          </div>

          <div class="flex items-center gap-3">
            <NuxtLink
              to="/projetos"
              class="inline-flex items-center gap-1.5 h-9 px-3.5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-xs font-medium text-zinc-700 dark:text-zinc-300 hover:border-zinc-300 dark:hover:border-zinc-700 transition-colors"
            >
              <span>Ver arquivo completo</span>
              <Icon name="lucide:arrow-right" class="w-3.5 h-3.5" />
            </NuxtLink>
          </div>
        </div>

        <!-- Filter Controls: Source Mode + Tech Stack -->
        <div class="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-8 pb-5 border-b border-zinc-200/70 dark:border-zinc-800/70">
          <!-- Source Tabs (exibido automaticamente quando há projetos GitHub e Autorais) -->
          <div
            v-if="githubCount > 0 && customCount > 0"
            class="inline-flex items-center p-1 rounded-xl border border-zinc-200/80 dark:border-zinc-800 bg-zinc-100/80 dark:bg-zinc-900/80 self-start shrink-0"
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
              Todos ({{ allProjects.length }})
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
              <span>GitHub ({{ githubCount }})</span>
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
              <span>Autorais ({{ customCount }})</span>
            </button>
          </div>

          <!-- Stack Quick Filter -->
          <div
            class="flex flex-wrap items-center gap-1.5"
            :class="githubCount > 0 && customCount > 0 ? 'lg:justify-end' : ''"
          >
            <button
              type="button"
              class="px-2.5 py-1 rounded-lg font-mono text-[11px] border transition-colors shrink-0"
              :class="
                selectedTag === 'all'
                  ? 'border-zinc-900 bg-zinc-900 text-zinc-50 dark:border-zinc-100 dark:bg-zinc-100 dark:text-zinc-950'
                  : 'border-zinc-200 dark:border-zinc-800 text-zinc-500 dark:text-zinc-400 hover:border-zinc-300 dark:hover:border-zinc-700'
              "
              @click="selectedTag = 'all'"
            >
              Todas stacks
            </button>
            <button
              v-for="tag in availableTags"
              :key="tag"
              type="button"
              class="px-2.5 py-1 rounded-lg font-mono text-[11px] border transition-colors shrink-0"
              :class="
                selectedTag === tag
                  ? 'border-zinc-900 bg-zinc-900 text-zinc-50 dark:border-zinc-100 dark:bg-zinc-100 dark:text-zinc-950'
                  : 'border-zinc-200 dark:border-zinc-800 text-zinc-500 dark:text-zinc-400 hover:border-zinc-300 dark:hover:border-zinc-700'
              "
              @click="selectedTag = selectedTag === tag ? 'all' : tag"
            >
              {{ tag }}
            </button>
          </div>
        </div>

        <!-- Projects Grid -->
        <div
          v-if="filteredProjects.length > 0"
          class="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          <ProjectCard
            v-for="(project, idx) in filteredProjects"
            :key="project.slug"
            :project="project"
            :index="idx"
          />
        </div>

        <div
          v-else
          class="rounded-2xl border border-dashed border-zinc-300 dark:border-zinc-800 py-14 text-center space-y-3"
        >
          <p class="text-sm text-zinc-500 dark:text-zinc-400">
            Nenhum projeto encontrado para a combinação de filtros selecionada.
          </p>
          <button
            type="button"
            class="text-xs font-semibold underline underline-offset-4 text-zinc-900 dark:text-zinc-100"
            @click="
              selectedSource = 'all';
              selectedTag = 'all';
            "
          >
            Limpar filtros
          </button>
        </div>
      </div>
    </section>

    <!-- Tech Stack -->
    <StackSection :categories="profile.stackCategories" />

    <!-- About & Principles -->
    <AboutSection :profile="profile" />

    <!-- Contact -->
    <ContactSection :profile="profile" />
  </div>
</template>
