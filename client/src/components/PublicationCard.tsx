import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, Eye } from "lucide-react";

interface PublicationCardProps {
  title: string;
  publication: string;
  year: number;
  type: "journal" | "book" | "poetry" | "fiction" | "review" | "book_chapter";
  abstract?: string;
  downloadUrl?: string;
  category?: string;
}

const typeColors = {
  journal: "bg-primary/10 text-primary",
  book: "bg-accent/10 text-accent-foreground",
  poetry: "bg-secondary/10 text-secondary-foreground",
  fiction: "bg-emerald-500/10 text-emerald-600",
  review: "bg-muted/10 text-muted-foreground",
  book_chapter: "bg-accent/10 text-accent-foreground"
};

export default function PublicationCard({
  title,
  publication,
  year,
  type,
  abstract,
  downloadUrl,
  category
}: PublicationCardProps) {
  

  const handleView = () => {
    console.log(`Viewing: ${title}`);
    if (downloadUrl) {
      window.open(downloadUrl, '_blank');
    }
  };

  // Helper function to render text with italicized book/play titles and proper award formatting
  const renderTextWithItalics = (text: string) => {
    const bookTitles = [
      'Antigone', 'Oedipus the Tyrant', 'Oedipus at Colonus', 'Oedipus', 
      'Hamlet', 'Moby-Dick', 'Macbeth', 'Doctor Faustus',
      'Limousine, Midnight Blue', 'Iliad', 'Odyssey', 'Then I Am Myself the World'
    ];
    
    let processedText = text;
    
    // Handle the specific case of "Winner, New Author's Prize" for better formatting
    if (processedText.includes("Winner, New Author's Prize.")) {
      processedText = processedText.replace(
        "Winner, New Author's Prize. In", 
        "Winner, New Author's Prize.<br/><br/>In"
      );
    }
    
    bookTitles.forEach(title => {
      const regex = new RegExp(`\\b${title}\\b`, 'g');
      processedText = processedText.replace(regex, `<em>${title}</em>`);
    });
    
    return <span dangerouslySetInnerHTML={{ __html: processedText }} />;
  };

  return (
    <Card className="hover-elevate transition-all duration-200 h-full flex flex-col">
      <CardHeader className="space-y-3">
        <div className="flex items-start justify-between gap-3">
          <Badge variant="outline" className={typeColors[type]}>
            {type === "book_chapter" ? "Book Chapter" : 
             type === "journal" && title === "The Sirens" ? "Poetry" :
             type === "poetry" ? "Poetry" :
             type === "journal" ? "Publication" :
             type.charAt(0).toUpperCase() + type.slice(1)}
          </Badge>
        </div>
        
        <h3 className="font-serif text-lg font-semibold leading-tight text-foreground">
          {title}
        </h3>
        
        <div className="space-y-1">
          <p className="text-base font-medium text-muted-foreground">
            {publication}
          </p>
          <p className="text-base text-muted-foreground">
            {year}
          </p>
          {category && (
            <p className="text-sm text-muted-foreground">
              {category}
            </p>
          )}
        </div>
      </CardHeader>

      <CardContent className="flex-1">
        {abstract && (
          <p className="text-sm text-muted-foreground leading-relaxed line-clamp-4">
            {abstract.includes("available here") ? (
              <>
                {renderTextWithItalics(abstract.split("available here")[0])}
                <a href="/shop" className="underline hover:text-foreground transition-colors">
                  available here
                </a>
                {renderTextWithItalics(abstract.split("available here")[1] || "")}
              </>
            ) : renderTextWithItalics(abstract)}
          </p>
        )}
      </CardContent>

      <CardFooter className="pt-4">
        {downloadUrl && (
          <Button
            size="sm"
            onClick={handleView}
            className="w-full hover-elevate active-elevate-2"
            data-testid={`button-view-${title.toLowerCase().replace(/\s+/g, "-")}`}
          >
            <ExternalLink className="h-3 w-3 mr-1" />
            {type === "book" ? "Available for Purchase" : "View"}
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}