<script setup lang="ts">
import SectionTitle from "../components/SectionTitle.vue";
import SectionMain from "../components/SectionMain.vue";
import LayoutAuthenticated from "../layouts/LayoutAuthenticated.vue";
import { computed, onMounted, onUpdated, ref, watch } from 'vue';
import { useBookStore } from '../stores/useBookStore';
import { useRouterStore } from '../stores/useRouterStore'
import { useLongTaskStore } from '../stores/useLongTask'
import { useQuestionDeckStore } from '../stores/useQuestionDeckStore';
import { useRoute } from 'vue-router'
import { alertEmitter } from '../components/rawComponents/Alert.vue';
import { useUserStore } from '../stores/useUserStore';
import { PhotoProvider, PhotoConsumer, PhotoSlider } from 'vue3-photo-preview';
import ViewBox from "../components/rawComponents/ViewBox.vue";
import { useRouter } from 'vue-router'
import 'vue3-photo-preview/dist/index.css';
import type { Ref } from 'vue'
import Datepicker from 'vue3-datepicker'
import PdfApp from "vue3-pdf-app";
import "vue3-pdf-app/dist/icons/main.css";
import FormCheckRadio from "../components/FormCheckRadio.vue";

import { mdiBallotOutline,mdiRename, mdiNumeric, mdiMonitorCellphone   } from "@mdi/js";
import CardBox from "../components/CardBox.vue";
import FormField from "../components/FormField.vue";
import FormControl from "../components/FormControl.vue";
import BaseDivider from "../components/BaseDivider.vue";
import BaseButton from "../components/BaseButton.vue";
import SectionTitleLineWithButton from "../components/SectionTitleLineWithButton.vue";
import NotificationBar from "../components/NotificationBar.vue";
const router = useRouter()
const routerStore = useRouterStore()
const route = useRoute()

const bookStore = useBookStore()
const userStore = useUserStore()
const longTaskStore = useLongTaskStore()
const questionDeckStore = useQuestionDeckStore()

const write_time: Ref<Date> = ref(new Date())


const write_timedateformater = computed(() => {
    const detaformat3 = write_time.value.toLocaleDateString().replace(new RegExp('/', 'g'), '-')

    const detaformat4 = formatDate(detaformat3)
    
    return detaformat4
})

const questionStatus: number = 0

const RepeatCounter: number = 0



let showaddress = ref(false)

const currentBook = computed(() => {
    return bookStore.currentBook
})

const booksAllList = computed(() => {
    return bookStore.getBookListSlice(0, 1000)
})

const img_group = computed(() => {
    return currentBook.value.b_images
})

const pdf = computed(() => {
    return currentBook.value.pdf
})

const question_group = computed(() => {
    return currentBook.value.b_questions
})

const longTaskName : Ref<string> = ref('')

const finish_date : Ref<Date> = ref(new Date())

const create_time : Ref<Date> = ref(new Date())

const update_time : Ref<Date> = ref(new Date())

const learningCycleDays : Ref<number> = ref(15)

const finish_dateTest = "2023-02-26"


const dateformaterfinish_date = computed(() => {
    const detaformat = finish_date.value.toLocaleDateString().replace(new RegExp('/', 'g'), '-')

    const detaformat2 = formatDate(detaformat)
    
    return detaformat2
})

const dateformatercreate_time = computed(() => {
    const detaformat3 = create_time.value.toLocaleDateString().replace(new RegExp('/', 'g'), '-')

    const detaformat4 = formatDate(detaformat3)
    
    return detaformat4
})

const dateformaterupdate_time = computed(() => {
    const detaformat5 = update_time.value.toLocaleDateString().replace(new RegExp('/', 'g'), '-')

    const detaformat6 = formatDate(detaformat5)
    
    return detaformat6
})

    



const learningCycleDaysTest = 15

onMounted(async () => {
    bookStore.getBook(parseInt(route.params.id as string))
    // console.log(777, imgList)
    // console.log(999, bookStore.currentBook.b_id)
})

onUpdated(async () => {

    watch(() => route.params, async () => {
        bookStore.getBook(parseInt(route.params.id as string))
        // router.go(0)
    })
})

