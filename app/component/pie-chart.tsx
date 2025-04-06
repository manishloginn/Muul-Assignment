import React from 'react';
import {
  PieChart,
  Pie,
  Tooltip,
  Cell,
  Legend,
} from 'recharts';
import { useCubeQuery } from '@cubejs-client/react';
import cubejsApi from '../lib/cube-client';

const COLORS = ['#8884d8', '#82ca9d', '#ffc658', '#ff8042'];

const ValuePieChart: React.FC = () => {
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
    <PieChart width={400} height={400}>
      <Pie
        data={data}
        dataKey="Metrics.totalValue"
        nameKey="x"
        cx="50%"
        cy="50%"
        outerRadius={150}
        label={({ x }) => x}
      >
        {data.map((entry, index) => (
          <Cell key={index} fill={COLORS[index % COLORS.length]} />
        ))}
      </Pie>
      <Tooltip />
      <Legend />
    </PieChart>
  );
};

export default ValuePieChart;
