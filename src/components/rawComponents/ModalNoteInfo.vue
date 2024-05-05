<script setup lang='ts'>
import { useUserStore } from '@/stores/useUserStore'
const userStore = useUserStore()
</script>

<template>
  <div class="flex justify-between items-center p-5 rounded-t border-b border-stone-400">
    <h3 class="text-xl font-medium text-white">Note Info</h3>
      <svg
        class="w-5 h-5"
        fill="currentColor"
        viewBox="0 0 20 20"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fill-rule="evenodd"
          d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
          clip-rule="evenodd"
        />
      </svg>
  </div>
  <div class="p-6 space-y-4">
  </div>
</template>

<style scoped>
.QRArea img {
  @apply h-full w-full;
}
</style>