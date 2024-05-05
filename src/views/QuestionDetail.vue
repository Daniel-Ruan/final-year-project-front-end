<script setup lang="ts">
import { computed, onMounted, onUpdated, ref, watch, triggerRef } from 'vue';
import { useQuestionStore } from '../stores/useQuestionStore';
import { useUserStore } from '../stores/useUserStore';
import { useRouterStore } from '../stores/useRouterStore'
import { useLongTaskStore } from '../stores/useLongTask'
import { useDailyTaskStore } from '../stores/useDailyTask'
import { useQuestionDeckStore } from '../stores/useQuestionDeckStore';
import { usePracticeRecordStore } from '../stores/usePracticeRecord'
import { useRoute, onBeforeRouteUpdate } from 'vue-router'
import { alertEmitter } from '../components/rawComponents/Alert.vue';
import type { Ref } from 'vue'
import { useRouter } from 'vue-router'


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


const router = useRouter()

const routerStore = useRouterStore()

const route = useRoute()

// onBeforeRouteUpdate(async () => {
//     router.push({ path: `/questions/${nextQuestion.value}`})
//     questionStore.getQuestion(parseInt(route.params.id as string))
// })

const longTaskStore = useLongTaskStore()
const dailyTaskStore = useDailyTaskStore()
const questionStore = useQuestionStore()
const userStore = useUserStore()
const practiceRecordStore = usePracticeRecordStore()
const questionDeckStore = useQuestionDeckStore()


const judgeDate = computed(() => {
    return currentLongTaskUpdateTime.value == update_timedateformater.value
})

const judgeLastQuestion = computed(() => {
    return questionStore.judgeLastQuestion(parseInt(route.params.id as string))
})

const write_time: Ref<Date> = ref(new Date())

const write_timedateformater = computed(() => {
    const detaformat3 = write_time.value.toLocaleDateString().replace(new RegExp('/', 'g'), '-')

    const detaformat4 = formatDate(detaformat3)
    
    return detaformat4
})

const update_time: Ref<Date> = ref(new Date())

const update_timedateformater = computed(() => {
    const detaformat5 = update_time.value.toLocaleDateString().replace(new RegExp('/', 'g'), '-')

    const detaformat6 = formatDate(detaformat5)
    
    return detaformat6
})


const currentQuestion = computed(() => {
    return questionStore.currentQuestion
})

const currentQuestionID = computed(() => {
    return currentQuestion.value.q_id
})

const currentSelectQuestion = computed(() => {
    return questionStore.selectAnswer
})

watch(currentSelectQuestion, () => {
    console.log(500, currentSelectQuestion.value == questionStore.currentQuestion.q_true_answer)
    //judgeQuestionStatus
    

})

const currentQuestionDeckID = computed(() => {
    return questionDeckStore.getQuestionDeckIDByQuestionID(parseInt(route.params.id as string))
})

const currentQuestionDeckRepeatCounter = computed(() => {
    return questionDeckStore.getQuestionDeckIDByQuestionRepeatCounter(parseInt(route.params.id as string))
})

const judgeQuestionStatus = computed(() => {
    return currentSelectQuestion.value == questionStore.currentQuestion.q_true_answer
})

const getcurrentQuestionDeck = computed(() => {
    return questionDeckStore.getQuestionDeckByQuestionID(parseInt(route.params.id as string))
})


const selectQuestionDeckStatus = computed(() => {
    return questionDeckStore.judgeQuestionDeckStatus(judgeQuestionStatus.value, getcurrentQuestionDeck.value)
})


const currentDailyTask = computed(() => {
    return dailyTaskStore.currentDailyTask

})

const currentDailyTaskID = computed(() => {
    return currentDailyTask.value.id
})

const currentDailyTaskTrueNumber = computed(() => {
    return dailyTaskStore.trueAnswerNumber
})

const currentDailyTaskFalseNumber = computed(() => {
    return dailyTaskStore.falseAnswerNumber
})


const currentLongTaskID = computed(() => {
    return currentDailyTask.value.Longtask
})

// watch(currentLongTaskID, () => {
//     longTaskStore.getOneLongTask(currentLongTaskID.value)
// })

const currentLongTask = computed(() => {
    longTaskStore.getOneLongTask(currentLongTaskID.value)
    return longTaskStore.currentLongTask
})

