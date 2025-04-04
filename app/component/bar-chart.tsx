'use client';

import { useState, useEffect } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

type ChartDataItem = {
  name: string;
  total_value: number;
};

export default function CustomBarChart() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [chartData, setChartData] = useState<ChartDataItem[]>([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch('/api/data');
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }

        const data: ChartDataItem[] = await response.json();

        // ✅ Now item is of type ChartDataItem — no more `any`
        setChartData(
          data.map((item) => ({
            name: item.name,
            total_value: item.total_value,
          }))
        );
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An unknown error occurred');
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div style={{ width: '100%', maxWidth: '600px', height: '400px', margin: 'auto' }}>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="total_value" fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
