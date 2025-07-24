"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Wrapper from "../wrapper"; // Assuming Wrapper is defined elsewhere

export default function ClientTestimonialsSection() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.5 });

  const sliderContainerRef = useRef(null); // Ref for the overflow-hidden div
  const [currentIndex, setCurrentIndex] = useState(0);
  const [cardWidth, setCardWidth] = useState(0);
  const [gap] = useState(32); // Assuming gap-8 is 32px, removed setGap as it's constant
  const [itemsPerPage, setItemsPerPage] = useState(3); // Default for desktop

  const testimonialData = [
    {
      name: "Alicia D",
      subtitle: "First-Time Vendor in Texas",
      text: "I used to feel lost. Now I have a system and strategy. VENDR OS is a game changer.",
    },
    {
      name: "Jessica M",
      subtitle: "Veteran-Owned Construction Business",
      text: "VENDR OS gave me everything I needed to submit my first proposal — and I won it.",
    },
    {
      name: "Marcus T",
      subtitle: "Minority-Owned IT Services Firm",
      text: "The SmartDraft AI tools alone are worth the subscription. I finally feel confident bidding.",
    },
    {
      name: "Sarah K",
      subtitle: "Small Business Owner",
      text: "VENDR OS made navigating government contracts so much easier. Highly recommend for beginners!",
    },
    {
      name: "David L",
      subtitle: "Experienced Contractor",
      text: "The Contract Lifecycle Tracker is a lifesaver. Keeps everything organized and on schedule.",
    },
    {
      name: "Emily R",
      subtitle: "New Entrepreneur",
      text: "I won my first bid thanks to the Bid/No-Bid Wizard. It's incredibly intuitive and helpful.",
    },
  ];

  // Calculate dimensions and items per page on mount and resize
  useEffect(() => {
    const updateDimensions = () => {
      if (sliderContainerRef.current) {
        const containerWidth = sliderContainerRef.current.offsetWidth;
        let calculatedItemsPerPage = 3;
        if (window.innerWidth < 768) {
          calculatedItemsPerPage = 1;
        }
        setItemsPerPage(calculatedItemsPerPage);

        // Use the 'gap' value from the component's scope (which is 32)
        const effectiveGap =
          calculatedItemsPerPage > 1 ? (calculatedItemsPerPage - 1) * gap : 0;
        const singleCardWidth =
          (containerWidth - effectiveGap) / calculatedItemsPerPage;
        setCardWidth(singleCardWidth);
      }
    };

    updateDimensions(); // Initial calculation
    window.addEventListener("resize", updateDimensions);
    return () => window.removeEventListener("resize", updateDimensions);
  }, []); // Removed 'gap' from dependency array

  const totalSlides = testimonialData.length;
  const maxIndex = Math.max(0, totalSlides - itemsPerPage);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => Math.min(prevIndex + 1, maxIndex));
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => Math.max(prevIndex - 1, 0));
  };

  // Calculate the translateX value for the slider
  const translateX = -currentIndex * (cardWidth + gap);

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  return (
    <section className="w-full pt-12  pb-24 lg:pb-32 bg-white">
      <Wrapper className="text-center" ref={sectionRef}>
        <motion.h2
          className="inline-block text-sm font-semibold lg:text-[20px] bg-[#F4EAFD] rounded-full px-6 py-4 mb-6"
          initial={{ opacity: 0, y: -20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          What People Say About Us
        </motion.h2>
        <motion.h1
          className="text-4xl md:text-[40px] font-bold mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
        >
          Client Testimonials
        </motion.h1>

        <div className="relative flex items-center justify-center px-4 md:px-6">
          <button
            className="absolute left-0 md:left-4 p-2  transition-colors z-10 disabled:opacity-50 disabled:cursor-not-allowed"
            onClick={handlePrev}
            disabled={currentIndex === 0}
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="h-6 w-6 text-black" />
          </button>

          <div
            ref={sliderContainerRef}
            className="overflow-hidden w-full max-w-5xl mx-auto"
          >
            <motion.div
              className="flex gap-8" // Tailwind gap-8 = 32px
              animate={{ x: translateX }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            >
              {testimonialData.map((testimonial, index) => (
                <motion.div
                  key={index}
                  className="flex-shrink-0 p-6 rounded-xl bg-[#F4EAFD] text-left flex flex-col"
                  style={{ width: cardWidth > 0 ? `${cardWidth}px` : "auto" }} // Apply calculated width
                  variants={itemVariants} // For initial fade-in when section is in view
                  initial="hidden"
                  animate={isInView ? "visible" : "hidden"}
                >
                  <div className="mb-4">
                    <h3 className="text-xl font-semibold text-black">
                      {testimonial.name}
                    </h3>
                    <p className="text-base text-black font-normal">
                      {testimonial.subtitle}
                    </p>
                  </div>
                  {/* Separator */}
                  <p className="text-lg font-poppins text-black flex-grow">
                    {testimonial.text}
                  </p>
                </motion.div>
              ))}
            </motion.div>
          </div>

          <button
            className="absolute right-0 md:right-4 p-2  transition-colors z-10 disabled:opacity-50 disabled:cursor-not-allowed"
            onClick={handleNext}
            disabled={currentIndex >= maxIndex}
            aria-label="Next testimonial"
          >
            <ChevronRight className="h-6 w-6 text-black" />
          </button>
        </div>
      </Wrapper>
    </section>
  );
}
