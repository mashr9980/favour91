"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { Check, ArrowRight, Loader2 } from "lucide-react";
import Wrapper from "../wrapper";
import { FaLongArrowAltRight } from "react-icons/fa";
import Link from "next/link";
import { API_BASE_URL } from "@/lib/api"; // Adjust path as needed
import { createCheckoutSession } from "@/lib/checkout";
import { getCommonHeaders } from "@/lib/auth";
import { toast } from "sonner";

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


export default function PricingSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  const [pricingData, setPricingData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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


  if (loading) {
    return (
      <section className="w-full py-12 bg-white">
        <Wrapper className="text-center">
          <div className="flex justify-center items-center py-20">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
            <span className="ml-3 text-lg text-gray-600">
              Loading pricing plans...
            </span>
          </div>
        </Wrapper>
      </section>
    );
  }

  return (
    <section className="w-full py-12 bg-white">
      <Wrapper className="text-center" ref={ref}>
        {error && (
          <div className="mb-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
            <p className="text-yellow-800 text-sm">
              Unable to load latest pricing data. Showing default plans.
            </p>
          </div>
        )}

        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-8 px-4 md:px-6"
          variants={containerVariants}
        >
          {pricingData.map((card, index) => (
            <motion.div
              key={card.id}
              className="relative flex flex-col rounded-xl border border-gray-200 bg-white overflow-hidden"
              variants={itemVariants}
              whileHover={{
                scale: 1.02,
                boxShadow: "0 8px 20px rgba(0, 0, 0, 0.1)",
                borderColor: "#7F3DFF", // vendr-purple
                transition: { duration: 0.3, ease: "easeOut" },
              }}
            >
              <div className="bg-primary text-white py-6 px-8 rounded-t-xl">
                <h3 className="text-2xl font-bold">
                  {card.name || card.title}
                </h3>
              </div>
              <div className="flex flex-col pt-8 items-center flex-1">
                <h2 className="text-[20px] font-semibold text-black mb-6 bg-[#F4EAFD] rounded-full px-4 py-3">
                  {card.price}
                </h2>
                <ul className="space-y-4 text-left flex-1">
                  {card.features.map((feature, featureIndex) => (
                    <li
                      key={featureIndex}
                      className="flex items-center text-black group text-base border-b-gray-300 border-solid border-b-[1px] last:border-b-0 pb-2"
                    >
                      <Check
                        className="h-5 w-5 text-black group-hover:text-primary mr-2 flex-shrink-0"
                        aria-hidden="true"
                      />
                      <span className="font-poppins font-medium">
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>
                <div className="flex w-full pt-2">
                  <Link
                    href={`/checkout/${card.tier}`}
                    className="flex items-center justify-center w-full py-2 rounded-lg bg-[#E2C9FA] text-black hover:text-white font-semibold text-lg hover:bg-primary transition-colors duration-200"
                  >
                    <span>Start Bidding</span>
                    <FaLongArrowAltRight className="ml-2 h-5 w-5" />
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </Wrapper>
    </section>
  );
}
