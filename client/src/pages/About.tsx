import NavigationHeader from "@/components/NavigationHeader";
import AboutSection from "@/components/AboutSection";
import SubstackFeed from "@/components/SubstackFeed";
import Footer from "@/components/Footer";

export default function About() {
  return (
    <div className="min-h-screen bg-background font-serif">
      <NavigationHeader />
      <main>
        <AboutSection />
        <SubstackFeed />
      </main>
      <Footer />
    </div>
  );
}
