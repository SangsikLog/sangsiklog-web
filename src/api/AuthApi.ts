import { fetchWrapper } from "@/api/FetchWrapper";

const authApiBaseUrl = `${import.meta.env.VITE_API_GW_URL}/auth`;

const authApi = {
    login: (email: string, password: string) =>
        fetchWrapper.post(`${authApiBaseUrl}/token`, {email, password}),
    sendVerificationMail: (email: string) =>
        fetchWrapper.post(`${authApiBaseUrl}/email`, {email}),
    verifyEmailToken: (email: string, token: string) =>
        fetchWrapper.post(`${authApiBaseUrl}/email/verify-token`, {email, token}),
    verifyAuthToken: (token: string) =>
        fetchWrapper.post(`${authApiBaseUrl}/verify-token`, {token}),
    validateAuthToken: (token: string) =>
        fetchWrapper.post(`${authApiBaseUrl}/validate`, {token})
}

export {
    authApi
}