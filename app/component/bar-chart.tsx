import React, { useEffect, useState } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
} from 'recharts';
import { useCubeQuery } from '@cubejs-client/react';
import cubejsApiPromise from '../lib/cube-client';
import type { CubeApi } from '@cubejs-client/core';

const ValueBarChart: React.FC = () => {
  const [cubejsApi, setCubejsApi] = useState<CubeApi | null>(null);

  useEffect(() => {
    cubejsApiPromise.then(api => setCubejsApi(api));
  }, []);

  const { resultSet, error, isLoading } = useCubeQuery(
    {
      measures: ['Metrics.totalValue'],
      dimensions: ['Metrics.name'],
    },
    cubejsApi ? { cubeApi: cubejsApi } : undefined
  );

  if (!cubejsApi) return <p>Initializing...</p>;
  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.toString()}</p>;

  const data = resultSet?.chartPivot() || [];

  return (
    <BarChart width={600} height={300} data={data}>
      <XAxis dataKey="x" />
      <YAxis />
      <Tooltip />
      <Legend />
      <CartesianGrid stroke="#eee" />
      <Bar dataKey="Metrics.totalValue" fill="#82ca9d" />
    </BarChart>
  );
};

export default ValueBarChart;
