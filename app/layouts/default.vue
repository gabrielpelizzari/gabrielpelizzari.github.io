<script setup lang="ts">
const { data: profileData } = await useFetch('/api/profile')
const { data: projectsData } = await useFetch('/api/projects')

const projects = computed(() => projectsData.value?.projects || [])
const email = computed(() => profileData.value?.profile.email || 'contato@gabrielpelizzari.dev')
const githubUrl = computed(
  () => profileData.value?.profile.githubUrl || 'https://github.com/gabrielpelizzari',
)
</script>

<template>
  <div class="relative min-h-screen flex flex-col">
    <!-- Subtle architectural grid backdrop -->
    <div class="pointer-events-none fixed inset-x-0 top-0 h-[520px] architectural-grid z-0" />

    <AppHeader />

    <main class="relative z-10 flex-1">
      <slot />
    </main>

    <AppFooter />

    <CommandPalette :projects="projects" :email="email" :github-url="githubUrl" />
    <ToastContainer />
  </div>
</template>
