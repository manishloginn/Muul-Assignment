'use client';

import { useState, useEffect } from 'react';
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

// ✅ Type for pie chart data
type PieChartDataItem = {
  name: string;
  value: number;
};

export default function CustomPieChart() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [chartData, setChartData] = useState<PieChartDataItem[]>([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch('/api/data');
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }

        const data: { name: string; total_value: number }[] = await response.json();

        console.log("Raw API Data:", data); // ✅ Debug log

        const formattedData: PieChartDataItem[] = data
          .filter((item) => Number(item.total_value) > 0)
          .map((item) => ({
            name: item.name,
            value: Number(item.total_value),
          }));

        console.log("Formatted Pie Chart Data:", formattedData); // ✅ Debug log

        setChartData(formattedData);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An unknown error occurred');
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  const COLORS = ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF', '#FF9F40'];

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  if (chartData.length === 0) return <p>No data available for Pie Chart.</p>;

  return (
    <div style={{ width: '100%', maxWidth: '500px', height: '400px', margin: 'auto' }}>
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={chartData}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={130}
            fill="#8884d8"
            label
            isAnimationActive={false} // Optional: disable animation to show instantly
          >
            {chartData.map((_, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend verticalAlign="bottom" height={36} />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
