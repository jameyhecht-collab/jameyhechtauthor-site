import NavigationHeader from "@/components/NavigationHeader";
import Footer from "@/components/Footer";
export default function Podcast() {
  return (
    <div className="min-h-screen bg-background font-serif">
      <NavigationHeader />
      <main>
        <section className="py-12 bg-muted/20">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <img
              <div className="flex flex-wrap justify-center gap-6 mt-6 text-lg">
  <a
    href="https://www.tiktok.com/@jameyhecht"
    target="_blank"
    rel="noopener noreferrer"
    className="underline hover:no-underline"
  >
    TikTok
  </a>

  <a
    href="https://www.instagram.com/jameyhecht/"
    target="_blank"
    rel="noopener noreferrer"
    className="underline hover:no-underline"
  >
    Instagram
  </a>

  <a
    href="https://x.com/jameyhechtMFT"
    target="_blank"
    rel="noopener noreferrer"
    className="underline hover:no-underline"
  >
    X
  </a>

  <a
    href="https://jameyhecht.substack.com/"
    target="_blank"
    rel="noopener noreferrer"
    className="underline hover:no-underline"
  >
    Substack
  </a>
</div>
              src="/Jamey-Hecht-Podcast-Guest-One-Sheet.jpg"
              alt="Jamey Hecht podcast guest one-sheet"
              className="w-full h-auto"
            />
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
