import {fetchWrapper} from "@/api/FetchWrapper";
import type {AuthToken} from "@/interfaces/Auth";

const authApiBaseUrl = `${import.meta.env.VITE_API_GW_URL}/auth`;

export const authApi = {
    login: (email: string, password: string): AuthToken =>
        fetchWrapper.post(`${authApiBaseUrl}/token`, {email, password})
}