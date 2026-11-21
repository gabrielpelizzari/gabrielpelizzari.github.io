<script setup lang="ts">
import type { StackCategory } from '../../shared/types/portfolio'

defineProps<{
  categories: StackCategory[]
}>()
</script>

<template>
  <section id="stack" class="py-16 sm:py-24 scroll-mt-20 border-t border-zinc-200/80 dark:border-zinc-800/80">
    <div class="mx-auto max-w-5xl px-5 sm:px-8">
      <!-- Section Heading -->
      <div class="max-w-2xl mb-12 space-y-2.5">
        <p class="font-mono text-xs uppercase tracking-widest text-zinc-400 dark:text-zinc-500">
          02 // Ecossistema Técnico
        </p>
        <h2 class="text-2xl sm:text-3xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
          Stack &amp; Ferramentas de Engenharia
        </h2>
        <p class="text-sm sm:text-base text-zinc-600 dark:text-zinc-400 leading-relaxed">
          Tecnologias escolhidas com pragmatismo para construir aplicações rápidas, testáveis e fáceis de manter do banco de dados à interface.
        </p>
      </div>

      <!-- 3-Pillar Grid -->
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-5">
        <div
          v-for="category in categories"
          :key="category.id"
          class="rounded-2xl border border-zinc-200/85 dark:border-zinc-800/85 bg-white/85 dark:bg-obsidian-900/70 p-6 flex flex-col justify-between"
        >
          <div>
            <div class="flex items-center gap-3 mb-2">
              <span
                class="inline-flex h-9 w-9 items-center justify-center rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-100/80 dark:bg-zinc-900 text-zinc-800 dark:text-zinc-200"
              >
                <Icon :name="category.icon" class="w-4 h-4" />
              </span>
              <h3 class="text-base font-semibold tracking-tight text-zinc-900 dark:text-zinc-100">
                {{ category.title }}
              </h3>
            </div>
            <p class="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed mb-6">
              {{ category.subtitle }}
            </p>

            <div class="space-y-2.5">
              <div
                v-for="item in category.items"
                :key="item.name"
                class="flex items-center gap-3 rounded-xl border border-zinc-200/60 dark:border-zinc-800/70 bg-zinc-50/70 dark:bg-zinc-900/50 px-3.5 py-2.5 transition-colors hover:border-zinc-300 dark:hover:border-zinc-700"
              >
                <span
                  class="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-white dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800 shrink-0"
                >
                  <Icon :name="item.icon" class="w-4 h-4 text-zinc-700 dark:text-zinc-300" />
                </span>
                <div class="min-w-0">
                  <p class="text-sm font-medium text-zinc-900 dark:text-zinc-100 leading-tight">
                    {{ item.name }}
                  </p>
                  <p class="font-mono text-[11px] text-zinc-400 dark:text-zinc-500 mt-0.5 leading-tight">
                    {{ item.detail }}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
