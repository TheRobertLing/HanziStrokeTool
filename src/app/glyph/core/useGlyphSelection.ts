import { ref, watch, toValue, type MaybeRefOrGetter } from 'vue'
import type { GlyphEntry } from './useGlyphEntries'

/*
 * ============================================================================
 * Composable
 * ============================================================================
 */

function useGlyphSelection(glyphListSource: MaybeRefOrGetter<GlyphEntry[]>) {
  const selectedGlyphId = ref<number | null>(null)

  watch(
    () => toValue(glyphListSource),
    () => {
      selectedGlyphId.value = null
    },
  )

  return { selectedGlyphId }
}

/*
 * ============================================================================
 * Exports
 * ============================================================================
 */

export { useGlyphSelection }
