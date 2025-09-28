import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import PublicationCard from "./PublicationCard";
import { BookOpen, FileText, PenTool, Star, Grid3X3 } from "lucide-react";
import publicationsImage from "@assets/BOOKS and LIT MAGS 3_1759026096692.jpg";

type PublicationType = "all" | "journal" | "book" | "poetry" | "fiction" | "review" | "book_chapter";

// Dr. Hecht's actual publications organized by type
const publications = [
  // BOOKS (Poetry Collections)
  {
    id: 1,
    title: "Dodo Feathers: Poems 1989 - 2019",
    publication: "International Psychoanalytic Books",
    year: 2019,
    type: "book" as const,
    abstract: "A collection of poems spanning three decades, exploring themes of loss, thwarted ambition, and transformation.",
    downloadUrl: "/shop",
    category: "Contemporary Poetry"
  },
  {
    id: 2,
    title: "Limousine, Midnight Blue: Fifty Frames from the Zapruder Film",
    publication: "Red Hen Press",
    year: 2009,
    type: "book" as const,
    abstract: "Fifty 14-line elegies for President John F. Kennedy, exploring themes of political idealism, tragedy, and the American dream through lyrical meditation.",
    downloadUrl: "/shop",
    category: "Political Poetry"
  },
  {
    id: 18,
    title: "The Piano Player Explains Himself: Allen Grossman's Gnosis",
    publication: "Poetry's Poet: Essays on the Poetry, Pedagogy and Poetics of Allen Grossman, ed. Daniel Morris",
    year: 2004,
    type: "book_chapter" as const,
    abstract: "An essay examining Allen Grossman's poetic philosophy and pedagogical approach, exploring his concept of gnosis and the role of the poet as piano player - interpreter of the world's music.",
    downloadUrl: "/shop",
    category: "Literary Criticism"
  },
  // BOOKS (Scholarly)
  {
    id: 3,
    title: "Bloom's How To Write About Homer",
    publication: "Infobase",
    year: 2010,
    type: "book" as const,
    abstract: "A guide for students and scholars writing about Homer's Iliad and Odyssey, covering critical approaches, themes, and analytical frameworks, with essay prompts and writing guides.",
    downloadUrl: "/shop",
    category: "Literary Criticism"
  },
  {
    id: 13,
    title: "Plato's Symposium: Eros and the Human Predicament",
    publication: "Twayne, Macmillan",
    year: 1999,
    type: "book" as const,
    abstract: "A clear exposition of Plato's great dialogue on love and sexuality, with each passage translated by the author and explained in the context of ancient Athenian culture and the Socratic movement.",

    downloadUrl: "/shop",
    category: "Philosophy"
  },
  {
    id: 14,
    title: "Sophocles' Three Theban Plays",
    publication: "Wordsworth Editions", 
    year: 2004,
    type: "book" as const,
    abstract: "A blank verse translation with notes and commentary, and an introduction analyzing Antigone, Oedipus the Tyrant, and Oedipus at Colonus.",
    downloadUrl: "/shop",
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
    downloadUrl: "#",
    category: "Psychoanalytic Theory"
  },
  {
    id: 5,
    title: "Review of Christof Koch's 2024 book on consciousness, Then I Am Myself the World",
    publication: "Journal of the American Psychoanalytic Association (JAPA), Vol. 73, Issue 4",
    year: 2024,
    type: "journal" as const,
    abstract: "A comprehensive review of Christof Koch's latest work on consciousness, Then I Am Myself the World (Basic Books, 2024), examining his neuroscientific approach to understanding self-awareness and subjective experience.",
    downloadUrl: "#",
    category: "Consciousness Studies"
  },
  {
    id: 6,
    title: "Technology, Labor, and the Sacred: The Cultural Context of Robert Frost",
    publication: "Critical Insights: Robert Frost (EBSCO)",
    year: 2009,
    type: "book_chapter" as const,
    abstract: "An analysis of Robert Frost's poetry within its cultural and technological context, examining themes of labor, spirituality, and modernity.",
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

    downloadUrl: "#",
    category: "American Literature"
  },
  {
    id: 15,
    title: "Guilt, Evil, and Hell in Macbeth, Hamlet, and Doctor Faustus",
    publication: "The Function of Evil Across Disciplinary Contexts (Lexington Books)",
    year: 2017,
    type: "book_chapter" as const,
    abstract: "Several literary villains are compared in their ambition-driven violence, the ontological status they give the supernatural, and its implications for the nature of evil. As extrinsic sequels to human conduct, postmortem reward—and—punishment supplant compassion as virtue's central motive.",

    downloadUrl: "#",
    category: "Renaissance Studies"
  },
  {
    id: 16,
    title: "Ingmar Bergman's 'Wild Strawberries': The Failure of Sublimation and the Fate of Pain",
    publication: "American Imago, Volume 73, Number 2",
    year: 2016,
    type: "journal" as const,
    abstract: "Ingmar Bergman's 1957 film 'Wild Strawberries' is a resolved study in unresolved psychic pain. What Bergman sublimates into art is tragically repressed by his protagonist. Love and its lack determine our pain; work and its success or failure determine the fate of that pain in generativity or in stagnation.",
    downloadUrl: "#",
    category: "Film Studies"
  },
  // LITERARY PERIODICAL PUBLICATIONS
  {
    id: 11,
    title: "The Sirens",
    publication: "Arion: A Journal of Humanities and the Classics",
    year: 2018,
    type: "journal" as const,
    abstract: "A poem in the Homeric tradition of Tennyson's 'Ulysses,' focused on Odysseus' lived experience of the Sirens episode, with its themes of survival, betrayal, and the perilous desire for the sublime.",
    downloadUrl: "#",
    category: "Poetry"
  },
  {
    id: 17,
    title: "Tim the Immortal Giraffe: True Story",
    publication: "American Short Fiction, Vol. 13, Issue 47",
    year: 2010,
    type: "fiction" as const,
    abstract: "A work of literary fiction exploring themes of mortality, identity, and the extraordinary within the ordinary.",
    downloadUrl: "#",
    category: "Fiction"
  },
  {
    id: 12,
    title: "Zapruder Film Frame Elegies",
    publication: "Black Warrior Review, Rattle, Anthony Hecht Poetry Prize Anthology (Finalist), The St. Ann's Review",
    year: 2009,
    type: "poetry" as const,
    abstract: "These various elegies for President John F. Kennedy later appeared in the book Limousine, Midnight Blue, available here.",

    downloadUrl: "#",
    category: "Poetry"
  },
  {
    id: 19,
    title: "Hardware",
    publication: "The Sycamore Review, Vol. 10, No. 2",
    year: 1998,
    type: "fiction" as const,
    abstract: "A work of literary fiction exploring themes of technology, human connection, and the metaphorical hardware of our emotional lives.",
    downloadUrl: "#",
    category: "Fiction"
  }
];

