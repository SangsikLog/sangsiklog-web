import { GET_TOTAL_KNOWLEDGE_COUNT_QUERY } from "@/api/graphql/Content";
import { gqlFetchWrapper } from "@/api/GqlFetchWrapper";

const contentApi = {
    getTotalKnowledgeCount: () => gqlFetchWrapper.query(GET_TOTAL_KNOWLEDGE_COUNT_QUERY)
};

export {
    contentApi
}