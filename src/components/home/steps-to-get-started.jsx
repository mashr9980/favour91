"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Wrapper from "../wrapper";
import { CreditCard, LogIn, Rocket, ArrowRight } from "lucide-react";

export default function StepsToGetStartedSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

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

  const cardData = [
    {
      number: 1,
      icon: <CreditCard className="w-5 h-5 sm:w-6 sm:h-6" />,
      title: "Choose Your Plan",
      description: "Select the perfect membership tier that matches your business stage and budget requirements",
      color: "from-blue-500/20 to-blue-600/20",
    },
    {
      number: 2,
      icon: <LogIn className="w-5 h-5 sm:w-6 sm:h-6" />,
      title: "Access Your Dashboard",
      description: "Get instant access to your personalized dashboard with step-by-step guidance and smart tools",
      color: "from-green-500/20 to-green-600/20",
    },
    {
      number: 3,
      icon: <Rocket className="w-5 h-5 sm:w-6 sm:h-6" />,
      title: "Start Winning Contracts",
      description: "Use our proven workflows and AI-powered tools to save time and dramatically increase your win rates",
      color: "from-purple-500/20 to-purple-600/20",
    },
  ];

  return (
    <section className="relative py-16 sm:py-24 lg:py-32">
      <div className="absolute inset-0 bg-gradient-to-b from-surface/30 to-background"></div>
      
      <Wrapper className="relative z-10 text-center" ref={ref}>
        <motion.div
          className="space-y-4 sm:space-y-6 mb-12 sm:mb-16"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <motion.h2
            className="text-2xl sm:text-4xl md:text-5xl font-bold px-2"
            variants={itemVariants}
          >
            Get Started in{" "}
            <span className="gradient-text">3 Simple Steps</span>
          </motion.h2>

          <motion.p
            className="text-base sm:text-xl text-muted-foreground max-w-2xl mx-auto px-4"
            variants={itemVariants}
          >
            Transform your government contracting journey in minutes, not months
          </motion.p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 max-w-6xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {cardData.map((card, index) => (
            <motion.div
              key={index}
              className="relative group"
              variants={itemVariants}
            >
              <div className="glass-effect rounded-2xl p-6 sm:p-8 h-full text-center card-hover relative overflow-hidden">
                <div className={`absolute inset-0 bg-gradient-to-br ${card.color} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}></div>
                
                <div className="relative z-10">
                  <div className="flex items-center justify-center mb-4 sm:mb-6">
                    <div className="w-12 h-12 sm:w-16 sm:h-16 bg-primary/10 rounded-full flex items-center justify-center text-primary group-hover:bg-primary/20 transition-colors mr-3 sm:mr-4">
                      {card.icon}
                    </div>
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-primary rounded-full flex items-center justify-center text-primary-foreground font-bold text-lg sm:text-xl">
                      {card.number}
                    </div>
                  </div>

                  <h3 className="text-lg sm:text-2xl font-bold mb-3 sm:mb-4 group-hover:text-primary transition-colors">
                    {card.title}
                  </h3>
                  
                  <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                    {card.description}
                  </p>
                </div>

                {index < cardData.length - 1 && (
                  <div className="hidden md:block absolute top-1/2 -right-4 transform -translate-y-1/2 z-20">
                    <div className="w-6 h-6 sm:w-8 sm:h-8 bg-primary/10 rounded-full flex items-center justify-center">
                      <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4 text-primary" />
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          className="mt-12 sm:mt-16 px-4"
          variants={itemVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <div className="glass-effect rounded-2xl p-6 sm:p-8 max-w-2xl mx-auto">
            <h3 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">
              Ready to Get Started?
            </h3>
            <p className="text-sm sm:text-base text-muted-foreground mb-4 sm:mb-6">
              Join thousands of successful contractors who've transformed their business with VENDR OS
            </p>
            <motion.a
              href="/pricing"
              className="purple-button text-base sm:text-lg px-6 sm:px-8 py-3 sm:py-4"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Choose Your Plan
              <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5" />
            </motion.a>
          </div>
        </motion.div>
      </Wrapper>
    </section>
  );
}