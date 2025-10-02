import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ExternalLink, PenTool, Calendar } from "lucide-react";

interface SubstackPost {
  title: string;
  link: string;
  pubDate: string;
  description: string;
  content: string;
  author: string;
  thumbnail?: string;
}

function stripHtml(html: string): string {
  const tmp = document.createElement('div');
  tmp.innerHTML = html;
  return tmp.textContent || tmp.innerText || '';
}

function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + '...';
}

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
}

export default function SubstackFeed() {
  const { data: posts = [], isLoading, error } = useQuery({
    queryKey: ['substack-feed'],
    queryFn: async (): Promise<SubstackPost[]> => {
      const rssUrl = 'https://jameyhecht.substack.com/feed';
      const apiUrl = `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(rssUrl)}`;
      
      const response = await fetch(apiUrl);
      const data = await response.json();
      
      if (data.status !== 'ok') {
        throw new Error(data.message || 'Failed to fetch Substack posts');
      }
      
      return data.items.slice(0, 2).map((item: any) => ({
        title: item.title,
        link: item.link,
        pubDate: item.pubDate,
        description: stripHtml(item.description),
        content: stripHtml(item.content),
        author: item.author,
        thumbnail: item.thumbnail || item.enclosure?.link || undefined
      }));
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    refetchInterval: 10 * 60 * 1000, // Refetch every 10 minutes
  });

  if (error) {
    return (
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <Badge variant="outline" className="mb-4">
              <PenTool className="w-4 h-4 mr-2" />
              Recent Writing
            </Badge>
            <p className="text-muted-foreground">
              Unable to load recent posts. Please visit{" "}
              <a 
                href="https://substack.com/@jameyhecht"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                Substack directly
              </a>
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-muted/30" id="recent-writing">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center space-x-2 mb-2">
            <PenTool className="w-4 h-4 text-muted-foreground" />
            <Badge variant="secondary" className="text-xs">
              Recent Writing
            </Badge>
          </div>
          <h2 className="font-serif text-2xl font-semibold text-foreground">
            Latest from Substack
          </h2>
        </div>
      <Card className="max-w-2xl mx-auto bg-background border-border shadow-lg">
        <CardHeader className="pb-3">
        </CardHeader>
        
        <CardContent className="space-y-4">
          {isLoading ? (
            <div className="animate-pulse space-y-2">
              <div className="h-4 bg-muted rounded w-3/4"></div>
              <div className="h-3 bg-muted rounded w-1/2"></div>
              <div className="h-12 bg-muted rounded"></div>
            </div>
          ) : posts.length > 0 ? (
            <div className="space-y-4">
              <div className="space-y-3">
                <div className="flex gap-3">
                  {posts[0].thumbnail && (
                    <div className="flex-shrink-0">
                      <img 
                        src={posts[0].thumbnail} 
                        alt={posts[0].title}
                        className="w-16 h-16 object-cover rounded-md"
                        data-testid="img-post-thumbnail"
                      />
                    </div>
                  )}
                  <div className="flex-1">
                    <h4 className="font-serif text-base font-medium text-foreground leading-tight mb-1">
                      <a 
                        href={posts[0].link} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="hover:text-primary transition-colors"
                        data-testid="link-latest-post"
                      >
                        {posts[0].title}
                      </a>
                    </h4>
                    <div className="flex items-center text-xs text-muted-foreground mb-2">
                      <Calendar className="w-3 h-3 mr-1" />
                      {formatDate(posts[0].pubDate)}
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {truncateText(posts[0].description, 150)}
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="pt-2 border-t border-border/50">
                <Button 
                  variant="outline" 
                  size="sm"
                  asChild 
                  className="w-full text-xs"
                  data-testid="button-read-latest"
                >
                  <a 
                    href={posts[0].link} 
                    target="_blank" 
                    rel="noopener noreferrer"
                  >
                    Read Post
                    <ExternalLink className="w-3 h-3 ml-1" />
                  </a>
                </Button>
              </div>
            </div>
          ) : error ? (
            <div className="space-y-3">
              <p className="text-xs text-muted-foreground">
                Unable to load recent posts.
              </p>
              <Button variant="outline" size="sm" asChild className="w-full text-xs">
                <a 
                  href="https://substack.com/@jameyhecht"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Visit Substack
                  <ExternalLink className="w-3 h-3 ml-1" />
                </a>
              </Button>
            </div>
          ) : (
            <div className="space-y-3">
              <p className="text-xs text-muted-foreground">No recent posts available.</p>
              <Button variant="outline" size="sm" asChild className="w-full text-xs">
                <a 
                  href="https://substack.com/@jameyhecht"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Visit Substack
                  <ExternalLink className="w-3 h-3 ml-1" />
                </a>
              </Button>
            </div>
          )}
          
          <div className="pt-2 border-t border-border/50">
            <Button 
              variant="ghost" 
              size="sm"
              asChild 
              className="w-full text-xs text-muted-foreground hover:text-foreground"
              data-testid="button-subscribe-newsletter"
            >
              <a 
                href="https://substack.com/@jameyhecht"
                target="_blank"
                rel="noopener noreferrer"
              >
                Subscribe to newsletter
                <ExternalLink className="w-3 h-3 ml-1" />
              </a>
            </Button>
          </div>
        </CardContent>
      </Card>
      </div>
    </section>
  );
}