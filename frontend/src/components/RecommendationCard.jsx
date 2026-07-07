export default function RecommendationCard({
  title = "No Title",
  description = "No description available.",
  priority = "N/A",
}) {
  return (
    <div data-testid="recommendation-card">
      <h4>{title}</h4>
      <p>{description}</p>
      <span>Priority: {priority}</span>
    </div>
  );
}