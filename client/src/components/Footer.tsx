import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { BookOpen, Mail, ExternalLink, ArrowUp } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    console.log("Scrolling to top");
  };

  const handleExternalLink = (url: string, label: string) => {
    console.log(`Opening external link: ${label}`);
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <footer className="bg-muted/30 border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          
          {/* About Column */}
          <div className="space-y-4">
            <h3 className="font-serif text-lg font-semibold text-foreground">
              Dr. Jamey Hecht
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Author, scholar, and psychoanalyst. Published works in literature, 
              psychoanalysis, and poetry. Currently seeking publication for 
              <em> Into Theism</em>.
            </p>
            <div className="flex items-center space-x-2">
              <Badge variant="outline" className="text-xs">
                PhD • PsyD • LMFT
              </Badge>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="font-semibold text-foreground">Quick Links</h4>
            <div className="space-y-2">
              <a 
                href="#works" 
                className="block text-sm text-muted-foreground hover:text-primary transition-colors"
                data-testid="footer-link-works"
              >
                Published Works
              </a>
              <a 
                href="#manuscript" 
                className="block text-sm text-muted-foreground hover:text-primary transition-colors"
                data-testid="footer-link-manuscript"
              >
                Into Theism Manuscript
              </a>
              <a 
                href="#about" 
                className="block text-sm text-muted-foreground hover:text-primary transition-colors"
                data-testid="footer-link-about"
              >
                About the Author
              </a>
              <a 
                href="#contact" 
                className="block text-sm text-muted-foreground hover:text-primary transition-colors"
                data-testid="footer-link-contact"
              >
                Literary Contact
              </a>
            </div>
          </div>

          {/* External Resources */}
          <div className="space-y-4">
            <h4 className="font-semibold text-foreground">Academic Profile</h4>
            <div className="space-y-2">
              <Button
                variant="ghost"
                size="sm"
                className="justify-start h-auto p-0 text-sm text-muted-foreground hover:text-primary"
                onClick={() => handleExternalLink("https://ncpsychoanalysis.academia.edu/JameyHecht", "Academia.edu")}
                data-testid="footer-link-academia"
              >
                <ExternalLink className="mr-2 h-3 w-3" />
                Academia.edu Profile
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="justify-start h-auto p-0 text-sm text-muted-foreground hover:text-primary"
                onClick={() => handleExternalLink("https://www.drjameyhecht.com", "Professional Practice")}
                data-testid="footer-link-practice"
              >
                <ExternalLink className="mr-2 h-3 w-3" />
                Psychotherapy Practice
              </Button>
            </div>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h4 className="font-semibold text-foreground">Professional Contact</h4>
            <div className="space-y-3">
              <div className="flex items-start space-x-2">
                <BookOpen className="h-4 w-4 text-primary mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-foreground">
                    Literary Inquiries
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Agents, publishers, media
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-2">
                <Mail className="h-4 w-4 text-primary mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-foreground">
                    Academic Collaboration
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Research partnerships
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <Separator className="my-8" />

        {/* Bottom Footer */}
        <div className="flex flex-col sm:flex-row items-center justify-between space-y-4 sm:space-y-0">
          <div className="flex items-center space-x-4">
            <p className="text-sm text-muted-foreground">
              © {currentYear} Dr. Jamey Hecht. All rights reserved.
            </p>
          </div>
          
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleScrollToTop}
              className="hover-elevate"
              data-testid="button-scroll-top"
            >
              <ArrowUp className="h-4 w-4 mr-1" />
              Back to Top
            </Button>
          </div>
        </div>

        {/* Attribution Note */}
        <div className="mt-6 pt-6 border-t border-border/50">
          <p className="text-center text-xs text-muted-foreground">
            Professional author website • Squarespace compatible design
          </p>
        </div>
      </div>
    </footer>
  );
}