import { CtaSection } from "@/components/cta-section";
import { HeroSection } from "@/components/hero";
import ClientTestimonialsSection from "@/components/home/client-testimonial";
import FeaturesOverviewSection from "@/components/home/features-overview";
import StepsToGetStartedSection from "@/components/home/steps-to-get-started";
import VendrOSSection from "@/components/home/vendor-os";

export default function Home() {
  return (
    <>
      {" "}
      <HeroSection />
      <VendrOSSection />
      <FeaturesOverviewSection />
      <StepsToGetStartedSection />
      <ClientTestimonialsSection />
      <CtaSection />
    </>
  );
}
