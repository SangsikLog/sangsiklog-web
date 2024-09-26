import { defineStore } from "pinia";
import { userApi } from "@/api/UserApi";

export const useUserStore = defineStore({
    id: 'user',
    state: () => ({
        returnUrl: '/'
    }),
    actions: {
        async signUp(nickname: string, email: string, password: string) {
            return userApi.signUp(nickname, email, password);
        }
    }
});