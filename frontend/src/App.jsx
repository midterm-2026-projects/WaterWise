import Sidebar from "./components/Sidebar";
import AnalyticsTitle from "./components/AnalyticsTitle";
import KpiCard from "./components/KpiCard";
import { kpiData } from "./data/analyticsData";
import RolesTable from "./components/RolesTable";

function App() {
  const sidebarItems = [
    "Dashboard",
    "consumer management",
    "Billing",
    "Analytics",
    "Payments",
    "Reports",
    "Announcements",
  ];

  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      {/* Sidebar */}
      <Sidebar items={sidebarItems} />

      {/* Main Content */}
      <main style={{ flex: 1, padding: "20px" }}>
        <AnalyticsTitle
          title="Analytics Dashboard"
          subtitle="Monitor water consumption and forecasting insights"
        />
        <RolesTable/>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            gap: "20px",
            marginTop: "20px",
          }}
        >
          {kpiData.map((item) => (
            <KpiCard
              key={item.title}
              title={item.title}
              value={item.value}
            />
          ))}
        </div>
      </main>
    </div>
  );
}

export default App;