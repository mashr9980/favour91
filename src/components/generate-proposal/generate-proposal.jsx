"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  FileText,
  Download,
  File,
  Mail,
  Settings,
  User,
  Star,
  Loader2,
} from "lucide-react";
import { API_BASE_URL } from "@/lib/api";
import { getAuthCookies, getCommonHeaders } from "@/lib/auth";
export default function GeneratedProposalDisplay({
  initialProposalData,
  originalFormData,
  onBackToForm,
}) {
  const [activeTab, setActiveTab] = useState("cover_letter");
  const [currentProposalData, setCurrentProposalData] =
    useState(initialProposalData);
  const [downloadingPdf, setDownloadingPdf] = useState(false);
  const [downloadingDocx, setDownloadingDocx] = useState(false);
  const [downloadError, setDownloadError] = useState(null);
  const [regenerating, setRegenerating] = useState(false);
  const [regenerateError, setRegenerateError] = useState(null);

  const handleDownload = async (format) => {
    setDownloadError(null);
    const fileName = `Proposal_${new Date()
      .toISOString()
      .slice(0, 10)}.${format}`;
    const apiEndpoint =
      format === "pdf"
        ? `${API_BASE_URL}/api/v1/generate-pdf`
        : `${API_BASE_URL}/api/v1/generate-docx`;

    if (format === "pdf") setDownloadingPdf(true);
    else setDownloadingDocx(true);

    try {
      const { token } = getAuthCookies();
      const headers = getCommonHeaders(true, token);
      const response = await fetch(apiEndpoint, {
        method: "POST",
        headers: headers,
        body: JSON.stringify({ ...currentProposalData, file_name: fileName }),
      });

      if (!response.ok) {
        // Only try to parse JSON for error responses
        let errorMessage = `Failed to generate ${format}.`;
        try {
          const errorData = await response.json();
          errorMessage = errorData.detail || errorMessage;
        } catch {
          // If JSON parsing fails, use the default message
        }
        throw new Error(errorMessage);
      }

      // Get the response as a blob (file data)
      const blob = await response.blob();

      // Create a download link
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = fileName;
      link.style.display = "none";

      // Append to body, click, and remove
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      // Clean up the object URL
      window.URL.revokeObjectURL(url);
    } catch (err) {
      setDownloadError(
        err.message || "An unexpected error occurred during download."
      );
      console.error(`Download ${format} error:`, err);
    } finally {
      if (format === "pdf") setDownloadingPdf(false);
      else setDownloadingDocx(false);
    }
  };
  const handleRegenerateSection = async () => {
    setRegenerating(true);
    setRegenerateError(null);

    try {
      const { token } = getAuthCookies();
      const headers = getCommonHeaders(true, token);
      const response = await fetch(
        `${API_BASE_URL}/api/v1/regenerate-section`,
        {
          method: "POST",
          headers: headers,
          body: JSON.stringify({
            section: activeTab,
            context: originalFormData,
          }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(
          errorData.detail || `Failed to regenerate ${activeTab} section.`
        );
      }

      const newGeneratedContent = await response.json();
      setCurrentProposalData((prev) => ({
        ...prev,
        [activeTab]: newGeneratedContent[activeTab],
      }));
    } catch (err) {
      setRegenerateError(
        err.message || "An unexpected error occurred during regeneration."
      );
      console.error("Regenerate section error:", err);
    } finally {
      setRegenerating(false);
    }
  };

  const getContentForTab = (tab) => {
    return currentProposalData[tab] || "Content not available.";
  };

  return (
    <div className="relative min-h-screen flex flex-col hero-grid pt-16 bg-background">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background/80 to-background"></div>
      {/* Header */}
      <header className="bg-surface border-b border-border p-4 shadow-md flex items-center relative z-10 text-foreground">
        <FileText className="h-6 w-6 mr-2" />
        <h1 className="text-xl font-semibold">Generated Proposal</h1>
      </header>
      {/* Main Content Area */}
      <main className="flex-1 p-6 flex justify-center items-start relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-4xl"
        >
          <Card className="glass-effect border-primary/20 shadow-xl">
            <CardHeader className="pb-4 border-b border-border flex flex-row items-center justify-between">
              <CardTitle className="text-2xl font-bold">
                Your Proposal is Ready
              </CardTitle>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  className="flex items-center gap-2 text-foreground hover:bg-surface/50 bg-transparent"
                  onClick={() => handleDownload("pdf")}
                  disabled={downloadingPdf}
                >
                  {downloadingPdf && (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  )}
                  <Download className="h-4 w-4" />
                  Download PDF
                </Button>
                <Button
                  variant="outline"
                  className="flex items-center gap-2 text-foreground hover:bg-surface/50 bg-transparent"
                  onClick={() => handleDownload("docx")}
                  disabled={downloadingDocx}
                >
                  {downloadingDocx && (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  )}
                  <File className="h-4 w-4" />
                  Download DOCX
                </Button>
              </div>
            </CardHeader>
            <CardContent className="p-6">
              {downloadError && (
                <p className="text-red-500 text-sm mb-4">{downloadError}</p>
              )}
              <Tabs
                value={activeTab}
                onValueChange={(value) => setActiveTab(value)}
                className="w-full"
              >
                <TabsList className="grid w-full grid-cols-4 bg-surface/50 rounded-md p-1 mb-6">
                  <TabsTrigger
                    value="cover_letter"
                    className="flex items-center gap-2 data-[state=active]:bg-purple-600 data-[state=active]:text-white data-[state=active]:shadow-sm"
                  >
                    <Mail className="h-4 w-4" />
                    Cover Letter
                  </TabsTrigger>
                  <TabsTrigger
                    value="technical_approach"
                    className="flex items-center gap-2 data-[state=active]:bg-purple-600 data-[state=active]:text-white data-[state=active]:shadow-sm"
                  >
                    <Settings className="h-4 w-4" />
                    Technical Approach
                  </TabsTrigger>
                  <TabsTrigger
                    value="qualifications"
                    className="flex items-center gap-2 data-[state=active]:bg-purple-600 data-[state=active]:text-white data-[state=active]:shadow-sm"
                  >
                    <User className="h-4 w-4" />
                    Qualifications
                  </TabsTrigger>
                  <TabsTrigger
                    value="differentiators"
                    className="flex items-center gap-2 data-[state=active]:bg-purple-600 data-[state=active]:text-white data-[state=active]:shadow-sm"
                  >
                    <Star className="h-4 w-4" />
                    Differentiators
                  </TabsTrigger>
                </TabsList>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold flex items-center gap-2">
                    {activeTab === "cover_letter" && (
                      <Mail className="h-5 w-5" />
                    )}
                    {activeTab === "technical_approach" && (
                      <Settings className="h-5 w-5" />
                    )}
                    {activeTab === "qualifications" && (
                      <User className="h-5 w-5" />
                    )}
                    {activeTab === "differentiators" && (
                      <Star className="h-5 w-5" />
                    )}
                    {activeTab
                      .replace("_", " ")
                      .split(" ")
                      .map(
                        (word) => word.charAt(0).toUpperCase() + word.slice(1)
                      )
                      .join(" ")}
                  </h3>
                  <Button
                    variant="outline"
                  className="flex items-center gap-2 text-foreground hover:bg-surface/50 bg-transparent"
                    onClick={handleRegenerateSection}
                    disabled={regenerating}
                  >
                    {regenerating && (
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    )}
                    Regenerate Section
                  </Button>
                </div>
                {regenerateError && (
                  <p className="text-red-500 text-sm mb-4">{regenerateError}</p>
                )}
                <TabsContent value="cover_letter">
                  <div className="min-h-[300px] border border-border rounded-md p-4 bg-surface/50 whitespace-pre-wrap">
                    {getContentForTab("cover_letter")}
                  </div>
                </TabsContent>
                <TabsContent value="technical_approach">
                  <div className="min-h-[300px] border border-border rounded-md p-4 bg-surface/50 whitespace-pre-wrap">
                    {getContentForTab("technical_approach")}
                  </div>
                </TabsContent>
                <TabsContent value="qualifications">
                  <div className="min-h-[300px] border border-border rounded-md p-4 bg-surface/50 whitespace-pre-wrap">
                    {getContentForTab("qualifications")}
                  </div>
                </TabsContent>
                <TabsContent value="differentiators">
                  <div className="min-h-[300px] border border-border rounded-md p-4 bg-surface/50 whitespace-pre-wrap">
                    {getContentForTab("differentiators")}
                  </div>
                </TabsContent>
              </Tabs>
              <div className="mt-6 text-center">
                <Button onClick={onBackToForm} variant="secondary">
                  Go Back to Form
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </main>
    </div>
  );
}
