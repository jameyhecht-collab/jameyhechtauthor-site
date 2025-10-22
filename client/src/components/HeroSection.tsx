import { Button } from "@/components/ui/button";
import { ArrowRight, BookOpen, Users } from "lucide-react";
import authorImage from "@assets/AE67DF49-66DE-4828-AF5A-368A0199308F_1_201_a_1758473118885.jpeg";

export default function HeroSection() {
  const handleScrollToWorks = () => {
    console.log("Scrolling to published works section");
    // In a real app, this would scroll to the works section
  };

  const handleScrollToManuscript = () => {
    console.log("Scrolling to Into Theism manuscript section");
    // In a real app, this would scroll to the manuscript section
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-background to-muted/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          {/* Content Column */}
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground leading-tight">
                Dr. Jamey Hecht
              </h1>
              <p className="font-serif text-xl sm:text-2xl text-muted-foreground font-medium">
                Author, Scholar, Psychoanalyst
              </p>
              <p className="font-serif text-xl sm:text-2xl lg:text-3xl text-primary font-bold italic leading-relaxed max-w-2xl tracking-tight">
                "Exploring consciousness, philosophy, and theism—without certainty or despair."
              </p>
            </div>

            <div className="space-y-6">
              <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl">
                PhD in English & American Literature, PsyD in Psychoanalysis. 
                Author of five published books and over a dozen scholarly papers spanning literary criticism, poetry, 
                and psychoanalytic theory. Currently seeking representation for 
                <em className="font-serif font-semibold text-foreground"> Into Theism: Overcoming Obstacles to Belief in God</em>.
              </p>

            </div>

            {/* Academic Credentials */}
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground font-medium">
                2022 New Authors Prize Winner
              </p>
              <p className="text-sm text-muted-foreground">
                Journal of the American Psychoanalytic Association
              </p>
            </div>
          </div>

          {/* Image Column */}
          <div className="relative">
            <div className="relative">
              <img
                src={authorImage}
                alt="Dr. Jamey Hecht"
                className="w-full max-w-md mx-auto rounded-lg shadow-lg"
                data-testid="img-author-headshot"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/20 to-transparent rounded-lg"></div>
            </div>
          </div>

        </div>
      </div>

      {/* Decorative gradient overlay */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent"></div>
    </section>
  );
}