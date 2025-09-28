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

      </div>
    </footer>
  );
}