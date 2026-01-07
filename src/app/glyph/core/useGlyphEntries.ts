import type { Font } from 'opentype.js'
import { shallowRef, watch, toValue, type MaybeRefOrGetter } from 'vue'

interface GlyphEntry {
  id: number
  unicodes: number[]
  name: string
}

function useGlyphEntries(fontSource: MaybeRefOrGetter<Font | null>) {
  const glyphEntries = shallowRef<GlyphEntry[] | null>(null)

  watch(
    () => toValue(fontSource),
    (font) => {
      if (!font) {
        glyphEntries.value = null
        return
      }

      glyphEntries.value = Array.from({ length: font.glyphs.length }, (_, i) => {
        const glyph = font.glyphs.get(i)

        const unicodes = glyph.unicodes?.length
          ? glyph.unicodes
          : glyph.unicode !== undefined
            ? [glyph.unicode]
            : []

        return {
          id: glyph.index,
          unicodes,
          name: glyph.name || '',
        }
      })
    },
    { immediate: true },
  )

  return { glyphEntries }
}

export { type GlyphEntry, useGlyphEntries }
