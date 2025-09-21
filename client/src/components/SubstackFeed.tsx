import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
        author: item.author
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
    <section id="recent-writing" className="py-16 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <Badge variant="outline" className="mb-4">
            <PenTool className="w-4 h-4 mr-2" />
            Recent Writing
          </Badge>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-foreground mb-4">
            Latest from Substack
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Current thoughts on consciousness, philosophy, and the human condition
          </p>
        </div>

        {isLoading ? (
          <div className="flex justify-center">
            <div className="animate-pulse space-y-4 w-full max-w-4xl">
              <div className="h-6 bg-muted rounded w-3/4 mx-auto"></div>
              <div className="h-4 bg-muted rounded w-1/2 mx-auto"></div>
              <div className="h-20 bg-muted rounded"></div>
            </div>
          </div>
        ) : posts.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {posts.map((post, index) => (
              <Card 
                key={post.link} 
                className={`group hover-elevate ${index === 0 ? 'lg:col-span-2' : ''}`}
                data-testid={`substack-post-${index}`}
              >
                <CardHeader className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Badge variant="secondary" className="text-xs">
                      Substack
                    </Badge>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Calendar className="w-4 h-4 mr-1" />
                      {formatDate(post.pubDate)}
                    </div>
                  </div>
                  <CardTitle className="font-serif text-xl sm:text-2xl leading-tight group-hover:text-primary transition-colors">
                    {post.title}
                  </CardTitle>
                </CardHeader>
                
                <CardContent className="space-y-6">
                  <p className="text-muted-foreground leading-relaxed">
                    {truncateText(post.description, index === 0 ? 300 : 200)}
                  </p>
                  
                  <Button 
                    variant="outline"
                    asChild
                    className="hover-elevate active-elevate-2"
                    data-testid={`button-read-post-${index}`}
                  >
                    <a 
                      href={post.link} 
                      target="_blank" 
                      rel="noopener noreferrer"
                    >
                      Read Full Post
                      <ExternalLink className="w-4 h-4 ml-2" />
                    </a>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center">
            <p className="text-muted-foreground mb-4">No recent posts available.</p>
            <Button variant="outline" asChild>
              <a 
                href="https://substack.com/@jameyhecht"
                target="_blank"
                rel="noopener noreferrer"
              >
                Visit Substack
                <ExternalLink className="w-4 h-4 ml-2" />
              </a>
            </Button>
          </div>
        )}

        <div className="text-center mt-8">
          <Button variant="ghost" asChild className="text-muted-foreground hover:text-foreground">
            <a 
              href="https://substack.com/@jameyhecht"
              target="_blank"
              rel="noopener noreferrer"
              data-testid="link-substack-subscribe"
            >
              Subscribe to the newsletter
              <ExternalLink className="w-4 h-4 ml-2" />
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
}