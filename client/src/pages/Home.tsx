import NavigationHeader from "@/components/NavigationHeader";
import HeroSection from "@/components/HeroSection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-background font-serif">
      <NavigationHeader />
      <main>
        <HeroSection />
      </main>
      <Footer />
    </div>
  );
}