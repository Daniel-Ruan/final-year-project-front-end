<script setup lang="ts">

import { computed, onMounted, onUpdated, ref, watch } from 'vue';
import {
  mdiGithub,
  mdiBookOpenPageVariantOutline,
} from "@mdi/js";
import SectionMain from "../components/SectionMain.vue";
import BaseButton from "../components/BaseButton.vue";
import LayoutAuthenticated from "../layouts/LayoutAuthenticated.vue";
import SectionTitleLineWithButton from "../components/SectionTitleLineWithButton.vue";
import CardBoxBookList from "../components/CardBoxBookList.vue";
import SectionTitle from "../components/SectionTitle.vue";

import { useRouterStore } from '../stores/useRouterStore'
import { useLongTaskStore } from '../stores/useLongTask'
import { useDailyTaskStore } from '../stores/useDailyTask'
import { useQuestionStore } from '../stores/useQuestionStore';
import { useRoute, onBeforeRouteUpdate } from 'vue-router'
import { useUserStore } from '../stores/useUserStore';
import { useRouter } from 'vue-router'
import QuestionCoverSmall from '../components/rawComponents/QuestionCoverSmall.vue';
import PaginationComponent from "../components/rawComponents/PaginationComponent.vue";


import type { Ref } from 'vue'
import router1 from '../router';

const router = useRouter()
const routerStore = useRouterStore()
const route = useRoute()

const userStore = useUserStore()
const longTaskStore = useLongTaskStore()
const dailyTaskStore = useDailyTaskStore()
const questionStore = useQuestionStore()

questionStore.clearCurrentQuestion()

let currentPage  = ref(1)
let itemsPerPage  = ref(6);
let times = ref(1);

onMounted(async () => {
    dailyTaskStore.getDailyTask(parseInt(route.params.id as string))

})

const currentDailyTask = computed(() => {
    return dailyTaskStore.currentDailyTask
})

const question_group = computed(() => {
    return currentDailyTask.value.questions_set
})

const question_groupArr = computed(() => {
    const question_set: number[] = []
    question_group.value.match(/\d+(\.\d+)?/g)?.forEach(item => {
        question_set.push(+item)
    })
    return question_set
})

const question_list = computed(() => {
    return questionStore.getQuestionsByIDs(question_groupArr.value)
})

const question_list2  = computed(() => {
    questionStore.getdailyTaskQuestionList(question_groupArr.value)
    return questionStore.dailyTaskQuestionList
})

const numberOfPages = computed(() =>
  Math.ceil((question_list2.value.length || 0) / itemsPerPage.value)
);

const questionDailyList = computed (() => {
    return questionStore.getQuestionDailyListSlice((currentPage.value * itemsPerPage.value - (itemsPerPage.value)), itemsPerPage.value)
})

const CategoryQuestionList = computed(() => {
    return questionStore.getQuestionListByCategory("plant")
})

const sortCategory = computed(() => {
    return questionStore.sortCategoryNumber(question_list2.value)
})
//getNewQuestionListByCategoryArr
const NewQuestionListByCategoryArr = computed(() => {
    return questionStore.getNewQuestionListByCategoryArr(question_list2.value, sortCategory.value)
})

function loadMore() {
  times.value += 1
}


</script>

<template>

    <LayoutAuthenticated>
        <SectionTitle>{{currentDailyTask.DailyTaskName}}</SectionTitle>
        <!-- <SectionTitle>Exercise Question List</SectionTitle> -->
            <SectionMain>
                <div class="hidden">    <div v-for="question in NewQuestionListByCategoryArr">
        <div>{{ question.q_category }}</div>
    </div>
    <!-- <div>{{ NewQuestionListByCategoryArr }}</div> -->
    <div>sortCategory: {{ sortCategory }}</div>
    <!-- <div>CategoryQuestionList: {{ CategoryQuestionList }}</div> -->
    <div v-for="question in CategoryQuestionList">
        <div>{{ question.q_id }}</div>
    
    </div>
    <div v-for="question in question_list2">
        <div>{{ question.q_question }}</div>
    
    </div>
</div>
                <!-- <div class="md:w-full shadow-2xl md:mx-auto rounded-3xl border-8 border-white overflow-hidden">  -->


                    
                    <div class="grid grid-cols-2 w-fit mx-auto">
                        <QuestionCoverSmall
                            v-for="question in questionDailyList"
                            :id="question.q_id"
                            :question="question.q_question"
                            :a="question.q_a"
                            :b="question.q_b"
                            :c="question.q_c"
                            :d="question.q_d"
                            :true_answer="question.q_true_answer"
                            :state="question.KeyWord"
                            :category="question.q_category"
                            :img="question.q_cover"
                            :set="question.q_selection_set"
                        />
                    </div>
                    <div class="flex justify-center mt-5 pb-5">

                        <!-- <button
                            @click="loadMore"
                            class="md:hidden h-12 flex items-center justify-center uppercase font-semibold px-8 border border-rose-600 hover:bg-rose-600 hover:text-white transition duration-500 ease-in-out text-rose-600"
                        >LOAD MORE</button> -->

                        <div class="block">

                        <pagination-component
                            class="pagination-component"
                            v-model="currentPage"
                            :numberOfPages="numberOfPages"
                        />

                        </div>
                    </div>
                <!-- </div> -->
                    <div class="hidden">
                        <div v-for="question in NewQuestionListByCategoryArr">
                            <div>{{ question.q_category }}</div>
                        </div>
                  
                        <div>sortCategory: {{ sortCategory }}</div>
                 
                        <div v-for="question in CategoryQuestionList">
                            <div>{{ question.q_id }}</div>
                        </div>
                        <div v-for="question in question_list2">
                            <div>{{ question.q_question }}</div>
                        </div>
                        <div>{{ NewQuestionListByCategoryArr }}</div> -->
                        <div>CategoryQuestionList: {{ CategoryQuestionList }}</div>
                    </div>
            </SectionMain>
        </LayoutAuthenticated>
</template>