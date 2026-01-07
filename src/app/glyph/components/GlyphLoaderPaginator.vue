<script setup lang="ts">
import {
  NumberField,
  NumberFieldContent,
  NumberFieldDecrement,
  NumberFieldIncrement,
  NumberFieldInput,
} from '@/components/ui/number-field'
import { ChevronLeft, ChevronRight } from 'lucide-vue-next';

defineProps<{
  totalPages: number
}>()

const currentPage = defineModel<number>({ required: true })
</script>

<template>
  <NumberField
    :min="1"
    :max="totalPages"
    :model-value="currentPage"
    @update:model-value="
      (val) => {
        if (!val) return
        currentPage = val
      }
    "
  >
    <NumberFieldContent>
      <NumberFieldDecrement title="Previous Page">
        <ChevronLeft class="size-4"/>
      </NumberFieldDecrement>
      <NumberFieldInput />
      <NumberFieldIncrement title="Next Page">
        <ChevronRight class="size-4" />
      </NumberFieldIncrement>
    </NumberFieldContent>
  </NumberField>
</template>
