"use client";

import DashboardLayout from "@/components/dashboard/dashboard-layout";
import SmartBidAI from "@/components/dashboard/smartbid-ai";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";

export default function ProposalStudioPage() {
  const documents = [
    { name: "Cover Letter", status: "Complete" },
    { name: "Technical Approach", status: "In Progress" },
    { name: "Qualifications", status: "Draft" },
  ];

  const statusStyle = {
    Complete: "bg-green-100 text-green-800",
    "In Progress": "bg-yellow-100 text-yellow-800",
    Draft: "bg-gray-100 text-gray-800",
  };

  const checklist = [
    "Finalize PDFs",
    "Complete Forms",
    "Submit on Portal",
  ];

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="rounded-lg bg-gradient-to-r from-purple-500 to-indigo-500 p-6 text-white">
          <h1 className="text-xl font-semibold">PROPOSAL STUDIO™</h1>
        </div>
        <Tabs defaultValue="builder" className="space-y-4">
          <TabsList>
            <TabsTrigger value="builder">Proposal Builder</TabsTrigger>
            <TabsTrigger value="review">Review &amp; Package</TabsTrigger>
            <TabsTrigger value="submission">Submission Guide</TabsTrigger>
          </TabsList>
          <TabsContent value="builder" className="space-y-4">
            <SmartBidAI />
          </TabsContent>
          <TabsContent value="review" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Documents</CardTitle>
              </CardHeader>
              <div className="overflow-x-auto px-6 pb-6">
                <table className="min-w-full divide-y divide-gray-200 text-sm">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-2 text-left font-medium">Document</th>
                      <th className="px-4 py-2 text-left font-medium">Status</th>
                      <th className="px-4 py-2" />
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {documents.map((doc, i) => (
                      <tr key={i}>
                        <td className="px-4 py-2">{doc.name}</td>
                        <td className="px-4 py-2">
                          <span className={`rounded px-2 py-1 text-xs font-semibold ${statusStyle[doc.status]}`}>{doc.status}</span>
                        </td>
                        <td className="px-4 py-2 text-right">
                          <Button size="sm" variant="outline">
                            View
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>
            <div className="text-right">
              <Button>Export Package</Button>
            </div>
          </TabsContent>
          <TabsContent value="submission" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Submission Checklist</CardTitle>
              </CardHeader>
              <ul className="px-6 pb-6 space-y-2">
                {checklist.map((item, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    {item}
                  </li>
                ))}
              </ul>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Resources</CardTitle>
              </CardHeader>
              <div className="px-6 pb-6 text-sm">
                <p>Access brand templates and guidelines for a polished submission.</p>
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
}
