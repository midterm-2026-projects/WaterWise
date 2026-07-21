import { useCallback, useEffect, useState } from "react";

import { AlertTriangle, Lightbulb, LoaderCircle } from "lucide-react";

import AnomalyAlertCard from "./AnomalyAlertCard";

import { generateAllAnomalies } from "../services/anomalyAPI";

import { fetchAllRecommendations } from "../services/recommendationAPI";

function AnomalyRecommendationSection({
  type = "overallMonthly",
  purok = null,
}) {
  const [loading, setLoading] = useState(true);

  const [anomaly, setAnomaly] = useState({
    area: "Overall",
    message: "No anomaly detected.",
    severity: "normal",
  });

  const [recommendations, setRecommendations] = useState([]);

  const analysisLabel = () => {
    if (type === "overallMonthly") return "Overall Monthly Consumption";

    if (type === "overallYearly") return "Overall Yearly Consumption";

    if (type === "allPuroksMonthly") return "All Puroks Monthly Consumption";

    if (type === "allPuroksYearly") return "All Puroks Yearly Consumption";

    if (type === "purokMonthly") return `${purok} Monthly Consumption`;

    if (type === "purokYearly") return `${purok} Yearly Consumption`;

    return "Consumption Analysis";
  };

  const generateAnalysis = useCallback(async () => {
    try {
      setLoading(true);

      const [anomalyResponse, recommendationResponse] = await Promise.all([
        generateAllAnomalies(),

        fetchAllRecommendations(),
      ]);

      const anomalyData = anomalyResponse?.data ?? anomalyResponse ?? {};

      const recommendationData =
        recommendationResponse?.data ?? recommendationResponse ?? {};

      let anomalyResult = {};

      let recommendationResult = {};

      if (type === "purokMonthly" && purok) {
        anomalyResult =
          anomalyData?.allPuroksMonthly?.find((item) => item.purok === purok) ??
          {};

        recommendationResult =
          recommendationData?.allPuroksMonthly?.find(
            (item) => item.purok === purok,
          ) ?? {};
      } else if (type === "purokYearly" && purok) {
        anomalyResult =
          anomalyData?.allPuroksYearly?.find((item) => item.purok === purok) ??
          {};

        recommendationResult =
          recommendationData?.allPuroksYearly?.find(
            (item) => item.purok === purok,
          ) ?? {};
      } else if (type === "allPuroksMonthly") {
        anomalyResult = anomalyData?.allPuroksMonthly?.[0] ?? {};

        recommendationResult = recommendationData?.allPuroksMonthly?.[0] ?? {};
      } else if (type === "allPuroksYearly") {
        anomalyResult = anomalyData?.allPuroksYearly?.[0] ?? {};

        recommendationResult = recommendationData?.allPuroksYearly?.[0] ?? {};
      } else if (type === "overallYearly") {
        anomalyResult = anomalyData?.overallYearly ?? {};

        recommendationResult = recommendationData?.overallYearly ?? {};
      } else {
        anomalyResult = anomalyData?.overallMonthly ?? {};

        recommendationResult = recommendationData?.overallMonthly ?? {};
      }

      setAnomaly({
        area: purok ?? "Overall",

        message: anomalyResult?.summary ?? "No anomaly detected.",

        severity: anomalyResult?.status ?? "normal",
      });

      setRecommendations(recommendationResult?.recommendations ?? []);
    } catch (error) {
      console.error("AI Analysis Error:", error);
    } finally {
      setLoading(false);
    }
  }, [type, purok]);

  useEffect(() => {
    const fetchData = async () => {
      await generateAnalysis();
    };

    fetchData();
  }, [generateAnalysis]);

  const showAnomaly = [
    "high",
    "critical",
    "high risk",
    "critical risk",
  ].includes(String(anomaly.severity).toLowerCase());

  return (
    <section
      className="
rounded-3xl
border
border-slate-200
bg-white
p-6
shadow-sm
"
    >
      <div className="mb-6">
        <p
          className="
text-xs
font-bold
uppercase
tracking-[0.18em]
text-sky-600
"
        >
          AI Decision Support
        </p>

        <h2
          className="
mt-2
text-2xl
font-extrabold
text-slate-900
"
        >
          AI Analysis
        </h2>

        <p
          className="
mt-1
text-sm
text-slate-500
"
        >
          {analysisLabel()}
        </p>
      </div>

      {loading && (
        <div
          className="
flex
items-center
justify-center
gap-3
rounded-2xl
bg-slate-50
py-12
"
        >
          <LoaderCircle
            className="
h-5
w-5
animate-spin
text-sky-600
"
          />
          Generating AI analysis...
        </div>
      )}

      {!loading && (
        <div
          className="
space-y-6
"
        >
          {showAnomaly && (
            <div>
              <div
                className="
mb-3
flex
items-center
gap-2
"
              >
                <AlertTriangle
                  className="
h-5
w-5
text-red-500
"
                />

                <h3 className="font-bold">Critical Anomaly Detection</h3>
              </div>

              <div
                className="
rounded-2xl
border
border-red-200
bg-red-50
p-4
"
              >
                <AnomalyAlertCard
                  area={anomaly.area}
                  message={anomaly.message}
                  severity={anomaly.severity}
                />
              </div>
            </div>
          )}

          <div>
            <div
              className="
mb-3
flex
items-center
gap-2
"
            >
              <Lightbulb
                className="
h-5
w-5
text-green-600
"
              />

              <h3 className="font-bold">AI Recommendations</h3>
            </div>

            <div
              className="
space-y-4
"
            >
              {recommendations.map((item, index) => (
                <div
                  key={index}
                  className="
rounded-2xl
border
border-slate-200
bg-slate-50
p-4
shadow-sm
"
                >
                  <div
                    className="
mb-2
flex
items-center
justify-between
"
                  >
                    <h4
                      className="
text-sm
font-bold
text-slate-800
"
                    >
                      {item.title}
                    </h4>

                    <span
                      className="
rounded-full
bg-sky-100
px-3
py-1
text-xs
font-semibold
text-sky-700
"
                    >
                      {analysisLabel()}
                    </span>
                  </div>

                  <p
                    className="
text-sm
leading-relaxed
text-slate-600
"
                  >
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

export default AnomalyRecommendationSection;
