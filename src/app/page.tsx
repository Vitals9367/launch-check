import { Footer } from "./components/Footer";
import { Header } from "./components/Header";
import { HeroSection } from "./components/sections/HeroSection";
import { SecurityRisksSection } from "./components/sections/SecurityRisksSection";
import { FeaturesSection } from "./components/sections/FeaturesSection";
import { HowItWorksSection } from "./components/sections/HowItWorksSection";
import { FounderSection } from "./components/sections/FounderSection";
import { WaitlistSection } from "./components/sections/WaitlistSection";
import { FAQSection } from "./components/sections/FAQSection";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-white">
      <Header />
      <main className="flex-1">
        <HeroSection />
        <SecurityRisksSection />
        <FeaturesSection />
        <FounderSection />
        <WaitlistSection />
        <FAQSection />
      </main>
      <Footer />
    </div>
  );
}
