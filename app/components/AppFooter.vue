<script setup lang="ts">
const currentYear = new Date().getFullYear()
</script>

<template>
  <footer class="border-t border-zinc-200/80 dark:border-zinc-800/80 mt-24">
    <div class="mx-auto max-w-5xl px-5 sm:px-8 py-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
      <div class="space-y-1">
        <div class="flex items-center gap-2 text-sm font-medium text-zinc-900 dark:text-zinc-100">
          <span>Gabriel Pelizzari</span>
          <span class="text-zinc-300 dark:text-zinc-700">/</span>
          <span class="font-mono text-xs text-zinc-500 dark:text-zinc-400">Bento Gonçalves, RS</span>
        </div>
        <p class="text-xs text-zinc-500 dark:text-zinc-400">
          Desenvolvido com Nuxt, Tailwind CSS &amp; TypeScript.
        </p>
      </div>

      <div class="flex flex-wrap items-center gap-5 text-xs font-medium text-zinc-500 dark:text-zinc-400">
        <NuxtLink to="/projetos" class="hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors">
          Projetos
        </NuxtLink>
        <NuxtLink to="/#sobre" class="hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors">
          Sobre
        </NuxtLink>
        <NuxtLink to="/#contato" class="hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors">
          Contato
        </NuxtLink>
        <a
          href="https://github.com/gabrielpelizzari"
          target="_blank"
          rel="noopener noreferrer"
          class="inline-flex items-center gap-1.5 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors"
        >
          <Icon name="simple-icons:github" class="w-3.5 h-3.5" />
          <span>GitHub</span>
        </a>
        <span class="font-mono text-[11px] text-zinc-400 dark:text-zinc-600">
          &copy; {{ currentYear }}
        </span>
      </div>
    </div>
  </footer>
</template>
