<script setup lang="ts">
import { containerMaxW } from "../config";
import BaseLevel from "../components/BaseLevel.vue";
import Logo from "../components/JustboilLogo.vue";

const year = new Date().getFullYear();
</script>

<template>
  <footer class="py-2 px-6" :class="containerMaxW">
    <BaseLevel>
      <div class="text-center md:text-left">
        <b
          >&copy;{{ year }},
          <a href="https://github.com/Daniel-Ruan" target="_blank">Daniel-Ruan</a>.</b
        >
        <slot />
      </div>
      <div class="md:py-2">
        <a href="https://www.mpu.edu.mo/zh/index.php">
          <Logo class="w-auto h-36 md:h-12" />
        </a>
      </div>
    </BaseLevel>
  </footer>
</template>
