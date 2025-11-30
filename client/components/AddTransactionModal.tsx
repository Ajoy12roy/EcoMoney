"use client";

import { useState } from "react";
import { X, Check } from "lucide-react";
import { useMoneyStore } from "@/store/useMoneyStore";
import { motion, AnimatePresence } from "framer-motion";
import Button from "./ui/button";

export default function AddTransactionModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const addTransaction = useMoneyStore((s) => s.addTransaction);

  const [type, setType] = useState<"income" | "expense">("expense");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [note, setNote] = useState("");

  const handleSubmit = () => {
    if (!amount || !category) return;

    addTransaction({
      id: Date.now().toString(),
      name: category, 
      category,
      amount: Number(amount),
      date,
      note,
      type,
    });

    // Reset form
    setAmount("");
    setCategory("");
    setNote("");
    onClose();
  };

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-100 flex items-center justify-center p-4">
          
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/70 backdrop-blur-md"
          />

          {/* Modal Content */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", duration: 0.5 }}
            className="w-full max-w-md bg-slate-900 rounded-2xl shadow-2xl border border-white/10 relative z-10 overflow-hidden"
          >
            {/* Header */}
            <div className="p-5 border-b border-white/5 flex items-center justify-between bg-slate-800/50">
              <h2 className="text-xl font-bold text-white">Add Transaction</h2>
              <Button
                onClick={onClose}
                className="p-2 rounded-full hover:bg-white/10 text-slate-400 hover:text-white transition"
              >
                <X size={20} />
              </Button>
            </div>

            <div className="p-6 space-y-5">
              
              {/* Type Switcher */}
              <div className="grid grid-cols-2 gap-2 p-1 bg-slate-950 rounded-xl border border-white/5">
                {(["income", "expense"] as const).map((t) => (
                  <Button
                    key={t}
                    type="button"
                    onClick={() => setType(t)}
                    title={`Set ${t} transaction type`}
                    aria-label={`Set ${t} transaction type`}
                    aria-pressed={type === t}
                    className={`relative py-2.5 rounded-lg text-sm font-bold capitalize transition-colors z-10 ${
                      type === t ? "text-white" : "text-slate-500 hover:text-slate-300"
                    }`}
                  >
                    {type === t && (
                      <motion.div
                        layoutId="modalType"
                        className={`absolute inset-0 rounded-lg -z-10 shadow-sm ${
                          t === "income" ? "bg-emerald-600" : "bg-rose-600"
                        }`}
                        transition={{ type: "spring", bounce: 0.2, duration: 0.5 }}
                      />
                    )}
                    {t}
                  </Button>
                ))}
              </div>

              {/* Amount */}
              <div>
                <label className="text-xs font-bold text-slate-400 uppercase ml-1 tracking-wider">Amount</label>
                <div className="relative mt-1 group">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-bold text-lg">৳</span>
                  <input
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="w-full bg-slate-800 border border-slate-700 group-hover:border-slate-600 focus:border-blue-500 pl-10 pr-4 py-3 rounded-xl outline-none transition-colors text-white font-mono text-xl font-bold placeholder:font-normal"
                    placeholder="0.00"
                    autoFocus
                  />
                </div>
              </div>

              {/* Category */}
              <div>
                <label className="text-xs font-bold text-slate-400 uppercase ml-1 tracking-wider">Category</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full mt-1 bg-slate-800 border border-slate-700 hover:border-slate-600 focus:border-blue-500 px-4 py-3 rounded-xl outline-none appearance-none transition-colors text-white cursor-pointer font-medium"
                  title="Transaction category"
                >
                  <option value="" disabled>Select a category...</option>
                  <option value="Rent">Rent</option>
                  <option value="Groceries">Groceries</option>
                  <option value="Food">Food</option>
                  <option value="Bills">Bills</option>
                  <option value="Salary">Salary</option>
                  <option value="Freelance">Freelance</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              {/* Date */}
              <div>
                <label className="text-xs font-bold text-slate-400 uppercase ml-1 tracking-wider">Date</label>
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full mt-1 bg-slate-800 border border-slate-700 hover:border-slate-600 focus:border-blue-500 px-4 py-3 rounded-xl outline-none transition-colors text-white scheme:dark font-medium"
                  title="Transaction date"
                  placeholder="YYYY-MM-DD"
                />
              </div>

              {/* Note */}
              <div>
                <label className="text-xs font-bold text-slate-400 uppercase ml-1 tracking-wider">Note (Optional)</label>
                <input
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  className="w-full mt-1 bg-slate-800 border border-slate-700 hover:border-slate-600 focus:border-blue-500 px-4 py-3 rounded-xl outline-none transition-colors text-white font-medium"
                  placeholder="e.g. Monthly grocery run"
                  title="Note (Optional)"
                />
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 pt-2">
                <button
                  onClick={onClose}
                  className="flex-1 py-3.5 rounded-xl font-bold bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
                >
                  Cancel
                </button>

                <button
                  onClick={handleSubmit}
                  className={`flex-1 py-3.5 rounded-xl font-bold text-white transition-all shadow-lg flex items-center justify-center gap-2 ${
                    type === "income" 
                      ? "bg-emerald-600 hover:bg-emerald-500 shadow-emerald-900/20" 
                      : "bg-rose-600 hover:bg-rose-500 shadow-rose-900/20"
                  }`}
                >
                  <Check size={20} strokeWidth={3} />
                  Add {type === "income" ? "Income" : "Expense"}
                </button>
              </div>

            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}