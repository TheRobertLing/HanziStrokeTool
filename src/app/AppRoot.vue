<script setup lang="ts">
import 'vue-sonner/style.css'
import { Toaster } from '@/components/ui/sonner'
import {
  HeaderLogo,
  HeaderTitle,
  HeaderHelp,
  HeaderGithubLink,
  HeaderThemeToggle,
} from '@/app/header/components'
import { FontLoaderButton } from './font'
import { GlyphLoaderDialog } from './glyph'
import { StrokeList } from './strokes'
</script>

<template>
  <div class="flex h-svh min-w-80 flex-col">
    <header class="flex justify-between border-b p-2">
      <div class="flex items-center gap-2">
        <HeaderLogo />
        <HeaderTitle class="hidden sm:inline" />
      </div>
      <div class="flex items-center gap-1">
        <HeaderHelp />
        <HeaderGithubLink />
        <HeaderThemeToggle />
      </div>
    </header>

    <main class="flex min-h-0 flex-1 flex-col md:flex-row">
      <section class="flex-1/3 border-b md:flex-1 md:border-r md:border-b-0">
        This is where the visualiser goes
      </section>
      <div class="flex min-h-0 flex-2/3 flex-col md:flex-1">
        <section class="flex items-center border-b p-2">
          <FontLoaderButton />
          <GlyphLoaderDialog />
        </section>
        <section class="min-h-0 flex-1 overflow-y-scroll p-2">
          <StrokeList />
        </section>
      </div>
    </main>
  </div>

  <Toaster richColors />
</template>
