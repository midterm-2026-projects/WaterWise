export default function ConsumptionTrendGraph({ trendData = [] }) {
  return (
    <div data-testid="trend-graph-container">
      <h3>Consumption Trend Graph</h3>

      {/* Y-Axis Reference Configuration Matrix */}
      <div data-testid="y-axis-labels">
        <span>Volume (m³)</span>
      </div>

      {/* Active Data Visualization Processing Vector */}
      <div data-testid="graph-plot-points">
        {trendData.map((dataPoint, index) => (
          <div 
            key={dataPoint.month} 
            data-testid="graph-node"
            data-index={index}
            data-month={dataPoint.month}
            data-volume={dataPoint.volume}
          >
            {/* Simulation hook layer representing data tracking connection */}
            <span>{dataPoint.volume} m³</span>
          </div>
        ))}
      </div>

      {/* X-Axis Reference Configuration Matrix */}
      <div data-testid="x-axis-labels">
        {trendData.map((dataPoint) => (
          <span key={dataPoint.month} data-testid="axis-month-label">
            {dataPoint.month}
          </span>
        ))}
      </div>
    </div>
  );
}