<script setup lang="ts">
import { toast } from 'vue-sonner'
import { useFileDialog } from '@vueuse/core'
import { Button } from '@/components/ui/button'
import { ALLOWED_FILE_TYPES, useFontStore } from '../core'

const fontStore = useFontStore()

const { open, onChange } = useFileDialog({
  multiple: false,
  accept: ALLOWED_FILE_TYPES.join(','),
  reset: true,
})

onChange((files) => {
  const file = files?.[0]
  if (!file) return

  toast.promise(fontStore.loadFontFromFile(file), {
    loading: `Parsing ${file.name}...`,
    success: 'Font loaded successfully!',
    error: (e: unknown) =>
      e instanceof Error ? e.message : 'An unexpected error occurred loading the font.',
  })
})
</script>

<template>
  <Button variant="ghost" @click="open">
    {{ fontStore.font === null ? 'Load Font' : 'Change Font' }}
  </Button>
</template>
