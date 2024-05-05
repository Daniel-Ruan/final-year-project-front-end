<script setup lang="ts">

import { computed, onMounted, onUpdated, ref, watch, triggerRef } from 'vue';
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

import { useQuestionStore } from '../stores/useQuestionStore';
import { useUserStore } from '../stores/useUserStore';
import { useRouterStore } from '../stores/useRouterStore'
import { useDailyTaskStore } from '../stores/useDailyTask'
import { useLongTaskStore } from '../stores/useLongTask'
import { useQuestionDeckStore } from '../stores/useQuestionDeckStore';
import { usePracticeRecordStore } from '../stores/usePracticeRecord'
import { useRoute, onBeforeRouteUpdate } from 'vue-router'
import { alertEmitter } from '../components/rawComponents/Alert.vue';
import { modalEmitter } from '../components/rawComponents/ModalBase.vue';
import router1 from '../router';
import type { Ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const routerStore = useRouterStore()

const route = useRoute()

const longTaskStore = useLongTaskStore()
const dailyTaskStore = useDailyTaskStore()
const questionStore = useQuestionStore()
const userStore = useUserStore()
const practiceRecordStore = usePracticeRecordStore()
const questionDeckStore = useQuestionDeckStore()

const dailyGoalNumber: Ref<number> = ref(10)




    const planned_time: Ref<Date> = ref(new Date())

const dateformater = computed(() => {
    const detaformat = planned_time.value.toLocaleDateString().replace(new RegExp('/', 'g'), '-')

    const detaformat2 = formatDate(detaformat)

    return detaformat2
})

const DailyTaskName: Ref<string> = ref(`${dateformater.value} Extra Practice`)


const correctAnswer= computed(() => {
    return dailyTaskStore.trueAnswerNumber
})
const wrongAnswer= computed(() => {
    return dailyTaskStore.falseAnswerNumber
})

const currentDailyTask = computed(() => {
    return dailyTaskStore.currentDailyTask

})

const currentLongTaskID = computed(() => {
    return currentDailyTask.value.Longtask
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

const question_list2  = computed(() => {
    questionStore.getdailyTaskQuestionList(question_groupArr.value)
    return questionStore.dailyTaskQuestionList
})

const QuestionListStatus0 = computed(() => {
    return questionDeckStore.getQuestionListByQuestionDeckStatus(0)
})

const QuestionListStatus1 = computed(() => {
    return questionDeckStore.getQuestionListByQuestionDeckStatus(1)
})

const QuestionListStatus2 = computed(() => {
    return questionDeckStore.getQuestionListByQuestionDeckStatus(2)
})

const QuestionListStatus3 = computed(() => {
    return questionDeckStore.getQuestionListByQuestionDeckStatus(3)
})

const QuestionListStatus4 = computed(() => {
    return questionDeckStore.getQuestionListByQuestionDeckStatus(4)
})

const QuestionListStatus5 = computed(() => {
    return questionDeckStore.getQuestionListByQuestionDeckStatus(5)
})

const getTaskPrograss = computed(() => {
    return longTaskStore.getTaskProgress(QuestionListStatus0.value, QuestionListStatus1.value, QuestionListStatus2.value, QuestionListStatus3.value, QuestionListStatus4.value, QuestionListStatus5.value)
})

const QuestionListStatus12345 = computed(() => {
    return QuestionListStatus1.value.concat(QuestionListStatus2.value).concat(QuestionListStatus3.value)
    .concat(QuestionListStatus4.value).concat(QuestionListStatus5.value)
})

const sortCategory = computed(() => {
    return questionStore.sortCategoryNumber(question_list2.value)
})

const QuestionListStatus0Object = computed(() => {
    return questionStore.getQuestionsByIDs(QuestionListStatus0.value)

})

const NewQuestionListByCategoryArr = computed(() => {
    return questionStore.getNewQuestionListByCategoryArr(QuestionListStatus0Object.value, sortCategory.value)
})

const NewQuestionListByCategoryArray = computed(() => {
    return questionStore.getQuestionListArr(NewQuestionListByCategoryArr.value)
})

const RemainQuestionListStatus0Object = computed(() => {

    return questionStore.differentLsitElement(QuestionListStatus0.value, NewQuestionListByCategoryArray.value)

})
//QuestionListStatus0
//QuestionListStatus12345
const RemainQuestionListStatus12345Object = computed(() => {
    return questionStore.sellectPartofQuestionListArr(QuestionListStatus12345.value, dailyGoalNumber.value-QuestionListStatus0.value.length)
})

//dailyGoalNumber
const RandomRemainQuestionListStatus0Object = computed(() => {
    return longTaskStore.getRandomQuestionNew(RemainQuestionListStatus0Object.value, dailyGoalNumber.value-NewQuestionListByCategoryArray.value.length)
})

const GenerateNewCategoryQuestionList = computed(() => {
    if(NewQuestionListByCategoryArray.value.length < dailyGoalNumber.value) {

        if(QuestionListStatus0.value.length >= dailyGoalNumber.value) {
            return NewQuestionListByCategoryArray.value.concat(RandomRemainQuestionListStatus0Object.value)
        }else {
            return NewQuestionListByCategoryArray.value.concat(RandomRemainQuestionListStatus0Object.value).concat(questionStore.sellectPartofQuestionListArr(QuestionListStatus12345.value, dailyGoalNumber.value-QuestionListStatus0.value.length))
        }
    }else{

        return questionStore.sellectPartofQuestionListArr(NewQuestionListByCategoryArray.value, dailyGoalNumber.value)

    }
})

const accuracyRate = computed(() => {
    return Math.round((correctAnswer.value / (wrongAnswer.value + correctAnswer.value)) * 100)
}) 


const createDailyTask = async () => {
    if(userStore.id == -1) {
        routerStore.setNextRoute(route.path)
        router1.push('/sign-in')
        return
    }

    modalEmitter.emit('call-confirm-modal', {
        title: 'Attention',
        message: 'Do you really want to learn more relative knowledge?',
        onModalConfirm: async() => {

            const info1 = await longTaskStore.updateLongTaskTaskPrograss(currentLongTaskID.value, getTaskPrograss.value)
            const info2 = await dailyTaskStore.updateDailyTaskState(currentDailyTask.value.id, accuracyRate.value)
            const info3 = await dailyTaskStore.postDailyTask(longTaskStore.currentLongTask.id, DailyTaskName.value, dateformater.value, dailyGoalNumber.value, GenerateNewCategoryQuestionList.value.toString())

            if (info1 == 'ok' && info3 == 'ok' && info2 == 'ok') {
                alertEmitter.emit('call-alert', {
                    title: 'SUCCESS',
                    body: 'A new dailyTask already created',
                    keep: 1500
                })
                dailyTaskStore.getDailyTasksList()
                dailyTaskStore.removeRecord()
                router.push({ path: `/longTasks/${longTaskStore.currentLongTask.id}`})
            }

        }
    })

    

}

const updateLongTaskPrograss = async () => {
    if(userStore.id == -1) {
        routerStore.setNextRoute(route.path)
        router1.push('/sign-in')
        return
    }
    const info1 = await longTaskStore.updateLongTaskTaskPrograss(currentLongTaskID.value, getTaskPrograss.value)
    const info2 = await dailyTaskStore.updateDailyTaskState(currentDailyTask.value.id, accuracyRate.value)

    if (info1 == 'ok' && info2 == 'ok') {
        alertEmitter.emit('call-alert', {
            title: 'SUCCESS',
            body: 'rusult already uploaded',
            keep: 2000
        }),
        dailyTaskStore.removeRecord()
        await router.push({ path: `/profile`})
    } 
}



//getTaskPrograss



function formatDate(str: string) {
    return str.split("-").map((item) => {
        if (+item < 10) {
            return "0" + +item;
        }
        return item;
    })
    .join("-");
}






</script>


<template>
    <LayoutAuthenticated>
        <SectionTitle>Exercise Result</SectionTitle>
        <SectionMain>
            
            <div class="hidden">
                <div>accuracyRate {{ accuracyRate }}</div>
                <div>getTaskPrograss {{ getTaskPrograss }}</div>
                <div>DailyTaskName {{ DailyTaskName }}</div>
    <div>QuestionListStatus12345{{ QuestionListStatus12345 }}</div>
    <div>GenerateNewCategoryQuestionList{{ GenerateNewCategoryQuestionList }}</div>
    <div>RemainQuestionListStatus0Object{{ RemainQuestionListStatus0Object }}</div>
    <div>sortCategory{{ sortCategory }}</div>
    <div v-for="question in NewQuestionListByCategoryArr">
        <div>{{ question.q_id }}</div>
        <div>{{ question.q_category }}</div>
    
    </div>
    <!-- <div>question_list2{{ question_list2 }}</div> -->
    <div> 0 {{ QuestionListStatus0 }}</div>
    <div> 1 {{ QuestionListStatus1 }}</div>
    <div> 2 {{ QuestionListStatus2 }}</div>
            </div>

            <div class="antialiased">
                <div class="flex w-full justify-center items-center" id="app">
                    <div class="w-full max-w-xl">
                        <h1 class="font-bold text-5xl text-center text-indigo-700 dark:text-indigo-400">
                            {{ currentDailyTask.planned_time }} Exercise
                        </h1>
                        <div>
                            <h2 class="font-bold text-4xl pt-6">Results:</h2>
                            <div class="flex justify-start space-x-4 mt-6">
                                <p class="text-2xl">
                                    Correct Answers:
                                    <span class="text-3xl text-green-600 dark:text-green-300 font-bold"
                                        >{{ correctAnswer }}</span
                                    >
                                </p>
                                <p class="text-2xl">
                                    Wrong Answers:
                                    <span class="text-3xl text-red-600 dark:text-red-300 font-bold"
                                        >{{ wrongAnswer }}</span
                                    >
                                </p>
                            </div>
                            <div class="mt-6 flow-root">
                                <button
                                    class="float-right px-5 py-2 bg-indigo-600 dark:bg-indigo-500 text-white text-sm font-bold tracking-wide rounded-full"
                                    @click="updateLongTaskPrograss"
                                >
                                    Upload Result    
                                </button>
                            </div>
                            <div class="mt-6 flow-root">
                                <button
                                    class="float-right px-5 py-2 bg-indigo-600 dark:bg-indigo-500 text-white text-sm font-bold tracking-wide rounded-full"
                                    @click="createDailyTask"
                                >
                                    Learn more
                                    
                                </button>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </SectionMain>
    </LayoutAuthenticated>

</template>