import { computed, ref, toValue, watch, type MaybeRefOrGetter } from 'vue'
import type { GlyphEntry } from './useGlyphEntries'

/*
 * ============================================================================
 * Composable
 * ============================================================================
 */

function useGlyphPaginator(
  results: MaybeRefOrGetter<GlyphEntry[]>,
  itemsPerPage: MaybeRefOrGetter<number>,
) {
  const currentPage = ref<number>(1)

  const list = computed(() => toValue(results) || [])
  const size = computed(() => Math.max(1, toValue(itemsPerPage)))

  const totalPages = computed(() => {
    const pages = Math.ceil(list.value.length / size.value)
    return Math.max(1, pages)
  })

  const currentPageGlyphItems = computed(() => {
    const start = (currentPage.value - 1) * size.value
    const end = start + size.value
    return list.value.slice(start, end)
  })

  watch(
    () => list.value,
    () => {
      currentPage.value = 1
    },
  )

  return {
    currentPage,
    totalPages,
    currentPageGlyphItems,
  }
}

/*
 * ============================================================================
 * Exports
 * ============================================================================
 */

export { useGlyphPaginator }
