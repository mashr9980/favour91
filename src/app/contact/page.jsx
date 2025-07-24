"use client";

import ContactSection from "@/components/contact/contact-section";
import { motion } from "framer-motion";
import { MessageCircle, Users } from "lucide-react";

export default function ContactPage() {
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

  return (
    <div className="min-h-screen pt-16">
      <motion.section
        className="relative py-24 lg:py-32 text-center overflow-hidden hero-grid"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background/80 to-background"></div>
        
        <div className="absolute top-20 left-20 w-32 h-32 bg-primary/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-40 h-40 bg-primary/10 rounded-full blur-3xl"></div>

        <div className="relative z-10 max-w-4xl mx-auto px-4">
          <motion.div
            className="inline-flex items-center space-x-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-8 border border-primary/20"
            variants={itemVariants}
          >
            <MessageCircle className="w-4 h-4" />
            <span>We're Here to Help</span>
          </motion.div>

          <motion.h1
            className="text-4xl md:text-6xl font-bold leading-tight mb-6"
            variants={itemVariants}
          >
            Get in <span className="gradient-text">Touch</span>
          </motion.h1>

          <motion.p
            className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-3xl mx-auto leading-relaxed"
            variants={itemVariants}
          >
            Have questions about VENDR OS? Need help getting started? 
            Our team of government contracting experts is here to support your success.
          </motion.p>

          <motion.div
            className="flex items-center justify-center space-x-8 text-sm text-muted-foreground"
            variants={itemVariants}
          >
            <div className="flex items-center space-x-2">
              <Users className="w-4 h-4 text-primary" />
              <span>Expert support team</span>
            </div>
            <div className="flex items-center space-x-2">
              <MessageCircle className="w-4 h-4 text-primary" />
              <span>24-hour response time</span>
            </div>
          </motion.div>
        </div>
      </motion.section>
      
      <ContactSection />
    </div>
  );
}