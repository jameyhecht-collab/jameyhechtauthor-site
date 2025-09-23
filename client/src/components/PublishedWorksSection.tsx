import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import PublicationCard from "./PublicationCard";
import { BookOpen, FileText, PenTool, Star } from "lucide-react";
import publicationsImage from "@assets/generated_images/Academic_publications_stack_48fd22ad.png";

type PublicationType = "all" | "journal" | "book" | "poetry" | "review";

// Mock data based on the actual works from academia.edu
const publications = [
  {
    id: 1,
    title: "Bion at the Crossroads: A Contrarian Reading of 'on Arrogance'",
    publication: "Journal of the American Psychoanalytic Association",
    year: 2022,
    type: "journal" as const,
    abstract: "In 'On Arrogance' (1958), Wilfred Bion combined a misreading of Sophocles' Oedipus with projections of his own post-traumatic anxieties. This paper revisits the roots of Bion's project, illustrating its potential for iatrogenic injury.",
    views: 96,
    downloadUrl: "#",
    category: "Psychoanalytic Theory"
  },
  {
    id: 2,
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
    id: 3,
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
    id: 4,
    title: "Limousine, Midnight Blue",
    publication: "Red Hen Press",
    year: 2009,
    type: "poetry" as const,
    abstract: "Fifty 14-line elegies for President John F. Kennedy, exploring themes of political idealism, tragedy, and the American dream through lyrical meditation.",
    views: 312,
    downloadUrl: "#",
    category: "Political Poetry"
  },
  {
    id: 5,
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
    id: 6,
    title: "Tragedy, Hamlet, and Luther",
    publication: "Forschungen zur Frühen Neuzeit",
    year: 2002,
    type: "journal" as const,
    abstract: "Luther's Reformation expanded the burdens of interpretation in European experience. This essay examines how Hamlet's predicament combines the newfound freedoms and burdens of interpretive responsibility for the meaning of one's own existence.",
    views: 188,
    downloadUrl: "#",
    category: "Renaissance Studies"
  }
];

export default function PublishedWorksSection() {
  const [activeFilter, setActiveFilter] = useState<PublicationType>("all");

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
            A collection of scholarly articles, literary criticism, 
            poetry, and books on literature, psychoanalysis, and consciousness studies.
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

        {/* Publications Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
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

        {/* Academic Recognition */}
        <div className="text-center space-y-6">
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