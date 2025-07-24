"use client";

import Image from "next/image";
import Link from "next/link";
import Wrapper from "../wrapper"; // Assuming Wrapper is defined elsewhere
import { FaLongArrowAltRight } from "react-icons/fa";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

export default function VendrOSSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 }); // Trigger animation when 50% of the component is in view

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15, // Stagger animation for child elements
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

  const imageVariants = {
    hidden: { opacity: 0, x: 50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.8, ease: "easeOut", delay: 0.4 },
    },
  };

  return (
    <Wrapper className="py-12 md:py-24 lg:py-32">
      <div
        ref={ref}
        className="container px-4 md:px-6 grid lg:grid-cols-2 gap-12 items-center"
      >
        <motion.div
          className="space-y-6"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <motion.h2
            className="inline-block text-sm font-semibold text-[20px] bg-[#F4EAFD] rounded-full px-6 py-4"
            variants={itemVariants}
          >
            Win Big. Win Smart
          </motion.h2>
          <motion.h1
            className="text-4xl md:text-[40px] font-bold"
            variants={itemVariants}
          >
            Why VENDR OS
          </motion.h1>
          <motion.p
            className="text-lg text-[#272727] max-w-[500px]"
            variants={itemVariants}
          >
            Government contracting can be overwhelming. VENDR OS simplifies the
            process with a centralized, easy-to-use platform tailored for
            beginners and small businesses.
          </motion.p>
          <motion.p
            className="text-lg text-[#272727] max-w-[500px]"
            variants={itemVariants}
          >
            Whether you&apos;re just starting or trying to streamline your
            existing approach, VENDR OS equips you with powerful tools,
            templates, and strategies to bid with confidence.
          </motion.p>
          <motion.div variants={itemVariants}>
            <Link
              href="/pricing"
              className="flex items-center justify-center purple-button text-[15px] font-plus-jakarta-sans py-5"
            >
              Start Bidding <FaLongArrowAltRight className="ml-2 h-5 w-5" />
            </Link>
          </motion.div>
        </motion.div>
        <motion.div
          className="border-[#E9E9E9] border-[2px] rounded-[10px] p-[20px]"
          variants={imageVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <div className="relative rounded-xl overflow-hidden border border-gray-200">
            <Image
              src="/assets/vendor.jpg" // Ensure this path is correct based on your public folder
              alt="Man with headset working on a laptop"
              width={600}
              height={400}
              className="object-cover w-full h-full"
            />
          </div>
        </motion.div>
      </div>
    </Wrapper>
  );
}
