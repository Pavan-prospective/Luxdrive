"use client";

import React, { useState } from "react";
import { Users, Copy, CheckCircle2, TrendingUp, Gift, Share2, Award } from "lucide-react";
import { formatCurrency } from "@/lib/utils";
import { cn } from "@/lib/utils";

const MOCK_REFERRALS = [
  { id: "REF-001", name: "John Doe", date: "24 May, 2026", status: "completed", reward: 25000 },
  { id: "REF-002", name: "Sarah Smith", date: "21 May, 2026", status: "pending", reward: 0 },
  { id: "REF-003", name: "Michael Chang", date: "15 May, 2026", status: "completed", reward: 25000 },
];

const ReferralsPage = () => {
  const [copied, setCopied] = useState(false);
  const referralCode = "LUXE-98X2A";
  const inviteLink = `https://luxdrive.com/join?ref=${referralCode}`;

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(inviteLink);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy", err);
    }
  };

  return (
    <div className="p-6 md:p-10 max-w-6xl mx-auto font-sans">
      <div className="mb-10">
        <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-2">Referrals Program</h1>
        <p className="text-gray-500 font-medium">Invite your friends to LuxDrive and earn rewards on every successful car purchase or sale.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12">
        {/* Main Invite Card */}
        <div className="lg:col-span-8 bg-white rounded-3xl p-8 md:p-10 border border-gray-100 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] relative overflow-hidden">
          {/* Abstract background shapes */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-amber-100 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3"></div>
          <div className="absolute bottom-0 right-10 w-40 h-40 bg-orange-100 rounded-full blur-3xl translate-y-1/2"></div>

          <div className="relative z-10">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-14 h-14 bg-amber-50 rounded-2xl flex items-center justify-center shrink-0 border border-amber-100">
                <Gift className="w-7 h-7 text-amber-500" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Invite & Earn</h2>
                <p className="text-sm font-medium text-amber-600 tracking-wide uppercase">Earn ₹25,000 per referral</p>
              </div>
            </div>

            <p className="text-gray-600 mb-10 max-w-lg leading-relaxed">
              Share your unique referral link with friends. When they buy or sell their first luxury vehicle on LuxDrive, you both receive a <strong className="text-gray-900">₹25,000 cash bonus</strong> credited directly to your LuxDrive Wallet.
            </p>

            <div className="space-y-4">
              <label className="text-xs font-bold uppercase tracking-widest text-gray-500">Your Unique Link</label>
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="flex-1 bg-gray-50 border border-gray-200 rounded-xl px-5 py-4 font-mono text-sm text-gray-800 flex items-center overflow-hidden">
                  <span className="truncate w-full">{inviteLink}</span>
                </div>
                <button 
                  onClick={copyToClipboard}
                  className={cn(
                    "px-8 py-4 font-bold rounded-xl transition-all flex items-center justify-center gap-2 shrink-0",
                    copied ? "bg-green-500 text-white shadow-lg shadow-green-500/30" : "bg-gray-900 text-white hover:bg-gray-800 shadow-lg shadow-gray-900/20"
                  )}
                >
                  {copied ? <CheckCircle2 className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
                  {copied ? "Copied!" : "Copy Link"}
                </button>
              </div>
            </div>

            <div className="mt-8 flex gap-3">
              <button className="flex items-center justify-center gap-2 px-6 py-3 bg-[#25D366]/10 text-[#25D366] font-bold rounded-xl hover:bg-[#25D366]/20 transition-colors">
                 <Share2 className="w-4 h-4" /> Share on WhatsApp
              </button>
            </div>
          </div>
        </div>

        {/* Stats Column */}
        <div className="lg:col-span-4 flex flex-col gap-6">
          <div className="bg-gradient-to-br from-gray-900 to-black rounded-3xl p-8 text-white flex-1 relative overflow-hidden shadow-xl">
             <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/20 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2"></div>
             <Award className="w-8 h-8 text-amber-400 mb-6" />
             <p className="text-gray-400 text-sm font-bold uppercase tracking-widest mb-1">Total Earned</p>
             <p className="text-4xl font-black text-white">{formatCurrency(50000)}</p>
          </div>
          
          <div className="bg-white border border-gray-100 rounded-3xl p-8 flex-1 flex flex-col justify-center shadow-sm">
             <Users className="w-8 h-8 text-blue-600 mb-6" />
             <p className="text-gray-500 text-sm font-bold uppercase tracking-widest mb-1">Friends Joined</p>
             <p className="text-4xl font-black text-gray-900">2 <span className="text-base text-gray-400 font-medium">registered</span></p>
          </div>
        </div>
      </div>

      {/* Referral History */}
      <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="p-6 md:p-8 border-b border-gray-100 flex items-center gap-3">
          <TrendingUp className="w-6 h-6 text-gray-900" />
          <h3 className="text-xl font-extrabold text-gray-900">Your Referrals</h3>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50/50">
                <th className="px-6 md:px-8 py-4 text-xs font-bold text-gray-500 uppercase tracking-widest">Referred User</th>
                <th className="px-6 md:px-8 py-4 text-xs font-bold text-gray-500 uppercase tracking-widest">Date Joined</th>
                <th className="px-6 md:px-8 py-4 text-xs font-bold text-gray-500 uppercase tracking-widest">Status</th>
                <th className="px-6 md:px-8 py-4 text-xs font-bold text-gray-500 uppercase tracking-widest text-right">Reward</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {MOCK_REFERRALS.map((ref) => (
                <tr key={ref.id} className="hover:bg-gray-50/50 transition-colors">
                  <td className="px-6 md:px-8 py-5">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center shrink-0 border border-blue-100 text-blue-600 font-bold">
                        {ref.name.charAt(0)}
                      </div>
                      <span className="font-bold text-gray-900">{ref.name}</span>
                    </div>
                  </td>
                  <td className="px-6 md:px-8 py-5">
                    <span className="font-medium text-gray-600">{ref.date}</span>
                  </td>
                  <td className="px-6 md:px-8 py-5">
                    <span className={cn(
                      "inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold capitalize border",
                      ref.status === 'completed' ? "bg-green-50 text-green-700 border-green-200" : "bg-amber-50 text-amber-700 border-amber-200"
                    )}>
                      {ref.status}
                    </span>
                  </td>
                  <td className="px-6 md:px-8 py-5 text-right">
                    <span className={cn(
                      "font-extrabold text-base", 
                      ref.reward > 0 ? "text-gray-900" : "text-gray-400"
                    )}>
                      {formatCurrency(ref.reward)}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          
          {MOCK_REFERRALS.length === 0 && (
            <div className="p-12 text-center text-gray-500 font-medium">
              You haven't referred anyone yet. Share your link to start earning!
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ReferralsPage;
