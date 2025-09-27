import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import PublicationCard from "./PublicationCard";
import { BookOpen, FileText, PenTool, Star } from "lucide-react";
import publicationsImage from "@assets/generated_images/Academic_publications_stack_48fd22ad.png";

type PublicationType = "all" | "journal" | "book" | "poetry" | "review" | "book_chapter";

// Dr. Hecht's actual publications organized by type
const publications = [
  // BOOKS (Poetry Collections)
  {
    id: 1,
    title: "Dodo Feathers: Poems 1989 - 2019",
    publication: "International Psychoanalytic Books",
    year: 2019,
    type: "poetry" as const,
    abstract: "A collection of poems spanning three decades, exploring themes of loss, thwarted ambition, and transformation.",
    views: 245,
    downloadUrl: "#",
    category: "Contemporary Poetry"
  },
  {
    id: 2,
    title: "Limousine, Midnight Blue: Fifty Frames form the Zapruder Film",
    publication: "Red Hen Press",
    year: 2009,
    type: "poetry" as const,
    abstract: "Fifty 14-line elegies for President John F. Kennedy, exploring themes of political idealism, tragedy, and the American dream through lyrical meditation.",
    views: 312,
    downloadUrl: "#",
    category: "Political Poetry"
  },
  // BOOKS (Scholarly)
  {
    id: 3,
    title: "Bloom's How To Write About Homer",
    publication: "Infobase",
    year: 2010,
    type: "book" as const,
    abstract: "A guide for students and scholars writing about Homer's Iliad and Odyssey, covering critical approaches, themes, and analytical frameworks, with essay prompts and writing guides.",
    views: 187,
    downloadUrl: "#",
    category: "Literary Criticism"
  },
  {
    id: 13,
    title: "Plato's Symposium: Eros and the Human Predicament",
    publication: "Twayne, Macmillan",
    year: 1999,
    type: "book" as const,
    abstract: "A clear exposition of Plato's great dialogue on love and sexuality, with each passage translated by the author and explained in the context of ancient Athenian culture and the Socratic movement.",
    views: 156,
    downloadUrl: "#",
    category: "Philosophy"
  },
  {
    id: 14,
    title: "Sophocles' Three Theban Plays",
    publication: "Wordsworth Editions", 
    year: 2004,
    type: "book" as const,
    abstract: "A blank verse translation with notes and commentary, and an introduction analyzing Antigone, Oedipus the Tyrant, and Oedipus at Colonus.",
    views: 142,
    downloadUrl: "#",
    category: "Classical Literature"
  },
  // SCHOLARLY PAPERS
  {
    id: 4,
    title: "Bion at the Crossroads: A Contrarian Reading of 'On Arrogance'",
    publication: "Journal of the American Psychoanalytic Association (JAPA)",
    year: 2022,
    type: "journal" as const,
    abstract: "Winner, New Author's Prize. In 'On Arrogance' (1958), Wilfred Bion combined a misreading of Sophocles' Oedipus with projections of his own post-traumatic anxieties.",
    views: 96,
    downloadUrl: "#",
    category: "Psychoanalytic Theory"
  },
  {
    id: 5,
    title: "Drawing a Blank: Bion Speaking on Chinese Writing",
    publication: "American Imago",
    year: 2023,
    type: "journal" as const,
    abstract: "Wilfred Bion described Chinese writing on some dozen occasions, attributing to it various counter-intuitive features as part of his effort to evoke communication challenges.",
    views: 31,
    downloadUrl: "#",
    category: "Cultural Studies"
  },
  {
    id: 6,
    title: "Technology, Labor, and the Sacred: The Cultural Context of Robert Frost",
    publication: "Critical Insights: Robert Frost (EBSCO)",
    year: 2009,
    type: "book_chapter" as const,
    abstract: "An analysis of Robert Frost's poetry within its cultural and technological context, examining themes of labor, spirituality, and modernity.",
    views: 143,
    downloadUrl: "#",
    category: "American Literature"
  },
  {
    id: 7,
    title: "Tragedy, Hamlet, and Luther",
    publication: "Forschungen zur Frühen Neuzeit, Goethe University, Frankfurt",
    year: 2002,
    type: "journal" as const,
    abstract: "Luther's Reformation expanded the burdens of interpretation in European experience. This essay examines how Hamlet's predicament combines the newfound freedoms and burdens of interpretive responsibility.",
    views: 188,
    downloadUrl: "#",
    category: "Renaissance Studies"
  },
  {
    id: 8,
    title: "Scarcity and Poetic Election in Two Sonnets of John Keats",
    publication: "English Literary History (ELH), Johns Hopkins",
    year: 1994,
    type: "journal" as const,
    abstract: "An examination of themes of scarcity and poetic vocation in Keats's 'On First Looking into Chapman's Homer' and 'When I Have Fears That I May Cease to Be.'",
    views: 167,
    downloadUrl: "#",
    category: "Romantic Literature"
  },
  {
    id: 9,
    title: "Scarcity and Compensation in Herman Melville's Moby-Dick",
    publication: "The Massachusetts Review",
    year: 1999,
    type: "journal" as const,
    abstract: "An analysis of metaphysical, epistemological, and economic themes in Melville's masterwork, examining concepts of scarcity, desire, and compensation.",
    views: 156,
    downloadUrl: "#",
    category: "American Literature"
  },
  // LITERARY PERIODICAL PUBLICATIONS
  {
    id: 10,
    title: "\"Don't Speak\" / \"Turns Out, I'm Still Asleep\"",
    publication: "Rattle",
    year: 2019,
    type: "poetry" as const,
    abstract: "Two sonnets from a painful breakup.",
    views: 89,
    downloadUrl: "#",
    category: "Poetry"
  },
  {
    id: 11,
    title: "The Sirens",
    publication: "Arion: A Journal of Humanities and the Classics",
    year: 2018,
    type: "poetry" as const,
    abstract: "A poem in the Homeric tradition of Tennyson's 'Ulysses,' focused on Odysseus' lived experience of the Sirens episode, with its themes of survival, betrayal, and the perilous desire for the sublime.",
    views: 92,
    downloadUrl: "#",
    category: "Poetry"
  },
  {
    id: 12,
    title: "Zapruder Film Frame Series",
    publication: "Black Warrior Review, Rattle, Prairie Schooner",
    year: 2009,
    type: "poetry" as const,
    abstract: "These various elegies for President John F. Kennedy later appeared in the book Limousine, Midnight Blue, available here.",
    views: 134,
    downloadUrl: "#",
    category: "Poetry"
  }
];

