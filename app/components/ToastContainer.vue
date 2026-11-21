<script setup lang="ts">
const { toasts, removeToast } = useToast()
</script>

<template>
  <div
    class="fixed bottom-5 right-5 z-50 flex flex-col gap-2.5 max-w-sm w-full pointer-events-none px-4 sm:px-0"
    aria-live="polite"
  >
    <TransitionGroup
      enter-active-class="transition duration-200 ease-out"
      enter-from-class="translate-y-2 opacity-0 scale-95"
      enter-to-class="translate-y-0 opacity-100 scale-100"
      leave-active-class="transition duration-150 ease-in"
      leave-from-class="opacity-100 scale-100"
      leave-to-class="opacity-0 scale-95"
    >
      <div
        v-for="toast in toasts"
        :key="toast.id"
        class="pointer-events-auto flex items-start gap-3 rounded-xl border px-4 py-3 shadow-lg backdrop-blur-md"
        :class="
          toast.variant === 'error'
            ? 'bg-red-950/90 border-red-800/80 text-red-100'
            : 'bg-zinc-900/95 dark:bg-zinc-900/95 border-zinc-800 text-zinc-100'
        "
      >
        <Icon
          :name="
            toast.variant === 'error'
              ? 'lucide:alert-circle'
              : toast.variant === 'success'
                ? 'lucide:check-circle-2'
                : 'lucide:info'
          "
          class="w-4 h-4 mt-0.5 shrink-0"
          :class="toast.variant === 'success' ? 'text-emerald-400' : 'text-zinc-300'"
        />
        <div class="flex-1 min-w-0">
          <p class="text-xs font-semibold leading-snug">
            {{ toast.title }}
          </p>
          <p v-if="toast.description" class="text-xs text-zinc-400 mt-0.5 leading-relaxed">
            {{ toast.description }}
          </p>
        </div>
        <button
          type="button"
          class="text-zinc-500 hover:text-zinc-200 transition-colors"
          aria-label="Fechar notificação"
          @click="removeToast(toast.id)"
        >
          <Icon name="lucide:x" class="w-3.5 h-3.5" />
        </button>
      </div>
    </TransitionGroup>
  </div>
</template>
