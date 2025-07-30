"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { Check, ArrowRight, Loader2 } from "lucide-react";
import Wrapper from "../wrapper";
import { FaLongArrowAltRight } from "react-icons/fa";
import { API_BASE_URL } from "@/lib/api";
import { getAuthCookies, getCommonHeaders, getCurrentUser } from "@/lib/auth";
import { toast } from "sonner";

async function fetchPricingPlans() {
  try {
    const response = await fetch(`${API_BASE_URL}/api/v1/pricing`, {
      method: "GET",
      headers: getCommonHeaders(),
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch pricing plans: ${response.statusText}`);
    }

    const plans = await response.json();
    const activePlans = plans.filter((plan) => plan.is_active);
    return activePlans.sort((a, b) => {
      const tierOrder = { tier1: 1, tier2: 2, tier3: 3 };
      return tierOrder[a.tier] - tierOrder[b.tier];
    });
  } catch (error) {
    console.error("Error fetching pricing plans:", error);
    toast.error("Failed to load pricing plans. Showing default plans.");
    throw error;
  }
}

async function createCheckoutSession(tier) {
  const { token } = getAuthCookies();

  try {
    if (!token) {
      throw new Error("You must be logged in to subscribe.");
    }
    const response = await fetch(`${API_BASE_URL}/api/v1/subscribe/checkout`, {
      method: "POST",
      headers: getCommonHeaders(true, token),
      body: JSON.stringify({ tier }),
    });

    const checkoutData = await response.json();

    if (!response.ok) {
      if (checkoutData?.detail) {
        throw new Error(checkoutData.detail);
      }
      throw new Error(
        `Failed to create checkout session: ${response.statusText}`
      );
    }

    return checkoutData;
  } catch (error) {
    throw error;
  }
}

export default function PricingSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  const [pricingData, setPricingData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [checkoutLoading, setCheckoutLoading] = useState(null);
  const [userTier, setUserTier] = useState(null);

  const fallbackData = [
    {
      id: 1,
      title: "Procurement Inbox",
      price: "$147/Month",
      features: [
        "Weekly Bids Vault",
        "24/7 Support",
        "Quick Vetting Tools",
        "Capability System",
        "Outreach Toolkit",
        "Weekly Digest Dashboard",
      ],
      tier: "tier1",
    },
    {
      id: 2,
      title: "Contract Execution Suite",
      price: "$297/month",
      features: [
        "Tier 1 Included",
        "Proposal Vault",
        "Submission Tools",
        "Tracking + Compliance",
        "Bid Support",
        "Quick Fix Guides",
      ],
      tier: "tier2",
    },
    {
      id: 3,
      title: "VENDR OS Premium",
      price: "$997/Month",
      features: [
        "Tier 1 and 2 Included",
        "Smart Proposal Tools",
        "CRM & Onboarding",
        "Execution Toolkit",
        "Advanced Compliance & Packaging",
        "Premium Strategy Tools",
      ],
      tier: "tier3",
    },
  ];

  useEffect(() => {
    async function loadPricingData() {
      try {
        setLoading(true);
        setError(null);
        const plans = await fetchPricingPlans();
        setPricingData(plans);
      } catch (err) {
        setError(err.message);
        setPricingData(fallbackData);
      } finally {
        setLoading(false);
      }
    }

    loadPricingData();
  }, []);

  useEffect(() => {
    const checkSubscription = async () => {
      const { token } = getAuthCookies();
      if (!token) return;
      try {
        const user = await getCurrentUser(token);
        if (user?.tier) {
          setUserTier(user.tier);
        }
      } catch (err) {
        console.error("Subscription status check failed", err);
      }
    };

    checkSubscription();
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  const handleStartBidding = async (plan) => {
    if (userTier) {
      toast.error("You already have an active subscription.");
      return;
    }

    try {
      setCheckoutLoading(plan.id);

      const tier = plan.tier || getTierFromPlan(plan);

      const checkoutData = await createCheckoutSession(tier);

      if (checkoutData.checkout_url) {
        window.location.href = checkoutData.checkout_url;
      } else {
        throw new Error("No checkout URL received");
      }
    } catch (error) {
      console.error("Error creating checkout session:", error);
      toast.error(`${error}`);
    } finally {
      setCheckoutLoading(null);
    }
  };

  const getTierFromPlan = (plan) => {
    if (plan.name || plan.title) {
      const planName = (plan.name || plan.title).toLowerCase();
      if (planName.includes("procurement") || planName.includes("inbox")) {
        return "tier1";
      } else if (
        planName.includes("contract") ||
        planName.includes("execution")
      ) {
        return "tier2";
      } else if (
        planName.includes("premium") ||
        planName.includes("vendr os")
      ) {
        return "tier3";
      }
    }

    if (plan.id <= 1) return "tier1";
    if (plan.id === 2) return "tier2";
    return "tier3";
  };

  if (loading) {
    return (
      <section className="w-full py-12 bg-background">
        <Wrapper className="text-center">
          <div className="flex justify-center items-center py-20">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
            <span className="ml-3 text-lg text-muted-foreground">
              Loading pricing plans...
            </span>
          </div>
        </Wrapper>
      </section>
    );
  }

  return (
    <section className="w-full py-12 bg-background text-foreground">
      <Wrapper className="text-center" ref={ref}>
        {error && (
          <div className="mb-6 p-4 bg-yellow-900/20 border border-yellow-800 rounded-lg">
            <p className="text-yellow-200 text-sm">
              Unable to load latest pricing data. Showing default plans.
            </p>
          </div>
        )}

        <motion.div
          className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8 px-4 md:px-6"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {pricingData.map((card) => (
            <motion.div
              key={card.id}
              className="relative flex flex-col rounded-xl border border-border bg-card text-card-foreground shadow-md overflow-hidden"
              variants={itemVariants}
              whileHover={{
                scale: 1.02,
                boxShadow: "0 8px 20px rgba(0, 0, 0, 0.2)",
                borderColor: "#a855f7",
                transition: { duration: 0.3, ease: "easeOut" },
              }}
            >
              <div className="bg-primary text-primary-foreground py-4 sm:py-6 px-6 sm:px-8 rounded-t-xl">
                <h3 className="text-lg sm:text-2xl font-bold">
                  {card.name || card.title}
                </h3>
              </div>
              <div className="flex flex-col pt-6 sm:pt-8 items-center flex-1">
                <h2 className="text-lg sm:text-[20px] font-semibold text-primary mb-4 sm:mb-6 bg-primary/10 rounded-full px-3 sm:px-4 py-2 sm:py-3">
                  ${card.price}/Month
                </h2>
                <ul className="space-y-3 sm:space-y-4 text-left flex-1 w-full px-4 sm:px-6">
                  {card.features.map((feature, featureIndex) => (
                    <li
                      key={featureIndex}
                      className="flex items-center group text-sm sm:text-base border-b border-muted pb-2 last:border-none"
                    >
                      <Check
                        className="h-4 w-4 sm:h-5 sm:w-5 text-primary mr-2 flex-shrink-0"
                        aria-hidden="true"
                      />
                      <span className="font-medium">
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>
                <div className="flex w-full pt-4">
                  <button
                    onClick={() => handleStartBidding(card)}
                    disabled={checkoutLoading === card.id}
                    className="flex items-center justify-center w-full py-3 sm:py-2 rounded-bl-lg bg-primary/20 text-foreground hover:bg-primary hover:text-white font-semibold text-base sm:text-lg transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {checkoutLoading === card.id ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 sm:h-5 sm:w-5 animate-spin" />
                        <span>Processing...</span>
                      </>
                    ) : (
                      <>
                        <span>Start Bidding</span>
                        <FaLongArrowAltRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5" />
                      </>
                    )}
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </Wrapper>
    </section>
  );
}