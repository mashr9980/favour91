"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getAuthCookies, getCommonHeaders, getCurrentUser } from "@/lib/auth";
import { API_BASE_URL } from "@/lib/api";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Loader2, Download, FileText } from "lucide-react";

export default function ContentPage() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [content, setContent] = useState(null);
  const [userTier, setUserTier] = useState(null);
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

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-100">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <span className="ml-2 text-lg">Loading content...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-100">
        <Card className="w-full max-w-md p-6 text-center">
          <CardTitle className="text-2xl font-bold text-red-500">
            Error
          </CardTitle>
          <CardContent className="mt-4">
            <p>{error}</p>
            <Button onClick={() => router.push("/login")} className="mt-4">
              Go to Login
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!content || content.pdfs.length === 0) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-100">
        <Card className="w-full max-w-md p-6 text-center">
          <CardTitle className="text-2xl font-bold">
            No Content Available
          </CardTitle>
          <CardContent className="mt-4">
            <p>
              There is no content available for your current tier ({userTier}).
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col items-center bg-gray-100 p-4">
      <Card className="w-full max-w-3xl rounded-lg shadow-lg p-6">
        <CardHeader className="pb-4">
          <CardTitle className="text-3xl font-bold text-center">
            {userTier ? `Content for ${userTier}` : "My Content"}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <ul className="space-y-3">
            {content.pdfs.map((pdf) => (
              <li
                key={pdf.filename}
                className="flex items-center justify-between rounded-md bg-gray-50 p-3 shadow-sm"
              >
                <div className="flex items-center">
                  <FileText className="h-5 w-5 text-primary mr-3" />
                  <span className="font-medium text-gray-800">{pdf.name}</span>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleDownload(pdf.filename)}
                >
                  <Download className="h-4 w-4 mr-2" /> Download
                </Button>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
