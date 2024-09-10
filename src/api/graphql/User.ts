import gql from 'graphql-tag';

const CREATE_USER_MUTATION = gql`
    mutation CreateUser($nickname: String!, $email: String!, $password: String!) {
        createUser(nickname: $nickname, email: $email, password: $password) {
            id
        }
    }
`;

export {
    CREATE_USER_MUTATION
}