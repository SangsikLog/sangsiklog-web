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

const GET_POPULAR_KNOWLEDGE_LIST_QUERY = gql`
    query GetPopularKnowledgeList {
        getPopularKnowledgeList {
            knowledgeList {
                id
                title
                description
                category {
                    name
                }
                likeCount
                createdAt
            }
        }
    }
`;

const GET_CATEGORY_LIST_QUERY = gql`
    query GetCategoryList {
        getCategoryList {
            categoryList {
                id
                name
            }
        }
    }
`;

export {
    GET_TOTAL_KNOWLEDGE_COUNT_QUERY,
    GET_DAILY_KNOWLEDGE_QUERY,
    GET_POPULAR_KNOWLEDGE_LIST_QUERY,
    GET_CATEGORY_LIST_QUERY
}