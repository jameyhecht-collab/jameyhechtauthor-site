import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import PublicationCard from "./PublicationCard";
import { BookOpen, FileText, PenTool, Star } from "lucide-react";
import publicationsImage from "@assets/generated_images/Academic_publications_stack_48fd22ad.png";

type PublicationType = "all" | "journal" | "book" | "poetry" | "review";

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
    title: "Limousine, Midnight Blue",
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
    abstract: "A guide for students and scholars writing about Homer's Iliad and Odyssey, covering critical approaches, themes, and analytical frameworks.",
    views: 187,
    downloadUrl: "#",
    category: "Literary Criticism"
  },
  {
    id: 13,
    title: "Bloom's How To Write About Plato",
    publication: "Infobase",
    year: 2011,
    type: "book" as const,
    abstract: "A comprehensive guide for students and scholars analyzing Plato's dialogues, covering philosophical approaches, major themes, and critical frameworks.",
    views: 156,
    downloadUrl: "#",
    category: "Philosophy"
  },
  {
    id: 14,
    title: "Bloom's How To Write About Sophocles",
    publication: "Infobase", 
    year: 2012,
    type: "book" as const,
    abstract: "An analytical guide to Sophocles' tragedies, examining dramatic structure, character development, and thematic interpretation in classical Greek drama.",
    views: 142,
    downloadUrl: "#",
    category: "Classical Literature"
  },
  // SCHOLARLY PAPERS
  {
    id: 4,
    title: "Bion at the Crossroads: A Contrarian Reading of 'On Arrogance'",
    publication: "Journal of the American Psychoanalytic Association",
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
    type: "journal" as const,
    abstract: "An analysis of Robert Frost's poetry within its cultural and technological context, examining themes of labor, spirituality, and modernity.",
    views: 143,
    downloadUrl: "#",
    category: "American Literature"
  },
  {
    id: 7,
    title: "Tragedy, Hamlet, and Luther",
    publication: "Forschungen zur Frühen Neuzeit",
    year: 2002,
    type: "journal" as const,
    abstract: "Luther's Reformation expanded the burdens of interpretation in European experience. This essay examines how Hamlet's predicament combines the newfound freedoms and burdens of interpretive responsibility.",
    views: 188,
    downloadUrl: "#",
    category: "Renaissance Studies"
  },
  {
    id: 8,
    title: "Scarcity and Poetic Vocation in Two Sonnets of John Keats",
    publication: "English Literary History (ELH), Johns Hopkins",
    year: 1994,
    type: "journal" as const,
    abstract: "An examination of themes of scarcity and poetic calling in Keats's sonnet work, exploring the relationship between limitation and artistic creation.",
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
    abstract: "An analysis of economic and psychological themes in Melville's masterwork, examining concepts of scarcity, desire, and compensation.",
    views: 156,
    downloadUrl: "#",
    category: "American Literature"
  },
  // LITERARY PERIODICAL PUBLICATIONS
  {
    id: 10,
    title: "Don't Speak / Turns Out, I'm Still Asleep",
    publication: "Rattle",
    year: 2019,
    type: "journal" as const,
    abstract: "Two poems exploring themes of communication, consciousness, and the liminal space between waking and sleeping.",
    views: 89,
    downloadUrl: "#",
    category: "Poetry"
  },
  {
    id: 11,
    title: "The Sirens",
    publication: "Arion",
    year: 2018,
    type: "journal" as const,
    abstract: "A poem drawing on classical mythology to explore themes of temptation, knowledge, and the dangers of seeking forbidden wisdom.",
    views: 92,
    downloadUrl: "#",
    category: "Poetry"
  },
  {
    id: 12,
    title: "Zapruder Film Frame Series",
    publication: "Various Journals",
    year: 2009,
    type: "journal" as const,
    abstract: "A series of poems based on frames from the Zapruder film, examining moments of historical trauma and their aftermath. Published in multiple journals including Black Warrior Review.",
    views: 134,
    downloadUrl: "#",
    category: "Poetry"
  }
];

export default function PublishedWorksSection() {
  const [activeFilter, setActiveFilter] = useState<PublicationType>("all");

  // Separate books from papers/periodicals
  const books = publications.filter(pub => pub.type === "book" || pub.type === "poetry");
  const papersAndPeriodicals = publications.filter(pub => pub.type === "journal");
  
  const filteredPublications = publications.filter(pub => 
    activeFilter === "all" || pub.type === activeFilter
  );

  const filterButtons = [
    { key: "all" as const, label: "Selected Works", icon: BookOpen },
    { key: "journal" as const, label: "Articles", icon: FileText },
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
                  Papers & Periodicals
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
          </div>
        ) : (
          /* Filtered View - Traditional Grid */
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