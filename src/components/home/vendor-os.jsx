"use client";

import Image from "next/image";
import Wrapper from "../wrapper";
import { ArrowRight, CheckCircle, Zap, Shield, Target } from "lucide-react";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function VendrOSSection() {
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

  const imageVariants = {
    hidden: { opacity: 0, x: 50, scale: 0.8 },
    visible: {
      opacity: 1,
      x: 0,
      scale: 1,
      transition: { duration: 0.8, ease: "easeOut", delay: 0.4 },
    },
  };

  const features = [
    {
      icon: <Zap className="w-5 h-5" />,
      title: "AI-Powered Automation",
      description: "Smart workflows that handle repetitive tasks automatically"
    },
    {
      icon: <Shield className="w-5 h-5" />,
      title: "Compliance Guaranteed",
      description: "Built-in compliance checks for all government requirements"
    },
    {
      icon: <Target className="w-5 h-5" />,
      title: "Higher Win Rates",
      description: "Proven strategies that increase your success probability"
    }
  ];

  return (
    <section className="relative py-24 lg:py-32 section-pattern">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-surface/50 to-background"></div>
      
      <Wrapper className="relative z-10">
        <div
          ref={ref}
          className="grid lg:grid-cols-2 gap-16 items-center"
        >
          <motion.div
            className="space-y-8"
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            <motion.div
              className="inline-flex items-center space-x-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium border border-primary/20"
              variants={itemVariants}
            >
              <CheckCircle className="w-4 h-4" />
              <span>Win Big. Win Smart</span>
            </motion.div>

            <motion.h2
              className="text-4xl md:text-5xl font-bold leading-tight"
              variants={itemVariants}
            >
              Why Choose{" "}
              <span className="gradient-text">VENDR OS</span>
            </motion.h2>

            <motion.p
              className="text-xl text-muted-foreground leading-relaxed"
              variants={itemVariants}
            >
              Government contracting doesn't have to be overwhelming. VENDR OS transforms complex processes into simple, automated workflows designed specifically for small businesses and first-time vendors.
            </motion.p>

            <motion.div
              className="space-y-6"
              variants={itemVariants}
            >
              {features.map((feature, index) => (
                <div key={index} className="flex items-start space-x-4">
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center text-primary flex-shrink-0">
                    {feature.icon}
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-2">{feature.title}</h3>
                    <p className="text-muted-foreground">{feature.description}</p>
                  </div>
                </div>
              ))}
            </motion.div>

            <motion.div
              className="flex flex-col sm:flex-row gap-4"
              variants={itemVariants}
            >
              <Button asChild className="purple-button">
                <Link href="/pricing">
                  Start Your Journey
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              
              <Button asChild variant="outline" className="secondary-button">
                <Link href="/contact">
                  Learn More
                </Link>
              </Button>
            </motion.div>
          </motion.div>

          <motion.div
            className="relative"
            variants={imageVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            <div className="relative rounded-2xl overflow-hidden glass-effect p-6 glow-effect">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-primary/5 rounded-2xl"></div>
              <div className="relative">
                <Image
                  src="/assets/vendor.jpg"
                  alt="Professional using VENDR OS platform"
                  width={600}
                  height={400}
                  className="object-cover w-full h-full rounded-xl"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/20 to-transparent rounded-xl"></div>
              </div>
            </div>

            <div className="absolute -top-6 -right-6 w-24 h-24 bg-primary/10 rounded-full blur-2xl"></div>
            <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-primary/5 rounded-full blur-3xl"></div>
          </motion.div>
        </div>
      </Wrapper>
    </section>
  );
}