<script setup lang="ts">
import {router} from "@/router";

const props = defineProps({
  showLoginModal: Boolean
});

const emit = defineEmits(["update:showLoginModal"]);

const closeModal = () => {
  emit("update:showLoginModal", false);
};

</script>

<template>
  <v-dialog :model-value="props.showLoginModal" max-width="500" @click:outside="closeModal">
    <v-card rounded="lg">
      <v-card-title class="d-flex justify-space-between align-center">
        <div class="text-h2 text-medium-emphasis ps-2">
          로그인이 필요합니다!
        </div>
      </v-card-title>

      <v-divider class="mb-4"></v-divider>

      <v-card-text>
        <div class="text-high-emphasis mb-2">
          로그인을 하고 상식 추가를 계속해주세요 👋
        </div>
      </v-card-text>

      <v-divider class="mt-2"></v-divider>

      <v-card-actions class="my-2 d-flex justify-end">
        <v-btn
            class="text-none"
            color="primary"
            rounded="xl"
            text="로그인 하러 가기"
            variant="flat"
            @click="router.push('/auth/login')"
        ></v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>