"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import DashboardLayout from "@/components/dashboard/dashboard-layout";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { getAuthCookies, getCurrentUser, getCommonHeaders } from "@/lib/auth";
import { API_BASE_URL } from "@/lib/api";

export default function DashboardPage() {
  const [user, setUser] = useState(null);
  const [loadingUser, setLoadingUser] = useState(true);
  const [opportunities, setOpportunities] = useState([]);
  const [loadingOpps, setLoadingOpps] = useState(true);
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
        setLoadingUser(false);
      }
    }
    loadUser();
  }, [router]);

  useEffect(() => {
    async function fetchOpps() {
      const { token } = getAuthCookies();
      if (!token) return;
      try {
        const res = await fetch(
          `${API_BASE_URL}/api/v1/opportunities/latest`,
          { headers: getCommonHeaders(true, token) }
        );
        if (!res.ok) throw new Error("Failed to fetch opportunities");
        const data = await res.json();
        setOpportunities(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoadingOpps(false);
      }
    }
    fetchOpps();
  }, []);

  if (loadingUser) {
    return <div className="flex h-screen items-center justify-center">Loading...</div>;
  }

  const tierLevel = user.tier === "tier1" ? 1 : user.tier === "tier2" ? 2 : 3;

  const modules = [
    { tier: 1, title: "Opportunity Engine", href: "/dashboard/opportunity-engine" },
    { tier: 2, title: "Proposal Studio", href: "/dashboard/proposal-studio" },
    { tier: 3, title: "Contract Command Center", href: "/dashboard/contract-command-center" },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {modules
            .filter((m) => m.tier <= tierLevel)
            .map((m) => (
              <Card key={m.href} className="hover:shadow-lg transition-shadow">
                <Link href={m.href} className="block p-6">
                  <CardHeader>
                    <CardTitle className="text-lg font-semibold">
                      {m.title}
                    </CardTitle>
                  </CardHeader>
                </Link>
              </Card>
            ))}
        </div>
        <div className="rounded-lg bg-white p-4 shadow">
          <h2 className="mb-4 text-lg font-semibold">Latest Opportunities</h2>
          {loadingOpps ? (
            <p>Loading...</p>
          ) : opportunities.length === 0 ? (
            <p>No opportunities found.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200 text-sm">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-2 text-left font-medium">Title</th>
                    <th className="px-4 py-2 text-left font-medium">Agency</th>
                    <th className="px-4 py-2 text-left font-medium">Due Date</th>
                    <th className="px-4 py-2 text-left font-medium">Value</th>
                    <th className="px-4 py-2" />
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {opportunities.map((opp) => (
                    <tr key={opp.id}>
                      <td className="px-4 py-2">{opp.title}</td>
                      <td className="px-4 py-2">{opp.agency}</td>
                      <td className="px-4 py-2">{opp.due_date}</td>
                      <td className="px-4 py-2">{opp.value}</td>
                      <td className="px-4 py-2 text-right">
                        {opp.url && (
                          <Button asChild size="sm" variant="link">
                            <a href={opp.url} target="_blank" rel="noreferrer">
                              View
                            </a>
                          </Button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}
