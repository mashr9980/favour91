"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Menu, X, LogOut } from "lucide-react";
import {
  getAuthCookies,
  getCurrentUser,
  logoutUser,
} from "@/lib/auth";

export default function DashboardLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    async function loadUser() {
      const { token } = getAuthCookies();
      if (!token) {
        router.push("/login");
        return;
      }
      try {
        const data = await getCurrentUser(token);
        if (!data.tier) {
          router.push("/pricing");
          return;
        }
        setUser(data);
      } catch (err) {
        console.error(err);
        router.push("/login");
      } finally {
        setLoading(false);
      }
    }
    loadUser();
  }, [router]);

  const handleLogout = async () => {
    const { token } = getAuthCookies();
    await logoutUser(token);
    router.push("/login");
  };

  const tierLevel = user?.tier === "tier1" ? 1 : user?.tier === "tier2" ? 2 : 3;

  const menuItems = [
    { tier: 1, href: "/dashboard", label: "Dashboard" },
    { tier: 1, href: "/dashboard/opportunity-engine", label: "Opportunity Engine" },
    { tier: 2, href: "/dashboard/proposal-studio", label: "Proposal Studio" },
    { tier: 3, href: "/dashboard/contract-command-center", label: "Contract Command Center" },
  ];

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">Loading...</div>
    );
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      <aside
        className={`fixed inset-y-0 left-0 z-20 w-64 transform bg-white p-4 shadow-lg transition-transform duration-200 md:static md:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-xl font-semibold">VENDR OS</h2>
          <button
            className="md:hidden"
            onClick={() => setSidebarOpen(false)}
          >
            <X className="h-6 w-6" />
          </button>
        </div>
        <div className="mb-4 space-y-1">
          <p className="font-medium">{user?.username}</p>
          <p className="text-sm text-gray-500">{user?.tier}</p>
        </div>
        <nav className="space-y-1">
          {menuItems
            .filter((item) => item.tier <= tierLevel)
            .map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="block rounded px-3 py-2 text-sm font-medium hover:bg-gray-100"
                onClick={() => setSidebarOpen(false)}
              >
                {item.label}
              </Link>
            ))}
          <button
            onClick={handleLogout}
            className="mt-4 flex w-full items-center justify-start rounded px-3 py-2 text-sm hover:bg-gray-100"
          >
            <LogOut className="mr-2 h-4 w-4" /> Logout
          </button>
        </nav>
      </aside>
      <div className="flex w-full flex-col md:ml-64">
        <header className="flex items-center justify-between bg-white p-4 shadow md:hidden">
          <button onClick={() => setSidebarOpen(true)}>
            <Menu className="h-6 w-6" />
          </button>
          <h1 className="text-lg font-semibold">Dashboard</h1>
        </header>
        <main className="flex-1 p-4">{children}</main>
      </div>
    </div>
  );
}
