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

      <div className="absolute top-20 left-10 w-20 h-20 bg-primary/10 rounded-full blur-xl"></div>
      <div className="absolute top-40 right-20 w-32 h-32 bg-primary/5 rounded-full blur-2xl"></div>
      <div className="absolute bottom-20 left-1/4 w-24 h-24 bg-primary/8 rounded-full blur-xl"></div>

      <motion.div
        className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div
          className="inline-flex items-center space-x-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-8 border border-primary/20"
          variants={itemVariants}
        >
          <Star className="w-4 h-4" />
          <span>Trusted by 1000+ Government Contractors</span>
        </motion.div>

        <motion.h1
          className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6 max-w-5xl mx-auto"
          variants={itemVariants}
        >
          Government Contracts Made{" "}
          <span className="gradient-text">Easy</span> for{" "}
          <span className="gradient-text">First-Time Vendors</span>
        </motion.h1>

        <motion.p
          className="text-xl md:text-2xl text-muted-foreground mb-10 max-w-3xl mx-auto leading-relaxed"
          variants={itemVariants}
        >
          Transform your government contracting journey with AI-powered tools, smart workflows, and proven strategies used by successful contractors.
        </motion.p>

        <motion.div
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12"
          variants={itemVariants}
        >
          <Button asChild size="lg" className="purple-button text-lg px-8 py-4 h-auto">
            <Link href="/pricing">
              Get Started Today
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
          
          <Button asChild variant="outline" size="lg" className="secondary-button text-lg px-8 py-4 h-auto">
            <Link href="/contact">
              Schedule Demo
            </Link>
          </Button>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto"
          variants={itemVariants}
        >
          <motion.div
            className="glass-effect rounded-xl p-6 text-center"
            variants={floatingVariants}
            animate="animate"
          >
            <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <Users className="w-6 h-6 text-primary" />
            </div>
            <h3 className="text-2xl font-bold mb-2">1000+</h3>
            <p className="text-muted-foreground">Active Users</p>
          </motion.div>

          <motion.div
            className="glass-effect rounded-xl p-6 text-center"
            variants={floatingVariants}
            animate="animate"
            transition={{ delay: 0.2 }}
          >
            <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <Award className="w-6 h-6 text-primary" />
            </div>
            <h3 className="text-2xl font-bold mb-2">$50M+</h3>
            <p className="text-muted-foreground">Contracts Won</p>
          </motion.div>

          <motion.div
            className="glass-effect rounded-xl p-6 text-center"
            variants={floatingVariants}
            animate="animate"
            transition={{ delay: 0.4 }}
          >
            <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <TrendingUp className="w-6 h-6 text-primary" />
            </div>
            <h3 className="text-2xl font-bold mb-2">85%</h3>
            <p className="text-muted-foreground">Success Rate</p>
          </motion.div>
        </motion.div>

        <motion.div
          className="mt-16 text-center"
          variants={itemVariants}
        >
          <p className="text-sm text-muted-foreground mb-4">Trusted by companies worldwide</p>
          <div className="flex items-center justify-center space-x-8 opacity-50">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="w-24 h-8 bg-muted rounded flex items-center justify-center">
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