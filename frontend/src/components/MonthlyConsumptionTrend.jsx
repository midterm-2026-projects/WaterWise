const MonthlyConsumptionTrend = ({ data = [] }) => {
  return (
    <div>
      <h1>Monthly Consumption Trend</h1>

      {data.length > 0 ? (
        <>
          <p>Monthly Consumption Graph</p>

          {data.map((item) => (
            <p key={item.month}>
              {item.month} - {item.consumption} m³
            </p>
          ))}
        </>
      ) : (
        <p>No monthly consumption data available.</p>
      )}
    </div>
  );
};

export default MonthlyConsumptionTrend;