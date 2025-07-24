"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { Check, ArrowRight, Loader2 } from "lucide-react";
import Wrapper from "../wrapper";
import { FaLongArrowAltRight } from "react-icons/fa";
import { API_BASE_URL } from "@/lib/api"; // Adjust path as needed
import { getAuthCookies, getCommonHeaders } from "@/lib/auth";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";

// API function to fetch pricing plans
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
    // Filter only active plans and sort by tier
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

// API function to create checkout session
async function createCheckoutSession(tier) {
  const { token } = getAuthCookies(); // Get token from cookies

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
      // Check for "already subscribed" error detail
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
  const [checkoutLoading, setCheckoutLoading] = useState(null); // Track which plan is being processed

  // Default/fallback data that matches your original design
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
        // Use fallback data if API fails
        setPricingData(fallbackData);
      } finally {
        setLoading(false);
      }
    }

    loadPricingData();
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
    try {
      setCheckoutLoading(plan.id);

      // Use the tier from the plan data, fallback to mapping if needed
      const tier = plan.tier || getTierFromPlan(plan);

      const checkoutData = await createCheckoutSession(tier);

      // Redirect to Stripe checkout
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

  // Helper function to map plan to tier if tier is not directly available
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

    // Fallback based on index/id
    if (plan.id <= 1) return "tier1";
    if (plan.id === 2) return "tier2";
    return "tier3";
  };

  const handleLearnMore = (plan) => {
    // Add your logic for learn more
    console.log(
      "Learn more about plan:",
      plan.name || plan.title,
      "tier:",
      plan.tier
    );
    // You can navigate to a detailed pricing page or open a modal with plan.description
  };

  if (loading) {
  return (
    <section className="relative py-24">
      <div className="absolute inset-0 section-pattern opacity-20"></div>
      <Wrapper className="relative z-10 text-center">
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
  <section className="relative py-24 lg:py-32">
    <div className="absolute inset-0 section-pattern opacity-20"></div>
    
    <Wrapper className="relative z-10 text-center" ref={ref}>
      {error && (
        <div className="mb-8 p-4 bg-destructive/10 border border-destructive/20 rounded-lg max-w-2xl mx-auto">
          <p className="text-destructive text-sm">
            Unable to load latest pricing data. Showing default plans.
          </p>
        </div>
      )}

      <motion.div
        className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-7xl mx-auto"
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
      >
        {pricingData.map((card, index) => (
          <motion.div
            key={card.id}
            className="relative group"
            variants={itemVariants}
          >
            <div className="glass-effect rounded-2xl overflow-hidden h-full card-hover border border-border hover:border-primary/50 transition-all duration-300">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl"></div>
              
              <div className="relative z-10 bg-gradient-to-br from-primary to-primary/80 text-primary-foreground py-6 px-8 rounded-t-2xl">
                <h3 className="text-2xl font-bold">
                  {card.name || card.title}
                </h3>
              </div>
              
              <div className="relative z-10 flex flex-col pt-8 items-center flex-1 p-8">
                <div className="text-center mb-8">
                  <div className="inline-flex items-center bg-primary/10 text-primary px-6 py-3 rounded-full mb-4">
                    <span className="text-2xl font-bold">
                      ${typeof card.price === 'string' ? card.price.replace(/\D/g, '') : card.price}
                    </span>
                    <span className="text-sm ml-1">/Month</span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Billed monthly • Cancel anytime
                  </p>
                </div>
                
                <ul className="space-y-4 text-left flex-1 w-full mb-8">
                  {card.features.map((feature, featureIndex) => (
                    <li
                      key={featureIndex}
                      className="flex items-start text-foreground group-hover:text-primary/90 transition-colors text-base border-b border-border/50 last:border-b-0 pb-3"
                    >
                      <div className="w-5 h-5 bg-primary/20 rounded-full flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                        <Check className="h-3 w-3 text-primary" />
                      </div>
                      <span className="font-medium">
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>
                
                <div className="grid grid-cols-1 gap-3 w-full">
                  <Button
                    onClick={() => handleStartBidding(card)}
                    disabled={checkoutLoading === card.id}
                    className="w-full purple-button h-12 text-base font-semibold"
                  >
                    {checkoutLoading === card.id ? (
                      <>
                        <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                        <span>Processing...</span>
                      </>
                    ) : (
                      <>
                        <span>Start Free Trial</span>
                        <ArrowRight className="ml-2 h-5 w-5" />
                      </>
                    )}
                  </Button>
                  
                  <Button
                    onClick={() => handleLearnMore(card)}
                    disabled={checkoutLoading === card.id}
                    variant="outline"
                    className="w-full secondary-button h-12 text-base font-semibold"
                  >
                    <span>Learn More</span>
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
      
      {/* Additional section for enterprise plans */}
      <motion.div
        className="mt-16 text-center"
        variants={itemVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
      >
        <div className="glass-effect rounded-2xl p-8 max-w-4xl mx-auto">
          <h3 className="text-2xl font-bold mb-4">
            Need a Custom Solution?
          </h3>
          <p className="text-muted-foreground mb-6">
            Enterprise plans with custom integrations, dedicated support, and volume discounts available.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild className="purple-button">
              <a href="/contact">
                Contact Sales
                <ArrowRight className="ml-2 h-4 w-4" />
              </a>
            </Button>
            <Button asChild variant="outline" className="secondary-button">
              <a href="/demo">
                Schedule Demo
              </a>
            </Button>
          </div>
        </div>
      </motion.div>

      {/* Trust indicators */}
      <motion.div
        className="mt-12 flex flex-wrap justify-center items-center gap-8 text-sm text-muted-foreground"
        variants={itemVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
      >
        <div className="flex items-center space-x-2">
          <Check className="w-4 h-4 text-primary" />
          <span>14-day free trial</span>
        </div>
        <div className="flex items-center space-x-2">
          <Check className="w-4 h-4 text-primary" />
          <span>No setup or cancellation fees</span>
        </div>
        <div className="flex items-center space-x-2">
          <Check className="w-4 h-4 text-primary" />
          <span>24/7 customer support</span>
        </div>
      </motion.div>
    </Wrapper>
  </section>
);
}