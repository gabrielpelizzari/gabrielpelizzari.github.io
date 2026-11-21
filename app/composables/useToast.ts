export interface ToastItem {
  id: number
  title: string
  description?: string
  variant?: 'default' | 'success' | 'error'
}

export function useToast() {
  const toasts = useState<ToastItem[]>('gp-toasts', () => [])

  function pushToast(toast: Omit<ToastItem, 'id'>, durationMs = 3400) {
    const id = Date.now() + Math.floor(Math.random() * 1000)
    toasts.value.push({ id, variant: 'default', ...toast })

    if (import.meta.client) {
      setTimeout(() => {
        removeToast(id)
      }, durationMs)
    }
  }

  function removeToast(id: number) {
    toasts.value = toasts.value.filter(t => t.id !== id)
  }

  return {
    toasts,
    pushToast,
    removeToast,
  }
}
