export default function AdminDashboard() {
  return (
    <div className="flex-1">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-3xl font-bold text-gray-800 dark:text-white">
          Dashboard Overview
        </h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
        <div className="bg-zinc-900 border border-zinc-800 p-6 rounded-xl shadow-sm">
          <h3 className="text-gray-400">Total Rental Car</h3>
          <p className="text-2xl font-bold mt-2 text-white">1,200</p>
        </div>

        <div className="bg-zinc-900 border border-zinc-800 p-6 rounded-xl shadow-sm">
          <h3 className="text-gray-400">Revenue</h3>
          <p className="text-2xl font-bold mt-2 text-emerald-500">₹ 4,25,000</p>
        </div>

        <div className="bg-zinc-900 border border-zinc-800 p-6 rounded-xl shadow-sm">
          <h3 className="text-gray-400">Active Cars</h3>
          <p className="text-2xl font-bold mt-2 text-blue-500">320</p>
        </div>
      </div>

      <div className="bg-zinc-900 border border-zinc-800 p-6 rounded-xl shadow-sm overflow-x-auto">
        <h2 className="text-xl font-semibold mb-4 text-white">Recent Bookings</h2>
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-zinc-800">
              <th className="py-3 text-emerald-500 font-medium">Client</th>
              <th className="py-3 text-emerald-500 font-medium">Car</th>
              <th className="py-3 text-emerald-500 font-medium">Status</th>
              <th className="py-3 text-emerald-500 font-medium">Amount</th>
            </tr>
          </thead>
          <tbody className="text-gray-300">
            <tr className="border-b border-zinc-800 hover:bg-zinc-800/50 transition-colors">
              <td className="py-4">Rahul Sharma</td>
              <td>Hyundai Creta</td>
              <td><span className="px-2 py-1 rounded-full bg-emerald-500/10 text-emerald-500 text-xs font-medium border border-emerald-500/20">Completed</span></td>
              <td>₹ 12,000</td>
            </tr>
            <tr className="border-b border-zinc-800 hover:bg-zinc-800/50 transition-colors">
              <td className="py-4">Priya Singh</td>
              <td>Swift Dzire</td>
              <td><span className="px-2 py-1 rounded-full bg-amber-500/10 text-amber-500 text-xs font-medium border border-amber-500/20">Ongoing</span></td>
              <td>₹ 8,500</td>
            </tr>
            <tr className="hover:bg-zinc-800/50 transition-colors">
              <td className="py-4">Amit Verma</td>
              <td>Mahindra XUV</td>
              <td><span className="px-2 py-1 rounded-full bg-red-500/10 text-red-500 text-xs font-medium border border-red-500/20">Cancelled</span></td>
              <td>₹ 0</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}