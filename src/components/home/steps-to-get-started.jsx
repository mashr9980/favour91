"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Wrapper from "../wrapper"; // Assuming Wrapper is defined elsewhere

export default function StepsToGetStartedSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });

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
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  const cardData = [
    {
      number: 1,
      title: "Choose Your Plan",
      description: "Select the membership tier that fits your stage and budget",
      initialBorder: "border-[#E0E0E0]",
    },
    {
      number: 2,
      title: "Log In & Unlock",
      description: "Instantly access your dashboard with step-by-step tools",
      initialBorder: "border-[#E0E0E0]",
    },
    {
      number: 3,
      title: "Bid Like a Pro",
      description: "Use smart workflows to save time and increase win rates",
      initialBorder: "border-[#E0E0E0]",
    },
  ];

  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-white">
      <Wrapper className="text-center" ref={ref}>
        <motion.h2
          className="text-4xl md:text-5xl font-bold mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          Steps To Get Started
        </motion.h2>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-8 px-4 md:px-6"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {cardData.map((card, index) => (
            <motion.div
              key={index}
              className={`relative p-8 py-10 rounded-xl border-[1px] border-[#E0E0E0] ring-offset-white ring-[1px] ring-[#E0E0E0] ${card.initialBorder} bg-white
                         hover:border-primary hover:ring-[1px] hover:ring-primary hover:ring-offset-[1px] hover:ring-offset-white transition-all duration-300 ease-in-out`}
              variants={itemVariants}
            >
              <h2 className="flex items-center justify-center w-12 h-12 rounded-full bg-[#F4EAFD] text-black text-lg font-semibold mb-6 mx-auto">
                {card.number}
              </h2>
              <h3 className="text-[24px] lg:text-[30px] font-bold mb-2">
                {card.title}
              </h3>
              <p className="text-[#272727] text-base font-normal mt-2">
                {card.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </Wrapper>
    </section>
  );
}
