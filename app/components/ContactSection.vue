<script setup lang="ts">
import type { ProfileData } from '../../shared/types/portfolio'

const props = defineProps<{
  profile: ProfileData
}>()

const { pushToast } = useToast()
const copied = ref(false)

async function copyEmail() {
  if (!import.meta.client || !navigator.clipboard) return
  await navigator.clipboard.writeText(props.profile.email)
  copied.value = true
  pushToast({
    title: 'E-mail copiado para a área de transferência',
    description: props.profile.email,
    variant: 'success',
  })
  setTimeout(() => {
    copied.value = false
  }, 2200)
}
</script>

<template>
  <section id="contato" class="pt-16 sm:pt-24 scroll-mt-20 border-t border-zinc-200/80 dark:border-zinc-800/80">
    <div class="mx-auto max-w-5xl px-5 sm:px-8">
      <div
        class="rounded-3xl border border-zinc-200/90 dark:border-zinc-800/90 bg-white dark:bg-obsidian-900/90 p-8 sm:p-12 flex flex-col md:flex-row items-start md:items-center justify-between gap-8"
      >
        <div class="max-w-xl space-y-3">
          <p class="font-mono text-xs uppercase tracking-widest text-zinc-400 dark:text-zinc-500">
            04 // Contato
          </p>
          <h2 class="text-2xl sm:text-3xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
            Vamos conversar sobre o seu próximo sistema ou oportunidade?
          </h2>
          <p class="text-sm sm:text-base text-zinc-600 dark:text-zinc-400 leading-relaxed">
            Aberto a posições de engenharia de software fullstack/backend, parcerias técnicas e novos desafios.
          </p>
        </div>

        <div class="flex flex-col sm:flex-row md:flex-col lg:flex-row items-stretch sm:items-center gap-3 w-full md:w-auto">
          <button
            type="button"
            class="inline-flex items-center justify-center gap-2 h-11 px-5 rounded-xl bg-zinc-900 text-zinc-50 dark:bg-zinc-100 dark:text-zinc-950 text-sm font-semibold hover:opacity-90 transition-opacity"
            @click="copyEmail"
          >
            <Icon :name="copied ? 'lucide:check' : 'lucide:copy'" class="w-4 h-4" />
            <span>{{ copied ? 'E-mail Copiado' : 'Copiar E-mail' }}</span>
          </button>

          <a
            :href="profile.githubUrl"
            target="_blank"
            rel="noopener noreferrer"
            class="inline-flex items-center justify-center gap-2 h-11 px-5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 text-sm font-medium text-zinc-800 dark:text-zinc-200 hover:border-zinc-300 dark:hover:border-zinc-700 transition-colors"
          >
            <Icon name="simple-icons:github" class="w-4 h-4" />
            <span>GitHub</span>
          </a>

          <a
            v-if="profile.linkedinUrl"
            :href="profile.linkedinUrl"
            target="_blank"
            rel="noopener noreferrer"
            class="inline-flex items-center justify-center gap-2 h-11 px-5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 text-sm font-medium text-zinc-800 dark:text-zinc-200 hover:border-zinc-300 dark:hover:border-zinc-700 transition-colors"
          >
            <Icon name="simple-icons:linkedin" class="w-4 h-4" />
            <span>LinkedIn</span>
          </a>
        </div>
      </div>
    </div>
  </section>
</template>
