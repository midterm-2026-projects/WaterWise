const PurokComparisonChart = ({
  title = "Purok Comparison Chart",
  graphTitle = "Monthly Comparison Bar Chart",
  data = [],
}) => {
  return (
    <div>
      <h1>{title}</h1>

      {data.length > 0 ? (
        <>
          <p>{graphTitle}</p>

          {data.map((item) => (
            <p key={item.purok}>
              {item.purok} - {item.consumption} m³
            </p>
          ))}
        </>
      ) : (
        <p>No purok comparison data available.</p>
      )}
    </div>
  );
};

export default PurokComparisonChart;