// Comprehensive list of Dr. Hecht's poems published in literary journals and periodicals
const periodicalPoems = [
  { poems: ["Get It Right (for Xenophanes)", "Father McKenzie's Banquet"], journal: "Marsh Hawk Review", date: "Fall 2024 / Spring 2025 Issue" },
  { poems: ["Sensible Woman Speaks", "What I Can't Do"], journal: "Politics & Letters", date: "April 2021" },
  { poems: ["Back to the Old House", "New Ghost, Old Mirror"], journal: "Marsh Hawk Review", date: "Spring 2019" },
  { poems: ["Don't Speak", "Turns Out, I'm Still Asleep"], journal: "Rattle, No. 65", date: "September 1, 2019" },
  { poems: ["The Sirens"], journal: "Arion", date: "March 2018" },
  { poems: ["Mania"], journal: "American Journal of Poetry", date: "January 2018" },
  { poems: ["Aftermath"], journal: "Rattle, No. 58", date: "Winter 2017" },
  { poems: ["Aafje Heynis", "Maria Callas", "Claudia Muzio", "Hugo Wolf"], journal: "Amalgre Review", date: "December 2017" },
  { poems: ["Landscape with Tramp"], journal: "Hiram Poetry Review", date: "Spring 2017" },
  { poems: ["The Sonnet You Deserve", "Tyrannosaurus Rex"], journal: "Marsh Hawk Review", date: "November 2009" },
  { poems: ["Zapruder Film Frame 167"], journal: "The St. Ann's Review Vol. 9. No.1", date: "Fall 2009" },
  { poems: ["Eagle Nebula"], journal: "Isotope, Fall/Winter, Vol. 7. No. 2", date: "2009" },
  { poems: ["New York Fresco"], journal: "Shofar, Vol. 27, No. 3", date: "2009" },
  { poems: ["Grossman's Tooth"], journal: "Tikkun", date: "March / April 2009" },
  { poems: ["Genesis"], journal: "Caesura", date: "Spring 2008" },
  { poems: ["First Divorce (after Lattimore's Homer)"], journal: "Rattle, No. 29", date: "June 2008" },
  { poems: ["Zapruder Film Frame 155", "Zapruder Film Frame 192"], journal: "Anthony Hecht Poetry Prize Finalist, Waywiser Press", date: "" },
  { poems: ["Exposition of the Contents of a Cab"], journal: "Tupelo Press Poetry Project", date: "" },
  { poems: ["Zapruder Film Frame 158", "Zapruder Film Frame 163"], journal: "November 3rd Club", date: "" },
  { poems: ["The Round Square"], journal: "Free Inquiry Vol 26 No. 6", date: "October / November 2006" },
  { poems: ["Fido"], journal: "Block Magazine", date: "Brooklyn, NY, Summer 2006" },
  { poems: ["Zapruder Film Frame 156", "Zapruder Film Frame 157", "Zapruder Film Frame 179"], journal: "Black Warrior Review, Vol. 32, No. 1", date: "Fall 2005" },
  { poems: ["Zapruder Film Frame 178"], journal: "River City, Vol. 24, No. 2", date: "Summer 2004" },
  { poems: ["Night"], journal: "River City, Vol. 24, No. 1", date: "Winter 2004" }
];

