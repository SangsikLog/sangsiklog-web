<script setup lang="ts">
import {ref, computed, onMounted} from 'vue';
import { AwardFilledIcon } from "vue-tabler-icons";
import {useContentStore} from "@/stores/content";

const { getPopularKnowledgeList, getCategoryList } = useContentStore();
let isInitialized = false;

const popularKnowledgeList = ref([]);
async function requestGetPopularKnowledgeList() {
  getPopularKnowledgeList()
      .then((response) => {
        let data = response.data;
        popularKnowledgeList.value = data.getPopularKnowledgeList.knowledgeList;
      })
      .catch((error) => {
        console.log(error);
      })
}

const selectedCategory = ref();
const categoryItems =  ref([]);
async function requestGetCategoryList() {
  getCategoryList()
      .then((response) => {
        let data = response.data;
        categoryItems.value = data.getCategoryList.categoryList;

        if (!isInitialized) {
          selectedCategory.value = categoryItems.value[0];
          isInitialized = true;
        }
      })
      .catch((error) => {
        console.log(error);
      })
}


// chart 1
const chartOptions1 = computed(() => {
  return {
    chart: {
      type: 'bar',
      height: 480,
      fontFamily: `inherit`,
      foreColor: '#a1aab2',
      stacked: true
    },
    colors: ['#1e88e5'],
    responsive: [
      {
        breakpoint: 480,
        options: {
          legend: {
            position: 'bottom',
            offsetX: -10,
            offsetY: 0
          }
        }
      }
    ],
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: '50%'
      }
    },
    xaxis: {
      type: 'category',
      categories: ['역사', '지리', '과학', '기술', '문화', '사회', '스포츠', '건강', '엔터테인먼트', '기타']
    },
    legend: {
      show: true,
      fontFamily: `'Roboto', sans-serif`,
      position: 'bottom',
      offsetX: 20,
      labels: {
        useSeriesColors: false
      },
      markers: {
        width: 16,
        height: 16,
        radius: 5
      },
      itemMargin: {
        horizontal: 15,
        vertical: 8
      }
    },
    fill: {
      type: 'solid'
    },
    dataLabels: {
      enabled: false
    },
    grid: {
      show: true
    },
    tooltip: {
      theme: 'dark'
    }
  };
});

// chart 1
const lineChart1 = {
  series: [
    {
      name: '개수',
      data: [35, 125, 35, 35, 35, 80, 35, 20, 35, 45]
    }
  ]
};

onMounted(() => {
  requestGetPopularKnowledgeList();
  requestGetCategoryList().then(() => {
    selectedCategory.value = categoryItems.value[0];
  });
});
</script>

<template>
  <v-card elevation="0">
    <v-card variant="outlined">
      <v-card-text>
        <v-row>
          <v-col cols="12" sm="9">
            <h3 class="text-h3 mt-1">카테고리별 인기 상식</h3>
          </v-col>
          <v-col cols="12" sm="3">
            <v-select
              color="primary"
              variant="outlined"
              hide-details
              v-model="selectedCategory"
              :items="categoryItems"
              item-title="name"
              item-value="id"
              label="Select"
              persistent-hint
              return-object
              single-line
            >
            </v-select>
          </v-col>
        </v-row>
        <div class="mt-4">
          <apexchart type="bar" height="480" :options="chartOptions1" :series="lineChart1.series"> </apexchart>
          <perfect-scrollbar v-bind:style="{ height: '270px' }">
            <v-list lines="two" class="py-0">
              <v-list-item v-for="(popularKnowledge, i) in popularKnowledgeList" :key="i" :value="popularKnowledge" color="secondary" rounded="sm">
                <template v-slot:append>
                  <AwardFilledIcon class="text-gold" style="vertical-align: sub"/>
                </template>
                <div class="d-inline-flex align-center justify-space-between w-100">
                  <div>
                    <h6 class="text-subtitle-1 text-medium-emphasis font-weight-bold">
                      {{ popularKnowledge.title }}
                    </h6>
                  </div>

                  <div class="ml-auto text-subtitle-1 text-medium-emphasis font-weight-bold">{{ popularKnowledge.likeCount }}</div>
                </div>
              </v-list-item>
            </v-list>
          </perfect-scrollbar>

          <div class="text-center mt-3">
            <v-btn color="primary" variant="text"
            >전체 상식 보러가기
              <template v-slot:append>
                <ChevronRightIcon stroke-width="1.5" width="20" />
              </template>
            </v-btn>
          </div>
        </div>
      </v-card-text>
    </v-card>
  </v-card>
</template>
