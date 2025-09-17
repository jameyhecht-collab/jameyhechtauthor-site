import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BookOpen, FileText, Mail, Users } from "lucide-react";
import manuscriptCover from "@assets/generated_images/Into_Theism_book_cover_70f51e81.png";

export default function ManuscriptShowcase() {
  const handleAgentInquiry = () => {
    console.log("Opening agent inquiry form");
    // In a real app, this would open a contact modal or navigate to contact page
  };

  const handleReadExcerpt = () => {
    console.log("Opening manuscript excerpt");
    // In a real app, this would show a modal with sample chapters
  };

  const handleDownloadProposal = () => {
    console.log("Downloading book proposal");
    // In a real app, this would download the proposal document
  };

  return (
    <section className="py-20 bg-muted/20" id="manuscript">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center space-y-4 mb-16">
          <Badge variant="outline" className="mb-4">
            Seeking Publication
          </Badge>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-foreground">
            Into Theism: Overcoming Obstacles to Belief in God
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            A comprehensive exploration of the philosophical, psychological, and cultural barriers 
            to religious belief in the modern world, offering pathways to authentic faith.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          {/* Book Cover & Stats */}
          <div className="text-center space-y-8">
            <div className="relative inline-block">
              <img
                src={manuscriptCover}
                alt="Into Theism book cover"
                className="w-64 h-auto mx-auto shadow-2xl rounded-lg"
                data-testid="img-manuscript-cover"
              />
              <div className="absolute -bottom-4 -right-4 bg-primary text-primary-foreground px-4 py-2 rounded-full text-sm font-semibold">
                100,000 words
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4 max-w-sm mx-auto">
              <div className="text-center">
                <p className="text-2xl font-bold text-foreground">15</p>
                <p className="text-sm text-muted-foreground">Chapters</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-foreground">2024</p>
                <p className="text-sm text-muted-foreground">Completed</p>
              </div>
            </div>
          </div>

          {/* Content & CTA */}
          <div className="space-y-8">
            
            {/* Book Description */}
            <Card className="border-border/50">
              <CardHeader>
                <h3 className="font-serif text-xl font-semibold text-foreground">
                  About the Manuscript
                </h3>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground leading-relaxed">
                  This work addresses the intellectual and emotional challenges that prevent 
                  contemporary individuals from embracing religious faith. Drawing from 
                  philosophy, psychology, literature, and personal reflection, it offers 
                  a thoughtful examination of doubt, meaning, and transcendence.
                </p>
                
                <div className="space-y-2">
                  <h4 className="font-semibold text-foreground">Key Themes:</h4>
                  <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
                    <li>The psychology of belief and doubt</li>
                    <li>Scientific materialism and spiritual experience</li>
                    <li>Cultural barriers to religious commitment</li>
                    <li>Pathways to authentic faith in modernity</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            {/* Action Buttons */}
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <Button 
                  onClick={handleAgentInquiry}
                  className="hover-elevate active-elevate-2"
                  data-testid="button-agent-inquiry"
                >
                  <Users className="mr-2 h-4 w-4" />
                  Agent Inquiry
                </Button>
                
                <Button 
                  variant="outline"
                  onClick={handleReadExcerpt}
                  className="hover-elevate active-elevate-2"
                  data-testid="button-read-excerpt"
                >
                  <BookOpen className="mr-2 h-4 w-4" />
                  Read Excerpt
                </Button>
              </div>
              
              <Button 
                variant="secondary"
                onClick={handleDownloadProposal}
                className="w-full hover-elevate active-elevate-2"
                data-testid="button-download-proposal"
              >
                <FileText className="mr-2 h-4 w-4" />
                Download Book Proposal
              </Button>
            </div>

            {/* Agent Contact Note */}
            <Card className="bg-primary/5 border-primary/20">
              <CardContent className="pt-6">
                <div className="flex items-start space-x-3">
                  <Mail className="h-5 w-5 text-primary mt-0.5" />
                  <div className="space-y-1">
                    <p className="text-sm font-medium text-foreground">
                      For Literary Agents & Publishers
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Complete manuscript available upon request. 
                      Includes detailed chapter outline, author platform, and marketing plan.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

          </div>
        </div>
      </div>
    </section>
  );
}