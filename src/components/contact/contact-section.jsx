"use client";

import { useState } from "react";
import { Mail, Phone, MessageCircle, Send, Clock, Users, Headphones } from "lucide-react";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Wrapper from "../wrapper";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

export default function ContactSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

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

  const contactMethods = [
    {
      icon: <MessageCircle className="w-6 h-6 sm:w-8 sm:h-8" />,
      title: "General Inquiries",
      description: "Questions about plans, features, or getting started with government contracting",
      contact: "support@vendr-os.com",
      responseTime: "Within 4 business hours",
      color: "from-blue-500/20 to-blue-600/20"
    },
    {
      icon: <Headphones className="w-6 h-6 sm:w-8 sm:h-8" />,
      title: "Technical Support",
      description: "Dashboard issues, file access problems, or technical troubleshooting",
      contact: "tech@vendr-os.com",
      responseTime: "Within 2 business hours",
      color: "from-green-500/20 to-green-600/20"
    },
    {
      icon: <Users className="w-6 h-6 sm:w-8 sm:h-8" />,
      title: "Partnerships & Enterprise",
      description: "Licensing opportunities, bulk subscriptions, or enterprise solutions",
      contact: "partnerships@vendr-os.com",
      responseTime: "Within 24 hours",
      color: "from-purple-500/20 to-purple-600/20"
    }
  ];

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      toast.success("Message sent successfully! We'll get back to you soon.");
      setFormData({ name: "", email: "", subject: "", message: "" });
    } catch (error) {
      toast.error("Failed to send message. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="relative py-16 sm:py-24 lg:py-32">
      <div className="absolute inset-0 section-pattern opacity-20"></div>
      
      <Wrapper className="relative z-10" ref={ref}>
        <motion.div
          className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8 mb-12 sm:mb-16"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {contactMethods.map((method, index) => (
            <motion.div
              key={index}
              className="group relative overflow-hidden"
              variants={itemVariants}
            >
              <div className="glass-effect rounded-2xl p-6 sm:p-8 h-full card-hover relative">
                <div className={`absolute inset-0 bg-gradient-to-br ${method.color} opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl`}></div>
                
                <div className="relative z-10">
                  <div className="w-12 h-12 sm:w-16 sm:h-16 bg-primary/10 rounded-2xl flex items-center justify-center text-primary mb-4 sm:mb-6 group-hover:bg-primary/20 transition-colors">
                    {method.icon}
                  </div>

                  <h3 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4 group-hover:text-primary transition-colors">
                    {method.title}
                  </h3>

                  <p className="text-sm sm:text-base text-muted-foreground mb-4 sm:mb-6 leading-relaxed">
                    {method.description}
                  </p>

                  <div className="space-y-2 sm:space-y-3 mb-4 sm:mb-6">
                    <div className="flex items-center space-x-2 sm:space-x-3">
                      <Mail className="w-3 h-3 sm:w-4 sm:h-4 text-primary" />
                      <a 
                        href={`mailto:${method.contact}`}
                        className="text-xs sm:text-sm font-medium hover:text-primary transition-colors break-all"
                      >
                        {method.contact}
                      </a>
                    </div>
                    <div className="flex items-center space-x-2 sm:space-x-3">
                      <Clock className="w-3 h-3 sm:w-4 sm:h-4 text-primary" />
                      <span className="text-xs sm:text-sm text-muted-foreground">{method.responseTime}</span>
                    </div>
                  </div>

                  <Button 
                    asChild 
                    size="sm" 
                    className="w-full secondary-button"
                  >
                    <a href={`mailto:${method.contact}`}>
                      Send Email
                      <Send className="ml-2 h-3 w-3 sm:h-4 sm:w-4" />
                    </a>
                  </Button>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          className="max-w-4xl mx-auto"
          variants={itemVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <div className="text-center mb-8 sm:mb-12 px-4">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4">
              Send Us a <span className="gradient-text">Message</span>
            </h2>
            <p className="text-base sm:text-xl text-muted-foreground">
              Fill out the form below and we'll get back to you within 24 hours
            </p>
          </div>

          <div className="glass-effect rounded-2xl p-6 sm:p-8 lg:p-12">
            <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                <div className="space-y-2">
                  <label htmlFor="name" className="text-sm font-medium">
                    Full Name *
                  </label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Your full name"
                    required
                    className="h-10 sm:h-12"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium">
                    Email Address *
                  </label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="your@email.com"
                    required
                    className="h-10 sm:h-12"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="subject" className="text-sm font-medium">
                  Subject *
                </label>
                <Input
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  placeholder="What's this about?"
                  required
                  className="h-10 sm:h-12"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="message" className="text-sm font-medium">
                  Message *
                </label>
                <Textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  placeholder="Tell us more about your inquiry..."
                  rows={4}
                  required
                  className="resize-none"
                />
              </div>

              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full h-10 sm:h-12 purple-button text-base sm:text-lg"
              >
                {isSubmitting ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 sm:h-5 sm:w-5 border-b-2 border-white mr-2"></div>
                    Sending...
                  </>
                ) : (
                  <>
                    Send Message
                    <Send className="ml-2 h-4 w-4 sm:h-5 sm:w-5" />
                  </>
                )}
              </Button>
            </form>

            <div className="mt-6 sm:mt-8 pt-6 sm:pt-8 border-t border-border text-center">
              <p className="text-xs sm:text-sm text-muted-foreground mb-3 sm:mb-4">
                Prefer to call? We're available Monday-Friday, 9AM-6PM EST
              </p>
              <div className="flex items-center justify-center space-x-2">
                <Phone className="w-3 h-3 sm:w-4 sm:h-4 text-primary" />
                <a 
                  href="tel:1-800-VENDR-OS" 
                  className="text-base sm:text-lg font-semibold hover:text-primary transition-colors"
                >
                  1-800-VENDR-OS
                </a>
              </div>
            </div>
          </div>
        </motion.div>
      </Wrapper>
    </section>
  );
}