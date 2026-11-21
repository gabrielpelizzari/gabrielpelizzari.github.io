<script setup lang="ts">
import type { ProfileData } from '../../shared/types/portfolio'

defineProps<{
  profile: ProfileData
}>()
</script>

<template>
  <section id="sobre" class="py-16 sm:py-24 scroll-mt-20 border-t border-zinc-200/80 dark:border-zinc-800/80">
    <div class="mx-auto max-w-5xl px-5 sm:px-8">
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        <!-- Left Column: Narrative -->
        <div class="lg:col-span-6 space-y-5">
          <div class="space-y-2">
            <p class="font-mono text-xs uppercase tracking-widest text-zinc-400 dark:text-zinc-500">
              03 // Sobre &amp; Filosofia
            </p>
            <h2 class="text-2xl sm:text-3xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
              Engenharia limpa, foco no problema real.
            </h2>
          </div>

          <div class="space-y-4">
            <p
              v-for="(paragraph, idx) in profile.aboutParagraphs"
              :key="idx"
              class="text-sm sm:text-[15px] leading-7 text-zinc-600 dark:text-zinc-400"
            >
              {{ paragraph }}
            </p>
          </div>

          <div
            class="rounded-2xl border border-zinc-200/85 dark:border-zinc-800/85 bg-white/80 dark:bg-obsidian-900/60 p-5"
          >
            <p class="font-mono text-xs text-zinc-400 dark:text-zinc-500 mb-1.5">
              // lema pessoal
            </p>
            <p class="text-sm font-medium text-zinc-900 dark:text-zinc-100 italic">
              "Always learning, always building."
            </p>
            <p class="text-xs text-zinc-500 dark:text-zinc-400 mt-1">
              {{ profile.name }} — {{ profile.location }}
            </p>
          </div>
        </div>

        <!-- Right Column: 4 Engineering Principles -->
        <div class="lg:col-span-6 space-y-4">
          <div
            v-for="principle in profile.principles"
            :key="principle.index"
            class="rounded-2xl border border-zinc-200/85 dark:border-zinc-800/85 bg-white/85 dark:bg-obsidian-900/70 p-5 sm:p-6 transition-colors hover:border-zinc-300 dark:hover:border-zinc-700"
          >
            <div class="flex items-start gap-4">
              <span
                class="font-mono text-xs font-semibold px-2 py-1 rounded-md bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300 shrink-0"
              >
                {{ principle.index }}
              </span>
              <div class="space-y-1.5">
                <h3 class="text-sm sm:text-base font-semibold text-zinc-900 dark:text-zinc-100">
                  {{ principle.title }}
                </h3>
                <p class="text-xs sm:text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
                  {{ principle.description }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
