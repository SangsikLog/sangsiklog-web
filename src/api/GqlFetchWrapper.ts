import { useAuthStore } from '@/stores/auth';
import apolloClient from "@/api/ApolloClient";
import { ApolloError } from "@apollo/client/core";
import { ServiceError } from "@/api/ServiceError";

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
        const json = JSON.parse(error.message);
        throw new ServiceError(json.code, json.message, json.details);
      } else {
        throw new ServiceError(error.message)
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
        const json = JSON.parse(error.message);
        throw new ServiceError(json.code, json.message, json.details)
      } else {
        throw new ServiceError(error.message)
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