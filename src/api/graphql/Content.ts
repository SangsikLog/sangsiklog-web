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
    query GetPopularKnowledgeList($categoryId: Long) {
        getPopularKnowledgeList(categoryId: $categoryId) {
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

const GET_CATEGORY_KNOWLEDGE_STATISTIC_QUERY = gql`
    query GetCategoryKnowledgeStatistic {
        getCategoryKnowledgeStatistic {
            statistic {
                categoryId
                knowledgeCount
            }
        }
    }
`;

const REGISTER_KNOWLEDGE_MUTATION = gql`
    mutation RegisterKnowledge($userId: Long!, $title: String!, $description: String!, $categoryId: Long!) {
        registerKnowledge(userId: $userId, title: $title, description: $description, categoryId: $categoryId) {
            id
        }
    }
`;

export {
    GET_TOTAL_KNOWLEDGE_COUNT_QUERY,
    GET_DAILY_KNOWLEDGE_QUERY,
    GET_POPULAR_KNOWLEDGE_LIST_QUERY,
    GET_CATEGORY_LIST_QUERY,
    GET_CATEGORY_KNOWLEDGE_STATISTIC_QUERY,
    REGISTER_KNOWLEDGE_MUTATION
}