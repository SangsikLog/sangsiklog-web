import { GET_TOTAL_KNOWLEDGE_COUNT_QUERY, GET_DAILY_KNOWLEDGE_QUERY, GET_POPULAR_KNOWLEDGE_LIST_QUERY, GET_CATEGORY_LIST_QUERY } from "@/api/graphql/Content";
import { gqlFetchWrapper } from "@/api/GqlFetchWrapper";
import Long from "long";

const contentApi = {
    getTotalKnowledgeCount: () => gqlFetchWrapper.query(GET_TOTAL_KNOWLEDGE_COUNT_QUERY),
    getDailyKnowledge: () => gqlFetchWrapper.query(GET_DAILY_KNOWLEDGE_QUERY),
    getPopularKnowledgeList: () => gqlFetchWrapper.query(GET_POPULAR_KNOWLEDGE_LIST_QUERY),
    getCategoryList: () => gqlFetchWrapper.query(GET_CATEGORY_LIST_QUERY),
    getPopularKnowledgeListInCategory: (categoryId: Long) => gqlFetchWrapper.query(GET_POPULAR_KNOWLEDGE_LIST_QUERY, {categoryId}),
};

export {
    contentApi
}