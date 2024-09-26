<script setup lang="ts">
import { SquarePlusIcon } from "vue-tabler-icons";
import { useContentStore } from "@/stores/content";
import { onMounted, ref } from "vue";
import KnowledgeDetailModal from "@/views/main/modal/KnowledgeDetailModal.vue";
import RegisterKnowledgeModal from "@/views/main/modal/RegisterKnowledgeModal.vue";

const { getDailyKnowledge } = useContentStore();
const dailyKnowledgeTitle = ref("");
const dailyKnowledgeDescription = ref("");
const showKnowledgeDetailModal = ref(false);
const showRegisterKnowledgeModal = ref(false);

async function requestGetDailyKnowledge() {
  getDailyKnowledge()
      .then((response) => {
        let data = response.data;
        dailyKnowledgeTitle.value = data.getDailyKnowledge.title;
        dailyKnowledgeDescription.value = data.getDailyKnowledge.description;
      })
      .catch((error) => {
        console.log(error);
      })
}

const openKnowledgeDetailModal = () => {
  showKnowledgeDetailModal.value = true;
};

const openRegisterKnowledgeModal = () => {
  showRegisterKnowledgeModal.value = true;
};

onMounted(() => {
  requestGetDailyKnowledge();
});

</script>

<template>
  <v-card elevation="0" class="bg-primary overflow-hidden bubble-shape bubble-primary-shape">
    <v-card-text>
      <div class="d-flex align-start mb-6">
        <v-btn icon rounded="sm" color="darkprimary" variant="flat" @click.prevent="openRegisterKnowledgeModal">
          <SquarePlusIcon width="25" />
        </v-btn>
      </div>
      <h2 class="text-h1 font-weight-medium">
        {{ dailyKnowledgeTitle }}
        <a href="#" @click.prevent="openKnowledgeDetailModal">
          <CircleArrowUpRightIcon stroke-width="1.5" width="28" class="text-white" />
        </a>
      </h2>
      <span class="text-subtitle-1 text-medium-emphasis text-white">오늘의 상식</span>
    </v-card-text>
  </v-card>

  <KnowledgeDetailModal
      :showKnowledgeDetailModal="showKnowledgeDetailModal"
      :title="dailyKnowledgeTitle"
      :description="dailyKnowledgeDescription"
      @update:showKnowledgeDetailModal="showKnowledgeDetailModal = $event"
  />

  <RegisterKnowledgeModal
      :showRegisterKnowledgeModal="showRegisterKnowledgeModal"
      @update:showRegisterKnowledgeModal="showRegisterKnowledgeModal = $event"
  />
</template>
