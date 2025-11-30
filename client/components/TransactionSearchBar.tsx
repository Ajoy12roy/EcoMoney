"use client";

import { Calendar, Search } from "lucide-react";
import { motion } from "framer-motion";

export default function TransactionSearchBar() {
  return (
    <div className="w-full bg-slate-800/30 border border-white/5 p-3 rounded-2xl flex flex-col md:flex-row gap-3 shadow-sm">

      {/* SEARCH */}
      <div className="flex-1 relative group">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-emerald-400 transition-colors" size={20} />
        <input
          placeholder="Search transactions..."
          className="w-full bg-slate-900/50 border border-white/10 pl-10 pr-4 py-3 rounded-xl outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 transition-all text-white placeholder:text-slate-500"
        />
      </div>

      {/* DATE PICKER */}
      <motion.div 
        className="min-w-[200px] bg-slate-900/50 border border-white/10 px-4 py-2.5 rounded-xl flex items-center gap-3 relative cursor-pointer hover:border-white/20 transition-colors group"
      >
        <Calendar size={20} className="text-slate-400 group-hover:text-blue-400 transition-colors" />
        <input
          type="date"
          placeholder="Select date"
          className="bg-transparent w-full outline-none text-slate-300 font-medium cursor-pointer scheme:dark"
        />
      </motion.div>

    </div>
  );
}