export default function PublishedWorksSection() {
  const [activeFilter, setActiveFilter] = useState<PublicationType>("all");

  // Separate books from papers/periodicals
  const books = publications.filter(pub => pub.type === "book" || pub.type === "poetry" || pub.type === "book_chapter");
  const papersAndPeriodicals = publications.filter(pub => pub.type === "journal");
  
  const filteredPublications = publications.filter(pub => 
    activeFilter === "all" || pub.type === activeFilter
  );

  const filterButtons = [
    { key: "all" as const, label: "Selected Works", icon: BookOpen },
    { key: "journal" as const, label: "Journal Articles", icon: FileText },
    { key: "book" as const, label: "Books", icon: BookOpen },
    { key: "poetry" as const, label: "Poetry", icon: PenTool }
  ];

  const handleFilterChange = (filter: PublicationType) => {
    setActiveFilter(filter);
    console.log(`Filtering publications by: ${filter}`);
  };

  return (
    <section className="py-20 bg-background" id="published-works">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center space-y-4 mb-16">
          <Badge variant="outline" className="mb-4">
            Published Works
          </Badge>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-foreground">
            Literary & Scholarly Publications
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Books, scholarly articles, and literary works on literature, psychoanalysis, and consciousness studies.
          </p>
        </div>

        {/* Hero Image */}
        <div className="mb-12">
          <img
            src={publicationsImage}
            alt="Academic publications and books"
            className="w-full h-64 object-cover rounded-lg shadow-lg"
            data-testid="img-publications-hero"
          />
        </div>

        {/* Filter Buttons */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {filterButtons.map(({ key, label, icon: Icon }) => (
            <Button
              key={key}
              variant={activeFilter === key ? "default" : "outline"}
              onClick={() => handleFilterChange(key)}
              className="hover-elevate active-elevate-2"
              data-testid={`filter-${key}`}
            >
              <Icon className="mr-2 h-4 w-4" />
              {label}
            </Button>
          ))}
        </div>

        {/* Publications Display - Conditional based on filter */}
        {activeFilter === "all" ? (
          <div className="space-y-16">
            {/* Books Section - Prominent Display */}
            <div>
              <div className="text-center mb-8">
                <h3 className="font-serif text-2xl font-semibold text-foreground mb-2">
                  Books
                </h3>
                <p className="text-muted-foreground">
                  Scholarly and literary books, including poetry collections
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                {books.map((publication) => (
                  <div key={publication.id} className="transform scale-105">
                    <PublicationCard
                      title={publication.title}
                      publication={publication.publication}
                      year={publication.year}
                      type={publication.type}
                      abstract={publication.abstract}
                      views={publication.views}
                      downloadUrl={publication.downloadUrl}
                      category={publication.category}
                    />
                  </div>
                ))}
              </div>
            </div>
            
            {/* Articles & Papers Section */}
            <div>
              <div className="text-center mb-8">
                <h3 className="font-serif text-xl font-semibold text-foreground mb-2">
                  Scholarly Papers and Literary Publications
                </h3>
                <p className="text-muted-foreground">
                  Scholarly papers and literary publications in journals and magazines
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {papersAndPeriodicals.map((publication) => (
                  <PublicationCard
                    key={publication.id}
                    title={publication.title}
                    publication={publication.publication}
                    year={publication.year}
                    type={publication.type}
                    abstract={publication.abstract}
                    views={publication.views}
                    downloadUrl={publication.downloadUrl}
                    category={publication.category}
                  />
                ))}
              </div>
            </div>
            
            {/* Comprehensive Poetry in Periodicals Section */}
            <div>
              <div className="text-center mb-8">
                <h3 className="font-serif text-xl font-semibold text-foreground mb-2">
                  Poems in Literary Journals & Periodicals
                </h3>
                <p className="text-muted-foreground">
                  A comprehensive list of individual poems published in literary journals, magazines, and periodicals (2004-2025)
                </p>
              </div>
              <div className="bg-card rounded-lg p-8 shadow-sm border max-w-6xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {periodicalPoems.map((entry, index) => (
                    <div key={index} className="border-b border-border pb-4 last:border-b-0">
                      <div className="space-y-2">
                        <div className="space-y-1">
                          {entry.poems.map((poem, poemIndex) => (
                            <p key={poemIndex} className="text-sm font-medium text-foreground italic">
                              "{poem}"
                            </p>
                          ))}
                        </div>
                        <p className="text-sm font-medium text-muted-foreground">
                          {entry.journal}
                        </p>
                        {entry.date && (
                          <p className="text-xs text-muted-foreground">
                            {entry.date}
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ) : (
          /* Filtered View - Traditional Grid */
          <div>
            {activeFilter === "poetry" && (
              <div className="mb-12">
                <div className="text-center mb-8">
                  <h3 className="font-serif text-xl font-semibold text-foreground mb-2">
                    Poems in Literary Journals & Periodicals
                  </h3>
                  <p className="text-muted-foreground">
                    Individual poems published in literary journals, magazines, and periodicals (2004-2025)
                  </p>
                </div>
                <div className="bg-card rounded-lg p-8 shadow-sm border max-w-6xl mx-auto">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {periodicalPoems.map((entry, index) => (
                      <div key={index} className="border-b border-border pb-4 last:border-b-0">
                        <div className="space-y-2">
                          <div className="space-y-1">
                            {entry.poems.map((poem, poemIndex) => (
                              <p key={poemIndex} className="text-sm font-medium text-foreground italic">
                                "{poem}"
                              </p>
                            ))}
                          </div>
                          <p className="text-sm font-medium text-muted-foreground">
                            {entry.journal}
                          </p>
                          {entry.date && (
                            <p className="text-xs text-muted-foreground">
                              {entry.date}
                            </p>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredPublications.map((publication) => (
                <PublicationCard
                  key={publication.id}
                  title={publication.title}
                  publication={publication.publication}
                  year={publication.year}
                  type={publication.type}
                  abstract={publication.abstract}
                  views={publication.views}
                  downloadUrl={publication.downloadUrl}
                  category={publication.category}
                />
              ))}
            </div>
          </div>
        )}

        {/* Academic Recognition */}
        <div className="text-center space-y-6 mt-16">
          <div className="inline-flex items-center space-x-2 bg-primary/10 px-6 py-3 rounded-full">
            <Star className="h-5 w-5 text-primary" />
            <span className="text-sm font-semibold text-primary">
              2022 New Authors Prize Winner
            </span>
            <span className="text-sm text-muted-foreground">
              • Journal of the American Psychoanalytic Association
            </span>
          </div>
          
          {/* Low-key link for signed copies */}
          <div className="text-sm text-muted-foreground">
            <a 
              href="/shop" 
              className="hover:text-foreground transition-colors underline decoration-dotted"
              data-testid="link-signed-copies"
            >
              Signed copies of "Limousine, Midnight Blue" available here
            </a>
          </div>
        </div>

      </div>
    </section>
  );
}