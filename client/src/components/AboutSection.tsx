import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { GraduationCap, Award, MapPin, Calendar } from "lucide-react";

const credentials = [
  {
    degree: "PhD",
    field: "English & American Literature",
    institution: "Brandeis University",
    advisor: "Allen Grossman",
    advisorLink: "https://www.allengrossman.com/about.html",
    year: "1995"
  },
  {
    degree: "PsyD", 
    field: "Psychoanalysis",
    institution: "New Center for Psychoanalysis (Los Angeles, CA)",
    year: "2019"
  },
  {
    degree: "LMFT",
    field: "Licensed Marriage & Family Therapist",
    institution: "NY/CA/NJ/TX",
    year: "Active"
  },
  {
    degree: "Certificate",
    field: "Ancient Greek Language and Literature",
    institution: "Latin-Greek Institute, NYC",
    year: "1992, 1996"
  }
];

const achievements = [
  {
    title: "Graduate & Corresponding Member",
    organization: "New Center for Psychoanalysis",
    description: "Advanced training in psychoanalytic theory and practice, Los Angeles, California"
  },
  {
    title: "Member",
    organization: "Society for the Psychology of Religion and Spirituality",
    organizationLink: "https://div36.org/",
    description: "American Psychological Association Division 36"
  },
  {
    title: "Member",
    organization: "American Psychological Association",
    organizationLink: "https://www.apa.org/",
    description: "Professional membership in the leading psychological organization"
  },
  {
    title: "Member",
    organization: "American Psychoanalytic Association",
    organizationLink: "https://apsa.org/",
    description: "Professional membership in psychoanalytic training and practice"
  },
  {
    title: "Member",
    organization: "Neuropsychoanalysis Association",
    organizationLink: "https://npsa-association.org/",
    description: "Interdisciplinary organization bridging neuroscience and psychoanalysis"
  },
  {
    title: "Member",
    organization: "Climate Psychology Alliance",
    organizationLink: "https://www.climatepsychologyalliance.org/",
    description: "Supporting mental health professionals addressing climate psychology"
  },
  {
    title: "Member",
    organization: "Association of Jewish Psychologists",
    organizationLink: "https://associationofjewishpsychologists.com/",
    description: "Professional network for Jewish mental health professionals"
  }
];

