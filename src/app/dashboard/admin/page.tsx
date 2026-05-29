import { 
  Users, Car, ShieldAlert, BarChart3, 
  CheckCircle2, XCircle, MoreVertical, Search
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { MOCK_CARS } from "@/lib/mock-data";
import { formatCurrency } from "@/lib/utils";

const AdminDashboard = () => {
  return (
    <div className="space-y-12">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <h1 className="text-3xl font-black text-primary mb-2">Admin Control Center</h1>
          <p className="text-muted-foreground font-medium">Monitoring LuxDrive's global operations and quality.</p>
        </div>
        <div className="flex gap-4">
           <Button variant="outline" className="rounded-2xl h-14 px-8 border-2 font-bold">Generate Report</Button>
           <Button variant="accent" className="rounded-2xl h-14 px-8 shadow-xl shadow-accent/20">System Settings</Button>
        </div>
      </div>

      {/* Admin Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: "Active Listings", value: "1,240", icon: Car, color: "text-blue-500" },
          { label: "Pending Approvals", value: "18", icon: ShieldAlert, color: "text-orange-500" },
          { label: "Registered Users", value: "42.5K", icon: Users, color: "text-purple-500" },
          { label: "Revenue (MTD)", value: "₹24.8Cr", icon: BarChart3, color: "text-green-500" },
        ].map((stat, idx) => (
          <div key={idx} className="bg-white p-8 rounded-[2.5rem] border border-border shadow-sm">
            <div className="w-12 h-12 bg-secondary rounded-2xl flex items-center justify-center mb-6">
              <stat.icon className={cn("w-6 h-6", stat.color)} />
            </div>
            <p className="text-xs font-bold text-muted uppercase tracking-widest mb-1">{stat.label}</p>
            <p className="text-3xl font-black text-primary">{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Pending Listings Section */}
      <div className="bg-white rounded-[3rem] border border-border shadow-sm overflow-hidden">
        <div className="p-10 border-b border-border flex items-center justify-between">
          <h3 className="text-xl font-black">Pending Approval Queue</h3>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted" />
            <input type="text" placeholder="Search listing ID..." className="pl-10 pr-4 py-2 bg-secondary rounded-xl text-xs font-bold border-none" />
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-secondary/50">
              <tr>
                <th className="px-10 py-6 text-xs font-bold uppercase tracking-widest text-muted">Vehicle Details</th>
                <th className="px-6 py-6 text-xs font-bold uppercase tracking-widest text-muted">Seller Type</th>
                <th className="px-6 py-6 text-xs font-bold uppercase tracking-widest text-muted">Date Added</th>
                <th className="px-10 py-6 text-xs font-bold uppercase tracking-widest text-muted text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {MOCK_CARS.slice(0, 4).map((car) => (
                <tr key={car.id} className="hover:bg-secondary/20 transition-colors group">
                  <td className="px-10 py-8">
                    <div className="flex items-center gap-4">
                      <div className="w-20 h-14 bg-secondary rounded-xl overflow-hidden shrink-0">
                         <img src={car.image} className="w-full h-full object-cover" />
                      </div>
                      <div>
                        <p className="text-sm font-black text-primary">{car.model}</p>
                        <p className="text-xs font-bold text-muted">{car.brand} • {formatCurrency(car.price)}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-8">
                     <span className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-accent bg-accent/10 px-3 py-1.5 rounded-full">
                       {car.seller.type}
                     </span>
                  </td>
                  <td className="px-6 py-8 text-xs font-bold text-primary">May 14, 2024</td>
                  <td className="px-10 py-8 text-right">
                    <div className="flex items-center justify-end gap-2">
                       <button className="p-2.5 bg-green-500/10 text-green-600 rounded-xl hover:bg-green-500 hover:text-white transition-all" title="Approve">
                         <CheckCircle2 className="w-5 h-5" />
                       </button>
                       <button className="p-2.5 bg-red-500/10 text-red-600 rounded-xl hover:bg-red-500 hover:text-white transition-all" title="Reject">
                         <XCircle className="w-5 h-5" />
                       </button>
                       <button className="p-2.5 bg-secondary text-muted rounded-xl hover:text-primary transition-all">
                         <MoreVertical className="w-5 h-5" />
                       </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

// Helper for cn in this file
const cn = (...classes: any[]) => classes.filter(Boolean).join(' ');

export default AdminDashboard;
