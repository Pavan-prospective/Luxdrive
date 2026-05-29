import { 
  ShieldCheck, Server, Globe, Database, 
  Activity, Lock, Key, Settings2, ArrowRight
} from "lucide-react";
import { Button } from "@/components/ui/Button";

const SuperAdminDashboard = () => {
  return (
    <div className="space-y-12">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="px-3 py-1 bg-primary text-white text-[10px] font-black uppercase tracking-[0.2em] rounded-full">Root Access</span>
            <h1 className="text-3xl font-black text-primary">Platform Infrastructure</h1>
          </div>
          <p className="text-muted-foreground font-medium">Global system health and master configurations.</p>
        </div>
      </div>

      {/* System Health */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: "Server Load", value: "12%", icon: Server, color: "text-green-500", status: "Optimal" },
          { label: "Database Health", value: "99.9%", icon: Database, color: "text-blue-500", status: "Stable" },
          { label: "API Latency", value: "48ms", icon: Activity, color: "text-accent", status: "Nominal" },
          { label: "Security Status", value: "Level 5", icon: Lock, color: "text-green-500", status: "Hardened" },
        ].map((sys, idx) => (
          <div key={idx} className="bg-white p-8 rounded-[2.5rem] border border-border shadow-sm">
             <div className="flex justify-between items-start mb-6">
                <div className="w-12 h-12 bg-secondary rounded-2xl flex items-center justify-center">
                  <sys.icon className={cn("w-6 h-6", sys.color)} />
                </div>
                <span className="text-[10px] font-black uppercase tracking-widest text-green-500">{sys.status}</span>
             </div>
             <p className="text-xs font-bold text-muted uppercase tracking-widest mb-1">{sys.label}</p>
             <p className="text-3xl font-black text-primary">{sys.value}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Manage Admins */}
        <div className="lg:col-span-7 bg-white rounded-[3rem] border border-border shadow-sm overflow-hidden">
          <div className="p-10 border-b border-border flex items-center justify-between">
            <h3 className="text-xl font-black">Admin Access Management</h3>
            <Button variant="accent" size="sm" className="rounded-xl font-black">Add New Admin</Button>
          </div>
          <div className="p-8 space-y-6">
             {[
               { name: "Sarah Connor", role: "Regional Head", status: "Active", access: "High" },
               { name: "John Doe", role: "Verification Officer", status: "Active", access: "Mid" },
               { name: "Marcus Wright", role: "Support Lead", status: "Inactive", access: "Low" },
             ].map((admin, idx) => (
               <div key={idx} className="flex items-center justify-between p-6 bg-secondary/40 rounded-3xl group hover:bg-white hover:border-accent border border-transparent transition-all">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-primary text-white rounded-2xl flex items-center justify-center font-black">
                      {admin.name[0]}
                    </div>
                    <div>
                      <p className="font-black text-primary">{admin.name}</p>
                      <p className="text-xs font-bold text-muted uppercase tracking-widest">{admin.role}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-6">
                    <div className="text-right hidden md:block">
                       <p className="text-[10px] font-bold text-muted uppercase tracking-widest">Access Level</p>
                       <p className="text-sm font-black text-accent">{admin.access}</p>
                    </div>
                    <Button variant="ghost" size="icon" className="rounded-xl hover:bg-secondary">
                      <Settings2 className="w-5 h-5 text-muted" />
                    </Button>
                  </div>
               </div>
             ))}
          </div>
        </div>

        {/* Platform Configuration */}
        <div className="lg:col-span-5 space-y-8">
           <div className="bg-primary p-10 rounded-[3rem] text-white overflow-hidden relative group">
              <div className="absolute bottom-0 right-0 w-48 h-48 bg-accent/10 rounded-full blur-3xl translate-y-1/2 translate-x-1/2" />
              <h3 className="text-2xl font-black mb-8 relative z-10">System Audit Logs</h3>
              <div className="space-y-6 relative z-10">
                 {[
                   { log: "Admin 'sarah_c' updated price threshold", time: "10m ago" },
                   { log: "Global CDN purge completed", time: "45m ago" },
                   { log: "Security patch v2.4.1 applied", time: "3h ago" },
                   { log: "New node spawned in 'eu-west-1'", time: "6h ago" },
                 ].map((log, idx) => (
                   <div key={idx} className="flex flex-col gap-1 border-l-2 border-accent/30 pl-4 py-1">
                      <p className="text-xs font-bold text-white/90">{log.log}</p>
                      <span className="text-[10px] font-bold text-white/40 uppercase tracking-widest">{log.time}</span>
                   </div>
                 ))}
              </div>
              <Button variant="ghost" className="w-full mt-10 text-accent font-black text-xs uppercase tracking-[0.2em] group">
                View Full Logs <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-2" />
              </Button>
           </div>

           <div className="bg-white p-10 rounded-[3rem] border border-border shadow-sm">
              <h3 className="text-xl font-black mb-6">Security & Keys</h3>
              <div className="space-y-4">
                 <div className="flex items-center justify-between p-4 bg-secondary rounded-2xl">
                    <div className="flex items-center gap-3">
                       <Key className="w-5 h-5 text-accent" />
                       <span className="text-sm font-bold text-primary">API Master Key</span>
                    </div>
                    <span className="text-[10px] font-black text-muted">•••• ••••</span>
                 </div>
                 <div className="flex items-center justify-between p-4 bg-secondary rounded-2xl">
                    <div className="flex items-center gap-3">
                       <Globe className="w-5 h-5 text-accent" />
                       <span className="text-sm font-bold text-primary">SSL Certificate</span>
                    </div>
                    <span className="text-[10px] font-black text-green-500">Valid</span>
                 </div>
              </div>
              <Button variant="outline" className="w-full rounded-2xl h-14 mt-8 font-black border-2">Manage Infrastructure</Button>
           </div>
        </div>
      </div>
    </div>
  );
};

const cn = (...classes: any[]) => classes.filter(Boolean).join(' ');

export default SuperAdminDashboard;
