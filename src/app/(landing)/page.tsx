import { HeroSection } from "@/components/landing/hero-section";
import { SecurityRisksSection } from "@/components/landing/security-risks-section";
import { FeaturesSection } from "@/components/landing/feature-section";
import { FounderSection } from "@/components/landing/founder-section";
import { WaitlistSection } from "@/components/landing/waitlist-section";
import { FAQSection } from "@/components/landing/faq-section";

export default function Home() {
  return (
    <>
      <HeroSection />
      <SecurityRisksSection />
      <FeaturesSection />
      <FounderSection />
      <WaitlistSection />
      <FAQSection />
    </>
  );
}
