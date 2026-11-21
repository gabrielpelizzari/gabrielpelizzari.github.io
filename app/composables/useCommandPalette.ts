export function useCommandPalette() {
  const isOpen = useState<boolean>('gp-cmd-palette', () => false)

  function openPalette() {
    isOpen.value = true
  }

  function closePalette() {
    isOpen.value = false
  }

  function togglePalette() {
    isOpen.value = !isOpen.value
  }

  return {
    isOpen,
    openPalette,
    closePalette,
    togglePalette,
  }
}