// Type for poem entries - can be either a string title or an object with title and URL
type PoemEntry = string | { title: string; url: string };

// Comprehensive list of Dr. Hecht's poems published in literary journals and periodicals
const periodicalPoems: { poems: PoemEntry[]; journal: string; date: string }[] = [
  { 
    poems: [
      { title: "Get It Right (for Xenophanes)", url: "https://marshhawkreview.com/Hecht-MHR-Sp25.html" }, 
      { title: "Father McKenzie's Banquet", url: "https://marshhawkreview.com/Hecht-MHR-Sp25.html" }
    ], 
    journal: "Marsh Hawk Review", 
    date: "Fall 2024 / Spring 2025 Issue" 
  },
  { 
    poems: [
      { title: "Sensible Woman Speaks", url: "http://politicsslashletters.org/the-literary-section/hook-up-poems/sensible-woman-speaks/" }, 
      { title: "What I Can't Do", url: "http://politicsslashletters.org/the-literary-section/breakup-poems/what-i-cant-do/" }
    ], 
    journal: "Politics & Letters", 
    date: "February 2021" 
  },
  { 
    poems: [
      { title: "Back to the Old House", url: "https://marshhawkpress.org/wp-content/uploads/2019/04/Marsh-Hawk-Press-Review-Spring-2019.pdf" }, 
      { title: "New Ghost, Old Mirror", url: "https://marshhawkpress.org/wp-content/uploads/2019/04/Marsh-Hawk-Press-Review-Spring-2019.pdf" }
    ], 
    journal: "Marsh Hawk Review", 
    date: "Spring 2019" 
  },
  { 
    poems: [
      { title: "Don't Speak", url: "https://rattle.com/dont-speak-by-jamey-hecht/" }, 
      { title: "Turns Out, I'm Still Asleep", url: "https://rattle.com/turns-out-im-still-asleep-by-jamey-hecht/" }
    ], 
    journal: "Rattle, No. 65", 
    date: "September 1, 2019" 
  },
  { 
    poems: [
      { title: "The Sirens", url: "https://www.academia.edu/37682486/The_Sirens" }
    ], 
    journal: "Arion", 
    date: "March 2018" 
  },
  { 
    poems: ["Mania"], 
    journal: "American Journal of Poetry", 
    date: "January 2018" 
  },
  { 
    poems: [
      { title: "Aftermath", url: "https://rattle.com/aftermath-by-jamey-hecht/" }
    ], 
    journal: "Rattle, No. 58", 
    date: "Winter 2017" 
  },
  { 
    poems: ["Aafje Heynis", "Maria Callas", "Claudia Muzio", "Hugo Wolf"], 
    journal: "Amalgre Review", 
    date: "December 2017" 
  },
  { 
    poems: [
      { title: "Landscape with Tramp", url: "https://hirampoetryreview.wordpress.com/wp-content/uploads/2017/06/hpr2017.pdf" }
    ], 
    journal: "Hiram Poetry Review", 
    date: "Spring 2017" 
  },
  { 
    poems: ["The Sonnet You Deserve", "Tyrannosaurus Rex"], 
    journal: "Marsh Hawk Review", 
    date: "November 2009" 
  },
  { 
    poems: ["Zapruder Film Frame 167"], 
    journal: "The St. Ann's Review Vol. 9. No.1", 
    date: "Fall 2009" 
  },
  { 
    poems: ["Eagle Nebula"], 
    journal: "Isotope, Fall/Winter, Vol. 7. No. 2", 
    date: "2009" 
  },
  { 
    poems: ["New York Fresco"], 
    journal: "Shofar, Vol. 27, No. 3", 
    date: "2009" 
  },
  { 
    poems: [
      { title: "Grossman's Tooth", url: "https://www.academia.edu/32548109/Grossman_s_Tooth" }
    ], 
    journal: "Tikkun", 
    date: "March / April 2009" 
  },
  { 
    poems: ["Genesis"], 
    journal: "Caesura", 
    date: "Spring 2008" 
  },
  { 
    poems: [
      { title: "First Divorce (after Lattimore's Homer)", url: "https://rattle.com/first-divorce-by-jamey-hecht/" }
    ], 
    journal: "Rattle, No. 29", 
    date: "June 2008" 
  },
  { 
    poems: ["Zapruder Film Frame 155", "Zapruder Film Frame 192"], 
    journal: "Anthony Hecht Poetry Prize Finalist, Waywiser Press", 
    date: "" 
  },
  { 
    poems: ["Exposition of the Contents of a Cab"], 
    journal: "Tupelo Press Poetry Project", 
    date: "" 
  },
  { 
    poems: ["Zapruder Film Frame 158", "Zapruder Film Frame 163"], 
    journal: "November 3rd Club", 
    date: "" 
  },
  { 
    poems: ["The Round Square"], 
    journal: "Free Inquiry Vol 26 No. 6", 
    date: "October / November 2006" 
  },
  { 
    poems: ["Fido"], 
    journal: "Block Magazine", 
    date: "Brooklyn, NY, Summer 2006" 
  },
  { 
    poems: ["Zapruder Film Frame 156", "Zapruder Film Frame 157", "Zapruder Film Frame 179"], 
    journal: "Black Warrior Review, Vol. 32, No. 1", 
    date: "Fall 2005" 
  },
  { 
    poems: ["Zapruder Film Frame 178"], 
    journal: "River City, Vol. 24, No. 2", 
    date: "Summer 2004" 
  },
  { 
    poems: ["Night"], 
    journal: "River City, Vol. 24, No. 1", 
    date: "Winter 2004" 
  }
];

