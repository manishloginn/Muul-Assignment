'use client';

import { useState, useEffect } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

type LineChartDataItem = {
  timestamp: string;
  value: number;
};

export default function CustomLineChart() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [chartData, setChartData] = useState<LineChartDataItem[]>([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch('/api/line-chart');
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }

        const data: { timestamp: string; value: number }[] = await response.json();

        const formattedData: LineChartDataItem[] = data.map((item) => ({
          timestamp: new Date(item.timestamp).toISOString().split('T')[0], 
          value: item.value,
        }));

        console.log('Formatted Line Chart Data:', formattedData); 

        setChartData(formattedData);
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
        <LineChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="timestamp" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="value" stroke="#8884d8" strokeWidth={2} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
