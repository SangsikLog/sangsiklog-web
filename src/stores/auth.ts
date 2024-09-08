import { authApi } from "@/api/AuthApi";
import { defineStore } from "pinia";
import {router} from "@/router";

export const useAuthStore = defineStore({
    id: 'auth',
    state: () => ({
        authToken: JSON.parse(localStorage.getItem('authToken')),
        returnUrl: '/'
    }),
    actions: {
        async login(email: string, password: string) {
            const response = await authApi.login(email, password)

            this.authToken = response;
            localStorage.setItem('authToken', JSON.stringify(response));
            router.push(this.returnUrl);
        },

        logout() {
            this.authToken = null;
            localStorage.removeItem('authToken');
            router.push('/auth/login');
        }
    }
});