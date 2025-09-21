import NavigationHeader from "@/components/NavigationHeader";
import BookStoreSection from "@/components/BookStoreSection";
import Footer from "@/components/Footer";

export default function Shop() {
  return (
    <div className="min-h-screen bg-background font-serif">
      <NavigationHeader />
      <main>
        <BookStoreSection />
      </main>
      <Footer />
    </div>
  );
}