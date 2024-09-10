import { useAuthStore } from '@/stores/auth';
import apolloClient from "@/api/ApolloClient";
import { ApolloError } from "@apollo/client/core";
import {GraphqlServiceError} from "@/api/GraphqlServiceError";

export const gqlFetchWrapper = {
  query: query(),
  mutation: mutation()
};

/* eslint-disable @typescript-eslint/no-explicit-any */
function query() {
  return async (mutation: any, variables?: object) => {
    try {
      return await apolloClient.query({
        mutation: mutation,
        variables: variables,
        context: {
          headers: {
            Authorization: authHeader()
          }
        }
      });
    } catch (error) {
      if (error instanceof ApolloError) {
        throw new GraphqlServiceError("'GraphQL Service Error", JSON.parse(error.message))
      } else {
        throw new GraphqlServiceError(error.message)
      }
    }
  };
}

/* eslint-disable @typescript-eslint/no-explicit-any */
function mutation() {
  return async (mutation: any, variables?: object) => {
    try {
      return await apolloClient.mutate({
        mutation: mutation,
        variables: variables,
        context: {
          headers: {
            Authorization: authHeader()
          }
        }
      });
    } catch (error) {
      if (error instanceof ApolloError) {
        throw new GraphqlServiceError("'GraphQL Service Error", JSON.parse(error.message))
      } else {
        throw new GraphqlServiceError(error.message)
      }
    }
  };
}

function authHeader(): string {
  const { authToken } = useAuthStore();
  const isLoggedIn = !!authToken?.token;
  if (isLoggedIn) {
    return `Bearer ${authToken.token}`;
  }

  return "";
}