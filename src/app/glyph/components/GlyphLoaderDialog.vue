<script setup lang="ts">
import { toast } from 'vue-sonner'

import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { useToggle } from '@vueuse/core'

import { useFontStore } from '@/app/font'

import {
  useGlyphEntries,
  useGlyphSearch,
  useGlyphPaginator,
  useGlyphSVGs,
  useGlyphSelection,
  useGlyphCommandsStore,
} from '../core'

import GlyphLoaderResults from './GlyphLoaderResults.vue'
import GlyphLoaderSearchBar from './GlyphLoaderSearchBar.vue'
import GlyphLoaderPaginator from './GlyphLoaderPaginator.vue'

const ITEMS_PER_PAGE = 28

const [isDialogOpen, toggleDialog] = useToggle(false)

const fontStore = useFontStore()
const glyphCommandsStore = useGlyphCommandsStore()

const { glyphEntries } = useGlyphEntries(() => fontStore.font)
const { search, results } = useGlyphSearch(glyphEntries)
const { currentPage, totalPages, currentPageGlyphItems } = useGlyphPaginator(
  results,
  ITEMS_PER_PAGE,
)
const { glyphSVGs } = useGlyphSVGs(() => fontStore.font, currentPageGlyphItems)
const { selectedGlyphId } = useGlyphSelection(results)

function handleLoadGlyph() {
  try {
    glyphCommandsStore.loadGlyphCommands(() => fontStore.font, selectedGlyphId)
    toggleDialog(false)
    toast.success('Glyph loaded successfully!')
  } catch (e: unknown) {
    const message = e instanceof Error ? e.message : 'An unexpected error occurred.'
    toast.error(message)
  }
}
</script>

<template>
  <Dialog v-model:open="isDialogOpen">
    <DialogTrigger as-child>
      <Button variant="ghost" :disabled="fontStore.font === null"> Load Glyph </Button>
    </DialogTrigger>
    <DialogContent>
      <DialogHeader>
        <DialogTitle> Load Glyph </DialogTitle>
        <DialogDescription> Choose a glyph to load into the editor </DialogDescription>
      </DialogHeader>
      <GlyphLoaderSearchBar v-model="search" />
      <div class="h-70 overflow-y-scroll">
        <GlyphLoaderResults :glyph-items="glyphSVGs" v-model="selectedGlyphId" />
      </div>
      <GlyphLoaderPaginator v-model="currentPage" :total-pages="totalPages" />
      <DialogFooter>
        <Button
          type="submit"
          class="w-full"
          :disabled="selectedGlyphId === null"
          @click="handleLoadGlyph"
        >
          Load Glyph
        </Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
</template>
