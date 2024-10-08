import { defineStore } from "pinia";
import { contentApi } from "@/api/ContentApi";
import type Long from "long";

export const useContentStore = defineStore({
    id: 'content',
    state: () => ({
        searchQuery: '',
        returnUrl: '/'
    }),
    actions: {
        async getTotalKnowledgeCount() {
            return contentApi.getTotalKnowledgeCount();
        },
        async getDailyKnowledge() {
            return contentApi.getDailyKnowledge();
        },
        async getPopularKnowledgeList() {
            return contentApi.getPopularKnowledgeList();
        },
        async getCategoryList() {
            return contentApi.getCategoryList();
        },
        async getPopularKnowledgeListInCategory(categoryId: Long) {
            return contentApi.getPopularKnowledgeListInCategory(categoryId);
        },
        async getCategoryKnowledgeStatistic() {
            return contentApi.getCategoryKnowledgeStatistic();
        },
        async registerKnowledge(userId: Long, title: string, description: string, categoryId: Long) {
            return contentApi.registerKnowledge(userId, title, description, categoryId);
        },
        async getKnowledgeList(page: number, size: number, sortColumn: string, direction: string) {
            return contentApi.getKnowledgeList(page, size, sortColumn, direction);
        },
        async searchKnowledge(query: string, page: number, size: number) {
            return contentApi.searchKnowledge(query, page, size);
        },
        setSearchQuery(query: string) {
            this.searchQuery = query;
        }
    }
});