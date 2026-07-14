import React, { useEffect, useState } from "react";
import { PieChart } from "@mui/x-charts/PieChart";
import { BarChart } from "@mui/x-charts/BarChart";
import { LineChart } from "@mui/x-charts/LineChart";
import axios from "axios";

const chartSx = {
  color: "currentColor",
  "& text, & span, & label": {
    fill: "currentColor !important",
    color: "currentColor !important",
  },
  "& .MuiChartsAxis-root line, & .MuiChartsAxis-root path, & .MuiChartsGrid-root line":
    {
      stroke: "currentColor !important",
      opacity: 0.8,
    },
  "& .MuiChartsAxis-root text, & .MuiChartsLegend-root text, & .MuiChartsTooltip-root text, & .MuiChartsLineSeries-root text, & .MuiChartsPieArcLabel-root":
    {
      fill: "currentColor !important",
    },
  "& .MuiChartsLegend-root, & .MuiChartsTooltip-root, & .MuiChartsTitle-root, & .MuiChartsSubtitle-root":
    {
      color: "currentColor !important",
      background: "transparent !important",
    },
  "& .MuiChartsTooltip-root *": {
    fill: "currentColor !important",
    color: "currentColor !important",
  },
};

export function CarUsageChart() {
  const [chartData, setChartData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(
        `${import.meta.env.VITE_API_URL || "https://easygo-backend.onrender.com"}/car-category-graph`,
      )
      .then((res) => {
        if (res.data.success) {
          const formattedData = res.data.data.map((item, index) => ({
            id: index,
            value: item.count,
            label: item.category,
          }));
          setChartData(formattedData);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error("❌ Error fetching graph data:", err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 dark:text-white p-4 sm:p-6 rounded-xl shadow-sm transition-colors w-full">
      <h2 className="text-lg sm:text-xl font-semibold text-gray-800 dark:text-white mb-4">
        Car Usage Distribution
      </h2>

      <div className="text-gray-900 dark:text-white flex justify-center items-center min-h-[300px] w-full overflow-hidden">
        {loading ? (
          <div className="text-gray-500 dark:text-gray-400 animate-pulse font-medium">
            Loading Chart Analytics...
          </div>
        ) : chartData.length === 0 ? (
          <div className="text-gray-500 dark:text-gray-400 font-medium">
            No Data Available
          </div>
        ) : (
          <div className="w-full max-w-[450px] aspect-square sm:aspect-auto flex justify-center">
            <PieChart
              sx={chartSx}
              series={[
                {
                  data: chartData,
                  innerRadius: 40,
                  outerRadius: 90,
                  paddingAngle: 3,
                  cornerRadius: 5,
                },
              ]}
              height={280}
              slotProps={{
                legend: {
                  direction: "row",
                  position: { vertical: "bottom", horizontal: "center" },
                  padding: 0,
                  labelStyle: {
                    fontSize: 12,
                  },
                },
              }}
            />
          </div>
        )}
      </div>
    </div>
  );
}

export function RevenueProfitChart() {
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const revenue = [
    20000, 25000, 30000, 28000, 35000, 42000, 46000, 43000, 41000, 50000, 55000,
    60000,
  ];

  const car_booking = [
    80, 100, 120, 110, 150, 180, 200, 190, 175, 230, 250, 280,
  ];

  return (
    <div className="bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 p-4 sm:p-6 rounded-xl shadow-sm transition-colors w-full">
      <h2 className="text-lg sm:text-xl font-semibold text-gray-800 dark:text-white mb-6">
        Revenue vs Profit Analytics
      </h2>

      <div className="w-full text-gray-900 dark:text-white space-y-8">
        {/* Bar Chart Container */}
        <div className="w-full overflow-x-auto overflow-y-hidden pb-2 min-w-[300px]">
          <div className="min-w-[500px] md:min-w-full">
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
          </div>
        </div>

        <hr className="border-gray-100 dark:border-zinc-800" />

        {/* Line Chart Container */}
        <div className="w-full overflow-x-auto overflow-y-hidden pb-2 min-w-[300px]">
          <div className="min-w-[500px] md:min-w-full">
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
      </div>
    </div>
  );
}
