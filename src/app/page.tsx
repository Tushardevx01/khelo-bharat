import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import HeroSection from "@/components/landing/HeroSection";
import AboutSection from "@/components/landing/AboutSection";
import StatsSection from "@/components/landing/StatsSection";
import FeaturesSection from "@/components/landing/FeaturesSection";
import UserCategoriesSection from "@/components/landing/UserCategoriesSection";
import HowItWorksSection from "@/components/landing/HowItWorksSection";
import UpcomingTournamentsSection from "@/components/landing/UpcomingTournamentsSection";
import SuccessStoriesSection from "@/components/landing/SuccessStoriesSection";
import SponsorsSection from "@/components/landing/SponsorsSection";
import FAQSection from "@/components/landing/FAQSection";
import ContactSection from "@/components/landing/ContactSection";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">
      <Navbar />
      <main>
        <HeroSection />
        <AboutSection />
        <StatsSection />
        <FeaturesSection />
        <UserCategoriesSection />
        <HowItWorksSection />
        <UpcomingTournamentsSection />
        <SuccessStoriesSection />
        <SponsorsSection />
        <FAQSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}
