<script lang='ts'>
export default {
  inheritAttrs: false
}
</script>

<script setup lang='ts'>
import { ref } from 'vue'
import useTextValidation, { TextType } from '@/hooks/useTextValidation'
import { formEmitter } from './Form.vue'

const props = defineProps<{
    title: string,
    type: TextType,
}>()

const content = ref('')
const error = ref('')

const handler = () => {
  error.value = useTextValidation(content.value, props.type)
}

const getContent = () => {
  return content.value
}

const getError = () => {
  handler()
  return error.value
}

formEmitter.emit('new-input-creation', {
  title: props.title,
  getContent: getContent,
  getError: getError
})

</script>

<template>
    <div class="mb-4 mt-2">
      <label class="block  text-sm font-bold mb-2">{{ props.title }}</label>
      <input
        class="appearance-none border-2 rounded w-full py-2 px-3  bg-transparent leading-tight focus:outline-none focus:border-stone-400"
        v-model="content"
        @blur="handler"
        :type="props.type.toLowerCase()"
        v-bind="$attrs"
      />
      <p class=" text-sm" :class="{ 'hidden': !error.length }">{{ error }}</p>
    </div>
  </template>
  
  <style scoped>
  </style>
  