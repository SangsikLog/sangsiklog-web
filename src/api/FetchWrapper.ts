import { useAuthStore } from '@/stores/auth';

export const fetchWrapper = {
  get: request('GET'),
  post: request('POST'),
  put: request('PUT'),
  delete: request('DELETE')
};

interface Options {
  method: string;
  headers: Record<string, string>;
  body?: string;
}

function request(method: string) {
  return (url: string, body?: object) => {
    const requestOptions: Options = {
      method,
      headers: authHeader(url)
    };
    if (body) {
      requestOptions.headers['Content-Type'] = 'application/json';
      requestOptions.body = JSON.stringify(body);
    }
    return fetch(url, requestOptions).then(handleResponse);
  };
}

function authHeader(url: string): Record<string, string> {
  const { authToken } = useAuthStore();
  const isLoggedIn = !!authToken?.token;
  const isApiUrl = url.startsWith(import.meta.env.VITE_API_GW_URL);
  if (isLoggedIn && isApiUrl) {
    return { Authorization: `Bearer ${authToken.token}` };
  } else {
    return {};
  }
}

/* eslint-disable @typescript-eslint/no-explicit-any */
function handleResponse(response: Response) {
  return response.text().then((text: string) => {
    const data = text && JSON.parse(text);

    if (!response.ok || data.code !== 200) {
      const { authToken, logout } = useAuthStore();
      if ([401, 403].includes(response.status) && authToken) {
        logout();
      }

      const error: string = (data && data.message) || response.statusText;
      return Promise.reject(error);
    }

    return data.result;
  });
}
