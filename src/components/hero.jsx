"use client";

import { motion } from "framer-motion";
import { ArrowRight, Star, Users, Award, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export function HeroSection() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    },
  };

  const floatingVariants = {
    animate: {
      y: [0, -10, 0],
      transition: {
        duration: 6,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden hero-grid pt-16">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background/80 to-background"></div>

      <div className="absolute top-10 left-5 w-16 h-16 sm:top-20 sm:left-10 sm:w-20 sm:h-20 bg-primary/10 rounded-full blur-xl"></div>
      <div className="absolute top-20 right-10 w-20 h-20 sm:top-40 sm:right-20 sm:w-32 sm:h-32 bg-primary/5 rounded-full blur-2xl"></div>
      <div className="absolute bottom-10 left-1/4 w-16 h-16 sm:bottom-20 sm:w-24 sm:h-24 bg-primary/8 rounded-full blur-xl"></div>

      <motion.div
        className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div
          className="inline-flex items-center space-x-2 bg-primary/10 text-primary px-3 py-1.5 sm:px-4 sm:py-2 rounded-full text-xs sm:text-sm font-medium mb-6 sm:mb-8 border border-primary/20"
          variants={itemVariants}
        >
          <Star className="w-3 h-3 sm:w-4 sm:h-4" />
          <span className="whitespace-nowrap">Trusted by 1000+ Government Contractors</span>
        </motion.div>

        <motion.h1
          className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold leading-tight mb-4 sm:mb-6 max-w-5xl mx-auto"
          variants={itemVariants}
        >
          Government Contracts Made{" "}
          <span className="gradient-text">Easy</span> for{" "}
          <span className="gradient-text block sm:inline">First-Time Vendors</span>
        </motion.h1>

        <motion.p
          className="text-base sm:text-xl md:text-2xl text-muted-foreground mb-8 sm:mb-10 max-w-3xl mx-auto leading-relaxed px-2"
          variants={itemVariants}
        >
          Transform your government contracting journey with AI-powered tools, smart workflows, and proven strategies used by successful contractors.
        </motion.p>

        <motion.div
          className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 mb-8 sm:mb-12 px-4"
          variants={itemVariants}
        >
          <Button asChild size="lg" className="purple-button w-full sm:w-auto">
            <Link href="/pricing">
              Get Started Today
              <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5" />
            </Link>
          </Button>
          
          <Button asChild variant="outline" size="lg" className="secondary-button w-full sm:w-auto">
            <Link href="/contact">
              Schedule Demo
            </Link>
          </Button>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-8 max-w-4xl mx-auto px-4"
          variants={itemVariants}
        >
          <motion.div
            className="glass-effect rounded-xl p-4 sm:p-6 text-center"
            variants={floatingVariants}
            animate="animate"
          >
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
              <Users className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
            </div>
            <h3 className="text-xl sm:text-2xl font-bold mb-1 sm:mb-2">1000+</h3>
            <p className="text-muted-foreground text-sm sm:text-base">Active Users</p>
          </motion.div>

          <motion.div
            className="glass-effect rounded-xl p-4 sm:p-6 text-center"
            variants={floatingVariants}
            animate="animate"
            transition={{ delay: 0.2 }}
          >
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
              <Award className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
            </div>
            <h3 className="text-xl sm:text-2xl font-bold mb-1 sm:mb-2">$50M+</h3>
            <p className="text-muted-foreground text-sm sm:text-base">Contracts Won</p>
          </motion.div>

          <motion.div
            className="glass-effect rounded-xl p-4 sm:p-6 text-center sm:col-span-1 col-span-1 mx-auto w-full max-w-sm sm:max-w-none"
            variants={floatingVariants}
            animate="animate"
            transition={{ delay: 0.4 }}
          >
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
              <TrendingUp className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
            </div>
            <h3 className="text-xl sm:text-2xl font-bold mb-1 sm:mb-2">85%</h3>
            <p className="text-muted-foreground text-sm sm:text-base">Success Rate</p>
          </motion.div>
        </motion.div>

        <motion.div
          className="mt-12 sm:mt-16 text-center px-4"
          variants={itemVariants}
        >
          <p className="text-xs sm:text-sm text-muted-foreground mb-3 sm:mb-4">Trusted by companies worldwide</p>
          <div className="flex items-center justify-center space-x-4 sm:space-x-8 opacity-50 overflow-x-auto">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="flex-shrink-0 w-16 h-6 sm:w-24 sm:h-8 bg-muted rounded flex items-center justify-center">
                <span className="text-xs font-medium">Partner {i + 1}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </motion.div>

      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent"></div>
    </section>
  );
}