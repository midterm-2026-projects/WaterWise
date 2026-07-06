export default function AnalyticsSummaryGrid({ consumptionHistory = [] }) {
  if (consumptionHistory.length === 0) {
    return (
      <div data-testid="analytics-empty">
        <span data-testid="stat-total">0 m³</span>
        <span data-testid="stat-avg">0 m³</span>
        <span data-testid="stat-highest">None</span>
      </div>
    );
  }

  const totalConsumption = consumptionHistory.reduce((acc, curr) => acc + curr.volume, 0);
  const averageUsage = totalConsumption / consumptionHistory.length;

  const highestRecord = consumptionHistory.reduce((max, current) => 
    current.volume > max.volume ? current : max, 
    consumptionHistory[0]
  );

  return (
    <div data-testid="analytics-grid">
      <div>
        <span>Total Consumption</span>
        <h3 data-testid="stat-total">{totalConsumption} m³</h3>
      </div>
      <div>
        <span>Average Monthly Usage</span>
        <h3 data-testid="stat-avg">
          {averageUsage.toLocaleString('en-US', { maximumFractionDigits: 1 })} m³
        </h3>
      </div>
      <div>
        <span>Highest Consumption Month</span>
        <h3 data-testid="stat-highest">{highestRecord.month}</h3>
      </div>
    </div>
  );
}