import { computed, ref, toValue, type MaybeRefOrGetter } from 'vue'
import type { GlyphEntry } from './useGlyphEntries'

/*
 * ============================================================================
 * Composable
 * ============================================================================
 */

function useGlyphSearch(glyphEntries: MaybeRefOrGetter<GlyphEntry[] | null>) {
  const search = ref<string>('')

  const results = computed<GlyphEntry[]>(() => {
    const currentData = toValue(glyphEntries)
    const query = search.value

    if (!currentData) return []
    if (!query) return currentData

    const inputCodePoints = new Set(Array.from(query, (c) => c.codePointAt(0)!))

    return currentData.filter((glyph) => glyph.unicodes.some((u) => inputCodePoints.has(u)))
  })

  return {
    search,
    results,
  }
}

/*
 * ============================================================================
 * Exports
 * ============================================================================
 */

export { useGlyphSearch }
