'use client';

import CustomLineChart from '@/app/component/line-chart';
import CustomBarChart from '@/app/component/bar-chart';
import CustomPieChart from '@/app/component/pie-chart';

export default function DashboardPage() {
  return (
    <main className="h-screen bg-gray-100 p-6 overflow-scroll">
      <h1 className="text-4xl font-bold text-center text-gray-800 mb-6">
        📊 Dashboard
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 max-w-7xl mx-auto h-[calc(100vh-6.5rem)]">
        <div className="bg-white shadow-lg rounded-xl p-4 h-full flex  flex-col">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">Pie Chart</h2>
          <div className="flex-grow">
            <CustomPieChart />
          </div>
        </div>

        <div className="col-span-2 grid grid-rows-1 gap-6 h-full">
          <div className="bg-white shadow-lg rounded-xl p-4 flex flex-col ">
            <h2 className="text-xl font-semibold text-gray-700 mb-4">Bar Chart</h2>
            <div className="flex-grow">
              <CustomBarChart />
            </div>
          </div>

          <div className="bg-white shadow-lg rounded-xl p-4 flex flex-col">
            <h2 className="text-xl font-semibold text-gray-700 mb-4">Line Chart</h2>
            <div className="flex-grow">
              <CustomLineChart />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
