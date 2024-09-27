<script setup lang="ts">
const props = defineProps({
  showKnowledgeDetailModal: Boolean,
  title: String,
  description: String
});

const emit = defineEmits(["update:showKnowledgeDetailModal"]);

const formatResponseText = (text: string) => {
  return text.split('\n').join('<br/>'); // 줄바꿈 문자를 <br>로 변환
};


const closeModal = () => {
  emit("update:showKnowledgeDetailModal", false);
};
</script>

<template>
  <v-dialog :model-value="props.showKnowledgeDetailModal" max-width="500" @click:outside="closeModal">
    <v-card rounded="lg">
      <v-card-title class="d-flex justify-space-between align-center">
        <div class="text-h2 text-medium-emphasis ps-2">
          {{ props.title }}
        </div>
      </v-card-title>

      <v-divider class="mb-4"></v-divider>

      <v-card-text>
        <div class="text-high-emphasis mb-2" v-html="formatResponseText(props.description)">
        </div>
      </v-card-text>

      <v-divider class="mt-2"></v-divider>

      <v-card-actions class="my-2 d-flex justify-end">
        <v-btn
            class="text-none"
            color="primary"
            rounded="xl"
            text="확인"
            variant="flat"
            @click="closeModal"
        ></v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>