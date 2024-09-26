import { authApi } from "@/api/AuthApi";
import { defineStore } from "pinia";
import { router } from "@/router";
import type {AuthToken} from "@/interfaces/Auth";

export const useAuthStore = defineStore({
    id: 'auth',
    state: () => ({
        authToken: JSON.parse(localStorage.getItem('authToken') || '{}'),
        returnUrl: '/'
    }),
    actions: {
        async login(email: string, password: string) {
            authApi.login(email, password)
                .then((response: AuthToken) => {
                    this.authToken = response;
                    localStorage.setItem('authToken', JSON.stringify(response));
                    router.push(this.returnUrl);
                })
        },

        async logout() {
            this.authToken = null;
            localStorage.removeItem('authToken');
            await router.push('/auth/login');
        },

        async sendVerificationMail(email: string) {
            return authApi.sendVerificationMail(email);
        },

        async verifyEmailToken(email: string, token: string) {
            return authApi.verifyEmailToken(email, token);
        },

        async verifyAuthToken(token: string) {
            return authApi.verifyAuthToken(token);
        },

        async validateAuthToken(token: string) {
            return authApi.validateAuthToken(token);
        },
    }
});