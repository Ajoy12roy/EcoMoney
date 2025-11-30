"use client";

import React, { useContext, useEffect } from "react";
import RotatingBorderCard from "./RotatingBorderCard";
import Card, { CardContent } from "@/components/ui/card";
import {
  Wallet,
  TrendingUp,
  TrendingDown,
  PiggyBank,
  Plus,
} from "lucide-react";
import { PieChart, Pie, Cell, Tooltip } from "recharts";
import Navbar from "@/components/Navbar";
import { AppContext } from "@/context/AppContext";

const data = [
  { name: "Housing", value: 55, color: "#FF5467" },
  { name: "Food", value: 19, color: "#FF8EA1" },
  { name: "Utilities", value: 12, color: "#FFA5B5" },
  { name: "Transport", value: 6, color: "#FFBFC8" },
  { name: "Entertainment", value: 5, color: "#FFA84D" },
];

export default function Dashboard() {
  const [open, setOpen] = React.useState(false);

  // 1. Get User Data from Context
  const { userData, getUserData } = useContext(AppContext) as any;

  // 2. Fetch fresh data on component mount
  useEffect(() => {
    if (getUserData) {
      getUserData();
    }
  }, []);

  // 3. Extract Financial Data (Default to 0 if loading/null)
  const earnings = userData?.totalEarnings || 0;
  const spending = userData?.totalSpending || 0;
  const savings = userData?.totalSavings || 0;
  
  // Backend provides this, but we fallback to calculation if needed
  const balance = userData?.totalBalance ?? (earnings - (spending + savings));

  return (
    <>
    <Navbar/>
    <div className="w-full p-10 space-y-20">
      {/* Top Summary Cards */}
      <div className="grid mt-4 md:grid-cols-4 gap-4">
       
          <div className="flex items-center gap-3 p-5 rounded-2xl shadow-md border border-blue-200 transition duration-300 hover:shadow-lg hover:-translate-y-0.5 hover:border-green-400">
            <div className="bg-green-100 p-3 rounded-xl">
              <Wallet className="text-green-600" />
            </div>
            <div>
              <p className="text-gray-500 text-sm">Total Balance</p>
              {/* Display Dynamic Balance */}
              <h2 className="text-xl font-semibold">৳{balance.toLocaleString()}</h2>
            </div>
          </div>
        

        <Card className="rounded-2xl shadow-md border border-teal-200 transition duration-300 hover:shadow-lg hover:-translate-y-0.5 hover:border-green-400">
          <CardContent className="p-5 ">
            <div className="flex items-center gap-3">
              <div className="bg-green-100 p-3 rounded-xl ">
                <TrendingUp className="text-green-600" />
              </div>
              <div className="">
                <p className="text-gray-500 text-sm">Total Earnings</p>
                {/* Display Dynamic Earnings */}
                <h2 className="text-xl font-semibold">৳{earnings.toLocaleString()}</h2>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="rounded-2xl shadow-sm border border-orange-200 transition duration-300 hover:shadow-lg hover:-translate-y-0.5 hover:border-green-500 ">
          <CardContent className="p-5">
            <div className="flex items-center gap-3">
              <div className="bg-red-100 p-3 rounded-xl">
                <TrendingDown className="text-red-600" />
              </div>
              <div>
                <p className="text-gray-500 text-sm">Total Spending</p>
                {/* Display Dynamic Spending */}
                <h2 className="text-xl font-semibold">৳{spending.toLocaleString()}</h2>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="rounded-2xl shadow-sm border border-yellow-200 transition duration-300 hover:shadow-lg hover:-translate-y-0.5 hover:border-green-500 ">
          <CardContent className="p-5">
            <div className="flex items-center gap-3">
              <div className="bg-green-100 p-3 rounded-xl">
                <PiggyBank className="text-green-600" />
              </div>
              <div>
                <p className="text-gray-500 text-sm">Total Savings</p>
                {/* Display Dynamic Savings */}
                <h2 className="text-xl font-semibold">৳{savings.toLocaleString()}</h2>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Middle Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Left Pie Chart Card */}
        <RotatingBorderCard>
        <Card className="rounded-2xl shadow-md h-110 ">
          <CardContent className="p-6">
            <h3 className="text-xl font-semibold mb-4 text-orange-500 ">Spending by Category</h3>
            <div className="flex justify-center">
              <PieChart width={300} height={300}>
                <Pie
                  data={data}
                  dataKey="value"
                  cx="50%"
                  cy="50%"
                  outerRadius={120}
                  label
                >
                  {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </div>
          </CardContent>
        </Card>
        </RotatingBorderCard>

        {/* Right Transactions */}
        <div className="">
          {/* Recent Transactions */}
          <Card className="rounded-2xl shadow-sm border border-green-300">
            <CardContent className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-semibold">Recent Transactions</h3>

                <button
                  onClick={() => setOpen(true)}
                   className="px-4 py-1.5 rounded-full text-blue-600 font-medium backdrop-blur-md bg-white/20 
  border border-white/40 shadow-lg hover:text-green-600 transition">
                  View All
                </button>
              </div>

              <div className="text-center py-10 text-gray-500">
                No transactions yet
              </div>
            </CardContent>
          </Card>

          {/* Spending by Category */}
          <Card className="rounded-2xl shadow-sm border border-gray-200 mt-6">
            <CardContent className="p-6">
              <h3 className="text-xl font-semibold mb-4">Spending by Category</h3>

              <div className="text-center py-10 text-gray-500">
                No expenses yet
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* ------ MODAL ------ */}
      {open && (
        <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-2xl w-[400px] shadow-lg">
            <h2 className="text-xl font-semibold mb-4">All Transactions</h2>

            <p className="text-gray-500 mb-6 ">You have no transactions yet.</p>

            <button
              onClick={() => setOpen(false)}
              className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
            >
              Close
            </button>
          </div>
        </div>
      )}

    </div>
    </>
  );
}