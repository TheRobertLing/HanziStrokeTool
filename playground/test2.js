import { parse } from 'opentype.js'
import { readFile } from 'node:fs/promises'

function getSafeRelativePathData(font, char, targetSize = 1024) {
  const glyph = font.charToGlyph(char)

  // --- THE CHANGE IS HERE ---

  // 1. Calculate the real vertical height of the font
  // (Use 'head' table if available, otherwise fallback to ascender - descender)
  const head = font.tables.head
  const fontHeight = head ? head.yMax - head.yMin : font.ascender - font.descender

  // 2. Scale based on the REAL height, not the theoretical unitsPerEm
  // This ensures even the tallest/deepest glyphs fit in the 1024 box.
  const scale = targetSize / fontHeight

  // 3. Center the Font Vertically in the 1024 box
  // We calculate where the "top" of the ink (yMax) is, and align it to the top of the box.
  // (Or you can stick to your ascender logic if you prefer strict baseline alignment)
  const yMax = head ? head.yMax : font.ascender

  // This places the highest point of the font at SVG y=0
  const baseline = yMax * scale

  // If you want to vertically center the whole font grid in the box (add padding top/bottom):
  // const totalPadding = targetSize - (fontHeight * scale);
  // const baseline = (yMax * scale) + (totalPadding / 2);

  return glyph.getPath(0, baseline, scale * font.unitsPerEm).toPathData(2)
}

// --- Usage ---
const buffer = await readFile('./playground/noto.ttf')
const font = parse(buffer.buffer)
const char = '木' // Will be small and safe
const pathData = getSafeRelativePathData(font, char, 1024)
const svgOutput = `
<svg viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg">
    <!-- The Box (Tianzige visual reference) -->
    <rect x="0" y="0" width="1024" height="1024" fill="none" stroke="#ccc" stroke-width="2"/>
    <line x1="512" y1="0" x2="512" y2="1024" stroke="#eee" stroke-width="2"/>
    <line x1="0" y1="512" x2="1024" y2="512" stroke="#eee" stroke-width="2"/>

    <!-- The Character -->
    <path d="${pathData}" fill="black" />
</svg>
`

console.log(svgOutput)
