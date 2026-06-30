function AdminYearlyConsumptionCard({
  value,
  subtitle,
}) {
  const displayValue = value || "0";
  const displaySubtitle =
    subtitle || "No data available";

  return (
    <div>
      <h3>Yearly Consumption</h3>
      <h1>{displayValue}</h1>
      <small>{displaySubtitle}</small>
    </div>
  );
}

export default AdminYearlyConsumptionCard;