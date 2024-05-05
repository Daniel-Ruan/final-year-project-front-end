<script lang="ts">

import { computed, onMounted, onUpdated, ref, watch, triggerRef, reactive, defineComponent, defineProps } from 'vue';
import HoverCard from './HoverCard.vue'

export default defineComponent({    
    name: 'HoverLink',
    props: {
        text: {
            type: String,
            required: true,
        },
        wikiUrl: {
            type: String,
            required: true,
        },
        imageUrl: {
            type: String,
            required: true,
        },
        KeyWord: {
            type: String,
            required: true,
        },
        KeyWordDescription: {
            type: String,
            required: true,
        },
    },
    components: {
        HoverCard,
    },
    setup(_, { emit }) {
        const hover = ref(true);

        function handleMouseOver() {
            hover.value = true;
            emit('hover-changed', hover.value);
        }
        function handleMouseLeave() {
            hover.value = false;
            emit('hover-changed', hover.value);
        }

        return {
            hover,
            handleMouseOver,
            handleMouseLeave,
        };
    }
});

</script>

<template>
    <a :href="wikiUrl" class="hover-link" @mouseover="hover = true" @mouseleave="hover = false">
        {{ text }}
        <HoverCard v-if="hover" :imageUrl="imageUrl" :KeyWord="KeyWord" :KeyWordDescription="KeyWordDescription" />
    </a>

</template>


<style scoped>
.hover-link {
  position: relative;
  text-decoration: none;
  color: inherit;
}
</style>