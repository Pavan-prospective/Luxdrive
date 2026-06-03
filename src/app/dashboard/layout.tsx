"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { 
  LayoutDashboard, Car, Heart, MessageSquare, 
  Settings, LogOut, Menu, X, Bell, User
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuth } from "@/context/AuthContext";

const NAV_ITEMS = [
  { name: "Overview", href: "/dashboard", icon: LayoutDashboard },
  { name: "My Listings", href: "/dashboard/listings", icon: Car },
  { name: "Favorites", href: "/dashboard/favorites", icon: Heart },
  { name: "Inquiries", href: "/dashboard/inquiries", icon: MessageSquare },
  { name: "Profile", href: "/dashboard/profile", icon: User },
  { name: "Settings", href: "/dashboard/settings", icon: Settings },
];

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const { user, isAuthenticated, isLoading, logout } = useAuth();

  // 1. Dashboard Authentication Guard
  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push("/auth/login");
    }
  }, [isAuthenticated, isLoading, router]);

  // Name initials generator for avatar
  const getInitials = (name: string) => {
    if (!name) return "U";
    const parts = name.trim().split(/\s+/);
    if (parts.length >= 2) {
      return (parts[0][0] + parts[1][0]).toUpperCase();
    }
    return parts[0].slice(0, 2).toUpperCase();
  };

  // Render high-quality loading screen during session restoration
  if (isLoading) {
    return (
      <div className="min-h-screen bg-secondary/30 flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="h-12 w-12 animate-spin rounded-full border-4 border-accent border-t-transparent" />
          <p className="text-sm font-bold text-muted uppercase tracking-widest animate-pulse">Loading Workspace...</p>
        </div>
      </div>
    );
  }

  // Prevent flash of secure content if unauthenticated and redirecting
  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen bg-secondary/30 flex">
      {/* Sidebar (Desktop) */}
      <aside className="hidden lg:flex w-72 bg-primary flex-col border-r border-white/5 fixed inset-y-0 z-50">
        <div className="p-8">
          <Link href="/" className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center">
              <span className="text-primary font-black text-2xl">L</span>
            </div>
            <span className="text-2xl font-black text-white tracking-tight">LuxDrive</span>
          </Link>
        </div>

        <nav className="flex-1 px-6 space-y-2 py-8">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "flex items-center gap-4 px-6 py-4 rounded-2xl text-sm font-bold transition-all group",
                pathname === item.href 
                  ? "bg-accent text-white shadow-lg shadow-accent/20" 
                  : "text-white/50 hover:text-white hover:bg-white/5"
              )}
            >
              <item.icon className={cn("w-5 h-5", pathname === item.href ? "text-white" : "text-accent")} />
              {item.name}
            </Link>
          ))}
        </nav>

        <div className="p-6">
          <button 
            onClick={logout}
            className="flex items-center gap-4 px-6 py-4 rounded-2xl text-sm font-bold text-red-400 hover:bg-red-400/10 transition-all w-full cursor-pointer focus:outline-none"
          >
            <LogOut className="w-5 h-5" />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 lg:ml-72 flex flex-col min-h-screen">
        {/* Top Header */}
        <header className="h-20 bg-white border-b border-border px-8 flex items-center justify-between sticky top-0 z-40">
          <div className="flex items-center gap-4">
            <button className="lg:hidden p-2 bg-secondary rounded-xl" onClick={() => setIsSidebarOpen(true)}>
              <Menu className="w-6 h-6" />
            </button>
            <Link href="/" className="flex items-center gap-2 lg:hidden">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">L</span>
              </div>
            </Link>
          </div>

          <h2 className="text-xl font-black text-primary hidden md:block">Workspace Panel</h2>

          <div className="flex items-center gap-6">
            <button className="relative p-2.5 bg-secondary rounded-xl hover:bg-border transition-colors">
              <Bell className="w-5 h-5" />
              <span className="absolute top-2 right-2 w-2 h-2 bg-accent rounded-full border-2 border-white" />
            </button>
            <div className="flex items-center gap-4 pl-6 border-l border-border">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-black text-primary">{user?.full_name || "Alexander Luxe"}</p>
                <p className="text-[10px] font-bold text-accent uppercase tracking-widest">{user?.role || "Premium Member"}</p>
              </div>
              <div className="w-10 h-10 rounded-xl bg-accent flex items-center justify-center text-white font-black text-lg select-none">
                {getInitials(user?.full_name || "Alexander Luxe")}
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-grow p-8 md:p-12 xl:p-16 2xl:p-24 max-w-[1920px] w-full mx-auto">
          {children}
        </main>
      </div>

      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div className="fixed inset-0 z-[60] bg-black/60 backdrop-blur-sm lg:hidden">
          <div className="absolute left-0 top-0 bottom-0 w-full max-w-[280px] bg-primary p-8 animate-in slide-in-from-left duration-300">
             <button onClick={() => setIsSidebarOpen(false)} className="absolute top-6 right-6 p-2 text-white/50">
               <X className="w-6 h-6" />
             </button>
             {/* Mobile Sidebar Navigation */}
             <div className="mt-8 space-y-4">
                {NAV_ITEMS.map((item) => (
                  <Link 
                    key={item.name} 
                    href={item.href} 
                    className={cn(
                      "flex items-center gap-4 py-4 px-4 rounded-xl font-bold transition-all",
                      pathname === item.href ? "text-accent bg-white/5" : "text-white/70 hover:text-white"
                    )} 
                    onClick={() => setIsSidebarOpen(false)}
                  >
                    <item.icon className="w-6 h-6 text-accent" />
                    {item.name}
                  </Link>
                ))}
                <hr className="border-white/5 my-4" />
                <button 
                  onClick={() => {
                    setIsSidebarOpen(false);
                    logout();
                  }}
                  className="flex items-center gap-4 py-4 px-4 rounded-xl font-bold text-red-400 w-full text-left hover:bg-red-500/10 transition-all cursor-pointer"
                >
                  <LogOut className="w-6 h-6" />
                  Sign Out
                </button>
             </div>
          </div>
        </div>
      )}
    </div>
  );
}
