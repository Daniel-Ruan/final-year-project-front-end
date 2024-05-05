<script setup lang="ts">
import {
  mdiTableBorder,
  mdiBallotOutline,
  mdiRename,
  mdiNumeric  
} from "@mdi/js";
import SectionMain from "../components/SectionMain.vue";
import CardBox from "../components/CardBox.vue";
import LayoutAuthenticated from "../layouts/LayoutAuthenticated.vue";
import SectionTitleLineWithButton from "../components/SectionTitleLineWithButton.vue";
import BaseButton from "../components/BaseButton.vue";
import FormField from "../components/FormField.vue";
import FormControl from "../components/FormControl.vue";
import BaseDivider from "../components/BaseDivider.vue";
import BaseButtons from "../components/BaseButtons.vue";
import { mdiEye, mdiTrashCan } from "@mdi/js";
import CardBoxModal from "../components/CardBoxModal.vue";
import TableCheckboxCell from "../components/TableCheckboxCell.vue";
import UserAvatar from "../components/UserAvatar.vue";
import FormCheckRadio from "../components/FormCheckRadio.vue";

import { computed, onMounted, onUpdated, ref, watch } from 'vue';
import { useRouterStore } from '../stores/useRouterStore'
import { useBookStore } from '../stores/useBookStore';
import { useLongTaskStore } from '../stores/useLongTask'
import { useDailyTaskStore } from '../stores/useDailyTask'
import { useQuestionDeckStore } from '../stores/useQuestionDeckStore';
import { useQuestionStore } from '../stores/useQuestionStore';
import { usePracticeRecordStore } from '../stores/usePracticeRecord'
import { alertEmitter } from '../components/rawComponents/Alert.vue';
import { useRoute, onBeforeRouteUpdate } from 'vue-router'
import { useUserStore } from '../stores/useUserStore';


import { useRouter } from 'vue-router'
import type { Ref } from 'vue'
import Datepicker from 'vue3-datepicker'

const router = useRouter()
const routerStore = useRouterStore()
const route = useRoute()

const bookStore = useBookStore()
const userStore = useUserStore()
const longTaskStore = useLongTaskStore()
const dailyTaskStore = useDailyTaskStore()
const practiceRecordStore = usePracticeRecordStore()
const questionDeckStore = useQuestionDeckStore()
const QuestionStore = useQuestionStore()

const currentDate = ref(new Date());

const isNextDay = ref(false);

const updateDate = () => {
      currentDate.value = new Date();
};

watch(currentDate, (newValue, oldValue) => {
  const nextDay = newValue.getDate();
  const currentDay = oldValue.getDate();
  isNextDay.value = nextDay > currentDay;
});

watch(isNextDay, async (newValue) => {
  if (newValue) {

    const info = await dailyTaskStore.postDailyTask(longTaskStore.currentLongTask.id, DailyTaskName.value, dateformater.value, dailyGoalNumber.value, generateDailyTask.value.toString())

    if (info == 'ok') {
        alertEmitter.emit('call-alert', {
            title: 'SUCCESS',
            body: 'A new dailyTask already created',
            keep: 2000
        })
        dailyTaskStore.getDailyTasksList()
    }

  }
});

const write_time: Ref<Date> = ref(new Date())

const write_timedateformater = computed(() => {
    const detaformat3 = write_time.value.toLocaleDateString().replace(new RegExp('/', 'g'), '-')

    const detaformat4 = formatDate(detaformat3)
    
    return detaformat4
})

const questionStatus: number = 0

const RepeatCounter: number = 0



const dailyGoalNumber: Ref<number> = ref(10)


//: Ref<string> = ref('')
const planned_time: Ref<Date> = ref(new Date())

const questions_set: Ref<string> = ref('')

const question_setsArray: Ref<number[]> = ref([])

let question_set: number[] = []


onMounted(async () => {
    longTaskStore.getOneLongTask(parseInt(route.params.id as string))
    dailyTaskStore.getDailyTasksList()
    setInterval(updateDate, 1000);
    // bookStore.getBook(currentLongTask.value.book)
    
    
})

onUpdated(async () => {
    
})

const longTaskCreateTime = computed(() => {
    return currentLongTask.value.create_time

})

