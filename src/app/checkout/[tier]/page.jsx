"use client";
import { useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { createCheckoutSession } from "@/lib/checkout";
import { getAuthCookies } from "@/lib/auth";

export default function CheckoutRedirectPage() {
  const router = useRouter();
  const params = useParams();
  const { tier } = params;

  useEffect(() => {
    const start = async () => {
      const { token } = getAuthCookies();
      if (!token) {
        router.push("/login");
        return;
      }
      try {
        const data = await createCheckoutSession(tier);
        if (data.checkout_url) {
          window.location.href = data.checkout_url;
        } else {
          router.push("/pricing");
        }
      } catch (e) {
        console.error(e);
        router.push("/pricing");
      }
    };
    start();
  }, [router, tier]);

  return <p className="p-8 text-center">Redirecting to checkout...</p>;
}
