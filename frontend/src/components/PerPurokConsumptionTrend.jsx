import { purokConsumptionData } from "../data/analyticsData";

const PerPurokConsumptionTrend = ({
  data = purokConsumptionData,
  view = "monthly",
}) => {
  const puroks = Object.entries(data);

  if (puroks.length === 0) {
    return (
      <div>
        <h1>Per Purok Consumption Trend</h1>
        <p>No purok consumption data available.</p>
      </div>
    );
  }

  return (
    <div>
      <h1>Per Purok Consumption Trend</h1>

      {puroks.map(([purok, records]) => {
        const consumptionData =
          view === "yearly"
            ? records.yearly
            : records.monthly;

        return (
          <div key={purok}>
            <h2>{purok} Water Consumption Forecast</h2>

            <p>
              {view === "monthly"
                ? "5 Months Historical Consumption with 1-Month Predicted Demand"
                : "5 Years Historical Consumption with 1-Year Predicted Demand"}
            </p>

            <p>Consumption Graph</p>

            {consumptionData.map((record) => (
              <p
                key={`${purok}-${record.month || record.year}`}
              >
                {record.month || record.year} -{" "}
                {record.consumption} m³
              </p>
            ))}
          </div>
        );
      })}
    </div>
  );
};

export default PerPurokConsumptionTrend;