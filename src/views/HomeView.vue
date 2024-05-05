<script setup lang="ts">
import { computed, onMounted, onUpdated, ref, watch } from 'vue';
import {
  mdiAccountMultiple,
  mdiCartOutline,
  mdiChartTimelineVariant,
  mdiMonitorCellphone,
  mdiReload,
  mdiGithub,
  mdiChartPie,
  mdiClipboardTextClockOutline,
  mdiCalendarCheck,
  mdiTooltipQuestion  
} from "@mdi/js";
import * as chartConfig from "../components/Charts/chart.config";
import LineChart from "../components/Charts/LineChart.vue";
import SectionMain from "../components/SectionMain.vue";
import CardBoxWidget from "../components/CardBoxWidget.vue";
import CardBox from "../components/CardBox.vue";
import TableSampleClients from "../components/TableSampleClients.vue";
import NotificationBar from "../components/NotificationBar.vue";
import BaseButton from "../components/BaseButton.vue";
import CardBoxTransaction from "../components/CardBoxTransaction.vue";
import CardBoxClient from "../components/CardBoxClient.vue";
import LayoutAuthenticated from "../layouts/LayoutAuthenticated.vue";
import SectionTitleLineWithButton from "../components/SectionTitleLineWithButton.vue";
import SectionBannerStarOnGitHub from "../components/SectionBannerStarOnGitHub.vue";

import { useUserStore } from '../stores/useUserStore';
import { useRouter } from 'vue-router';
import { useLongTaskStore } from '../stores/useLongTask';
import { useDailyTaskStore } from '../stores/useDailyTask'
import { usePracticeRecordStore } from '@/stores/usePracticeRecord';
import type { Ref } from 'vue'
import { alertEmitter } from '../components/rawComponents/Alert.vue';
import { modalEmitter } from '../components/rawComponents/ModalBase.vue'





const router = useRouter()
const userStore = useUserStore()
const longTaskStore = useLongTaskStore()
const dailyTaskStore = useDailyTaskStore()
const practiceRecordStore = usePracticeRecordStore()

const userpracticeRecord = computed(() => {
  return practiceRecordStore.practiceRecordList
})



const userlongTaskList = computed(() => {
    return longTaskStore.longTaskList
})

const getUpdateArr = computed(() => {
  return longTaskStore.getLongTaskUpdateArr(userlongTaskList.value)
})

const getCreateArr = computed(() => {
  return longTaskStore.getLongTaskCreateArr(userlongTaskList.value)
})

const getStateArr = computed(() => {
  return longTaskStore.getDailyTaskStateArr(userlongTaskList.value).flat()
})

const todayLongTask = computed(() => {
  return longTaskStore.getTodayTaskNumber(userlongTaskList.value)
})

const historyLongTask = computed(() => {
  return longTaskStore.getHistoryTaskNumber(userlongTaskList.value)
})

const DailyTaskRateArr = computed(() => {
  return longTaskStore.getDailyTaskRateArr(userlongTaskList.value)

})

const DailyTaskIDArr = computed(() => {
  return longTaskStore.getDailyTaskIDArr(userlongTaskList.value)

})

const daysBetweenDates =  (date1: string, date2: string): number => {
  const d1 = new Date(date1);
  const d2 = new Date(date2);
  const diffInMilliseconds = Math.abs(d1.getTime() - d2.getTime());
  return Math.floor(diffInMilliseconds / (1000 * 60 * 60 * 24));
};
const countOccurrences = (arr: string[], value: string): number => {
  return arr.filter(item => item === value).length;
};
const getlearningDays = computed(() => {
  if (getUpdateArr.value.length !=0 && getCreateArr.value.length !=0) {
    return daysBetweenDates(getUpdateArr.value[getUpdateArr.value.length-1], getCreateArr.value[0])+1
  } else {
    return 0
  }
  
})

const trueCount = computed(() => {
  return countOccurrences(getStateArr.value, 'true')
})



const datasetObjects = (color: string, dataSet: number[]) => {
  return {
    fill: false,
    borderColor: color,
    borderWidth: 2,
    borderDash: [],
    borderDashOffset: 0.0,
    pointBackgroundColor: color,
    pointBorderColor: "rgba(255,255,255,0)",
    pointHoverBackgroundColor: color,
    pointBorderWidth: 20,
    pointHoverRadius: 4,
    pointHoverBorderWidth: 15,
    pointRadius: 4,
    data: dataSet,
    tension: 0.5,
    cubicInterpolationMode: "default",
  };
};

const colorGroup: string[] = ['#8EF03C', '#F2BA3F', '#DB4B43', '#803FF2', '#3CD3E8']

const getcolorOne = (arr: string[]): string =>{
  const first = arr.shift();
  arr.push(first!);
  return first!
}

