<script setup lang="ts">
import { computed, ref, onMounted } from "vue";
import {
  mdiGithub,
  mdiBookOpenPageVariantOutline,
} from "@mdi/js";
import SectionMain from "../components/SectionMain.vue";
import BaseButton from "../components/BaseButton.vue";
import LayoutAuthenticated from "../layouts/LayoutAuthenticated.vue";
import SectionTitleLineWithButton from "../components/SectionTitleLineWithButton.vue";
import CardBoxBookList from "../components/CardBoxBookList.vue";

import { useBookStore } from '../stores/useBookStore';
import { useRoute } from 'vue-router'


const route = useRoute()

const bookStore = useBookStore()

let currentPage  = ref(1)
let itemsPerPage  = ref(10);
let times = ref(1);

onMounted(() => {
    bookStore.getBookList()
});

const booksAllList = computed(() => {
    return bookStore.getBookListSlice(1, 1000)
})

const loadMoreBookList = computed(() => {
    return bookStore.getBookListSlice(0, times.value*itemsPerPage.value)
})

const numberOfPages = computed(() => {
    Math.ceil((booksAllList.value.length || 0) / itemsPerPage.value)
})

const bookList = computed (() => {
    return bookStore.getBookListSlice((currentPage.value * itemsPerPage.value - (itemsPerPage.value)), itemsPerPage.value)
})

function loadMore() {
    times.value += 1
}


</script>

<template>
  <LayoutAuthenticated>
    <SectionMain>
      <SectionTitleLineWithButton
        :icon="mdiBookOpenPageVariantOutline"
        title="Book List"
        main
      >
      </SectionTitleLineWithButton>

      <div class="grid grid-cols-1 gap-6 lg:grid-cols-2 mb-6">
        <CardBoxBookList
            v-for="book in bookList"
            :name="book.b_name"
            :id="book.b_id"
            :category="book.b_category"
            :description="book.b_description"
            :img="book.b_cover"
            :release_date="book.b_release_date"
            :author="book.b_author"
        />
      </div>
    </SectionMain>
  </LayoutAuthenticated>
</template>
