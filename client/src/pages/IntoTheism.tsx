import NavigationHeader from "@/components/NavigationHeader";
import ManuscriptShowcase from "@/components/ManuscriptShowcase";
import Footer from "@/components/Footer";

export default function IntoTheism() {
  return (
    <div className="min-h-screen bg-background font-serif">
      <NavigationHeader />
      <main>
        <ManuscriptShowcase />
      </main>
      <Footer />
    </div>
  );
}