const currentLongTaskUpdateTime = computed(() => {
    return currentLongTask.value.update_time
})

const currentLongTaskCertainDay = computed(() => {
    return currentLongTask.value.CertainDay
})


const currentQuestionDeckList = computed(() => {
    return questionDeckStore.getQuestionsByLongTaskIDs(currentLongTaskID.value)
})


watch(currentQuestionID, () => {
    questionStore.getQuestionSelectgroup()
    questionStore.clearSelectAnswer()
})

const currentQuestionSet = computed(() => {
    return questionStore.QuestionSelectgroup
})

const question_list2  = computed(() => {

    return questionStore.dailyTaskQuestionList

})

const questionSet  = computed(() => {
    // const keyObj: string[] = ['a', 'b', 'c', 'd']
   return {...currentQuestion.value.q_selection_set}
})

// const questionSet2  = computed(() => {
//     let questionG = new Object()
//     questionG.a = currentQuestion.value.q_a
// })
    
    
const nextQuestion = computed(() => {
    return questionStore.getNextQuestion()
})





// const toNextQuetion =

// const QuestionsAllList = computed(() => {
//     return questionStore.getQuestionListSlice(0, 1000)
// })

// let selectedAnswer = ref('')
let answerlist : Array<string> = ["N"]
let correctAnswer = 0
let wrongAnswer = 0

let keycount = 0
const pageCount = ref(0)

const jsonString = JSON.stringify(Object.assign({}, currentQuestion.value.q_selection_set))

onMounted(async () => {

    questionStore.getQuestion(parseInt(route.params.id as string))

    questionDeckStore.getQuestionDeckList()


// watch(() => route.params, async () => {
//     questionStore.getQuestion(parseInt(route.params.id as string))
// }
// )

})




onUpdated(async () => {

    watch(() => route.params, async () => {
        
        questionStore.getQuestion(parseInt(route.params.id as string))
        // router.go(0)
        }
        )
})

const uploadResult = async () => {
    if(userStore.id == -1) {
        routerStore.setNextRoute(route.path)
        router.push('/sign-in')
        return
    }
    // routerStore.setNextRoute(route.path)
    // router.push(`/questions/${nextQuestion.value}`)

    dailyTaskStore.countAnswerNumber(judgeQuestionStatus.value)
    
    const info = await practiceRecordStore.postPracticeRecord(questionStore.currentQuestion.q_id, (currentSelectQuestion.value == questionStore.currentQuestion.q_true_answer).toString())

    const info2 = await questionDeckStore.updateDailyTaskQuestionDeck(currentQuestionDeckID.value, selectQuestionDeckStatus.value, currentQuestionDeckRepeatCounter.value+1, write_timedateformater.value)
    
    
    if (info == 'ok') {
        alertEmitter.emit('call-alert', {
            title: 'SUCCESS',
            body: 'rusult already uploaded',
            keep: 2000
        }),
        questionStore.setDailyTaskRelation(parseInt(route.params.id as string), currentDailyTaskID.value)
        // questionStore.clearSelectAnswer()
        router.push({ path: `/questions/${nextQuestion.value}`})
    }   
    
}

const uploadLastResult = async () => {
    if(userStore.id == -1) {
        routerStore.setNextRoute(route.path)
        router.push('/sign-in')
        return
    }
    // routerStore.setNextRoute(route.path)
    // router.push(`/questions/${nextQuestion.value}`)

    dailyTaskStore.countAnswerNumber(judgeQuestionStatus.value)
    
    const info = await practiceRecordStore.postPracticeRecord(questionStore.currentQuestion.q_id, (currentSelectQuestion.value == questionStore.currentQuestion.q_true_answer).toString())

    const info2 = await questionDeckStore.updateDailyTaskQuestionDeck(currentQuestionDeckID.value, selectQuestionDeckStatus.value, currentQuestionDeckRepeatCounter.value+1, write_timedateformater.value)

    const info3 = await dailyTaskStore.updateDailyTaskState(currentDailyTaskID.value)

    if(currentLongTaskUpdateTime.value != update_timedateformater.value) {

        const info4 = await longTaskStore.updateLongTask(currentLongTaskID.value, currentLongTaskCertainDay.value+1, update_timedateformater.value)

    }  
    
    if (info == 'ok') {
        alertEmitter.emit('call-alert', {
            title: 'SUCCESS',
            body: 'rusult already uploaded',
            keep: 2000
        }),
        questionStore.setDailyTaskRelation(parseInt(route.params.id as string), currentDailyTaskID.value)
        // questionStore.clearSelectAnswer()
        router.push({ path: `/dailytasks/${currentDailyTaskID.value}/result`})
    }   
    
}