const longTaskUpdateTime = computed(() => {
    return currentLongTask.value.update_time

})

const quetionReviewLsit = computed(() => {

    return longTaskStore.quetionSelectReviewLsit

})

const certainDay = computed(() => {
    return longTaskStore.currentLongTask.CertainDay

})

const LearningCycleDays = computed(() => {
    return longTaskStore.currentLongTask.LearningCycleDays
})

const currentQuestionDeckList = computed(() => {
    return questionDeckStore.getQuestionsByLongTaskIDs(currentLongTask.value.id)
})

// getNdayofCycle

const NdayofCycle = computed(() => {
    return longTaskStore.getNdayofCycle(certainDay.value, LearningCycleDays.value)

})
//getReviewLsit1
const ReviewLsit1 = computed(() => {
    return longTaskStore.getReviewLsit1(NdayofCycle.value, QuestionListStatus0.value, QuestionListStatus1.value, QuestionListStatus2.value, QuestionListStatus3.value, QuestionListStatus4.value, QuestionListStatus5.value)
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

const currentQuestion1 = computed(() => {
    return longTaskStore.storeLongTaskQuestionList(currentQuestionID.value)

})

const residueQuestionList = computed(() => {

    return QuestionStore.removeLsitElement(currentQuestionID.value, QuestionListStatus1.value)

})


const currentDailyTaskListByLongTask = computed(() => {
    return dailyTaskStore.getDailyTaskByLongTask(parseInt(route.params.id as string))
})

// const dailyGoalNumber = 10
const currentDailyTaskList = computed(() => {
    return dailyTaskStore.currentDailyTaskList
})


const currentLongTask = computed(() => {
    return longTaskStore.currentLongTask
})

const currentBook = computed(() => {
    return bookStore.currentBook
})

const currentQuestionID = computed(() => {
    return currentBook.value.b_questions
})

// watch(currentQuestionID, () => {
//     question_set = []
//     currentQuestionID.value.forEach((question) => {
//         question_set.push(question)

//     })

// })

const currentLongTaskBookID = computed(() => {
    return currentLongTask.value.book
})


watch(currentLongTaskBookID, () => {
    bookStore.getBook(currentLongTaskBookID.value)
})


const createNewDailyTask  = computed(() => {
    return longTaskStore.getRandomQuestion(currentQuestionID.value, dailyGoalNumber.value)
})


const dateformater = computed(() => {
    const detaformat = planned_time.value.toLocaleDateString().replace(new RegExp('/', 'g'), '-')

    const detaformat2 = formatDate(detaformat)

    return detaformat2
})

const DailyTaskName: Ref<string> = ref(`${dateformater.value} Daily Exercise`)

const quetionSelectLsit  = computed(() => {
    return longTaskStore.quetionSelectLsit
})

const quetionSelectResidueLsit  = computed(() => {
    return longTaskStore.quetionSelectResidueLsit
})

const createNewDailyTask1 = async () => {
    const resp = longTaskStore.getRandomQuestion(currentQuestionID.value, dailyGoalNumber.value)
    resp.forEach(q => {
        question_setsArray.value.push(q)
    });
}

const ifCreateDeck  = computed(() => {

  if (currentQuestionDeckList.value.length == 0) {
    return true
  } else {
    return false
  }
})

//currentDailyTaskListByLongTask



//currentQuestion
const createQuestionDeck = async () => {
    if(userStore.id == -1) {
        routerStore.setNextRoute(route.path)
        router.push('/sign-in')
        return
    }
    const info: string[] = []
    currentQuestionID.value.forEach(async q => {

        const infor = await questionDeckStore.postQuestionDeck(parseInt(route.params.id as string), q, write_timedateformater.value, questionStatus, RepeatCounter)
        info.push(infor)

        if (info.length == currentQuestionID.value.length) {
          router.go(0)
        }

    })

}


const generateDailyTask = computed(() => {

    if(ReviewLsit1.value.length < dailyGoalNumber.value) {

        return quetionReviewLsit.value.concat(longTaskStore.getRandomQuestionNew(QuestionListStatus0.value, dailyGoalNumber.value-ReviewLsit1.value.length))

    }else {

        const newArray: number[] = quetionReviewLsit.value.slice(0, dailyGoalNumber.value);

        return newArray

    }

})

const createDailyTask = async () => {
    if(userStore.id == -1) {
        routerStore.setNextRoute(route.path)
        router.push('/sign-in')
        return
    }

    // if(quetionSelectLsit.value.length == 0) {
    //     longTaskStore.getRandomQuestion(currentQuestion1.value, dailyGoalNumber.value)
    // }

    const info = await dailyTaskStore.postDailyTask(longTaskStore.currentLongTask.id, DailyTaskName.value, dateformater.value, dailyGoalNumber.value, generateDailyTask.value.toString())

    if (info == 'ok') {
        alertEmitter.emit('call-alert', {
            title: 'SUCCESS',
            body: 'A new dailyTask already created',
            keep: 2000
        })
        dailyTaskStore.getDailyTasksList()
    }
    
}

const deleteDailyTask = async (id: number) => {
  const info = await dailyTaskStore.deleteDailyTask(id)
  if (info == 'ok') {
        alertEmitter.emit('call-alert', {
            title: 'SUCCESS',
            body: 'The dailyTask already deleted',
            keep: 2000
        })
        dailyTaskStore.getDailyTasksList()
    }

}


// const task2 = ref(new Date())


function formatDate(str: string) {
    return str.split("-").map((item) => {
        if (+item < 10) {
            return "0" + +item;
        }
        return item;
    })
    .join("-");
}

const userSwitchVal = ref(false);

// const openDailyTask = async () => {
//     router.push(`/longTasks/${props.id}`)
// }

</script>

<template>
  <LayoutAuthenticated>
    <SectionMain>
      <SectionTitleLineWithButton :icon="mdiTableBorder" title="Exercise List" main>
      </SectionTitleLineWithButton>
      <CardBox class="mb-6" has-table>
        <div class="hidden">    
          <div>longTaskCreateTime{{ longTaskCreateTime }}</div>
    <div>longTaskUpdateTime{{ longTaskUpdateTime }}</div>
    <div>{{ ReviewLsit1.length }}</div>
    <div>generateDailyTask: {{ generateDailyTask }}</div>
    <div>ReviewLsit1: {{ ReviewLsit1 }}</div>
    <div>NdayofCycle: {{ NdayofCycle }}</div>
    <div>LearningCycleDays {{ LearningCycleDays }}</div>
    <div>certainDay {{ certainDay }}</div>
    <div>0 {{ QuestionListStatus0  }}</div>
    <div>1 {{ QuestionListStatus1  }}</div>
    <div>2 {{ QuestionListStatus2  }}</div>
    <div>3 {{ QuestionListStatus3  }}</div>
    <div>4 {{ QuestionListStatus4  }}</div>
    <div>5 {{ QuestionListStatus5  }}</div>
    <div>residueQuestionList: {{ residueQuestionList }}</div>
    <div>currentQuestion1: {{ currentQuestion1 }}</div>
    <div>currentQuestionID: {{ currentQuestionID }}</div>
    <div>QuestionListStatus1: {{ QuestionListStatus1 }}</div>
    <div>currentQuestionDeckList{{ currentQuestionDeckList.length }}</div>
    <!-- <div class="text-xl text-white py-5 float-right">
        <button 
            class="bg-blue-600 hover:bg-blue-700 rounded-xl w-32 "
            @click="createNewDailyTask1">CREATE
        </button>
    </div>
    <div class="text-xl text-white py-5 float-right">
        <button 
            class="bg-blue-600 hover:bg-blue-700 rounded-xl w-32 "
            @click="createDailyTask">CREATE2
        </button>
    </div> -->

    <div>currentDailyTaskListByLongTask{{ currentDailyTaskListByLongTask }}</div>
    <div>quetionSelectLsit{{ quetionSelectLsit }}</div>
    <div>quetionSelectResidueLsit{{ quetionSelectResidueLsit }}</div>

    <!-- <div>{{ createNewDailyTask }}</div> -->
    <div>{{ question_setsArray }}</div>
    <!-- <div>{{ storeLongTaskQuestionList }}</div> -->

    <!-- <div>{{ storeLongTaskQuestionList }}</div>
    <div>{{ getDailyTaskQuestionList }}</div> -->
    <div>book ID: {{ currentLongTask.book }}</div>
    <div>Q set: {{ currentQuestionID }}</div>
    <div>CycleDays: {{ currentLongTask.LearningCycleDays }}</div>
  
         
        </div>

        <table>
          <thead>
            <tr>
              <th />
              <th />
              <th>Exercise</th>
              <th>Start time</th>
              <th class="text-center">Accuracy Rate</th>
              <th>Status</th>
              <th>Quantity</th>
              <th />
            </tr>
          </thead>
          <tbody>
            <tr v-for="task in currentDailyTaskListByLongTask">
              <TableCheckboxCell
                @checked=""
              />
              <td class="border-b-0 lg:w-6 before:hidden">
                <UserAvatar
                  :username="userStore.name"
                  class="w-24 h-24 mx-auto lg:w-6 lg:h-6"
                />
              </td>
              <td data-label="Task" @click="$router.push(`/dailytasks/${task.id}`)">
                {{ task.DailyTaskName }}
                <!-- <a :href="'/dailytasks/' + task.id"></a> -->
              </td>
              <td data-label="Created">
                {{ task.planned_time }}
              </td>
              <td class="text-center" data-label="accuracy rate">
                {{ task.accuracy }} %
              </td>
              <td data-label="Status">
                <!-- {{ task.daily_state }} -->
                <span v-if="task.daily_state == 'true'" class="bg-green-200 text-green-600 dark:bg-green-800 dark:text-green-400 py-1 px-3 rounded-full text-xs">Finished</span>
                <span v-else class="bg-yellow-200 text-yellow-600 dark:bg-yellow-800 dark:text-yellow-400 py-1 px-3 rounded-full text-xs"> Unfinished </span>
              </td>
              <td data-label="Quantity" class="lg:w-1 whitespace-nowrap text-center">
                {{ task.n_questions }}
                <!-- <small
                  class="text-gray-500 dark:text-slate-400"
                  :title="task.planned_time"
                  >{{ task.n_questions }}</small
                > -->
              </td>
              <td class="before:hidden lg:w-1 whitespace-nowrap">
                <BaseButtons type="justify-start lg:justify-end" no-wrap>
                  <BaseButton
                    color="info"
                    :icon="mdiEye"
                    small
                    @click="$router.push(`/dailytasks/${task.id}`)"
                  />
                  <BaseButton
                    color="danger"
                    :icon="mdiTrashCan"
                    small
                    @click="deleteDailyTask(task.id)"
                  />
                </BaseButtons>
              </td>
            </tr>
          </tbody>
        </table>
      </CardBox>

      </SectionMain>

        <SectionTitle custom>
          <div class="flex items-center justify-center mt-6">
              <FormCheckRadio
                v-model="userSwitchVal"
                name="notifications-switch"
                type="switch"
                label="Create table"
                :input-value="true"
              />
          </div>
        </SectionTitle>

        <SectionMain v-if="userSwitchVal">
          <SectionTitleLineWithButton
            :icon="mdiBallotOutline"
            title="Create a new Exercise"
            main
          >
          </SectionTitleLineWithButton>
          <CardBox form>
            <FormField v-if="ifCreateDeck == false" label="Enter the name of the task and Number of daily tasks.">
              <FormControl v-model="DailyTaskName" type="text" placeholder="Exercise name" id="longTaskName" :icon="mdiRename" />
              <FormControl v-model="dailyGoalNumber" type="text" placeholder="10 is the best choice " id="learningCycleDays" :icon="mdiNumeric" />
            </FormField>

            <FormField v-if="ifCreateDeck == false" label="Choose a startTime">
                <Datepicker class="w-full dark:bg-slate-800 border-slate-600 rounded" v-model="planned_time" />
            </FormField>

            <BaseDivider />

            <template #footer>
              <BaseButton v-if="ifCreateDeck == false"
                label="Create DailyTask"
                color="contrast"
                @click="createDailyTask"
              />
              <BaseButton v-if="ifCreateDeck"
                label="Create QuestionDeck"
                color="contrast"
                @click="createQuestionDeck"
              />
            </template>

          </CardBox>
        </SectionMain>

  </LayoutAuthenticated>
</template>
