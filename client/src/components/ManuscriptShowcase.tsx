import { Button } from "@/components/ui/button";
import { BookOpen, FileText } from "lucide-react";

export default function ManuscriptShowcase() {
  return (
    <section className="py-12 bg-muted/20" id="manuscript">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <img
          src="/into-theism-one-sheet.png"
          alt="Into Theism one-sheet with book overview, endorsements, author information, and publication details"
          className="w-full h-auto"
        />

        <div className="flex flex-wrap justify-center gap-3 mt-8">
          <Button
            variant="outline"
            onClick={() => {
              console.log("Viewing table of contents");
              window.open("/table-of-contents-into-theism.pdf", "_blank");
            }}
            className="hover-elevate active-elevate-2"
            data-testid="button-table-of-contents"
          >
            <FileText className="mr-2 h-4 w-4" />
            Table of Contents
          </Button>

          <Button
            variant="outline"
            onClick={() => {
              console.log("Viewing preface");
              window.open("/preface-into-theism.pdf", "_blank");
            }}
            className="hover-elevate active-elevate-2"
            data-testid="button-preface"
          >
            <BookOpen className="mr-2 h-4 w-4" />
            Preface
          </Button>

          <Button
            variant="outline"
            onClick={() => {
              console.log("Viewing synopsis with chapter descriptions");
              window.open("/synopsis-into-theism.pdf", "_blank");
            }}
            className="hover-elevate active-elevate-2"
            data-testid="button-synopsis"
          >
            <FileText className="mr-2 h-4 w-4" />
            Synopsis with Chapter Descriptions
          </Button>

          <Button
            variant="outline"
            onClick={() => {
              console.log("Viewing sample chapter: Theodicy");
              window.open("/sample-chapter-into-theism.pdf", "_blank");
            }}
            className="hover-elevate active-elevate-2"
            data-testid="button-sample-chapter"
          >
            <BookOpen className="mr-2 h-4 w-4" />
            Sample Chapter: Theodicy, the "Problem of Evil"
          </Button>
        </div>
      </div>
    </section>
  );
}
