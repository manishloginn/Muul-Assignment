'use client';

import { useEffect, useState } from 'react';
import { CubeProvider } from '@cubejs-client/react';
import type { CubeApi } from '@cubejs-client/core';
import cubejs from '@cubejs-client/core';

export default function CubeProviderWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const [cubeApi, setCubeApi] = useState<CubeApi | null>(null);

  useEffect(() => {
    const fetchTokenAndInit = async () => {
      try {
        const res = await fetch('/api/cubejs-token');
        const data = await res.json();

        const api = cubejs(data.token, {
          apiUrl:
            process.env.NODE_ENV === 'development'
              ? 'http://localhost:4000/cubejs-api/v1'
              : 'https://cubejs-anylytics.onrender.com/cubejs-api/v1',
        });

        setCubeApi(api);
      } catch (err) {
        console.error('Error setting Cube API:', err);
      }
    };

    fetchTokenAndInit();
  }, []);

  if (!cubeApi) {
    return <div>Loading Dashboard...</div>;
  }

  return <CubeProvider cubeApi={cubeApi}>{children}</CubeProvider>;
}
