<script setup lang="ts">
import type { GithubUserSummary, ProfileData } from '../../shared/types/portfolio'

const props = defineProps<{
  profile: ProfileData
  githubUser: GithubUserSummary | null
  totalProjects: number
}>()

const activeSinceYear = computed(() => {
  if (!props.githubUser?.createdAt) return '2022'
  return new Date(props.githubUser.createdAt).getFullYear().toString()
})
</script>

<template>
  <section class="pt-14 pb-16 sm:pt-20 sm:pb-24">
    <div class="mx-auto max-w-5xl px-5 sm:px-8">
      <!-- Top Availability Status Pill -->
      <div class="flex flex-wrap items-center gap-3 mb-8">
        <div
          v-if="profile.available"
          class="inline-flex items-center gap-2 rounded-full border border-zinc-200/90 dark:border-zinc-800 bg-white/80 dark:bg-zinc-900/80 px-3.5 py-1.5 text-xs font-medium text-zinc-700 dark:text-zinc-300 shadow-sm"
        >
          <span class="relative flex h-2 w-2">
            <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span class="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
          </span>
          <span>{{ profile.availabilityLabel }}</span>
        </div>

        <span class="inline-flex items-center gap-1.5 text-xs font-mono text-zinc-500 dark:text-zinc-400">
          <Icon name="lucide:map-pin" class="w-3.5 h-3.5" />
          <span>{{ profile.location }}</span>
        </span>
      </div>

      <!-- Identity + Headline -->
      <div class="flex flex-col md:flex-row md:items-start justify-between gap-8">
        <div class="max-w-3xl space-y-6">
          <div class="flex items-center gap-4">
            <img
              :src="githubUser?.avatarUrl || profile.avatarUrl"
              :alt="profile.name"
              width="56"
              height="56"
              class="h-14 w-14 rounded-2xl object-cover border border-zinc-200 dark:border-zinc-800 shadow-sm"
            />
            <div>
              <h1 class="text-xl sm:text-2xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
                {{ profile.name }}
              </h1>
              <p class="text-sm font-mono text-zinc-500 dark:text-zinc-400">
                {{ profile.role }} · {{ profile.handle }}
              </p>
            </div>
          </div>

          <h2
            class="text-3xl sm:text-5xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50 leading-[1.13]"
          >
            {{ profile.headline }}
          </h2>

          <p class="text-base sm:text-lg text-zinc-600 dark:text-zinc-400 leading-relaxed max-w-2xl">
            {{ profile.subheadline }}
          </p>

          <!-- Primary CTAs -->
          <div class="pt-2 flex flex-wrap items-center gap-3">
            <a
              href="#projetos"
              class="inline-flex items-center gap-2 h-11 px-5 rounded-xl bg-zinc-900 text-zinc-50 dark:bg-zinc-100 dark:text-zinc-950 text-sm font-semibold hover:opacity-90 transition-opacity"
            >
              <span>Ver Projetos</span>
              <Icon name="lucide:arrow-down-right" class="w-4 h-4" />
            </a>

            <a
              :href="profile.githubUrl"
              target="_blank"
              rel="noopener noreferrer"
              class="inline-flex items-center gap-2 h-11 px-4 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white/80 dark:bg-zinc-900/70 text-sm font-medium text-zinc-800 dark:text-zinc-200 hover:border-zinc-300 dark:hover:border-zinc-700 transition-colors"
            >
              <Icon name="simple-icons:github" class="w-4 h-4" />
              <span>github.com/{{ profile.githubUsername }}</span>
              <Icon name="lucide:arrow-up-right" class="w-3.5 h-3.5 text-zinc-400" />
            </a>

            <a
              href="#contato"
              class="inline-flex items-center gap-2 h-11 px-4 rounded-xl border border-zinc-200 dark:border-zinc-800 text-sm font-medium text-zinc-600 dark:text-zinc-300 hover:border-zinc-300 dark:hover:border-zinc-700 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors"
            >
              <Icon name="lucide:mail" class="w-4 h-4" />
              <span>Entrar em Contato</span>
            </a>
          </div>
        </div>
      </div>

      <!-- Architectural Telemetry Strip -->
      <div
        class="mt-14 grid grid-cols-2 sm:grid-cols-4 gap-6 py-6 border-y border-zinc-200/80 dark:border-zinc-800/80"
      >
        <div>
          <p class="font-mono text-[11px] uppercase tracking-wider text-zinc-400 dark:text-zinc-500">
            Projetos em Destaque
          </p>
          <p class="mt-1 text-lg font-semibold text-zinc-900 dark:text-zinc-100 font-mono">
            {{ String(totalProjects).padStart(2, '0') }}
            <span class="text-xs font-normal text-zinc-500 dark:text-zinc-400">selecionados</span>
          </p>
        </div>

        <div>
          <p class="font-mono text-[11px] uppercase tracking-wider text-zinc-400 dark:text-zinc-500">
            GitHub
          </p>
          <p class="mt-1 text-sm font-medium text-zinc-900 dark:text-zinc-100 flex items-center gap-1.5">
            <span class="h-1.5 w-1.5 rounded-full bg-emerald-500" />
            <span class="font-mono">@{{ profile.githubUsername }}</span>
          </p>
          <p class="text-[11px] text-zinc-500 dark:text-zinc-400 mt-0.5">
            Ativo desde {{ activeSinceYear }}
          </p>
        </div>

        <div>
          <p class="font-mono text-[11px] uppercase tracking-wider text-zinc-400 dark:text-zinc-500">
            Backend Core
          </p>
          <p class="mt-1 text-sm font-medium text-zinc-900 dark:text-zinc-100">
            Python · FastAPI · RabbitMQ
          </p>
          <p class="text-[11px] text-zinc-500 dark:text-zinc-400 mt-0.5">
            APIs REST &amp; Event-Driven
          </p>
        </div>

        <div>
          <p class="font-mono text-[11px] uppercase tracking-wider text-zinc-400 dark:text-zinc-500">
            Frontend Core
          </p>
          <p class="mt-1 text-sm font-medium text-zinc-900 dark:text-zinc-100">
            Vue.js · Nuxt · TypeScript
          </p>
          <p class="text-[11px] text-zinc-500 dark:text-zinc-400 mt-0.5">
            Tailwind CSS &amp; SSR
          </p>
        </div>
      </div>
    </div>
  </section>
</template>
