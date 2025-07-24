"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FaLongArrowAltRight } from "react-icons/fa";
import Link from "next/link";

export function HeroSection() {
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div
      className="bg-[#F2F2F2] w-full "
      style={{ height: "calc(100vh - 102px)" }}
    >
      <motion.section
        className="text-center max-w-7xl mx-auto px-4 h-full flex flex-col items-center justify-center "
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.h1
          className="text-4xl md:text-6xl lg:text-[50px]  font-bold font-plus-jakarta-sans leading-[62px] mb-6 lg:w-[80%]  "
          variants={itemVariants}
        >
          Government Contracts Made Easy for{" "}
          <span className="text-purple-600">First-Time Vendors</span>
        </motion.h1>
        <motion.p
          className="text-xl md:text-[25px] text-black mb-10 max-w-2xl mx-auto font-plus-jakarta-sans"
          variants={itemVariants}
        >
          Unlock the tools, strategies, and AI systems used by successful
          government contractors — all in one place.
        </motion.p>
        <motion.div variants={itemVariants}>
          <Link
            href={"/pricing"}
            className=" flex items-center justify-center purple-button text-[15px] font-plus-jakarta-sans py-5"
          >
            View Pricing <FaLongArrowAltRight className="ml-2 h-5 w-5" />
          </Link>
        </motion.div>
      </motion.section>
    </div>
  );
}
