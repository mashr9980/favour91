"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import {
  Clock,
  Settings,
  Monitor,
  Megaphone,
  Calendar,
  ArrowRight,
} from "lucide-react";
import Wrapper from "@/components/wrapper";
import Banner from "@/components/banner";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { FaLongArrowAltRight } from "react-icons/fa";
export default function ProcurementInboxSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  const featureCardsData = [
    {
      icon: "/assets/proposal.png",
      title: "Proposal Vault",
      initialBorder: "border-border",
    },
    {
      icon: "/assets/tools.png",
      title: "Submission Tools",
      initialBorder: "border-border",
    },
    {
      icon: "/assets/tracking.png",
      title: "Tracking + Compliance",
      initialBorder: "border-border",
    },
    {
      icon: "/assets/bid.png",
      title: "Bid Support",
      initialBorder: "border-border",
    },
    {
      icon: "/assets/quick.png",
      title: "Quick Fix Guides",
      initialBorder: "border-border",
    },
  ];

  return (
    <>
      <Banner title="Contract Execution Suite" />
      <section className="w-full py-12 md:py-24 lg:py-32 bg-background">
        <Wrapper className="text-center" ref={ref}>
          {/* Top Section: Title Tag and Description */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="mb-12"
          >
            <h2 className="inline-block bg-primary/10 text-primary text-[20px] font-bold px-6 py-2 rounded-full mb-6">
              Welcome to Contract Execution Suite
            </h2>
            <p className="max-w-3xl mx-auto text-muted-foreground text-lg leading-relaxed">
              You’re no longer guessing. With the Contract Execution Suite,
              you’ll prepare smarter proposals, avoid common mistakes, and
              finally compete with confidence. These are the exact tools used by
              serious vendors who win consistently.
            </p>
          </motion.div>

          {/* Feature Cards Grid */}
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-16 px-4 md:px-6"
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            {featureCardsData.map((card, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className={cn(
                  "group flex  flex-col relative p-8 py-10 rounded-xl border-[1px] bg-card text-left cursor-pointer transition-all duration-300 ease-in-out",
                  "border-border ring-offset-background ring-[1px] ring-border",
                  "hover:border-primary hover:ring-[1px] hover:ring-primary hover:ring-offset-[1px] hover:ring-offset-background",
                  card.initialBorder
                )}
              >
                <div className="flex items-center mb-6">
                  <div className="flex-shrink-0 mr-4">
                    <img
                      src={card.icon}
                      alt={card.title}
                      className="w-[68px] h-[68px]"
                    />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground group-hover:text-primary mb-2">
                    {card.title}
                  </h3>
                </div>
                <Link
                  href="#"
                  className="flex items-center text-vendr-purple hover:underline text-sm font-medium"
                >
                  View Details
                  <ArrowRight className="ml-1 h-4 w-4" aria-hidden="true" />
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </Wrapper>
      </section>
      {/*  Terms and Condition  */}
      <div className="relative flex min-h-[50vh] items-center justify-center bg-muted">
        {/* Subtle purple radial gradient background */}
        <div
          className="absolute inset-0 "
          style={{
            background:
              "radial-gradient(circle at 10% 50%, #F4EAFD 0%, transparent 50%)",
          }}
        />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="relative z-10 flex flex-col items-center justify-center space-y-8 px-4 py-12 text-center"
        >
          <h1 className="text-[30px] font-bold text-foreground">
            To read Contract Execution Suite terms & Conditions
          </h1>
          <motion.div variants={itemVariants}>
            <button className=" flex items-center justify-center purple-button text-[15px] font-plus-jakarta-sans py-5">
              Get Now <FaLongArrowAltRight className="ml-2 h-5 w-5" />
            </button>
          </motion.div>
        </motion.div>
      </div>
    </>
  );
}
