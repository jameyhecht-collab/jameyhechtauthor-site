import NavigationHeader from "@/components/NavigationHeader";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

export default function Contact() {
  return (
    <div className="min-h-screen bg-background font-serif">
      <NavigationHeader />
      <main>
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}
