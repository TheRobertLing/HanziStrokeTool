import { computed, toValue, type MaybeRefOrGetter } from 'vue'
import type { Font } from 'opentype.js'
import type { GlyphEntry } from './useGlyphEntries'

/*
 * ============================================================================
 * Types
 * ============================================================================
 */

interface GlyphSVG {
  id: number
  pathData: string
  viewBox: string
}

/*
 * ============================================================================
 * Composable
 * ============================================================================
 */

function useGlyphSVGs(
  fontSource: MaybeRefOrGetter<Font | null>,
  glyphList: MaybeRefOrGetter<GlyphEntry[]>,
  paddingFactor: MaybeRefOrGetter<number> = 0.1,
) {
  const glyphSVGs = computed<GlyphSVG[]>(() => {
    const font = toValue(fontSource)
    const items = toValue(glyphList)
    const paddingScale = toValue(paddingFactor)

    if (!font || !items.length) return []

    const unitsPerEm = font.unitsPerEm

    return items.map((item) => {
      const glyph = font.glyphs.get(item.id)
      const { x1, y1, x2, y2 } = glyph.getBoundingBox()

      const width = x2 - x1
      const height = y2 - y1

      if (width <= 0 || height <= 0) {
        return {
          id: item.id,
          pathData: '',
          viewBox: `0 0 ${unitsPerEm} ${unitsPerEm}`,
        }
      }

      const pathData = glyph.getPath(0, 0, unitsPerEm).toPathData(2)

      const maxDim = Math.max(width, height)
      const padding = Math.round(maxDim * paddingScale)
      const boxSize = Math.round(maxDim + padding * 2)

      const centerX = x1 + width / 2
      const centerY = -y2 + height / 2

      const minX = Math.round(centerX - boxSize / 2)
      const minY = Math.round(centerY - boxSize / 2)

      return {
        id: item.id,
        pathData,
        viewBox: `${minX} ${minY} ${boxSize} ${boxSize}`,
      }
    })
  })

  return { glyphSVGs }
}

/*
 * ============================================================================
 * Exports
 * ============================================================================
 */

export { type GlyphSVG, useGlyphSVGs }
