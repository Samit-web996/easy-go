import { CarUsageChart, RevenueProfitChart } from "./Analysis";

export default function AdminDashboard() {
  return (
    // 'bg-gray-50' add kiya hai taaki light mode mein background clean dikhe
    <div className="flex-1 min-h-screen p-4 bg-gray-50 dark:bg-black transition-colors duration-300">

      {/* Heading */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
          Dashboard Overview
        </h2>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
        
        {/* Card 1 */}
        <div className="bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow">
          <h3 className="text-gray-500 dark:text-gray-400 font-medium">Total Rental Car</h3>
          <p className="text-2xl font-bold mt-2 text-gray-900 dark:text-white">
            1,200
          </p>
        </div>

        {/* Card 2 */}
        <div className="bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow">
          <h3 className="text-gray-500 dark:text-gray-400 font-medium">Revenue</h3>
          <p className="text-2xl font-bold mt-2 text-emerald-600 dark:text-emerald-400">
            ₹ 4,25,000
          </p>
        </div>

        {/* Card 3 */}
        <div className="bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow">
          <h3 className="text-gray-500 dark:text-gray-400 font-medium">Active Cars</h3>
          <p className="text-2xl font-bold mt-2 text-blue-600 dark:text-blue-400">
            320
          </p>
        </div>
      </div>

      {/* Recent Bookings Table */}
      <div className="bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 p-6 rounded-xl shadow-sm overflow-x-auto">
        <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
          Recent Bookings
        </h2>

        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-gray-100 dark:border-zinc-800">
              {/* Text color ko dark mode ke liye adjust kiya */}
              <th className="py-3 text-emerald-600 dark:text-emerald-400 font-semibold">Client</th>
              <th className="py-3 text-emerald-600 dark:text-emerald-400 font-semibold">Car</th>
              <th className="py-3 text-emerald-600 dark:text-emerald-400 font-semibold">Status</th>
              <th className="py-3 text-emerald-600 dark:text-emerald-400 font-semibold">Amount</th>
            </tr>
          </thead>

          <tbody className="text-gray-600 dark:text-gray-300">
            <tr className="border-b border-gray-50 dark:border-zinc-800/50 hover:bg-gray-50 dark:hover:bg-zinc-800/40 transition-colors">
              <td className="py-4 font-medium text-gray-900 dark:text-gray-100">Rahul Sharma</td>
              <td>Hyundai Creta</td>
              <td>
                <span className="px-2 py-1 rounded-full bg-emerald-100 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 text-xs font-medium border border-emerald-200 dark:border-emerald-500/20">
                  Completed
                </span>
              </td>
              <td className="font-semibold text-gray-900 dark:text-white">₹ 12,000</td>
            </tr>

            <tr className="border-b border-gray-50 dark:border-zinc-800/50 hover:bg-gray-50 dark:hover:bg-zinc-800/40 transition-colors">
              <td className="py-4 font-medium text-gray-900 dark:text-gray-100">Priya Singh</td>
              <td>Swift Dzire</td>
              <td>
                <span className="px-2 py-1 rounded-full bg-amber-100 dark:bg-amber-500/10 text-amber-700 dark:text-amber-500 text-xs font-medium border border-amber-200 dark:border-amber-500/20">
                  Ongoing
                </span>
              </td>
              <td className="font-semibold text-gray-900 dark:text-white">₹ 8,500</td>
            </tr>

            <tr className="hover:bg-gray-50 dark:hover:bg-zinc-800/40 transition-colors">
              <td className="py-4 font-medium text-gray-900 dark:text-gray-100">Amit Verma</td>
              <td>Mahindra XUV</td>
              <td>
                <span className="px-2 py-1 rounded-full bg-red-100 dark:bg-red-500/10 text-red-700 dark:text-red-400 text-xs font-medium border border-red-200 dark:border-red-500/20">
                  Cancelled
                </span>
              </td>
              <td className="font-semibold text-gray-900 dark:text-white">₹ 0</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
        <div className="bg-white dark:bg-zinc-900 p-2 rounded-xl border border-gray-200 dark:border-zinc-800">
           <CarUsageChart />
        </div>
        <div className="bg-white dark:bg-zinc-900 p-2 rounded-xl border border-gray-200 dark:border-zinc-800">
           <RevenueProfitChart />
        </div>
      </div>

    </div>
  );
}