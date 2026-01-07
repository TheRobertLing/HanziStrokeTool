<script setup lang="ts">
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Info } from 'lucide-vue-next'
</script>

<template>
  <Dialog>
    <DialogTrigger as-child>
      <Button variant="ghost" size="icon"> <Info /> </Button>
    </DialogTrigger>

    <DialogContent>
      <DialogHeader>
        <DialogTitle> Tutorial </DialogTitle>
        <DialogDescription> Stubbed for tutorial </DialogDescription>
      </DialogHeader>


    </DialogContent>
  </Dialog>
</template>
