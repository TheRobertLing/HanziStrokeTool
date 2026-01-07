import { parse, type Font } from 'opentype.js'
import { defineStore } from 'pinia'
import { shallowRef } from 'vue'

class InvalidFontFileError extends Error {
  constructor(fileName: string, allowedExtensions: readonly string[]) {
    const extStr = allowedExtensions.join(', ')
    super(`The file "${fileName}" is not supported. Please use: ${extStr}`)
    this.name = 'InvalidFontFileError'
  }
}

const ALLOWED_FILE_TYPES = ['.ttf', '.otf', '.woff'] as const

function isValidFontExtension(fileName: string): boolean {
  const name = fileName.toLowerCase()
  return ALLOWED_FILE_TYPES.some((ext) => name.endsWith(ext))
}

async function parseFileToFont(file: File): Promise<Font> {
  const buffer = await file.arrayBuffer()
  return parse(buffer)
}

const useFontStore = defineStore('font-store', () => {
  const font = shallowRef<Font | null>(null)

  async function loadFontFromFile(file: File): Promise<void> {
    if (!isValidFontExtension(file.name)) {
      throw new InvalidFontFileError(file.name, ALLOWED_FILE_TYPES)
    }

    font.value = await parseFileToFont(file)
  }

  return { font, loadFontFromFile }
})

export { type Font, ALLOWED_FILE_TYPES, useFontStore }
