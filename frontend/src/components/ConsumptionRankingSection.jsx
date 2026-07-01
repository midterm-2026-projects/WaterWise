const ConsumptionRankingSection = ({ data = [] }) => {
  return (
    <div>
      <h1>Consumption Ranking</h1>

      {data.length > 0 ? (
        <>
          {data.map((item, index) => (
            <p key={item.purok}>
              #{index + 1} {item.purok} - {item.consumption} m³
            </p>
          ))}
        </>
      ) : (
        <p>No consumption ranking available.</p>
      )}
    </div>
  );
};

export default ConsumptionRankingSection;