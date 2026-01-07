import { parse } from 'opentype.js'
import { readFile } from 'node:fs/promises'
import { parseSVG } from 'svg-path-parser'

/**
 * Extracts a character from a font and normalizes it to fit strictly
 * within a target box (e.g., 1024x1024), preserving the font's design metrics.
 */
function getNormalizedPathData(font, char, targetSize = 1024) {
  const glyph = font.charToGlyph(char)
  console.log(glyph)

  const scale = targetSize / font.unitsPerEm

  const yOffset = font.ascender * scale

  const result = glyph.getPath(0, yOffset, 1024).toPathData(2)
  console.log(parseSVG(result))

  return glyph.getPath(0, yOffset, 1024).toPathData(2)
}

// --- Usage Example ---

const buffer = await readFile('./playground/HanaMinA.otf')
const font = parse(buffer.buffer)

const char = '.'

const glyph = font.charToGlyph(char)
console.log(glyph)

const scale = targetSize / font.unitsPerEm

const yOffset = font.ascender * scale

const pathData = glyph.getPath(0, yOffset, 1024).toPathData(2)
console.log(parseSVG(pathData))

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

// import { parse } from 'opentype.js'
// import { readFile } from 'node:fs/promises'

// /**
//  * Returns path data where the glyph is centered and scaled
//  * to fit strictly within a target width/height.
//  */
// function getStrictlyBoundedPathData(font, char, targetSize = 1024) {
//   const glyph = font.charToGlyph(char)

//   // 1. Get the raw bounding box of the glyph (in font units)
//   const bbox = glyph.getBoundingBox()

//   // Handle whitespace characters (empty bbox)
//   const bboxWidth = bbox.x2 - bbox.x1
//   const bboxHeight = bbox.y2 - bbox.y1
//   if (bboxWidth === 0 || bboxHeight === 0) return ''

//   // 2. Find the center of the raw glyph (in font units)
//   const fontCenterX = (bbox.x1 + bbox.x2) / 2
//   const fontCenterY = (bbox.y1 + bbox.y2) / 2

//   // 3. Determine the scale factor
//   // We want the largest dimension (width or height) to fit 'targetSize'
//   // You can subtract a padding here if you want breathing room (e.g. targetSize * 0.9)
//   const scaleFactor = targetSize / Math.max(bboxWidth, bboxHeight)

//   // 4. Calculate the fontSize required to achieve this scale
//   // opentype.js calculates: coordinate * (fontSize / unitsPerEm)
//   // So we solve for fontSize:
//   const fontSize = scaleFactor * font.unitsPerEm

//   // 5. Calculate the Draw Origin (x, y)
//   // We want the glyph center to align with the box center (targetSize / 2)

//   // X calculation:
//   // We need (OriginX + FontCenterX * Scale) = TargetCenter
//   const originX = targetSize / 2 - fontCenterX * scaleFactor

//   // Y calculation:
//   // SVG Y is "Down", Font Y is "Up".
//   // We need (OriginY - FontCenterY * Scale) = TargetCenter
//   // Note: The 'y' argument in getPath() is the BASELINE position.
//   const originY = targetSize / 2 + fontCenterY * scaleFactor

//   return glyph.getPath(originX, originY, fontSize).toPathData(2)
// }

// // --- Usage Example ---

// const buffer = await readFile('./playground/HanaMinA.otf')
// const font = parse(buffer.buffer)

// const char = '木' // Try 'j', 'g', or special chars to test bounds
// const pathData = getStrictlyBoundedPathData(font, char, 1024)

// const svgOutput = `
// <svg viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg">
//     <!-- Visual Boundary -->
//     <rect x="0" y="0" width="1024" height="1024" fill="none" stroke="red" stroke-width="4"/>
//     <line x1="512" y1="0" x2="512" y2="1024" stroke="#eee" stroke-width="2"/>
//     <line x1="0" y1="512" x2="1024" y2="512" stroke="#eee" stroke-width="2"/>

//     <!-- The Character -->
//     <path d="${pathData}" fill="black" />
// </svg>
// `

// console.log(svgOutput)