const dailyTaskChartData = (RateArr: number[][]) => {
  const labels = [];

  for (let i = 1; i <= 7; i++) {
    labels.push(`${i}`);
  }

  const datasets: any[] =[]
  RateArr.forEach((RateArrone) => {
    datasets.push(datasetObjects(getcolorOne(colorGroup), RateArrone))
  })

  return {
    labels,
    datasets,
  };
}


const chartRateData = ref(null);

const fillChartRateData = () => {
  chartRateData.value = dailyTaskChartData(DailyTaskRateArr.value)
}


const chartData = ref(null);

const fillChartData = () => {
  chartData.value = chartConfig.sampleChartData();
};

onMounted(() => {
  longTaskStore.getLongTasks()
  dailyTaskStore.getDailyTasksList()
  practiceRecordStore.getPracticeRecords()
  fillChartData();
  fillChartRateData();
});

</script>

<template>
  <LayoutAuthenticated>

    <div class="hidden">
      <div>{{ getUpdateArr }}</div>
      <div> {{ userpracticeRecord.length }}</div>
    <div> {{ trueCount }}</div>
    <div>{{ getUpdateArr }}</div>
    <div>{{ getCreateArr }}</div>
    <div>{{ getStateArr }}</div>
    <div> {{ DailyTaskRateArr }}</div>
    <div> {{ getlearningDays }}</div>
    <div>{{ getCreateArr }}</div>
    <div>{{ getUpdateArr }}</div>
    <div>{{ DailyTaskIDArr }}</div>
    <div>{{ DailyTaskRateArr }}</div>
    <div v-for="longTask in userlongTaskList">DailytaskID{{ longTask.DailytaskID }}
      DailytaskRate{{ longTask.DailytaskRate }}</div>
    </div>

    <SectionMain>
      <SectionTitleLineWithButton
        :icon="mdiChartTimelineVariant"
        title="Statistic"
        main
      >
        <!-- <BaseButton
          href="https://github.com/Daniel-Ruan"
          target="_blank"
          :icon="mdiGithub"
          label="Star on GitHub"
          color="contrast"
          rounded-full
          small
        /> -->
      </SectionTitleLineWithButton>

      <div class="grid grid-cols-1 gap-6 lg:grid-cols-3 mb-6">
        <CardBoxWidget
          trend="12%"
          trend-type="up"
          color="text-emerald-500"
          :icon="mdiClipboardTextClockOutline"
          :number="getlearningDays"
          suffix="Days"
          label="Total Learning Days"
        />
        <CardBoxWidget
          trend="12%"
          trend-type="down"
          color="text-blue-500"
          :icon="mdiCalendarCheck"
          :number="trueCount"
          label="Completed Tasks."
        />
        <CardBoxWidget
          trend="Overflow"
          trend-type="alert"
          color="text-red-500"
          :icon="mdiTooltipQuestion "
          :number="userpracticeRecord.length"
          label="Completed Questions"
        />
      </div>

      <!-- <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <div class="flex flex-col justify-between">
          <CardBoxTransaction
            v-for="(transaction, index) in transactionBarItems"
            :key="index"
            :amount="transaction.amount"
            :date="transaction.date"
            :business="transaction.business"
            :type="transaction.type"
            :name="transaction.name"
            :account="transaction.account"
          />
        </div>
        <div class="flex flex-col justify-between">
          <CardBoxClient
            v-for="client in clientBarItems"
            :key="client.id"
            :name="client.name"
            :login="client.login"
            :date="client.created"
            :progress="client.progress"
          />
        </div>
      </div> -->



      <!-- <SectionTitleLineWithButton :icon="mdiChartPie" title="Trends overview">
        <BaseButton
          :icon="mdiReload"
          color="whiteDark"
          @click="fillChartData"
        />
      </SectionTitleLineWithButton>

      <CardBox class="mb-6">
        <div v-if="chartData">
          <line-chart :data="chartData" class="h-96" />
        </div>
      </CardBox> -->

      <SectionTitleLineWithButton :icon="mdiChartPie" title="Accuracy of the last seven days of exercises">
        <BaseButton
          :icon="mdiReload"
          color="whiteDark"
          @click="fillChartRateData"
        />
      </SectionTitleLineWithButton>

      <CardBox class="mb-6">
        <div v-if="chartRateData">
          <line-chart :data="chartRateData" class="h-96" />
        </div>
      </CardBox>

      <SectionTitleLineWithButton :icon="mdiAccountMultiple" title="Clients" />

      <!-- <SectionBannerStarOnGitHub class="mt-6 mb-6" /> -->

      <!-- <NotificationBar color="info" :icon="mdiMonitorCellphone">
        <b>Responsive table.</b> Collapses on mobile
      </NotificationBar> -->

    </SectionMain>
  </LayoutAuthenticated>
</template>
