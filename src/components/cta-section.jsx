"use client";

import { motion } from "framer-motion";
import { ArrowRight, Rocket, Users, Award } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

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
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    },
  };

  const stats = [
    {
      icon: <Users className="w-5 h-5 sm:w-6 sm:h-6" />,
      value: "1000+",
      label: "Active Users"
    },
    {
      icon: <Award className="w-5 h-5 sm:w-6 sm:h-6" />,
      value: "$50M+",
      label: "Contracts Won"
    },
    {
      icon: <Rocket className="w-5 h-5 sm:w-6 sm:h-6" />,
      value: "85%",
      label: "Success Rate"
    }
  ];

  return (
    <section className="relative py-16 sm:py-24 lg:py-32 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-background to-primary/10"></div>
      <div className="absolute inset-0 section-pattern opacity-20"></div>
      
      <div className="absolute top-10 left-10 w-20 h-20 sm:top-20 sm:left-20 sm:w-32 sm:h-32 bg-primary/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-10 right-10 w-24 h-24 sm:bottom-20 sm:right-20 sm:w-40 sm:h-40 bg-primary/5 rounded-full blur-3xl"></div>

      <motion.div
        className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        <motion.div
          className="inline-flex items-center space-x-2 bg-primary/10 text-primary px-3 py-1.5 sm:px-4 sm:py-2 rounded-full text-xs sm:text-sm font-medium mb-6 sm:mb-8 border border-primary/20"
          variants={itemVariants}
        >
          <Rocket className="w-3 h-3 sm:w-4 sm:h-4" />
          <span>Start Your Success Story</span>
        </motion.div>

        <motion.h2
          className="text-2xl sm:text-4xl md:text-6xl font-bold leading-tight mb-4 sm:mb-6 px-2"
          variants={itemVariants}
        >
          Ready to Start{" "}
          <span className="gradient-text block sm:inline">Winning Contracts?</span>
        </motion.h2>

        <motion.p
          className="text-base sm:text-xl md:text-2xl text-muted-foreground mb-8 sm:mb-12 max-w-3xl mx-auto leading-relaxed px-4"
          variants={itemVariants}
        >
          Join thousands of successful vendors who've transformed their government contracting journey with VENDR OS. Your next big opportunity is waiting.
        </motion.p>

        <motion.div
          className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 mb-12 sm:mb-16 px-4"
          variants={itemVariants}
        >
          <Button asChild size="lg" className="purple-button text-base sm:text-xl px-8 sm:px-10 py-4 sm:py-6 h-auto glow-effect w-full sm:w-auto">
            <Link href="/pricing">
              Get Started Today
              <ArrowRight className="ml-2 sm:ml-3 h-5 w-5 sm:h-6 sm:w-6" />
            </Link>
          </Button>
          
          <Button asChild variant="outline" size="lg" className="secondary-button text-base sm:text-xl px-8 sm:px-10 py-4 sm:py-6 h-auto w-full sm:w-auto">
            <Link href="/contact">
              Schedule Demo
            </Link>
          </Button>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-8 max-w-4xl mx-auto"
          variants={itemVariants}
        >
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              className="glass-effect rounded-xl p-4 sm:p-6 text-center"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-primary/20 rounded-full flex items-center justify-center text-primary mx-auto mb-3 sm:mb-4">
                {stat.icon}
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold mb-1 sm:mb-2 gradient-text">{stat.value}</h3>
              <p className="text-sm sm:text-base text-muted-foreground">{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          className="mt-12 sm:mt-16 text-center px-4"
          variants={itemVariants}
        >
          <p className="text-xs sm:text-sm text-muted-foreground mb-3 sm:mb-4">
            No credit card required • 14-day free trial • Cancel anytime
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-2 sm:space-y-0 sm:space-x-6 text-xs text-muted-foreground">
            <span>✓ SOC 2 Compliant</span>
            <span>✓ 99.9% Uptime</span>
            <span>✓ 24/7 Support</span>
          </div>
        </motion.div>
      </motion.div>

      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent"></div>
    </section>
  );
}