import { defineStore } from 'pinia'
import { shallowRef, toValue, type MaybeRefOrGetter } from 'vue'
import type { Font, PathCommand } from 'opentype.js'

/*
 * ============================================================================
 * Types
 * ============================================================================
 */

interface Point {
  x: number
  y: number
}

interface LineCommandNode {
  readonly type: 'line'
  readonly start: Point
  readonly end: Point
  readonly nextIndex: number
}

interface QuadraticBezierCommandNode {
  readonly type: 'quadratic-bezier'
  readonly start: Point
  readonly end: Point
  readonly control: Point
  readonly nextIndex: number
}

interface CubicBezierCommandNode {
  readonly type: 'cubic-bezier'
  readonly start: Point
  readonly end: Point
  readonly control1: Point
  readonly control2: Point
  readonly nextIndex: number
}

type PathCommandNode = LineCommandNode | QuadraticBezierCommandNode | CubicBezierCommandNode

/*
 * ============================================================================
 * Store
 * ============================================================================
 */

const useGlyphCommandsStore = defineStore('glyph-commands', () => {
  const commands = shallowRef<PathCommandNode[]>([])

  function loadGlyphCommands(
    fontSource: MaybeRefOrGetter<Font | null>,
    glyphIdSource: MaybeRefOrGetter<number | null>,
  ) {
    const font = toValue(fontSource)
    const glyphId = toValue(glyphIdSource)

    const pathCommands = getGlyphCommands(font, glyphId)
    const filtered = pathCommands.filter((command) => command.type !== 'Z')
    const subpaths = toSubPaths(filtered)
    const closedSubPaths = closeSubpaths(subpaths)
    commands.value = buildCommandArray(closedSubPaths)
  }

  function clearLoadedGlyph(): void {
    commands.value = []
  }

  return {
    commands,
    loadGlyphCommands,
    clearLoadedGlyph,
  }
})

/*
 * ============================================================================
 * Helpers
 * ============================================================================
 */

function getGlyphCommands(font: Font | null, glyphId: number | null): PathCommand[] {
  if (!font || glyphId === null) {
    return []
  }

  const glyph = font.glyphs.get(glyphId)
  const path = glyph.getPath(0, 0, font.unitsPerEm)
  return path.commands
}

function toSubPaths(commands: PathCommand[]): PathCommand[][] {
  const result: PathCommand[][] = []
  let currentSubpath: PathCommand[] = []

  for (const cmd of commands) {
    if (cmd.type === 'M') {
      if (currentSubpath.length > 0) {
        result.push(currentSubpath)
      }
      currentSubpath = [cmd]
    } else {
      currentSubpath.push(cmd)
    }
  }

  if (currentSubpath.length > 0) {
    result.push(currentSubpath)
  }

  return result
}

function closeSubpaths(subpaths: PathCommand[][]): PathCommand[][] {
  const result: PathCommand[][] = []

  for (const subpath of subpaths) {
    // First command is M, which has the starting coordinate
    const mCommand = subpath[0]
    if (!mCommand || mCommand.type !== 'M') continue

    const startX = mCommand.x
    const startY = mCommand.y

    // Get commands after M
    const commandsAfterM = subpath.slice(1)
    if (commandsAfterM.length === 0) continue

    // Check if the last command ends at the start
    const lastCommand = commandsAfterM[commandsAfterM.length - 1]!
    const lastX = lastCommand.x
    const lastY = lastCommand.y

    // Add closing L command if needed
    if (lastX !== startX || lastY !== startY) {
      commandsAfterM.push({
        type: 'L',
        x: startX,
        y: startY,
      } as PathCommand)
    }

    result.push(commandsAfterM)
  }

  return result
}

function buildCommandArray(closedSubpaths: PathCommand[][]): PathCommandNode[] {
  const result: PathCommandNode[] = []
  let indexOffset = 0

  for (const subpath of closedSubpaths) {
    const subpathStartIndex = indexOffset
    let currentPos: Point = { x: 0, y: 0 }

    // Get starting position from first command's start (which is previous end or M position)
    // Since we removed M, we need to infer start from the previous command's end
    // For the first command in subpath, its start is the M coordinate
    // We'll track currentPos as we build

    for (let i = 0; i < subpath.length; i++) {
      const cmd = subpath[i]!
      const isLastInSubpath = i === subpath.length - 1

      // Determine nextIndex: normally next item, but last wraps to subpath start
      const nextIndex = isLastInSubpath ? subpathStartIndex : indexOffset + 1

      if (cmd.type === 'L') {
        // For the first command, we need to get start from M (but M is removed)
        // The start of first command should match the M coordinate
        // We infer it: first command's implied start comes from where we'd be after M
        // Since we pushed closing L that ends at M.x, M.y, we can trace back
        // Actually, we need to track start positions properly

        // Get start position - for first cmd it's the subpath start (M coord)
        // which equals the closing L's end position
        const start =
          i === 0
            ? { x: subpath[subpath.length - 1]!.x, y: subpath[subpath.length - 1]!.y }
            : { ...currentPos }

        result.push({
          type: 'line',
          start,
          end: { x: cmd.x, y: cmd.y },
          nextIndex,
        })
        currentPos = { x: cmd.x, y: cmd.y }
      } else if (cmd.type === 'C') {
        const start =
          i === 0
            ? { x: subpath[subpath.length - 1]!.x, y: subpath[subpath.length - 1]!.y }
            : { ...currentPos }

        result.push({
          type: 'cubic-bezier',
          start,
          end: { x: cmd.x, y: cmd.y },
          control1: { x: cmd.x1, y: cmd.y1 },
          control2: { x: cmd.x2, y: cmd.y2 },
          nextIndex,
        })
        currentPos = { x: cmd.x, y: cmd.y }
      } else if (cmd.type === 'Q') {
        const start =
          i === 0
            ? { x: subpath[subpath.length - 1]!.x, y: subpath[subpath.length - 1]!.y }
            : { ...currentPos }

        result.push({
          type: 'quadratic-bezier',
          start,
          end: { x: cmd.x, y: cmd.y },
          control: { x: cmd.x1, y: cmd.y1 },
          nextIndex,
        })
        currentPos = { x: cmd.x, y: cmd.y }
      }

      indexOffset++
    }
  }

  return result
}

/*
 * ============================================================================
 * Exports
 * ============================================================================
 */

export { type Point, type PathCommandNode as PathCommand, useGlyphCommandsStore }
