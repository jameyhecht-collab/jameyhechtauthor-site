import NavigationHeader from "@/components/NavigationHeader";
import Footer from "@/components/Footer";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

const videos = [
  {
    id: "edurEuqwFr8",
    title: "Couple's Therapy: Why Fights Escalate",
    description: "Psychotherapy Vlog",
    date: "May 21, 2025"
  },
  {
    id: "XXR12Zf8HrE",
    title: "From Poetry to Private Practice",
    description: "Interview with Miranda Palmer on Zynnyme Podcast",
    date: "June 23, 2025",
    startTime: 121
  },
  {
    id: "_Mchq71kPs8",
    title: "Odysseus and the Sirens",
    description: "International Psychoanalytic Books recital",
    date: "February 20, 2022",
    startTime: 143
  },
  {
    id: "LU6WAce9jP4",
    title: "Interview with author and climate scientist Guy McPherson",
    description: "Nature Bats Last Radio Show",
    date: "May 4, 2021",
    startTime: 1845
  },
  {
    id: "g_xzn-Du4Bs",
    title: "Rattlecast #11 Poetry as an Intoxicant, and \"The Meaning of Life\"",
    description: "Interview with editor Tim Green",
    date: "October 1, 2019"
  },
  {
    id: "IR0wY3r4m-8",
    title: "Der Tod und das Mädchen (Death and the Maiden) by Franz Schubert",
    description: "Vocal Recital",
    date: "June 21, 2018"
  },
  {
    id: "eXP8fIv8SeU",
    title: "Tragedy, Hamlet, and Luther",
    description: "Public Lecture at the New Center for Psychoanalysis",
    date: "October 8, 2016",
    startTime: 67
  },
  {
    id: "8OIpkJhRorE",
    title: "Interview with Monica Lee Copeland at Indelible Ink",
    description: "",
    date: "November 30, 2010"
  },
  {
    id: "yeWDGYEuKqA",
    title: "Oedipus and Teiresias Quarrel",
    description: "Hecht as Teiresias to Charles Pasternak's Oedipus - Porters of Hellgate production at the Sherry Theater, Los Angeles",
    date: "October 2011"
  },
  {
    id: "0B17vJ8RltA",
    title: "Oedipus Blinded",
    description: "Recital from Hecht's translation of Oedipus the Tyrant - Pondwater Society, Los Angeles",
    date: "July 10, 2010",
    startTime: 77
  },
  {
    id: "6Ri1lMgo3fk",
    title: "The Murder of Laius",
    description: "Recital from Hecht's translation of Oedipus the Tyrant - Pondwater Society, Los Angeles",
    date: "July 10, 2010",
    startTime: 29
  },
  {
    id: "Xta7p9FWpRM",
    title: "The Jewish Play",
    description: "A comic poem on David Mamet's \"Glengarry, Glenn Ross\" - Recital at the Annenberg Beach House in Los Angeles",
    date: "July 21, 2009"
  },
  {
    id: "vDxuNtVhQEI",
    title: "Sophocles as Educator",
    description: "Public Lecture at NYPL for the Manhattan Hellenic Festival of 2004",
    date: "2004"
  }
];

export default function Media() {
  return (
    <div className="min-h-screen bg-background font-serif">
      <NavigationHeader />
      <main>
        <section className="py-20 bg-background">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            
            {/* Section Header */}
            <div className="text-center space-y-4 mb-16">
              <Badge variant="outline" className="mb-4">
                Media
              </Badge>
              <h1 className="font-serif text-3xl sm:text-4xl font-bold text-foreground">
                Lectures, Interviews & Performances
              </h1>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                A collection of video recordings featuring lectures, interviews, poetry recitals, and theatrical performances.
              </p>
            </div>

            {/* Video Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {videos.map((video, index) => (
                <Card key={index} className="overflow-hidden" data-testid={`card-video-${index}`}>
                  <CardContent className="p-0">
                    {/* Video Embed */}
                    <div className="aspect-video bg-black">
                      <iframe
                        width="100%"
                        height="100%"
                        src={`https://www.youtube.com/embed/${video.id}${video.startTime ? `?start=${video.startTime}` : ''}`}
                        title={video.title}
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        className="w-full h-full"
                        data-testid={`iframe-video-${index}`}
                      ></iframe>
                    </div>
                    
                    {/* Video Info */}
                    <div className="p-6 space-y-2">
                      <h3 className="font-serif text-lg font-semibold text-foreground" data-testid={`title-video-${index}`}>
                        {video.title}
                      </h3>
                      {video.description && (
                        <p className="text-sm text-muted-foreground" data-testid={`desc-video-${index}`}>
                          {video.description}
                        </p>
                      )}
                      <p className="text-xs text-muted-foreground" data-testid={`date-video-${index}`}>
                        {video.date}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
