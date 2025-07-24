"use client";

import { motion } from "framer-motion";
import { FaLongArrowAltRight } from "react-icons/fa";

// Base64 encoded SVG for the top wavy border (points down, revealing white above)
// This SVG defines the BLACK area that will be masked out, revealing the white background.
// Path: M0 0 L0 15 L5 15 Q15 15 20 0 L20 0 Z
// This creates a shape that follows the bottom edge of the white wave.
const waveTopSvg = `data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMTUiIHZpZXdCb3g9IjAgMCAyMCAxNSIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTAgMCBMMCAxNSBMNSAxNSBRMTUgMTUgMjAgMCBMMjAgMCBaIiBmaWxsPSJibGFjayIvPgo8L3N2Zz4=`;

// Base64 encoded SVG for the bottom wavy border (points up, revealing white below)
// This SVG defines the BLACK area that will be masked out, revealing the white background.
// Path: M0 15 L0 0 L5 0 Q15 0 20 15 L20 15 Z
// This creates a shape that follows the top edge of the white wave.
const waveBottomSvg = `data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMTUiIHZpZXdCb3g9IjAgMCAyMCAxNSIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTAgMTUgTDAgMCBMNSAwIFEyMCAwIDIwIDE1IEwyMCAxNSBaIiBmaWxsPSJibGFjayIvPgo8L3N2Zz4=`;

export function CtaSection() {
  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
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
    <>
      <motion.section
        className="relative w-full py-20 md:py-32 text-center text-white overflow-hidden
                 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(/assets/grid.jpg)` }}
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        {/* Dark overlay for readability */}
        <div className="absolute inset-0 bg-black opacity-70 z-10"></div>

        {/* Top wavy border */}
        <div
          className="absolute top-0 left-0 w-full h-[15px] z-20" // Height of the wave area
          style={{
            maskImage: `url(${waveTopSvg})`,
            maskRepeat: "repeat-x",
            maskSize: "20px 15px", // Width and height of one wave segment
            backgroundColor: "white", // This color will be visible as the wave
          }}
        ></div>

        {/* Bottom wavy border */}
        <div
          className="absolute bottom-0 left-0 w-full h-[15px] z-20" // Height of the wave area
          style={{
            maskImage: `url(${waveBottomSvg})`,
            maskRepeat: "repeat-x",
            maskSize: "20px 15px", // Width and height of one wave segment
            backgroundColor: "white", // This color will be visible as the wave
          }}
        ></div>

        <div className="relative z-30 max-w-4xl mx-auto px-4">
          <motion.h2
            className="text-3xl md:text-[40px] font-bold leading-tight mb-6 font-plus-jakarta-sans"
            variants={itemVariants}
          >
            Are You Ready To Start Winning Contracts?
          </motion.h2>
          <motion.p
            className="text-lg md:text-[20px] font-bold text-white mb-10 max-w-2xl mx-auto font-poppins"
            variants={itemVariants}
          >
            Join hundreds of small businesses using VENDR OS to simplify their
            journey into government contracting.
          </motion.p>
          <motion.div
            variants={itemVariants}
            className="flex justify-center space-x-4"
          >
            <Link
              href="/pricing"
              className=" flex items-center justify-center purple-button text-[15px] font-plus-jakarta-sans py-5"
            >
              Start Bidding <FaLongArrowAltRight className="ml-2 h-5 w-5" />
            </Link>
          </motion.div>
        </div>
      </motion.section>
    </>
  );
}
