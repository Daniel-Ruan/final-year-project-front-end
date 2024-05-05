<script setup lang="ts">
import { computed } from "vue";
import {
  mdiForest,
  mdiBeaker,
  mdiAtom,
  mdiBookOpenPageVariant 
} from "@mdi/js";
import CardBox from "./CardBox.vue";
import BaseLevel from "./BaseLevel.vue";
import PillTag from "./PillTag.vue";
import IconRounded from "./IconRounded.vue";
import { useRouter } from 'vue-router'
import { useQuestionDeckStore } from '../stores/useQuestionDeckStore';

// const questionDeckStore = useQuestionDeckStore()
// const QuestionListStatus0 = computed(() => {
//     return questionDeckStore.getQuestionListByQuestionDeckStatus(0)
// })

// const QuestionListStatus1 = computed(() => {
//     return questionDeckStore.getQuestionListByQuestionDeckStatus(1)
// })

// const QuestionListStatus2 = computed(() => {
//     return questionDeckStore.getQuestionListByQuestionDeckStatus(2)
// })

// const QuestionListStatus3 = computed(() => {
//     return questionDeckStore.getQuestionListByQuestionDeckStatus(3)
// })

// const QuestionListStatus4 = computed(() => {
//     return questionDeckStore.getQuestionListByQuestionDeckStatus(4)
// })

// const QuestionListStatus5 = computed(() => {
//     return questionDeckStore.getQuestionListByQuestionDeckStatus(5)
// })

const router = useRouter()

const openLongTask = async () => {
    router.push(`/longTasks/${props.id}`)
}

const props = defineProps({
  id: {
    type: Number,
    required: true,
  },
  longTaskName: {
    type: String,
    required: true,
  },
  CertainDay: {
    type: Number,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  createTime: {
    type: String,
    required: true,
  },
  taskProgress: {
    type: Number,
    required: true,
  }
});

const icon = computed(() => {
  if (props.type === "Biology") {
    return {
      icon: mdiForest,
      type: "success",
    };
  } else if (props.type === "Physics") {
    return {
      icon: mdiAtom,
      type: "warning",
    };
  } else if (props.type === "Chemistry") {
    return {
      icon: mdiBeaker,
      type: "info",
    };
  }

  return {
    icon: mdiBookOpenPageVariant,
    type: "danger",
  };
});
</script>

<template>
<div @click="openLongTask">
  <CardBox class="mb-6 last:mb-0" is-hoverable>
    <BaseLevel>
      <BaseLevel type="justify-start">
        <IconRounded :icon="icon.icon" :color="icon.type" class="md:mr-6" />
        <div class="text-center space-y-1 md:text-left md:mr-6">
          <h4 class="text-xl">{{ longTaskName }}</h4>
          <p class="text-gray-500 dark:text-slate-400">
            Already studied for <b>{{ CertainDay }}</b> days.
          </p>
        </div>
      </BaseLevel>
      <div class="text-center md:text-right space-y-2">
        <p class="text-sm text-gray-500">
            Created at {{ createTime }}
        </p>
        <div>
          <PillTag :color="icon.type" :label="type" small />
        </div>
        <div ><progress 
            class=" lg:w-full"
            max="100"
            :value="taskProgress">
        </progress></div>
      </div>
    </BaseLevel>
  </CardBox>
</div>
</template>
