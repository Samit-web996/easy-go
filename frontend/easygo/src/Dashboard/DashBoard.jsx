import { useState } from "react";
import { CarUsageChart, RevenueProfitChart } from "./Analysis";
import API from "../api";
import { useEffect } from "react";

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    totalCars: 0,
    totalRevenue: 0,
    activeCars: 0,
  });
  const [loading, setloading] = useState(true);

  useEffect(() => {
    API.get("/dashboard-data")
      .then((res) => {
        if (res.data.success) {
          setStats(res.data.data);
        }
        setloading(false);
      })
      .catch((err) => {
        console.error("Dashboard data fetch karne mein error:", err);
        setloading(false);
      });
  }, []);

  const formatToIndianCurrency = (num) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(num);
  };

  return (
    <div className="flex-1 min-h-screen p-4 sm:p-6 bg-gray-50 dark:bg-black transition-colors duration-300">
      {/* Heading */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white tracking-tight">
          Dashboard Overview
        </h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-6">
        {/* Card 1 */}
        <div className="bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 p-5 sm:p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow">
          <h3 className="text-sm sm:text-base text-gray-500 dark:text-gray-400 font-medium">
            Total Rental Car
          </h3>
          <p className="text-xl sm:text-2xl font-bold mt-2 text-gray-900 dark:text-white">
            {loading ? "..." : stats.totalCars.toLocaleString("en-IN")}
          </p>
        </div>

        {/* Card 2 */}
        <div className="bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 p-5 sm:p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow">
          <h3 className="text-sm sm:text-base text-gray-500 dark:text-gray-400 font-medium">
            Revenue
          </h3>
          <p className="text-xl sm:text-2xl font-bold mt-2 text-emerald-600 dark:text-emerald-400">
            {loading ? "..." : formatToIndianCurrency(stats.totalRevenue)}
          </p>
        </div>

        {/* Card 3 */}
        <div className="bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 p-5 sm:p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow">
          <h3 className="text-sm sm:text-base text-gray-500 dark:text-gray-400 font-medium">
            Active Cars
          </h3>
          <p className="text-xl sm:text-2xl font-bold mt-2 text-blue-600 dark:text-blue-400">
            {loading ? "..." : stats.activeCars.toLocaleString("en-IN")}
          </p>
        </div>
      </div>

      <div className="bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 p-4 sm:p-6 rounded-xl shadow-sm w-full overflow-hidden">
        <h2 className="text-lg sm:text-xl font-semibold mb-4 text-gray-900 dark:text-white">
          Recent Bookings
        </h2>

        <div className="w-full overflow-x-auto pb-2">
          <table className="w-full text-left border-collapse min-w-[550px]">
            <thead>
              <tr className="border-b border-gray-100 dark:border-zinc-800">
                <th className="py-3 text-sm sm:text-base text-emerald-600 dark:text-emerald-400 font-semibold">
                  Client
                </th>
                <th className="py-3 text-sm sm:text-base text-emerald-600 dark:text-emerald-400 font-semibold">
                  Car
                </th>
                <th className="py-3 text-sm sm:text-base text-emerald-600 dark:text-emerald-400 font-semibold">
                  Status
                </th>
                <th className="py-3 text-sm sm:text-base text-emerald-600 dark:text-emerald-400 font-semibold">
                  Amount
                </th>
              </tr>
            </thead>

            <tbody className="text-gray-600 dark:text-gray-300 text-sm sm:text-base">
              <tr className="border-b border-gray-50 dark:border-zinc-800/50 hover:bg-gray-50 dark:hover:bg-zinc-800/40 transition-colors">
                <td className="py-4 font-medium text-gray-900 dark:text-gray-100">
                  Rahul Sharma
                </td>
                <td>Hyundai Creta</td>
                <td>
                  <span className="px-2 py-0.5 sm:py-1 rounded-full bg-emerald-100 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 text-xs font-medium border border-emerald-200 dark:border-emerald-500/20">
                    Completed
                  </span>
                </td>
                <td className="font-semibold text-gray-900 dark:text-white">
                  ₹ 12,000
                </td>
              </tr>

              <tr className="border-b border-gray-50 dark:border-zinc-800/50 hover:bg-gray-50 dark:hover:bg-zinc-800/40 transition-colors">
                <td className="py-4 font-medium text-gray-900 dark:text-gray-100">
                  Priya Singh
                </td>
                <td>Swift Dzire</td>
                <td>
                  <span className="px-2 py-0.5 sm:py-1 rounded-full bg-amber-100 dark:bg-amber-500/10 text-amber-700 dark:text-amber-500 text-xs font-medium border border-amber-200 dark:border-amber-500/20">
                    Ongoing
                  </span>
                </td>
                <td className="font-semibold text-gray-900 dark:text-white">
                  ₹ 8,500
                </td>
              </tr>

              <tr className="hover:bg-gray-50 dark:hover:bg-zinc-800/40 transition-colors">
                <td className="py-4 font-medium text-gray-900 dark:text-gray-100">
                  Amit Verma
                </td>
                <td>Mahindra XUV</td>
                <td>
                  <span className="px-2 py-0.5 sm:py-1 rounded-full bg-red-100 dark:bg-red-500/10 text-red-700 dark:text-red-400 text-xs font-medium border border-red-200 dark:border-red-500/20">
                    Cancelled
                  </span>
                </td>
                <td className="font-semibold text-gray-900 dark:text-white">
                  ₹ 0
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Charts Section - Desktop pe split, mobile/tablet pe stacking layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
        <div className="bg-white dark:bg-zinc-900 p-2 rounded-xl border border-gray-200 dark:border-zinc-800 w-full overflow-hidden">
          <CarUsageChart />
        </div>
        <div className="bg-white dark:bg-zinc-900 p-2 rounded-xl border border-gray-200 dark:border-zinc-800 w-full overflow-hidden">
          <RevenueProfitChart />
        </div>
      </div>
    </div>
  );
}
