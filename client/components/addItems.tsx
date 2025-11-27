"use client";

import { TrendingDown, Wallet, X } from "lucide-react";

// ---------------------------------------------
// Interfaces
// ---------------------------------------------

export interface Transaction {
  id: number;
  name: string;
  category: string;
  date: string;
  amount: number;
  type: "income" | "expense";
}

export interface AddItemsProps {
  transaction: Transaction;
  removeTransaction: (id: number) => void;
  handleTransactionChange: <K extends keyof Transaction>(
    id: number,
    field: K,
    value: Transaction[K]
  ) => void;
}


// ---------------------------------------------
// Component
// ---------------------------------------------

const AddItems = ({
  transaction,
  removeTransaction,
  handleTransactionChange,
}: AddItemsProps) => {
  const isIncome = transaction.type === "income";

  return (
    <div className="flex items-center justify-between p-3 rounded-2xl shadow-md border border-gray-100 transition duration-300 hover:shadow-lg hover:border-green-400">
      <div className="flex items-center gap-3 w-3/4">
        {/* Icon section */}
        <div
          className={`${isIncome ? "bg-green-100" : "bg-red-100"} p-3 rounded-xl`}
        >
          {isIncome ? (
            <Wallet className="text-green-600" />
          ) : (
            <TrendingDown className="text-red-600" />
          )}
        </div>

        {/* Name + Category + Date */}
        <div className="flex-1">
          <input
            type="text"
            value={transaction.name}
            onChange={(e) =>
              handleTransactionChange(transaction.id, "name", e.target.value)
            }
            className="font-medium text-black border-none bg-transparent focus:ring-0 p-0 w-full outline-none"
          />

          <p className="text-gray-500 text-sm">
            {transaction.category} • {transaction.date}
          </p>
        </div>
      </div>

      {/* Amount + Delete */}
      <div className="flex items-center gap-3">
        <input
          type="number"
          value={Math.abs(transaction.amount)}
          onChange={(e) => {
            const amount = parseFloat(e.target.value) || 0;
            const finalAmount = isIncome
              ? Math.abs(amount)
              : -Math.abs(amount);
            handleTransactionChange(transaction.id, "amount", finalAmount);
          }}
          className={`${isIncome ? "text-green-600" : "text-red-600"} font-semibold text-right border-none bg-transparent focus:ring-0 p-0 outline-none`}
          style={{ width: "80px" }}
        />

        <button
          onClick={() => removeTransaction(transaction.id)}
          className="text-gray-400 hover:text-red-500 p-1 rounded-full transition-colors"
        >
          <X size={16} />
        </button>
      </div>
    </div>
  );
};

export default AddItems;
