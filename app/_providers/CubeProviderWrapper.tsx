'use client';

import { CubeProvider } from '@cubejs-client/react';
import cubejsApiPromise from '../lib/cube-client';

export default async function CubeProviderWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const cubeApi = await cubejsApiPromise;

  return (
    <CubeProvider cubeApi={cubeApi}>
      {children}
    </CubeProvider>
  );
}