export default function PublishedWorksSection() {
  const [activeFilter, setActiveFilter] = useState<PublicationType>("all");

  // Separate books from papers/periodicals
  const books = publications.filter(pub => pub.type === "book" || pub.type === "book_chapter");
  const papersAndPeriodicals = publications.filter(pub => pub.type === "journal" || pub.type === "fiction" || pub.type === "poetry");
  
  const filteredPublications = publications.filter(pub => 
    activeFilter === "all" || pub.type === activeFilter
  );

  const filterButtons = [
    { key: "all" as const, label: "All", icon: Grid3X3 },
    { key: "journal" as const, label: "Journal Articles", icon: FileText },
    { key: "book" as const, label: "Books", icon: BookOpen },
    { key: "poetry" as const, label: "Poetry", icon: PenTool },
    { key: "fiction" as const, label: "Fiction", icon: BookOpen }
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
            Selected Literary & Scholarly Publications
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
            className="w-full h-64 object-contain bg-black rounded-lg shadow-lg"
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
                <p className="text-base text-muted-foreground">
                  A selection of individual poems published in literary journals, magazines, and periodicals (2004-2025)
                </p>
              </div>
              <div className="bg-card rounded-lg p-8 shadow-sm border max-w-6xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {periodicalPoems.map((entry, index) => (
                    <div key={index} className="border-b border-border pb-4 last:border-b-0">
                      <div className="space-y-2">
                        <div className="space-y-1">
                          {entry.poems.map((poem, poemIndex) => {
                            const isLinked = typeof poem === 'object' && poem.url;
                            const title = isLinked ? poem.title : poem as string;
                            
                            return (
                              <p key={poemIndex} className="text-base font-medium text-foreground italic">
                                {isLinked ? (
                                  <a 
                                    href={poem.url} 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    className="hover:text-primary transition-colors underline decoration-dotted"
                                    data-testid={`link-poem-${poemIndex}`}
                                  >
                                    "{title}"
                                  </a>
                                ) : (
                                  `"${title}"`
                                )}
                              </p>
                            );
                          })}
                        </div>
                        <p className="text-base font-medium text-muted-foreground">
                          {entry.journal}
                        </p>
                        {entry.date && (
                          <p className="text-sm text-muted-foreground">
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
                  <p className="text-base text-muted-foreground">
                    Individual poems published in literary journals, magazines, and periodicals (2004-2025)
                  </p>
                </div>
                <div className="bg-card rounded-lg p-8 shadow-sm border max-w-6xl mx-auto">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {periodicalPoems.map((entry, index) => (
                      <div key={index} className="border-b border-border pb-4 last:border-b-0">
                        <div className="space-y-2">
                          <div className="space-y-1">
                            {entry.poems.map((poem, poemIndex) => {
                              const isLinked = typeof poem === 'object' && poem.url;
                              const title = isLinked ? poem.title : poem as string;
                              
                              return (
                                <p key={poemIndex} className="text-base font-medium text-foreground italic">
                                  {isLinked ? (
                                    <a 
                                      href={poem.url} 
                                      target="_blank" 
                                      rel="noopener noreferrer"
                                      className="hover:text-primary transition-colors underline decoration-dotted"
                                      data-testid={`link-poem-filtered-${poemIndex}`}
                                    >
                                      "{title}"
                                    </a>
                                  ) : (
                                    `"${title}"`
                                  )}
                                </p>
                              );
                            })}
                          </div>
                          <p className="text-base font-medium text-muted-foreground">
                            {entry.journal}
                          </p>
                          {entry.date && (
                            <p className="text-sm text-muted-foreground">
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
                  downloadUrl={publication.downloadUrl}
                  category={publication.category}
                />
              ))}
            </div>
          </div>
        )}

        {/* Academic Recognition */}
        <div className="text-center space-y-8 mt-16">
          <div className="inline-flex items-center space-x-2 bg-primary/10 px-6 py-3 rounded-full">
            <Star className="h-5 w-5 text-primary" />
            <span className="text-sm font-semibold text-primary">
              2022 New Authors Prize Winner
            </span>
            <span className="text-sm text-muted-foreground">
              • Journal of the American Psychoanalytic Association
            </span>
          </div>

          {/* Critical Praise for Limousine, Midnight Blue */}
          <div className="space-y-6 max-w-4xl mx-auto">
            <h3 className="font-serif text-xl font-semibold text-foreground mb-4">
              Critical Praise for <em>Limousine, Midnight Blue</em>
            </h3>
            
            {/* Billy Collins Blurb */}
            <div className="bg-primary/5 rounded-lg p-6 border-l-4 border-primary">
              <blockquote className="text-base italic text-foreground leading-relaxed mb-4">
                "Ovid himself might have taken notice of this volume. It's one thing to turn a woman into a tree, another more advanced thing to transform fifty frames of the Zapruder film into as many sonnets. Limousine, Midnight Blue is a radical display of poetry's ability to freeze time, to catch fugitive - and here, disputed - moments in the amber of form."
              </blockquote>
              <cite className="text-base font-semibold text-primary">
                —Billy Collins, former Poet Laureate of the United States
              </cite>
            </div>

            {/* Reviews */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-card rounded-lg p-4 border">
                <h4 className="font-semibold text-foreground mb-2">Review</h4>
                <p className="text-base text-muted-foreground mb-2">
                  <a 
                    href="https://rattle.com/limousine-midnight-blue-by-jamey-hecht/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-primary transition-colors underline decoration-dotted"
                    data-testid="link-rattle-review"
                  >
                    Rattle
                  </a>
                </p>
                <p className="text-sm text-muted-foreground">
                  by Joanne Baines • August 30, 2009
                </p>
              </div>
              
              <div className="bg-card rounded-lg p-4 border">
                <h4 className="font-semibold text-foreground mb-2">Review</h4>
                <p className="text-base text-muted-foreground mb-2">
                  <a 
                    href="https://thenextbestbookblog.blogspot.com/2016/12/lindsey-reviews-limousine-midnight-blue.html"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-primary transition-colors underline decoration-dotted"
                    data-testid="link-dog-eared-review"
                  >
                    Dog Eared Review
                  </a>
                </p>
                <p className="text-sm text-muted-foreground">
                  by Lindsey Lewis Smithson • December 22, 2016
                </p>
              </div>
            </div>
          </div>
          
          {/* Low-key link for signed copies */}
          <div className="text-base text-muted-foreground">
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