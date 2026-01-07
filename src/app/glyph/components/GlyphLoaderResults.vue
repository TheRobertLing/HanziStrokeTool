<script setup lang="ts">
import { computed } from 'vue'
import { Empty, EmptyDescription, EmptyHeader, EmptyTitle } from '@/components/ui/empty'
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group'
import type { GlyphSVG } from '../core'

defineProps<{
  glyphItems: GlyphSVG[]
}>()

const selectedId = defineModel<number | null>({ required: true })

const selectedIdString = computed({
  get: () => selectedId.value?.toString(),
  set: (val: string | undefined) => {
    selectedId.value = val ? Number(val) : null
  },
})
</script>

<template>
  <Empty v-if="glyphItems.length === 0" class="size-full">
    <EmptyHeader>
      <EmptyTitle>No Glyphs Found</EmptyTitle>
      <EmptyDescription>No glyphs matched the search</EmptyDescription>
    </EmptyHeader>
  </Empty>

  <ToggleGroup
    v-else
    v-model="selectedIdString"
    type="single"
    variant="outline"
    orientation="horizontal"
    class="grid size-full grid-cols-[repeat(auto-fill,minmax(3.5rem,1fr))] content-start justify-start gap-2"
  >
    <ToggleGroupItem
      v-for="glyph in glyphItems"
      :key="glyph.id"
      :value="glyph.id.toString()"
      :title="`Glyph Index: ${glyph.id}`"
      class="data-[state=on]:border-primary data-[state=on]:bg-accent data-[state=on]:text-accent-foreground aspect-square h-full p-2 data-[spacing=0]:first:rounded-l-none data-[spacing=0]:last:rounded-r-none data-[spacing=0]:data-[variant=outline]:border-l"
    >
      <svg :viewBox="glyph.viewBox" class="size-full fill-current">
        <path :d="glyph.pathData" />
      </svg>
    </ToggleGroupItem>
  </ToggleGroup>
</template>
