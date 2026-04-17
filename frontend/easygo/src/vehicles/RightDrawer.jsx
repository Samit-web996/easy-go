import Drawer from "@mui/material/Drawer";
import axios from "axios";
import { useEffect, useState } from "react";

export default function RightDrawer({ open, onClose, data }) {
  const [info, setInfo] = useState(null);

useEffect(() => {
  const getOwnerInfo = async () => {
    if (!data) return;

    try {
      const res = await axios.get(
        `http://localhost:3006/vehicle-owner-information/${data.email}`
      );

      const result = Array.isArray(res.data) ? res.data[0] : res.data; 

      setInfo(result);

    } catch (err) {
      console.log(err);
    }
  };

  if (open) {
    getOwnerInfo();
  }
}, [open, data]);

  return (
    <Drawer anchor="right" open={open} onClose={onClose}>
  <div className="w-[350px] h-full backdrop-blur-xl bg-white/80 dark:bg-gray-900/90 p-6 shadow-2xl border-l border-gray-200 dark:border-gray-700 text-gray-800 dark:text-gray-200">

    {info ? (
      <>
      <div>
        <div className="flex flex-col items-center mb-6">
          {info.profile_img ? (
            <img
              src={`http://localhost:3006/uploads/${info.profile_img}`}
              alt="profile"
              className="w-24 h-24 rounded-full object-cover border-4 border-indigo-500 shadow-lg"
            />
          ) : (
            <div className="w-24 h-24 rounded-full bg-gray-300 dark:bg-gray-700 flex items-center justify-center text-xl">
              👤
            </div>
          )}

          <h2 className="mt-3 text-xl font-bold text-gray-900 dark:text-white">
            {info.ownerName}
          </h2>
        </div>

        {/* Details */}
        <div className="space-y-4">
          <div className="p-3 rounded-lg bg-gray-100 dark:bg-gray-800">
          <p className="text-sm text-gray-500 dark:text-gray-400">Email</p>
          <p className="font-medium text-gray-900 dark:text-gray-100">
              {info.email}
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400">Aadhar</p>
            <p className="font-medium text-gray-900 dark:text-gray-100">
              {info.aadhar}
            </p>
          </div>

          <div className="p-3 rounded-lg bg-gray-100 dark:bg-gray-800">
            <p className="text-sm text-gray-500 dark:text-gray-400">Mobile</p>
            <p className="font-medium text-gray-900 dark:text-gray-100">
              {info.mobile}
            </p>
          </div>

          <div className="p-3 rounded-lg bg-gray-100 dark:bg-gray-800">
            <p className="text-sm text-gray-500 dark:text-gray-400">Address</p>
            <p className="font-medium text-gray-900 dark:text-gray-100">
              {info.address}
            </p>
          </div>
        </div>
        </div>
      </>
    ) : (
      <div className="flex justify-center items-center h-full text-gray-500 dark:text-gray-400">
        Loading...
      </div>
    )}
  </div>
</Drawer>
  );
}
