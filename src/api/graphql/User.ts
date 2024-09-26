import gql from 'graphql-tag';

const CREATE_USER_MUTATION = gql`
    mutation CreateUser($nickname: String!, $email: String!, $password: String!) {
        createUser(nickname: $nickname, email: $email, password: $password) {
            id
        }
    }
`;

const GET_USER_INFO_QUERY = gql`
    query GetUserInfo($userId: Long!) {
        getUser(userId: $userId) {
            id,
            nickname,
            email
        }
    }
`;

export {
    CREATE_USER_MUTATION,
    GET_USER_INFO_QUERY
}