import { Transaction } from "@/store/useMoneyStore";
import { motion } from "framer-motion";

export default function TransactionCard({ tx }: { tx: Transaction }) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, x: -20, scale: 0.95 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
      whileHover={{ scale: 1.01, backgroundColor: "rgba(30, 41, 59, 0.6)" }}
      className="bg-slate-800/40 border border-slate-700/50 backdrop-blur-sm rounded-2xl p-4 md:p-5 flex justify-between items-center transition-colors cursor-default shadow-sm group"
    >
      <div className="flex flex-col gap-1">
        <h3 className="font-semibold text-base md:text-lg text-white group-hover:text-emerald-300 transition-colors">{tx.name}</h3>
        <div className="flex items-center gap-2">
          <span className="text-[10px] md:text-xs bg-slate-700/50 px-2 py-0.5 rounded text-slate-300 border border-slate-600/30">
            {tx.category}
          </span>
          <span className="text-xs text-slate-500 hidden sm:block">
            • {new Date(tx.date).toLocaleDateString()}
          </span>
        </div>
        <p className="text-xs text-slate-500 sm:hidden">
          {new Date(tx.date).toLocaleDateString()}
        </p>
      </div>

      <strong
        className={`text-lg md:text-xl font-bold ${
          tx.type === "expense" ? "text-rose-400" : "text-emerald-400"
        }`}
      >
        {tx.type === "expense" ? "-" : "+"}৳{tx.amount.toLocaleString()}
      </strong>
    </motion.div>
  );
}