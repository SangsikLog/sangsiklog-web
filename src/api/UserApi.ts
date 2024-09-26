import { CREATE_USER_MUTATION, GET_USER_INFO_QUERY } from "@/api/graphql/User";
import { gqlFetchWrapper } from "@/api/GqlFetchWrapper";
import type Long from "long";

const userApi = {
    signUp: (nickname: string, email: string, password: string) =>
        gqlFetchWrapper.mutation(CREATE_USER_MUTATION, {nickname, email, password}),
    getUserInfo: (userId: Long) =>
        gqlFetchWrapper.query(GET_USER_INFO_QUERY, {userId}, true)
};

export {
    userApi
}