<script setup lang="ts">
import { computed, ref, watch } from "vue";
import { mdiCheckDecagram } from "@mdi/js";
import BaseLevel from "./BaseLevel.vue";
import UserAvatarCurrentUser from "./UserAvatarCurrentUser.vue";
import CardBox from "./CardBox.vue";
import FormCheckRadio from "./FormCheckRadio.vue";
import PillTag from "./PillTag.vue";

import { useUserStore } from '../stores/useUserStore';
import { useRouter } from 'vue-router';
import { useLongTaskStore } from '../stores/useLongTask';

const userStore = useUserStore()
const router = useRouter()
const longTaskStore = useLongTaskStore()

const userlongTaskList= computed(() => {
    return longTaskStore.longTaskList
})

const longTaskUpdateTimeArr = computed(() => {
  return longTaskStore.getUpdateTimeArr(userlongTaskList.value)
})

const lastUpdateTime = computed(() => {
  return longTaskStore.getLastUpdateTime(longTaskUpdateTimeArr.value)

})
const displaylastUpdateTime = computed(() => {
  if(lastUpdateTime.value != "null date") {
    return true
  }else {
    return false
  }
})

const todayLongTask = computed(() => {
  return longTaskStore.getTodayTaskNumber(userlongTaskList.value)
})



const userSwitchVal = ref(false);

watch(userSwitchVal, () => {
  userStore.storeDisplayButton(userSwitchVal.value)
}) 
</script>

<template>
  <CardBox>
    <BaseLevel type="justify-around lg:justify-center">
      <UserAvatarCurrentUser class="lg:mx-12" />
      <div class="space-y-3 text-center md:text-left lg:mx-12">

        <h1 class="text-2xl">
          Howdy, <b>{{ userStore.name }}</b
          >!
        </h1>
        <p v-if="displaylastUpdateTime">Welcome back, the last study date was on <b>{{lastUpdateTime}}</b>. We have <b>{{ todayLongTask.length }}</b> tasks to complete today!</p>
        <p v-else>Oh, you don't have any study records yet, just start studying today!</p>
        <div class="flex justify-center md:block">
          <FormCheckRadio
            v-model="userSwitchVal"
            name="notifications-switch"
            type="switch"
            label="Display Settings"
            :input-value="true"
          />
        </div>
        <!-- <div class="flex justify-center md:block">
          <PillTag label="Verified" color="info" :icon="mdiCheckDecagram" />
        </div> -->
      </div>
    </BaseLevel>
  </CardBox>
</template>
