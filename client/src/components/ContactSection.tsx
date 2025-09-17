import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { Mail, MessageSquare, User, BookOpen, Send } from "lucide-react";

type InquiryType = "agent" | "academic" | "media" | "general";

const inquiryTypes = [
  { key: "agent" as const, label: "Literary Agent/Publisher", icon: BookOpen },
  { key: "academic" as const, label: "Academic Collaboration", icon: User },
  { key: "media" as const, label: "Media/Interview", icon: MessageSquare },
  { key: "general" as const, label: "General Inquiry", icon: Mail }
];

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    organization: "",
    inquiryType: "general" as InquiryType,
    subject: "",
    message: ""
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    console.log(`Updated ${field}:`, value);
  };

  const handleInquiryTypeChange = (type: InquiryType) => {
    setFormData(prev => ({ ...prev, inquiryType: type }));
    console.log("Selected inquiry type:", type);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    console.log("Submitting contact form:", formData);
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      toast({
        title: "Message Sent",
        description: "Thank you for your inquiry. I'll respond within 24-48 hours.",
      });
      
      // Reset form
      setFormData({
        name: "",
        email: "",
        organization: "",
        inquiryType: "general",
        subject: "",
        message: ""
      });
    }, 1500);
  };

  return (
    <section className="py-20 bg-background" id="contact">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center space-y-4 mb-16">
          <Badge variant="outline" className="mb-4">
            Literary Inquiries
          </Badge>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-foreground">
            Contact Dr. Jamey Hecht
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            For literary representation inquiries, academic collaborations, 
            media requests, and professional correspondence.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          
          {/* Contact Form */}
          <Card>
            <CardHeader>
              <h3 className="font-serif text-xl font-semibold text-foreground">
                Send a Message
              </h3>
              <p className="text-sm text-muted-foreground">
                Please allow 24-48 hours for a response to literary inquiries.
              </p>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                
                {/* Personal Information */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Name *</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => handleInputChange("name", e.target.value)}
                      placeholder="Your full name"
                      required
                      data-testid="input-name"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email *</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange("email", e.target.value)}
                      placeholder="your@email.com"
                      required
                      data-testid="input-email"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="organization">Organization</Label>
                  <Input
                    id="organization"
                    value={formData.organization}
                    onChange={(e) => handleInputChange("organization", e.target.value)}
                    placeholder="Literary agency, university, publication, etc."
                    data-testid="input-organization"
                  />
                </div>

                {/* Inquiry Type */}
                <div className="space-y-3">
                  <Label>Type of Inquiry *</Label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {inquiryTypes.map(({ key, label, icon: Icon }) => (
                      <Button
                        key={key}
                        type="button"
                        variant={formData.inquiryType === key ? "default" : "outline"}
                        className="justify-start hover-elevate active-elevate-2"
                        onClick={() => handleInquiryTypeChange(key)}
                        data-testid={`inquiry-type-${key}`}
                      >
                        <Icon className="mr-2 h-4 w-4" />
                        {label}
                      </Button>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="subject">Subject *</Label>
                  <Input
                    id="subject"
                    value={formData.subject}
                    onChange={(e) => handleInputChange("subject", e.target.value)}
                    placeholder="Brief subject line"
                    required
                    data-testid="input-subject"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message">Message *</Label>
                  <Textarea
                    id="message"
                    value={formData.message}
                    onChange={(e) => handleInputChange("message", e.target.value)}
                    placeholder="Please describe your inquiry in detail..."
                    className="min-h-32"
                    required
                    data-testid="input-message"
                  />
                </div>

                <Button 
                  type="submit"
                  className="w-full hover-elevate active-elevate-2"
                  disabled={isSubmitting}
                  data-testid="button-submit-contact"
                >
                  {isSubmitting ? (
                    "Sending..."
                  ) : (
                    <>
                      <Send className="mr-2 h-4 w-4" />
                      Send Message
                    </>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Contact Information & Guidelines */}
          <div className="space-y-6">
            
            {/* For Literary Agents */}
            <Card className="bg-primary/5 border-primary/20">
              <CardHeader>
                <h3 className="font-serif text-lg font-semibold text-foreground">
                  For Literary Agents & Publishers
                </h3>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-sm text-muted-foreground">
                  <strong className="text-foreground">Into Theism</strong> is a completed 100,000-word 
                  manuscript exploring philosophical and psychological barriers to religious belief.
                </p>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Complete manuscript available</li>
                  <li>• Detailed chapter outline ready</li>
                  <li>• Author platform established</li>
                  <li>• Marketing plan prepared</li>
                </ul>
              </CardContent>
            </Card>

            {/* Academic Inquiries */}
            <Card>
              <CardHeader>
                <h3 className="font-serif text-lg font-semibold text-foreground">
                  Academic Collaborations
                </h3>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-sm text-muted-foreground">
                  Open to collaborations in psychoanalytic studies, literary criticism, 
                  and interdisciplinary research projects.
                </p>
                <div className="space-y-1">
                  <p className="text-xs text-muted-foreground">
                    <strong>Expertise areas:</strong>
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Contemporary poetry, psychoanalytic theory, religious philosophy, 
                    literary criticism
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Professional Practice Note */}
            <Card className="bg-muted/30">
              <CardContent className="pt-6">
                <p className="text-sm text-muted-foreground text-center">
                  <strong className="text-foreground">Note:</strong> This contact form is for 
                  literary and academic inquiries only. For psychotherapy appointments, 
                  please visit{" "}
                  <a 
                    href="https://www.drjameyhecht.com/contact" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-primary hover:underline"
                    data-testid="link-therapy-contact"
                  >
                    drjameyhecht.com/contact
                  </a>
                </p>
              </CardContent>
            </Card>

            {/* Response Time */}
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center space-x-3">
                  <Mail className="h-5 w-5 text-primary" />
                  <div>
                    <p className="text-sm font-medium text-foreground">
                      Response Time
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Typically within 24-48 hours for professional inquiries
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