import { defineStore } from "pinia";
import { userApi } from "@/api/UserApi";
import type Long from "long";
import type {UserInfo} from "@/interfaces/User";

export const useUserStore = defineStore({
    id: 'user',
    state: () => ({
        userInfo: null as UserInfo | null,
        returnUrl: '/'
    }),
    actions: {
        async signUp(nickname: string, email: string, password: string) {
            return userApi.signUp(nickname, email, password);
        },
        async getUserInfo(userId: Long) {
            return userApi.getUserInfo(userId);
        },
        initUserInfo(userInfo: UserInfo | null) {
            this.userInfo = userInfo
        },
    }
});