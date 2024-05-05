<script setup lang="ts">

import UserAvatar from "./UserAvatar.vue";

import { useUserStore } from "../stores/useUserStore";

const userStore = useUserStore()

const imgsrc: string = 'https://picsum.photos/200'

</script>

<template>
  <UserAvatar :username="userStore.name" :avatar=imgsrc>
    <slot />
  </UserAvatar>
</template>
