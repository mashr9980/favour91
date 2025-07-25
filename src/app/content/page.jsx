"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getAuthCookies, getCommonHeaders, getCurrentUser } from "@/lib/auth";
import { API_BASE_URL } from "@/lib/api";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Loader2, FileText, Star, Crown, Zap, ArrowRight, ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";

export default function ContentPage() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [content, setContent] = useState(null);
  const [userTier, setUserTier] = useState(null);
  const [user, setUser] = useState(null);
  const [selectedPdfIndex, setSelectedPdfIndex] = useState(0);
  const [pdfUrl, setPdfUrl] = useState(null);
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

  const loadPdf = async (index) => {
    if (!content || !content.pdfs[index]) return;
    const { token } = getAuthCookies();
    try {
      const filename = content.pdfs[index].filename;
      const response = await fetch(
        `${API_BASE_URL}/api/v1/content/${userTier}/download/${filename}`,
        { headers: getCommonHeaders(true, token) }
      );
      if (!response.ok) throw new Error(`Failed to load ${filename}`);
      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      setPdfUrl((prev) => {
        if (prev) URL.revokeObjectURL(prev);
        return url;
      });
      setSelectedPdfIndex(index);
    } catch (err) {
      console.error("PDF load error:", err);
    }
  };

  useEffect(() => {
    if (content && content.pdfs.length > 0) {
      loadPdf(0);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [content]);

  const handleNextPdf = () => {
    const next = (selectedPdfIndex + 1) % content.pdfs.length;
    loadPdf(next);
  };

  const handlePrevPdf = () => {
    const prev =
      (selectedPdfIndex - 1 + content.pdfs.length) % content.pdfs.length;
    loadPdf(prev);
  };

  const getTierIcon = (tier) => {
    switch (tier) {
      case "tier1": return <Zap className="w-6 h-6" />;
      case "tier2": return <Star className="w-6 h-6" />;
      case "tier3": return <Crown className="w-6 h-6" />;
      default: return <FileText className="w-6 h-6" />;
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
      case "tier1": return "from-blue-500/20 to-blue-600/20";
      case "tier2": return "from-green-500/20 to-green-600/20";
      case "tier3": return "from-purple-500/20 to-purple-600/20";
      default: return "from-gray-500/20 to-gray-600/20";
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center hero-grid pt-16">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background/80 to-background"></div>
        <div className="relative z-10 text-center">
          <Loader2 className="h-12 w-12 animate-spin text-primary mx-auto mb-4" />
          <p className="text-xl text-muted-foreground">Loading your content...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center hero-grid pt-16">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background/80 to-background"></div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative z-10 max-w-md mx-auto"
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
                <Link href="/login">
                  Go to Login
                </Link>
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    );
  }

  if (!content || content.pdfs.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center hero-grid pt-16">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background/80 to-background"></div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative z-10 max-w-md mx-auto"
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
                <Link href="/pricing">
                  Upgrade Plan
                </Link>
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen hero-grid pt-16">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background/80 to-background"></div>
      
      <div className="relative z-10 max-w-6xl mx-auto px-4 py-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center space-x-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-6 border border-primary/20">
            {getTierIcon(userTier)}
            <span>Welcome back, {user?.username}</span>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Your <span className="gradient-text">{getTierName(userTier)}</span> Content
          </h1>
          
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Access your exclusive resources, templates, and tools to accelerate your government contracting success.
          </p>
        </motion.div>

<motion.div
  initial={{ opacity: 0, y: 30 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ delay: 0.2 }}
  className="grid gap-6 lg:grid-cols-4"
>
  <Card className="glass-effect border-primary/20 lg:col-span-1">
    <CardHeader>
      <div className="flex items-center space-x-4">
        <div className={`w-12 h-12 bg-gradient-to-br ${getTierColor(userTier)} rounded-xl flex items-center justify-center text-primary`}>
          {getTierIcon(userTier)}
        </div>
        <div>
          <CardTitle className="text-2xl">Resources</CardTitle>
          <p className="text-muted-foreground">
            {content.pdfs.length} file{content.pdfs.length !== 1 ? 's' : ''}
          </p>
        </div>
      </div>
    </CardHeader>
    <CardContent className="space-y-2">
      {content.pdfs.map((pdf, index) => (
        <button
          key={pdf.filename}
          onClick={() => loadPdf(index)}
          className={`w-full text-left p-3 rounded-lg border border-border hover:border-primary/50 transition-colors flex items-center space-x-3 ${selectedPdfIndex === index ? 'bg-primary/10' : 'bg-surface/50'}`}
        >
          <FileText className="w-5 h-5 text-primary" />
          <span className="flex-1 text-sm font-medium">{pdf.name}</span>
        </button>
      ))}
    </CardContent>
  </Card>

  <Card className="glass-effect border-primary/20 lg:col-span-3 overflow-hidden">
    <CardHeader>
      <CardTitle>{content.pdfs[selectedPdfIndex]?.name}</CardTitle>
    </CardHeader>
    <CardContent>
      {pdfUrl ? (
        <iframe src={pdfUrl} className="w-full h-[70vh] rounded-lg" />
      ) : (
        <div className="h-[70vh] flex items-center justify-center text-muted-foreground">
          Select a file to view
        </div>
      )}
    </CardContent>
    {content.pdfs.length > 1 && (
      <CardFooter className="flex justify-between">
        <Button onClick={handlePrevPdf} variant="secondary" size="sm">
          <ArrowLeft className="w-4 h-4 mr-2" /> Prev
        </Button>
        <Button onClick={handleNextPdf} variant="secondary" size="sm">
          Next <ArrowRight className="w-4 h-4 ml-2" />
        </Button>
      </CardFooter>
    )}
  </Card>
</motion.div>

          {userTier === "tier3" && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="mt-8"
            >
              <Card className="glass-effect border-primary/20 bg-gradient-to-br from-primary/5 to-purple-500/5">
                <CardContent className="p-8 text-center">
                  <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center text-primary mx-auto mb-6">
                    <Crown className="w-8 h-8" />
                  </div>
                  <h3 className="text-2xl font-bold mb-4">
                    Premium Feature: AI Proposal Generator
                  </h3>
                  <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                    Create winning proposals in minutes with our advanced AI-powered proposal generation system.
                  </p>
                  <Button asChild className="purple-button text-lg px-8 py-4 h-auto">
                    <Link href="/generate-proposal">
                      Generate Proposal
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  );
}