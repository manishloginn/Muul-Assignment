'use client';

import dynamic from 'next/dynamic';

const CustomPieChart = dynamic(() => import('@/app/component/pie-chart'), {
  ssr: false,
});

export default function PieChartClient() {
  return (
    <div>
      <h1 style={{ textAlign: 'center', marginTop: '2rem' }}>Pie Chart</h1>
      <CustomPieChart />
    </div>
  );
}
