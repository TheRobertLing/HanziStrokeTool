<script setup lang="ts">
import type { AccordionTriggerProps } from 'reka-ui'
import type { HTMLAttributes } from 'vue'
import { reactiveOmit } from '@vueuse/core'
import { ChevronDown } from 'lucide-vue-next'
import { AccordionHeader, AccordionTrigger } from 'reka-ui'
import { cn } from '@/lib/utils'

const props = defineProps<
  AccordionTriggerProps & {
    class?: HTMLAttributes['class']
    iconClass?: HTMLAttributes['class']
    actionsClass?: HTMLAttributes['class']
  }
>()

const delegatedProps = reactiveOmit(props, 'class', 'iconClass', 'actionsClass')
</script>

<template>
  <AccordionHeader class="relative flex items-center">
    <AccordionTrigger
      data-slot="accordion-trigger"
      v-bind="delegatedProps"
      :class="
        cn(
          'focus-visible:border-ring focus-visible:ring-ring/50 flex flex-1 items-center justify-start gap-4 rounded-md py-4 pr-10 text-left text-sm font-medium transition-all outline-none hover:underline focus-visible:ring-[3px] disabled:pointer-events-none disabled:opacity-50 [&[data-state=open]>svg]:rotate-0',
          props.class,
        )
      "
    >
      <slot name="icon">
        <ChevronDown
          :class="
            cn(
              'text-muted-foreground pointer-events-none size-4 shrink-0 transition-transform duration-200 -rotate-90',
              props.iconClass,
            )
          "
        />
      </slot>
      <span class="truncate">
        <slot />
      </span>
    </AccordionTrigger>
    <div :class="cn('absolute right-0 flex items-center', props.actionsClass)">
      <slot name="actions" />
    </div>
  </AccordionHeader>
</template>
