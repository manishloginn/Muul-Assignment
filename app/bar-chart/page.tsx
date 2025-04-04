'use client';

import dynamic from 'next/dynamic';
import type { FC } from 'react';

// Dynamically import the chart with SSR disabled
const CustomBarChart = dynamic(() => import('@/app/component/bar-chart'), {
  ssr: false,
}) as FC;

const BarChartPage: FC = () => {
  return (
    <div>
      <h1 style={{ textAlign: 'center', marginTop: '2rem' }}>Bar Chart</h1>
      <CustomBarChart />
    </div>
  );
};

export default BarChartPage;
