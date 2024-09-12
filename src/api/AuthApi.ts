import { fetchWrapper } from "@/api/FetchWrapper";
import type { AuthToken } from "@/interfaces/Auth";

const authApiBaseUrl = `${import.meta.env.VITE_API_GW_URL}/auth`;

const authApi = {
    login: (email: string, password: string): AuthToken =>
        fetchWrapper.post(`${authApiBaseUrl}/token`, {email, password}),
    sendVerificationMail: (email: string) =>
        fetchWrapper.post(`${authApiBaseUrl}/email`, {email}),
    verifyEmailToken: (email: string, token: string) =>
        fetchWrapper.post(`${authApiBaseUrl}/email/verify-token`, {email, token})
}

export {
    authApi
}