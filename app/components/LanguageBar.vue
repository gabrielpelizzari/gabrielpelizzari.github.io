<script setup lang="ts">
import type { LanguageBreakdownItem } from '../../shared/types/portfolio'

const props = withDefaults(
  defineProps<{
    languages: LanguageBreakdownItem[]
    maxLegendItems?: number
    compact?: boolean
  }>(),
  {
    maxLegendItems: 4,
    compact: false,
  },
)

const visibleLegend = computed(() => props.languages.slice(0, props.maxLegendItems))
</script>

<template>
  <div v-if="languages.length > 0" class="space-y-2">
    <div
      class="flex w-full overflow-hidden rounded-full bg-zinc-200/70 dark:bg-zinc-800/80"
      :class="compact ? 'h-1' : 'h-1.5'"
      role="img"
      aria-label="Distribuição de linguagens do repositório"
    >
      <div
        v-for="lang in languages"
        :key="lang.name"
        class="h-full first:rounded-l-full last:rounded-r-full transition-all duration-300"
        :style="{
          width: `${Math.max(lang.percentage, 2)}%`,
          backgroundColor: lang.color,
        }"
        :title="`${lang.name}: ${lang.percentage}%`"
      />
    </div>

    <div class="flex flex-wrap items-center gap-x-3.5 gap-y-1">
      <div
        v-for="lang in visibleLegend"
        :key="lang.name"
        class="inline-flex items-center gap-1.5 font-mono text-[11px] text-zinc-500 dark:text-zinc-400"
      >
        <span class="h-2 w-2 rounded-full shrink-0" :style="{ backgroundColor: lang.color }" />
        <span class="text-zinc-700 dark:text-zinc-300">{{ lang.name }}</span>
        <span class="opacity-75">{{ lang.percentage }}%</span>
      </div>
    </div>
  </div>
</template>
