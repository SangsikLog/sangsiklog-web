import { CREATE_USER_MUTATION } from "@/api/graphql/User";
import {gqlFetchWrapper} from "@/api/GqlFetchWrapper";

const userApi = {
    signUp: (nickname: string, email: string, password: string) =>
        gqlFetchWrapper.mutation(CREATE_USER_MUTATION, {nickname, email, password})

};

export {
    userApi
}