"use client";

import { 
  Car, MessageSquare, TrendingUp, ShoppingBag, 
  ArrowUpRight, ShieldCheck 
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { MOCK_CARS } from "@/lib/mock-data";
import { formatCurrency } from "@/lib/utils";
import { useAuth } from "@/context/AuthContext";
import Link from "next/link";

const stats = [
  { label: "Active Listings", value: "04", icon: Car, trend: "+1 new" },
  { label: "Total Inquiries", value: "28", icon: MessageSquare, trend: "+12% week" },
  { label: "Portfolio Value", value: "₹4.2Cr", icon: TrendingUp, trend: "Market High" },
  { label: "Saved Cars", value: "12", icon: ShoppingBag, trend: "3 price drops" },
];

const UserDashboard = () => {
  const recentListings = MOCK_CARS.slice(0, 2);
  const { user } = useAuth();

  const firstName = user?.full_name ? user.full_name.trim().split(/\s+/)[0] : "Alexander";

  return (
    <div className="space-y-12">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <h1 className="text-3xl font-black text-primary mb-2">Welcome Back, {firstName}</h1>
          <p className="text-muted-foreground font-medium">Your luxury automotive portfolio at a glance.</p>
        </div>
        <div className="flex items-center gap-4">
          <Link href="/seller-profile">
            <Button variant="outline" className="rounded-2xl h-14 px-8 border-2 border-accent text-accent hover:bg-accent hover:text-white shadow-xl shadow-accent/10">
              Become a Seller
            </Button>
          </Link>
          <Button variant="accent" className="rounded-2xl h-14 px-8 shadow-xl shadow-accent/20">
            List New Car
          </Button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 xl:gap-8">
        {stats.map((stat, idx) => (
          <div key={idx} className="bg-white p-8 rounded-[2.5rem] border border-border shadow-sm hover:shadow-xl transition-all group">
            <div className="flex items-center justify-between mb-6">
              <div className="w-12 h-12 bg-secondary rounded-2xl flex items-center justify-center group-hover:bg-accent transition-colors">
                <stat.icon className="w-6 h-6 text-primary group-hover:text-white" />
              </div>
              <span className="text-[10px] font-bold text-green-500 bg-green-500/10 px-2 py-1 rounded-full uppercase tracking-widest">{stat.trend}</span>
            </div>
            <p className="text-sm font-bold text-muted uppercase tracking-widest mb-1">{stat.label}</p>
            <p className="text-3xl font-black text-primary">{stat.value}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 xl:gap-12">
        {/* Active Listings */}
        <div className="lg:col-span-8 bg-white rounded-[3rem] border border-border shadow-sm overflow-hidden">
          <div className="p-10 border-b border-border flex items-center justify-between">
            <h3 className="text-xl font-black">My Active Listings</h3>
            <Button variant="ghost" className="text-sm font-bold text-accent">View All</Button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-secondary/50">
                <tr>
                  <th className="px-10 py-6 text-xs font-bold uppercase tracking-widest text-muted">Vehicle</th>
                  <th className="px-6 py-6 text-xs font-bold uppercase tracking-widest text-muted">Status</th>
                  <th className="px-6 py-6 text-xs font-bold uppercase tracking-widest text-muted">Inquiries</th>
                  <th className="px-10 py-6 text-xs font-bold uppercase tracking-widest text-muted text-right">Price</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {recentListings.map((car) => (
                  <tr key={car.id} className="hover:bg-secondary/20 transition-colors group">
                    <td className="px-10 py-8">
                      <div className="flex items-center gap-4">
                        <div className="w-20 h-14 bg-secondary rounded-xl overflow-hidden shrink-0 relative">
                           <img src={car.image} className="w-full h-full object-cover" />
                        </div>
                        <div>
                          <p className="text-sm font-black text-primary group-hover:text-accent transition-colors">{car.model}</p>
                          <p className="text-xs font-bold text-muted uppercase tracking-widest">{car.year} • {car.brand}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-8">
                       <span className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-green-500 bg-green-500/10 px-3 py-1.5 rounded-full">
                         <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
                         Live
                       </span>
                    </td>
                    <td className="px-6 py-8 text-sm font-black text-primary">08</td>
                    <td className="px-10 py-8 text-right">
                       <p className="text-sm font-black text-primary">{formatCurrency(car.price)}</p>
                       <p className="text-[10px] font-bold text-muted uppercase tracking-widest">Fixed</p>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="p-8 bg-secondary/30 text-center">
             <button className="text-sm font-bold text-muted hover:text-primary transition-colors flex items-center justify-center gap-2 mx-auto">
               Load more listings <ArrowUpRight className="w-4 h-4" />
             </button>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="lg:col-span-4 space-y-8">
           <div className="bg-white p-10 rounded-[3rem] border border-border shadow-sm">
             <h3 className="text-xl font-black mb-8">Recent Activity</h3>
             <div className="space-y-8">
               {[
                 { title: "New Inquiry", desc: "For Mercedes-Benz S-Class", icon: MessageSquare, time: "2h ago" },
                 { title: "Price Drop", desc: "Porsche 911 Carrera S", icon: TrendingUp, time: "5h ago" },
                 { title: "Listing Approved", desc: "BMW X7 xDrive40i", icon: ShieldCheck, time: "1d ago" },
               ].map((act, idx) => (
                 <div key={idx} className="flex gap-4">
                   <div className="w-10 h-10 bg-secondary rounded-xl flex items-center justify-center shrink-0">
                     <act.icon className="w-4 h-4 text-accent" />
                   </div>
                   <div>
                     <div className="flex items-center justify-between w-full mb-1">
                        <p className="text-sm font-black text-primary">{act.title}</p>
                        <span className="text-[10px] font-bold text-muted">{act.time}</span>
                     </div>
                     <p className="text-xs text-muted-foreground font-medium">{act.desc}</p>
                   </div>
                 </div>
               ))}
             </div>
             <Button variant="outline" className="w-full rounded-2xl h-12 mt-8 text-xs font-bold">View History</Button>
           </div>

           {/* Membership Card */}
           <div className="bg-primary p-10 rounded-[3rem] text-white relative overflow-hidden group">
             <div className="absolute top-0 right-0 w-32 h-32 bg-accent/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:scale-150 transition-transform duration-700" />
             <div className="flex items-center gap-3 mb-6 relative z-10">
               <ShieldCheck className="w-6 h-6 text-accent" />
               <span className="text-xs font-bold uppercase tracking-[0.3em] text-accent">Black Member</span>
             </div>
             <p className="text-2xl font-black mb-4 relative z-10">Elite Access <br /> Guaranteed.</p>
             <p className="text-xs text-white/50 mb-8 relative z-10 leading-relaxed">Enjoy zero commission on your first 3 luxury car listings this month.</p>
             <Button variant="accent" className="w-full rounded-2xl relative z-10 h-12 text-xs font-bold">Upgrade Plan</Button>
           </div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
