import React from "react";
import { PieChart } from "@mui/x-charts/PieChart";
import { BarChart } from "@mui/x-charts/BarChart";
import { LineChart } from "@mui/x-charts/LineChart";

const chartSx = {
  color: "currentColor",
  "& text, & span, & label": {
    fill: "currentColor !important",
    color: "currentColor !important",
  },
  "& .MuiChartsAxis-root line, & .MuiChartsAxis-root path, & .MuiChartsGrid-root line": {
    stroke: "currentColor !important",
    opacity: 0.8,
  },
  "& .MuiChartsAxis-root text, & .MuiChartsLegend-root text, & .MuiChartsTooltip-root text, & .MuiChartsLineSeries-root text, & .MuiChartsPieArcLabel-root": {
    fill: "currentColor !important",
  },
  "& .MuiChartsLegend-root, & .MuiChartsTooltip-root, & .MuiChartsTitle-root, & .MuiChartsSubtitle-root": {
    color: "currentColor !important",
    background: "transparent !important",
  },
  "& .MuiChartsTooltip-root *": {
    fill: "currentColor !important",
    color: "currentColor !important",
  },
};

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

      <div className="text-gray-900 dark:text-white">
        <PieChart
          sx={chartSx}
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
    </div>
  );
}

export function RevenueProfitChart() {
  const months = [
    "Jan","Feb","Mar","Apr","May","Jun",
    "Jul","Aug","Sep","Oct","Nov","Dec",
  ];

  const revenue = [
    20000,25000,30000,28000,35000,42000,
    46000,43000,41000,50000,55000,60000,
  ];

  const car_booking = [
    80,100,120,110,150,180,
    200,190,175,230,250,280,
  ];

  return (
    <div className="bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 p-6 rounded-xl shadow-sm transition-colors">
      <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
        Revenue vs Profit Analytics
      </h2>

      <div className="w-full overflow-x-auto text-gray-900 dark:text-white">
        <BarChart
          sx={chartSx}
          xAxis={[{ scaleType: "band", data: months, label: "Month" }]}
          yAxis={[{ label: "Revenue" }]}
          series={[
            {
              data: revenue,
              label: "Revenue (₹)",
            },
          ]}
          height={300}
        />

        <LineChart
          sx={chartSx}
          xAxis={[{ scaleType: "point", data: months, label: "Month" }]}
          yAxis={[{ label: "Bookings" }]}
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
