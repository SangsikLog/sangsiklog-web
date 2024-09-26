<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { AwardFilledIcon } from 'vue-tabler-icons';
import { useContentStore } from "@/stores/content";
import KnowledgeDetailModal from "@/views/main/modal/KnowledgeDetailModal.vue";

const popularKnowledgeList = ref([]);
const showKnowledgeDetailModal = ref(false);
const selectedKnowledgeTitle = ref("");
const selectedKnowledgeDescription = ref("");

const { getPopularKnowledgeList } = useContentStore();

async function requestGetPopularKnowledgeList() {
  getPopularKnowledgeList()
      .then((response) => {
        let data = response.data;
        popularKnowledgeList.value = data.getPopularKnowledgeList.knowledgeList
      })
      .catch((error) => {
        console.log(error);
      })
}

const openKnowledgeDetailModal = (popularKnowledge) => {
  selectedKnowledgeTitle.value = popularKnowledge.title;
  selectedKnowledgeDescription.value = popularKnowledge.description;
  showKnowledgeDetailModal.value = true;
};

onMounted(() => {
  requestGetPopularKnowledgeList();
});
</script>

<template>
  <v-card elevation="0">
    <v-card variant="outlined">
      <v-card-text>
        <div class="d-flex align-center">
          <h3 class="text-h3 mt-1">
            인기 상식 TOP10
          </h3>
        </div>

        <div class="mt-4">
          <perfect-scrollbar v-bind:style="{ height: '270px' }">
            <v-list lines="two" class="py-0">
              <v-list-item v-for="(popularKnowledge, i) in popularKnowledgeList" :key="i" :value="popularKnowledge" color="secondary" rounded="sm" @click="openKnowledgeDetailModal(popularKnowledge)">
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

  <KnowledgeDetailModal
      :showKnowledgeDetailModal="showKnowledgeDetailModal"
      :title="selectedKnowledgeTitle"
      :description="selectedKnowledgeDescription"
      @update:showKnowledgeDetailModal="showKnowledgeDetailModal = $event"
  />
</template>
