import NavigationHeader from "@/components/NavigationHeader";
import HeroSection from "@/components/HeroSection";
import PublishedWorksSection from "@/components/PublishedWorksSection";
import ManuscriptShowcase from "@/components/ManuscriptShowcase";
import BookStoreSection from "@/components/BookStoreSection";
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
        <BookStoreSection />
        <AboutSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}