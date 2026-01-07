<script setup lang="ts">
import { Search } from 'lucide-vue-next'
import { InputGroup, InputGroupAddon, InputGroupInput } from '@/components/ui/input-group'

const search = defineModel<string>({ required: true })
</script>

<template>
  <InputGroup>
    <InputGroupAddon align="inline-start">
      <Search />
    </InputGroupAddon>
    <InputGroupInput
      placeholder="Search for glyph"
      class="h-auto placeholder:text-sm placeholder:font-medium"
      v-model="search"
    />
  </InputGroup>
</template>
