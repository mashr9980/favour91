"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { getAuthCookies, getCurrentUser } from "@/lib/auth";

export default function RedirectIfSubscribed() {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const handleRedirect = async () => {
      const hasSession = searchParams.get("session_id");
      if (!hasSession) return;

      const { token } = getAuthCookies();
      if (!token) return;
      try {
        const user = await getCurrentUser(token);
        if (user?.tier) {
          router.replace("/content");
        }
      } catch (err) {
        console.error("Subscription check failed", err);
      }
    };

    handleRedirect();
  }, [router, searchParams]);

  return null;
}
