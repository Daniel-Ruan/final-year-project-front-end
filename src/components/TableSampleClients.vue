<script setup lang="ts">
import { computed, onMounted, onUpdated, ref, watch } from 'vue';
import { mdiEye, mdiTrashCan } from "@mdi/js";
import CardBoxModal from "./CardBoxModal.vue";
import TableCheckboxCell from "./TableCheckboxCell.vue";
import BaseLevel from "./BaseLevel.vue";
import BaseButtons from "./BaseButtons.vue";
import BaseButton from "./BaseButton.vue";
import UserAvatar from "./UserAvatar.vue";

//checkable
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


//
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

const write_time: Ref<Date> = ref(new Date())

const write_timedateformater = computed(() => {
    const detaformat3 = write_time.value.toLocaleDateString().replace(new RegExp('/', 'g'), '-')

    const detaformat4 = formatDate(detaformat3)
    
    return detaformat4
})

const questionStatus: number = 0

const RepeatCounter: number = 0



const dailyGoalNumber: Ref<number> = ref(10)

const DailyTaskName: Ref<string> = ref('')

const planned_time: Ref<Date> = ref(new Date())

const questions_set: Ref<string> = ref('')

const question_setsArray: Ref<number[]> = ref([])

let question_set: number[] = []


onMounted(async () => {
    longTaskStore.getOneLongTask(parseInt(route.params.id as string))
    dailyTaskStore.getDailyTasksList()
    console.log(888, currentLongTask.value.book)
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



//currentQuestion
const createQuestionDeck = async () => {
    if(userStore.id == -1) {
        routerStore.setNextRoute(route.path)
        router.push('/sign-in')
        return
    }
    currentQuestionID.value.forEach(q => {

        questionDeckStore.postQuestionDeck(parseInt(route.params.id as string), q, write_timedateformater.value, questionStatus, RepeatCounter)

    })

    
}

//quetionSelectReviewLsit

const generateDailyTask = computed(() => {

    if(ReviewLsit1.value.length < dailyGoalNumber.value) {

        return quetionReviewLsit.value.concat(longTaskStore.getRandomQuestionNew(QuestionListStatus0.value, dailyGoalNumber.value-ReviewLsit1.value.length))

    }else {

        return quetionReviewLsit.value

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






//
defineProps({
  checkable: Boolean,
});

const items = computed(() => currentDailyTaskListByLongTask.value);

const isModalActive = ref(false);

const isModalDangerActive = ref(false);

const perPage = ref(5);

const currentPage = ref(0);


const checkedRows = ref([]);

const itemsPaginated = computed(() =>
  items.value.slice(
    perPage.value * currentPage.value,
    perPage.value * (currentPage.value + 1)
  )
);

const numPages = computed(() => Math.ceil(items.value.length / perPage.value));

const currentPageHuman = computed(() => currentPage.value + 1);

const pagesList = computed(() => {
  const pagesList = [];

  for (let i = 0; i < numPages.value; i++) {
    pagesList.push(i);
  }

  return pagesList;
});

</script>
<template>

  <CardBoxModal v-model="isModalActive" title="Sample modal">
    <p>Lorem ipsum dolor sit amet <b>adipiscing elit</b></p>
    <p>This is sample modal</p>
  </CardBoxModal>

  <CardBoxModal
    v-model="isModalDangerActive"
    title="Please confirm"
    button="danger"
    has-cancel
  >
    <p>Lorem ipsum dolor sit amet <b>adipiscing elit</b></p>
    <p>This is sample modal</p>
  </CardBoxModal>

  <!-- <div v-if="checkedRows.length" class="p-3 bg-gray-100/50 dark:bg-slate-800">
    <span
      v-for="checkedRow in checkedRows"
      :key="checkedRow.id"
      class="inline-block px-2 py-1 rounded-sm mr-2 text-sm bg-gray-100 dark:bg-slate-700"
    >
      {{ checkedRow.name }}
    </span>
  </div> -->

  <table>
    <thead>
      <tr>
        <th v-if="checkable" />
        <th />
        <th>Task</th>
        <th>Start time</th>
        <th>No. of questions</th>
        <th>Status</th>
        <th>Accuracy Rate</th>
        <th />
      </tr>
    </thead>
    <tbody>
      <tr v-for="task in currentDailyTaskListByLongTask">
        <TableCheckboxCell
          v-if="checkable"
          @checked=""
        />
        <td class="border-b-0 lg:w-6 before:hidden">
          <UserAvatar
            :username="userStore.name"
            class="w-24 h-24 mx-auto lg:w-6 lg:h-6"
          />
        </td>
        <td data-label="Task"><a :href="'/dailytasks/' + task.id">
          {{ task.DailyTaskName }}</a>
        </td>
        <td data-label="Start time">
          {{ task.planned_time }}
        </td>
        <td data-label="No. of questions">
          {{ task.n_questions }}
        </td>
        <td data-label="Status">
          {{ task.daily_state }}
        </td>

        <!-- <td data-label="Progress" class="lg:w-32">
          <progress
            class="flex w-2/5 self-center lg:w-full"
            max="100"
            :value="client.progress"
          >
            {{ client.progress }}
          </progress>
        </td> -->
        <td data-label="Created" class="lg:w-1 whitespace-nowrap">
          <small
            class="text-gray-500 dark:text-slate-400"
            :title="task.planned_time"
            >{{ task.planned_time }}</small
          >
        </td>
        <td class="before:hidden lg:w-1 whitespace-nowrap">
          <BaseButtons type="justify-start lg:justify-end" no-wrap>
            <BaseButton
              color="info"
              :icon="mdiEye"
              small
              @click="isModalActive = true"
            />
            <BaseButton
              color="danger"
              :icon="mdiTrashCan"
              small
              @click="isModalDangerActive = true"
            />
          </BaseButtons>
        </td>
      </tr>
    </tbody>
  </table>
  <!-- <div class="p-3 lg:px-6 border-t border-gray-100 dark:border-slate-800">
    <BaseLevel>
      <BaseButtons>
        <BaseButton
          v-for="page in pagesList"
          :key="page"
          :active="page === currentPage"
          :label="page + 1"
          :color="page === currentPage ? 'lightDark' : 'whiteDark'"
          small
          @click="currentPage = page"
        />
      </BaseButtons>
      <small>Page {{ currentPageHuman }} of {{ numPages }}</small>
    </BaseLevel>
  </div> -->
</template>
