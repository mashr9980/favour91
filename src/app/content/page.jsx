"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getAuthCookies, getCommonHeaders, getCurrentUser } from "@/lib/auth";
import { API_BASE_URL } from "@/lib/api";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Loader2, Download, FileText, Star, Crown, Zap, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";

export default function ContentPage() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [content, setContent] = useState(null);
  const [userTier, setUserTier] = useState(null);
  const [user, setUser] = useState(null);
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

  const handleDownload = async (filename) => {
    const { token } = getAuthCookies();
    if (!token || !userTier) {
      alert("Authentication required to download files.");
      router.push("/login");
      return;
    }

    try {
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
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);
    } catch (err) {
      alert(`Download failed: ${err.message}`);
      console.error("Download error:", err);
    }
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
          className="max-w-4xl mx-auto"
        >
          <Card className="glass-effect border-primary/20">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className={`w-12 h-12 bg-gradient-to-br ${getTierColor(userTier)} rounded-xl flex items-center justify-center text-primary`}>
                    {getTierIcon(userTier)}
                  </div>
                  <div>
                    <CardTitle className="text-2xl">Available Resources</CardTitle>
                    <p className="text-muted-foreground">
                      {content.pdfs.length} file{content.pdfs.length !== 1 ? 's' : ''} ready for download
                    </p>
                  </div>
                </div>
              </div>
            </CardHeader>

            <CardContent className="space-y-4">
              {content.pdfs.map((pdf, index) => (
                <motion.div
                  key={pdf.filename}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 * index }}
                  className="flex items-center justify-between p-4 bg-surface/50 rounded-xl border border-border hover:border-primary/50 transition-colors group"
                >
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center text-primary">
                      <FileText className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-semibold group-hover:text-primary transition-colors">
                        {pdf.name}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        PDF Document • Ready to download
                      </p>
                    </div>
                  </div>
                  
                  <Button
                    onClick={() => handleDownload(pdf.filename)}
                    className="secondary-button"
                    size="sm"
                  >
                    <Download className="h-4 w-4 mr-2" />
                    Download
                  </Button>
                </motion.div>
              ))}
            </CardContent>
          </Card>

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