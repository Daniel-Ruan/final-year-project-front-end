<script lang="ts">
import { defineComponent } from 'vue';
export default defineComponent({    
    name: 'HoverCard',
    props: {
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
        hover: {
            type: Boolean,
            default: true,
        },
    },
});
</script>

<template>
      <div class="hover-card" v-if = "hover">
    <img class="hover-card-image" :src="imageUrl" :alt="imageUrl" />
    <div class="hover-card-info">
      <div class="hover-card-title">{{ KeyWord }}</div>
      <div class="hover-card-content" v-show="hover">{{ KeyWordDescription }}</div>
    </div>
  </div>

</template>


<style scoped>
  .hover-card {
    position: relative;
    display: flex;
    cursor: pointer;
  }
  .hover-card-image {
    /* Add your styles for the image here */
    max-width: 100px;
    max-height: 100px;
    object-fit: cover;
  }
  .hover-card-info {
    margin-left: 10px;
    display: flex;
    flex-direction: column;
  }
  .hover-card-title {
    /* Add your styles for the title here */
  }
  .hover-card-content {
    position: absolute;
    /* Add your styles for the content box here */
    display: none;
  }
</style>