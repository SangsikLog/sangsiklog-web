<script setup lang="ts">
import {defineProps, defineEmits, ref, onMounted} from 'vue';
import {useContentStore} from "@/stores/content";

const { getCategoryList } = useContentStore();

const props = defineProps({
  showRegisterKnowledgeModal: Boolean
});

const emit = defineEmits(['update:showRegisterKnowledgeModal']);

const closeModal = () => {
  emit("update:showRegisterKnowledgeModal", false);
};

const register = () => {
  console.log("Registering knowledge...");
  closeModal();
};

const titleRules = ref([
  (v: string) => !!v || '제목을 입력해주세요.'
]);
const descriptionRules = ref([
  (v: string) => !!v || '설명을 입력해주세요.'
]);
const categoryRules = ref([
  (v: string) => !!v || '카테고리를 선택해주세요.'
]);

const categoryItems =  ref([]);
async function requestGetCategoryList() {
  getCategoryList()
      .then((response) => {
        let data = response.data;
        categoryItems.value = data.getCategoryList.categoryList;
      })
      .catch((error) => {
        console.log(error);
      })
}

onMounted(() => {
  requestGetCategoryList();
});
</script>

<template>
  <v-dialog v-model="props.showRegisterKnowledgeModal" max-width="500" @click:outside="closeModal">
    <v-card rounded="lg">
      <v-card-title class="d-flex justify-space-between align-center bg-primary">
        <div class="text-h2 ps-2">
          여러분의 상식을 알려주세요! 👏
        </div>
      </v-card-title>

      <v-divider class="mb-4"></v-divider>

      <v-card-text>
        <v-text-field
            :rules="titleRules"
            label="제목"
            variant="outlined"
        ></v-text-field>

        <v-textarea
            :rules="descriptionRules"
            label="설명"
            :counter="300"
            class="mb-2"
            rows="2"
            variant="outlined"
            persistent-counter
        ></v-textarea>

        <v-select
            :rules="categoryRules"
            label="카테고리"
            :items="categoryItems"
            item-title="name"
            item-value="id"
            variant="outlined"
        ></v-select>
      </v-card-text>

      <v-divider class="mt-2"></v-divider>

      <v-card-actions class="my-2 d-flex justify-end">
        <v-btn
            class="text-none"
            rounded="xl"
            text="취소"
            @click="closeModal"
        ></v-btn>

        <v-btn
            class="text-none"
            color="primary"
            rounded="xl"
            text="등록"
            variant="flat"
            @click="register"
        ></v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>