import { defineStore } from "pinia";
import { userApi } from "@/api/UserApi";
import type Long from "long";

export const useUserStore = defineStore({
    id: 'user',
    state: () => ({
        userInfo: null,
        returnUrl: '/'
    }),
    actions: {
        async signUp(nickname: string, email: string, password: string) {
            return userApi.signUp(nickname, email, password);
        },
        async getUserInfo(userId: Long) {
            return userApi.getUserInfo(userId);
        },
        initUserInfo(userInfo) {
            this.userInfo = userInfo
        },
    }
});