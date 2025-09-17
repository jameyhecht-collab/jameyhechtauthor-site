import PublicationCard from '../PublicationCard';

export default function PublicationCardExample() {
  return (
    <div className="max-w-sm">
      <PublicationCard
        title="Bion at the Crossroads: A Contrarian Reading of 'on Arrogance'"
        publication="Journal of the American Psychoanalytic Association"
        year={2022}
        type="journal"
        abstract="In 'On Arrogance,' Wilfred Bion made a remarkable claim about treating neurotic patients and psychological catastrophe. This paper examines Bion's construction through a psychoanalytic lens and explores the clinical implications."
        views={96}
        downloadUrl="https://example.com/paper.pdf"
        category="Psychoanalytic Theory"
      />
    </div>
  );
}