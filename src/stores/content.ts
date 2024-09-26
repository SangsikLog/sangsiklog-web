import { defineStore } from "pinia";
import { contentApi } from "@/api/ContentApi";

export const useContentStore = defineStore({
    id: 'content',
    state: () => ({
        returnUrl: '/'
    }),
    actions: {
        async getTotalKnowledgeCount() {
            return contentApi.getTotalKnowledgeCount();
        }
    }
});