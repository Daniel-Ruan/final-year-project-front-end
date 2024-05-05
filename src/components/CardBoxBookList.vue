<script setup lang="ts">
import { computed } from "vue";
import { mdiTrendingDown, mdiTrendingUp, mdiTrendingNeutral } from "@mdi/js";
import CardBox from "./CardBox.vue";
import BaseLevel from "./BaseLevel.vue";
import BaseIcon from "./BaseIcon.vue";
import PillTag from "./PillTag.vue";
import UserAvatar from "./UserAvatar.vue";
import { useRouter } from 'vue-router'
import {
    mdiAccountTie,
} from "@mdi/js";

const router = useRouter()

const openBook = async () => {
    router.push(`/books/${props.id}`)
}

const props = defineProps<{
    name: string,
    category: string,
    id: number,
    description: string,
    img: string,
    release_date: string,
    author: string
}>()

</script>

<template>
    <CardBox>
        <BaseLevel class="mb-3" mobile>
            <div @click="openBook" class=" overflow-hidden  aspect-video cursor-pointer rounded-xl relative group">
                <div class="rounded-xl z-50 opacity-0 group-hover:opacity-100 transition duration-300 ease-in-out cursor-pointer absolute from-black/80 to-transparent bg-gradient-to-t inset-x-0 -bottom-2 pt-30 flex items-end">
                    <div>
                        <div class="transform-gpu  p-4 space-y-3 text-xl group-hover:opacity-100 group-hover:translate-y-0 translate-y-4 pb-10 transform transition duration-300 ease-in-out">
                            <div class="font-bold text-2xl">{{ props.author }}</div>
                            <div class="opacity-50 text-xl ">
                                {{ props.category }}
                            </div>
                        </div>
                    </div>
                </div>
                <img class="object-cover w-full group-hover:scale-110 transition duration-300 ease-in-out object-center rounded-lg lg:h-80" :src="'http://localhost:1337' + props.img">  
            </div>
        </BaseLevel>

        <BaseLevel class="mb-3" mobile>
            <h1 class="text-3xl text-justify leading-tight font-semibold">
                {{ props.name }}
            </h1>

        </BaseLevel>

        <BaseLevel class="mb-3" mobile>

            <h3 class="text-lg text-justify leading-tight text-gray-500 dark:text-slate-400">
                {{ props.description }}
            </h3>

        </BaseLevel>

        <BaseLevel class="mb-3" mobile>
            <BaseIcon
                :path="mdiAccountTie"
                size="72"
                w=""
                h="h-16"
            />
            <div>
                <h3 class="capitalize text-2xl text-justify leading-tight font-bold">
                    {{ props.author }}
                </h3>
                <h3 class="text-lg text-justify leading-tight">
                    {{ props.release_date }}
                </h3>

            </div>
        
        </BaseLevel>

    </CardBox>


<!-- <div class=" overflow-hidden  aspect-video bg-white cursor-pointer rounded-xl relative group">
                <div class="rounded-xl z-50 opacity-0 group-hover:opacity-100 transition duration-300 ease-in-out cursor-pointer absolute from-black/80 to-transparent bg-gradient-to-t inset-x-0 -bottom-2 pt-30 text-white flex items-end">
                    <div>
                        <div class="transform-gpu  p-4 space-y-3 text-xl group-hover:opacity-100 group-hover:translate-y-0 translate-y-4 pb-10 transform transition duration-300 ease-in-out">
                            <div class="font-bold">Sarah Jose</div>
                            <div class="opacity-60 text-sm ">
                                {{ props.description }}
                            </div>
                        </div>
                    </div>
                </div>
                <img class="object-cover w-full group-hover:scale-110 transition duration-300 ease-in-out object-center rounded-lg lg:h-80" :src="'http://localhost:1337' + props.img">  
</div> -->

</template>