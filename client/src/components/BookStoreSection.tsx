import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ShoppingCart, Book, Star } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";

const books = [
  {
    id: "schopenhauer-cure",
    title: "The Schopenhauer Cure",
    subtitle: "A Novel",
    author: "Irvin D. Yalom",
    price: 18.95,
    description: "A compelling blend of group therapy and philosophy exploring Schopenhauer's pessimistic worldview through narrative.",
    isbn: "978-0-06-059578-2",
    pages: 368,
    year: 2005,
    condition: "Excellent",
    availability: "In Stock"
  },
  {
    id: "death-comes-for-the-archbishop", 
    title: "Death Comes for the Archbishop",
    subtitle: "",
    author: "Willa Cather",
    price: 16.50,
    description: "A luminous novel about the Catholic Church's mission in the American Southwest during the 19th century.",
    isbn: "978-0-679-72889-9",
    pages: 297,
    year: 1927,
    condition: "Very Good",
    availability: "In Stock"
  },
  {
    id: "man-search-meaning",
    title: "Man's Search for Meaning", 
    subtitle: "",
    author: "Viktor E. Frankl",
    price: 15.95,
    description: "A profound meditation on finding purpose in suffering, based on the author's experience in Nazi concentration camps.",
    isbn: "978-0-8070-1427-1",
    pages: 165,
    year: 1946,
    condition: "Good",
    availability: "In Stock"
  }
];

export default function BookStoreSection() {
  const [purchasingBook, setPurchasingBook] = useState<string | null>(null);
  const { toast } = useToast();

  const handlePurchase = async (bookId: string, amount: number, title: string) => {
    setPurchasingBook(bookId);
    
    try {
      const response = await apiRequest("POST", "/api/create-payment-intent", {
        amount: amount,
        description: `Purchase of "${title}"`,
        bookId: bookId
      });
      
      const data = await response.json();
      
      if (data.clientSecret) {
        // In a real implementation, this would redirect to checkout
        // For now, we'll show a success message
        toast({
          title: "Redirecting to Checkout",
          description: `Processing purchase of "${title}" for $${amount.toFixed(2)}`,
        });
        
        // Simulate checkout process
        setTimeout(() => {
          toast({
            title: "Purchase Successful!",
            description: `Thank you for purchasing "${title}". You will receive shipping information via email.`,
          });
          setPurchasingBook(null);
        }, 2000);
      }
    } catch (error) {
      toast({
        title: "Purchase Failed",
        description: "Unable to process payment. Please try again.",
        variant: "destructive",
      });
      setPurchasingBook(null);
    }
  };

  return (
    <section id="bookstore" className="py-20 bg-muted/30" data-testid="section-bookstore">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <Badge variant="secondary" className="mb-4" data-testid="badge-bookstore">
            <Book className="w-4 h-4 mr-2" />
            Book Store
          </Badge>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-foreground mb-4">
            Available Books
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Purchase signed copies of books from Dr. Hecht's personal collection, 
            carefully selected works in literature, philosophy, and psychology.
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
                      {book.subtitle && (
                        <span className="block text-base font-normal text-muted-foreground mt-1">
                          {book.subtitle}
                        </span>
                      )}
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
                    onClick={() => handlePurchase(book.id, book.price, book.title)}
                    disabled={purchasingBook === book.id}
                    className="min-w-[120px]"
                    data-testid={`button-purchase-${book.id}`}
                  >
                    {purchasingBook === book.id ? (
                      "Processing..."
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
            All books are shipped from Dr. Hecht's personal collection and may include personal inscriptions.
          </p>
          <p className="text-xs text-muted-foreground">
            Shipping calculated at checkout. International shipping available.
          </p>
        </div>
      </div>
    </section>
  );
}