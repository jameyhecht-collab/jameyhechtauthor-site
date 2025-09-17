import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { GraduationCap, Award, MapPin, Calendar } from "lucide-react";

const credentials = [
  {
    degree: "PhD",
    field: "English & American Literature",
    institution: "University",
    year: "1999"
  },
  {
    degree: "PsyD", 
    field: "Psychoanalysis",
    institution: "New Center for Psychoanalysis",
    year: "Los Angeles, CA"
  },
  {
    degree: "LMFT",
    field: "Licensed Marriage & Family Therapist",
    institution: "NY/CA/NJ/TX",
    year: "Active"
  }
];

const achievements = [
  {
    title: "2022 New Authors Prize",
    organization: "Journal of the American Psychoanalytic Association",
    description: "Awarded for outstanding scholarly contribution to psychoanalytic literature"
  },
  {
    title: "Corresponding Member",
    organization: "New Center for Psychoanalysis",
    description: "Los Angeles, California"
  },
  {
    title: "Graduate & Alumni",
    organization: "New Center for Psychoanalysis",
    description: "Advanced training in psychoanalytic theory and practice"
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
            with expertise in both scholarly research and therapeutic practice.
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
                  Dr. Jamey Adam Hecht is a psychoanalyst and psychotherapist in private practice 
                  in Park Slope, Brooklyn, NY. He combines his deep literary scholarship with 
                  clinical expertise in psychoanalysis, bringing a unique perspective to both 
                  academic writing and therapeutic work.
                </p>
                
                <p className="text-muted-foreground leading-relaxed">
                  His scholarly work spans English and American literature, psychoanalytic theory, 
                  and cultural studies. As a poet and creative writer, he has published two 
                  collections of poetry and numerous literary works that bridge the gap between 
                  academic rigor and artistic expression.
                </p>

                <p className="text-muted-foreground leading-relaxed">
                  Dr. Hecht maintains an active presence in both academic and literary communities, 
                  contributing regularly to scholarly journals while working on his forthcoming 
                  manuscript exploring contemporary challenges to religious belief.
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
                  Recognition & Awards
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
                        {achievement.organization}
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
                    "Cultural Studies",
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
                  please visit the separate professional practice website at{" "}
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