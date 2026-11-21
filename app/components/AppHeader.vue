<script setup lang="ts">
const colorMode = useColorMode()
const route = useRoute()
const { openPalette } = useCommandPalette()
const mobileMenuOpen = ref(false)

const navItems = [
  { label: 'Projetos', to: '/#projetos', match: '/projetos' },
  { label: 'Stack', to: '/#stack', match: '' },
  { label: 'Sobre', to: '/#sobre', match: '' },
  { label: 'Contato', to: '/#contato', match: '' },
]

function toggleTheme() {
  colorMode.preference = colorMode.value === 'dark' ? 'light' : 'dark'
}

watch(
  () => route.fullPath,
  () => {
    mobileMenuOpen.value = false
  },
)
</script>

<template>
  <header
    class="sticky top-0 z-40 w-full backdrop-blur-md bg-zinc-50/80 dark:bg-obsidian-950/80 border-b border-zinc-200/70 dark:border-zinc-800/70"
  >
    <div class="mx-auto max-w-5xl px-5 sm:px-8 h-16 flex items-center justify-between gap-4">
      <!-- Brand / Monogram -->
      <NuxtLink
        to="/"
        class="group inline-flex items-center gap-2.5 focus:outline-none"
        aria-label="Página inicial de Gabriel Pelizzari"
      >
        <span
          class="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-zinc-900 text-zinc-50 dark:bg-zinc-100 dark:text-zinc-950 font-mono text-xs font-bold tracking-tight transition-transform duration-200 group-hover:scale-[1.03]"
        >
          GP
        </span>
        <div class="flex flex-col">
          <span class="text-sm font-semibold tracking-tight text-zinc-900 dark:text-zinc-100 leading-none">
            gabriel.pelizzari
          </span>
          <span class="text-[11px] font-mono text-zinc-500 dark:text-zinc-400 mt-0.5 leading-none">
            software developer
          </span>
        </div>
      </NuxtLink>

      <!-- Desktop Navigation -->
      <nav class="hidden md:flex items-center gap-1" aria-label="Navegação principal">
        <NuxtLink
          v-for="item in navItems"
          :key="item.label"
          :to="item.to"
          class="px-3 py-1.5 rounded-lg text-sm font-medium transition-colors"
          :class="
            item.match && route.path.startsWith(item.match)
              ? 'text-zinc-900 dark:text-zinc-100 bg-zinc-200/60 dark:bg-zinc-800/60'
              : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 hover:bg-zinc-200/40 dark:hover:bg-zinc-800/40'
          "
        >
          {{ item.label }}
        </NuxtLink>
      </nav>

      <!-- Actions -->
      <div class="flex items-center gap-2">
        <a
          href="https://github.com/gabrielpelizzari"
          target="_blank"
          rel="noopener noreferrer"
          class="hidden sm:inline-flex items-center justify-center h-8 w-8 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white/60 dark:bg-zinc-900/60 text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 hover:border-zinc-300 dark:hover:border-zinc-700 transition-colors"
          aria-label="GitHub de Gabriel Pelizzari"
          title="GitHub (@gabrielpelizzari)"
        >
          <Icon name="simple-icons:github" class="w-4 h-4" />
        </a>

        <button
          type="button"
          class="hidden sm:inline-flex items-center gap-2 h-8 px-2.5 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white/60 dark:bg-zinc-900/60 text-xs text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 hover:border-zinc-300 dark:hover:border-zinc-700 transition-colors"
          aria-label="Abrir paleta de comandos"
          @click="openPalette"
        >
          <Icon name="lucide:search" class="w-3.5 h-3.5" />
          <kbd class="font-mono text-[10px] tracking-tight opacity-80">Ctrl K</kbd>
        </button>

        <ClientOnly>
          <button
            type="button"
            class="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white/60 dark:bg-zinc-900/60 text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 hover:border-zinc-300 dark:hover:border-zinc-700 transition-colors"
            :aria-label="colorMode.value === 'dark' ? 'Ativar modo claro' : 'Ativar modo escuro'"
            @click="toggleTheme"
          >
            <Icon :name="colorMode.value === 'dark' ? 'lucide:sun' : 'lucide:moon'" class="w-4 h-4" />
          </button>
          <template #fallback>
            <span
              class="inline-flex h-8 w-8 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white/60 dark:bg-zinc-900/60"
            />
          </template>
        </ClientOnly>

        <!-- Mobile Menu Button -->
        <button
          type="button"
          class="md:hidden inline-flex h-8 w-8 items-center justify-center rounded-lg border border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400"
          aria-label="Menu"
          @click="mobileMenuOpen = !mobileMenuOpen"
        >
          <Icon :name="mobileMenuOpen ? 'lucide:x' : 'lucide:menu'" class="w-4 h-4" />
        </button>
      </div>
    </div>

    <!-- Mobile Drawer -->
    <div
      v-if="mobileMenuOpen"
      class="md:hidden border-t border-zinc-200/80 dark:border-zinc-800/80 bg-zinc-50 dark:bg-obsidian-950 px-5 py-4 space-y-1"
    >
      <NuxtLink
        v-for="item in navItems"
        :key="item.label"
        :to="item.to"
        class="block px-3 py-2 rounded-lg text-sm font-medium text-zinc-700 dark:text-zinc-300 hover:bg-zinc-200/50 dark:hover:bg-zinc-800/60"
      >
        {{ item.label }}
      </NuxtLink>
      <a
        href="https://github.com/gabrielpelizzari"
        target="_blank"
        rel="noopener noreferrer"
        class="flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium text-zinc-900 dark:text-zinc-100 bg-zinc-200/60 dark:bg-zinc-800/60"
      >
        <Icon name="simple-icons:github" class="w-4 h-4" />
        <span>GitHub (@gabrielpelizzari)</span>
      </a>
    </div>
  </header>
</template>
