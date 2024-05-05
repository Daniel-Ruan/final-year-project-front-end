<script lang='ts'>
// import { key } from '@milkdown/plugin-tooltip'
import mitt from 'mitt'
import { computed, reactive, ref } from 'vue'
type Alert = {
  title: '' | 'SUCCESS' | 'WARNING' | 'ERROR',
  body: string,
  keep: number
}
type Events = {
  'call-alert': Alert
}
export const alertEmitter = mitt<Events>()
</script>

<script setup lang="ts">
const alert = reactive({
  color: '',
  title: '',
  body: ''
})
const colorMap = {
  'SUCCESS': 'green',
  'WARNING': 'orange',
  'ERROR': 'red',
  '': 'blue'
}
const hidden = ref(true)
alertEmitter.on('call-alert', (newAlert) => {
  alert.title = newAlert.title
  alert.body = newAlert.body
  hidden.value = false
  alert.color = colorMap[newAlert.title]
  setTimeout(() => {
    hidden.value = true
  }, newAlert.keep)
})
const bgColor = computed(() => {
  return `bg-${alert.color}-100 border-${alert.color}-500 text-${alert.color}-700`
})
</script>

<template>
  <teleport to="body">
    <div class="fixed top-12 w-full z-20" :class="{ hidden: hidden }">
      <div
        class="border-t border-b px-4 py-3 mx-auto max-w-sm"
        :class="`${bgColor}`"
      >
        <p class="font-bold">{{ alert.title }}</p>
        <p class="text-sm">{{ alert.body }}</p>
      </div>
      <div class="bg-blue-100 border-blue-500 text-blue-700"></div>
      <div class="bg-green-100 border-green-500 text-green-700"></div>
      <div class="bg-orange-100 border-orange-500 text-orange-700"></div>
    </div>
  </teleport>
</template>

<style scoped>
</style>