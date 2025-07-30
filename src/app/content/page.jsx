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
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [downloadingPdf, setDownloadingPdf] = useState(null);
  const [pdfScale, setPdfScale] = useState(1.0);
  const [pdfUrl, setPdfUrl] = useState("");
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

  useEffect(() => {
    const loadPdf = async () => {
      if (!content || !userTier) return;
      const pdf = content.pdfs[selectedPdfIndex];
      if (!pdf) return;
      try {
        const url = await fetchPdfUrl(pdf.filename);
        setPdfUrl((prev) => {
          if (prev) URL.revokeObjectURL(prev);
          return url;
        });
      } catch (err) {
        console.error("PDF load error:", err);
        setPdfUrl("");
      }
    };

    loadPdf();
    return () => {
      if (pdfUrl) URL.revokeObjectURL(pdfUrl);
    };
  }, [content, userTier, selectedPdfIndex]);

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
      case "tier1": return <Zap className="w-4 h-4 sm:w-5 sm:h-5" />;
      case "tier2": return <Star className="w-4 h-4 sm:w-5 sm:h-5" />;
      case "tier3": return <Crown className="w-4 h-4 sm:w-5 sm:h-5" />;
      default: return <FileText className="w-4 h-4 sm:w-5 sm:h-5" />;
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

  const fetchPdfUrl = async (filename) => {
    const { token } = getAuthCookies();
    const response = await fetch(
      `${API_BASE_URL}/api/v1/content/${userTier}/view/${encodeURIComponent(filename)}`,
      {
        headers: getCommonHeaders(true, token),
      }
    );
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.detail || `Failed to load ${filename}`);
    }
    const blob = await response.blob();
    return URL.createObjectURL(blob);
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
        <div className="text-center px-4">
          <Loader2 className="h-8 w-8 sm:h-12 sm:w-12 animate-spin text-primary mx-auto mb-4" />
          <p className="text-lg sm:text-xl text-muted-foreground">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background pt-16 px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-md mx-auto w-full"
        >
          <Card className="glass-effect border-destructive/20">
            <CardHeader className="text-center">
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-destructive/10 rounded-2xl flex items-center justify-center text-destructive mx-auto mb-4">
                <FileText className="w-6 h-6 sm:w-8 sm:h-8" />
              </div>
              <CardTitle className="text-xl sm:text-2xl font-bold text-destructive">
                Access Error
              </CardTitle>
            </CardHeader>
            <CardContent className="text-center space-y-4">
              <p className="text-sm sm:text-base text-muted-foreground">{error}</p>
              <Button asChild className="purple-button w-full">
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
      <div className="min-h-screen flex items-center justify-center bg-background pt-16 px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-md mx-auto w-full"
        >
          <Card className="glass-effect">
            <CardHeader className="text-center">
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-primary/10 rounded-2xl flex items-center justify-center text-primary mx-auto mb-4">
                {getTierIcon(userTier)}
              </div>
              <CardTitle className="text-xl sm:text-2xl font-bold">
                No Content Available
              </CardTitle>
            </CardHeader>
            <CardContent className="text-center space-y-4">
              <p className="text-sm sm:text-base text-muted-foreground">
                There is no content available for your current plan ({getTierName(userTier)}).
              </p>
              <Button asChild className="purple-button w-full">
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
        {/* Mobile Sidebar Overlay */}
        {sidebarOpen && (
          <div 
            className="fixed inset-0 bg-black/50 z-40 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Sidebar */}
        <motion.div
          initial={{ x: -300, opacity: 0 }}
          animate={{ 
            x: sidebarOpen ? 0 : -280, 
            opacity: sidebarOpen ? 1 : 0.3 
          }}
          className={`w-80 bg-surface border-r border-border flex flex-col transition-all duration-300 fixed lg:relative z-50 h-full ${
            sidebarOpen ? '' : 'pointer-events-none lg:pointer-events-auto -translate-x-full lg:translate-x-0'
          }`}
        >
          <div className="p-4 sm:p-6 border-b border-border bg-gradient-to-r from-primary/5 to-purple-500/5">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className={`w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br ${getTierColor(userTier)} rounded-xl flex items-center justify-center text-white shadow-lg`}>
                  {getTierIcon(userTier)}
                </div>
                <div>
                  <h2 className="font-medium text-xs sm:text-sm text-muted-foreground">Welcome back</h2>
                  <h1 className="text-lg sm:text-xl font-bold truncate">{user?.username}</h1>
                </div>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="hover:bg-primary/10 lg:hidden"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
            
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3 sm:p-4 border border-white/20">
              <div className="flex items-center space-x-2 mb-2">
                {getTierIcon(userTier)}
                <span className="font-semibold text-primary text-sm sm:text-base">
                  {getTierName(userTier)}
                </span>
              </div>
              <p className="text-xs sm:text-sm text-muted-foreground">
                {content.pdfs.length} resource{content.pdfs.length !== 1 ? 's' : ''} available
              </p>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-3 sm:p-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xs sm:text-sm font-semibold text-muted-foreground uppercase tracking-wide">
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
                    setSidebarOpen(false);
                  }}
                >
                  <div className="p-3 sm:p-4">
                    <div className="flex items-start space-x-3">
                      <div className={`w-8 h-8 sm:w-10 sm:h-10 rounded-lg flex items-center justify-center flex-shrink-0 transition-all duration-200 ${
                        selectedPdfIndex === index 
                          ? 'bg-primary text-primary-foreground shadow-lg' 
                          : 'bg-muted text-muted-foreground group-hover:bg-primary/20 group-hover:text-primary'
                      }`}>
                        <FileText className="w-4 h-4 sm:w-5 sm:h-5" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className={`font-semibold text-xs sm:text-sm leading-tight mb-1 transition-colors truncate ${
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
                        className="h-6 px-2 text-xs hover:bg-primary/10"
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
            <div className="p-3 sm:p-4 border-t border-border">
              <Card className="bg-gradient-to-br from-primary/10 to-purple-500/10 border-primary/20 overflow-hidden">
                <CardContent className="p-3 sm:p-4 text-center relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-purple-500/5"></div>
                  <div className="relative z-10">
                    <Crown className="w-6 h-6 sm:w-8 sm:h-8 text-primary mx-auto mb-2" />
                    <h3 className="font-bold text-sm sm:text-base mb-1">Premium Feature</h3>
                    <p className="text-xs text-muted-foreground mb-3">
                      AI-Powered Proposal Generator
                    </p>
                    <Button asChild size="sm" className="w-full purple-button text-xs sm:text-sm">
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

        {/* Main Content */}
        <div className="flex-1 flex flex-col min-w-0">
          {/* Header */}
          <div className="flex items-center justify-between p-3 sm:p-4 border-b border-border bg-gradient-to-r from-surface/50 to-background/50 backdrop-blur-sm">
            <div className="flex items-center space-x-3 sm:space-x-4 min-w-0">
              {!sidebarOpen && (
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setSidebarOpen(true)}
                  className="hover:bg-primary/10 lg:hidden flex-shrink-0"
                >
                  <Menu className="h-4 w-4" />
                </Button>
              )}
              <div className="flex items-center space-x-2 sm:space-x-3 min-w-0">
                <div className={`w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br ${getTierColor(userTier)} rounded-lg flex items-center justify-center text-white flex-shrink-0`}>
                  <FileText className="w-4 h-4 sm:w-5 sm:h-5" />
                </div>
                <div className="min-w-0">
                  <h1 className="text-sm sm:text-lg font-bold truncate">{currentPdf?.name}</h1>
                  <p className="text-xs sm:text-sm text-muted-foreground hidden sm:block">
                    Document {selectedPdfIndex + 1} of {content.pdfs.length} • {getTierName(userTier)}
                  </p>
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-1 sm:space-x-2 flex-shrink-0">
              <div className="hidden sm:flex items-center space-x-1">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={prevPdf}
                  disabled={selectedPdfIndex <= 0}
                  className="hover:bg-primary/10 h-8 w-8"
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={nextPdf}
                  disabled={selectedPdfIndex >= content.pdfs.length - 1}
                  className="hover:bg-primary/10 h-8 w-8"
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>

              <div className="flex items-center space-x-1 text-xs sm:text-sm text-muted-foreground bg-muted rounded-lg px-2 py-1">
                <Grid3X3 className="w-3 h-3 sm:w-4 sm:h-4" />
                <span>Page {currentPage}</span>
              </div>
              
              <div className="hidden sm:flex items-center space-x-1">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                  disabled={currentPage <= 1}
                  className="hover:bg-primary/10 h-8 w-8"
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setCurrentPage(prev => prev + 1)}
                  className="hover:bg-primary/10 h-8 w-8"
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>

              <Button
                variant="outline"
                size="sm"
                onClick={() => handleDownload(currentPdf.filename, currentPdf.name)}
                disabled={downloadingPdf === currentPdf.filename}
                className="hover:bg-primary/10 hover:border-primary/50 text-xs sm:text-sm h-8"
              >
                {downloadingPdf === currentPdf.filename ? (
                  <>
                    <Loader2 className="mr-1 sm:mr-2 h-3 w-3 sm:h-4 sm:w-4 animate-spin" />
                    <span className="hidden sm:inline">Downloading...</span>
                  </>
                ) : (
                  <>
                    <Download className="mr-1 sm:mr-2 h-3 w-3 sm:h-4 sm:w-4" />
                    <span className="hidden sm:inline">Download</span>
                  </>
                )}
              </Button>
            </div>
          </div>

          {/* Mobile Navigation */}
          <div className="flex sm:hidden items-center justify-between p-3 border-b border-border bg-surface/50">
            <div className="flex items-center space-x-1">
              <Button
                variant="ghost"
                size="sm"
                onClick={prevPdf}
                disabled={selectedPdfIndex <= 0}
                className="hover:bg-primary/10 h-8 px-2"
              >
                <ChevronLeft className="h-4 w-4" />
                <span className="text-xs">Prev</span>
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={nextPdf}
                disabled={selectedPdfIndex >= content.pdfs.length - 1}
                className="hover:bg-primary/10 h-8 px-2"
              >
                <span className="text-xs">Next</span>
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
            
            <div className="flex items-center space-x-1">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                disabled={currentPage <= 1}
                className="hover:bg-primary/10 h-8 px-2"
              >
                <ChevronLeft className="h-3 w-3" />
              </Button>
              <span className="text-xs px-2">Page {currentPage}</span>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setCurrentPage(prev => prev + 1)}
                className="hover:bg-primary/10 h-8 px-2"
              >
                <ChevronRight className="h-3 w-3" />
              </Button>
            </div>
          </div>

          {/* PDF Viewer */}
          <div className="flex-1 p-3 sm:p-6 bg-gradient-to-br from-muted/20 to-background">
            <div className="h-full bg-white rounded-xl border border-border shadow-2xl overflow-hidden relative">
              <div className="absolute inset-0 bg-gradient-to-br from-white to-gray-50"></div>
              {currentPdf && pdfUrl && (
                <iframe
                  src={`${pdfUrl}#page=${currentPage}&toolbar=0&navpanes=0&scrollbar=1&zoom=100`}
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
              
              <div className="absolute bottom-2 sm:bottom-4 left-1/2 transform -translate-x-1/2 z-20">
                <div className="bg-black/80 backdrop-blur-sm text-white px-3 sm:px-4 py-1 sm:py-2 rounded-full text-xs sm:text-sm font-medium">
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