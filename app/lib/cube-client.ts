// lib/cubeClient.ts
import cubejs, { CubeApi } from '@cubejs-client/core';


const CUBEJS_TOKEN = 'database_secret';
const CUBEJS_API_URL = 'https://cubejs-anylytics.onrender.com/cubejs-api/v1';



const cubejsApi: CubeApi = cubejs(
  CUBEJS_TOKEN,
  {
    apiUrl: CUBEJS_API_URL,
  }
);

export default cubejsApi;
