export default function AnomalyAlertCard({
  area = "Unknown Area",
  message = "No anomaly detected.",
  severity = "N/A",
}) {
  return (
    <div data-testid="anomaly-alert-card">
      <h4>{area}</h4>
      <p>{message}</p>
      <span>Severity: {severity}</span>
    </div>
  );
}