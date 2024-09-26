import { GET_TOTAL_KNOWLEDGE_COUNT_QUERY, GET_DAILY_KNOWLEDGE_QUERY, GET_POPULAR_KNOWLEDGE_LIST_QUERY } from "@/api/graphql/Content";
import { gqlFetchWrapper } from "@/api/GqlFetchWrapper";

const contentApi = {
    getTotalKnowledgeCount: () => gqlFetchWrapper.query(GET_TOTAL_KNOWLEDGE_COUNT_QUERY),
    getDailyKnowledge: () => gqlFetchWrapper.query(GET_DAILY_KNOWLEDGE_QUERY),
    getPopularKnowledgeList: () => gqlFetchWrapper.query(GET_POPULAR_KNOWLEDGE_LIST_QUERY),
};

export {
    contentApi
}