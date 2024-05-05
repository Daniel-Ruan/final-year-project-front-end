<script setup lang="ts">
import { useRouter } from 'vue-router'
const router = useRouter()

const openQuestion = async () => {
    router.push(`/questions/${props.id}`)
}

let props = defineProps<{
    id: number,
    question: string,
    a: string,
    b: string,
    c: string,
    d: string,
    true_answer: string,
    state: string,
    category: string,
    img: string,
    set: string[]
}>()

</script>
<template>
  <div @click="openQuestion" class="max-w-sm m-1 dark:bg-slate-700 rounded-xl my-2 shadow-lg overflow-hidden">
    <div class="flex p-3 space-x-2">
      <img
        class="h-1/2 w-1/2 mx-auto object-cover"
        :src="'http://localhost:1337' + props.img"
      />
      <div class="w-1/2 space-y-2">
        <div
          class="block text-lg leading-tight font-bold  hover:underline">
          Question {{ props.id }}
        </div>
        <p class="font-bold text-lg "><span class=" uppercase text-sm leading-norma">category:</span> 
            <span class="
            bg-gradient-to-r from-yellow-100 to-yellow-300
            bg-no-repeat [background-position:0_88%]
            [background-size:100%_0.2em]
            motion-safe:transition-all motion-safe:duration-200
            hover:[background-size:100%_100%]
            focus:[background-size:100%_100%]
            font-extrabold">{{ props.category }}</span></p>
        <div class="px-0 pt-1 pb-0">
          <span
            class="inline-block bg-yellow-200 text-yellow-600 rounded-full px-3 py-1 text-sm font-semibold mr-2 mb-2"
            >{{ props.state }}</span
          >
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>