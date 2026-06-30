function AdminPerPurokConsumptionCard({ puroks }) {
  const defaultPuroks = [
    { name: "Purok 1", value: "0" },
    { name: "Purok 2", value: "0" },
    { name: "Purok 3", value: "0" },
    { name: "Purok 4", value: "0" },
    { name: "Purok 5", value: "0" },
    { name: "Purok 6", value: "0" },
  ];

  const displayPuroks =
    puroks && puroks.length === 6
      ? puroks
      : defaultPuroks;

  return (
    <div>
      <h3>Per Purok Consumption</h3>

      {displayPuroks.map((purok) => (
        <div key={purok.name}>
          <span>{purok.name}</span>
          <span> - {purok.value}</span>
        </div>
      ))}
    </div>
  );
}

export default AdminPerPurokConsumptionCard;