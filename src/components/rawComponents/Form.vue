<script lang="ts">
interface InputBox {
    title: string,
    getContent: () => string,
    getError: () => string
}
import mitt from 'mitt'

export const formEmitter = mitt<{
  'new-input-creation': InputBox
}>()
</script>

<script setup lang='ts'>
import { ref, computed } from 'vue';
import { useRouter, useRoute } from 'vue-router'
export type FormValidationFunc = (inputBoxes: Map<string, InputBox>) => Promise<string>
const router = useRouter()
const route = useRoute()
const currentUrl = computed(() => {
    return route.fullPath
})
let props = defineProps<{
    formValidation: FormValidationFunc
}>()

const FormError = ref('')

const inputBoxes: Map<string, InputBox> = new Map()

const onNewInputCreation = (inputBox: InputBox): void => {
    inputBoxes.set(inputBox.title, inputBox)
}

formEmitter.on('new-input-creation', onNewInputCreation)

const submit = async () => {
    let perBoxValidation: boolean = true
    for (const box of inputBoxes.values()) {
        if (box.getError().length != 0) {
            perBoxValidation = false
            break
        }
    }
    if (perBoxValidation) {
        FormError.value = await props.formValidation(inputBoxes)
    }
}
</script>

<template>
    <div class="mt-16 lg:p-8 p-4 border-2 shadow-md rounded-md mx-auto ">
      <div>
        <h2 class="text-2xl  font-bold text-center mb-5">
          <slot name="title"></slot>
        </h2>
        <div
          :class="{hidden: FormError == ''}"
          class="bg-stone-100 border border-stone-300 h-fit px-4 py-2  text-center"
        >{{ FormError }}</div>
        <slot name="input"></slot>
      </div>
      <slot name="default">
        <a
          class="block my-2 px-4 py-3 text-xl text-center bg-stone-900/50 font-bold rounded-md hover:bg-stone-700/80 hover:shadow-xl focus:outline-none"
          href="#"
          @click.prevent="submit"
        >Submit</a>
      </slot>
      <router-link v-if="currentUrl == '/sign-in'"
      to="/sign-up"
      class="block w-fit mx-auto my-3 text-lg font-bold cursor-pointer"
    >No Account? Sign up</router-link>
      <router-link v-else
        to="/sign-in"
        class="block w-fit mx-auto my-3 text-lg font-bold cursor-pointer"
      > Already have Account? Sign in</router-link>
    </div>

  </template>
  <style scoped>
  </style>