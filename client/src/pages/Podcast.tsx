export default function Podcast() {
  return (
    <div className="min-h-screen bg-background font-serif">
      <NavigationHeader />
      <main>
        <section className="py-12 bg-muted/20">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <img
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
