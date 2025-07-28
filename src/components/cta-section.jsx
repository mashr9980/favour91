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
      icon: <Users className="w-6 h-6" />,
      value: "1000+",
      label: "Active Users"
    },
    {
      icon: <Award className="w-6 h-6" />,
      value: "$50M+",
      label: "Contracts Won"
    },
    {
      icon: <Rocket className="w-6 h-6" />,
      value: "85%",
      label: "Success Rate"
    }
  ];

  return (
    <section className="relative py-24 lg:py-32 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-background to-primary/10"></div>
      <div className="absolute inset-0 section-pattern opacity-20"></div>
      
      <div className="absolute top-20 left-20 w-32 h-32 bg-primary/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 right-20 w-40 h-40 bg-primary/5 rounded-full blur-3xl"></div>

      <motion.div
        className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        <motion.div
          className="inline-flex items-center space-x-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-8 border border-primary/20"
          variants={itemVariants}
        >
          <Rocket className="w-4 h-4" />
          <span>Start Your Success Story</span>
        </motion.div>

        <motion.h2
          className="text-4xl md:text-6xl font-bold leading-tight mb-6"
          variants={itemVariants}
        >
          Ready to Start{" "}
          <span className="gradient-text">Winning Contracts?</span>
        </motion.h2>

        <motion.p
          className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-3xl mx-auto leading-relaxed"
          variants={itemVariants}
        >
          Join thousands of successful vendors who've transformed their government contracting journey with VENDR OS. Your next big opportunity is waiting.
        </motion.p>

        <motion.div
          className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-16"
          variants={itemVariants}
        >
          <Button asChild size="lg" className="purple-button text-xl px-10 py-6 h-auto glow-effect">
            <Link href="/pricing">
              Get Started Today
              <ArrowRight className="ml-3 h-6 w-6" />
            </Link>
          </Button>
          
          <Button asChild variant="outline" size="lg" className="secondary-button text-xl px-10 py-6 h-auto">
            <Link href="/contact">
              Schedule Demo
            </Link>
          </Button>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto"
          variants={itemVariants}
        >
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              className="glass-effect rounded-xl p-6 text-center"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center text-primary mx-auto mb-4">
                {stat.icon}
              </div>
              <h3 className="text-3xl font-bold mb-2 gradient-text">{stat.value}</h3>
              <p className="text-muted-foreground">{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          className="mt-16 text-center"
          variants={itemVariants}
        >
          <p className="text-sm text-muted-foreground mb-4">
            No credit card required • 14-day free trial • Cancel anytime
          </p>
          <div className="flex items-center justify-center space-x-6 text-xs text-muted-foreground">
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