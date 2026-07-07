import RecommendationCard from "./RecommendationCard";
import AnomalyAlertCard from "./AnomalyAlertCard";

export default function RecommendationSection({
  recommendations = [],
  anomalyAlerts = [],
}) {
  return (
    <section className="space-y-8">
      <h2 className="text-2xl font-bold">
        Recommendations
      </h2>

      {recommendations.length === 0 &&
      anomalyAlerts.length === 0 ? (
        <p>No recommendations or anomaly alerts available.</p>
      ) : (
        <>
          <div>
            <h3 className="mb-4 text-lg font-semibold">
              Recommended Actions
            </h3>

            <div className="space-y-4">
              {recommendations.map((recommendation) => (
                <RecommendationCard
                  key={recommendation.title}
                  title={recommendation.title}
                  description={recommendation.description}
                  priority={recommendation.priority}
                />
              ))}
            </div>
          </div>

          <div>
            <h3 className="mb-4 text-lg font-semibold">
              Anomaly Alerts
            </h3>

            <div className="space-y-4">
              {anomalyAlerts.map((alert) => (
                <AnomalyAlertCard
                  key={alert.area}
                  area={alert.area}
                  message={alert.message}
                  severity={alert.severity}
                />
              ))}
            </div>
          </div>
        </>
      )}
    </section>
  );
}