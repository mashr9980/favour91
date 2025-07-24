"use client";

import { useState } from "react";
import DashboardLayout from "@/components/dashboard/dashboard-layout";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { CheckCircle, Clock, AlertCircle, Calendar as CalendarIcon } from "lucide-react";

const mockContracts = [
  {
    id: 1,
    title: "Website Maintenance",
    status: "In Progress",
    endDate: "2024-09-30",
    compliance: [
      { date: "2024-07-15", task: "Quarterly security review" },
    ],
    tasks: [
      { id: 1, text: "Renew domain names", completed: false },
      { id: 2, text: "Prepare Q3 report", completed: false },
    ],
    alerts: 1,
  },
  {
    id: 2,
    title: "Cybersecurity Services",
    status: "Compliance Due",
    endDate: "2024-10-01",
    compliance: [
      { date: "2024-05-30", task: "Provide compliance report" },
    ],
    tasks: [
      { id: 1, text: "Submit insurance certificate", completed: false },
      { id: 2, text: "Schedule audit", completed: false },
    ],
    alerts: 2,
  },
  {
    id: 3,
    title: "Software License",
    status: "Completed",
    endDate: "2025-06-30",
    compliance: [
      { date: "2025-02-10", task: "Annual true-up" },
    ],
    tasks: [
      { id: 1, text: "Archive deliverables", completed: true },
      { id: 2, text: "Schedule review meeting", completed: true },
    ],
    alerts: 0,
  },
  {
    id: 4,
    title: "Facilities Maintenance",
    status: "Upcoming",
    endDate: "2025-01-15",
    compliance: [
      { date: "2024-12-01", task: "Prepare renewal RFP" },
    ],
    tasks: [
      { id: 1, text: "Evaluate vendor quotes", completed: false },
    ],
    alerts: 0,
  },
];

const statusStyles = {
  "In Progress": "bg-blue-100 text-blue-800",
  Completed: "bg-green-100 text-green-800",
  "Compliance Due": "bg-red-100 text-red-800",
  Upcoming: "bg-gray-100 text-gray-800",
};

const statusIcons = {
  "In Progress": Clock,
  Completed: CheckCircle,
  "Compliance Due": AlertCircle,
  Upcoming: CalendarIcon,
};

function getComplianceEvents() {
  const events = [];
  mockContracts.forEach((c) => {
    c.compliance.forEach((ev) => {
      events.push({ ...ev, contract: c.title, status: c.status });
    });
  });
  return events;
}

