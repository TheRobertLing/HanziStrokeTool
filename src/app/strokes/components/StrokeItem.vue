<script setup lang="ts">
import { Trash2Icon } from 'lucide-vue-next'
import { AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { Button } from '@/components/ui/button'
import { Field, FieldLabel } from '@/components/ui/field'
import {
  NumberField,
  NumberFieldContent,
  NumberFieldDecrement,
  NumberFieldIncrement,
  NumberFieldInput,
} from '@/components/ui/number-field'
import BridgeList from './BridgeList.vue'
import type { Stroke } from '../core/useStrokeListStore'

defineProps<{
  index: number
}>()

defineEmits<{
  deleteStroke: []
}>()

const stroke = defineModel<Stroke>({ required: true })
</script>

<template>
  <AccordionItem :value="stroke.id" class="bg-card relative rounded-lg border last:border-b">
    <AccordionTrigger class="flex-row-reverse px-4 hover:no-underline [&_span]:flex-1">
      <span>Stroke {{ index }}</span>
    </AccordionTrigger>
    <Button
      size="icon-sm"
      variant="destructive"
      class="absolute top-2.5 right-2.5"
      title="Delete Stroke"
      @click="$emit('deleteStroke')"
    >
      <Trash2Icon />
    </Button>

    <AccordionContent class="space-y-2 border-t p-0">
      <Field class="p-4">
        <FieldLabel for="starting-command"> Starting Command </FieldLabel>
        <NumberField id="starting-command" :min="1" :max="10">
          <NumberFieldContent>
            <NumberFieldDecrement />
            <NumberFieldInput />
            <NumberFieldIncrement />
          </NumberFieldContent>
        </NumberField>
      </Field>
      <Field class="p-4">
        <FieldLabel> Bridge List </FieldLabel>
        <BridgeList />
      </Field>
    </AccordionContent>
  </AccordionItem>
</template>
