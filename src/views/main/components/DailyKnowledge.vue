<script setup lang="ts">
import { SquarePlusIcon } from "vue-tabler-icons";
import { useContentStore } from "@/stores/content";
import { onMounted, ref } from "vue";

const { getDailyKnowledge } = useContentStore();
const dailyKnowledgeTitle = ref("");

async function requestGetDailyKnowledge() {
  getDailyKnowledge()
      .then((response) => {
        let data = response.data;
        dailyKnowledgeTitle.value = data.getDailyKnowledge.title;
      })
      .catch((error) => {
        console.log(error);
      })
}

onMounted(() => {
  requestGetDailyKnowledge();
});

</script>

<template>
  <v-card elevation="0" class="bg-primary overflow-hidden bubble-shape bubble-primary-shape">
    <v-card-text>
      <div class="d-flex align-start mb-6">
        <v-btn icon rounded="sm" color="darkprimary" variant="flat">
          <SquarePlusIcon width="25" />
        </v-btn>
      </div>
      <h2 class="text-h1 font-weight-medium">
        {{ dailyKnowledgeTitle }} <a href="#"><CircleArrowUpRightIcon stroke-width="1.5" width="28" class="text-white" /> </a>
      </h2>
      <span class="text-subtitle-1 text-medium-emphasis text-white">오늘의 상식</span>
    </v-card-text>
  </v-card>
</template>