export default function ContractEnginePage() {
  const [selected, setSelected] = useState(mockContracts[0]);
  const [selectedDate, setSelectedDate] = useState(null);

  const events = getComplianceEvents();
  const dateEvents = (d) =>
    events.filter((ev) => ev.date === d.toISOString().slice(0, 10));

  const toggleTask = (taskId) => {
    setSelected((prev) => ({
      ...prev,
      tasks: prev.tasks.map((t) =>
        t.id === taskId ? { ...t, completed: !t.completed } : t
      ),
    }));
  };

  const today = new Date();
  const [currentMonth, setCurrentMonth] = useState(
    new Date(today.getFullYear(), today.getMonth(), 1)
  );
  const monthStart = new Date(
    currentMonth.getFullYear(),
    currentMonth.getMonth(),
    1
  );
  const monthEnd = new Date(
    currentMonth.getFullYear(),
    currentMonth.getMonth() + 1,
    0
  );
  const daysInMonth = monthEnd.getDate();
  const firstDay = monthStart.getDay();
  const weeks = [];
  let day = 1 - firstDay;
  while (day <= daysInMonth) {
    const week = [];
    for (let i = 0; i < 7; i++) {
      const date = new Date(
        currentMonth.getFullYear(),
        currentMonth.getMonth(),
        day
      );
      week.push(date);
      day++;
    }
    weeks.push(week);
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="rounded-lg bg-gradient-to-r from-purple-500 to-indigo-500 p-6 text-white">
          <h1 className="text-xl font-semibold">Tier 3: CONTRACT ENGINE™</h1>
        </div>
        <div className="grid gap-6 lg:grid-cols-3">
          <div className="space-y-4 lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Contracts</CardTitle>
              </CardHeader>
              <CardContent className="overflow-x-auto pb-6">
                <table className="min-w-full divide-y divide-gray-200 text-sm">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-2 text-left font-medium">Contract Title</th>
                      <th className="px-4 py-2 text-left font-medium">Status</th>
                      <th className="px-4 py-2 text-left font-medium">End Date</th>
                      <th className="px-4 py-2 text-left font-medium">Alerts</th>
                      <th className="px-4 py-2" />
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {mockContracts.map((c) => {
                      const Icon = statusIcons[c.status];
                      return (
                        <tr key={c.id} className="hover:bg-gray-50">
                          <td className="px-4 py-2">{c.title}</td>
                          <td className="px-4 py-2">
                            <span className={`inline-flex items-center gap-1 rounded px-2 py-1 text-xs font-semibold ${statusStyles[c.status]}`}> <Icon className="h-3 w-3" /> {c.status}</span>
                          </td>
                          <td className="px-4 py-2 whitespace-nowrap">{c.endDate}</td>
                          <td className="px-4 py-2">
                            {c.alerts > 0 && (<span className="rounded-full bg-red-500 px-2 py-1 text-xs text-white">{c.alerts}</span>)}
                          </td>
                          <td className="px-4 py-2 text-right">
                            <Button size="sm" onClick={() => { setSelected(c); setSelectedDate(null); }}>View</Button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Checklist - {selected.title}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 pb-4">
                {selected.tasks.map((t) => (
                  <label key={t.id} className="flex items-center gap-2 text-sm">
                    <Checkbox checked={t.completed} onCheckedChange={() => toggleTask(t.id)} />
                    <span className={t.completed ? "line-through text-gray-500" : ""}>{t.text}</span>
                  </label>
                ))}
              </CardContent>
            </Card>
          </div>
          <div className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Compliance Calendar</CardTitle>
              </CardHeader>
              <CardContent className="pb-4">
                <div className="mb-2 flex items-center justify-between text-sm">
                  <Button size="sm" variant="outline" onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1))}>&lt;</Button>
                  <span className="font-semibold">{currentMonth.toLocaleString("default", { month: "long", year: "numeric" })}</span>
                  <Button size="sm" variant="outline" onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1))}>&gt;</Button>
                </div>
                <table className="w-full text-center text-xs">
                  <thead>
                    <tr className="text-gray-500">
                      {['Sun','Mon','Tue','Wed','Thu','Fri','Sat'].map((d) => (<th key={d} className="py-1">{d}</th>))}
                    </tr>
                  </thead>
                  <tbody>
                    {weeks.map((week, i) => (
                      <tr key={i}>
                        {week.map((date, j) => {
                          const isCurrentMonth = date.getMonth() === currentMonth.getMonth();
                          const iso = date.toISOString().slice(0, 10);
                          const hasEvent = dateEvents(date).length > 0;
                          return (
                            <td key={j} className={`h-8 w-8 cursor-pointer rounded-full ${isCurrentMonth ? '' : 'text-gray-300'} ${hasEvent ? 'bg-purple-200' : ''} ${selectedDate && selectedDate.toISOString().slice(0, 10) === iso ? 'bg-purple-500 text-white' : ''}`} onClick={() => { if (isCurrentMonth) setSelectedDate(date); }}>
                              {date.getDate()}
                            </td>
                          );
                        })}
                      </tr>
                    ))}
                  </tbody>
                </table>
                <div className="mt-3 space-y-1 text-xs">
                  <div className="flex items-center gap-2">
                    <span className="size-3 rounded-full bg-purple-200"></span>
                    Compliance Date
                  </div>
                </div>
                {selectedDate && (
                  <div className="mt-4 text-sm">
                    <p className="mb-1 font-semibold">Events on {selectedDate.toISOString().slice(0, 10)}:</p>
                    <ul className="list-disc pl-4">
                      {dateEvents(selectedDate).map((ev, idx) => (
                        <li key={idx}>{ev.contract}: {ev.task}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Status Legend</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 pb-4 text-sm">
                {Object.keys(statusStyles).map((s) => {
                  const Icon = statusIcons[s];
                  return (
                    <div key={s} className="flex items-center gap-2">
                      <span className={`inline-flex items-center gap-1 rounded px-2 py-1 text-xs font-semibold ${statusStyles[s]}`}>
                        <Icon className="h-3 w-3" /> {s}
                      </span>
                    </div>
                  );
                })}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
