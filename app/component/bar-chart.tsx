import React from 'react';
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
import cubejsApi from '../lib/cube-client';

const ValueBarChart: React.FC = () => {
  const { resultSet, error, isLoading } = useCubeQuery(
    {
      measures: ['Metrics.totalValue'],
      dimensions: ['Metrics.name'],
    },
    { cubeApi: cubejsApi }
  );

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
