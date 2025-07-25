import { HeroSection } from "@/components/hero";
import VendrOSSection from "@/components/home/vendor-os";
import FeaturesOverviewSection from "@/components/home/features-overview";
import StepsToGetStartedSection from "@/components/home/steps-to-get-started";
import ClientTestimonialsSection from "@/components/home/client-testimonial";
import { CtaSection } from "@/components/cta-section";
import RedirectIfSubscribed from "@/components/redirect-if-subscribed";
import { Suspense } from "react";

export default function Home() {
  return (
    <div className="min-h-screen">
      <Suspense fallback={null}>
        <RedirectIfSubscribed />
      </Suspense>
      <HeroSection />
      <VendrOSSection />
      <FeaturesOverviewSection />
      <StepsToGetStartedSection />
      <ClientTestimonialsSection />
      <CtaSection />
    </div>
  );
}