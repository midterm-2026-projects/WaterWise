const YearlyConsumptionTrend = ({ data = [] }) => {
  return (
    <div>
      <h1>Yearly Consumption Trend</h1>

      {data.length > 0 ? (
        <>
          <p>Yearly Consumption Graph</p>

          {data.map((item) => (
            <p key={item.year}>
              {item.year} - {item.consumption} m³
            </p>
          ))}
        </>
      ) : (
        <p>No yearly consumption data available.</p>
      )}
    </div>
  );
};

export default YearlyConsumptionTrend;