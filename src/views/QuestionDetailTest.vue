<script setup lang="ts">
import { computed, onMounted, onUpdated, ref, watch, triggerRef, reactive } from 'vue';
import { useQuestionStore } from '../stores/useQuestionStore';
import { useUserStore } from '../stores/useUserStore';
import { useRouterStore } from '../stores/useRouterStore'
import { useLongTaskStore } from '../stores/useLongTask'
import { useDailyTaskStore } from '../stores/useDailyTask'
import { useQuestionDeckStore } from '../stores/useQuestionDeckStore';
import { usePracticeRecordStore } from '../stores/usePracticeRecord'
import { useRoute, onBeforeRouteUpdate } from 'vue-router'
import { alertEmitter } from '../components/rawComponents//Alert.vue';
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
import PillTag from "../components/PillTag.vue";
// import HoverLink from '../components/HoverLink.vue';

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


const hoverlinktext: Ref<String> = ref("test")
const hoverlinkwikiUrl: Ref<String> = ref("https://www.wikipedia.org/")
const hoverlinkimageUrl: Ref<String> = ref("https://unsplash.it/800/800/?random")
const hoverlinkKeyWord: Ref<String> = ref("KeyWord")
const hoverlinkKeyWordDescription: Ref<String> = ref("KeyWordDescription")
const hoverCardVisibility = ref(false);

const handleShowChanged = (hover: boolean) => {
    hoverCardVisibility.value = hover;
}

const judgeDate = computed(() => {
    return currentLongTaskUpdateTime.value == update_timedateformater.value
})

const judgeLastQuestion = computed(() => {
    return questionStore.judgeLastQuestion(parseInt(route.params.id as string))
})

const write_time: Ref<Date> = ref(new Date())

let counting = ref(1)
let countingreact = reactive({counting})

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

const currentQuestionKeyWord = computed(() => {
    return currentQuestion.value.KeyWord
})

const currentQuestionKeyWordDescription = computed(() => {
    return currentQuestion.value.KeyWordDescription
})

const currentQuestionwikiUrl = computed(() => {
    return currentQuestion.value.wikiUrl
})

const currentQuestionq_cover = computed(() => {
    return currentQuestion.value.q_cover
})

const currentSelectQuestion = computed(() => {
    console.log(400, questionStore.selectAnswer)
    return questionStore.selectAnswer
})

watch(currentSelectQuestion, () => {
    console.log(500, currentSelectQuestion.value === questionStore.currentQuestion.q_true_answer)
    

})

