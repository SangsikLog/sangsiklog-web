<script setup lang="ts">
import { computed, ref } from 'vue';
import { CircleArrowDownLeftIcon } from 'vue-tabler-icons';
import iconCard from '@/assets/images/icons/icon-card.svg';

const tab = ref('1');

const chartOptions1 = computed(() => {
  return {
    chart: {
      type: 'bar',
      height: 90,
      fontFamily: `inherit`,
      foreColor: '#a1aab2',
      sparkline: {
        enabled: true
      }
    },
    dataLabels: {
      enabled: false
    },
    colors: ['#fff'],
    fill: {
      type: 'solid',
      opacity: 1
    },
    stroke: {
      curve: 'smooth',
      width: 3
    },
    yaxis: {
      min: 0,
      max: 100
    },
    tooltip: {
      theme: 'dark',
      fixed: {
        enabled: false
      },
      x: {
        show: false
      },
      y: {
        title: {
          formatter: () => '총 상식 수'
        }
      },
      marker: {
        show: false
      }
    }
  };
});

// chart 1
const lineChart1 = {
  series: [
    {
      name: 'series1',
      data: [45, 66, 41, 89, 25, 44, 9, 54, 66, 41, 89, 25, 44, 9, 54]
    }
  ]
};

</script>

<template>
  <v-card elevation="0" class="bg-secondary overflow-hidden bubble-shape bubble-secondary-shape">
    <v-card-text>
      <div class="d-flex align-start mb-6">
        <v-btn icon rounded="sm" color="darksecondary" variant="flat">
          <img :src="iconCard" width="25" />
        </v-btn>
        <div class="ml-auto z-1">
<!--          <v-menu :close-on-content-click="false">-->
<!--            <template v-slot:activator="{ props }">-->
<!--              <v-btn icon rounded="sm" color="secondary" variant="flat" size="small" v-bind="props">-->
<!--                <DotsIcon stroke-width="1.5" width="20" />-->
<!--              </v-btn>-->
<!--            </template>-->
<!--            <v-sheet rounded="md" width="150" class="elevation-10">-->
<!--              <v-list density="compact">-->
<!--                <v-list-item v-for="(item, index) in items" :key="index" :value="index">-->
<!--                  <template v-slot:prepend>-->
<!--                    <component :is="item.icon" stroke-width="1.5" size="20" />-->
<!--                  </template>-->
<!--                  <v-list-item-title class="ml-2">{{ item.title }}</v-list-item-title>-->
<!--                </v-list-item>-->
<!--              </v-list>-->
<!--            </v-sheet>-->
<!--          </v-menu>-->
          <v-tabs v-model="tab" class="theme-tab" density="compact" align-tabs="end">
            <v-tab value="1" hide-slider color="transparent">Month</v-tab>
          </v-tabs>
        </div>
      </div>
      <v-tabs-window v-model="tab" class="z-1">
        <v-tabs-window-item value="1">
          <v-row>
            <v-col cols="6">
              <h2 class="text-h1 font-weight-medium">
                $108
                <a href="#">
                  <CircleArrowDownLeftIcon stroke-width="1.5" width="28" class="text-white" />
                </a>
              </h2>
              <span class="text-subtitle-1 text-medium-emphasis text-white">총 상식 수</span>
            </v-col>
            <v-col cols="6">
              <apexchart type="line" height="90" :options="chartOptions1" :series="lineChart1.series"> </apexchart>
            </v-col>
          </v-row>
        </v-tabs-window-item>
      </v-tabs-window>
    </v-card-text>
  </v-card>
</template>
