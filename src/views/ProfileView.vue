<script setup lang="ts">
import { useUserStore } from '../stores/useUserStore';
import { useRouter } from 'vue-router';
import { useLongTaskStore } from '../stores/useLongTask';
import { computed, onMounted, ref } from 'vue'
import { alertEmitter } from '../components/rawComponents/Alert.vue';
import { modalEmitter } from '../components/rawComponents/ModalBase.vue'
import CardBoxLongTask from '../components/CardBoxLongTask.vue';
import PillTag from "../components/PillTag.vue";

import { reactive } from "vue";

import {
  mdiAccount,
  mdiAsterisk,
  mdiFormTextboxPassword,
  mdiFormatListBulleted,
  mdiNumeric,
} from "@mdi/js";
import SectionMain from "../components/SectionMain.vue";
import CardBox from "../components/CardBox.vue";
import BaseDivider from "../components/BaseDivider.vue";
import FormField from "../components/FormField.vue";
import FormControl from "../components/FormControl.vue";
import FormFilePicker from "../components/FormFilePicker.vue";
import BaseButton from "../components/BaseButton.vue";
import BaseButtons from "../components/BaseButtons.vue";
import UserCard from "../components/UserCard.vue";
import LayoutAuthenticated from "../layouts/LayoutAuthenticated.vue";
import SectionTitleLineWithButton from "../components/SectionTitleLineWithButton.vue";

const router = useRouter()
const userStore = useUserStore()
const longTaskStore = useLongTaskStore()

const logout = async () => {
  modalEmitter.emit('call-confirm-modal', {
    title: 'Attention',
    message: 'Do you really want to logout?',
    onModalConfirm: () => {
      userStore.removeUser()
      router.push('/')
    }
  })
}

onMounted(async () => {
    longTaskStore.getLongTasks()
})

const userlongTaskList = computed(() => {
    return longTaskStore.longTaskList
})

const todayLongTask = computed(() => {
  return longTaskStore.getTodayTaskNumber(userlongTaskList.value)
})



const historyLongTask = computed(() => {
  return longTaskStore.getHistoryTaskNumber(userlongTaskList.value)
})





//
const userSetting = computed(() => {
  return userStore.isDisplaySettings
})


const passwordForm = reactive({
  password_current: "",
  password: "",
  password_confirmation: "",
});

const submitPass = () => {
  //
};
</script>

<template>
  <LayoutAuthenticated>
    <SectionMain>
      <SectionTitleLineWithButton :icon="mdiAccount" title="User Profile" main>
      </SectionTitleLineWithButton>

      <UserCard class="mb-6" />



      <div v-if="userSetting" class="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <CardBox>
          <FormField label="Profile Photo" help="Max 500kb">
            <FormFilePicker label="Upload" />
          </FormField>
          <FormField label="Name" help="Required. Your name">
            <FormControl
              :icon="mdiAccount"
              name="username"
              required
              autocomplete="username"
            />
          </FormField>
          <FormField label="Age" help="Required. Your age">
            <FormControl
              :icon="mdiNumeric"
              type="age"
              name="age"
              required
              autocomplete="age"
            />
          </FormField>
          <FormField label="Daily Workload" help="The default is 10 questions per day">
            <FormControl
              :icon="mdiNumeric"
              type="Workload"
              name="Workload"
              required
              autocomplete="Workload"
            />
          </FormField>

          <template #footer>
            <BaseButtons>
              <BaseButton color="info" type="submit" label="Submit" />
              <BaseButton color="info" label="Cancel" outline />
            </BaseButtons>
          </template>
        </CardBox>

        <CardBox is-form @submit.prevent="submitPass">
          <FormField
            label="Current password"
            help="Required. Your current password"
          >
            <FormControl
              v-model="passwordForm.password_current"
              :icon="mdiAsterisk"
              name="password_current"
              type="password"
              required
              autocomplete="current-password"
            />
          </FormField>

          <BaseDivider />

          <FormField label="New password" help="Required. New password">
            <FormControl
              v-model="passwordForm.password"
              :icon="mdiFormTextboxPassword"
              name="password"
              type="password"
              required
              autocomplete="new-password"
            />
          </FormField>

          <FormField
            label="Confirm password"
            help="Required. New password one more time"
          >
            <FormControl
              v-model="passwordForm.password_confirmation"
              :icon="mdiFormTextboxPassword"
              name="password_confirmation"
              type="password"
              required
              autocomplete="new-password"
            />
          </FormField>

          <template #footer>
            <BaseButtons>
              <BaseButton type="submit" color="info" label="Submit" />
              <BaseButton color="info" label="Cancel" outline />
            </BaseButtons>
          </template>
        </CardBox>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <div class="flex flex-col justify-start">
          <PillTag class="text-2xl"
            color="info"
            label="Current task"
            :small="false"
            :outline="true"
            :icon="mdiFormatListBulleted"
          />
          <CardBoxLongTask
            v-for="(longTask, index) in todayLongTask"
              :key="index"
              :id="longTask.id"
              :longTaskName="longTask.LongTaskName"
              :CertainDay="longTask.CertainDay"
              :type="longTask.category"
              :createTime="longTask.create_time"
              :task-progress="longTask.taskProgress"
          />
        </div>
        <div class="flex flex-col justify-start">
          <PillTag class="text-2xl"
            color="info"
            label="History & Finished task"
            :small="false"
            :outline="true"
            :icon="mdiFormatListBulleted"
          />
          <CardBoxLongTask
            v-for="(longTask, index) in historyLongTask"
              :key="index"
              :id="longTask.id"
              :longTaskName="longTask.LongTaskName"
              :CertainDay="longTask.CertainDay"
              :type="longTask.category"
              :createTime="longTask.create_time"
              :task-progress="longTask.taskProgress"
          />
        </div>
        <!-- <CardBoxLongTask
        /> -->
        


      </div>



    </SectionMain>
  </LayoutAuthenticated>
</template>
