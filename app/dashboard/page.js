"use client";

import { useRouter } from "next/navigation";
import ActiveUser from "../onlineuser/page";
import { signOut } from "firebase/auth";
import { auth } from "../config";
import { useContext } from "react";
import { UsersContexts } from "../usercontext";

export default function Dashboard() {
  const router = useRouter();
  const { users } = useContext(UsersContexts);
console.log(users.userprofile ,"users image")
  const handleLogout = () => {
    signOut(auth).then(() => {
      router.replace("/login");
    });
  };

  return (
    <ActiveUser>
      <div className="min-h-screen bg-gray-100 p-6">

        {/* Top Header */}
        <header className="bg-white shadow rounded-xl p-5 mb-6 flex justify-between items-center">
          <h1 className="text-2xl font-semibold text-gray-800">Dashboard</h1>

          {/* User Profile Box */}
          <div className="flex items-center gap-4">

            {/* User Image */}
            <div className="w-12 h-12 rounded-full overflow-hidden bg-gray-200">
              {users?.userprofile ? (
                <img
                  src={users.userprofile}
                  alt="User"
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-500">
                  👤
                </div>
              )}
            </div>

            {/* User Name & Email */}
            <div className="text-right">
              <p className="font-semibold text-gray-800">
                {users?.firstname} {users?.lastname}
              </p>
              <p className="text-sm text-gray-500">{users?.email}</p>
            </div>

            {/* Logout Button */}
            <button
              onClick={handleLogout}
              className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 transition"
            >
              Logout
            </button>
          </div>
        </header>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 shadow rounded-xl">
            <h2 className="text-lg font-medium">Total Users</h2>
            <p className="text-3xl font-bold mt-2">1,245</p>
          </div>

          <div className="bg-white p-6 shadow rounded-xl">
            <h2 className="text-lg font-medium">Daily Visits</h2>
            <p className="text-3xl font-bold mt-2">3,780</p>
          </div>

          <div className="bg-white p-6 shadow rounded-xl">
            <h2 className="text-lg font-medium">Orders</h2>
            <p className="text-3xl font-bold mt-2">254</p>
          </div>
        </div>

        {/* Main Box */}
        <div className="bg-white shadow rounded-xl p-6">
          <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>

          <div className="space-y-3">
            <div className="p-4 border rounded-lg hover:bg-gray-50 transition">
              User John placed a new order
            </div>
            <div className="p-4 border rounded-lg hover:bg-gray-50 transition">
              New user registered: Sarah
            </div>
            <div className="p-4 border rounded-lg hover:bg-gray-50 transition">
              System backup completed
            </div>
          </div>
        </div>
      </div>
    </ActiveUser>
  );
}
