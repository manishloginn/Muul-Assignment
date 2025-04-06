import React, { useEffect, useState } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from 'recharts';
import { useCubeQuery } from '@cubejs-client/react';
import cubejsApiPromise from '../lib/cube-client';
import type { CubeApi } from '@cubejs-client/core';

const ValueLineChart: React.FC = () => {
  const [cubejsApi, setCubejsApi] = useState<CubeApi | null>(null);

  useEffect(() => {
    cubejsApiPromise.then(api => setCubejsApi(api));
  }, []);

  const { resultSet, error, isLoading } = useCubeQuery(
    {
      measures: ['Metrics.totalValue'],
      timeDimensions: [
        {
          dimension: 'Metrics.timestamp',
          granularity: 'day',
        },
      ],
    },
    cubejsApi ? { cubeApi: cubejsApi } : undefined
  );

  if (!cubejsApi) return <p>Initializing...</p>;
  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.toString()}</p>;

  const data = resultSet?.chartPivot() || [];

  return (
    <LineChart width={600} height={300} data={data}>
      <XAxis dataKey="x" />
      <YAxis />
      <CartesianGrid stroke="#eee" />
      <Tooltip />
      <Legend />
      <Line type="monotone" dataKey="Metrics.totalValue" stroke="#8884d8" />
    </LineChart>
  );
};

export default ValueLineChart;
