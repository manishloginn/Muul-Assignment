'use client';

import dynamic from 'next/dynamic';
import type { FC } from 'react';

const CustomLineChart = dynamic(() => import('@/app/component/line-chart'), {
  ssr: false,
}) as FC;

const LineChartPage: FC = () => {
  return (
    <div>
      <h1 style={{ textAlign: 'center', marginTop: '2rem' }}>Line Chart</h1>
      <CustomLineChart />
    </div>
  );
};

export default LineChartPage;
