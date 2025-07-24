"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Star, Quote } from "lucide-react";
import Wrapper from "../wrapper";

export default function ClientTestimonialsSection() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.3 });

  const sliderContainerRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [cardWidth, setCardWidth] = useState(0);
  const [gap] = useState(32);
  const [itemsPerPage, setItemsPerPage] = useState(3);

  const testimonialData = [
    {
      name: "Alicia Rodriguez",
      subtitle: "First-Time Vendor • Texas",
      text: "VENDR OS completely transformed my approach to government contracting. What used to feel impossible now feels manageable with their step-by-step guidance.",
      rating: 5,
      company: "Rodriguez Consulting"
    },
    {
      name: "Jessica Martinez",
      subtitle: "Veteran-Owned Construction • Florida",
      text: "The proposal templates and AI tools saved me weeks of work. I won my first $2M contract within 3 months of joining VENDR OS.",
      rating: 5,
      company: "Martinez Construction LLC"
    },
    {
      name: "Marcus Thompson",
      subtitle: "Minority-Owned IT Services • California",
      text: "The SmartDraft AI and compliance tools are game-changers. My win rate went from 15% to 65% in just 6 months.",
      rating: 5,
      company: "TechFlow Solutions"
    },
    {
      name: "Sarah Kim",
      subtitle: "Small Business Owner • New York",
      text: "Finally, a platform that understands small businesses. The support team and resources made all the difference in landing our first federal contract.",
      rating: 5,
      company: "Kim Enterprises"
    },
    {
      name: "David Lopez",
      subtitle: "Experienced Contractor • Arizona",
      text: "Even as someone with 10+ years experience, VENDR OS streamlined my processes and helped me scale to bigger opportunities.",
      rating: 5,
      company: "Lopez Logistics"
    },
    {
      name: "Emily Chen",
      subtitle: "Tech Startup Founder • Washington",
      text: "The Bid/No-Bid Wizard alone paid for itself. It helped me focus on winnable opportunities and avoid costly mistakes.",
      rating: 5,
      company: "NextGen Solutions"
    },
  ];

  useEffect(() => {
    const updateDimensions = () => {
      if (sliderContainerRef.current) {
        const containerWidth = sliderContainerRef.current.offsetWidth;
        let calculatedItemsPerPage = 3;
        if (window.innerWidth < 768) {
          calculatedItemsPerPage = 1;
        } else if (window.innerWidth < 1024) {
          calculatedItemsPerPage = 2;
        }
        setItemsPerPage(calculatedItemsPerPage);

        const effectiveGap =
          calculatedItemsPerPage > 1 ? (calculatedItemsPerPage - 1) * gap : 0;
        const singleCardWidth =
          (containerWidth - effectiveGap) / calculatedItemsPerPage;
        setCardWidth(singleCardWidth);
      }
    };

    updateDimensions();
    window.addEventListener("resize", updateDimensions);
    return () => window.removeEventListener("resize", updateDimensions);
  }, [gap]);

  const totalSlides = testimonialData.length;
  const maxIndex = Math.max(0, totalSlides - itemsPerPage);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => Math.min(prevIndex + 1, maxIndex));
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => Math.max(prevIndex - 1, 0));
  };

  const translateX = -currentIndex * (cardWidth + gap);

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
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  return (
    <section className="relative py-24 lg:py-32">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-surface/30 to-background"></div>
      
      <Wrapper className="relative z-10 text-center" ref={sectionRef}>
        <motion.div
          className="space-y-6 mb-16"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <motion.div
            className="inline-flex items-center space-x-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium border border-primary/20"
            variants={itemVariants}
          >
            <Star className="w-4 h-4 fill-current" />
            <span>Trusted by 1000+ Contractors</span>
          </motion.div>

          <motion.h2
            className="text-4xl md:text-5xl font-bold"
            variants={itemVariants}
          >
            What Our <span className="gradient-text">Clients Say</span>
          </motion.h2>

          <motion.p
            className="text-xl text-muted-foreground max-w-2xl mx-auto"
            variants={itemVariants}
          >
            Real stories from contractors who've transformed their business with VENDR OS
          </motion.p>
        </motion.div>

        <div className="relative flex items-center justify-center">
          <button
            className="absolute left-0 z-10 w-12 h-12 bg-primary/10 hover:bg-primary/20 rounded-full flex items-center justify-center transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            onClick={handlePrev}
            disabled={currentIndex === 0}
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="h-6 w-6 text-primary" />
          </button>

          <div
            ref={sliderContainerRef}
            className="overflow-hidden w-full max-w-6xl mx-auto px-16"
          >
            <motion.div
              className="flex gap-8"
              animate={{ x: translateX }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            >
              {testimonialData.map((testimonial, index) => (
                <motion.div
                  key={index}
                  className="flex-shrink-0 glass-effect rounded-2xl p-8 text-left card-hover relative overflow-hidden"
                  style={{ width: cardWidth > 0 ? `${cardWidth}px` : "auto" }}
                  variants={itemVariants}
                  initial="hidden"
                  animate={isInView ? "visible" : "hidden"}
                >
                  <div className="absolute top-4 right-4 text-primary/20">
                    <Quote className="w-8 h-8" />
                  </div>

                  <div className="relative z-10">
                    <div className="flex items-center space-x-1 mb-4">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                      ))}
                    </div>

                    <p className="text-lg text-foreground mb-6 leading-relaxed">
                      "{testimonial.text}"
                    </p>

                    <div className="border-t border-border pt-4">
                      <h3 className="text-xl font-semibold text-foreground mb-1">
                        {testimonial.name}
                      </h3>
                      <p className="text-primary text-sm font-medium mb-1">
                        {testimonial.subtitle}
                      </p>
                      <p className="text-muted-foreground text-sm">
                        {testimonial.company}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>

          <button
            className="absolute right-0 z-10 w-12 h-12 bg-primary/10 hover:bg-primary/20 rounded-full flex items-center justify-center transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            onClick={handleNext}
            disabled={currentIndex >= maxIndex}
            aria-label="Next testimonial"
          >
            <ChevronRight className="h-6 w-6 text-primary" />
          </button>
        </div>

        <motion.div
          className="mt-16 flex flex-wrap justify-center gap-8 items-center opacity-60"
          variants={itemVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <div className="flex items-center space-x-2">
            <div className="flex -space-x-2">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="w-8 h-8 bg-primary/20 rounded-full border-2 border-background flex items-center justify-center">
                  <span className="text-xs font-bold text-primary">{i + 1}</span>
                </div>
              ))}
            </div>
            <span className="text-sm text-muted-foreground ml-4">1000+ Happy Clients</span>
          </div>
          
          <div className="flex items-center space-x-2">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
              ))}
            </div>
            <span className="text-sm text-muted-foreground">4.9/5 Average Rating</span>
          </div>
        </motion.div>
      </Wrapper>
    </section>
  );
}