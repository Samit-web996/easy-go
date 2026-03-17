import React from "react";
import { PieChart } from "@mui/x-charts/PieChart";
import { BarChart } from "@mui/x-charts/BarChart";
import { LineChart } from "@mui/x-charts/LineChart";


export function CarUsageChart() {

const data = [
  { id: 0, value: 35, label: "SUV" },
  { id: 1, value: 25, label: "Sedan" },
  { id: 2, value: 20, label: "Hatchback" },
  { id: 3, value: 10, label: "Luxury" },
  { id: 4, value: 10, label: "Electric" },
];

return (
<div className="bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 dark:text-white p-6 rounded-xl shadow-sm transition-colors">

<h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
Car Usage Distribution
</h2>


<PieChart
  series={[
    {
      data: data,
      innerRadius: 50,
      outerRadius: 110,
      paddingAngle: 3,
      cornerRadius: 5,
    },
  ]}
  height={300}
/>

</div>
);
}

export function RevenueProfitChart() {

const months = [
"Jan","Feb","Mar","Apr","May","Jun",
"Jul","Aug","Sep","Oct","Nov","Dec"
];

const revenue = [
20000,25000,30000,28000,35000,42000,
46000,43000,41000,50000,55000,60000
];

const car_booking = [
80,100,120,110,150,180,
200,190,175,230,250,280
];

return (

<div className="bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 p-6 rounded-xl shadow-sm transition-colors">

<h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
Revenue vs Profit Analytics
</h2>

<div className="w-full overflow-x-auto">

<BarChart
  xAxis={[{ scaleType: "band", data: months }]}
  series={[
    {
      data: revenue,
      label: "Revenue (₹)",
    },
  ]}
  height={300}
/>

<LineChart
  xAxis={[{ scaleType: "point", data: months }]}
  series={[
    {
      data: car_booking,
      label: "Car Bookings",
    },
  ]}
  height={250}
/>

</div>

</div>

);
}