"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useMoneyStore } from "@/store/useMoneyStore";
import TransactionCard from "@/components/TransactionCard";
import TransactionFilters from "@/components/TransactionFilters";
import AddTransactionModal from "@/components/AddTransactionModal";
import TransactionSearchBar from "@/components/TransactionSearchBar";
import Navbar from "@/components/Navbar";

export default function TransactionsPage() {
  const { transactions } = useMoneyStore();
  const [filter, setFilter] = useState<"all" | "income" | "expense">("all");
  const [openModal, setOpenModal] = useState(false);

  const filteredTx = transactions.filter((tx) =>
    filter === "all" ? true : tx.type === filter
  );

  return (
    <>
    <Navbar/>
    
    <div className="h-screen flex flex-col p-4 md:p-8 text-white bg-gray-900 space-y-6 overflow-hidden"> 
      {/* Header */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col md:flex-row md:items-center justify-between gap-4"
      >
        <div>
          <h1 className="text-3xl pb-4 md:text-5xl font-bold bg-linear-to-r from-[#fb4444] to-[#70ff02e0] bg-clip-text text-transparent">
            Transactions
          </h1>
          <p className="text-white/70 font-semibold mt-1">
            Manage your income and expenses
          </p>
        </div>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setOpenModal(true)}
          className="w-full md:w-auto px-6 py-3 rounded-full bg-emerald-500 hover:bg-emerald-600 text-white font-bold transition flex gap-2 items-center justify-center shadow-lg shadow-emerald-500/20"
        >
          <Plus size={22} /> Add Transaction
        </motion.button>
      </motion.div>

      {/* Search Bar & Filters */}
      <div className="space-y-4">
        <TransactionSearchBar />
        <TransactionFilters current={filter} setCurrent={setFilter} />
      </div>

      {/* Scrollable List */}
      <motion.div 
        layout
        className="flex-1 overflow-y-auto pr-2 space-y-3 pb-20 md:pb-0 scrollbar-thin scrollbar-thumb-slate-800 scrollbar-track-transparent"
      >
        <AnimatePresence mode="popLayout">
          {filteredTx.length > 0 ? (
            filteredTx.map((tx) => (
              <TransactionCard key={tx.id} tx={tx} />
            ))
          ) : (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center text-slate-500 mt-10 py-10 bg-slate-800/20 rounded-2xl border border-dashed border-slate-700"
            >
              No transactions found.
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Modal */}
      <AddTransactionModal
        open={openModal}
        onClose={() => setOpenModal(false)}
      />
    </div>
    </>
  );
}