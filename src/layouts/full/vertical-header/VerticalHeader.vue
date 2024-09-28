<script setup lang="ts">
import {onMounted, ref} from 'vue';
import { useCustomizerStore } from '../../../stores/customizer';
// Icon Imports
import { BellIcon, SearchIcon, Menu2Icon } from 'vue-tabler-icons';

// dropdown imports
import NotificationDD from './NotificationDD.vue';
import ProfileDD from './ProfileDD.vue';
import Searchbar from './SearchBarPanel.vue';
import { useAuthStore } from "@/stores/auth";
import { useUserStore } from "@/stores/user";
import type Long from "long";
import type {UserInfo} from "@/interfaces/User";
import {useContentStore} from "@/stores/content";
import {router} from "@/router";

const customizer = useCustomizerStore();
const showSearch = ref(false);
function searchbox() {
  showSearch.value = !showSearch.value;
}

const isLogin = ref(false);
const nickName = ref("");
const email = ref("");

const { authToken, verifyAuthToken, validateAuthToken } = useAuthStore();
const { setSearchQuery } = useContentStore();
const { getUserInfo, initUserInfo } = useUserStore();
const userStore = useUserStore();

async function requestVerifyAuthToken() {
  verifyAuthToken(authToken.token)
      .then((response) => {
        if (response.isValid) {
          getUserId();
        } else {
          initUserInfo(null);
        }
      })
      .catch((error) => {
        console.log(error);
      })
}

async function getUserId() {
  validateAuthToken(authToken.token)
      .then((validateResponse) => {
        requestGetUserInfo(validateResponse.id);
      })
      .catch((error) => {
        console.log(error);
      })
}

async function requestGetUserInfo(userId: Long) {
  const setUserInfo = (userInfo: UserInfo) => {
    isLogin.value = true;
    nickName.value = userInfo.nickname;
    email.value = userInfo.email;
  };

  if (userStore.userInfo) {
    setUserInfo(userStore.userInfo);
    return;
  }

  getUserInfo(userId)
      .then((response) => {
        initUserInfo(response.data.getUser);
        if (userStore.userInfo) {
          setUserInfo(userStore.userInfo);
        }
      })
      .catch((error) => {
        console.log(error);
      })
}

const searchQuery = ref('');
const handleSearch = () => {
  setSearchQuery(searchQuery.value);
  router.push('/knowledge');
};


onMounted(() => {
  requestVerifyAuthToken();
});
</script>

<template>
  <v-app-bar elevation="0" height="80">
    <v-btn
      class="hidden-md-and-down text-secondary"
      color="lightsecondary"
      icon
      rounded="sm"
      variant="flat"
      @click.stop="customizer.SET_MINI_SIDEBAR(!customizer.mini_sidebar)"
      size="small"
    >
      <Menu2Icon size="20" stroke-width="1.5" />
    </v-btn>
    <v-btn
      class="hidden-lg-and-up text-secondary ms-3"
      color="lightsecondary"
      icon
      rounded="sm"
      variant="flat"
      @click.stop="customizer.SET_SIDEBAR_DRAWER"
      size="small"
    >
      <Menu2Icon size="20" stroke-width="1.5" />
    </v-btn>

    <!-- search mobile -->
    <v-btn
      class="hidden-lg-and-up text-secondary ml-3"
      color="lightsecondary"
      icon
      rounded="sm"
      variant="flat"
      size="small"
      @click="searchbox"
    >
      <SearchIcon size="17" stroke-width="1.5" />
    </v-btn>

    <v-sheet v-if="showSearch" class="search-sheet v-col-12">
      <Searchbar :closesearch="searchbox" />
    </v-sheet>

    <!-- ---------------------------------------------- -->
    <!-- Search part -->
    <!-- ---------------------------------------------- -->
    <v-sheet class="mx-3 v-col-3 v-col-xl-2 v-col-lg-4 d-none d-lg-block">
      <Searchbar v-model="searchQuery" @keyup.enter="handleSearch"/>
    </v-sheet>

    <!---/Search part -->

    <v-spacer />
    <!-- ---------------------------------------------- -->
    <!---right part -->
    <!-- ---------------------------------------------- -->

    <!-- ---------------------------------------------- -->
    <!-- Notification -->
    <!-- ---------------------------------------------- -->
    <v-menu :close-on-content-click="false">
      <template v-slot:activator="{ props }">
        <v-btn icon class="text-secondary mx-3" color="lightsecondary" rounded="sm" size="small" variant="flat" v-bind="props">
          <BellIcon stroke-width="1.5" size="22" />
        </v-btn>
      </template>
      <v-sheet rounded="md" width="330" elevation="12">
        <NotificationDD />
      </v-sheet>
    </v-menu>

    <!-- ---------------------------------------------- -->
    <!-- User Profile -->
    <!-- ---------------------------------------------- -->
    <v-menu :close-on-content-click="false">
      <template v-slot:activator="{ props }">
        <v-btn class="profileBtn text-primary" color="lightprimary" variant="flat" rounded="pill" v-bind="props">
          <v-avatar size="30" class="mr-2 py-2">
            <img v-if="isLogin" src="@/assets/images/profile/user-round.svg" alt=""/>
            <img v-else src="@/assets/images/profile/ic_user.svg" alt=""/>
          </v-avatar>
        </v-btn>
      </template>
      <v-sheet rounded="md" width="330" elevation="12">
        <ProfileDD
            :is-login="isLogin"
            :nickname="nickName"
            :email="email"
        />
      </v-sheet>
    </v-menu>
  </v-app-bar>
</template>
