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
  return async (query: any, variables?: object, authorization?: boolean = false) => {
    try {
      const context: any = {
        headers: {}
      };

      if (authorization) {
        context.headers.Authorization = authHeader();
      }

      return await apolloClient.query({
        query: query,
        variables: variables,
        context: context
      });
    } catch (error) {
      if (error instanceof ApolloError) {
        const json = JSON.parse(error.message);
        throw new ServiceError(json.code, json.message, json.details);
      } else {
        throw error
      }
    }
  };
}

/* eslint-disable @typescript-eslint/no-explicit-any */
function mutation() {
  return async (mutation: any, variables?: object, authorization?: boolean = false) => {
    try {
      const context: any = {
        headers: {}
      };

      if (authorization) {
        context.headers.Authorization = authHeader();
      }

      return await apolloClient.mutate({
        mutation: mutation,
        variables: variables,
        context: context
      });
    } catch (error) {
      if (error instanceof ApolloError) {
        const json = JSON.parse(error.message);
        throw new ServiceError(json.code, json.message, json.details);
      } else {
        throw error
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