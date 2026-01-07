<script setup lang="ts">
import { ref } from 'vue'

import { Accordion } from '@/components/ui/accordion'

import StrokeItem from './StrokeItem.vue'
import AddStrokeButton from './AddStrokeButton.vue'
import { useStrokeListStore } from '../core'

const activeItem = ref('12321')

const strokeListStore = useStrokeListStore()
</script>

<template>
  <div class="space-y-2">
    <Accordion type="single" collapsible class="w-full space-y-2" v-model="activeItem">
      <StrokeItem
        v-for="(stroke, index) in strokeListStore.strokeList"
        :key="stroke.id"
        :index="index + 1"
        v-model="strokeListStore.strokeList[index]!"
        @delete-stroke="strokeListStore.deleteStroke(stroke.id)"
      />
    </Accordion>
    <AddStrokeButton @add-stroke="strokeListStore.addStroke()" />

    {{ activeItem }} {{ typeof activeItem }}
  </div>
</template>
