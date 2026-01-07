<script setup lang="ts">
import { Accordion } from '@/components/ui/accordion'

import BridgeItem from './BridgeItem.vue'
import { useStrokeBridge } from '../core'
import AddBridgeButton from './AddBridgeButton.vue'
import { toast } from 'vue-sonner'

const { addBridge, deleteBridge } = useStrokeBridge()
</script>

<template>
  <div class="space-y-2">
    <Accordion type="single" collapsible class="w-full">
      <BridgeItem @delete-bridge="toast('deletebridge')" />
    </Accordion>
    <AddBridgeButton />
  </div>
</template>
