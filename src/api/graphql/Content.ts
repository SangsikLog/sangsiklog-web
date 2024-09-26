import gql from 'graphql-tag';

const GET_TOTAL_KNOWLEDGE_COUNT_QUERY = gql`
    query GetTotalKnowledgeCount {
        getKnowledgeCount {
            count
        }
    }
`;

export {
    GET_TOTAL_KNOWLEDGE_COUNT_QUERY
}