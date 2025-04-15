import { HeroSection } from "@/components/landing/HeroSection";
import { SecurityRisksSection } from "@/components/landing/SecurityRisksSection";
import { FeaturesSection } from "@/components/landing/FeaturesSection";
import { FounderSection } from "@/components/landing/FounderSection";
import { WaitlistSection } from "@/components/landing/WaitlistSection";
import { FAQSection } from "@/components/landing/FAQSection";

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
