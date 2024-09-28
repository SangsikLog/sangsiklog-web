import {
    GET_TOTAL_KNOWLEDGE_COUNT_QUERY,
    GET_DAILY_KNOWLEDGE_QUERY,
    GET_POPULAR_KNOWLEDGE_LIST_QUERY,
    GET_CATEGORY_LIST_QUERY,
    GET_CATEGORY_KNOWLEDGE_STATISTIC_QUERY,
    REGISTER_KNOWLEDGE_MUTATION,
    GET_KNOWLEDGE_LIST_QUERY
} from "@/api/graphql/Content";
import { gqlFetchWrapper } from "@/api/GqlFetchWrapper";
import Long from "long";

const contentApi = {
    getTotalKnowledgeCount: () => gqlFetchWrapper.query(GET_TOTAL_KNOWLEDGE_COUNT_QUERY),
    getDailyKnowledge: () => gqlFetchWrapper.query(GET_DAILY_KNOWLEDGE_QUERY),
    getPopularKnowledgeList: () => gqlFetchWrapper.query(GET_POPULAR_KNOWLEDGE_LIST_QUERY),
    getCategoryList: () => gqlFetchWrapper.query(GET_CATEGORY_LIST_QUERY),
    getPopularKnowledgeListInCategory: (categoryId: Long) => gqlFetchWrapper.query(GET_POPULAR_KNOWLEDGE_LIST_QUERY, {categoryId}),
    getCategoryKnowledgeStatistic: () => gqlFetchWrapper.query(GET_CATEGORY_KNOWLEDGE_STATISTIC_QUERY),
    registerKnowledge: (userId: Long, title: string, description: string, categoryId: Long) =>
        gqlFetchWrapper.mutation(REGISTER_KNOWLEDGE_MUTATION, {userId, title, description, categoryId}, true),
    getKnowledgeList: (page: number, size: number, sortColumn: string, direction: string) =>
        gqlFetchWrapper.query(GET_KNOWLEDGE_LIST_QUERY, {page, size, sortColumn, direction}),
};

export {
    contentApi
}