"use client";

import GeneratedProposalDisplay from "@/components/generate-proposal/generate-proposal";
import ProposalForm from "@/components/generate-proposal/proposal-form";
import { useState } from "react";

export default function SmartbidAIPage() {
  const [generatedContent, setGeneratedContent] = useState(null);
  const [originalFormData, setOriginalFormData] = useState(null);

  const handleFormSuccess = (generatedData, originalInput) => {
    setGeneratedContent(generatedData);
    setOriginalFormData(originalInput);
  };

  const handleBackToForm = () => {
    setGeneratedContent(null);
    setOriginalFormData(null);
  };

  return (
    <>
      {generatedContent && originalFormData ? (
        <GeneratedProposalDisplay
          initialProposalData={generatedContent}
          originalFormData={originalFormData}
          onBackToForm={handleBackToForm}
        />
      ) : (
        <ProposalForm onSuccess={handleFormSuccess} />
      )}
    </>
  );
}
