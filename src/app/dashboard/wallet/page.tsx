"use client";

import React, { useState } from "react";
import { Wallet, Plus, ArrowDownToLine, History, ArrowUpRight, ArrowDownLeft, ShieldCheck } from "lucide-react";
import { formatCurrency } from "@/lib/utils";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

const MOCK_TRANSACTIONS = [
  { id: "TRX-9821", type: "credit", amount: 500000, date: "28 May, 2026", description: "Added funds via Bank Transfer", status: "completed" },
  { id: "TRX-9820", type: "debit", amount: 125000, date: "25 May, 2026", description: "Booking deposit for BMW X5", status: "completed" },
  { id: "TRX-9819", type: "credit", amount: 25000, date: "20 May, 2026", description: "Referral Bonus (John Doe)", status: "completed" },
  { id: "TRX-9818", type: "debit", amount: 15000, date: "15 May, 2026", description: "Premium Inspection Service", status: "completed" },
];

const WalletPage = () => {
  const [balance] = useState(1385000); // Dummy balance
  const [activeTab, setActiveTab] = useState("all");

  return (
    <div className="p-6 md:p-10 max-w-6xl mx-auto font-sans">
      <div className="mb-10">
        <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-2">My Wallet</h1>
        <p className="text-gray-500 font-medium">Manage your funds, track transactions, and view your financial history.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
        {/* Balance Card */}
        <div className="lg:col-span-2 bg-gradient-to-br from-blue-900 to-blue-950 rounded-3xl p-8 text-white relative overflow-hidden shadow-2xl shadow-blue-900/20">
          <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-purple-500/20 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>
          
          <div className="relative z-10 flex flex-col h-full justify-between">
            <div className="flex justify-between items-start mb-8">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center backdrop-blur-md">
                  <Wallet className="w-6 h-6 text-white" />
                </div>
                <span className="font-semibold text-blue-100 tracking-wider">AVAILABLE BALANCE</span>
              </div>
              <ShieldCheck className="w-6 h-6 text-blue-300" />
            </div>

            <div>
              <h2 className="text-5xl md:text-6xl font-black mb-2 tracking-tight">{formatCurrency(balance)}</h2>
              <p className="text-blue-200 font-medium">Securely stored in your LuxDrive account</p>
            </div>

            <div className="mt-10 flex flex-wrap gap-4">
              <button className="px-6 py-3.5 bg-white text-blue-950 font-bold rounded-xl hover:bg-gray-50 transition-colors flex items-center gap-2">
                <Plus className="w-5 h-5" />
                Add Funds
              </button>
              <button className="px-6 py-3.5 bg-white/10 text-white font-bold rounded-xl hover:bg-white/20 backdrop-blur-md border border-white/10 transition-colors flex items-center gap-2">
                <ArrowDownToLine className="w-5 h-5" />
                Withdraw
              </button>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm flex flex-col justify-center gap-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-green-50 rounded-2xl flex items-center justify-center shrink-0">
              <ArrowDownLeft className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <p className="text-sm font-bold text-gray-500 mb-1">Total Received</p>
              <p className="text-2xl font-black text-gray-900">{formatCurrency(2500000)}</p>
            </div>
          </div>
          <div className="w-full h-px bg-gray-100"></div>
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-red-50 rounded-2xl flex items-center justify-center shrink-0">
              <ArrowUpRight className="w-6 h-6 text-red-600" />
            </div>
            <div>
              <p className="text-sm font-bold text-gray-500 mb-1">Total Spent</p>
              <p className="text-2xl font-black text-gray-900">{formatCurrency(1115000)}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Transaction History */}
      <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="p-6 md:p-8 border-b border-gray-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <History className="w-6 h-6 text-blue-600" />
            <h3 className="text-xl font-extrabold text-gray-900">Transaction History</h3>
          </div>
          
          <div className="flex bg-gray-50 p-1 rounded-xl w-fit">
            <button onClick={() => setActiveTab("all")} className={cn("px-4 py-2 rounded-lg text-sm font-bold transition-all", activeTab === "all" ? "bg-white text-gray-900 shadow-sm" : "text-gray-500 hover:text-gray-700")}>All</button>
            <button onClick={() => setActiveTab("credit")} className={cn("px-4 py-2 rounded-lg text-sm font-bold transition-all", activeTab === "credit" ? "bg-white text-gray-900 shadow-sm" : "text-gray-500 hover:text-gray-700")}>Credits</button>
            <button onClick={() => setActiveTab("debit")} className={cn("px-4 py-2 rounded-lg text-sm font-bold transition-all", activeTab === "debit" ? "bg-white text-gray-900 shadow-sm" : "text-gray-500 hover:text-gray-700")}>Debits</button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50/50">
                <th className="px-6 md:px-8 py-4 text-xs font-bold text-gray-500 uppercase tracking-widest">Transaction</th>
                <th className="px-6 md:px-8 py-4 text-xs font-bold text-gray-500 uppercase tracking-widest">Date</th>
                <th className="px-6 md:px-8 py-4 text-xs font-bold text-gray-500 uppercase tracking-widest">Status</th>
                <th className="px-6 md:px-8 py-4 text-xs font-bold text-gray-500 uppercase tracking-widest text-right">Amount</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {MOCK_TRANSACTIONS.filter(t => activeTab === "all" || t.type === activeTab).map((trx) => (
                <tr key={trx.id} className="hover:bg-gray-50/50 transition-colors group">
                  <td className="px-6 md:px-8 py-5">
                    <div className="flex items-center gap-4">
                      <div className={cn("w-10 h-10 rounded-full flex items-center justify-center shrink-0", trx.type === 'credit' ? 'bg-green-50' : 'bg-red-50')}>
                        {trx.type === 'credit' ? <ArrowDownLeft className="w-5 h-5 text-green-600" /> : <ArrowUpRight className="w-5 h-5 text-red-600" />}
                      </div>
                      <div>
                        <p className="font-bold text-gray-900 mb-0.5">{trx.description}</p>
                        <p className="text-xs font-medium text-gray-500">{trx.id}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 md:px-8 py-5">
                    <span className="font-medium text-gray-600">{trx.date}</span>
                  </td>
                  <td className="px-6 md:px-8 py-5">
                    <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold bg-green-50 text-green-700 capitalize">
                      {trx.status}
                    </span>
                  </td>
                  <td className="px-6 md:px-8 py-5 text-right">
                    <span className={cn("font-extrabold text-base", trx.type === 'credit' ? 'text-green-600' : 'text-gray-900')}>
                      {trx.type === 'credit' ? '+' : '-'}{formatCurrency(trx.amount)}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          
          {MOCK_TRANSACTIONS.filter(t => activeTab === "all" || t.type === activeTab).length === 0 && (
            <div className="p-12 text-center text-gray-500 font-medium">
              No transactions found.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default WalletPage;
