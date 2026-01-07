<script setup lang="ts">
import { AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { Button } from '@/components/ui/button'
import { Trash2Icon } from 'lucide-vue-next'

import { Field, FieldLabel, FieldGroup } from '@/components/ui/field'
import {
  NumberField,
  NumberFieldContent,
  NumberFieldDecrement,
  NumberFieldIncrement,
  NumberFieldInput,
} from '@/components/ui/number-field'
import { ButtonGroup, ButtonGroupText } from '@/components/ui/button-group'

defineEmits<{
  deleteBridge: []
}>()
</script>

<template>
  <AccordionItem value="item-2" class="bg-card relative rounded-lg border last:border-b">
    <AccordionTrigger class="flex-row-reverse px-4 hover:no-underline [&_span]:flex-1">
      <span>Bridge Item </span>
    </AccordionTrigger>
    <Button
      size="icon-sm"
      variant="destructive"
      class="absolute top-2.5 right-2.5"
      title="Delete Bridge"
      @click="$emit('deleteBridge')"
    >
      <Trash2Icon />
    </Button>
    <AccordionContent class="border-t p-0">
      <FieldGroup class="grid grid-cols-1 gap-4 p-4 sm:grid-cols-2">
        <Field>
          <FieldLabel for="1-command"> From Command </FieldLabel>
          <NumberField>
            <NumberFieldContent>
              <NumberFieldDecrement />
              <NumberFieldInput />
              <NumberFieldIncrement />
            </NumberFieldContent>
          </NumberField>
        </Field>

        <Field>
          <FieldLabel for="2-command"> To Command </FieldLabel>
          <NumberField>
            <NumberFieldContent>
              <NumberFieldDecrement />
              <NumberFieldInput />
              <NumberFieldIncrement />
            </NumberFieldContent>
          </NumberField>
        </Field>

        <FieldGroup class="grid grid-cols-1 gap-4 sm:col-span-full sm:grid-cols-2">
          <Field>
            <FieldLabel for="cp1-x">Control Point 1</FieldLabel>
            <ButtonGroup class="w-full gap-0!">
              <ButtonGroupText>X</ButtonGroupText>
              <NumberField class="flex-1">
                <NumberFieldContent>
                  <NumberFieldInput class="rounded-none border-r border-l-0" />
                </NumberFieldContent>
              </NumberField>
              <ButtonGroupText>Y</ButtonGroupText>
              <NumberField class="flex-1">
                <NumberFieldContent>
                  <NumberFieldInput class="rounded-l-none border-l-0" />
                </NumberFieldContent>
              </NumberField>
            </ButtonGroup>
          </Field>

          <Field>
            <FieldLabel for="cp2-x">Control Point 2</FieldLabel>
            <ButtonGroup class="w-full gap-0!">
              <ButtonGroupText>X</ButtonGroupText>
              <NumberField class="flex-1">
                <NumberFieldContent>
                  <NumberFieldInput class="rounded-none border-r border-l-0" />
                </NumberFieldContent>
              </NumberField>
              <ButtonGroupText>Y</ButtonGroupText>
              <NumberField class="flex-1">
                <NumberFieldContent>
                  <NumberFieldInput class="rounded-l-none border-l-0" />
                </NumberFieldContent>
              </NumberField>
            </ButtonGroup>
          </Field>
        </FieldGroup>
      </FieldGroup>
    </AccordionContent>
  </AccordionItem>
</template>
