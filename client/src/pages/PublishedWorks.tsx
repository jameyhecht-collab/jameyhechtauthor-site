import NavigationHeader from "@/components/NavigationHeader";
import PublishedWorksSection from "@/components/PublishedWorksSection";
import Footer from "@/components/Footer";

export default function PublishedWorks() {
  return (
    <div className="min-h-screen bg-background font-serif">
      <NavigationHeader />
      <main>
        <PublishedWorksSection />
      </main>
      <Footer />
    </div>
  );
}
