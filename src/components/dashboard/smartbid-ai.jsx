"use client";

import { Sparkles, FileText, GaugeCircle, Wand2, Lightbulb } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function SmartBidAI({ onStart }) {
  const features = [
    { title: "Proposal Generator", icon: Sparkles, desc: "Create tailored drafts instantly." },
    { title: "Bid Analysis", icon: GaugeCircle, desc: "Evaluate opportunities with AI scoring." },
    { title: "Content Optimization", icon: FileText, desc: "Refine sections for maximum impact." },
    { title: "AI Assistant", icon: Wand2, desc: "Ask questions and get guidance." },
  ];

  const tips = [
    "Provide detailed scope for best results",
    "Review generated drafts before submission",
    "Leverage regeneration to fine-tune sections",
  ];

  const recent = [
    { id: 1, title: "IT Support Services", date: "2024-05-20" },
    { id: 2, title: "City Website Redesign", date: "2024-05-10" },
  ];

  return (
    <div className="space-y-8">
      <div className="rounded-lg bg-gradient-to-r from-purple-600 to-indigo-600 p-6 text-white text-center">
        <h2 className="text-2xl font-semibold flex items-center justify-center gap-2">
          <Sparkles className="h-6 w-6 text-yellow-300" /> SmartBid AI
        </h2>
        <p className="mt-2 text-sm">Leverage AI to craft winning proposals faster.</p>
        {onStart && (
          <Button className="mt-4 text-lg" onClick={onStart}>
            Start AI Proposal Generation
          </Button>
        )}
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {features.map((f) => (
          <div
            key={f.title}
            className="rounded-lg bg-white p-4 shadow hover:shadow-md transition-transform hover:-translate-y-1"
          >
            <f.icon className="h-6 w-6 mb-2 text-purple-600" />
            <h3 className="font-semibold mb-1">{f.title}</h3>
            <p className="text-sm text-gray-600">{f.desc}</p>
          </div>
        ))}
      </div>
      <div className="grid gap-6 md:grid-cols-2">
        <div>
          <h3 className="font-semibold mb-2">Recent Generations</h3>
          <ul className="space-y-1 text-sm">
            {recent.map((r) => (
              <li key={r.id} className="flex justify-between border-b py-1">
                <span>{r.title}</span>
                <span className="text-gray-500">{r.date}</span>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="font-semibold mb-2">AI Tips &amp; Best Practices</h3>
          <ul className="list-disc pl-5 space-y-1 text-sm">
            {tips.map((t, i) => (
              <li key={i}>{t}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
