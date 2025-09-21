import NavigationHeader from "@/components/NavigationHeader";
import HeroSection from "@/components/HeroSection";
import SubstackFeed from "@/components/SubstackFeed";
import PublishedWorksSection from "@/components/PublishedWorksSection";
import ManuscriptShowcase from "@/components/ManuscriptShowcase";
import AboutSection from "@/components/AboutSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-background font-serif">
      <NavigationHeader />
      <main>
        <HeroSection />
        <PublishedWorksSection />
        <ManuscriptShowcase />
        <div className="relative">
          <AboutSection />
          <SubstackFeed />
        </div>
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}