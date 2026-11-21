<script setup lang="ts">
const route = useRoute()
const slug = computed(() => String(route.params.slug || ''))

const { data, error } = await useFetch(() => `/api/projects/${slug.value}`)

if (error.value || !data.value?.project) {
  throw createError({
    statusCode: 404,
    statusMessage: 'Projeto não encontrado.',
  })
}

const project = computed(() => data.value!.project)

const formattedUpdatedDate = computed(() => {
  if (!project.value.updatedAt) return null
  try {
    return new Intl.DateTimeFormat('pt-BR', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    }).format(new Date(project.value.updatedAt))
  } catch {
    return null
  }
})

useSeoMeta({
  title: () => `${project.value.title} — Gabriel Pelizzari`,
  description: () => project.value.summary,
  ogTitle: () => `${project.value.title} — Gabriel Pelizzari`,
  ogDescription: () => project.value.summary,
})
</script>

<template>
  <article v-if="project" class="py-12 sm:py-16">
    <div class="mx-auto max-w-5xl px-5 sm:px-8">
      <!-- Top Bar: Back + Index -->
      <div class="flex items-center justify-between gap-4 mb-10">
        <NuxtLink
          to="/projetos"
          class="inline-flex items-center gap-1.5 text-xs font-mono text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors"
        >
          <Icon name="lucide:arrow-left" class="w-3.5 h-3.5" />
          <span>Todos os projetos</span>
        </NuxtLink>

        <span class="font-mono text-xs text-zinc-400 dark:text-zinc-500">
          Projeto {{ String(project.order).padStart(2, '0') }}
        </span>
      </div>

      <!-- Project Hero Header -->
      <header class="pb-10 border-b border-zinc-200/80 dark:border-zinc-800/80 space-y-6">
        <div class="flex flex-wrap items-center gap-2.5">
          <!-- Source Badge -->
          <span
            v-if="project.source === 'github'"
            class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-zinc-800 dark:text-zinc-200"
          >
            <span class="h-1.5 w-1.5 rounded-full bg-emerald-500" />
            <Icon name="simple-icons:github" class="w-3.5 h-3.5" />
            <span>GitHub · {{ project.repoFullName }}</span>
          </span>
          <span
            v-else
            class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-zinc-800 dark:text-zinc-200"
          >
            <Icon name="lucide:file-pen-line" class="w-3.5 h-3.5" />
            <span>Projeto Autoral · Case Study</span>
          </span>

          <span class="px-2.5 py-1 rounded-full text-xs font-mono bg-zinc-100 dark:bg-zinc-800/80 text-zinc-600 dark:text-zinc-300">
            {{ project.year }}
          </span>

          <span class="px-2.5 py-1 rounded-full text-xs font-mono bg-zinc-100 dark:bg-zinc-800/80 text-zinc-600 dark:text-zinc-300">
            {{ project.status }}
          </span>
        </div>

        <div class="space-y-4 max-w-3xl">
          <h1 class="text-3xl sm:text-5xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50 leading-[1.12]">
            {{ project.title }}
          </h1>
          <p class="text-base sm:text-lg text-zinc-600 dark:text-zinc-400 leading-relaxed">
            {{ project.summary }}
          </p>
        </div>

        <!-- External Action Links -->
        <div class="flex flex-wrap items-center gap-3 pt-1">
          <a
            v-if="project.repoUrl"
            :href="project.repoUrl"
            target="_blank"
            rel="noopener noreferrer"
            class="inline-flex items-center gap-2 h-10 px-4 rounded-xl bg-zinc-900 text-zinc-50 dark:bg-zinc-100 dark:text-zinc-950 text-xs sm:text-sm font-semibold hover:opacity-90 transition-opacity"
          >
            <Icon name="simple-icons:github" class="w-4 h-4" />
            <span>Abrir Repositório no GitHub</span>
            <Icon name="lucide:arrow-up-right" class="w-3.5 h-3.5" />
          </a>

          <a
            v-if="project.liveUrl"
            :href="project.liveUrl"
            target="_blank"
            rel="noopener noreferrer"
            class="inline-flex items-center gap-2 h-10 px-4 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-xs sm:text-sm font-medium text-zinc-800 dark:text-zinc-200 hover:border-zinc-300 dark:hover:border-zinc-700 transition-colors"
          >
            <Icon name="lucide:globe" class="w-4 h-4" />
            <span>Acessar Demonstração</span>
            <Icon name="lucide:arrow-up-right" class="w-3.5 h-3.5 text-zinc-400" />
          </a>
        </div>
      </header>

      <!-- Highlights & GitHub Telemetry Cards -->
      <div
        v-if="project.highlights.length > 0 || project.github"
        class="grid grid-cols-1 lg:grid-cols-12 gap-5 py-8 border-b border-zinc-200/80 dark:border-zinc-800/80"
      >
        <!-- Key Highlights -->
        <div
          v-if="project.highlights.length > 0"
          :class="project.github ? 'lg:col-span-7' : 'lg:col-span-12'"
          class="rounded-2xl border border-zinc-200/85 dark:border-zinc-800/85 bg-white/85 dark:bg-obsidian-900/70 p-6 space-y-3.5"
        >
          <p class="font-mono text-xs uppercase tracking-wider text-zinc-400 dark:text-zinc-500">
            Destaques de Engenharia
          </p>
          <ul class="space-y-2.5">
            <li
              v-for="(highlight, idx) in project.highlights"
              :key="idx"
              class="flex items-start gap-2.5 text-sm text-zinc-700 dark:text-zinc-300 leading-relaxed"
            >
              <Icon name="lucide:check" class="w-4 h-4 text-emerald-500 mt-0.5 shrink-0" />
              <span>{{ highlight }}</span>
            </li>
          </ul>
        </div>

        <!-- Live GitHub Metadata Box -->
        <div
          v-if="project.github"
          :class="project.highlights.length > 0 ? 'lg:col-span-5' : 'lg:col-span-12'"
          class="rounded-2xl border border-zinc-200/85 dark:border-zinc-800/85 bg-white/85 dark:bg-obsidian-900/70 p-6 flex flex-col justify-between gap-5"
        >
          <div class="space-y-4">
            <div class="flex items-center justify-between gap-2">
              <p class="font-mono text-xs uppercase tracking-wider text-zinc-400 dark:text-zinc-500">
                Telemetria GitHub
              </p>
              <span class="font-mono text-[11px] text-zinc-500 dark:text-zinc-400">
                branch: {{ project.github.defaultBranch }}
              </span>
            </div>

            <LanguageBar :languages="project.github.languages" :max-legend-items="5" />
          </div>

          <div class="pt-3 border-t border-zinc-200/70 dark:border-zinc-800/70 flex flex-wrap items-center justify-between gap-3 text-xs font-mono text-zinc-500 dark:text-zinc-400">
            <div class="flex items-center gap-4">
              <span class="inline-flex items-center gap-1">
                <Icon name="lucide:star" class="w-3.5 h-3.5" />
                {{ project.github.stars }}
              </span>
              <span class="inline-flex items-center gap-1">
                <Icon name="lucide:git-fork" class="w-3.5 h-3.5" />
                {{ project.github.forks }}
              </span>
            </div>
            <span v-if="formattedUpdatedDate">
              Atualizado em {{ formattedUpdatedDate }}
            </span>
          </div>
        </div>
      </div>

      <!-- Main Body + Sticky Sidebar -->
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-10 pt-10">
        <!-- Rendered Markdown / README -->
        <div class="lg:col-span-8 min-w-0">
          <div
            v-if="project.html"
            class="portfolio-prose"
            v-html="project.html"
          />
          <div
            v-else
            class="rounded-2xl border border-dashed border-zinc-300 dark:border-zinc-800 p-8 text-sm text-zinc-500"
          >
            Consulte os detalhes de implementação diretamente nos destaques e no repositório acima.
          </div>
        </div>

        <!-- Sidebar Metadata & Table of Contents -->
        <aside class="lg:col-span-4 space-y-6">
          <div class="lg:sticky lg:top-24 space-y-6">
            <!-- Metadata Card -->
            <div class="rounded-2xl border border-zinc-200/85 dark:border-zinc-800/85 bg-white/85 dark:bg-obsidian-900/70 p-5 space-y-4">
              <div>
                <p class="font-mono text-[11px] uppercase tracking-wider text-zinc-400 dark:text-zinc-500">
                  Papel
                </p>
                <p class="text-sm font-medium text-zinc-900 dark:text-zinc-100 mt-0.5">
                  {{ project.role }}
                </p>
              </div>

              <div v-if="project.stack.length > 0">
                <p class="font-mono text-[11px] uppercase tracking-wider text-zinc-400 dark:text-zinc-500 mb-2">
                  Stack Utilizada
                </p>
                <div class="flex flex-wrap gap-1.5">
                  <span
                    v-for="tech in project.stack"
                    :key="tech"
                    class="px-2.5 py-1 rounded-md text-xs font-mono bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 border border-zinc-200/70 dark:border-zinc-700/60"
                  >
                    {{ tech }}
                  </span>
                </div>
              </div>
            </div>

            <!-- Sticky Table of Contents -->
            <nav
              v-if="project.toc.length > 1"
              aria-label="Índice do projeto"
              class="rounded-2xl border border-zinc-200/85 dark:border-zinc-800/85 bg-white/85 dark:bg-obsidian-900/70 p-5"
            >
              <p class="font-mono text-[11px] uppercase tracking-wider text-zinc-400 dark:text-zinc-500 mb-3">
                Neste Documento
              </p>
              <ul class="space-y-2 text-xs">
                <li
                  v-for="heading in project.toc"
                  :key="heading.id"
                  :class="heading.level === 3 ? 'pl-3' : ''"
                >
                  <a
                    :href="`#${heading.id}`"
                    class="block text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors leading-snug"
                  >
                    {{ heading.text }}
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </aside>
      </div>

      <!-- Prev / Next Navigation -->
      <div
        v-if="project.prevProject || project.nextProject"
        class="mt-16 pt-8 border-t border-zinc-200/80 dark:border-zinc-800/80 grid grid-cols-1 sm:grid-cols-2 gap-4"
      >
        <NuxtLink
          v-if="project.prevProject"
          :to="`/projetos/${project.prevProject.slug}`"
          class="group rounded-2xl border border-zinc-200/85 dark:border-zinc-800/85 bg-white/70 dark:bg-obsidian-900/60 p-5 hover:border-zinc-300 dark:hover:border-zinc-700 transition-colors"
        >
          <span class="font-mono text-[11px] text-zinc-400 flex items-center gap-1">
            <Icon name="lucide:arrow-left" class="w-3 h-3" />
            Anterior
          </span>
          <p class="mt-1 text-sm font-semibold text-zinc-900 dark:text-zinc-100 group-hover:underline">
            {{ project.prevProject.title }}
          </p>
        </NuxtLink>
        <div v-else />

        <NuxtLink
          v-if="project.nextProject"
          :to="`/projetos/${project.nextProject.slug}`"
          class="group rounded-2xl border border-zinc-200/85 dark:border-zinc-800/85 bg-white/70 dark:bg-obsidian-900/60 p-5 text-right hover:border-zinc-300 dark:hover:border-zinc-700 transition-colors"
        >
          <span class="font-mono text-[11px] text-zinc-400 inline-flex items-center gap-1 justify-end">
            Próximo
            <Icon name="lucide:arrow-right" class="w-3 h-3" />
          </span>
          <p class="mt-1 text-sm font-semibold text-zinc-900 dark:text-zinc-100 group-hover:underline">
            {{ project.nextProject.title }}
          </p>
        </NuxtLink>
      </div>
    </div>
  </article>
</template>
