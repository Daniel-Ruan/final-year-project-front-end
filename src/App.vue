<script setup lang="ts">
import { RouterView, RouterLink, useRouter } from "vue-router";
import axios from 'axios'
import { defineComponent, ref, computed , onMounted } from 'vue';
import { useBookStore } from './stores/useBookStore';
import { useQuestionStore } from './stores/useQuestionStore';
import { useUserStore } from './stores/useUserStore';
import { useLongTaskStore } from './stores/useLongTask';
import { useDailyTaskStore } from './stores/useDailyTask'
import { useQuestionDeckStore } from './stores/useQuestionDeckStore';
import Alert from './components/rawComponents/Alert.vue';
import { loadingEmitter } from './components/rawComponents/Loading.vue'
import Loading from './components/rawComponents/Loading.vue'
import ModalAbstract from './components/rawComponents/ModalBase.vue'


const userStore = useUserStore()
const bookStore = useBookStore()
const questionStore = useQuestionStore()
const longTaskStore = useLongTaskStore()
const dailyTaskStore = useDailyTaskStore()
const questionDeckStore = useQuestionDeckStore()


axios.interceptors.request.use((request) => {
  loadingEmitter.emit('switch-loading', true)
  return request
})
axios.interceptors.response.use((response) => {
  loadingEmitter.emit('switch-loading', false)
  return response
}, (error) => {
  loadingEmitter.emit('switch-loading', false)
  if (error.response.status === 401) {
    if (axios.defaults.headers.common["Authorization"]) {
      delete axios.defaults.headers.common["Authorization"]
    }
  }
  return Promise.reject(error)
})

onMounted(() => {
    userStore.recoverUser()
    bookStore.getBookList()
    questionStore.getQuestionList()
    longTaskStore.getLongTasks()
    dailyTaskStore.getDailyTasksList()
    questionDeckStore.getQuestionDeckList()
})
</script>

<template>
  <Alert />
  <Loading />
  <ModalAbstract />
  <RouterView></RouterView>
</template>
