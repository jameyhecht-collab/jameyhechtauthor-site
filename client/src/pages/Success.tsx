import { useEffect, useState } from "react";
import { useLocation } from "wouter";
import { CheckCircle, ArrowLeft, Package } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function Success() {
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [, setLocation] = useLocation();

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const sessionIdParam = urlParams.get('session_id');
    if (sessionIdParam) {
      setSessionId(sessionIdParam);
    }
  }, []);

  const handleReturnHome = () => {
    setLocation('/');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted/20 flex items-center justify-center py-20">
      <div className="container mx-auto px-4 max-w-2xl">
        <Card className="text-center">
          <CardHeader className="pb-4">
            <div className="flex justify-center mb-6">
              <div className="bg-green-100 dark:bg-green-900/20 rounded-full p-6">
                <CheckCircle className="w-16 h-16 text-green-600 dark:text-green-400" />
              </div>
            </div>
            <CardTitle className="font-serif text-3xl text-foreground mb-2">
              Purchase Successful!
            </CardTitle>
            <p className="text-lg text-muted-foreground">
              Thank you for your order from Dr. Hecht's personal collection.
            </p>
          </CardHeader>
          
          <CardContent className="space-y-6">
            {sessionId && (
              <div className="bg-muted/30 rounded-lg p-4">
                <p className="text-sm font-medium text-muted-foreground mb-1">
                  Order Reference
                </p>
                <p className="text-sm font-mono text-foreground">
                  {sessionId.slice(0, 8)}...{sessionId.slice(-8)}
                </p>
              </div>
            )}
            
            <div className="space-y-4">
              <div className="flex items-center justify-center text-muted-foreground">
                <Package className="w-5 h-5 mr-2" />
                <span className="text-sm">
                  You will receive an email confirmation with shipping details shortly.
                </span>
              </div>
              
              <div className="text-sm text-muted-foreground">
                <p className="mb-2">
                  Your book will be carefully packaged and shipped from Dr. Hecht's personal library.
                </p>
                <p>
                  Orders typically ship within 2-3 business days via USPS Priority Mail.
                </p>
              </div>
            </div>
            
            <div className="pt-4">
              <Button 
                onClick={handleReturnHome}
                className="font-sans"
                data-testid="button-return-home"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Return to Website
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}