<script setup lang="ts">
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { Plus } from 'lucide-vue-next'

defineEmits<{
  addBridge: []
}>()
</script>

<template>
  <div class="relative flex h-9 items-center justify-center">
    <Separator class="absolute" />
    <span class="bg-card absolute">
      <Button variant="ghost" @click="$emit('addBridge')"> <Plus /> Add Bridge </Button>
    </span>
  </div>
</template>
