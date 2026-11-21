<script setup lang="ts">
import type { PortfolioProjectSummary } from '../../shared/types/portfolio'

const props = defineProps<{
  project: PortfolioProjectSummary
  index?: number
}>()

const cardRef = ref<HTMLElement | null>(null)
const mouseX = ref(0)
const mouseY = ref(0)
const isHovering = ref(false)
const imageFailed = ref(false)

function handleMouseMove(e: MouseEvent) {
  if (!cardRef.value) return
  const rect = cardRef.value.getBoundingClientRect()
  mouseX.value = e.clientX - rect.left
  mouseY.value = e.clientY - rect.top
}

const formattedIndex = computed(() => {
  if (props.index === undefined) return null
  return String(props.index + 1).padStart(2, '0')
})
</script>

<template>
  <article
    ref="cardRef"
    class="group relative flex flex-col justify-between rounded-2xl border border-zinc-200/85 dark:border-zinc-800/85 bg-white/90 dark:bg-obsidian-900/75 p-6 sm:p-7 transition-all duration-300 hover:border-zinc-300 dark:hover:border-zinc-700 hover:shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:hover:shadow-[0_8px_30px_rgb(0,0,0,0.28)] overflow-hidden"
    @mousemove="handleMouseMove"
    @mouseenter="isHovering = true"
    @mouseleave="isHovering = false"
  >
    <!-- Subtle spotlight radial effect -->
    <div
      class="pointer-events-none absolute -inset-px rounded-2xl transition-opacity duration-300"
      :class="isHovering ? 'opacity-100' : 'opacity-0'"
      :style="{
        background: `radial-gradient(460px circle at ${mouseX}px ${mouseY}px, rgba(161, 161, 170, 0.09), transparent 45%)`,
      }"
    />

    <div class="relative z-10 flex flex-col flex-1">
      <!-- Top Metadata Row -->
      <div class="flex items-center justify-between gap-3 mb-5">
        <div class="flex items-center gap-2.5 font-mono text-xs text-zinc-400 dark:text-zinc-500">
          <span v-if="formattedIndex">{{ formattedIndex }}</span>
          <span v-if="formattedIndex" class="text-zinc-300 dark:text-zinc-700">/</span>
          <span>{{ project.year }}</span>
        </div>

        <!-- Source Badge: GitHub vs Custom Written -->
        <span
          v-if="project.source === 'github'"
          class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-mono border border-zinc-200/90 dark:border-zinc-800 bg-zinc-100/80 dark:bg-zinc-900 text-zinc-700 dark:text-zinc-300"
          :title="`Sincronizado direto do GitHub: ${project.repoFullName}`"
        >
          <span class="h-1.5 w-1.5 rounded-full bg-emerald-500" />
          <Icon name="simple-icons:github" class="w-3 h-3 opacity-80" />
          <span class="truncate max-w-[180px]">{{ project.repoFullName || 'GitHub Repo' }}</span>
        </span>

        <span
          v-else
          class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-mono border border-zinc-200/90 dark:border-zinc-800 bg-zinc-100/80 dark:bg-zinc-900 text-zinc-700 dark:text-zinc-300"
          title="Projeto escrito diretamente no portfólio"
        >
          <Icon name="lucide:file-pen-line" class="w-3 h-3 opacity-80" />
          <span>Autoral · Case Study</span>
        </span>
      </div>

      <!-- Optional Visual Cover Preview -->
      <NuxtLink
        v-if="project.coverImage && !imageFailed"
        :to="`/projetos/${project.slug}`"
        class="block mb-5 overflow-hidden rounded-xl border border-zinc-200/80 dark:border-zinc-800/80 bg-zinc-100 dark:bg-zinc-950 aspect-[16/9]"
        tabindex="-1"
      >
        <img
          :src="project.coverImage"
          :alt="`Preview do projeto ${project.title}`"
          loading="lazy"
          class="h-full w-full object-cover object-top transition-transform duration-500 ease-out group-hover:scale-[1.025]"
          @error="imageFailed = true"
        />
      </NuxtLink>

      <!-- Title & Summary -->
      <div class="space-y-2.5">
        <NuxtLink
          :to="`/projetos/${project.slug}`"
          class="inline-flex items-center gap-1.5 text-lg sm:text-xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50 group-hover:text-zinc-700 dark:group-hover:text-white transition-colors"
        >
          <span>{{ project.title }}</span>
          <Icon
            name="lucide:arrow-up-right"
            class="w-4 h-4 text-zinc-400 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-zinc-900 dark:group-hover:text-zinc-100"
          />
        </NuxtLink>

        <p class="text-sm leading-relaxed text-zinc-600 dark:text-zinc-400 line-clamp-3">
          {{ project.summary }}
        </p>
      </div>

      <!-- Highlights (first 2 concise items if available) -->
      <ul
        v-if="project.highlights.length > 0"
        class="mt-4 space-y-1.5 border-l border-zinc-200 dark:border-zinc-800 pl-3.5"
      >
        <li
          v-for="(item, idx) in project.highlights.slice(0, 2)"
          :key="idx"
          class="text-xs leading-relaxed text-zinc-500 dark:text-zinc-400 line-clamp-1"
        >
          {{ item }}
        </li>
      </ul>

      <!-- GitHub Language Breakdown Bar (if GitHub repo) -->
      <div v-if="project.github?.languages?.length" class="mt-5">
        <LanguageBar :languages="project.github.languages" :max-legend-items="3" compact />
      </div>

      <!-- Stack Tags -->
      <div v-if="project.stack.length > 0" class="mt-5 flex flex-wrap gap-1.5">
        <span
          v-for="tech in project.stack.slice(0, 7)"
          :key="tech"
          class="px-2 py-0.5 rounded-md text-[11px] font-mono bg-zinc-100 dark:bg-zinc-800/75 text-zinc-600 dark:text-zinc-300 border border-zinc-200/60 dark:border-zinc-700/50"
        >
          {{ tech }}
        </span>
      </div>
    </div>

    <!-- Bottom Action Bar -->
    <div
      class="relative z-10 mt-6 pt-4 border-t border-zinc-200/70 dark:border-zinc-800/70 flex items-center justify-between gap-4"
    >
      <NuxtLink
        :to="`/projetos/${project.slug}`"
        class="inline-flex items-center gap-1.5 text-xs font-semibold text-zinc-900 dark:text-zinc-100 hover:opacity-80 transition-opacity"
      >
        <span>Ler documentação &amp; arquitetura</span>
        <Icon name="lucide:arrow-right" class="w-3.5 h-3.5" />
      </NuxtLink>

      <div class="flex items-center gap-3">
        <a
          v-if="project.repoUrl"
          :href="project.repoUrl"
          target="_blank"
          rel="noopener noreferrer"
          class="inline-flex items-center gap-1 text-xs font-mono text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors"
          title="Abrir repositório no GitHub"
        >
          <Icon name="simple-icons:github" class="w-3.5 h-3.5" />
          <span>Código</span>
        </a>
        <a
          v-if="project.liveUrl"
          :href="project.liveUrl"
          target="_blank"
          rel="noopener noreferrer"
          class="inline-flex items-center gap-1 text-xs font-mono text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors"
          title="Abrir demonstração online"
        >
          <Icon name="lucide:globe" class="w-3.5 h-3.5" />
          <span>Live</span>
        </a>
      </div>
    </div>
  </article>
</template>
