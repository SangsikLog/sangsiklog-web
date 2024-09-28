<script setup lang="ts">
import { defineProps } from 'vue';
import { LogoutIcon, LoginIcon } from 'vue-tabler-icons';
import { useAuthStore } from '@/stores/auth';
import {router} from "@/router";

const authStore = useAuthStore();

const props = defineProps({
  isLogin: Boolean,
  nickname: String,
  email: String
});

</script>

<template>
  <div class="pa-4" v-if="props.isLogin">
    <h4 class="mb-n1">{{ props.nickname }}님, <span class="font-weight-regular">안녕하세요! 👋</span></h4>
    <span class="text-subtitle-1 text-medium-emphasis">{{ props.email }}</span>

    <v-divider></v-divider>
    <perfect-scrollbar style="height: calc(100vh - 300px); max-height: 60px">

      <v-list class="">
        <v-list-item v-if="props.isLogin" @click="authStore.logout()" color="secondary" rounded="md">
          <template v-slot:prepend>
            <LogoutIcon size="20" class="mr-2" />
          </template>

          <v-list-item-title class="text-subtitle-2"> 로그아웃</v-list-item-title>
        </v-list-item>
      </v-list>
    </perfect-scrollbar>
  </div>
  <div class="pa-4" v-else>
    <h4 class="">로그인이 필요합니다!<span class="font-weight-regular">👇</span></h4>

    <v-divider></v-divider>
    <perfect-scrollbar style="height: calc(100vh - 300px); max-height: 60px">

      <v-list class="">
        <v-list-item @click="router.push('/auth/login')" color="secondary" rounded="md">
          <template v-slot:prepend>
            <LoginIcon size="20" class="mr-2" />
          </template>

          <v-list-item-title class="text-subtitle-2"> 로그인</v-list-item-title>
        </v-list-item>
      </v-list>
    </perfect-scrollbar>
  </div>
</template>