function answered(e:any) {
    questionStore.getSelectAnswer(e.target.value)
}

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
        <SectionTitle>Exercise Question List</SectionTitle>
            <SectionMain>
                <div class="md:w-full shadow-2xl md:mx-auto rounded-3xl border-8 border-white overflow-hidden"> 
                    <div>
                            <div>judgeDate: {{ judgeDate }}</div>
                            <div>currentLongTaskCertainDay{{ currentLongTaskCertainDay }}</div>
                            <div>currentLongTaskUpdateTime{{ currentLongTaskUpdateTime }}</div>
                            <div>currentLongTask{{ currentLongTask }}</div>
                            <div>currentLongTaskID: {{ currentLongTaskID }}</div>
                            <div>judgeLastQuestion: {{ judgeLastQuestion }}</div>
                            <div>currentDailyTaskID: {{ currentDailyTaskID }}</div>
                            <div>currentDailyTaskTrueNumber: {{ currentDailyTaskTrueNumber }}</div>
                            <div>currentDailyTaskFalseNumber {{ currentDailyTaskFalseNumber }}</div>
                            <div>judgeQuestionStatus {{ judgeQuestionStatus }}</div>
   
                            <div>currentQuestionDeckRepeatCounter{{ currentQuestionDeckRepeatCounter }} </div>
                            <div>write_timedateformater{{ write_timedateformater }}</div>
                            <div>currentQuestionDeckID{{ currentQuestionDeckID }}</div>
                            
                            <div>selectQuestionDeckStatus: {{ selectQuestionDeckStatus }}</div>
                            <div>getcurrentQuestionDeck: {{ getcurrentQuestionDeck }}</div>

                            <div class="" v-for="qd in currentQuestionDeckList">
                                <div>
                                    id: {{ qd.id }}
                                    longtask: {{ qd.longtask }}
                                    questionid: {{ qd.question }}
                                    questionStatus: {{ qd.questionStatus }}
                                </div>
                            </div>

                    </div>
                    <div class="antialiased rounded-l-[45px]">
                        <div class="flex w-full h-screen justify-center items-center">
                            <div class="w-full max-w-xl">
                                <h1 class="font-bold text-5xl text-center text-indigo-600">
                                    {{currentQuestion.q_id}}
                                    My anwser:
                                    {{currentSelectQuestion}}

                                </h1>
                                <div class="p-12 pb-20 shadow-lg w-full mt-8">
                                    <div>   
                                        <p class="text-2xl font-bold">
                                            {{ currentQuestion.q_question }}
                                        </p>
                                        <label 
                                        :for="key"
                                        class="block mt-4 border border-gray-300 rounded-lg py-2 px-6 text-lg"
                                        v-for="selection, key in currentQuestionSet"
                                        :class="{'hover:bg-gray-100 cursor-pointer' : currentSelectQuestion == ''},
                                                {'bg-red-200' : currentSelectQuestion == key},
                                                {'bg-green-200' : key == currentQuestion.q_true_answer  && currentSelectQuestion != ''}"
                                        >
                                        <input
                                            type="radio"
                                            :id="key"
                                            class="hidden"
                                            :value="key"
                                            @change="answered($event)"
                                            v-model = "currentSelectQuestion"
                                            :disabled="currentSelectQuestion != ''"
                                        />
                                        {{selection}}


                                        </label>
                                        <div class="mt-6 flow-root">

                                            <button v-if="judgeLastQuestion" class="float-right px-5 py-2 bg-indigo-600 text-white text-sm font-bold tracking-wide rounded-full"
                                                @click="uploadLastResult"
                                            >
                                                Display Result
                                            
                                            </button>

                                            <button v-else 
                                                class="float-right px-5 py-2 bg-indigo-600 text-white text-sm font-bold tracking-wide rounded-full"
                                                @click="uploadResult">
                                                
                                                Next

                                            </button>

                                        </div>
            
                                    </div>

                                </div>
                            
                            </div>

                        </div>
        
                    </div>
                </div>
            </SectionMain>
        </LayoutAuthenticated>
</template>