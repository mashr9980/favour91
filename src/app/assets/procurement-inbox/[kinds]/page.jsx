"use client";

import { motion } from "framer-motion";
import { Lock, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import Banner from "@/components/banner";
import Link from "next/link";
import { useParams } from "next/navigation";
import { cn } from "@/lib/utils";

const cardData = {
  "weekly-bids-vault": [
    {
      title: "6 Curated Bids/Week",
      description:
        "Each week, users receive six carefully selected, small business-friendly contract opportunities. These are hand-vetted to eliminate confusion and reduce wasted time.",
      membershipText: "Procurement Inbox Membership Required",
      accessText:
        "You must be a Procurement Inbox member to access this content.",
    },
    {
      title: "Bid Fit Score™",
      description:
        "Each bid comes with a proprietary 1-5 score to help you assess how aligned it is with your business. This streamlines your go/no-go decision process instantly.",
      membershipText: "Procurement Inbox Membership Required",
      accessText:
        "You must be a Procurement Inbox member to access this content.",
    },
    {
      title: "One-Click Folder Access",
      description:
        "Get direct access to a pre-organized folder for each bid – complete with the RFP, attachments, deadlines, and submission instructions.",
      membershipText: "Procurement Inbox Membership Required",
      accessText:
        "You must be a Procurement Inbox member to access this content.",
    },
  ],
  "quick-vetting-tools": [
    {
      title: "Quick Vetting Checklist",
      description:
        "Downloadable PDF to help you evaluate bid fit in under 10 minutes. Spot red flags, scope mismatches, and resource gaps fast.",
      membershipText: "Procurement Inbox Membership Required",
      accessText:
        "You must be a Procurement Inbox member to access this content.",
    },
    {
      title: "Bid/No-Bid Snapshot Guide",
      description:
        "A fast-reference visual that lets you make smarter pursuit decisions without reading 40-page RFPs.",
      membershipText: "Procurement Inbox Membership Required",
      accessText:
        "You must be a Procurement Inbox member to access this content.",
    },
  ],
  "capability-system": [
    {
      title: "Capability Statement Generator",
      description:
        "A flexible, formatted document with help you generate a government-ready capability statement with minimal effort.",
      membershipText: "Procurement Inbox Membership Required",
      accessText:
        "You must be a Procurement Inbox member to access this content.",
    },
    {
      title: "NAICS Fit Checklist",
      description:
        "A simple PDF to ensure your pursuing opportunities that match your registered NAICS codes.",
      membershipText: "Procurement Inbox Membership Required",
      accessText:
        "You must be a Procurement Inbox member to access this content.",
    },
    {
      title: "Past Performance Reframing Prompts",
      description:
        "Reward your private-sector or unrelated experience to match how government buyers evaluate performance.",
      membershipText: "Procurement Inbox Membership Required",
      accessText:
        "You must be a Procurement Inbox member to access this content.",
    },
    {
      title: "Brand Messaging Template",
      description:
        "Create consistent, persuasive messaging across all documents and outreach with this customizable framework.",
      membershipText: "Procurement Inbox Membership Required",
      accessText:
        "You must be a Procurement Inbox member to access this content.",
    },
  ],
  "outreach-toolkit": [
    {
      title: "Smart Follow-Up Email Scripts",
      description:
        "Over 10 proven email templates for reaching out to buyers, confirming submissions, or requesting clarification.",
      membershipText: "Procurement Inbox Membership Required",
      accessText:
        "You must be a Procurement Inbox member to access this content.",
    },
    {
      title: "Email Tracking Sheet",
      description:
        "A spreadsheet that includes follow-up schedules **and automated email reminders** – so you never forget to check in.",
      membershipText: "Procurement Inbox Membership Required",
      accessText:
        "You must be a Procurement Inbox member to access this content.",
    },
  ],
  "weekly-digest-dashboard": [
    {
      title: "Bid Summary + Scores",
      description:
        "A dashboard view of this week's six bids, including titles, due dates, and Bid Fit Scores – designed to reduce decision fatigue.",
      membershipText: "Procurement Inbox Membership Required",
      accessText:
        "You must be a Procurement Inbox member to access this content.",
    },
    {
      title: "Suggested Tools to Use",
      description:
        "Tooltips based on each bid's complexity that point you to the right checklist, script, or worksheet inside your dashboard.",
      membershipText: "Procurement Inbox Membership Required",
      accessText:
        "You must be a Procurement Inbox member to access this content.",
    },
  ],
};
export default function MembershipCards() {
  const { kinds } = useParams();
  const cards = cardData[kinds] || [];
  console.log("Cards Data:", cards, kinds);

  return (
    <>
      <Banner
        title={
          kinds
            ?.replaceAll("-", " ")
            .replace(/\b\w/g, (char) => char.toUpperCase()) || "Bids Vault"
        }
      />
      <div className="px-4 pt-4">
        <Link href="/assets/procurement-inbox" className="flex items-center text-primary mb-6">
          <ArrowLeft className="mr-1 h-4 w-4" /> Back
        </Link>
      </div>
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-4 md:p-8 justify-center items-stretch  ">
        {cards.map((card, index) => (
          <motion.div
            key={index}
            className={cn(
              "relative rounded-xl p-[2px] flex-1 max-w-sm w-full border-[1px] bg-white text-left cursor-pointer transition-all duration-300 ease-in-out",
              "border-[#E0E0E0] ring-offset-white ring-[1px] ring-[#E0E0E0]",
              "hover:border-primary hover:ring-[1px] hover:ring-primary hover:ring-offset-[1px] hover:ring-offset-white"
            )}
            transition={{ duration: 0.2 }}
          >
            <div className="bg-white  justify-between rounded-xl pt-8  p-6 flex flex-col  border border-gray-200">
              <div className="px-6">
                <h2 className="text-xl font-bold mb-2">{card.title}</h2>
                <p className="text-black text-sm ">{card.description}</p>
              </div>
              <div className="bg-white mt-6 pt-4 shadow-lg rounded-lg ">
                <div className="flex items-center mb-2 px-4">
                  <Lock className="h-4 w-4 text-primary shrink-0 mr-2" />
                  <h3 className="text-base font-semibold">
                    {card.membershipText}
                  </h3>
                </div>
                <p className="text-black text-sm px-6">{card.accessText}</p>
                <Button className=" bg-primary mt-2 mx-6 hover:bg-primary/90 text-white font-semibold py-2 px-4 rounded-md mb-4">
                  Join Now
                </Button>
                <p className="text-center py-2 text-sm text-black bg-[#F5F5F5]">
                  Already a member?{" "}
                  <Link href="/login" className="text-primary hover:underline">
                    Log in here
                  </Link>
                </p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </>
  );
}