export default function AboutSection() {
  return (
    <section className="py-20 bg-muted/10" id="about">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center space-y-4 mb-16">
          <Badge variant="outline" className="mb-4">
            About the Author
          </Badge>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-foreground">
            Academic & Literary Background
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            A career spanning literature, psychoanalysis, and creative writing, 
            with expertise in both scholarly research and clinical practice.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          
          {/* Biography */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <h3 className="font-serif text-xl font-semibold text-foreground flex items-center">
                  <MapPin className="mr-2 h-5 w-5 text-primary" />
                  Professional Background
                </h3>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground leading-relaxed">
                  Dr. Jamey Adam Hecht, LMFT, is a psychoanalyst and psychotherapist in private practice 
                  in the Park Slope neighborhood of Brooklyn, New York. He combines his scholarship in the humanities with 
                  clinical expertise in psychoanalysis, bringing a unique perspective to both 
                  academic writing and therapeutic practice.
                </p>
                
                <p className="text-muted-foreground leading-relaxed">
                  His scholarly work includes English and American literature, Classics, psychoanalytic theory, 
                  and consciousness studies. As a poet and creative writer, he has published two 
                  collections of poetry and numerous short stories and book reviews.
                </p>

                <p className="text-muted-foreground leading-relaxed">
                  Dr. Hecht maintains an active presence in both academic and literary communities, 
                  contributing regularly to scholarly journals while working on his forthcoming 
                  manuscript exploring obstacles to religious belief.
                </p>

                <p className="text-muted-foreground leading-relaxed">
                  From 2008 to 2015, Jamey Hecht was an active member of the Porters of Hellgate Shakespeare company in Los Angeles, performing roles in <em>Hamlet</em> (Polonius), <em>King Lear</em> (Kent), <em>Measure for Measure</em> (Pompey), <em>Love's Labor's Lost</em> (Holofernes), <em>Much Ado About Nothing</em> (Antonio), <em>Richard II</em> (John of Gaunt, Bishop Carlyle), <em>Henry V</em> (Archbishop of Canterbury, King of France), <em>The Comedy of Errors</em> (Egean), and his own translation of Sophocles' <em>Oedipus the Tyrant</em> (Teiresias, Shepherd). <a 
                    href="https://www.portersofhellsgate.com/dr-jamey-hecht" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-primary hover:underline"
                    data-testid="link-porters"
                  >
                    https://www.portersofhellsgate.com/dr-jamey-hecht
                  </a> Directed by Porters Founder <a 
                    href="https://www.charlespasternak.com/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-primary hover:underline"
                    data-testid="link-pasternak"
                  >
                    Charles Pasternak
                  </a>, Jamey produced and performed a successful one man show, <em>Limousine, Midnight Blue</em>, comprising 35 of that book's 50 elegies for President Kennedy. With the Kingsmen Shakespeare Company, he played George, Duke of Clarence in <em>Richard III</em>.
                </p>
              </CardContent>
            </Card>

            {/* Academic Credentials */}
            <Card>
              <CardHeader>
                <h3 className="font-serif text-xl font-semibold text-foreground flex items-center">
                  <GraduationCap className="mr-2 h-5 w-5 text-primary" />
                  Education & Credentials
                </h3>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {credentials.map((cred, index) => (
                    <div key={index} className="flex items-start space-x-3 p-3 rounded-lg bg-muted/30">
                      <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-1">
                          <Badge variant="outline" className="text-xs">
                            {cred.degree}
                          </Badge>
                          <span className="text-sm text-muted-foreground">
                            {cred.year}
                          </span>
                        </div>
                        <h4 className="font-semibold text-foreground text-sm">
                          {cred.field}
                        </h4>
                        <p className="text-sm text-muted-foreground">
                          {cred.institution}
                          {cred.advisor && (
                            <span> (Advisor: <a 
                              href={cred.advisorLink} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="text-primary hover:underline"
                              data-testid="link-advisor"
                            >
                              {cred.advisor}
                            </a>)
                            </span>
                          )}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Achievements & Recognition */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <h3 className="font-serif text-xl font-semibold text-foreground flex items-center">
                  <Award className="mr-2 h-5 w-5 text-primary" />
                  Memberships
                </h3>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {achievements.map((achievement, index) => (
                    <div key={index} className="p-4 rounded-lg border border-border/50 hover-elevate">
                      <h4 className="font-semibold text-foreground mb-1">
                        {achievement.title}
                      </h4>
                      <p className="text-sm font-medium text-primary mb-2">
                        {achievement.organizationLink ? (
                          <a 
                            href={achievement.organizationLink} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-primary hover:underline"
                            data-testid="link-organization"
                          >
                            {achievement.organization}
                          </a>
                        ) : (
                          achievement.organization
                        )}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {achievement.description}
                      </p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Professional Interests */}
            <Card>
              <CardHeader>
                <h3 className="font-serif text-xl font-semibold text-foreground flex items-center">
                  <Calendar className="mr-2 h-5 w-5 text-primary" />
                  Areas of Expertise
                </h3>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {[
                    "Contemporary Poetry",
                    "Modern Poetry", 
                    "Romantic English Poetry",
                    "Epic Poetry",
                    "Psychoanalytic Theory",
                    "Literary Criticism",
                    "Consciousness Studies",
                    "Religious Philosophy",
                    "Therapeutic Practice",
                    "Academic Writing"
                  ].map((interest, index) => (
                    <Badge key={index} variant="secondary" className="justify-center text-xs">
                      {interest}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Practice Note */}
            <Card className="bg-primary/5 border-primary/20">
              <CardContent className="pt-6">
                <p className="text-sm text-muted-foreground text-center">
                  <strong className="text-foreground">Note:</strong> For psychotherapy services, 
                  please visit the separate psychotherapy practice website at{" "}
                  <a 
                    href="https://www.drjameyhecht.com" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-primary hover:underline"
                    data-testid="link-practice-website"
                  >
                    drjameyhecht.com
                  </a>
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}