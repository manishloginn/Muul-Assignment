'use client';

import { useEffect, useState } from 'react';
import { CubeProvider } from '@cubejs-client/react';
import cubejsApiPromise from '../lib/cube-client';
import type { CubeApi } from '@cubejs-client/core'; // <-- Yeh add kar

export default function CubeProviderWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const [cubeApi, setCubeApi] = useState<CubeApi | null>(null); // <-- Type set here

  useEffect(() => {
    const fetchCubeApi = async () => {
      const api = await cubejsApiPromise;
      setCubeApi(api); // ✅ Now this works
    };

    fetchCubeApi();
  }, []);

  if (!cubeApi) {
    return <div>Loading Dashboard...</div>;
  }

  return <CubeProvider cubeApi={cubeApi}>{children}</CubeProvider>;
}
