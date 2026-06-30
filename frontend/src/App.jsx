import Sidebar from "./components/Sidebar";
import AnalyticsTitle from "./components/AnalyticsTitle";
import KpiCard from "./components/KpiCard";
import { kpiData } from "./data/analyticsData";
<<<<<<< HEAD
=======
import RolesTable from "./components/RolesTable";
>>>>>>> bac738c15348469c511fd4e89fc69a807185e45b

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
<<<<<<< HEAD
=======
        <RolesTable/>
>>>>>>> bac738c15348469c511fd4e89fc69a807185e45b

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