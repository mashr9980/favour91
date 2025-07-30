"use client";

import { motion, useInView } from "framer-motion";
import Wrapper from "../wrapper";
import { useRef } from "react";
import { 
  Brain, 
  FileText, 
  Shield, 
  Target, 
  BarChart3, 
  Users, 
  Wrench, 
  Calendar,
  Mail,
  CheckCircle
} from "lucide-react";

export default function FeaturesOverviewSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    },
  };

  const featureData = [
    {
      icon: <Brain className="w-5 h-5 sm:w-6 sm:h-6" />,
      title: "SmartDraft AI Prompts",
      description: "AI-powered proposal generation"
    },
    {
      icon: <FileText className="w-5 h-5 sm:w-6 sm:h-6" />,
      title: "Proposal Vault",
      description: "Secure document management"
    },
    {
      icon: <Shield className="w-5 h-5 sm:w-6 sm:h-6" />,
      title: "Compliance Toolkit",
      description: "Government requirement compliance"
    },
    {
      icon: <Target className="w-5 h-5 sm:w-6 sm:h-6" />,
      title: "Bid/No-Bid Wizard",
      description: "Smart opportunity analysis"
    },
    {
      icon: <BarChart3 className="w-5 h-5 sm:w-6 sm:h-6" />,
      title: "Contract Lifecycle Tracker",
      description: "End-to-end project monitoring"
    },
    {
      icon: <Users className="w-5 h-5 sm:w-6 sm:h-6" />,
      title: "CRM & Onboarding Hub",
      description: "Client relationship management"
    },
    {
      icon: <Wrench className="w-5 h-5 sm:w-6 sm:h-6" />,
      title: "Subcontractor Toolkit",
      description: "Partnership management tools"
    },
    {
      icon: <CheckCircle className="w-5 h-5 sm:w-6 sm:h-6" />,
      title: "Post-Award Execution Plan",
      description: "Project delivery framework"
    },
    {
      icon: <Mail className="w-5 h-5 sm:w-6 sm:h-6" />,
      title: "Smart Email Vault",
      description: "Communication organization"
    },
    {
      icon: <Calendar className="w-5 h-5 sm:w-6 sm:h-6" />,
      title: "Calendar & Alerts",
      description: "Deadline management system"
    }
  ];

  return (
    <section className="relative py-16 sm:py-24 lg:py-32 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-primary/5 to-background"></div>
      <div className="absolute inset-0 section-pattern opacity-30"></div>

      <Wrapper className="relative z-10">
        <div className="text-center" ref={ref}>
          <motion.div
            className="space-y-4 sm:space-y-6 mb-12 sm:mb-16"
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            <motion.div
              className="inline-flex items-center space-x-2 bg-primary/10 text-primary px-3 py-1.5 sm:px-4 sm:py-2 rounded-full text-xs sm:text-sm font-medium border border-primary/20"
              variants={itemVariants}
            >
              <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4" />
              <span>Complete Solution</span>
            </motion.div>

            <motion.h2
              className="text-2xl sm:text-4xl md:text-5xl font-bold px-2"
              variants={itemVariants}
            >
              Everything You Need in{" "}
              <span className="gradient-text">One Platform</span>
            </motion.h2>

            <motion.p
              className="text-base sm:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed px-4"
              variants={itemVariants}
            >
              Your complete government contracting toolkit with AI-powered workflows, 
              smart automation, and proven strategies all in one intelligent system.
            </motion.p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 sm:gap-6"
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            {featureData.map((feature, index) => (
              <motion.div
                key={index}
                className="group relative"
                variants={itemVariants}
              >
                <div className="glass-effect rounded-xl p-4 sm:p-6 h-full text-center card-hover">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-primary/10 rounded-lg flex items-center justify-center text-primary mx-auto mb-3 sm:mb-4 group-hover:bg-primary/20 transition-colors">
                    {feature.icon}
                  </div>
                  <h3 className="font-semibold text-sm sm:text-lg mb-2 group-hover:text-primary transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-muted-foreground">
                    {feature.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            className="mt-12 sm:mt-16 text-center px-4"
            variants={itemVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            <div className="glass-effect rounded-2xl p-6 sm:p-8 max-w-4xl mx-auto">
              <h3 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">
                Ready to Transform Your Government Contracting?
              </h3>
              <p className="text-sm sm:text-base text-muted-foreground mb-4 sm:mb-6">
                Join thousands of successful vendors who've streamlined their processes with VENDR OS
              </p>
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
                <motion.a
                  href="/pricing"
                  className="purple-button"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Start Free Trial
                </motion.a>
                <motion.a
                  href="/contact"
                  className="secondary-button"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Schedule Demo
                </motion.a>
              </div>
            </div>
          </motion.div>
        </div>
      </Wrapper>
    </section>
  );
}