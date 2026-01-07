import { defineStore } from 'pinia'
import { ref } from 'vue'

interface Point {
  x: number | null
  y: number | null
}

interface LineBridge {
  id: string
  fromCommandIndex: number | null
  toCommandIndex: number | null
}

interface CubicBridge {
  id: string
  fromCommandIndex: number | null
  toCommandIndex: number | null
  control1: Point
  control2: Point
}

type Bridge = LineBridge | CubicBridge

interface Stroke {
  id: string
  startingCommandIndex: number | null
  bridges: Bridge[]
}

const useStrokeListStore = defineStore('stroke-list', () => {
  const strokeList = ref<Stroke[]>([])
  const activeStroke = ref<Stroke['id'] | null>(null)

  function addStroke() {
    strokeList.value.push({
      id: crypto.randomUUID(),
      startingCommandIndex: null,
      bridges: [],
    })
  }

  function deleteStroke(id: string) {
    strokeList.value = strokeList.value.filter((stroke) => stroke.id !== id)
    

  }

  return { strokeList, activeStroke, addStroke, deleteStroke }
})

export { type Stroke, useStrokeListStore }
