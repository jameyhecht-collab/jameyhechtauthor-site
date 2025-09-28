import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { ArrowLeft, Mail, Copy, Send } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Link } from "wouter";

export default function RequestProposal() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    organization: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleEmailRequest = () => {
    const subject = "Request for Full Book Proposal — Into Theism: Overcoming Obstacles to Belief in God";
    const body = `Dear Dr. Hecht,

I am interested in receiving the full book proposal for "Into Theism: Overcoming Obstacles to Belief in God."

Please send me:
• Complete book proposal with marketing plan
• Detailed chapter outline
• Author platform information
• Any additional manuscript materials

Best regards,
[Your name]
[Your organization/affiliation]`;

    const mailtoUrl = `mailto:jamey.hecht@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    
    try {
      window.location.href = mailtoUrl;
      toast({
        title: "Email client opened",
        description: "If your email client didn't open, try the contact form below.",
      });
    } catch (error) {
      toast({
        title: "Error opening email",
        description: "Please use the contact form below or copy the email address.",
        variant: "destructive"
      });
    }
  };

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText("jamey.hecht@gmail.com");
      toast({
        title: "Email copied!",
        description: "jamey.hecht@gmail.com copied to clipboard",
      });
    } catch (error) {
      toast({
        title: "Copy failed",
        description: "Please manually copy: jamey.hecht@gmail.com",
        variant: "destructive"
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission (in real app, this would send to backend)
    setTimeout(() => {
      toast({
        title: "Message sent!",
        description: "Thank you for your interest. Dr. Hecht will respond within 24-48 hours.",
      });
      setIsSubmitting(false);
      setFormData({ name: "", email: "", organization: "", message: "" });
    }, 1000);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-4 py-12">
        
        {/* Back Navigation */}
        <Link href="/" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-8 transition-colors">
          <ArrowLeft className="h-4 w-4" />
          Back to Dr. Hecht's Portfolio
        </Link>

        <Card className="mb-8">
          <CardHeader>
            <h1 className="font-serif text-3xl font-bold text-foreground">
              Request the Full Book Proposal
            </h1>
            <p className="text-lg text-muted-foreground">
              One click opens your email client with a pre-filled subject and message. 
              If that doesn't work on your device, use the contact form below.
            </p>
          </CardHeader>
          
          <CardContent>
            <div className="grid md:grid-cols-2 gap-8">
              
              {/* Primary CTA */}
              <div className="space-y-4">
                <Button 
                  onClick={handleEmailRequest}
                  size="lg"
                  className="w-full hover-elevate active-elevate-2"
                  data-testid="button-email-request"
                >
                  <Mail className="mr-2 h-5 w-5" />
                  📧 Request Full Proposal
                </Button>
                
                <div className="text-sm text-muted-foreground space-y-2">
                  <p>Having trouble? <a href="#contact-form" className="text-primary hover:underline">Use the contact form</a> or</p>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={copyEmail}
                    data-testid="button-copy-email"
                  >
                    <Copy className="mr-2 h-4 w-4" />
                    Copy email address
                  </Button>
                </div>

                <div className="space-y-2 text-sm text-muted-foreground">
                  <h4 className="font-semibold text-foreground">Email includes:</h4>
                  <ul className="space-y-1 list-disc list-inside pl-4">
                    <li>Pre-filled <strong>Subject</strong>: <em>Request for Full Book Proposal — Into Theism</em></li>
                    <li>Professional message template</li>
                    <li>List of requested materials</li>
                    <li>Dr. Hecht's direct email address</li>
                  </ul>
                </div>
              </div>

              {/* About the Proposal */}
              <div className="space-y-4">
                <h3 className="font-serif text-lg font-semibold text-foreground">
                  What You'll Receive
                </h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <span className="text-primary">•</span>
                    <span>Complete book proposal with detailed marketing plan</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary">•</span>
                    <span>Chapter-by-chapter outline and summaries</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary">•</span>
                    <span>Author platform and credentials overview</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary">•</span>
                    <span>Target audience analysis and competitive titles</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary">•</span>
                    <span>Sample chapters and manuscript excerpts</span>
                  </li>
                </ul>
                
                <div className="mt-4 p-3 bg-muted/50 rounded-lg">
                  <p className="text-xs text-muted-foreground">
                    <strong>For literary agents and publishers:</strong> All materials are professionally 
                    formatted and ready for editorial review. Response time: 24-48 hours.
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Contact Form */}
        <Card id="contact-form">
          <CardHeader>
            <h2 className="font-serif text-xl font-semibold text-foreground">
              Alternative Contact Form
            </h2>
            <p className="text-muted-foreground">
              If the email button doesn't work on your device, send your request using this form.
            </p>
          </CardHeader>
          
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Name *</Label>
                  <Input 
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    data-testid="input-name"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="email">Email *</Label>
                  <Input 
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    data-testid="input-email"
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="organization">Organization/Affiliation</Label>
                <Input 
                  id="organization"
                  name="organization"
                  value={formData.organization}
                  onChange={handleInputChange}
                  placeholder="Literary agency, publishing house, academic institution, etc."
                  data-testid="input-organization"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="message">Message</Label>
                <Textarea 
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  rows={4}
                  placeholder="Please specify your interest in the manuscript and any additional information you'd like to receive..."
                  data-testid="textarea-message"
                />
              </div>
              
              <div className="flex items-center justify-between">
                <Button 
                  type="submit" 
                  disabled={isSubmitting || !formData.name || !formData.email}
                  className="hover-elevate active-elevate-2"
                  data-testid="button-submit-form"
                >
                  <Send className="mr-2 h-4 w-4" />
                  {isSubmitting ? "Sending..." : "Send Request"}
                </Button>
                
                <p className="text-xs text-muted-foreground">
                  Response time: 24-48 hours
                </p>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}