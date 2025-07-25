"use client";

import { motion } from "framer-motion";

const waveBottomSvg = `data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMTUiIHZpZXdCb3g9IjAgMCAyMCAxNSIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTAgMTUgTDAgMCBMNSAwIFEyMCAwIDIwIDE1IEwyMCAxNSBaIiBmaWxsPSJibGFjayIvPgo8L3N2Zz4=`;

export default function Page() {
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
    visible: { opacity: 1, y: 0 },
  };

  return (
    <>
      <motion.section
        className="relative w-full py-20  text-center text-white overflow-hidden
                 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(/assets/grid.jpg)` }}
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        {/* Dark overlay for readability */}
        <div className="absolute inset-0 bg-black opacity-70 z-10"></div>

        {/* Bottom wavy border */}
        <div
          className="absolute bottom-0 left-0 w-full h-[15px] z-20" // Height of the wave area
          style={{
            maskImage: `url(${waveBottomSvg})`,
            maskRepeat: "repeat-x",
            maskSize: "20px 15px", // Width and height of one wave segment
            backgroundColor: "white", // This color will be visible as the wave
          }}
        ></div>

        <div className="relative z-30 max-w-4xl mx-auto px-4">
          <motion.h3
            className="text-[20px] text-center mx-auto my-2  font-semibold text-black w-[261px] flex items-center justify-center h-[52px] bg-[#E2C9FA]  rounded-full "
            variants={itemVariants}
          >
            VENDR OS by FAVOR91
          </motion.h3>
          <motion.h2
            className="text-3xl md:text-[40px] text-center font-bold leading-tight mb-6 font-plus-jakarta-sans"
            variants={itemVariants}
          >
            Terms And Conditions
          </motion.h2>
        </div>
      </motion.section>
      <div className="flex justify-center py-12 px-4 sm:px-6 lg:px-8 bg-background">
        <motion.main
          className="w-full max-w-3xl space-y-6 text-foreground"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex justify-between text-sm text-muted-foreground mb-8">
            <p className="text-foreground !font-bold ">
              Effective Date{" "}
              <span className="font-poppins font-normal"> | 6/12/2025</span>
            </p>
            <p className="text-foreground !font-bold ">
              Last Updated{" "}
              <span className="font-poppins font-normal"> | 6/12/2025</span>
            </p>
          </div>

          <section className="space-y-4">
            <h2 className="text-lg font-bold">Intro</h2>
            <p>
              Welcome to VENDR OS, a digital product suite and SaaS system
              provided by FAVOR91, LLC ("Company", "we", "our", or "us"). Please
              read these Terms and Conditions carefully before using the VENDR
              OS website, purchasing a subscription, or accessing any of our
              content, tools, or services. By accessing or using VENDR OS, you
              agree to be bound by these Terms and our Privacy Policy. If you do
              not agree with these Terms, you must not use our services
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-lg font-bold">Eligibility</h2>
            <p>
              You must be at least 18 years of age and legally capable of
              entering into binding contracts to use this site or purchase a
              VENDR OS subscription. By using our services, you represent that
              you meet these requirements
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-lg font-bold">Product Overview</h2>
            <p>VENDR OS is a proprietary digital platform that provides:</p>
            <ul className="list-disc list-inside space-y-1 pl-4">
              <li>Curated government bid opportunities</li>
              <li>Proposal templates and sample documents</li>
              <li>Compliance and tracking tools</li>
              <li>Strategy resources and AI-powered writing prompts</li>
            </ul>
            <p>
              Certain features are only available to users based on their
              subscription tier.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-lg font-bold">Subscriptions and Billing</h2>
            <p>
              VENDR OS is offered on a subscription basis, billed either monthly
              or annually depending on the plan selected. By purchasing a
              subscription, you authorize FAVOR91 to charge your payment method
              on a recurring basis until canceled.
            </p>
            <p>
              <span className="font-bold">Auto-Renewal:</span> All plans
              automatically renew at the end of each billing cycle unless you
              cancel before the renewal date.
            </p>
            <p>
              <span className="font-bold">Cancellation:</span> You may cancel
              your subscription at any time by logging into your account or
              contacting support at support@favor91.com. Your cancellation will
              take effect at the end of the current billing cycle.
            </p>
            <p>
              <span className="font-bold">No Refund Policy</span>
            </p>
            <p>
              Due to the digital nature of our product and immediate access to
              downloadable tools and resources upon purchase, all sales are
              final. We do not offer refunds, prorated credits, or trial
              periods.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-lg font-bold">Intellectual Property</h2>
            <p>
              All content, including but not limited to templates, documents,
              proposal samples, AI prompts, branding, and platform structure, is
              the intellectual property of FAVOR91, LLC. You may not reproduce,
              resell, sublicense, or redistribute any VENDR OS content without
              express written permission. Your subscription grants you a
              limited, non-transferable license to use the materials for your
              own business purposes only.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-lg font-bold">Account Access and Security</h2>
            <p>
              You are responsible for maintaining the confidentiality of your
              account credentials. You agree not to share your login with
              unauthorized users or allow others to access your account.
              Accounts found in violation may be suspended or terminated without
              notice.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-lg font-bold">Service Modifications</h2>
            <p>
              We reserve the right to modify or discontinue any portion of VENDR
              OS at any time without liability. We may also update features,
              pricing, or subscription tiers. Continued use of the platform
              constitutes acceptance of any changes.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-lg font-bold">Limitation of Liability</h2>
            <p>
              FAVOR91 is not liable for any business losses, missed contract
              opportunities, or damages arising from your use of VENDR OS. We do
              not guarantee that you will win contracts or achieve specific
              results by using our tools.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-lg font-bold">Governing Law</h2>
            <p>
              These Terms are governed by the laws of the State of North
              Carolina, without regard to its conflict of law principles. Any
              legal disputes shall be resolved in Mecklenburg County, NC.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-lg font-bold">Contact Us</h2>
            <p>FAVOR91 LLC</p>
            <p>Email: support@favor91.com</p>
            <p>Charlotte, NC, USA</p>
          </section>
        </motion.main>
      </div>
    </>
  );
}