const selectColor = computed((key: any) => {
    if (currentSelectQuestion.value == '') {
        return 'white'
    }else{
        if (currentSelectQuestion.value === questionStore.currentQuestion.q_true_answer) {
            return 'green'
        }else {
            return 'red'
        }

    }
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

const currentDailyTaskName = computed(() => {
    return currentDailyTask.value.DailyTaskName
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

const currentLongTaskName = computed(() => {
    return currentLongTask.value.LongTaskName
})

const currentLongTaskCertainDay = computed(() => {
    return currentLongTask.value.CertainDay
})


const currentQuestionDeckList = computed(() => {
    return questionDeckStore.getQuestionsByLongTaskIDs(currentLongTaskID.value)
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

const onhint = async () => {
    window.open(`${currentQuestionwikiUrl.value}`, "_blank");
    return

}



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
    
    
    if (info == 'ok' && info2 == 'ok') {
        alertEmitter.emit('call-alert', {
            title: 'SUCCESS',
            body: 'rusult already uploaded',
            keep: 2000
        }),
        questionStore.setDailyTaskRelation(parseInt(route.params.id as string), currentDailyTaskID.value)
        await router.push({ path: `/questions/${nextQuestion.value}`})

        counting.value ++
    }   
    
}

const roterPage = async () => {
    await router.push({ path: `/questions/${nextQuestion.value}`})
    roterPage2()
    // router.back()
    // router.forward()

}

const roterPage2 = async () => {
    await router.back()
    router.forward()
}

const roterPage3 = async () => {
    await Promise.all([uploadResultFirst(), roterPage2()]);
}

const uploadResultFirst = async () => {
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
    
    
    if (info == 'ok' && info2 == 'ok') {
        alertEmitter.emit('call-alert', {
            title: 'SUCCESS',
            body: 'rusult already uploaded',
            keep: 2000
        }),
        questionStore.setDailyTaskRelation(parseInt(route.params.id as string), currentDailyTaskID.value)
        
        roterPage()
        // router.forward()

        counting.value ++
        // roterPage()

        // router.back()
        // router.forward()
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

    const info3 = await longTaskStore.updateLongTaskUpdate_time(currentLongTaskID.value, write_timedateformater.value)
    // const info3 = await dailyTaskStore.updateDailyTaskState(currentDailyTaskID.value)

    // if(currentLongTaskUpdateTime.value != update_timedateformater.value || currentLongTask.value.create_time == update_timedateformater.value) {

    //     const info4 = await longTaskStore.updateLongTask(currentLongTaskID.value, currentLongTaskCertainDay.value+1, update_timedateformater.value)

    // }
    
    if(currentLongTask.value.update_time !=  write_timedateformater.value || currentLongTask.value.create_time == update_timedateformater.value) {
        const info5 = await longTaskStore.updateLongTaskCertainDay(currentLongTaskID.value, currentLongTaskCertainDay.value+1)
    }
    
    if (info == 'ok' && info2 == 'ok' && info3 == 'ok') {
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

function answered(e: any) {
    //event: Event
    // const target = e.target.value as HTMLInputElement;
    // console.log(100, event.target!);
    questionStore.getSelectAnswer(e.target.value)
    
    
    
    // console.log(100, QuestionsAllList.value);
    // console.log(789, nextQuestion.value);
    // console.log(110, questionStore.currentQuestion.q_id)
    // console.log(999, selectedAnswer.value);
    // console.log(888, currentQuestion.value.q_true_answer);

    // if(selectedAnswer.value == currentQuestion.value.q_true_answer){
    //     correctAnswer++
    //     answerlist.push("T");
    // }

    // else{
    //     wrongAnswer++
    //     answerlist.push("F");
    // }
    // console.log(777, correctAnswer);
    // console.log(666, wrongAnswer);
    // console.log(555, answerlist);
}

// const reDirect = async () => {
//     routerStore.setNextRoute(route.path)
//     router.push(`/questions/${nextQuestion.value}`)
//     return
// }

// const openNextQuestion = async () => {
//     router.push(`/questions/${nextQuestion.value}`)
// }


// function replaceObjectKey(arr, key, replacekey) {
//     let newArr = []
//     arr.
    
// }

function formatDate(str: string) {
    return str.split("-").map((item) => {
        if (+item < 10) {
            return "0" + +item;
        }
        return item;
    })
    .join("-");
}

const timeout = ref<number | null>(null);
const showCard = ref(false);
const isLoaded = ref(false);

const mouseover = (event: MouseEvent) => {
  console.log(event.pageX, event.pageY);
  if (timeout.value) clearTimeout(timeout.value);
  timeout.value = setTimeout(() => {
    showCard.value = true;
    setTimeout(() => {
      isLoaded.value = true;
    }, 500);
  }, 500);
};

const mouseleave = () => {
  timeout.value = setTimeout(() => {
    showCard.value = false;
    isLoaded.value = false;
  }, 200);
};

const cardOver = () => {
  console.log('card over');
  if (timeout.value) clearTimeout(timeout.value);
  showCard.value = true;
};

const cardLeave = () => {
  timeout.value = setTimeout(() => {
    showCard.value = false;
    isLoaded.value = false;
  }, 200);
};

const outline: boolean = false

</script>


<template>
    <LayoutAuthenticated>
        <SectionMain>



            

            <div class="hidden"> 
                <div>currentLongTask{{ currentLongTask.create_time }}</div>
            <div>currentLongTaskCertainDay{{ currentLongTaskCertainDay }}</div>
            <div>currentLongTask{{ currentLongTask.update_time }}</div>
                <div>{{ currentQuestionKeyWord }}</div>
                <div> {{ currentQuestionKeyWordDescription }}</div>
                <div> {{ currentQuestionwikiUrl }}</div>
                <div>{{ getTaskPrograss }}</div>
                <div> {{ QuestionListStatus0 }}</div>
                <div> {{ QuestionListStatus1 }}</div>
                <div> {{ QuestionListStatus2 }}</div>
                <div> {{ QuestionListStatus3 }}</div>
                <div> {{ QuestionListStatus4 }}</div>
                <div> {{ QuestionListStatus5 }}</div>
                <div>currentLongTaskUpdateTime: {{currentLongTaskUpdateTime}}</div>
                <div> update_timedateformater: {{ update_timedateformater }}</div>
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


            <div class="antialiased">
                <div class="flex w-full justify-center items-center">
                    <div class="w-full max-w-xl">
                        <SectionTitle>{{currentDailyTaskName}}</SectionTitle>
                        
                            <!-- <HoverLink 
                                :text="hoverlinktext.valueOf()"
                                :wikiUrl="hoverlinkwikiUrl.valueOf()"
                                :imageUrl = "hoverlinkimageUrl.valueOf()"
                                :KeyWord = "hoverlinkKeyWord.valueOf()"
                                :KeyWordDescription="hoverlinkKeyWordDescription.valueOf()" 
                                @hover-changed="handleShowChanged" 
                            ></HoverLink> -->
                        <h1 class="font-bold text-4xl lg:text-5xl text-center text-indigo-700 dark:text-indigo-400">
                            Question No.{{currentQuestion.q_id}}
                        </h1>

                        <div class="p-12 pb-16 rounded-lg shadow-lg w-full mt-8">
                            <div>   
                                <p class="text-md font-bold md:text-xl text-justify">
                                    {{ currentQuestion.q_question }}
                                </p>

                                <PillTag class="mt-2"
                                    @mouseover="mouseover"
                                    @mouseleave="mouseleave"
                                    color="info"
                                    label="hint"
                                    outline= outline
                                    >
                                </PillTag>
                                <a v-show="showCard"
                                    @mouseover="cardOver"
                                    @mouseleave="cardLeave"
                                    @click="onhint"
                                    href="#" class="flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow md:flex-row md:max-w-xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
                                    <img class="object-cover w-full rounded-t-lg h-96 md:h-auto md:w-48 md:rounded-none md:rounded-l-lg" :src="'http://localhost:1337' + currentQuestionq_cover" alt="https://unsplash.it/800/800/?random">
                                    <div class="flex flex-col justify-between p-4 leading-normal">
                                        <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{{currentQuestionKeyWord}}</h5>
                                        <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">{{ currentQuestionKeyWordDescription }}</p>
                                    </div>
                                </a>

                                <label 
                                :for="key"
                                class="block mt-4 border border-gray-300 rounded-lg py-2 px-6 text-lg"
                                v-for="selection, key in currentQuestionSet"
                                :class="{'hover:bg-gray-100 cursor-pointer hover:dark:bg-gray-400' : selectColor == 'white'},
                                        {'bg-red-200 dark:bg-red-400' : selectColor == 'red' && currentSelectQuestion == key},
                                        {'bg-green-200 dark:bg-green-500' :  (selectColor == 'green' && currentSelectQuestion == key) || (key == currentQuestion.q_true_answer && selectColor == 'red')}"
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
                                <span class="uppercase">{{key}}.</span>     

                                {{selection}}

                                </label>
                                <div class="mt-10 flow-root">

                                    
                                    <button v-if="judgeLastQuestion == 'first'"
                                        class="float-right px-5 py-2 bg-indigo-600 dark:bg-indigo-500 text-white text-sm font-bold tracking-wide rounded-full"
                                        @click="$router.forward()">
                                        
                                        Next

                                    </button>

                                    <button v-if="judgeLastQuestion == 'last' " class="float-right px-5 py-2 bg-indigo-600 dark:bg-indigo-500 text-white text-sm font-bold tracking-wide rounded-full"
                                        @click="uploadLastResult"
                                    >
                                        Display Result
                                    
                                    </button>

                                    <button v-else-if="judgeLastQuestion == 'first'"
                                        class="float-right px-5 py-2 bg-indigo-600 dark:bg-indigo-500 text-white text-sm font-bold tracking-wide rounded-full"
                                        @click="uploadResultFirst">
                                        
                                        Upload

                                    </button>
                                    <button v-else
                                        class="float-right px-5 py-2 bg-indigo-600 dark:bg-indigo-500 text-white text-sm font-bold tracking-wide rounded-full"
                                        @click="uploadResult">
                                        
                                        Next

                                    </button>

                                </div>
    
                            </div>

                        </div>
                    
                    </div>

                </div>
            
            </div>
        </SectionMain>
    </LayoutAuthenticated>
</template>
<style scoped lang="scss">

</style>

