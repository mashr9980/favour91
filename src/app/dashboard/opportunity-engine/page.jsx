"use client";

import { useState } from "react";
import DashboardLayout from "@/components/dashboard/dashboard-layout";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const mockOpportunities = [
  {
    id: 1,
    title: "IT Support Services",
    agency: "Department of Education",
    dueDate: "2024-08-15",
    value: "$750,000",
    fitScore: 4.6,
    type: "RFP",
  },
  {
    id: 2,
    title: "City Website Redesign",
    agency: "City of Austin",
    dueDate: "2024-09-10",
    value: "$320,000",
    fitScore: 4.2,
    type: "RFP",
  },
  {
    id: 3,
    title: "Cybersecurity Assessment",
    agency: "Department of Homeland Security",
    dueDate: "2024-09-30",
    value: "$1,500,000",
    fitScore: 3.9,
    type: "RFI",
  },
  {
    id: 4,
    title: "Cloud Migration Services",
    agency: "General Services Administration",
    dueDate: "2024-08-20",
    value: "$2,000,000",
    fitScore: 4.8,
    type: "RFP",
  },
  {
    id: 5,
    title: "Data Analytics Platform",
    agency: "State of California",
    dueDate: "2024-10-05",
    value: "$950,000",
    fitScore: 3.6,
    type: "RFI",
  },
  {
    id: 6,
    title: "Transportation Planning Study",
    agency: "City of New York",
    dueDate: "2024-08-28",
    value: "$600,000",
    fitScore: 4.4,
    type: "RFP",
  },
  {
    id: 7,
    title: "Facility Maintenance Services",
    agency: "Department of Veterans Affairs",
    dueDate: "2024-09-18",
    value: "$1,200,000",
    fitScore: 3.3,
    type: "RFP",
  },
  {
    id: 8,
    title: "Satellite Communications Equipment",
    agency: "NASA",
    dueDate: "2024-11-01",
    value: "$1,750,000",
    fitScore: 4.7,
    type: "RFI",
  },
];

export default function OpportunityEnginePage() {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("ALL");

  const filtered = mockOpportunities.filter((opp) => {
    const matchesFilter = filter === "ALL" || opp.type === filter;
    const term = search.toLowerCase();
    const matchesSearch =
      opp.title.toLowerCase().includes(term) ||
      opp.agency.toLowerCase().includes(term);
    return matchesFilter && matchesSearch;
  });

  const badgeVariant = (score) => {
    if (score >= 4.5) return "success";
    if (score >= 4.0) return "info";
    if (score >= 3.5) return "warning";
    return "danger";
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="rounded-lg bg-gradient-to-r from-purple-500 to-indigo-500 p-6 text-white">
          <h1 className="text-xl font-semibold">OPPORTUNITY ENGINE™ Dashboard</h1>
        </div>

        <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
          <Input
            placeholder="Search available bids..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="sm:w-1/3"
          />
          <Tabs value={filter} onValueChange={setFilter} className="w-full sm:w-auto">
            <TabsList>
              <TabsTrigger value="ALL">ALL</TabsTrigger>
              <TabsTrigger value="RFP">RFPs</TabsTrigger>
              <TabsTrigger value="RFI">RFIs</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Active Bids</CardTitle>
              </CardHeader>
              <div className="overflow-x-auto px-6 pb-6">
                <table className="min-w-full divide-y divide-gray-200 text-sm">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-2 text-left font-medium">OPPORTUNITY</th>
                      <th className="px-4 py-2 text-left font-medium">AGENCY</th>
                      <th className="px-4 py-2 text-left font-medium">DEADLINE</th>
                      <th className="px-4 py-2 text-left font-medium">FIT SCORE</th>
                      <th className="px-4 py-2" />
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {filtered.map((opp) => (
                      <tr key={opp.id}>
                        <td className="px-4 py-2 whitespace-nowrap">{opp.title}</td>
                        <td className="px-4 py-2 whitespace-nowrap">{opp.agency}</td>
                        <td className="px-4 py-2 whitespace-nowrap">{opp.dueDate}</td>
                        <td className="px-4 py-2">
                          <Badge variant={badgeVariant(opp.fitScore)}>
                            {opp.fitScore.toFixed(1)}
                          </Badge>
                        </td>
                        <td className="px-4 py-2 text-right">
                          <Button size="sm">VIEW &amp; POSITION</Button>
                        </td>
                      </tr>
                    ))}
                    {filtered.length === 0 && (
                      <tr>
                        <td colSpan="5" className="px-4 py-6 text-center text-sm text-gray-500">
                          No opportunities found.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </Card>
          </div>
          <div className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Positioning Vault</CardTitle>
              </CardHeader>
              <ul className="px-6 pb-4 space-y-2 text-sm">
                <li>Government Contracting 101.pdf</li>
                <li>Pricing Strategy Guide.docx</li>
                <li>Capability Statement Template.docx</li>
                <li>Past Performance Checklist.pdf</li>
              </ul>
              <div className="px-6 pb-6">
                <Button className="w-full">DRAFT POSITIONING</Button>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
