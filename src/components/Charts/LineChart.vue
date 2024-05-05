<script setup lang="ts">
import { ref, watch, computed, onMounted } from "vue";
import {
  Chart,
  LineElement,
  PointElement,
  LineController,
  LinearScale,
  CategoryScale,
  Tooltip,
} from "chart.js";

const props = defineProps({
  data: {
    type: Object,
    required: true,
  },
});

const root = ref(null);

let chart;

Chart.register(
  LineElement,
  PointElement,
  LineController,
  LinearScale,
  CategoryScale,
  Tooltip
);

onMounted(() => {
  chart = new Chart(root.value, {
    type: "line",
    data: props.data,
    options: {
      responsive: true,
      maintainAspectRatio: true,
      scales: {
        y: {
          display: true,
          title: {
            display: true,
            text: 'Accuracy of quiz (%)'
          }
          
        },
        x: {
          display: true,
          title: {
            display: true,
            text: 'Last seven exercise records'
          }
        },
      },
      plugins: {
        legend: {
          display: true,
        },
      },
    },
  });
});

const chartData = computed(() => props.data);

watch(chartData, (data) => {
  if (chart) {
    chart.data = data;
    chart.update();
  }
});
</script>

<template>
  <canvas ref="root" />
</template>
