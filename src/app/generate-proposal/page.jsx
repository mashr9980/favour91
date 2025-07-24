"use client";

import { useState } from "react";
import DashboardLayout from "@/components/dashboard/dashboard-layout";
import SmartBidAI from "@/components/dashboard/smartbid-ai";
import ProposalForm from "@/components/generate-proposal/proposal-form";
import GeneratedProposalDisplay from "@/components/generate-proposal/generate-proposal";

export default function GenerateProposalPage() {
  const [stage, setStage] = useState("ai");
  const [generated, setGenerated] = useState(null);
  const [formData, setFormData] = useState(null);

  const startForm = () => {
    setStage("form");
    setGenerated(null);
    setFormData(null);
  };

  const handleFormSuccess = (data, original) => {
    setGenerated(data);
    setFormData(original);
    setStage("result");
  };

  const backToAI = () => {
    setStage("ai");
    setGenerated(null);
    setFormData(null);
  };

  const backToForm = () => {
    setStage("form");
  };

  return (
    <DashboardLayout>
      {stage === "ai" && <SmartBidAI onStart={startForm} />}
      {stage === "form" && (
        <ProposalForm onSuccess={handleFormSuccess} onBack={backToAI} />
      )}
      {stage === "result" && (
        <GeneratedProposalDisplay
          initialProposalData={generated}
          originalFormData={formData}
          onBack={backToForm}
        />
      )}
    </DashboardLayout>
  );
}
