<script setup lang="ts">
import {computed, onMounted, ref, watch} from 'vue';
import { AwardFilledIcon } from 'vue-tabler-icons';
import { useContentStore } from "@/stores/content";
import KnowledgeDetailModal from "@/views/main/modal/KnowledgeDetailModal.vue";
import type { Knowledge } from "@/interfaces/Content";

const knowledgeList = ref<Knowledge[]>([]);
const totalKnowledgeCount = ref(0);

const showKnowledgeDetailModal = ref(false);
const selectedKnowledgeTitle = ref("");
const selectedKnowledgeDescription = ref("");

const { getKnowledgeList, searchKnowledge } = useContentStore();

const contentStore = useContentStore();

const pageSize = 20;
const currentPage = ref(1);

const totalPages = computed(() => {
  return Math.ceil(totalKnowledgeCount.value / pageSize);
});

const fetchData = () => {
  if (contentStore.searchQuery != '') {
    requestSearchKnowledge(currentPage.value, pageSize)
  } else {
    requestGetKnowledgeList(currentPage.value, pageSize)
  }
};

async function requestGetKnowledgeList(page: number, size: number) {
  getKnowledgeList(page, size, "createdAt", "DESC")
      .then((response) => {
        let data = response.data;
        knowledgeList.value = data.getKnowledgeList.knowledgeList
        totalKnowledgeCount.value = data.getKnowledgeList.pagerInfo.totalCount
      })
      .catch((error) => {
        console.log(error);
      })
}

async function requestSearchKnowledge(page: number, size: number) {
  searchKnowledge(contentStore.searchQuery, page, size)
      .then((response) => {
        let data = response.data;
        knowledgeList.value = data.searchKnowledge.knowledgeList
        totalKnowledgeCount.value = data.searchKnowledge.pagerInfo.totalCount
      })
      .catch((error) => {
        console.log(error);
      })
}

const openKnowledgeDetailModal = (knowledge: Knowledge) => {
  selectedKnowledgeTitle.value = knowledge.title;
  selectedKnowledgeDescription.value = knowledge.description;
  showKnowledgeDetailModal.value = true;
};

const query = computed(() => contentStore.searchQuery);

watch(query, () => {
  requestSearchKnowledge(1, pageSize)
});

onMounted(() => {
  if (contentStore.searchQuery !== '') {
    requestSearchKnowledge(1, pageSize)
  } else {
    requestGetKnowledgeList(1, pageSize)
  }
});
</script>

<template>
  <v-card elevation="0">
    <v-card variant="outlined">
      <v-card-text>
        <div class="d-flex align-center">
          <h3 class="text-h3 mt-1">
            상식 둘러보기
          </h3>
        </div>

        <div class="mt-4">
          <v-list lines="two" class="py-0">
            <v-list-item v-for="(knowledge, i) in knowledgeList" :key="i" :value="knowledge" color="secondary" rounded="sm" @click="openKnowledgeDetailModal(knowledge)">
              <template v-slot:append>
                <AwardFilledIcon class="text-gold" style="vertical-align: sub"/>
              </template>
              <div class="d-inline-flex align-center justify-space-between w-100">
                <div>
                  <h6 class="text-subtitle-1 text-medium-emphasis font-weight-bold">
                    {{ knowledge.title }}
                  </h6>
                </div>

                <div class="ml-auto text-subtitle-1 text-medium-emphasis font-weight-bold">{{ knowledge.likeCount }}</div>
              </div>
            </v-list-item>
          </v-list>

          <v-pagination
              v-model="currentPage"
              :length="totalPages"
              @update:modelValue = "fetchData"
          ></v-pagination>
        </div>
      </v-card-text>
    </v-card>
  </v-card>

  <KnowledgeDetailModal
      :showKnowledgeDetailModal="showKnowledgeDetailModal"
      :title="selectedKnowledgeTitle"
      :description="selectedKnowledgeDescription"
      @update:showKnowledgeDetailModal="showKnowledgeDetailModal = $event"
  />
</template>
