<template>
  <div class=""> <img :src="src" class="flex-initial justify-items-center ml-2 w-36 h-36 p-1 pt-2 object-cover rounded-2xl pointer-events-auto"> </div>

</template>
  
  <script lang='ts'>
  import { defineComponent } from 'vue';
  
  export default defineComponent({
    name: 'ViewBox',
    props: {
      src: {
        type: String,
        required: true,
      },
    },
  });
  </script>
  
  <style lang="scss">
  .view-box {
    display: inline-block;
    width: 100px;
    height: 100px;
    margin-right: 20px;
    margin-bottom: 20px;
    cursor: pointer;
    object-fit: cover;
  }
  </style>
  