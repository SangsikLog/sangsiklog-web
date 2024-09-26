<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { ReportIcon, ActivityIcon } from "vue-tabler-icons";
import { useContentStore } from "@/stores/content";

const { getTotalKnowledgeCount } = useContentStore();
const totalKnowledgeCount = ref(0);

async function requestGetTotalKnowledgeCount() {
  getTotalKnowledgeCount()
      .then((response) => {
        let data = response.data;
        totalKnowledgeCount.value = data.getKnowledgeCount.count;
      })
      .catch((error) => {
        console.log(error);
      })
}

onMounted(() => {
  requestGetTotalKnowledgeCount();
});
</script>

<template>
  <v-card elevation="0" class="bg-secondary overflow-hidden bubble-shape bubble-secondary-shape">
    <v-card-text>
      <div class="d-flex align-start mb-6">
        <v-btn icon rounded="sm" color="darksecondary" variant="flat">
          <ReportIcon width="25" />
        </v-btn>
      </div>
      <h2 class="text-h1 font-weight-medium">
        {{ totalKnowledgeCount }} 개 <ActivityIcon stroke-width="1.5" width="28" class="text-white" />
      </h2>
      <span class="text-subtitle-1 text-medium-emphasis text-white">총 상식 수</span>
    </v-card-text>
  </v-card>
</template>
