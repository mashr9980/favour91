"use client";

import { Mail } from "lucide-react";
import { motion } from "framer-motion";
import Wrapper from "../wrapper";
import { cn } from "@/lib/utils";
import Link from "next/link";

export default function ContactSection() {
  const contactCardsData = [
    {
      title: "General Inquiries",
      description:
        "For questions about plans, product features, or account setup",
      email: "support@favor91.com",
      additionalInfo: "Response Time: Within 24 business hours",
    },
    {
      title: "Technical Support",
      description:
        "Experiencing an issue inside your dashboard? Need help accessing files or tools?",
      email: "support@favor91.com",
      additionalInfo: 'Subject Line: "Tech Support – [Your Issue]"',
    },
    {
      title: "Partnerships + Licensing",
      description:
        "Interested in licensing VENDR OS for your program, institution, or client base?",
      email: "support@favor91.com",
      additionalInfo:
        "Please include your name, organization, and a brief overview of your goals.",
    },
  ];

  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-white">
      <Wrapper className="text-center">
        {/* Contact Cards Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 px-4 md:px-6 mb-16">
          {contactCardsData.map((card, index) => (
            <motion.div
              key={index}
              className={cn(
                "flex flex-col items-start  p-8 rounded-xl border border-gray-200 bg-white hover:border-primary shadow-custom-light",
                "hover:ring-2",
                "hover:ring-primary",
                "hover:ring-offset-2",
                "hover:ring-offset-white"
              )}
              whileHover={{
                scale: 1.02,
                boxShadow: "0 8px 20px rgba(0, 0, 0, 0.1)",
                borderColor: "#7F3DFF", // vendr-purple
                transition: { duration: 0.3, ease: "easeOut" },
              }}
              style={{
                transition:
                  "border-color 0.3s ease-out, box-shadow 0.3s ease-out, transform 0.3s ease-out",
              }}
            >
              <h2 className="text-[20px] self-start font-semibold text-black mb-6 bg-[#F4EAFD] rounded-full px-4  py-3">
                {card.title}
              </h2>
              <p className="text-[#272727] text-left text-lg mb-6">
                {card.description}
              </p>
              <div className="flex items-center justify-center gap-2 mb-4 group">
                <img
                  src="/assets/email.png"
                  alt="Email Icon"
                  className="w-[67px] h-[67px]"
                />
                <div className="flex flex-col items-start">
                  <Link
                    href={`mailto:${card.email}`}
                    className="font-semibold text-[20px]  group-hover:text-primary"
                  >
                    Email
                  </Link>
                  <p className="text-black  text-base font-normal">
                    {card.email}
                  </p>
                </div>
              </div>
              <p className="text-[#272727] text-[18px] font-bold font-poppins">
                {card.additionalInfo}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Separator Text */}
        <h2 className="text-3xl md:text-[30px] font-bold mb-12 text-black">
          Or Fill The Form To Drop Us Your Message
        </h2>

        {/* Contact Form Section */}
        <div className="flex justify-center px-4 md:px-6">
          <div className="w-full max-w-7xl p-8 rounded-xl border border-gray-200 bg-white shadow-custom-light text-left">
            <form className="space-y-6">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  className="block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-1 focus:ring-vendr-purple focus:border-vendr-purple"
                  placeholder=""
                />
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-1 focus:ring-vendr-purple focus:border-vendr-purple"
                  placeholder=""
                />
              </div>
              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  className="block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-1 focus:ring-vendr-purple focus:border-vendr-purple resize-y"
                  placeholder=""
                ></textarea>
              </div>
              <button
                type="submit"
                className="w-full flex justify-center py-3 px-6 border border-transparent rounded-lg shadow-sm text-lg font-semibold text-white bg-gray-900 hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 transition-colors duration-200"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </Wrapper>
    </section>
  );
}
