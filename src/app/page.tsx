import { Footer } from "./components/Footer";
import { Header } from "./components/Header";
import { HeroSection } from "./components/sections/HeroSection";
import { HowItWorksSection } from "./components/sections/HowItWorksSection";
import { FeaturesSection } from "./components/sections/FeaturesSection";
import { FounderSection } from "./components/sections/FounderSection";
import { WaitlistSection } from "./components/sections/WaitlistSection";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-white">
      <Header />
      <main className="flex-1">
        <HeroSection />
        <FeaturesSection />
        <HowItWorksSection />
        <FounderSection />
        <WaitlistSection />
      </main>
      <Footer />
    </div>
  );
}
