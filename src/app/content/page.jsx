"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getAuthCookies, getCommonHeaders, getCurrentUser } from "@/lib/auth";
import { API_BASE_URL } from "@/lib/api";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Loader2, 
  FileText, 
  Star, 
  Crown, 
  Zap, 
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Download,
  Menu,
  X,
  Eye,
  Grid3X3
} from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";

export default function ContentPage() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [content, setContent] = useState(null);
  const [userTier, setUserTier] = useState(null);
  const [user, setUser] = useState(null);
  const [selectedPdfIndex, setSelectedPdfIndex] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [downloadingPdf, setDownloadingPdf] = useState(null);
  const [pdfScale, setPdfScale] = useState(1.0);
  const router = useRouter();

  useEffect(() => {
    const fetchContent = async () => {
      setLoading(true);
      setError(null);
      const { token } = getAuthCookies();

      if (!token) {
        setError("You must be logged in to view this content.");
        setLoading(false);
        router.push("/login");
        return;
      }

      try {
        const userData = await getCurrentUser(token);
        if (!userData.tier) {
          setError("No tier found for your account. Access denied.");
          setLoading(false);
          return;
        }
        setUserTier(userData.tier);
        setUser(userData);

        const response = await fetch(
          `${API_BASE_URL}/api/v1/content/${userData.tier}`,
          {
            headers: getCommonHeaders(true, token),
          }
        );

        if (!response.ok) {
          const errorData = await response.json().catch(() => ({}));
          throw new Error(
            errorData.detail ||
              `Failed to fetch content for tier: ${userData.tier}`
          );
        }

        const data = await response.json();
        setContent(data);
      } catch (err) {
        setError(
          err.message || "An unexpected error occurred while fetching content."
        );
        console.error("Content fetch error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchContent();
  }, [router]);

  const handleDownload = async (filename, pdfName) => {
    const { token } = getAuthCookies();
    if (!token || !userTier) {
      alert("Authentication required to download files.");
      router.push("/login");
      return;
    }

    try {
      setDownloadingPdf(filename);
      const response = await fetch(
        `${API_BASE_URL}/api/v1/content/${userTier}/download/${filename}`,
        {
          headers: getCommonHeaders(true, token),
        }
      );

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.detail || `Failed to download ${filename}`);
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = pdfName || filename;
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);
    } catch (err) {
      alert(`Download failed: ${err.message}`);
      console.error("Download error:", err);
    } finally {
      setDownloadingPdf(null);
    }
  };

  const getTierIcon = (tier) => {
    switch (tier) {
      case "tier1": return <Zap className="w-5 h-5" />;
      case "tier2": return <Star className="w-5 h-5" />;
      case "tier3": return <Crown className="w-5 h-5" />;
      default: return <FileText className="w-5 h-5" />;
    }
  };

  const getTierName = (tier) => {
    switch (tier) {
      case "tier1": return "Procurement Inbox";
      case "tier2": return "Contract Execution Suite";
      case "tier3": return "VENDR OS Premium";
      default: return "Your Plan";
    }
  };

  const getTierColor = (tier) => {
    switch (tier) {
      case "tier1": return "from-blue-500 to-blue-600";
      case "tier2": return "from-green-500 to-green-600";
      case "tier3": return "from-purple-500 to-purple-600";
      default: return "from-gray-500 to-gray-600";
    }
  };

  const getPdfUrl = (filename) => {
  const { token } = getAuthCookies();
  // Use the iframe endpoint which has zero restrictions
  return `${API_BASE_URL}/api/v1/content/${userTier}/iframe/${filename}?token=${token}`;
};

const getPdfUrlBasic = (filename) => {
  const { token } = getAuthCookies();
  return `${API_BASE_URL}/api/v1/content/${userTier}/view/${filename}?token=${token}`;
};

  const nextPdf = () => {
    if (selectedPdfIndex < content.pdfs.length - 1) {
      setSelectedPdfIndex(selectedPdfIndex + 1);
      setCurrentPage(1);
    }
  };

  const prevPdf = () => {
    if (selectedPdfIndex > 0) {
      setSelectedPdfIndex(selectedPdfIndex - 1);
      setCurrentPage(1);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background pt-16">
        <div className="text-center">
          <Loader2 className="h-12 w-12 animate-spin text-primary mx-auto mb-4" />
          <p className="text-xl text-muted-foreground">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background pt-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-md mx-auto"
        >
          <Card className="glass-effect border-destructive/20">
            <CardHeader className="text-center">
              <div className="w-16 h-16 bg-destructive/10 rounded-2xl flex items-center justify-center text-destructive mx-auto mb-4">
                <FileText className="w-8 h-8" />
              </div>
              <CardTitle className="text-2xl font-bold text-destructive">
                Access Error
              </CardTitle>
            </CardHeader>
            <CardContent className="text-center space-y-4">
              <p className="text-muted-foreground">{error}</p>
              <Button asChild className="purple-button">
                <Link href="/login">Go to Login</Link>
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    );
  }

  if (!content || content.pdfs.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background pt-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-md mx-auto"
        >
          <Card className="glass-effect">
            <CardHeader className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center text-primary mx-auto mb-4">
                {getTierIcon(userTier)}
              </div>
              <CardTitle className="text-2xl font-bold">
                No Content Available
              </CardTitle>
            </CardHeader>
            <CardContent className="text-center space-y-4">
              <p className="text-muted-foreground">
                There is no content available for your current plan ({getTierName(userTier)}).
              </p>
              <Button asChild className="purple-button">
                <Link href="/pricing">Upgrade Plan</Link>
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    );
  }

  const currentPdf = content.pdfs[selectedPdfIndex];

  return (
    <div className="min-h-screen bg-background pt-16">
      <div className="flex h-[calc(100vh-4rem)]">
        <motion.div
          initial={{ x: -300, opacity: 0 }}
          animate={{ 
            x: sidebarOpen ? 0 : -280, 
            opacity: sidebarOpen ? 1 : 0.3 
          }}
          className={`w-80 bg-surface border-r border-border flex flex-col transition-all duration-300 ${
            sidebarOpen ? '' : 'pointer-events-none absolute z-10'
          }`}
        >
          <div className="p-6 border-b border-border bg-gradient-to-r from-primary/5 to-purple-500/5">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className={`w-12 h-12 bg-gradient-to-br ${getTierColor(userTier)} rounded-xl flex items-center justify-center text-white shadow-lg`}>
                  {getTierIcon(userTier)}
                </div>
                <div>
                  <h2 className="font-medium text-sm text-muted-foreground">Welcome back</h2>
                  <h1 className="text-xl font-bold">{user?.username}</h1>
                </div>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="hover:bg-primary/10"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
            
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
              <div className="flex items-center space-x-2 mb-2">
                {getTierIcon(userTier)}
                <span className="font-semibold text-primary">
                  {getTierName(userTier)}
                </span>
              </div>
              <p className="text-sm text-muted-foreground">
                {content.pdfs.length} resource{content.pdfs.length !== 1 ? 's' : ''} available
              </p>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
                Your Resources
              </h3>
              <div className="text-xs text-muted-foreground bg-muted rounded-full px-2 py-1">
                {selectedPdfIndex + 1} of {content.pdfs.length}
              </div>
            </div>
            
            <div className="space-y-2">
              {content.pdfs.map((pdf, index) => (
                <motion.div
                  key={pdf.filename}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 * index }}
                  className={`group cursor-pointer rounded-xl border transition-all duration-300 ${
                    selectedPdfIndex === index
                      ? 'border-primary bg-gradient-to-r from-primary/10 to-purple-500/10 shadow-lg scale-[1.02]'
                      : 'border-border hover:border-primary/50 hover:bg-surface/50 hover:shadow-md'
                  }`}
                  onClick={() => {
                    setSelectedPdfIndex(index);
                    setCurrentPage(1);
                  }}
                >
                  <div className="p-4">
                    <div className="flex items-start space-x-3">
                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 transition-all duration-200 ${
                        selectedPdfIndex === index 
                          ? 'bg-primary text-primary-foreground shadow-lg' 
                          : 'bg-muted text-muted-foreground group-hover:bg-primary/20 group-hover:text-primary'
                      }`}>
                        <FileText className="w-5 h-5" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className={`font-semibold text-sm leading-tight mb-1 transition-colors ${
                          selectedPdfIndex === index ? 'text-primary' : 'text-foreground group-hover:text-primary'
                        }`}>
                          {pdf.name}
                        </h4>
                        <p className="text-xs text-muted-foreground mb-2">
                          PDF Document
                        </p>
                        {selectedPdfIndex === index && (
                          <div className="flex items-center space-x-1 text-xs text-primary font-medium">
                            <Eye className="w-3 h-3" />
                            <span>Currently viewing</span>
                          </div>
                        )}
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between mt-3 pt-3 border-t border-border/50">
                      <div className="flex items-center space-x-2">
                        {selectedPdfIndex === index && (
                          <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
                        )}
                        <span className={`text-xs font-medium transition-colors ${
                          selectedPdfIndex === index ? 'text-primary' : 'text-muted-foreground'
                        }`}>
                          {selectedPdfIndex === index ? 'Active' : 'Click to view'}
                        </span>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-7 px-2 text-xs hover:bg-primary/10"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDownload(pdf.filename, pdf.name);
                        }}
                        disabled={downloadingPdf === pdf.filename}
                      >
                        {downloadingPdf === pdf.filename ? (
                          <Loader2 className="h-3 w-3 animate-spin" />
                        ) : (
                          <Download className="h-3 w-3" />
                        )}
                      </Button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {userTier === "tier3" && (
            <div className="p-4 border-t border-border">
              <Card className="bg-gradient-to-br from-primary/10 to-purple-500/10 border-primary/20 overflow-hidden">
                <CardContent className="p-4 text-center relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-purple-500/5"></div>
                  <div className="relative z-10">
                    <Crown className="w-8 h-8 text-primary mx-auto mb-2" />
                    <h3 className="font-bold mb-1">Premium Feature</h3>
                    <p className="text-xs text-muted-foreground mb-3">
                      AI-Powered Proposal Generator
                    </p>
                    <Button asChild size="sm" className="w-full purple-button">
                      <Link href="/generate-proposal">
                        Generate Proposal
                        <ArrowRight className="ml-1 h-3 w-3" />
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </motion.div>

        <div className="flex-1 flex flex-col">
          <div className="flex items-center justify-between p-4 border-b border-border bg-gradient-to-r from-surface/50 to-background/50 backdrop-blur-sm">
            <div className="flex items-center space-x-4">
              {!sidebarOpen && (
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setSidebarOpen(true)}
                  className="hover:bg-primary/10"
                >
                  <Menu className="h-4 w-4" />
                </Button>
              )}
              <div className="flex items-center space-x-3">
                <div className={`w-10 h-10 bg-gradient-to-br ${getTierColor(userTier)} rounded-lg flex items-center justify-center text-white`}>
                  <FileText className="w-5 h-5" />
                </div>
                <div>
                  <h1 className="text-lg font-bold">{currentPdf?.name}</h1>
                  <p className="text-sm text-muted-foreground">
                    Document {selectedPdfIndex + 1} of {content.pdfs.length} • {getTierName(userTier)}
                  </p>
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <div className="flex items-center space-x-1">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={prevPdf}
                  disabled={selectedPdfIndex <= 0}
                  className="hover:bg-primary/10"
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={nextPdf}
                  disabled={selectedPdfIndex >= content.pdfs.length - 1}
                  className="hover:bg-primary/10"
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>

              <div className="flex items-center space-x-1 text-sm text-muted-foreground bg-muted rounded-lg px-3 py-2">
                <Grid3X3 className="w-4 h-4" />
                <span>Page {currentPage}</span>
              </div>
              
              <div className="flex items-center space-x-1">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                  disabled={currentPage <= 1}
                  className="hover:bg-primary/10"
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setCurrentPage(prev => prev + 1)}
                  className="hover:bg-primary/10"
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>

              <Button
                variant="outline"
                size="sm"
                onClick={() => handleDownload(currentPdf.filename, currentPdf.name)}
                disabled={downloadingPdf === currentPdf.filename}
                className="ml-2 hover:bg-primary/10 hover:border-primary/50"
              >
                {downloadingPdf === currentPdf.filename ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Downloading...
                  </>
                ) : (
                  <>
                    <Download className="mr-2 h-4 w-4" />
                    Download
                  </>
                )}
              </Button>
            </div>
          </div>

          <div className="flex-1 p-6 bg-gradient-to-br from-muted/20 to-background">
            <div className="h-full bg-white rounded-xl border border-border shadow-2xl overflow-hidden relative">
              <div className="absolute inset-0 bg-gradient-to-br from-white to-gray-50"></div>
              {currentPdf && (
                <iframe
                  src={`${getPdfUrl(currentPdf.filename)}#page=${currentPage}&toolbar=0&navpanes=0&scrollbar=1&zoom=100`}
                  className="w-full h-full relative z-10 rounded-xl"
                  title={currentPdf.name}
                  onLoad={(e) => {
                    try {
                      const iframe = e.target;
                      if (iframe.contentDocument) {
                        const pdfViewer = iframe.contentDocument.querySelector('embed, object');
                        if (pdfViewer) {
                          setTotalPages(pdfViewer.numPages || 1);
                        }
                      }
                    } catch (error) {
                      console.log("Cannot access PDF page count due to CORS policy");
                    }
                  }}
                />
              )}
              
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-20">
                <div className="bg-black/80 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm font-medium">
                  {currentPdf?.name} • Page {currentPage}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}