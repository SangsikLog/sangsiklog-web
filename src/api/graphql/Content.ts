import gql from 'graphql-tag';

const GET_TOTAL_KNOWLEDGE_COUNT_QUERY = gql`
    query GetTotalKnowledgeCount {
        getKnowledgeCount {
            count
        }
    }
`;

const GET_DAILY_KNOWLEDGE_QUERY = gql`
    query GetDailyKnowledge {
        getDailyKnowledge {
            id
            title
            description
            category {
                id
                name
            }
            likeCount
            createdAt
        }
    }
`;

export {
    GET_TOTAL_KNOWLEDGE_COUNT_QUERY,
    GET_DAILY_KNOWLEDGE_QUERY
}