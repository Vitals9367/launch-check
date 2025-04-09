import { HeroSection } from "../components/sections/HeroSection";
import { SecurityRisksSection } from "../components/sections/SecurityRisksSection";
import { FeaturesSection } from "../components/sections/FeaturesSection";
import { FounderSection } from "../components/sections/FounderSection";
import { WaitlistSection } from "../components/sections/WaitlistSection";
import { FAQSection } from "../components/sections/FAQSection";

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
