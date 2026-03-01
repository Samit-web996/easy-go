import { Menu } from "lucide-react";
import Sidebar from "./Sidebar";

export default function AdminDashboard() {
  return (
    <div className="flex">
      <div><Sidebar/></div>
    <div className="flex-1 p-6 bg-gray-100 dark:bg-gray-900 min-h-screen">

      
      <div className="flex items-center justify-between mb-6">
              
        <p className="text-3xl font-bold text-gray-800 dark:text-white">
          Dashboard Overview
        </p>

        <div className="w-10 h-10 bg-gray-300 dark:bg-gray-700 rounded-full"></div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">

        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow">
          <h3 className="text-gray-700 dark:text-gray-300">
            Total Rental Car
          </h3>
          <p className="text-2xl font-bold mt-2 text-gray-900 dark:text-white">
            1,200
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow">
          <h3 className="text-gray-700 dark:text-gray-300">
            Revenue
          </h3>
          <p className="text-2xl font-bold mt-2 text-green-600">
            ₹ 4,25,000
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow">
          <h3 className="text-gray-700 dark:text-gray-300">
            Active Cars
          </h3>
          <p className="text-2xl font-bold mt-2 text-blue-600">
            320
          </p>
        </div>

      </div>

      <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow overflow-x-auto">
        <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">
          Recent Bookings
        </h2>

        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b dark:border-gray-600">
              <th className="py-2 text-orange-600">Client</th>
              <th className="text-orange-600">Car</th>
              <th className="text-orange-600">Status</th>
              <th className="text-orange-600">Amount</th>
            </tr>
          </thead>

          <tbody className="text-gray-600 dark:text-gray-300">

            <tr className="border-b dark:border-gray-700">
              <td className="py-2">Rahul Sharma</td>
              <td>Hyundai Creta</td>
              <td className="text-green-600 font-medium">Completed</td>
              <td>₹ 12,000</td>
            </tr>

            <tr className="border-b dark:border-gray-700">
              <td className="py-2">Priya Singh</td>
              <td>Swift Dzire</td>
              <td className="text-yellow-600 font-medium">Ongoing</td>
              <td>₹ 8,500</td>
            </tr>

            <tr>
              <td className="py-2">Amit Verma</td>
              <td>Mahindra XUV</td>
              <td className="text-red-600 font-medium">Cancelled</td>
              <td>₹ 0</td>
            </tr>

          </tbody>
        </table>
      </div>

    </div>
    </div>
  );
}