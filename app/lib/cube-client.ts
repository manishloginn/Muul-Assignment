// lib/cube-client.ts
import cubejs, { CubeApi } from '@cubejs-client/core';

const fetchToken = async (): Promise<string> => {
  const baseUrl =
    typeof window === 'undefined'
      ? process.env.NEXT_PUBLIC_CUBEJS_API_URL || 'http://localhost:3000'
      : '';

  const res = await fetch(`${baseUrl}/api/cubejs-token`);

  if (!res.ok) {
    throw new Error(`Failed to fetch token: ${res.statusText}`);
  }

  const data = await res.json();
  if (!data?.token) {
    throw new Error('Token not found in response');
  }

  console.log('✅ Token fetched:', data.token);
  return data.token;
};

const API_URL =
  process.env.NODE_ENV === 'development'
    ? 'http://localhost:4000/cubejs-api/v1'
    : 'https://cubejs-anylytics.onrender.com/cubejs-api/v1';

const cubejsApiPromise: Promise<CubeApi> = fetchToken().then((token) =>
  cubejs(token, {
    apiUrl: API_URL,
  })
);

export default cubejsApiPromise;
