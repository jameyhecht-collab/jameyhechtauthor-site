import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ShoppingCart, BookOpen, Loader2 } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { useQuery } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import type { Book } from "@shared/schema";

export default function BookStoreSection() {
  const [purchasingBook, setPurchasingBook] = useState<string | null>(null);
  const { toast } = useToast();
  
  // Fetch books from API
  const { data: books = [], isLoading, error } = useQuery({
    queryKey: ['/api/books'],
    queryFn: async () => {
      const response = await fetch('/api/books');
      if (!response.ok) {
        throw new Error('Failed to fetch books');
      }
      return response.json() as Promise<Book[]>;
    }
  });

  const handlePurchase = async (bookId: string, title: string) => {
    setPurchasingBook(bookId);
    
    try {
      const response = await apiRequest("POST", "/api/create-checkout-session", {
        bookId: bookId,
        quantity: 1
      });
      
      const data = await response.json();
      
      if (data.error) {
        throw new Error(data.error);
      }
      
      if (data.url) {
        // Redirect to Stripe Checkout
        window.location.href = data.url;
      }
    } catch (error: any) {
      toast({
        title: "Purchase Failed",
        description: error.message || "Unable to process payment. Please try again.",
        variant: "destructive",
      });
      setPurchasingBook(null);
    }
  };

  if (isLoading) {
    return (
      <section id="bookstore" className="py-20 bg-muted/30" data-testid="section-bookstore">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center py-20">
            <Loader2 className="h-8 w-8 animate-spin" />
            <span className="ml-2">Loading books...</span>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section id="bookstore" className="py-20 bg-muted/30" data-testid="section-bookstore">
        <div className="container mx-auto px-4">
          <div className="text-center py-20">
            <p className="text-muted-foreground">Unable to load books. Please try again later.</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="bookstore" className="py-20 bg-muted/30" data-testid="section-bookstore">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <Badge variant="secondary" className="mb-4" data-testid="badge-bookstore">
            <BookOpen className="w-4 h-4 mr-2" />
            Book Store
          </Badge>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-foreground mb-4">
            Available Books
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Purchase signed copies of Dr. Hecht's published works in literary criticism, 
            poetry, and psychoanalytic theory.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {books.map((book) => (
            <Card key={book.id} className="group hover-elevate" data-testid={`card-book-${book.id}`}>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="font-serif text-xl leading-tight mb-2">
                      {book.title}
                    </CardTitle>
                    <p className="text-sm text-muted-foreground font-sans">
                      by {book.author}
                    </p>
                  </div>
                  <Badge variant="outline" className="ml-2" data-testid={`status-${book.id}`}>
                    {book.availability}
                  </Badge>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {book.description}
                </p>
                
                <div className="grid grid-cols-2 gap-4 text-xs text-muted-foreground">
                  <div>
                    <span className="font-medium">Published:</span> {book.year}
                  </div>
                  <div>
                    <span className="font-medium">Pages:</span> {book.pages}
                  </div>
                  <div>
                    <span className="font-medium">Condition:</span> {book.condition}
                  </div>
                  <div>
                    <span className="font-medium">ISBN:</span> {book.isbn}
                  </div>
                </div>
                
                <div className="flex items-center justify-between pt-4 border-t">
                  <div className="text-right">
                    <span className="text-2xl font-bold text-foreground">
                      ${book.price.toFixed(2)}
                    </span>
                    <p className="text-xs text-muted-foreground">
                      + shipping
                    </p>
                  </div>
                  
                  <Button
                    onClick={() => handlePurchase(book.id, book.title)}
                    disabled={purchasingBook === book.id}
                    className="min-w-[120px]"
                    data-testid={`button-purchase-${book.id}`}
                  >
                    {purchasingBook === book.id ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Processing...
                      </>
                    ) : (
                      <>
                        <ShoppingCart className="w-4 h-4 mr-2" />
                        Purchase
                      </>
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <p className="text-sm text-muted-foreground mb-4">
            All books are personally signed by the author and shipped directly from Dr. Hecht.
          </p>
          <p className="text-xs text-muted-foreground">
            Shipping calculated at checkout. International shipping available.
          </p>
        </div>
      </div>
    </section>
  );
}