const createLongTask = async () => {
    if(userStore.id == -1) {
        routerStore.setNextRoute(route.path)
        router.push('/sign-in')
        return
    }
    // question_group.value.forEach((question) => {
   
    // })

    const info = await longTaskStore.postLongTask(bookStore.currentBook.b_id, longTaskName.value.toString(), dateformaterfinish_date.value, learningCycleDays.value, dateformatercreate_time.value, dateformaterupdate_time.value, bookStore.currentBook.b_category)
    //, finish_dateTest, learningCycleDaysTest

    if (info == 'ok') {
        alertEmitter.emit('call-alert', {
            title: 'SUCCESS',
            body: 'A new longTask already created',
            keep: 2000
        })
    }

    router.push('/profile')
}

const closewindow = async () => {
    if( showaddress.value == true) {
        showaddress.value = false
    }
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

const userSwitchVal = ref(false);

const userSwitchVal2 = ref(false);




</script>

<script lang="ts">
export default {
    methods: {
        data() {
            return {};
        },
        closewindows() {
            this.$emit('clickit');
        },
    },
};
</script>

<template>
  <LayoutAuthenticated>
    <div class="hidden">
        <div>dateformaterfinish_date{{ dateformaterfinish_date }}</div>
        <div>dateformaterupdate_time{{ dateformaterupdate_time }}</div>
        <div>dateformatercreate_time{{ dateformatercreate_time }}</div>


        {{ question_group }}
        {{ bookStore.currentBook.b_id }}
        {{ longTaskName }}
        {{ finish_date }}
        {{ dateformaterfinish_date }}
    </div>

    <SectionTitle>PDF reader</SectionTitle>
    <SectionMain>
      <div
        class="md:w-full shadow-2xl md:mx-auto rounded-3xl border-8 border-white overflow-hidden"
      >
      <PdfApp 
        :pdf="'http://localhost:1337'+ pdf"
        style="height: 90vh"
        >

      </PdfApp>
      </div>
    </SectionMain>

    <SectionTitle first>Book Images
        <div class="flex items-center justify-center mt-6">
          <FormCheckRadio
            v-model="userSwitchVal2"
            name="notifications-switch"
            type="switch"
            label="Display Book Images"
            :input-value="true"
          />
      </div>
    </SectionTitle>

    <SectionMain v-if="userSwitchVal2">
        <div
            class="md:w-full shadow-2xl md:mx-auto rounded-3xl border-8 border-white overflow-hidden"
        >
        <photo-provider class="">
            <photo-consumer v-for="src in img_group" :intro="'http://localhost:1337' + src" :key="src" :src="'http://localhost:1337' + src">
                <view-box :src="'http://localhost:1337' + src" />
            </photo-consumer>
        </photo-provider>
      </div>
    </SectionMain>

    <NotificationBar color="info" :icon="mdiMonitorCellphone" class="w-full text-2xl">
        If you like this <b>book</b>, come and <b>study</b> it!
      </NotificationBar>

    <SectionTitle>
      <!-- <h1 class="text-2xl text-gray-500 dark:text-slate-400">If you like this book too, come and study it!</h1> -->

      <div class="flex items-center justify-center mt-6">
          <FormCheckRadio
            v-model="userSwitchVal"
            name="notifications-switch"
            type="switch"
            label="Display table"
            :input-value="true"
          />
      </div>
    </SectionTitle>


    <SectionMain v-if="userSwitchVal">
      <SectionTitleLineWithButton
        :icon="mdiBallotOutline"
        title="Create Study Task Forms"
        main
      >
      </SectionTitleLineWithButton>
      <CardBox form>
        <FormField label="Enter the name of the task and the length of the review cycle.">
          <FormControl v-model="longTaskName" type="text" placeholder="Study task name" id="longTaskName" :icon="mdiRename" />
          <FormControl v-model="learningCycleDays" type="text" placeholder="15 is the best review period" id="learningCycleDays" :icon="mdiNumeric" />
        </FormField>

        <FormField label="Choose a deadline">
            <Datepicker class="w-full dark:bg-slate-800 border-slate-600 rounded" v-model="finish_date" />
        </FormField>

        <BaseDivider />

        <template #footer>
          <BaseButton
            label="Create"
            color="contrast"
            @click="createLongTask"
          />
        </template>
      </CardBox>
    </SectionMain>

    

  </LayoutAuthenticated>
</template>
